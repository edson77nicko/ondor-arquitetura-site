
import { useState, useEffect, useRef } from 'react';
import { CheckCircle, Star, Award, Shield, Users, TrendingUp } from 'lucide-react';

const Differentials = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const differentials = [
    {
      icon: Users,
      title: "Arquitetura + Imobiliária",
      description: "Soluções completas em um só lugar, integrando projeto arquitetônico e viabilidade comercial."
    },
    {
      icon: Shield,
      title: "Domínio Legal",
      description: "Forte conhecimento regulatório garante aprovações ágeis em todos os órgãos competentes."
    },
    {
      icon: Star,
      title: "Projetos Personalizados",
      description: "Cada projeto é moldado ao perfil específico do investidor e características do terreno."
    },
    {
      icon: Award,
      title: "Reputação Consolidada",
      description: "Mais de 40 anos como referência em Cotia e região metropolitana de São Paulo."
    },
    {
      icon: TrendingUp,
      title: "Equipe Multidisciplinar",
      description: "Profissionais próprios e experientes em todas as etapas do empreendimento."
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
    <section ref={sectionRef} className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Text Content */}
          <div className="animate-fade-in-up">
            <div className="inline-flex items-center px-4 py-2 bg-ondor-primary/10 rounded-full text-ondor-primary font-medium text-sm mb-4">
              <CheckCircle className="h-4 w-4 mr-2" />
              <span>Nossos Diferenciais</span>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
              Por que a ONDOR é Escolha de
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ondor-primary to-ondor-accent">
                Quem Quer Resultados?
              </span>
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Combinamos <strong className="text-gray-900 font-semibold">experiência consolidada</strong>, 
              <strong className="text-gray-900 font-semibold"> tecnologia avançada</strong> e 
              <strong className="text-gray-900 font-semibold"> visão estratégica</strong> para entregar projetos que superam expectativas 
              e garantem <strong className="text-gray-900 font-semibold">retorno consistente</strong> aos nossos clientes.
            </p>

            {/* Primeiros 2 itens da lista */}
            <div className="space-y-4 mb-8">
              {differentials.slice(0, 2).map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-4 transition-all duration-700 transform ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{ 
                    transitionDelay: `${0.2 + index * 0.08}s`
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-ondor-primary/10 rounded-xl flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-ondor-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Right Column - Visual Element */}
          <div className="animate-fade-in-up relative" style={{ animationDelay: '0.2s' }}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-ondor-primary/10 to-ondor-background/10 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Projetos ONDOR - Arquitetura e Imobiliária"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-ondor-primary font-bold text-lg">40+ Anos</div>
                  <div className="text-gray-600 text-sm">de Experiência Comprovada</div>
                </div>
              </div>
            </div>
            
            {/* Elementos decorativos */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-ondor-accent to-ondor-primary rounded-full opacity-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-ondor-primary to-ondor-background rounded-full opacity-5"></div>
          </div>
        </div>

        {/* Seção dos últimos 3 itens em 3 colunas */}
        <div className="mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {differentials.slice(2).map((item, index) => (
              <div
                key={index + 2}
                className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-700 transform hover:shadow-xl hover:scale-102 ${
                  isVisible 
                    ? 'translate-y-0 opacity-100' 
                    : 'translate-y-8 opacity-0'
                }`}
                style={{ 
                  transitionDelay: `${0.4 + index * 0.08}s`
                }}
              >
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 bg-ondor-primary/10 rounded-xl flex items-center justify-center">
                      <item.icon className="h-6 w-6 text-ondor-primary" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                    <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Differentials;
