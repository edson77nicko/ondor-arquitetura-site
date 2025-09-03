# Configuração da API do Google Places

Este projeto está configurado para buscar avaliações reais do Google Places API com cache diário. No entanto, devido às restrições de CORS, a API não pode ser chamada diretamente do frontend.

## Configuração Necessária

### 1. Variáveis de Ambiente

Copie o arquivo `.env.example` para `.env` e configure:

```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas credenciais:

```env
REACT_APP_GOOGLE_PLACES_API_KEY=sua_chave_da_api_aqui
REACT_APP_GOOGLE_PLACE_ID=seu_place_id_aqui
```

### 2. Obter Chave da API do Google Places

1. Acesse o [Google Cloud Console](https://console.cloud.google.com/)
2. Crie um novo projeto ou selecione um existente
3. Ative a **Places API**
4. Vá para "Credenciais" e crie uma nova chave de API
5. Configure as restrições da API (recomendado para segurança)

### 3. Encontrar o Place ID

1. Use a [ferramenta Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
2. Procure pelo seu negócio
3. Copie o Place ID gerado

### 4. Implementar Endpoint Backend

O frontend está configurado para fazer chamadas para `/api/google-places`. Você precisa implementar este endpoint no seu backend.

#### Exemplo com Node.js/Express:

```javascript
const express = require('express');
const axios = require('axios');
const app = express();

app.use(express.json());

app.post('/api/google-places', async (req, res) => {
  try {
    const { placeId, fields, language } = req.body;
    const apiKey = process.env.GOOGLE_PLACES_API_KEY;
    
    const response = await axios.get(
      `https://maps.googleapis.com/maps/api/place/details/json`,
      {
        params: {
          place_id: placeId,
          fields: fields,
          key: apiKey,
          language: language
        }
      }
    );
    
    if (response.data.status === 'OK') {
      res.json({
        reviews: response.data.result.reviews || [],
        rating: response.data.result.rating || 5.0,
        user_ratings_total: response.data.result.user_ratings_total || 0
      });
    } else {
      res.status(400).json({ error: response.data.status });
    }
  } catch (error) {
    console.error('Erro ao buscar dados do Google Places:', error);
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

app.listen(3001, () => {
  console.log('Servidor rodando na porta 3001');
});
```

#### Exemplo com Python/Flask:

```python
from flask import Flask, request, jsonify
import requests
import os

app = Flask(__name__)

@app.route('/api/google-places', methods=['POST'])
def get_google_places():
    try:
        data = request.get_json()
        place_id = data.get('placeId')
        fields = data.get('fields')
        language = data.get('language')
        api_key = os.getenv('GOOGLE_PLACES_API_KEY')
        
        response = requests.get(
            'https://maps.googleapis.com/maps/api/place/details/json',
            params={
                'place_id': place_id,
                'fields': fields,
                'key': api_key,
                'language': language
            }
        )
        
        data = response.json()
        
        if data.get('status') == 'OK':
            result = data.get('result', {})
            return jsonify({
                'reviews': result.get('reviews', []),
                'rating': result.get('rating', 5.0),
                'user_ratings_total': result.get('user_ratings_total', 0)
            })
        else:
            return jsonify({'error': data.get('status')}), 400
            
    except Exception as e:
        print(f'Erro ao buscar dados do Google Places: {e}')
        return jsonify({'error': 'Erro interno do servidor'}), 500

if __name__ == '__main__':
    app.run(port=3001, debug=True)
```

## Comportamento Atual

Enquanto o endpoint backend não estiver implementado:

1. O sistema tentará fazer a chamada para `/api/google-places`
2. Como o endpoint não existe, cairá no fallback
3. Usará os dados estáticos com um valor padrão de 87 avaliações
4. Os dados serão cacheados por 24 horas no localStorage

## Cache e Performance

- Os dados são cacheados no localStorage por 24 horas
- Isso reduz o número de chamadas à API do Google
- Melhora a performance da aplicação
- Respeita os limites de uso da API

## Próximos Passos

1. Configure as variáveis de ambiente
2. Implemente o endpoint backend
3. Teste a integração
4. Configure monitoramento de erros
5. Implemente rate limiting se necessário