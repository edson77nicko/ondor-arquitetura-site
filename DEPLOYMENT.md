# Guia de Deploy - Configuração de Servidor

Este projeto é uma Single Page Application (SPA) React que requer configuração específica do servidor web para funcionar corretamente em produção.

## Problema Comum: Erro 404 em Rotas

Quando um usuário acessa diretamente uma URL como `exemplo.com/contato` ou atualiza a página, o servidor web procura por um arquivo físico `/contato` que não existe, resultando em erro 404.

## Soluções por Tipo de Servidor

### Apache (.htaccess)

O arquivo `.htaccess` já está incluído no build. Certifique-se de que:

1. O módulo `mod_rewrite` está habilitado
2. O arquivo `.htaccess` está sendo lido pelo servidor
3. A configuração `AllowOverride All` está definida no virtual host

### Nginx

Use o arquivo `nginx.conf` incluído no build ou adicione ao seu arquivo de configuração:

```nginx
server {
    listen 80;
    server_name seu-dominio.com;
    root /caminho/para/dist;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### IIS (Windows Server)

O arquivo `web.config` já está incluído no build. Certifique-se de que:

1. O módulo URL Rewrite está instalado
2. O arquivo `web.config` está na raiz do site

### Netlify

O arquivo `_redirects` já está incluído no build com a configuração:
```
/*    /index.html   200
```

### Vercel

Crie um arquivo `vercel.json` na raiz do projeto:
```json
{
  "rewrites": [
    { "source": "/(.*)", "destination": "/index.html" }
  ]
}
```

### GitHub Pages

Adicione um arquivo `404.html` idêntico ao `index.html` na pasta `public`.

## Verificação

Para testar se a configuração está funcionando:

1. Acesse uma rota diretamente (ex: `seu-site.com/contato`)
2. Atualize a página em qualquer rota
3. Use as ferramentas de desenvolvedor para verificar se não há erros 404

## Problemas Comuns

1. **Servidor não lê .htaccess**: Verifique se `AllowOverride All` está configurado
2. **mod_rewrite desabilitado**: Execute `sudo a2enmod rewrite` no Apache
3. **Permissões incorretas**: Certifique-se de que o servidor pode ler os arquivos
4. **Cache do navegador**: Limpe o cache ou teste em modo incógnito

## Suporte

Se o problema persistir, verifique:
- Logs do servidor web
- Configurações de virtual host
- Permissões de arquivo
- Se o domínio está apontando corretamente