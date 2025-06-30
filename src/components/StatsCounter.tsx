import { useState, useEffect, useRef } from 'react';

interface Stat {
  value: string;
  label: string;
  numericValue: number;
}

const StatsCounter = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [counts, setCounts] = useState<number[]>([0, 0, 0, 0]);
  const sectionRef = useRef<HTMLDivElement>(null);

  const stats: Stat[] = [
    { value: "40+", label: "Anos de Experiência", numericValue: 40 },
    { value: "100%", label: "Projetos Aprovados", numericValue: 100 },
    { value: "500+", label: "Empreendimentos", numericValue: 500 },
    { value: "1h", label: "Tempo de Resposta", numericValue: 1 }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (isVisible) {
      stats.forEach((stat, index) => {
        const duration = 2000; // 2 seconds
        const steps = 60;
        const increment = stat.numericValue / steps;
        let currentCount = 0;

        const timer = setInterval(() => {
          currentCount += increment;
          if (currentCount >= stat.numericValue) {
            currentCount = stat.numericValue;
            clearInterval(timer);
          }
          
          setCounts(prev => {
            const newCounts = [...prev];
            newCounts[index] = Math.floor(currentCount);
            return newCounts;
          });
        }, duration / steps);

        return () => clearInterval(timer);
      });
    }
  }, [isVisible]);

  const formatDisplayValue = (count: number, originalValue: string) => {
    if (originalValue.includes('%')) {
      return `${count}%`;
    } else if (originalValue.includes('+')) {
      return `${count}+`;
    } else if (originalValue.includes('h')) {
      return `${count}h`;
    }
    return count.toString();
  };

  return (
    <section ref={sectionRef} className="py-16 bg-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className={`text-center transform transition-all duration-1000 ${
                isVisible 
                  ? 'opacity-100 translate-y-0' 
                  : 'opacity-0 translate-y-10'
              }`}
              style={{ 
                transitionDelay: `${index * 150}ms`,
                animationDelay: `${index * 150}ms`
              }}
            >
              <div className="relative">
                <div className="text-4xl md:text-5xl font-bold text-white mb-2 relative shadow-lg">
                  {formatDisplayValue(counts[index], stat.value)}
                  <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-1 bg-gradient-to-r from-white/80 to-ondor-special/80 rounded-full"></div>
                </div>
                <div className="text-white font-medium text-sm md:text-base opacity-90">
                  {stat.label}
                </div>
                {index < stats.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 h-12 w-px bg-white/20 -translate-y-1/2" />
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsCounter;
