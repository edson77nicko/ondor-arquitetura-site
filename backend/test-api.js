// Script de teste para verificar a API
const axios = require('axios');

async function testAPI() {
  const baseURL = 'http://localhost:3001';
  
  console.log('🧪 Testando API do backend...
');
  
  try {
    // Teste 1: Health check
    console.log('1️⃣ Testando health check...');
    const healthResponse = await axios.get(`${baseURL}/health`);
    console.log('✅ Health check OK:', healthResponse.data.status);
    
    // Teste 2: Status do cache
    console.log('
2️⃣ Verificando status do cache...');
    const statusResponse = await axios.get(`${baseURL}/api/google-places/status`);
    console.log('📊 Status do cache:', statusResponse.data);
    
    // Teste 3: Buscar dados
    console.log('
3️⃣ Buscando dados do Google Places...');
    const dataResponse = await axios.post(`${baseURL}/api/google-places`);
    console.log('📍 Dados recebidos:');
    console.log('   Nome:', dataResponse.data.data.name);
    console.log('   Rating:', dataResponse.data.data.rating);
    console.log('   Total de avaliações:', dataResponse.data.data.totalReviews);
    console.log('   Do cache:', dataResponse.data.data.fromCache);
    console.log('   Última atualização:', dataResponse.data.data.lastUpdated);
    
    console.log('
🎉 Todos os testes passaram!');
    
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

module.exports = { testAPI };