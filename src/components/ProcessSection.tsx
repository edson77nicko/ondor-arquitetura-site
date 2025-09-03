import { Lightbulb, PenTool, Hammer, Key } from 'lucide-react';
import AnimatedImage from './AnimatedImage';
import JornadaImage from '../assets/Jornada.jpg'; // Import the image

const ProcessSection = () => {
  const steps = [
    {
      number: "01",
      title: "Conceituação",
      description: "Transformamos suas necessidades em um conceito claro e exclusivo."
    },
    {
      number: "02",
      title: "Estudo Preliminar",
      description: "Apresentamos soluções visuais e funcionais para o projeto."
    },
    {
      number: "03",
      title: "Projeto Arquitetônico",
      description: "Desenvolvemos o projeto completo com todos os detalhes necessários."
    },
    {
      number: "04",
      title: "Aprovação Legal",
      description: "Conduzimos todo o processo de aprovação junto aos órgãos competentes."
    }
  ];

  return (
    <section className="py-20 bg-white relative overflow-hidden">
      {/* Background Pattern - Keeping it subtle */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23012E6F' fill-opacity='1'%3E%3Cpath d='m36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4h-4z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column: Process Timeline */}
          <div className="lg:pr-12">
            <h2 className="text-4xl font-bold text-gray-900 mb-12 leading-tight">
              Nossa <span className="text-ondor-primary">Jornada</span> de Projeto
            </h2>

            <div className="relative">
              {/* Vertical Line */}
              <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200"></div>

              {steps.map((step, index) => (
                <div key={index} className="flex items-start mb-12 relative">
                  {/* Circle with Number */}
                  <div className="flex-shrink-0 w-12 h-12 rounded-full bg-ondor-primary text-white flex items-center justify-center text-lg font-bold z-10 shadow-md">
                    {step.number}
                  </div>
                  {/* Content */}
                  <div className="ml-6">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">
                      {step.title}
                    </h3>
                    <p className="text-gray-700 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Image */}
          <div className="lg:pl-12">
            <div className="relative overflow-hidden rounded-2xl shadow-2xl aspect-w-4 aspect-h-5">
              <AnimatedImage
                src={JornadaImage}
                alt="Processo de Arquitetura"
                className="w-full h-full object-cover"
                delay={200}
              />
              <div className="absolute inset-0 bg-gradient-to-br from-ondor-primary/10 to-ondor-accent/10"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProcessSection;
