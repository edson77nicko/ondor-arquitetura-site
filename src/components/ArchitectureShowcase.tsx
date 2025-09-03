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
        <div className="w-[70%] mx-auto">
          <div className="relative w-full overflow-hidden" style={{ paddingTop: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-2xl shadow-2xl border border-gray-200"
              src="https://www.youtube.com/embed/kLJcV96ADmg"
              title="Vídeo Institucional ONDOR"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureShowcase;
