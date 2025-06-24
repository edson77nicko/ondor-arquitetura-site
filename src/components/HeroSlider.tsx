
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "ARQUITETURA INTEGRADA",
      subtitle: "ENCONTRE SEU PROJETO IDEAL",
      description: "Projetos técnicos personalizados para verticais, horizontais, residenciais e comerciais com excelência em cada detalhe.",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 2,
      title: "LEGALIZAÇÃO COMPLETA",
      subtitle: "APROVAÇÃO SEM COMPLICAÇÕES",
      description: "Cuidamos de toda a burocracia: licenças, Habite-se, registros e CNDs para seu empreendimento sair do papel.",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 3,
      title: "EXECUÇÃO TÉCNICA",
      subtitle: "OBRAS COM QUALIDADE GARANTIDA",
      description: "Acompanhamento de obras e suporte técnico com uma equipe experiente e multidisciplinar.",
      image: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    },
    {
      id: 4,
      title: "IMOBILIÁRIA INTEGRADA",
      subtitle: "DA PROSPECÇÃO À COMERCIALIZAÇÃO",
      description: "Prospecção de áreas, análise de viabilidade e suporte completo na comercialização do seu empreendimento.",
      image: "https://images.unsplash.com/photo-1460317442991-0ec209397118?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <section className="relative h-screen overflow-hidden">
      {/* Slides */}
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <div 
            className="w-full h-full bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${slide.image})` }}
          >
            <div className="absolute inset-0 bg-black/40"></div>
          </div>
        </div>
      ))}

      {/* Content */}
      <div className="relative z-10 h-full flex items-center">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-white/80 text-sm font-medium mb-2 animate-fade-in">
              {slides[currentSlide].subtitle}
            </p>
            <h1 className="text-4xl md:text-6xl font-bold text-white leading-tight mb-6 animate-fade-in-up">
              {slides[currentSlide].title}
            </h1>
            <p className="text-xl text-white/90 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              {slides[currentSlide].description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
              <Link
                to="/contato"
                className="bg-white text-ondor-primary px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/90 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Solicite uma Consulta Estratégica
              </Link>
              <Link
                to="/servicos"
                className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
              >
                Conheça Nossos Projetos
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronLeft size={24} />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 backdrop-blur-sm text-white hover:bg-white/30 transition-all duration-300"
      >
        <ChevronRight size={24} />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 right-8 z-20">
        <div className="flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white' : 'bg-white/40'
              }`}
            />
          ))}
        </div>
        <div className="text-white/80 text-sm mt-2">
          {String(currentSlide + 1).padStart(2, '0')}
        </div>
      </div>
    </section>
  );
};

export default HeroSlider;
