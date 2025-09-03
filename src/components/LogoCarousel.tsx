import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import React from 'react';

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

const LogoCarousel = () => {
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
    <section className="w-full flex flex-col items-center justify-end z-20 py-8 bg-black">
      <div className="flex flex-col items-center w-full mb-3">
        <div className="w-14 h-px bg-white/30 mb-2" />
        <div className="text-[14px] text-white/70 font-light text-center">Nossos Clientes</div>
      </div>
      <div className="relative w-full max-w-6xl mx-auto">
        <div ref={emblaRef} className="overflow-hidden w-full">
          <div className="flex">
            {clientLogos.map((logo, idx) => (
              <div key={logo.src} className="flex items-center justify-center px-6 basis-1/2 sm:basis-1/3 md:basis-1/5 transition-opacity duration-500">
                <img src={logo.src} alt={logo.alt} className="h-16 object-contain" style={{maxWidth: '180px'}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel;