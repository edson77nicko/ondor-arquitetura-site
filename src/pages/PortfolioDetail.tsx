import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import StructuredData from '../components/StructuredData';
import { Building2, Home, Hammer, MapPin, Calendar, MapIcon, ArrowRight } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { portfolioItems, getProjectBySlug } from '../data/portfolioData';
import ImageModal from '../components/ImageModal';
import { useState } from 'react';



const PortfolioDetail = () => {
  const { slug } = useParams();
  const project = getProjectBySlug(slug || '');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);

  if (!project) {
    return <div>Projeto não encontrado</div>;
  }

  return (
    <Layout>
      <SEOHead 
        title={`${project.title} | ONDOR Arquitetura & Imobiliária`}
        description={`${project.title} - ${project.category} em ${project.location}. ${project.description.slice(0, 2).join(' • ')}. Conheça mais detalhes deste projeto da ONDOR.`}
        keywords={`${project.title}, ${project.category}, ${project.location}, arquitetura, ONDOR, empreendimento`}
        url={`https://ondor.com.br/portfolio/${project.slug}`}
        image={project.images[0]}
        type="article"
      />
      <StructuredData type="project" data={project} />
      <StructuredData 
        type="breadcrumb" 
        data={[
          { name: "Início", url: "https://ondor.com.br" },
          { name: "Portfólio", url: "https://ondor.com.br/portfolio" },
          { name: project.title, url: `https://ondor.com.br/portfolio/${project.slug}` }
        ]} 
      />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative min-h-[500px] overflow-hidden">
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{ backgroundImage: `url(${project.images[0]})` }}
          />
          <div className="absolute inset-0 bg-black/85 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
          <div className="relative z-10 flex items-center min-h-[500px] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 animate-fade-in">
                {project.title}
              </h1>
              <p className="text-xl text-gray-200 animate-fade-in-up">
                {project.category}
              </p>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              <div className="lg:col-span-2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Detalhes do Projeto</h2>
                <ul className="space-y-3 text-gray-700 text-lg">
                  {project.description.map((line, index) => (
                    <li key={index} className="flex items-start">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-ondor-primary flex-shrink-0 mt-1 mr-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                      <span>{line}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <div className="bg-gray-50 p-8 rounded-2xl shadow-sm border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações</h3>
                  <ul className="space-y-4 text-lg">
                    <li className="flex items-center"><MapPin className="h-5 w-5 mr-3 text-ondor-primary" /> <strong>Localização:</strong> &nbsp; {project.location}</li>
                    <li className="flex items-center"><MapIcon className="h-5 w-5 mr-3 text-ondor-primary" /> <strong>Área:</strong> &nbsp; {project.area}</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Gallery */}
        <section className="py-20 bg-gray-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-12 text-center">Galeria de Imagens</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {project.images.map((image, index) => (
                <div 
                  key={index} 
                  className="relative overflow-hidden rounded-2xl shadow-lg cursor-pointer group transition-transform duration-300 hover:scale-105"
                  onClick={() => {
                    setSelectedImageIndex(index);
                    setIsModalOpen(true);
                  }}
                >
                  <img 
                    src={image} 
                    alt={`${project.title} - Imagem ${index + 1}`} 
                    className="w-full h-full object-cover group-hover:brightness-110 transition-all duration-300" 
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-all duration-300 flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white/90 rounded-full p-2">
                      <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                      </svg>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
      
      {/* Image Modal */}
      <ImageModal
        images={project.images}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialIndex={selectedImageIndex}
        projectTitle={project.title}
      />
    </Layout>
  );
};

export default PortfolioDetail;
