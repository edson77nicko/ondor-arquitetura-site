import { useState, useEffect, useRef } from 'react';
import { Award, Users, MapPin, TrendingUp } from 'lucide-react';

const About = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  const highlights = [
    {
      icon: Users,
      title: "Tradição Familiar",
      description: "Liderada por Leno e Leide, mantendo valores familiares"
    },
    {
      icon: Award,
      title: "Experiência Consolidada",
      description: "Mais de 40 anos no mercado de arquitetura"
    },
    {
      icon: MapPin,
      title: "Sede Própria",
      description: "Localizada estrategicamente em Cotia (SP)"
    },
    {
      icon: TrendingUp,
      title: "Visão Estratégica",
      description: "Unindo técnica, legalidade e viabilidade comercial"
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
          <div className="animate-fade-in-up">
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              A ONDOR nasceu da união entre <strong className="text-gray-900 font-semibold">experiência, valores familiares</strong> e 
              <strong className="text-gray-900 font-semibold"> visão estratégica</strong>. Com <strong className="text-gray-900 font-semibold">sede própria em Cotia (SP)</strong>, 
              somos <strong className="text-gray-900 font-semibold">referência regional</strong> em soluções completas de arquitetura e imobiliária para empreendimentos urbanos.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed mb-8">
              Fundada por <strong className="text-gray-900 font-semibold">Onofre</strong> e liderada hoje por seus filhos 
              <strong className="text-gray-900 font-semibold"> Leno e Leide</strong>, unimos <strong className="text-gray-900 font-semibold">técnica, legalidade e viabilidade comercial</strong> com 
              o que há de mais <strong className="text-gray-900 font-semibold">humano</strong> em cada projeto.
            </p>

            {/* Icon List */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {highlights.map((item, index) => (
                <div
                  key={index}
                  className={`flex items-start space-x-3 transition-all duration-700 transform ${
                    isVisible 
                      ? 'translate-y-0 opacity-100' 
                      : 'translate-y-8 opacity-0'
                  } animate-fade-in-up`}
                  style={{ 
                    animationDelay: `${0.3 + index * 0.05}s`,
                    transitionDelay: `${index * 0.05}s`
                  }}
                >
                  <div className="flex-shrink-0">
                    <div className="w-10 h-10 bg-ondor-primary/10 rounded-lg flex items-center justify-center">
                      <item.icon className="h-5 w-5 text-ondor-primary" />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-1">{item.title}</h4>
                    <p className="text-gray-600 text-sm">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          
          <div className="animate-fade-in-up relative" style={{ animationDelay: '0.2s' }}>
            <div className="relative overflow-hidden rounded-2xl shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-br from-ondor-primary/10 to-ondor-background/10 z-10"></div>
              <img
                src="https://images.unsplash.com/photo-1487958449943-2429e8be8625?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                alt="Arquitetura moderna ONDOR"
                className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                  <div className="text-ondor-primary font-bold text-lg">ONDOR</div>
                  <div className="text-gray-600 text-sm">Arquitetura & Imobiliária</div>
                </div>
              </div>
            </div>
            
            {/* Elemento decorativo */}
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-ondor-accent to-ondor-primary rounded-full opacity-10"></div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-ondor-primary to-ondor-background rounded-full opacity-10"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
