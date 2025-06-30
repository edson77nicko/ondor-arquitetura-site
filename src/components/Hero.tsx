import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="relative bg-gradient-to-br from-ondor-background via-ondor-primary to-ondor-background min-h-[90vh] flex items-center">
      <div className="absolute inset-0 bg-black/20"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-white">
        <div className="max-w-4xl animate-fade-in-up">
          <h1 className="text-4xl md:text-6xl font-bold leading-tight mb-6">
            Arquitetura, Imobiliária e Aprovação:
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300">
              Soluções Integradas para Empreendimentos de Alto Impacto
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-200 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Com mais de 40 anos de experiência, transformamos terrenos em negócios viáveis – da concepção à entrega final.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <Link
              to="/contato"
              className="bg-white text-ondor-primary px-8 py-2 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 text-center"
            >
              Solicite uma Consulta Estratégica
            </Link>
            <Link
              to="/servicos"
              className="border-2 border-white text-white px-8 py-2 rounded-lg font-semibold text-lg hover:bg-white hover:text-ondor-primary transition-all duration-300 text-center"
            >
              Conheça Nossos Projetos
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
