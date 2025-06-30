import { Link } from 'react-router-dom';
import { MapPin, Building, Home, FileText } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';

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

const heroImages = [
  'https://i.postimg.cc/jdThtK95/Hero-Ondor.jpg',
  'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
  'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80',
];

const NewHeroSection = () => {
  // Canvas de partículas sutil
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);
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

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent((prev) => (prev + 1) % heroImages.length);
      setZoom(1);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setZoom(1);
    const zoomInterval = setInterval(() => {
      setZoom((z) => (z < 1.08 ? z + 0.0007 : 1.08));
    }, 16);
    return () => clearInterval(zoomInterval);
  }, [current]);

  return (
    <section className="relative min-h-screen flex items-center text-white py-16 overflow-hidden">
      {/* Slide de imagens com zoom-in */}
      {heroImages.map((img, idx) => (
        <div
          key={img}
          className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ${idx === current ? 'opacity-100 z-0' : 'opacity-0 z-0'}`}
          style={{
            backgroundImage: `url('${img}')`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundAttachment: 'fixed',
            transform: idx === current ? `scale(${zoom})` : 'scale(1)',
            transition: idx === current ? 'transform 6s linear, opacity 1s' : 'opacity 1s',
          }}
        />
      ))}
      {/* Canvas partículas */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full z-0 opacity-30 pointer-events-none" />
      {/* Overlay escuro e gradiente */}
      <div className="absolute inset-0 bg-black/85 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-start justify-center min-h-[70vh]">
        {/* Coluna esquerda */}
        <div className="flex flex-col items-start justify-center animate-fade-in-up">
          {/* Tag superior */}
          <div className="text-white text-xs sm:text-sm font-light tracking-widest mb-2 mt-8 sm:mt-0 uppercase" style={{letterSpacing: '0.15em'}}>
            Ondor - Arquitetura & Construção
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug md:leading-tight mb-5 sm:mb-7 tracking-wide text-white/90" style={{letterSpacing: '0.01em', fontFamily: 'Montserrat, Arial, sans-serif'}}>
            Sua <span className="text-ondor-special font-extrabold">Parceria Estratégica</span><br />
            em Arquitetura e <br /> Aprovações
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-6 sm:mb-10 font-light max-w-xl">
            Transformamos seu sonho de construir em realidade com <strong className="font-semibold text-ondor-special">técnica, visão e propósito.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 w-full max-w-md mb-2 sm:mb-0">
            <Link
              to="/contato"
              className="border-2 border-white text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 hover:border-ondor-special transition-all duration-300 text-center w-full sm:w-auto uppercase"
            >
              FALE CONOSCO
            </Link>
          </div>
        </div>
      </div>
      {/* Linhas verticais sutis */}
      <div className="absolute inset-0 pointer-events-none z-10">
        <div className="absolute top-0 bottom-0 left-1/4 w-px bg-white/10" />
        <div className="absolute top-0 bottom-0 left-1/2 w-px bg-white/10" />
        <div className="absolute top-0 bottom-0 left-3/4 w-px bg-white/10" />
      </div>
      {/* Faixa gold inferior, metade da tela, alinhada à direita */}
      <div className="absolute bottom-0 right-0 w-full sm:w-1/2 bg-[#bfa76a] py-5 px-4 sm:px-12 flex flex-col sm:flex-row items-center justify-center gap-4 z-20 shadow-lg rounded-tl-2xl rounded-tr-2xl sm:rounded-tr-none">
        <div className="flex flex-col sm:flex-row items-center justify-center w-full">
          <span className="text-lg sm:text-xl font-semibold tracking-wide text-black text-center">Loteamentos</span>
          <span className="hidden sm:inline-block text-2xl text-black sm:mx-4">|</span>
          <span className="text-lg sm:text-xl font-semibold tracking-wide text-black text-center">Empreendimentos Verticais & Horizontais</span>
        </div>
      </div>
    </section>
  );
};

export default NewHeroSection;
