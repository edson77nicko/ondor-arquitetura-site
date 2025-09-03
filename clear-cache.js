// Script para limpar cache do localStorage e testar conexão com backend
console.log('🧹 Limpando cache do localStorage...');

// Simular limpeza do localStorage (como seria feito no navegador)
const cacheKey = 'ondor-google-place-data';
const cacheDateKey = 'ondor-google-place-date';

console.log('📝 Chaves de cache que seriam removidas:');
console.log(`   - ${cacheKey}`);
console.log(`   - ${cacheDateKey}`);

// Testar conexão com backend
async function testBackendConnection() {
  try {
    console.log('\n🔗 Testando conexão com backend...');
    
    const response = await fetch('http://localhost:3001/api/google-places', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        placeId: 'ChIJxbYvDFgHz5QRfN5SBJ7oyhY',
        fields: 'rating,user_ratings_total,reviews',
        language: 'pt'
      })
    });
    
    if (!response.ok) {
      throw new Error(`HTTP ${response.status}: ${response.statusText}`);
    }
    
    const result = await response.json();
    
    if (!result.success) {
      throw new Error('Backend retornou erro');
    }
    
    const data = result.data;
    
    console.log('✅ Backend respondeu com sucesso!');
    console.log(`📊 Dados que o frontend deveria receber:`);
    console.log(`   - Nome: ${data.name}`);
    console.log(`   - Rating: ${data.rating}`);
    console.log(`   - Total de avaliações: ${data.totalReviews}`);
    console.log(`   - Avaliações carregadas: ${data.reviews.length}`);
    
    console.log('\n💡 Para limpar o cache no navegador:');
    console.log('   1. Abra o DevTools (F12)');
    console.log('   2. Vá para Application > Local Storage');
    console.log('   3. Delete as chaves: ondor-google-place-data e ondor-google-place-date');
    console.log('   4. Recarregue a página (F5)');
    
  } catch (error) {
    console.error('❌ Erro ao conectar com backend:', error.message);
    console.log('\n🔧 Verifique se o backend está rodando:');
    console.log('   cd backend && npm start');
  }
}

// Executar teste
testBackendConnection();