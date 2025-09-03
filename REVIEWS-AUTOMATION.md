# Automação de Reviews do Google Places

Este documento descreve a implementação da automação para atualização diária dos depoimentos/reviews do Google Places sem a necessidade de um backend separado.

## Visão Geral

A solução implementada substitui a arquitetura anterior (frontend + backend) por uma abordagem mais simples que utiliza:

- **Script Node.js** para buscar reviews da Google Places API
- **GitHub Actions** para automação diária
- **Arquivo JSON local** para armazenar os dados
- **Componente React** modificado para ler dados locais

## Arquivos Criados/Modificados

### 1. Script de Atualização
**Arquivo:** `scripts/update-reviews.js`

Script responsável por:
- Buscar reviews da Google Places API
- Processar e formatar os dados
- Salvar no arquivo `src/data/reviews.json`

### 2. Dados das Reviews
**Arquivo:** `src/data/reviews.json`

Arquivo JSON que contém:
- Informações do local (nome, avaliação geral, total de avaliações)
- Lista de reviews individuais
- Data da última atualização

### 3. GitHub Action
**Arquivo:** `.github/workflows/update-reviews.yml`

Workflow que:
- Executa diariamente às 6:00 UTC
- Pode ser executado manualmente
- Atualiza as reviews e faz commit automático

### 4. Componente Testimonials
**Arquivo:** `src/components/Testimonials.tsx`

Modificado para:
- Importar dados do arquivo JSON local
- Remover dependência do backend
- Manter fallback para dados estáticos

## Configuração

### 1. Variáveis de Ambiente (GitHub Secrets)

Configure as seguintes secrets no repositório GitHub:

```
GOOGLE_PLACES_API_KEY=sua_api_key_aqui
GOOGLE_PLACE_ID=place_id_da_ondor
```

### 2. Permissões do GitHub Actions

Certifique-se de que o GitHub Actions tem permissão para:
- Ler o repositório
- Fazer commits e push

**Configuração em Settings > Actions > General:**
- Workflow permissions: "Read and write permissions"
- Allow GitHub Actions to create and approve pull requests: ✅

### 3. Instalação de Dependências

O script utiliza apenas dependências nativas do Node.js, não requerendo instalação adicional.

## Como Funciona

### Fluxo Automático
1. **Diariamente às 6:00 UTC**, o GitHub Action é executado
2. O script `update-reviews.js` busca dados da Google Places API
3. Os dados são salvos em `src/data/reviews.json`
4. Se houver alterações, um commit automático é feito
5. O site é automaticamente atualizado com os novos dados

### Fluxo Manual
1. Acesse a aba "Actions" no GitHub
2. Selecione "Update Google Reviews"
3. Clique em "Run workflow"
4. Aguarde a execução

## Vantagens da Nova Implementação

✅ **Simplicidade**: Não requer servidor backend separado
✅ **Custo Zero**: Utiliza apenas GitHub Actions (gratuito para repositórios públicos)
✅ **Manutenção Mínima**: Processo totalmente automatizado
✅ **Performance**: Dados locais = carregamento mais rápido
✅ **Confiabilidade**: Fallback para dados estáticos em caso de erro
✅ **Escalabilidade**: Pode ser usado em múltiplos sites

## Monitoramento

### Verificar Execução
- Acesse GitHub > Actions para ver o histórico de execuções
- Verifique os logs em caso de erro
- Confirme se o arquivo `reviews.json` foi atualizado

### Troubleshooting

**Problema**: GitHub Action falha
- Verifique se as secrets estão configuradas corretamente
- Confirme se a API key do Google Places está válida
- Verifique se o Place ID está correto

**Problema**: Dados não aparecem no site
- Confirme se o arquivo `reviews.json` existe e tem dados válidos
- Verifique se não há erros de sintaxe no JSON
- O componente usará dados de fallback em caso de erro

## Estrutura dos Dados

```json
{
  "place_name": "Ondor Arquitetura e Soluções",
  "overall_rating": 4.9,
  "total_ratings": 87,
  "reviews": [
    {
      "id": 1,
      "author_name": "Nome do Autor",
      "rating": 5,
      "text": "Texto da review...",
      "relative_time_description": "há 2 meses",
      "time": 1640995200000,
      "translated": false
    }
  ],
  "last_updated": "2024-01-15T10:30:00.000Z",
  "total_reviews": 15
}
```

## Próximos Passos

1. **Teste a execução manual** do GitHub Action
2. **Monitore a primeira execução automática**
3. **Configure alertas** (opcional) para falhas na execução
4. **Considere backup** dos dados de reviews importantes

## Suporte

Em caso de problemas:
1. Verifique os logs do GitHub Actions
2. Confirme as configurações das secrets
3. Teste a API key manualmente se necessário
4. O sistema sempre terá fallback para dados estáticos