import useEmblaCarousel from 'embla-carousel-react';
import AutoScroll from 'embla-carousel-auto-scroll';
import React from 'react';

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
            {clientLogos.map((src, idx) => (
              <div key={src} className="flex items-center justify-center px-6 basis-1/2 sm:basis-1/3 md:basis-1/5 transition-opacity duration-500">
                <img src={src} alt={`Logo cliente ${idx + 1}`} className="h-16 object-contain" style={{maxWidth: '180px'}} />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default LogoCarousel; 