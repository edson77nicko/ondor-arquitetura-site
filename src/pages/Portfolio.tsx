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
          
          {/* Sophisticated Mask with Multiple Gradients */}
          <div className="absolute inset-0 bg-gradient-to-br from-ondor-primary/80 via-ondor-primary/60 to-ondor-accent/70" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-ondor-primary/10 via-transparent to-ondor-primary/10" />
          
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
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Filtro por select */}
            <div className="flex justify-center mb-12">
              <select
                value={tab}
                onChange={e => setTab(e.target.value)}
                className="px-6 py-3 rounded-full font-semibold text-base border border-ondor-primary/30 focus:border-ondor-primary focus:ring-2 focus:ring-ondor-primary/30 bg-white text-ondor-primary shadow-sm outline-none transition-all"
                style={{ minWidth: 260, maxWidth: 340 }}
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

        {/* CTA Section */}
        <section 
          className="relative py-32 pb-32 bg-cover bg-center bg-fixed bg-no-repeat overflow-hidden"
          style={{
            backgroundImage: `linear-gradient(rgba(1, 46, 111, 0.7), rgba(1, 46, 111, 0.7)), url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`
          }}
        >
          <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-end">
              <div className="max-w-2xl bg-white/15 backdrop-blur-sm rounded-2xl p-12 border border-white/30">
                <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
                  Quer Fazer Parte do Nosso Portfólio?
                </h2>
                <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                  Entre em contato conosco e vamos transformar sua ideia em um projeto de sucesso.
                </p>
                <div className="flex flex-col sm:flex-row gap-4">
                  <Link
                    to="/contato"
                    className="inline-block bg-white text-ondor-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100/90 transition-all duration-300 transform hover:scale-105 text-center"
                  >
                    Iniciar Projeto
                  </Link>
                  <Link
                    to="/servicos"
                    className="inline-block border-2 border-white text-white px-8 py-4 rounded-xl font-semibold text-lg hover:bg-white/10 hover:border-white/50 transition-all duration-300 text-center"
                  >
                    Ver Nossos Serviços
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Portfolio;
