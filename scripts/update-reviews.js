const fs = require('fs');
const path = require('path');
const https = require('https');

// Configurações
const PLACE_ID = process.env.GOOGLE_PLACE_ID || 'ChIJN1t_tDeuEmsRUsoyG83frY4'; // Place ID padrão (exemplo)
const API_KEY = process.env.GOOGLE_PLACES_API_KEY;
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'data', 'reviews.json');

// Função para fazer requisição HTTPS
function httpsRequest(url) {
  return new Promise((resolve, reject) => {
    https.get(url, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          resolve(JSON.parse(data));
        } catch (error) {
          reject(new Error('Erro ao parsear JSON: ' + error.message));
        }
      });
    }).on('error', (error) => {
      reject(error);
    });
  });
}

// Função principal para buscar reviews
async function updateReviews() {
  try {
    if (!API_KEY) {
      throw new Error('GOOGLE_PLACES_API_KEY não encontrada nas variáveis de ambiente');
    }

    console.log('🔍 Buscando reviews do Google Places...');
    
    const url = `https://maps.googleapis.com/maps/api/place/details/json?place_id=${PLACE_ID}&fields=name,rating,user_ratings_total,reviews&key=${API_KEY}`;
    
    const response = await httpsRequest(url);
    
    if (response.status !== 'OK') {
      throw new Error(`Erro na API do Google: ${response.status} - ${response.error_message || 'Erro desconhecido'}`);
    }

    const placeData = response.result;
    
    if (!placeData.reviews || placeData.reviews.length === 0) {
      console.log('⚠️  Nenhuma review encontrada');
      return;
    }

    // Processar e filtrar reviews
    const processedReviews = placeData.reviews
      .filter(review => review.text && review.text.trim().length > 0) // Apenas reviews com texto
      .map(review => ({
        id: review.time, // Usar timestamp como ID único
        author_name: review.author_name,
        author_url: review.author_url,
        profile_photo_url: review.profile_photo_url,
        rating: review.rating,
        relative_time_description: review.relative_time_description,
        text: review.text,
        time: review.time,
        translated: review.translated || false
      }))
      .sort((a, b) => b.time - a.time); // Ordenar por mais recente

    // Dados completos para salvar
    const reviewsData = {
      place_name: placeData.name,
      overall_rating: placeData.rating,
      total_ratings: placeData.user_ratings_total,
      reviews: processedReviews,
      last_updated: new Date().toISOString(),
      total_reviews: processedReviews.length
    };

    // Criar diretório se não existir
    const dataDir = path.dirname(OUTPUT_FILE);
    if (!fs.existsSync(dataDir)) {
      fs.mkdirSync(dataDir, { recursive: true });
    }

    // Salvar arquivo JSON
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify(reviewsData, null, 2), 'utf8');
    
    console.log('✅ Reviews atualizadas com sucesso!');
    console.log(`📊 Total de reviews: ${processedReviews.length}`);
    console.log(`⭐ Avaliação geral: ${placeData.rating}/5`);
    console.log(`📝 Arquivo salvo em: ${OUTPUT_FILE}`);
    
  } catch (error) {
    console.error('❌ Erro ao atualizar reviews:', error.message);
    process.exit(1);
  }
}

// Executar se chamado diretamente
if (require.main === module) {
  updateReviews();
}

module.exports = { updateReviews };