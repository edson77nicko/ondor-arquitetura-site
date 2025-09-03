// Script para testar a integração frontend-backend
console.log('🧪 Testando integração frontend-backend...');

// Simular o comportamento do frontend
async function testFrontendBackendIntegration() {
  try {
    console.log('📡 Fazendo requisição para o backend...');
    
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
    
    console.log('✅ Dados recebidos do backend:');
    console.log(`   📊 Nome: ${data.name}`);
    console.log(`   ⭐ Rating: ${data.rating}`);
    console.log(`   📝 Total de avaliações: ${data.totalReviews}`);
    console.log(`   📍 Endereço: ${data.address}`);
    console.log(`   💬 Avaliações: ${data.reviews.length} carregadas`);
    console.log(`   🕒 Última atualização: ${data.lastUpdated}`);
    console.log(`   💾 Do cache: ${result.cached ? 'Sim' : 'Não'}`);
    
    // Verificar se os dados estão corretos
    if (data.totalReviews > 0) {
      console.log('🎉 Integração funcionando! Dados reais do Google Places carregados.');
    } else {
      console.log('⚠️  Aviso: Nenhuma avaliação encontrada.');
    }
    
  } catch (error) {
    console.error('❌ Erro na integração:', error.message);
    console.log('🔄 Verifique se o backend está rodando em http://localhost:3001');
  }
}

// Executar teste
testFrontendBackendIntegration();