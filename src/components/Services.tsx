import { useState, useEffect, useRef } from 'react';
import { Building, FileCheck, Hammer, Home, ArrowRight } from 'lucide-react';

const Services = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const services = [
    {
      icon: Building,
      title: "Arquitetura Especializada",
      description: "Projetos técnicos personalizados para verticais, horizontais, residenciais e comerciais.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: FileCheck,
      title: "Legalização e Aprovação",
      description: "Cuidamos de toda a burocracia: licenças, Habite-se, registros e CNDs.",
      features: ["Aprovações", "Licenças", "Habite-se", "Registros"],
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Hammer,
      title: "Execução Técnica e Obras",
      description: "Acompanhamento de obras e suporte técnico com uma equipe experiente.",
      features: ["Gerenciamento", "Fiscalização", "Qualidade", "Cronograma"],
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Home,
      title: "Imobiliária Integrada",
      description: "Prospecção de áreas, análise de viabilidade e suporte na comercialização.",
      features: ["Prospecção", "Viabilidade", "Mercado", "Comercialização"],
      gradient: "from-purple-500 to-pink-500"
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-ondor-primary/3 to-ondor-accent/3 rounded-full blur-2xl"></div>
        <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/3 to-purple-500/3 rounded-full blur-2xl"></div>
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in">
          <div className="inline-flex items-center px-4 py-2 bg-ondor-primary/10 rounded-full text-ondor-primary font-medium text-sm mb-4">
            <span>Nossos Serviços</span>
          </div>
          <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight md:text-4xl">
            Da Prospecção ao Habite-se:
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ondor-primary to-ondor-accent">
              Entregamos Soluções Concretas
            </span>
          </h2>
          <p className="text-gray-600 max-w-3xl mx-auto text-lg">
            Integramos áreas técnicas e comerciais para garantir que seu empreendimento saia do papel com segurança e agilidade.
          </p>
        </div>
        
        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div 
                key={index} 
                className={`group relative bg-white dark:bg-ondor-primary border border-gray-200 dark:border-ondor-primary/60 rounded-2xl shadow-lg transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:border-ondor-primary cursor-pointer
                  ${isVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}
                style={{
                  transitionDelay: `${index * 0.15}s`
                }}
              >
                {/* Content */}
                <div className="relative p-8 h-full flex flex-col">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500 bg-ondor-primary/10 dark:bg-ondor-primary">
                    <Icon className="h-6 w-6 text-ondor-primary dark:text-white" />
                  </div>

                  {/* Title */}
                  <h3 className="text-xl font-bold mb-4 text-gray-900 dark:text-white transition-colors duration-500">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm leading-relaxed mb-6 flex-grow text-gray-700 dark:text-gray-200 transition-colors duration-500">
                    {service.description}
                  </p>

                  {/* Action */}
                  <a href="/servicos" className="flex items-center text-sm font-medium text-ondor-primary dark:text-white transition-all duration-500 group-hover:underline">
                    <span>Saiba mais</span>
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform duration-500 group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <a href="/servicos" className="bg-gradient-to-r from-ondor-primary to-ondor-accent text-white px-8 py-2 rounded-xl font-semibold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-102">
              Ver Todos os Serviços
            </a>
            <a href="/contato" className="border-2 border-ondor-primary text-ondor-primary px-8 py-2 rounded-xl font-semibold text-lg hover:bg-ondor-primary/90 hover:border-ondor-primary/90 hover:text-white transition-all duration-300">
              Solicitar Orçamento
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;
