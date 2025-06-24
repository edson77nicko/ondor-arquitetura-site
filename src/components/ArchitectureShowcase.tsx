
import { useState } from 'react';
import { ChevronLeft, ChevronRight, Eye, Award, Users } from 'lucide-react';

const ArchitectureShowcase = () => {
  const [activeProject, setActiveProject] = useState(0);

  const projects = [
    {
      id: 1,
      title: "Residencial Premium",
      category: "Residencial",
      area: "450m²",
      year: "2024",
      image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Projeto residencial moderno com integração total entre ambientes internos e externos."
    },
    {
      id: 2,
      title: "Centro Corporativo",
      category: "Comercial",
      area: "2.800m²",
      year: "2023",
      image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Edifício corporativo sustentável com certificação LEED e design inovador."
    },
    {
      id: 3,
      title: "Condomínio Vertical",
      category: "Residencial",
      area: "12.000m²",
      year: "2023",
      image: "https://images.unsplash.com/photo-1449157291145-7efd050a4d0e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
      description: "Complexo residencial com áreas de lazer completas e vista panorâmica."
    }
  ];

  const nextProject = () => {
    setActiveProject((prev) => (prev + 1) % projects.length);
  };

  const prevProject = () => {
    setActiveProject((prev) => (prev - 1 + projects.length) % projects.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Projetos em Destaque
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Cada projeto é uma história única de transformação, inovação e excelência arquitetônica
          </p>
        </div>

        <div className="relative">
          {/* Main Image Display */}
          <div className="relative h-[600px] rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={projects[activeProject].image}
              alt={projects[activeProject].title}
              className="w-full h-full object-cover transition-all duration-700"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>
            
            {/* Project Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
              <div className="flex flex-wrap items-end justify-between">
                <div className="mb-4 lg:mb-0">
                  <div className="text-sm font-medium text-white/80 mb-2">
                    {projects[activeProject].category}
                  </div>
                  <h3 className="text-3xl font-bold mb-2">
                    {projects[activeProject].title}
                  </h3>
                  <p className="text-lg text-white/90 max-w-2xl">
                    {projects[activeProject].description}
                  </p>
                </div>
                
                <div className="flex flex-col lg:flex-row space-y-4 lg:space-y-0 lg:space-x-6 text-center">
                  <div>
                    <div className="text-2xl font-bold">{projects[activeProject].area}</div>
                    <div className="text-sm text-white/80">Área Total</div>
                  </div>
                  <div>
                    <div className="text-2xl font-bold">{projects[activeProject].year}</div>
                    <div className="text-sm text-white/80">Conclusão</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevProject}
              className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
            >
              <ChevronLeft size={24} />
            </button>
            <button
              onClick={nextProject}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-2 rounded-full bg-black/30 backdrop-blur-sm text-white hover:bg-black/50 transition-all duration-300"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Project Thumbnails */}
          <div className="flex justify-center mt-8 space-x-4">
            {projects.map((project, index) => (
              <button
                key={project.id}
                onClick={() => setActiveProject(index)}
                className={`relative w-20 h-20 rounded-lg overflow-hidden transition-all duration-300 ${
                  index === activeProject ? 'ring-2 ring-ondor-primary' : 'opacity-60 hover:opacity-80'
                }`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </button>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default ArchitectureShowcase;
