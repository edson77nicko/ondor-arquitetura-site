import { Helmet } from 'react-helmet-async';

interface StructuredDataProps {
  type: 'organization' | 'project' | 'breadcrumb';
  data: any;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const generateSchema = () => {
    switch (type) {
      case 'organization':
        return {
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "ONDOR Arquitetura & Imobiliária",
          "url": "https://ondor.com.br",
          "logo": "https://ondor.com.br/logo.png",
          "description": "Empresa especializada em arquitetura, legalização e execução de empreendimentos verticais, horizontais e loteamentos em Cotia e região metropolitana de São Paulo.",
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "R. Topázio, 458 - Jardim Nomura",
            "addressLocality": "Cotia",
            "addressRegion": "SP",
            "postalCode": "06717-235",
            "addressCountry": "BR"
          },
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+55-11-4703-2874",
            "contactType": "customer service",
            "availableLanguage": "Portuguese"
          },
          "foundingDate": "1980",
          "areaServed": {
            "@type": "Place",
            "name": "Cotia e Região Metropolitana de São Paulo"
          },
          "serviceType": [
            "Arquitetura",
            "Legalização de Obras",
            "Execução Técnica",
            "Imobiliária",
            "Loteamentos",
            "Empreendimentos Verticais",
            "Empreendimentos Horizontais"
          ]
        };

      case 'project':
        return {
          "@context": "https://schema.org",
          "@type": "RealEstateProject",
          "name": data.title,
          "description": data.description?.join(' ') || '',
          "url": `https://ondor.com.br/portfolio/${data.slug}`,
          "image": data.images?.[0] || '',
          "location": {
            "@type": "Place",
            "name": data.location,
            "address": {
              "@type": "PostalAddress",
              "addressLocality": data.location
            }
          },
          "developer": {
            "@type": "Organization",
            "name": "ONDOR Arquitetura & Imobiliária",
            "url": "https://ondor.com.br"
          },
          "category": data.category,
          "dateCreated": data.year || new Date().getFullYear(),
          "additionalType": "https://schema.org/ResidentialBuilding"
        };

      case 'breadcrumb':
        return {
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          "itemListElement": data.map((item: any, index: number) => ({
            "@type": "ListItem",
            "position": index + 1,
            "name": item.name,
            "item": item.url
          }))
        };

      default:
        return null;
    }
  };

  const schema = generateSchema();

  if (!schema) return null;

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(schema)}
      </script>
    </Helmet>
  );
};

export default StructuredData;