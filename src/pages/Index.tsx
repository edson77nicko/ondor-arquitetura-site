import Layout from '../components/Layout';
import NewHeroSection from '../components/NewHeroSection';
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
      <StatsCounter />
      <About />
      <ArchitectureShowcase />
      <Services />
      <ProcessSection />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
