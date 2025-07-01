import Layout from '../components/Layout';
import { Building2, Home, Hammer, MapPin, Calendar, MapIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';

const Portfolio = () => {
  const portfolioItems = [
    {
      id: 1,
      slug: "residencial-vila-verde",
      title: "Residencial Vila Verde",
      category: "Condomínio Residencial",
      image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Building2,
      description: "Complexo residencial com 120 unidades e área de lazer completa",
      location: "Cotia, SP",
      year: "2023",
      area: "15.000m²",
      status: "Concluído"
    },
    {
      id: 2,
      slug: "casa-moderna-sp",
      title: "Casa Moderna SP",
      category: "Residencial Premium",
      image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Home,
      description: "Casa contemporânea de alto padrão com 450m² de área construída",
      location: "São Paulo, SP",
      year: "2023",
      area: "450m²",
      status: "Concluído"
    },
    {
      id: 3,
      slug: "centro-comercial-cotia",
      title: "Centro Comercial Cotia",
      category: "Empreendimento Comercial",
      image: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Hammer,
      description: "Centro comercial com 50 lojas e estacionamento para 200 vagas",
      location: "Cotia, SP",
      year: "2022",
      area: "8.500m²",
      status: "Concluído"
    },
    {
      id: 4,
      slug: "loteamento-horizonte",
      title: "Loteamento Horizonte",
      category: "Desenvolvimento Urbano",
      image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: MapPin,
      description: "Loteamento residencial com 200 lotes e infraestrutura completa",
      location: "Vargem Grande Paulista, SP",
      year: "2024",
      area: "50.000m²",
      status: "Em Andamento"
    },
    {
      id: 5,
      slug: "edificio-corporate",
      title: "Edifício Corporate",
      category: "Comercial",
      image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Building2,
      description: "Edifício corporativo com 20 andares e heliponto",
      location: "São Paulo, SP",
      year: "2023",
      area: "12.000m²",
      status: "Concluído"
    },
    {
      id: 6,
      slug: "condominio-gardens",
      title: "Condomínio Gardens",
      category: "Residencial",
      image: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
      icon: Home,
      description: "Condomínio residencial com 80 casas e clube completo",
      location: "Granja Viana, SP",
      year: "2024",
      area: "25.000m²",
      status: "Em Andamento"
    }
  ];

  const [tab, setTab] = useState('todos');
  const tabs = [
    { key: 'todos', label: 'Todos' },
    { key: 'verticais', label: 'Empreendimentos Verticais' },
    { key: 'horizontais', label: 'Empreendimentos Horizontais' },
    { key: 'loteamento', label: 'Loteamento' },
  ];

  return (
    <Layout>
      <div>
        {/* Hero Section */}
        <section className="relative min-h-[600px] overflow-hidden">
          {/* Background Image */}
          <div 
            className="absolute inset-0 bg-cover bg-center bg-no-repeat"
            style={{
              backgroundImage: "url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
            }}
          />
          {/* Máscara preta igual à home */}
          <div className="absolute inset-0 bg-black/85 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[600px] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                Nosso Portfólio de Projetos
              </h1>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto animate-fade-in-up">
                Conheça os empreendimentos que transformamos em realidade. Cada projeto representa nossa dedicação em unir técnica, legalidade e viabilidade comercial para entregar resultados excepcionais.
              </p>
            </div>
          </div>
        </section>

        {/* Portfolio Tabs + Grid */}
        <section className="py-20 pb-16 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filtro por select */}
            <div className="flex justify-center mb-12">
              <select
                value={tab}
                onChange={e => setTab(e.target.value)}
                className="px-8 py-3 rounded-xl font-semibold text-base border-2 border-ondor-primary focus:border-ondor-special focus:ring-2 focus:ring-ondor-special/30 bg-white text-ondor-primary shadow-sm outline-none transition-all"
                style={{ minWidth: 220, maxWidth: 340 }}
              >
                {tabs.map(t => (
                  <option key={t.key} value={t.key}>{t.label}</option>
                ))}
              </select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {portfolioItems.slice(0, 3).map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-ondor-primary transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden">
                      <img 
                        src={item.image} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Status Badge */}
                      <div className={`absolute top-4 left-4 px-3 py-1 rounded-full text-sm font-medium ${
                        item.status === 'Concluído' 
                          ? 'bg-green-600 text-white' 
                          : 'bg-orange-600 text-white'
                      }`}>
                        {item.status}
                      </div>
                      
                      {/* Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-ondor-primary/90" />
                      </div>
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      <div className="text-sm font-medium text-ondor-primary/90 mb-2">
                        {item.category}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ondor-primary/90 transition-colors">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.description}
                      </p>
                      
                      {/* Project Info */}
                      <div className="grid grid-cols-2 gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapIcon className="h-4 w-4 mr-1 text-gray-500/80" />
                          {item.location}
                        </div>
                        <div className="flex items-center">
                          <Calendar className="h-4 w-4 mr-1 text-gray-500/80" />
                          {item.year}
                        </div>
                      </div>
                      
                      {/* CTA */}
                      <Link
                        to={`/portfolio/${item.slug}`}
                        className="inline-flex items-center text-ondor-primary/90 font-medium hover:text-ondor-primary transition-colors"
                      >
                        Ver Detalhes
                        <ArrowRight className="h-4 w-4 ml-1" />
                      </Link>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Portfolio;
