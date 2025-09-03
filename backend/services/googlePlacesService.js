const axios = require('axios');
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
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${this.placeId}&fields=${fields}&key=${this.apiKey}`;

    console.log('🌐 Fazendo chamada para Google Places API...');
    
    try {
      const response = await axios.get(url, {
        timeout: 10000 // 10 segundos de timeout
      });
      
      if (response.data.status !== 'OK') {
        throw new Error(`Google Places API Error: ${response.data.status} - ${response.data.error_message || 'Erro desconhecido'}`);
      }

      const place = response.data.result;
      console.log(`📊 Dados recebidos: ${place.name} - ${place.user_ratings_total} avaliações`);
      
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
};