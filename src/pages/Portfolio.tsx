import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { Building2, Home, Hammer, MapPin, Calendar, MapIcon, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { portfolioItems, getProjectsSortedByCategoryAndId } from '../data/portfolioData';

const Portfolio = () => {
  // Usar dados centralizados ordenados por categoria e depois por projectId
  const allProjects = getProjectsSortedByCategoryAndId();

  const [tab, setTab] = useState('todos');
  const tabs = [
    { key: 'todos', label: 'Todos' },
    { key: 'verticais', label: 'Empreendimentos Verticais' },
    { key: 'horizontais', label: 'Empreendimentos Horizontais' },
    { key: 'loteamentos', label: 'Loteamentos' },
  ];

  const filteredItems = allProjects.filter(item => {
    if (tab === 'todos') return true;
    if (tab === 'verticais') return item.category === 'Empreendimentos Verticais';
    if (tab === 'horizontais') return item.category === 'Empreendimentos Horizontais';
    if (tab === 'loteamentos') return item.category === 'Loteamentos';
    return false;
  });

  return (
    <Layout>
      <SEOHead 
        title="Portfólio de Projetos | ONDOR Arquitetura & Imobiliária"
        description="Conheça nosso portfólio completo de empreendimentos verticais, horizontais e loteamentos. Mais de 40 anos de experiência em projetos arquitetônicos em Cotia e região."
        keywords="portfólio, projetos arquitetônicos, empreendimentos verticais, empreendimentos horizontais, loteamentos, Cotia, ONDOR"
        url="https://ondor.com.br/portfolio"
      />
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
            <div className="relative flex justify-center mb-12">
              <Select value={tab} onValueChange={setTab}>
                <SelectTrigger className="w-[220px] md:w-[340px] border-ondor-primary text-ondor-primary rounded-xl focus:border-ondor-special focus:ring-2 focus:ring-ondor-special/30">
                  <SelectValue placeholder="Selecione uma categoria" />
                </SelectTrigger>
                <SelectContent>
                  {tabs.map(t => (
                    <SelectItem key={t.key} value={t.key}>
                      {t.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-10">
              {filteredItems.map((item, index) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    className="group bg-gray-50 rounded-2xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-2xl hover:border-ondor-primary transition-all duration-300 animate-fade-in-up"
                    style={{ animationDelay: `${index * 0.08}s` }}
                  >
                    {/* Image */}
                    <Link to={`/portfolio/${item.slug}`} className="relative h-64 overflow-hidden block">
                      <img 
                        src={item.images[0]} 
                        alt={item.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                      
                      {/* Icon */}
                      <div className="absolute top-4 right-4 w-10 h-10 bg-white/80 rounded-full flex items-center justify-center">
                        <Icon className="h-5 w-5 text-ondor-primary/90" />
                      </div>
                    </Link>

                    {/* Content */}
                    <div className="p-6">
                      <div className="text-sm font-medium text-ondor-primary/90 mb-2">
                        {item.category}
                      </div>
                      <Link to={`/portfolio/${item.slug}`}>
                        <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-ondor-primary/90 transition-colors">
                          {item.title}
                        </h3>
                      </Link>
                      <p className="text-gray-600 mb-4 line-clamp-2">
                        {item.description.join(' • ')}
                      </p>
                      
                      {/* Project Info */}
                      <div className="grid grid-cols-1 gap-4 mb-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <MapIcon className="h-4 w-4 mr-1 text-gray-500/80" />
                          {item.location}
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
