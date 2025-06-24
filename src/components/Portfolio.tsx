
import { useState, useEffect } from 'react';
import { Building2, Home, Hammer, MapPin } from 'lucide-react';

const Portfolio = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const portfolioItems = [{
    id: 1,
    title: "Residencial Vila Verde",
    category: "Condomínio Residencial",
    image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Building2,
    description: "Complexo residencial com 120 unidades e área de lazer completa"
  }, {
    id: 2,
    title: "Casa Moderna SP",
    category: "Residencial Premium",
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Home,
    description: "Casa contemporânea de alto padrão com 450m² de área construída"
  }, {
    id: 3,
    title: "Centro Comercial Cotia",
    category: "Empreendimento Comercial",
    image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: Hammer,
    description: "Centro comercial com 50 lojas e estacionamento para 200 vagas"
  }, {
    id: 4,
    title: "Loteamento Horizonte",
    category: "Desenvolvimento Urbano",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
    icon: MapPin,
    description: "Loteamento residencial com 200 lotes e infraestrutura completa"
  }];

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex(prevIndex => (prevIndex + 1) % portfolioItems.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return <section className="py-20 bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 animate-fade-in">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">
            Nosso Portfólio
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Conheça alguns dos projetos que transformamos em realidade, sempre unindo técnica, legalidade e viabilidade comercial.
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-12 animate-fade-in-up">
          <div className="flex justify-center mb-4">
            <div className="flex space-x-2">
              {portfolioItems.map((_, index) => <div key={index} className={`h-1 w-16 rounded-full transition-all duration-500 ${index === activeIndex ? 'bg-ondor-primary' : index < activeIndex ? 'bg-ondor-primary/80' : 'bg-gray-200'}`} />)}
            </div>
          </div>
        </div>

        {/* Portfolio Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {portfolioItems.map((item, index) => {
          const Icon = item.icon;
          const isActive = index === activeIndex;
          const isPast = index < activeIndex;
          return <div key={item.id} className={`group relative bg-white rounded-2xl overflow-hidden shadow-lg transition-all duration-700 transform ${isActive ? 'scale-105 shadow-2xl opacity-100' : isPast ? 'opacity-90 scale-100' : 'opacity-70 scale-98'} hover:scale-100 hover:shadow-xl`} style={{
            height: '420px'
          }}>
                {/* Image */}
                <div className="relative h-60 overflow-hidden">
                  <img src={item.image} alt={item.title} className={`w-full h-full object-cover transition-all duration-700 ${isActive ? 'scale-110' : 'scale-100'}`} />
                  <div className={`absolute inset-0 transition-all duration-700 ${isActive ? 'bg-gradient-to-t from-ondor-primary/20 to-transparent' : 'bg-black/10'}`} />
                  
                  {/* Icon */}
                  <div className={`absolute top-4 right-4 w-10 h-10 rounded-full flex items-center justify-center transition-all duration-500 ${isActive ? 'bg-ondor-primary text-white' : 'bg-white/60 text-gray-600'}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 h-40 flex flex-col">
                  <div className="flex-1">
                    <div className={`text-sm font-medium mb-2 transition-colors duration-500 ${isActive ? 'text-ondor-primary' : 'text-gray-500'}`}>
                      {item.category}
                    </div>
                    <h3 className={`text-lg font-bold mb-3 transition-colors duration-500 ${isActive ? 'text-gray-900' : 'text-gray-600'}`}>
                      {item.title}
                    </h3>
                    <p className={`text-sm leading-relaxed transition-colors duration-500 ${isActive ? 'text-gray-700' : 'text-gray-500'}`}>
                      {item.description}
                    </p>
                  </div>
                </div>

                {/* Active indicator */}
                {isActive && <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-ondor-primary to-ondor-accent" />}
              </div>;
        })}
        </div>
      </div>
    </section>;
};

export default Portfolio;
