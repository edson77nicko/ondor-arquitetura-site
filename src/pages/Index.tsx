import Layout from '../components/Layout';
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
      <NewHeroSection />
      <LogoCarousel />
      <About />
      <StatsCounter />
      <ArchitectureShowcase />
      <Services />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
