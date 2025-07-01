import { Link } from 'react-router-dom';
import { MapPin, Building, Home, FileText } from 'lucide-react';
import whatsappIcon from './icons/whatsapp.svg';
import { useEffect, useRef, useState } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';

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
  'https://i.postimg.cc/tCh2q1nM/anthony-delanoix-b5-POxb2a-L9o-unsplash-2.webp',
  'https://i.postimg.cc/XJ4ygJYp/low-angle-view-of-t.webp',
  'https://i.postimg.cc/66SpWqxn/low-angle-shot-of.jpg',
];

const clientLogos = [
  'https://i.postimg.cc/8P5kmDpt/Frame-10.png',
  'https://i.postimg.cc/dtxsWXDv/Frame-11.png',
  'https://i.postimg.cc/mk6s5zLV/Frame-2.png',
  'https://i.postimg.cc/ryhMmb1W/Frame-3.png',
  'https://i.postimg.cc/zvfN7SrV/Frame-4.png',
  'https://i.postimg.cc/vBhM52CJ/Frame-5.png',
  'https://i.postimg.cc/nLvnhh2c/Frame-6.png',
  'https://i.postimg.cc/Qthh9ZYg/Frame-7.png',
  'https://i.postimg.cc/GmTc6QsD/Frame-8.png',
  'https://i.postimg.cc/s2FVzhpN/Frame-9.png',
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

  // Animações locais para fade-in-up
  // eslint-disable-next-line jsx-a11y/no-static-element-interactions
  return (
    <section className="relative min-h-screen flex flex-col justify-between text-white py-16 overflow-hidden">
      <style>{`
        @keyframes hero-fade-in-up {
          0% { opacity: 0; transform: translateY(32px); }
          100% { opacity: 1; transform: translateY(0); }
        }
        .hero-fade-in-up { animation: hero-fade-in-up 0.9s cubic-bezier(0.23,1,0.32,1) both; }
        .hero-fade-in-up-delay { animation: hero-fade-in-up 0.9s cubic-bezier(0.23,1,0.32,1) both; animation-delay: 0.3s; }
        .hero-fade-in-up-delay2 { animation: hero-fade-in-up 0.9s cubic-bezier(0.23,1,0.32,1) both; animation-delay: 0.6s; }
        .hero-fade-in-up-delay3 { animation: hero-fade-in-up 0.9s cubic-bezier(0.23,1,0.32,1) both; animation-delay: 0.9s; }
      `}</style>
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
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh] text-center flex-1">
        {/* Coluna centralizada */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Tag superior */}
          <div className="text-white text-xs sm:text-sm font-light tracking-widest mb-2 mt-8 sm:mt-0 uppercase hero-fade-in-up" style={{letterSpacing: '0.15em'}}>
            Ondor - Arquitetura & Construção
          </div>
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-extrabold leading-snug md:leading-tight mb-3 sm:mb-5 tracking-wide text-white/90 hero-fade-in-up-delay"
            style={{
              letterSpacing: '0.01em',
              fontFamily: 'Montserrat, Arial, sans-serif',
              textShadow: '0 2px 8px rgba(0,0,0,0.18), 0 1px 2px rgba(0,0,0,0.12)'
            }}
          >
            Sua Parceria Estratégica em<br />
            Arquitetura e Aprovações
          </h1>
          <p className="text-base sm:text-lg text-white/90 mb-3 sm:mb-5 font-light max-w-3xl mx-auto whitespace-nowrap text-center hero-fade-in-up-delay2">
            Transformamos seu sonho de construir em realidade com <strong className="font-semibold text-ondor-special">técnica, visão e propósito.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-[600px] mb-2 sm:mb-0 justify-center hero-fade-in-up-delay3">
            <a
              href="https://wa.me/"
              target="_blank"
              rel="noreferrer"
              className="border-2 border-white px-8 py-2 rounded-xl font-bold text-lg transition-all duration-300 text-center w-full sm:w-auto uppercase"
              style={{
                background: 'hsl(var(--accent) / 0.97)',
                color: 'hsl(var(--primary))',
                boxShadow: 'none',
                textShadow: 'none',
              }}
              onMouseOver={e => {
                e.currentTarget.style.boxShadow = '0 8px 18px -6px rgba(0,0,0,0.16)';
                e.currentTarget.style.background = 'hsl(var(--accent) / 1)';
                e.currentTarget.style.borderColor = 'white';
              }}
              onMouseOut={e => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.background = 'hsl(var(--accent) / 0.97)';
                e.currentTarget.style.borderColor = 'white';
              }}
            >
              <span className="flex items-center justify-center gap-2">
                <img src={whatsappIcon} alt="WhatsApp" style={{ width: 22, height: 22, marginRight: 4 }} />
                INICIE SEU PROJETO
              </span>
            </a>
            <Link
              to="#"
              className="border-2 border-white text-white px-8 py-2 rounded-xl font-bold text-lg transition-all duration-300 text-center w-full sm:w-auto uppercase hover:bg-white/10"
              style={{
                background: 'transparent',
                boxShadow: 'none',
                textShadow: 'none',
              }}
            >
              NOSSOS SERVIÇOS
            </Link>
          </div>
        </div>
      </div>

      {/* Itens de serviços na parte inferior da seção */}
      <div className="w-full flex flex-col sm:flex-row items-center justify-center gap-6 mt-12 mb-2 hero-fade-in-up-delay3">
        <div className="flex items-center gap-2 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2h5m6-16v4m0 0V4m0 4a4 4 0 11-8 0 4 4 0 018 0z" /></svg>
          <span className="text-base sm:text-lg font-semibold text-white">Loteamentos</span>
        </div>
        <div className="flex items-center gap-2 justify-center">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M3 6h18M3 14h18M3 18h18" /></svg>
          <span className="text-base sm:text-lg font-semibold text-white">Empreendimentos Verticais & Horizontais</span>
        </div>
      </div>
    </section>
  );
};

function AutoPlayLogoCarousel() {
  const [emblaRef] = useEmblaCarousel({
    align: 'start',
    loop: true,
    dragFree: true,
    skipSnaps: false,
  }, [
    AutoScroll({
      speed: 1.2,
      stopOnInteraction: false,
      stopOnMouseEnter: false,
      stopOnFocusIn: false,
    })
  ]);

  return (
    <div ref={emblaRef} className="overflow-hidden w-full">
      <div className="flex">
        {clientLogos.map((src, idx) => (
          <div key={src} className="flex items-center justify-center px-6 basis-1/2 sm:basis-1/3 md:basis-1/5 transition-opacity duration-500">
            <img src={src} alt={`Logo cliente ${idx + 1}`} className="h-16 object-contain" style={{maxWidth: '180px'}} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default NewHeroSection;
