
import { useParams, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import { Building2, Home, Hammer, MapPin, Calendar, MapIcon, ArrowLeft, CheckCircle, Users, Zap } from 'lucide-react';

const PortfolioDetail = () => {
  const { slug } = useParams();

  // Dados simulados - em uma aplicação real, isso viria de uma API
  const portfolioData: { [key: string]: any } = {
    "residencial-vila-verde": {
      id: 1,
      title: "Residencial Vila Verde",
      category: "Condomínio Residencial",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Building2,
      description: "O Residencial Vila Verde representa um marco na habitação sustentável em Cotia. Com 120 unidades distribuídas em um terreno de 15.000m², o projeto combina modernidade, conforto e respeito ao meio ambiente.",
      location: "Cotia, SP",
      year: "2023",
      area: "15.000m²",
      status: "Concluído",
      client: "Construtora Verde Ltda",
      duration: "24 meses",
      gallery: [
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600573472593-0be6c78c28a3?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: [
        "120 apartamentos de 2 e 3 dormitórios",
        "Área de lazer completa com piscina",
        "Quadra poliesportiva",
        "Playground infantil",
        "Salão de festas",
        "Academia ao ar livre",
        "Portaria 24h",
        "Estacionamento para todos os moradores"
      ],
      challenges: [
        "Integração com área de preservação ambiental",
        "Aprovação em órgãos ambientais",
        "Logística de construção em área de difícil acesso"
      ],
      solutions: [
        "Projeto paisagístico que preserva 40% da vegetação nativa",
        "Sistema de tratamento de águas pluviais",
        "Acesso exclusivo para veículos de construção"
      ]
    },
    "casa-moderna-sp": {
      id: 2,
      title: "Casa Moderna SP",
      category: "Residencial Premium",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80",
      icon: Home,
      description: "Projeto residencial de alto padrão que redefine o conceito de moradia moderna. Com 450m² de área construída, a casa combina design contemporâneo com tecnologia de ponta.",
      location: "São Paulo, SP",
      year: "2023",
      area: "450m²",
      status: "Concluído",
      client: "Cliente Privado",
      duration: "18 meses",
      gallery: [
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753151-384129cf4e3e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566753086-00f18fb6b3ea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
        "https://images.unsplash.com/photo-1600566752355-35792bedcfea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
      ],
      features: [
        "4 suítes com closet",
        "Sala de estar integrada",
        "Cozinha gourmet",
        "Home theater",
        "Escritório",
        "Área gourmet com churrasqueira",
        "Piscina com raia de 25m",
        "Garagem para 4 carros"
      ],
      challenges: [
        "Terreno com declive acentuado",
        "Integração com paisagismo existente",
        "Aprovação em condomínio de alto padrão"
      ],
      solutions: [
        "Projeto em níveis aproveitando a topografia",
        "Muros de arrimo com acabamento paisagístico",
        "Arquitetura harmoniosa com o entorno"
      ]
    }
  };

  const project = portfolioData[slug as string];

  if (!project) {
    return (
      <Layout>
        <div className="min-h-screen pt-24 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Projeto não encontrado</h1>
            <Link to="/portfolio" className="text-ondor-primary hover:underline">
              Voltar ao portfólio
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  const Icon = project.icon;

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <section className="relative min-h-[600px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: `url('${project.image}')`
            }}
          />
          
          {/* Sophisticated Mask */}
          <div className="absolute inset-0 bg-gradient-to-br from-ondor-primary/80 via-ondor-primary/60 to-ondor-accent/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[600px] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              {/* Back Button */}
              <Link
                to="/portfolio"
                className="inline-flex items-center text-white/80 hover:text-white mb-8 transition-colors"
              >
                <ArrowLeft className="h-5 w-5 mr-2" />
                Voltar ao Portfólio
              </Link>
              
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div>
                  <div className="flex items-center mb-4">
                    <Icon className="h-12 w-12 text-white mr-4" />
                    <span className="text-white/80 text-lg">{project.category}</span>
                  </div>
                  <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
                    {project.title}
                  </h1>
                  <p className="text-xl text-gray-200 mb-8">
                    {project.description}
                  </p>
                  
                  {/* Project Stats */}
                  <div className="grid grid-cols-2 gap-6">
                    <div>
                      <div className="text-white/80 text-sm">Localização</div>
                      <div className="text-white font-semibold">{project.location}</div>
                    </div>
                    <div>
                      <div className="text-white/80 text-sm">Ano</div>
                      <div className="text-white font-semibold">{project.year}</div>
                    </div>
                    <div>
                      <div className="text-white/80 text-sm">Área</div>
                      <div className="text-white font-semibold">{project.area}</div>
                    </div>
                    <div>
                      <div className="text-white/80 text-sm">Status</div>
                      <div className={`font-semibold ${
                        project.status === 'Concluído' ? 'text-green-300' : 'text-orange-300'
                      }`}>
                        {project.status}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Details */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main Content */}
              <div className="lg:col-span-2">
                {/* Gallery */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Galeria do Projeto</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {project.gallery.map((image: string, index: number) => (
                      <div key={index} className="aspect-video rounded-lg overflow-hidden">
                        <img 
                          src={image} 
                          alt={`${project.title} - ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                    ))}
                  </div>
                </div>

                {/* Features */}
                <div className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Características do Projeto</h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {project.features.map((feature: string, index: number) => (
                      <div key={index} className="flex items-center">
                        <CheckCircle className="h-5 w-5 text-ondor-primary/90 mr-3 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Challenges & Solutions */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <Zap className="h-6 w-6 text-ondor-accent/90 mr-2" />
                      Desafios
                    </h3>
                    <ul className="space-y-3">
                      {project.challenges.map((challenge: string, index: number) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-ondor-accent/90 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {challenge}
                        </li>
                      ))}
                    </ul>
                  </div>
                  
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-4 flex items-center">
                      <CheckCircle className="h-6 w-6 text-ondor-primary/90 mr-2" />
                      Soluções
                    </h3>
                    <ul className="space-y-3">
                      {project.solutions.map((solution: string, index: number) => (
                        <li key={index} className="text-gray-600 flex items-start">
                          <span className="w-2 h-2 bg-ondor-primary/90 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          {solution}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Sidebar */}
              <div>
                <div className="bg-gray-50 rounded-2xl p-8 sticky top-24 border border-gray-100">
                  <h3 className="text-2xl font-bold text-gray-900 mb-6">Informações do Projeto</h3>
                  
                  <div className="space-y-6">
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Cliente</div>
                      <div className="font-semibold text-gray-900">{project.client}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Duração</div>
                      <div className="font-semibold text-gray-900">{project.duration}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Categoria</div>
                      <div className="font-semibold text-gray-900">{project.category}</div>
                    </div>
                    
                    <div>
                      <div className="text-sm text-gray-500 mb-1">Localização</div>
                      <div className="font-semibold text-gray-900">{project.location}</div>
                    </div>
                  </div>
                  
                  <div className="mt-8 pt-8 border-t border-gray-200">
                    <h4 className="font-bold text-gray-900 mb-4">Interessado em um projeto similar?</h4>
                    <Link
                      to="/contato"
                      className="block w-full bg-ondor-primary text-white text-center py-3 rounded-lg font-semibold hover:bg-ondor-primary/90 transition-colors"
                    >
                      Entre em Contato
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Related Projects */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Projetos Relacionados</h2>
              <p className="text-gray-600">Conheça outros projetos similares do nosso portfólio</p>
            </div>
            
            <div className="text-center">
              <Link
                to="/portfolio"
                className="inline-flex items-center bg-ondor-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-ondor-primary/90 transition-colors"
              >
                Ver Todos os Projetos
                <ArrowLeft className="h-5 w-5 ml-2 rotate-180" />
              </Link>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default PortfolioDetail;
