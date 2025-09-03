# Guia de Implementação do Backend para Google Places API

## Visão Geral

Para ativar a atualização diária automática dos dados do Google Places, você precisa implementar um backend que:

1. **Faça chamadas à Google Places API** de forma segura (servidor-side)
2. **Implemente cache diário** para otimizar custos
3. **Forneça um endpoint** que o frontend possa consumir
4. **Execute atualizações automáticas** diariamente

## Opções de Implementação

### Opção 1: Node.js/Express (Recomendado)

#### 1.1 Estrutura do Projeto Backend

```
backend/
├── package.json
├── .env
├── server.js
├── routes/
│   └── google-places.js
├── services/
│   └── googlePlacesService.js
└── utils/
    └── cache.js
```

#### 1.2 Dependências (package.json)

```json
{
  "name": "ondor-backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "dotenv": "^16.3.1",
    "axios": "^1.5.0",
    "node-cron": "^3.0.2"
  },
  "devDependencies": {
    "nodemon": "^3.0.1"
  }
}
```

#### 1.3 Servidor Principal (server.js)

```javascript
const express = require('express');
const cors = require('cors');
const cron = require('node-cron');
require('dotenv').config();

const googlePlacesRoutes = require('./routes/google-places');
const { updatePlaceDataCache } = require('./services/googlePlacesService');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api', googlePlacesRoutes);

// Agendamento para atualização diária às 6:00 AM
cron.schedule('0 6 * * *', async () => {
  console.log('Executando atualização diária dos dados do Google Places...');
  try {
    await updatePlaceDataCache();
    console.log('Atualização concluída com sucesso!');
  } catch (error) {
    console.error('Erro na atualização diária:', error);
  }
});

// Atualização inicial ao iniciar o servidor
updatePlaceDataCache().catch(console.error);

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
```

#### 1.4 Serviço Google Places (services/googlePlacesService.js)

```javascript
const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../cache/places-data.json');
const CACHE_DURATION = 24 * 60 * 60 * 1000; // 24 horas em millisegundos

class GooglePlacesService {
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
    this.placeId = process.env.GOOGLE_PLACE_ID;
  }

  async fetchPlaceData() {
    if (!this.apiKey || !this.placeId) {
      throw new Error('API Key ou Place ID não configurados');
    }

    const fields = 'name,rating,user_ratings_total,reviews';
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=${fields}&key=${this.apiKey}`;

    try {
      const response = await axios.get(url);
      
      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API Error: ${response.data.status}`);
      }

      const place = response.data.result;
      
      return {
        name: place.name,
        rating: place.rating || 4.8,
        totalReviews: place.user_ratings_total || 87,
        reviews: place.reviews ? place.reviews.slice(0, 5).map(review => ({
          author: review.author_name,
          rating: review.rating,
          text: review.text,
          time: review.time
        })) : [],
        lastUpdated: new Date().toISOString()
      };
    } catch (error) {
      console.error('Erro ao buscar dados do Google Places:', error);
      throw error;
    }
  }

  async getCachedData() {
    try {
      const data = await fs.readFile(CACHE_FILE, 'utf8');
      const cachedData = JSON.parse(data);
      
      const now = new Date().getTime();
      const cacheTime = new Date(cachedData.lastUpdated).getTime();
      
      // Verifica se o cache ainda é válido (menos de 24 horas)
      if (now - cacheTime < CACHE_DURATION) {
        return cachedData;
      }
      
      return null; // Cache expirado
    } catch (error) {
      return null; // Arquivo não existe ou erro na leitura
    }
  }

  async setCachedData(data) {
    try {
      // Cria o diretório cache se não existir
      const cacheDir = path.dirname(CACHE_FILE);
      await fs.mkdir(cacheDir, { recursive: true });
      
      await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Erro ao salvar cache:', error);
    }
  }

  async getPlaceData() {
    // Tenta buscar do cache primeiro
    let cachedData = await this.getCachedData();
    
    if (cachedData) {
      console.log('Retornando dados do cache');
      return cachedData;
    }

    // Se não há cache válido, busca da API
    console.log('Cache expirado, buscando dados da API...');
    try {
      const freshData = await this.fetchPlaceData();
      await this.setCachedData(freshData);
      return freshData;
    } catch (error) {
      // Em caso de erro, retorna dados padrão
      console.error('Erro ao buscar da API, usando dados padrão');
      return {
        name: 'Ondor Arquitetura',
        rating: 4.8,
        totalReviews: 87,
        reviews: [],
        lastUpdated: new Date().toISOString(),
        isDefault: true
      };
    }
  }
}

const googlePlacesService = new GooglePlacesService();

// Função para atualização automática
async function updatePlaceDataCache() {
  try {
    const freshData = await googlePlacesService.fetchPlaceData();
    await googlePlacesService.setCachedData(freshData);
    console.log('Cache atualizado com sucesso');
    return freshData;
  } catch (error) {
    console.error('Erro na atualização do cache:', error);
    throw error;
  }
}

module.exports = {
  googlePlacesService,
  updatePlaceDataCache
};
```

#### 1.5 Rotas (routes/google-places.js)

```javascript
const express = require('express');
const { googlePlacesService } = require('../services/googlePlacesService');

const router = express.Router();

router.post('/google-places', async (req, res) => {
  try {
    const placeData = await googlePlacesService.getPlaceData();
    res.json({
      success: true,
      data: placeData
    });
  } catch (error) {
    console.error('Erro no endpoint google-places:', error);
    res.status(500).json({
      success: false,
      error: 'Erro interno do servidor',
      data: {
        name: 'Ondor Arquitetura',
        rating: 4.8,
        totalReviews: 87,
        reviews: [],
        lastUpdated: new Date().toISOString(),
        isDefault: true
      }
    });
  }
});

module.exports = router;
```

#### 1.6 Variáveis de Ambiente (.env)

```env
GOOGLE_PLACES_API_KEY=sua_api_key_aqui
GOOGLE_PLACE_ID=seu_place_id_aqui
PORT=3001
```

### Opção 2: Python/Flask

#### 2.1 Estrutura do Projeto

```
backend/
├── requirements.txt
├── .env
├── app.py
├── services/
│   └── google_places_service.py
└── cache/
    └── places_data.json
```

#### 2.2 Dependências (requirements.txt)

```txt
Flask==2.3.3
Flask-CORS==4.0.0
requests==2.31.0
python-dotenv==1.0.0
APScheduler==3.10.4
```

#### 2.3 Aplicação Principal (app.py)

```python
from flask import Flask, request, jsonify
from flask_cors import CORS
from apscheduler.schedulers.background import BackgroundScheduler
from services.google_places_service import GooglePlacesService
import os
from dotenv import load_dotenv
import atexit

load_dotenv()

app = Flask(__name__)
CORS(app)

google_places_service = GooglePlacesService()

# Configurar agendamento para atualização diária
scheduler = BackgroundScheduler()
scheduler.add_job(
    func=google_places_service.update_cache,
    trigger="cron",
    hour=6,  # 6:00 AM
    minute=0
)
scheduler.start()

# Atualização inicial
google_places_service.update_cache()

# Parar o scheduler quando a aplicação for encerrada
atexit.register(lambda: scheduler.shutdown())

@app.route('/api/google-places', methods=['POST'])
def get_google_places():
    try:
        place_data = google_places_service.get_place_data()
        return jsonify({
            'success': True,
            'data': place_data
        })
    except Exception as e:
        print(f"Erro no endpoint google-places: {e}")
        return jsonify({
            'success': False,
            'error': 'Erro interno do servidor',
            'data': {
                'name': 'Ondor Arquitetura',
                'rating': 4.8,
                'totalReviews': 87,
                'reviews': [],
                'lastUpdated': '2024-01-01T00:00:00Z',
                'isDefault': True
            }
        }), 500

if __name__ == '__main__':
    app.run(debug=True, port=int(os.getenv('PORT', 3001)))
```

## Configuração e Deploy

### 1. Configuração Local

```bash
# Criar diretório do backend
mkdir backend
cd backend

# Instalar dependências (Node.js)
npm init -y
npm install express cors dotenv axios node-cron
npm install -D nodemon

# Ou para Python
pip install -r requirements.txt

# Configurar variáveis de ambiente
cp .env.example .env
# Editar .env com suas credenciais

# Executar
npm run dev  # Node.js
# ou
python app.py  # Python
```

### 2. Deploy em Produção

#### Opções de Hosting:
- **Heroku** (gratuito com limitações)
- **Vercel** (para Node.js)
- **Railway** (fácil deploy)
- **DigitalOcean App Platform**
- **AWS Lambda** (serverless)

### 3. Configuração do Frontend

No seu arquivo `.env` do frontend, adicione:

```env
VITE_BACKEND_URL=http://localhost:3001
# Em produção: VITE_BACKEND_URL=https://seu-backend.herokuapp.com
```

E atualize o `Testimonials.tsx` para usar a URL do backend:

```typescript
const backendUrl = import.meta.env.VITE_BACKEND_URL || 'http://localhost:3001';
const response = await fetch(`${backendUrl}/api/google-places`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
});
```

## Monitoramento e Logs

### 1. Logs de Atualização

O sistema registrará:
- ✅ Atualizações bem-sucedidas
- ❌ Erros na API
- 📊 Estatísticas de uso do cache
- ⏰ Horários das atualizações

### 2. Verificação de Saúde

Adicione um endpoint de health check:

```javascript
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime()
  });
});
```

## Custos da Google Places API

- **Place Details**: $17 por 1.000 requisições
- **Com 1 atualização diária**: ~$0.50 por mês
- **Cache de 24h**: Reduz custos significativamente

## Próximos Passos

1. **Escolher a tecnologia** (Node.js ou Python)
2. **Configurar o backend** localmente
3. **Testar a integração** com o frontend
4. **Fazer deploy** em produção
5. **Configurar monitoramento**
6. **Ativar as atualizações automáticas**

Com essa implementação, seus dados do Google Places serão atualizados automaticamente todos os dias às 6:00 AM, mantendo as informações sempre atuais sem custos excessivos!