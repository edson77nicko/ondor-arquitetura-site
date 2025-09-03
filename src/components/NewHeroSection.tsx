import { Link } from 'react-router-dom';
import { MapPin, Building, Home, FileText } from 'lucide-react';
import whatsappIcon from './icons/whatsapp.svg';
import { useEffect, useState, useCallback } from 'react';
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel';
import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import { Particles } from '@tsparticles/react';
import { loadFull } from 'tsparticles';

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
  { src: 'https://i.postimg.cc/8P5kmDpt/Frame-10.png', alt: 'Logo cliente parceiro ONDOR' },
  { src: 'https://i.postimg.cc/dtxsWXDv/Frame-11.png', alt: 'Logo empresa cliente ONDOR' },
  { src: 'https://i.postimg.cc/mk6s5zLV/Frame-2.png', alt: 'Logo parceiro comercial ONDOR' },
  { src: 'https://i.postimg.cc/ryhMmb1W/Frame-3.png', alt: 'Logo cliente empreendimento ONDOR' },
  { src: 'https://i.postimg.cc/zvfN7SrV/Frame-4.png', alt: 'Logo empresa parceira ONDOR' },
  { src: 'https://i.postimg.cc/vBhM52CJ/Frame-5.png', alt: 'Logo cliente arquitetura ONDOR' },
  { src: 'https://i.postimg.cc/nLvnhh2c/Frame-6.png', alt: 'Logo parceiro imobiliário ONDOR' },
  { src: 'https://i.postimg.cc/Qthh9ZYg/Frame-7.png', alt: 'Logo cliente loteamento ONDOR' },
  { src: 'https://i.postimg.cc/GmTc6QsD/Frame-8.png', alt: 'Logo empresa cliente ONDOR' },
  { src: 'https://i.postimg.cc/s2FVzhpN/Frame-9.png', alt: 'Logo parceiro estratégico ONDOR' },
];

const NewHeroSection = () => {
  const [current, setCurrent] = useState(0);
  const [zoom, setZoom] = useState(1);

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

  const particlesInit = useCallback(async (engine) => {
    await loadFull(engine);
  }, []);

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
      {/* Overlay escuro e gradiente acima do slide */}
      <div className="absolute inset-0 bg-black/85 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10" />
      {/* Partículas acima do overlay, abaixo do conteúdo principal */}
      {/* <div className="absolute inset-0 w-full h-full z-20 pointer-events-none">
        <Particles
          init={particlesInit}
          options={{
            fullScreen: false,
            background: { color: { value: 'transparent' } },
            particles: {
              number: { value: 32, density: { enable: true, width: 800, height: 800 } },
              color: { value: '#fff' },
              opacity: { value: 0.45 },
              size: { value: { min: 1.5, max: 4 } },
              move: { enable: true, speed: 0.3, direction: 'none', random: true, straight: false, outModes: { default: 'out' } },
              links: { enable: false },
            },
            detectRetina: true,
          }}
        />
      </div> */}
      {/* Conteúdo principal acima de tudo */}
      <div className="relative z-30 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center min-h-[70vh] text-center flex-1">
        {/* Coluna centralizada */}
        <div className="flex flex-col items-center justify-center w-full">
          {/* Tag superior */}
          <div className="text-white text-xs sm:text-sm font-light tracking-widest mb-2 mt-8 sm:mt-0 uppercase hero-fade-in-up" style={{letterSpacing: '0.15em'}}>
            Ondor - Arquitetura & Construções
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
          <p className="text-base sm:text-lg text-white/90 mb-3 sm:mb-5 font-light max-w-3xl mx-auto text-center hero-fade-in-up-delay2">
            Transformamos seu sonho de construir em realidade com <strong className="font-semibold text-ondor-special">técnica, visão e propósito.</strong>
          </p>
          <div className="flex flex-col sm:flex-row gap-5 w-full max-w-[600px] mb-2 sm:mb-0 justify-center hero-fade-in-up-delay3">
            <a
              href="https://wa.me/5511947095205?text=Olá! Gostaria de iniciar meu projeto com a ONDOR. Podem me ajudar?"
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
              to="/servicos"
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
      <div className="w-full flex flex-col items-center mt-12 mb-2 hero-fade-in-up-delay3 z-30">
        <p className="text-base sm:text-lg text-white/90 font-light max-w-3xl mx-auto text-center">
          Especialistas em <strong className="font-semibold">EMPREENDIMENTOS VERTICAIS, HORIZONTAIS</strong> e <strong className="font-semibold">LOTEAMENTOS.</strong>
        </p>
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
        {clientLogos.map((logo, idx) => (
              <div key={logo.src} className="flex items-center justify-center px-6 basis-1/2 sm:basis-1/3 md:basis-1/5 transition-opacity duration-500">
                <img src={logo.src} alt={logo.alt} className="h-16 object-contain" style={{maxWidth: '180px'}} />
              </div>
            ))}
      </div>
    </div>
  );
}

export default NewHeroSection;
