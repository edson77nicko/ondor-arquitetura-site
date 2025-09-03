#!/usr/bin/env node

/**
 * Script de Setup Rápido do Backend para Google Places API
 * 
 * Este script cria automaticamente a estrutura básica do backend
 * para implementar a atualização diária dos dados do Google Places.
 * 
 * Uso:
 * 1. node quick-backend-setup.js
 * 2. cd backend
 * 3. npm install
 * 4. Configurar .env com suas credenciais
 * 5. npm start
 */

const fs = require('fs');
const path = require('path');

// Cores para output no terminal
const colors = {
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  reset: '\x1b[0m'
};

function log(message, color = 'reset') {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function createDirectory(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
    log(`✅ Diretório criado: ${dirPath}`, 'green');
  } else {
    log(`📁 Diretório já existe: ${dirPath}`, 'yellow');
  }
}

function createFile(filePath, content) {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
    log(`✅ Arquivo criado: ${filePath}`, 'green');
  } else {
    log(`📄 Arquivo já existe: ${filePath}`, 'yellow');
  }
}

// Estrutura de diretórios
const backendDir = path.join(process.cwd(), 'backend');
const routesDir = path.join(backendDir, 'routes');
const servicesDir = path.join(backendDir, 'services');
const cacheDir = path.join(backendDir, 'cache');

// Conteúdo dos arquivos
const packageJson = `{
  "name": "ondor-backend",
  "version": "1.0.0",
  "description": "Backend para integração com Google Places API",
  "main": "server.js",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test-api.js"
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
  },
  "keywords": ["google-places", "api", "cache", "express"],
  "author": "Ondor Arquitetura",
  "license": "MIT"
}`;

const serverJs = `const express = require('express');
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

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    service: 'Ondor Backend - Google Places API'
  });
});

// Routes
app.use('/api', googlePlacesRoutes);

// Agendamento para atualização diária às 6:00 AM
cron.schedule('0 6 * * *', async () => {
  console.log('🔄 Executando atualização diária dos dados do Google Places...');
  try {
    await updatePlaceDataCache();
    console.log('✅ Atualização concluída com sucesso!');
  } catch (error) {
    console.error('❌ Erro na atualização diária:', error.message);
  }
});

// Atualização inicial ao iniciar o servidor (opcional)
if (process.env.UPDATE_ON_START !== 'false') {
  updatePlaceDataCache()
    .then(() => console.log('✅ Cache inicial carregado'))
    .catch(err => console.log('⚠️ Erro no cache inicial:', err.message));
}

app.listen(PORT, () => {
  console.log('🚀 Servidor rodando na porta', PORT);
  console.log('📍 Health check:', \`http://localhost:\${PORT}/health\`);
  console.log('🔗 API endpoint:', \`http://localhost:\${PORT}/api/google-places\`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Servidor sendo encerrado...');
  process.exit(0);
});`;

const envExample = `# Google Places API Configuration
GOOGLE_PLACES_API_KEY=sua_api_key_aqui
GOOGLE_PLACE_ID=seu_place_id_aqui

# Server Configuration
PORT=3001
UPDATE_ON_START=true

# Cache Configuration
CACHE_DURATION_HOURS=24

# Logging
LOG_LEVEL=info`;

const googlePlacesRoute = `const express = require('express');
const { googlePlacesService } = require('../services/googlePlacesService');

const router = express.Router();

// Endpoint principal para buscar dados do Google Places
router.post('/google-places', async (req, res) => {
  try {
    console.log('📡 Requisição recebida para dados do Google Places');
    const placeData = await googlePlacesService.getPlaceData();
    
    res.json({
      success: true,
      data: placeData,
      cached: placeData.fromCache || false,
      timestamp: new Date().toISOString()
    });
    
    console.log('✅ Dados enviados com sucesso');
  } catch (error) {
    console.error('❌ Erro no endpoint google-places:', error.message);
    
    // Retorna dados padrão em caso de erro
    res.status(200).json({
      success: false,
      error: 'Usando dados padrão devido a erro na API',
      data: {
        name: 'Ondor Arquitetura',
        rating: 4.8,
        totalReviews: 87,
        reviews: [],
        lastUpdated: new Date().toISOString(),
        isDefault: true,
        fromCache: false
      },
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para forçar atualização do cache
router.post('/google-places/refresh', async (req, res) => {
  try {
    console.log('🔄 Forçando atualização do cache...');
    const { updatePlaceDataCache } = require('../services/googlePlacesService');
    const freshData = await updatePlaceDataCache();
    
    res.json({
      success: true,
      message: 'Cache atualizado com sucesso',
      data: freshData,
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    console.error('❌ Erro ao atualizar cache:', error.message);
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

// Endpoint para verificar status do cache
router.get('/google-places/status', async (req, res) => {
  try {
    const cacheData = await googlePlacesService.getCachedData();
    const isValid = cacheData !== null;
    
    res.json({
      success: true,
      cache: {
        exists: isValid,
        lastUpdated: cacheData?.lastUpdated || null,
        isExpired: !isValid,
        totalReviews: cacheData?.totalReviews || 0
      },
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    });
  }
});

module.exports = router;`;

const googlePlacesService = `const axios = require('axios');
const fs = require('fs').promises;
const path = require('path');

const CACHE_FILE = path.join(__dirname, '../cache/places-data.json');
const CACHE_DURATION = (process.env.CACHE_DURATION_HOURS || 24) * 60 * 60 * 1000;

class GooglePlacesService {
  constructor() {
    this.apiKey = process.env.GOOGLE_PLACES_API_KEY;
    this.placeId = process.env.GOOGLE_PLACE_ID;
  }

  async fetchPlaceData() {
    if (!this.apiKey || !this.placeId) {
      throw new Error('❌ API Key ou Place ID não configurados no arquivo .env');
    }

    const fields = 'name,rating,user_ratings_total,reviews,formatted_address';
    const url = \`https://maps.googleapis.com/maps/api/place/details/json?place_id=\${this.placeId}&fields=\${fields}&key=\${this.apiKey}\`;

    console.log('🌐 Fazendo chamada para Google Places API...');
    
    try {
      const response = await axios.get(url, {
        timeout: 10000 // 10 segundos de timeout
      });
      
      if (response.data.status !== 'OK') {
        throw new Error(\`Google Places API Error: \${response.data.status} - \${response.data.error_message || 'Erro desconhecido'}\`);
      }

      const place = response.data.result;
      console.log(\`📊 Dados recebidos: \${place.name} - \${place.user_ratings_total} avaliações\`);
      
      return {
        name: place.name || 'Ondor Arquitetura',
        rating: place.rating || 4.8,
        totalReviews: place.user_ratings_total || 87,
        address: place.formatted_address || '',
        reviews: place.reviews ? place.reviews.slice(0, 5).map(review => ({
          author: review.author_name,
          rating: review.rating,
          text: review.text.substring(0, 200) + (review.text.length > 200 ? '...' : ''),
          time: review.time,
          relativeTime: review.relative_time_description
        })) : [],
        lastUpdated: new Date().toISOString(),
        fromCache: false
      };
    } catch (error) {
      if (error.code === 'ENOTFOUND' || error.code === 'ECONNREFUSED') {
        throw new Error('❌ Erro de conexão com a internet');
      }
      console.error('❌ Erro ao buscar dados do Google Places:', error.message);
      throw error;
    }
  }

  async getCachedData() {
    try {
      const data = await fs.readFile(CACHE_FILE, 'utf8');
      const cachedData = JSON.parse(data);
      
      const now = new Date().getTime();
      const cacheTime = new Date(cachedData.lastUpdated).getTime();
      
      // Verifica se o cache ainda é válido
      if (now - cacheTime < CACHE_DURATION) {
        console.log('📦 Usando dados do cache (válido)');
        return { ...cachedData, fromCache: true };
      }
      
      console.log('⏰ Cache expirado');
      return null;
    } catch (error) {
      console.log('📦 Nenhum cache encontrado');
      return null;
    }
  }

  async setCachedData(data) {
    try {
      // Cria o diretório cache se não existir
      const cacheDir = path.dirname(CACHE_FILE);
      await fs.mkdir(cacheDir, { recursive: true });
      
      await fs.writeFile(CACHE_FILE, JSON.stringify(data, null, 2));
      console.log('💾 Dados salvos no cache');
    } catch (error) {
      console.error('❌ Erro ao salvar cache:', error.message);
    }
  }

  async getPlaceData() {
    // Tenta buscar do cache primeiro
    let cachedData = await this.getCachedData();
    
    if (cachedData) {
      return cachedData;
    }

    // Se não há cache válido, busca da API
    try {
      const freshData = await this.fetchPlaceData();
      await this.setCachedData(freshData);
      return freshData;
    } catch (error) {
      // Em caso de erro, retorna dados padrão
      console.error('⚠️ Usando dados padrão devido a erro:', error.message);
      return {
        name: 'Ondor Arquitetura',
        rating: 4.8,
        totalReviews: 87,
        address: '',
        reviews: [],
        lastUpdated: new Date().toISOString(),
        isDefault: true,
        fromCache: false,
        error: error.message
      };
    }
  }
}

const googlePlacesService = new GooglePlacesService();

// Função para atualização automática
async function updatePlaceDataCache() {
  try {
    console.log('🔄 Iniciando atualização do cache...');
    const freshData = await googlePlacesService.fetchPlaceData();
    await googlePlacesService.setCachedData(freshData);
    console.log('✅ Cache atualizado com sucesso');
    return freshData;
  } catch (error) {
    console.error('❌ Erro na atualização do cache:', error.message);
    throw error;
  }
}

module.exports = {
  googlePlacesService,
  updatePlaceDataCache
};`;

const testScript = `// Script de teste para verificar a API
const axios = require('axios');

async function testAPI() {
  const baseURL = 'http://localhost:3001';
  
  console.log('🧪 Testando API do backend...\n');
  
  try {
    // Teste 1: Health check
    console.log('1️⃣ Testando health check...');
    const healthResponse = await axios.get(\`\${baseURL}/health\`);
    console.log('✅ Health check OK:', healthResponse.data.status);
    
    // Teste 2: Status do cache
    console.log('\n2️⃣ Verificando status do cache...');
    const statusResponse = await axios.get(\`\${baseURL}/api/google-places/status\`);
    console.log('📊 Status do cache:', statusResponse.data);
    
    // Teste 3: Buscar dados
    console.log('\n3️⃣ Buscando dados do Google Places...');
    const dataResponse = await axios.post(\`\${baseURL}/api/google-places\`);
    console.log('📍 Dados recebidos:');
    console.log('   Nome:', dataResponse.data.data.name);
    console.log('   Rating:', dataResponse.data.data.rating);
    console.log('   Total de avaliações:', dataResponse.data.data.totalReviews);
    console.log('   Do cache:', dataResponse.data.data.fromCache);
    console.log('   Última atualização:', dataResponse.data.data.lastUpdated);
    
    console.log('\n🎉 Todos os testes passaram!');
    
  } catch (error) {
    console.error('❌ Erro no teste:', error.message);
    if (error.code === 'ECONNREFUSED') {
      console.log('💡 Certifique-se de que o servidor está rodando: npm start');
    }
  }
}

if (require.main === module) {
  testAPI();
}

module.exports = { testAPI };`;

const readme = `# Backend Ondor - Google Places API

## 🚀 Setup Rápido

1. **Instalar dependências:**
   \`\`\`bash
   npm install
   \`\`\`

2. **Configurar variáveis de ambiente:**
   \`\`\`bash
   cp .env.example .env
   # Editar .env com suas credenciais do Google Places
   \`\`\`

3. **Executar o servidor:**
   \`\`\`bash
   npm start          # Produção
   npm run dev        # Desenvolvimento (com nodemon)
   \`\`\`

4. **Testar a API:**
   \`\`\`bash
   npm test
   \`\`\`

## 📡 Endpoints

- \`GET /health\` - Health check
- \`POST /api/google-places\` - Buscar dados (com cache)
- \`POST /api/google-places/refresh\` - Forçar atualização
- \`GET /api/google-places/status\` - Status do cache

## ⏰ Atualização Automática

O sistema atualiza os dados automaticamente todos os dias às 6:00 AM.

## 🔧 Configuração

Veja o arquivo \`.env.example\` para todas as opções de configuração.

## 📊 Monitoramento

O sistema registra logs detalhados de todas as operações:
- ✅ Atualizações bem-sucedidas
- ❌ Erros na API
- 📦 Uso do cache
- ⏰ Horários das operações
`;

// Função principal
function setupBackend() {
  log('🚀 Iniciando setup do backend para Google Places API...', 'blue');
  log('', 'reset');

  // Criar estrutura de diretórios
  createDirectory(backendDir);
  createDirectory(routesDir);
  createDirectory(servicesDir);
  createDirectory(cacheDir);

  // Criar arquivos
  createFile(path.join(backendDir, 'package.json'), packageJson);
  createFile(path.join(backendDir, 'server.js'), serverJs);
  createFile(path.join(backendDir, '.env.example'), envExample);
  createFile(path.join(backendDir, 'README.md'), readme);
  createFile(path.join(backendDir, 'test-api.js'), testScript);
  createFile(path.join(routesDir, 'google-places.js'), googlePlacesRoute);
  createFile(path.join(servicesDir, 'googlePlacesService.js'), googlePlacesService);
  
  // Criar arquivo .gitignore
  const gitignore = `node_modules/
.env
cache/
*.log
.DS_Store`;
  createFile(path.join(backendDir, '.gitignore'), gitignore);

  log('', 'reset');
  log('🎉 Setup concluído com sucesso!', 'green');
  log('', 'reset');
  log('📋 Próximos passos:', 'blue');
  log('1. cd backend', 'yellow');
  log('2. npm install', 'yellow');
  log('3. cp .env.example .env', 'yellow');
  log('4. Editar .env com suas credenciais do Google Places', 'yellow');
  log('5. npm start', 'yellow');
  log('6. npm test (em outro terminal)', 'yellow');
  log('', 'reset');
  log('🔗 Documentação completa: BACKEND_IMPLEMENTATION_GUIDE.md', 'blue');
}

// Executar se chamado diretamente
if (require.main === module) {
  setupBackend();
}

module.exports = { setupBackend };