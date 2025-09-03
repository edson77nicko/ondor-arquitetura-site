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
  console.log('📍 Health check:', `http://localhost:${PORT}/health`);
  console.log('🔗 API endpoint:', `http://localhost:${PORT}/api/google-places`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
  console.log('🛑 Servidor sendo encerrado...');
  process.exit(0);
});