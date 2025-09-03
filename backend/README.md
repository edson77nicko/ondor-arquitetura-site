# Backend Ondor - Google Places API

## 🚀 Setup Rápido

1. **Instalar dependências:**
   ```bash
   npm install
   ```

2. **Configurar variáveis de ambiente:**
   ```bash
   cp .env.example .env
   # Editar .env com suas credenciais do Google Places
   ```

3. **Executar o servidor:**
   ```bash
   npm start          # Produção
   npm run dev        # Desenvolvimento (com nodemon)
   ```

4. **Testar a API:**
   ```bash
   npm test
   ```

## 📡 Endpoints

- `GET /health` - Health check
- `POST /api/google-places` - Buscar dados (com cache)
- `POST /api/google-places/refresh` - Forçar atualização
- `GET /api/google-places/status` - Status do cache

## ⏰ Atualização Automática

O sistema atualiza os dados automaticamente todos os dias às 6:00 AM.

## 🔧 Configuração

Veja o arquivo `.env.example` para todas as opções de configuração.

## 📊 Monitoramento

O sistema registra logs detalhados de todas as operações:
- ✅ Atualizações bem-sucedidas
- ❌ Erros na API
- 📦 Uso do cache
- ⏰ Horários das operações
