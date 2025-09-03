import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
  author?: string;
}

const SEOHead = ({
  title = "ONDOR - Arquitetura & Imobiliária | Soluções Integradas para Empreendimentos",
  description = "ONDOR - Mais de 40 anos transformando terrenos em negócios viáveis. Arquitetura, legalização e imobiliária integrada em Cotia e região.",
  keywords = "arquitetura, imobiliária, loteamentos, empreendimentos, Cotia, construção, projetos",
  image = "https://i.postimg.cc/KcB7VBs9/image-1.png",
  url = "https://ondor.com.br",
  type = "website",
  author = "ONDOR Arquitetura & Imobiliária"
}: SEOHeadProps) => {
  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content={author} />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@ondor_oficial" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
    </Helmet>
  );
};

export default SEOHead;