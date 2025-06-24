import { Link } from 'react-router-dom';
import { MapPin, Building, Home, FileText } from 'lucide-react';
import { useEffect, useRef } from 'react';

const serviceCards = [
  {
    icon: <MapPin className="h-6 w-6 text-white" />, title: 'Loteamentos',
    desc: 'Do planejamento à legalização completa, garantindo a viabilidade de seu empreendimento.'
  },
  {
    icon: <Building className="h-6 w-6 text-white" />, title: 'Empreendimentos Verticais',
    desc: 'Soluções arquitetônicas inteligentes e eficientes, da concepção à entrega.'
  },
  {
    icon: <Home className="h-6 w-6 text-white" />, title: 'Empreendimentos Horizontais',
    desc: 'Projetos personalizados com foco em qualidade e otimização para o seu investimento.'
  }
];

const NewHeroSection = () => {
  // Canvas de partículas sutil
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;
    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    window.addEventListener('resize', handleResize);
    const particles = Array.from({ length: 40 }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.5 + 0.5,
      dx: (Math.random() - 0.5) * 0.2,
      dy: (Math.random() - 0.5) * 0.2,
      a: Math.random() * 0.2 + 0.05
    }));
    let running = true;
    function animate() {
      ctx.clearRect(0, 0, width, height);
      for (const p of particles) {
        p.x += p.dx; p.y += p.dy;
        if (p.x < 0 || p.x > width) p.dx *= -1;
        if (p.y < 0 || p.y > height) p.dy *= -1;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, 2 * Math.PI);
        ctx.fillStyle = `rgba(255,255,255,${p.a})`;
        ctx.fill();
      }
      if (running) requestAnimationFrame(animate);
    }
    animate();
    return () => { running = false; window.removeEventListener('resize', handleResize); };
  }, []);

  return (
    <section
      className="relative min-h-screen flex items-center text-white py-16 overflow-hidden bg-gradient-to-br from-ondor-primary via-ondor-accent/80 to-ondor-primary/90"
      style={{ backgroundImage: `url('https://i.postimg.cc/jdThtK95/Hero-Ondor.jpg')`, backgroundSize: 'cover', backgroundPosition: 'center', backgroundAttachment: 'fixed' }}
    >
      {/* Canvas partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none" />
      {/* Overlay escuro e gradiente */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-ondor-primary/80 to-black/60 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent z-0" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col lg:flex-row gap-16 items-center justify-between">
        {/* Coluna esquerda */}
        <div className="flex-1 flex flex-col items-start justify-center animate-fade-in-up">
          <div className="inline-flex items-center bg-white/20 text-white px-4 py-1.5 rounded-full text-sm sm:text-base font-semibold mb-7 mt-8 sm:mt-0 shadow-sm backdrop-blur-sm tracking-wide">
            <FileText className="h-5 w-5 mr-2" />
            Ondor - Arquitetura & Construção
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-semibold leading-snug md:leading-tight mb-5 sm:mb-7 tracking-wide text-white/90" style={{letterSpacing: '0.01em'}}>
            Sua <span className="text-ondor-special font-semibold">Parceria Estratégica</span><br />
            em Arquitetura e <br /> Aprovações
          </h1>
          <p className="text-lg sm:text-2xl text-white/90 mb-6 sm:mb-10 font-light max-w-xl">
            Transformamos seu sonho de construir em realidade com <strong className="font-semibold text-ondor-special">técnica, visão e propósito.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mb-2 sm:mb-0">
            <Link
              to="/contato"
              className="bg-ondor-special text-ondor-primary px-8 py-4 rounded-xl font-bold text-lg shadow-lg hover:bg-ondor-special/90 hover:scale-105 transition-all duration-300 text-center w-full sm:w-auto"
            >
              Fale conosco
            </Link>
            <Link
              to="/portfolio"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-ondor-special transition-all duration-300 text-center w-full sm:w-auto"
            >
              Nosso Portfólio
            </Link>
          </div>
        </div>
        {/* Coluna direita: cards de serviços */}
        <div className="flex-1 flex flex-col gap-7 w-full max-w-lg animate-fade-in-up lg:mt-0 mt-0 sm:mt-12">
          <p className="text-base text-white/90 mb-1 font-normal">
            Somos líderes no desenvolvimento e aprovação de projetos para:
          </p>
          <div className="grid grid-cols-1 gap-6">
            {serviceCards.map((card, i) => (
              <div key={card.title} className="group flex items-start gap-5 bg-ondor-primary/30 p-6 rounded-2xl shadow-lg border border-white/20 backdrop-blur-lg hover:scale-[1.03] transition-transform duration-300">
                <div className="flex-shrink-0 bg-ondor-primary/20 p-4 rounded-xl shadow-md flex items-center justify-center">
                  {card.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-xl mb-1 text-white drop-shadow-sm">{card.title}</h3>
                  <p className="text-white/80 text-base">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
