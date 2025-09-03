# Guia de Deploy no cPanel

Este guia específico para deploy no cPanel irá resolver o problema de 404 em rotas da sua aplicação React.

## Passo a Passo para Deploy no cPanel

### 1. Preparar os Arquivos

1. Execute o build da aplicação:
   ```bash
   npm run build
   ```

2. Todos os arquivos necessários estão na pasta `dist/`

### 2. Upload dos Arquivos

1. Acesse o **File Manager** no cPanel
2. Navegue até a pasta `public_html` (ou `www` dependendo da configuração)
3. **IMPORTANTE**: Faça upload de TODOS os arquivos da pasta `dist/`, incluindo:
   - `.htaccess` (arquivo oculto - muito importante!)
   - `index.html`
   - Pasta `assets/`
   - `favicon.ico`
   - `robots.txt`
   - `sitemap.xml`
   - Todos os outros arquivos

### 3. Verificar o Arquivo .htaccess

**CRÍTICO**: O arquivo `.htaccess` deve estar na raiz do seu domínio (`public_html/`).

1. No File Manager, clique em **Settings** (Configurações)
2. Marque a opção **"Show Hidden Files"** (Mostrar Arquivos Ocultos)
3. Verifique se o arquivo `.htaccess` está presente
4. Se não estiver, crie manualmente com este conteúdo:

```apache
Options -MultiViews
RewriteEngine On

# Handle React Router - redirect all non-file requests to index.html
RewriteCond %{REQUEST_FILENAME} !-f
RewriteCond %{REQUEST_FILENAME} !-d
RewriteRule . /index.html [L]

# Set correct MIME types
<IfModule mod_mime.c>
    AddType application/javascript .js
    AddType text/css .css
    AddType image/svg+xml .svg
    AddType application/json .json
    AddType font/woff .woff
    AddType font/woff2 .woff2
</IfModule>

# Enable compression
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain
    AddOutputFilterByType DEFLATE text/html
    AddOutputFilterByType DEFLATE text/xml
    AddOutputFilterByType DEFLATE text/css
    AddOutputFilterByType DEFLATE application/xml
    AddOutputFilterByType DEFLATE application/xhtml+xml
    AddOutputFilterByType DEFLATE application/rss+xml
    AddOutputFilterByType DEFLATE application/javascript
    AddOutputFilterByType DEFLATE application/x-javascript
</IfModule>
```

### 4. Estrutura Final no cPanel

Sua pasta `public_html` deve ficar assim:
```
public_html/
├── .htaccess          (arquivo oculto - OBRIGATÓRIO)
├── index.html
├── favicon.ico
├── robots.txt
├── sitemap.xml
├── assets/
│   ├── index-[hash].css
│   ├── index-[hash].js
│   └── [outras imagens e arquivos]
└── [outros arquivos do build]
```

### 5. Teste Final

1. Acesse seu domínio: `https://seudominio.com`
2. Teste as rotas diretamente:
   - `https://seudominio.com/contato`
   - `https://seudominio.com/servicos`
   - `https://seudominio.com/sobre`
3. Atualize a página em cada rota (F5)
4. Todas devem funcionar sem erro 404

## Problemas Comuns no cPanel

### Erro 404 Persiste

1. **Arquivo .htaccess não foi enviado**:
   - Verifique se está marcado "Show Hidden Files"
   - Reenvie o arquivo manualmente

2. **Permissões incorretas**:
   - Clique com botão direito no `.htaccess`
   - Permissions → 644

3. **mod_rewrite desabilitado**:
   - Entre em contato com sua hospedagem
   - Solicite habilitação do mod_rewrite

### Arquivos CSS/JS não Carregam

1. Verifique se a pasta `assets/` foi enviada completamente
2. Confirme que os arquivos têm as extensões corretas (.css, .js)

### Erro 500 (Internal Server Error)

1. Problema no arquivo `.htaccess`
2. Remova temporariamente o `.htaccess`
3. Se o site voltar a funcionar, recrie o arquivo com o conteúdo correto

## Dicas Importantes

- **Sempre faça backup** antes de fazer alterações
- **Limpe o cache do navegador** após o deploy
- **Use HTTPS** sempre que possível
- **Teste em diferentes navegadores**

## Suporte

Se ainda tiver problemas:
1. Verifique os logs de erro no cPanel (Error Logs)
2. Entre em contato com o suporte da sua hospedagem
3. Mencione que precisa do "mod_rewrite habilitado para SPA React"