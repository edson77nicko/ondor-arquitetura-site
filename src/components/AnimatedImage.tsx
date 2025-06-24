import React, { useEffect, useState, useRef } from 'react';

interface AnimatedImageProps {
  src: string;
  alt: string;
  delay?: number;
  className?: string;
}

const AnimatedImage: React.FC<AnimatedImageProps> = ({ src, alt, delay = 0, className }) => {
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect(); // Stop observing once visible
        }
      },
      { threshold: 0.1 } // Trigger when 10% of the image is visible
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  return (
    <img
      ref={imageRef}
      src={src}
      alt={alt}
      className={`w-full h-80 object-cover transition-all duration-1000 ${className} ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    />
  );
};

export default AnimatedImage;
