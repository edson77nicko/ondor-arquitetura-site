const express = require('express');
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

module.exports = router;