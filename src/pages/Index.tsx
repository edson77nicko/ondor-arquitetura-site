import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import NewHeroSection from '../components/NewHeroSection';
import LogoCarousel from '../components/LogoCarousel';
import StatsCounter from '../components/StatsCounter';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import CTASection from '../components/CTASection';
import ArchitectureShowcase from '../components/ArchitectureShowcase';
import ProcessSection from '../components/ProcessSection';

const Index = () => {
  return (
    <Layout>
      <SEOHead 
        title="ONDOR - Arquitetura & Imobiliária | Soluções Integradas para Empreendimentos"
        description="ONDOR - Mais de 40 anos transformando terrenos em negócios viáveis. Arquitetura, legalização e imobiliária integrada em Cotia e região."
        keywords="arquitetura, imobiliária, loteamentos, empreendimentos, Cotia, construção, projetos, ONDOR"
        url="https://ondor.com.br"
      />
      <StructuredData type="organization" data={{}} />
      <NewHeroSection />
      <LogoCarousel />
      <ArchitectureShowcase />
      <StatsCounter />
      <About />
      <Services />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
