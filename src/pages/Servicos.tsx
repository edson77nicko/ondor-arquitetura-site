import Layout from '../components/Layout';
import { Building, FileCheck, Hammer, Home, CheckCircle, MapPin, ArrowRight, Star, Award, Shield, Users, TrendingUp } from 'lucide-react';

const Servicos = () => {
  // Original detailed services data
  const services = [
    {
      icon: Building,
      title: "Arquitetura Especializada",
      description: "Projetos técnicos personalizados para verticais, horizontais, residenciais e comerciais.",
      features: [
        "Projetos arquitetônicos completos",
        "Plantas baixas e cortes técnicos",
        "Projetos de interiores",
        "Modelagem 3D e renderização"
      ],
      gradient: "from-blue-500 to-cyan-500" // Added for styling consistency
    },
    {
      icon: FileCheck,
      title: "Legalização e Aprovação",
      description: "Cuidamos de toda a burocracia: licenças, Habite-se, registros e CNDs.",
      features: [
        "Aprovação na Prefeitura",
        "Licenças ambientais",
        "Habite-se e CNDs",
        "Registros cartoriais"
      ],
      gradient: "from-green-500 to-emerald-500" // Added for styling consistency
    },
    {
      icon: Hammer,
      title: "Execução Técnica e Obras",
      description: "Acompanhamento de obras e suporte técnico com uma equipe experiente.",
      features: [
        "Gerenciamento de obras",
        "Fiscalização técnica",
        "Controle de qualidade",
        "Cronograma de execução"
      ],
      gradient: "from-orange-500 to-red-500" // Added for styling consistency
    },
    {
      icon: Home,
      title: "Imobiliária Integrada",
      description: "Prospecção de áreas, análise de viabilidade e suporte na comercialização.",
      features: [
        "Prospecção de terrenos",
        "Análise de viabilidade",
        "Estudo de mercado",
        "Suporte na comercialização"
      ],
      gradient: "from-purple-500 to-pink-500" // Added for styling consistency
    }
  ];

  // Featured services to match the three highlighted in the home hero
  const featuredServices = [
    {
      icon: MapPin,
      title: "Loteamentos",
      description: "Do planejamento à legalização completa, garantindo a viabilidade de seu empreendimento."
    },
    {
      icon: Building,
      title: "Empreendimentos Verticais",
      description: "Soluções arquitetônicas inteligentes e eficientes, da concepção à entrega."
    },
    {
      icon: Home,
      title: "Empreendimentos Horizontais",
      description: "Projetos personalizados com foco em qualidade e otimização para o seu investimento."
    }
  ];

  // Differentials data from Differentials.tsx
  const differentials = [
    {
      icon: Users,
      title: "Arquitetura + Imobiliária",
      description: "Soluções completas em um só lugar, integrando projeto arquitetônico e viabilidade comercial."
    },
    {
      icon: Shield,
      title: "Domínio Legal",
      description: "Forte conhecimento regulatório garante aprovações ágeis em todos os órgãos competentes."
    },
    {
      icon: Star,
      title: "Projetos Personalizados",
      description: "Cada projeto é moldado ao perfil específico do investidor e características do terreno."
    },
    {
      icon: Award,
      title: "Reputação Consolidada",
      description: "Mais de 40 anos como referência em Cotia e região metropolitana de São Paulo."
    },
    {
      icon: TrendingUp,
      title: "Equipe Multidisciplinar",
      description: "Profissionais próprios e experientes em todas as etapas do empreendimento."
    }
  ];


  return (
    <Layout>
      {/* Hero Section - Summarized and aligned with Home page aesthetic */}
      <section className="relative min-h-[600px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1460574283810-2aab119d8511?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
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
              Nossos <span className="text-ondor-special">Serviços</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-4xl mx-auto animate-fade-in-up">
              Descubra como nossa expertise de mais de 40 anos pode transformar seu projeto em realidade.
            </p>
          </div>
        </div>
      </section>

      {/* Featured Services Section - Highlighted cards from Home Hero */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-12">
            Nossas Áreas de Atuação
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredServices.map((service, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 flex flex-col items-center text-center animate-fade-in-up"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex-shrink-0 w-12 h-12 bg-ondor-primary/10 dark:bg-ondor-primary rounded-xl flex items-center justify-center mb-6">
                  <service.icon className="h-6 w-6 text-ondor-primary dark:text-white" />
                </div>
                <h3 className="font-semibold text-2xl mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-200 text-base">
                  {service.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Detailed Services Section - Redesigned with Home page section style */}
      <section className="py-20 bg-gradient-to-br from-gray-50 via-white to-gray-100 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0">
          <div className="absolute top-10 right-10 w-72 h-72 bg-gradient-to-br from-ondor-primary/3 to-ondor-accent/3 rounded-full blur-2xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-gradient-to-tr from-blue-500/3 to-purple-500/3 rounded-full blur-2xl"></div>
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 text-center mb-16">
            Aprofunde-se em Nossos Serviços
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {services.map((service, index) => {
              const Icon = service.icon;
              const isFirstCard = index === 0;
              return (
                <div
                  key={index}
                  className={`group relative rounded-2xl shadow-lg transition-all duration-700 transform hover:scale-105 hover:shadow-2xl hover:border-ondor-primary cursor-pointer animate-fade-in-up
                    ${isFirstCard ? 'bg-gradient-to-br from-ondor-primary to-ondor-accent text-white shadow-2xl' : 'bg-white dark:bg-ondor-primary border border-gray-200 dark:border-ondor-primary/60'}
                    ${true ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-12 opacity-0 scale-95'}`}
                  style={{
                    animationDelay: `${index * 0.15}s`
                  }}
                >
                  {/* Content */}
                  <div className="relative p-8 h-full flex flex-col">
                    {/* Icon */}
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-6 transition-all duration-500
                      ${isFirstCard ? 'bg-white/20 text-white' : 'bg-ondor-primary/10 dark:bg-ondor-primary'}
                    `}>
                      <Icon className={`h-6 w-6 ${isFirstCard ? 'text-white' : 'text-ondor-primary dark:text-white'}`} />
                    </div>

                    {/* Title */}
                    <h3 className={`text-xl font-bold mb-4 transition-colors duration-500 ${isFirstCard ? 'text-white' : 'text-gray-900 dark:text-white'}`}>
                      {service.title}
                    </h3>

                    {/* Description */}
                    <p className={`text-sm leading-relaxed mb-6 flex-grow transition-colors duration-500 ${isFirstCard ? 'text-white/90' : 'text-gray-700 dark:text-gray-200'}`}>
                      {service.description}
                    </p>

                    {/* Features */}
                    <div className="space-y-2 mb-6">
                      {service.features.map((feature, featureIndex) => (
                        <div
                          key={featureIndex}
                          className={`flex items-center text-sm transition-all duration-500 ${isFirstCard ? 'text-white/80' : 'text-gray-600 dark:text-gray-200'}`}
                        >
                          <div className={`w-1.5 h-1.5 rounded-full mr-3 transition-colors duration-500 ${isFirstCard ? 'bg-white/60' : 'bg-ondor-primary/80 dark:bg-white/80'}`} />
                          {feature}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Differentials Section - Moved from Home page */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="animate-fade-in-up">
              <div className="inline-flex items-center px-4 py-2 bg-ondor-primary/10 rounded-full text-ondor-primary font-medium text-sm mb-4">
                <CheckCircle className="h-4 w-4 mr-2" />
                <span>Nossos Diferenciais</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6 leading-tight">
                Por que a ONDOR é Escolha de
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-ondor-primary to-ondor-accent">
                  Quem Quer Resultados?
                </span>
              </h2>
              <p className="text-lg text-gray-700 leading-relaxed mb-8">
                Combinamos <strong className="text-gray-900 font-semibold">experiência consolidada</strong>,
                <strong className="text-gray-900 font-semibold"> tecnologia avançada</strong> e
                <strong className="text-gray-900 font-semibold"> visão estratégica</strong> para entregar projetos que superam expectativas
                e garantem <strong className="text-gray-900 font-semibold">retorno consistente</strong> aos nossos clientes.
              </p>

              {/* Primeiros 2 itens da lista */}
              <div className="space-y-4 mb-8">
                {differentials.slice(0, 2).map((item, index) => (
                  <div
                    key={index}
                    className={`flex items-start space-x-4 transition-all duration-700 transform ${
                      true // isVisible always true here as it's not a separate component
                        ? 'translate-y-0 opacity-100'
                        : 'translate-y-8 opacity-0'
                    }`}
                    style={{
                      transitionDelay: `${0.2 + index * 0.08}s`
                    }}
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-ondor-primary/10 rounded-xl flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-ondor-primary" />
                      </div>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column - Visual Element */}
            <div className="animate-fade-in-up relative" style={{ animationDelay: '0.2s' }}>
              <div className="relative overflow-hidden rounded-2xl shadow-2xl">
                <div className="absolute inset-0 bg-gradient-to-br from-ondor-primary/10 to-ondor-background/10 z-10"></div>
                <img
                  src="https://images.unsplash.com/photo-1560518883-ce09059eeffa?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80"
                  alt="Projetos ONDOR - Arquitetura e Imobiliária"
                  className="w-full h-96 object-cover transform hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute bottom-6 left-6 z-20">
                  <div className="bg-white/95 backdrop-blur-sm rounded-lg p-4 shadow-lg">
                    <div className="text-ondor-primary font-bold text-lg">40+ Anos</div>
                    <div className="text-gray-600 text-sm">de Experiência Comprovada</div>
                  </div>
                </div>
              </div>

              {/* Elementos decorativos */}
              <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-ondor-accent to-ondor-primary rounded-full opacity-10"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-br from-ondor-primary to-ondor-accent rounded-full opacity-5"></div>
            </div>
          </div>

          {/* Seção dos últimos 3 itens em 3 colunas */}
          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {differentials.slice(2).map((item, index) => (
                <div
                  key={index + 2}
                  className={`bg-white/60 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-white/20 transition-all duration-700 transform hover:shadow-xl hover:scale-102 ${
                    true // isVisible always true here
                      ? 'translate-y-0 opacity-100'
                      : 'translate-y-8 opacity-0'
                  }`}
                  style={{
                    transitionDelay: `${0.4 + index * 0.08}s`
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-ondor-primary/10 rounded-xl flex items-center justify-center">
                        <item.icon className="h-6 w-6 text-ondor-primary" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-600 leading-relaxed text-sm">{item.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section - Kept as is, assuming it's a standard component */}
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
                Pronto para Começar Seu Projeto?
              </h2>
              <p className="text-xl text-gray-200 mb-8 leading-relaxed">
                Entre em contato conosco e descubra como podemos transformar sua ideia em realidade.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a
                  href="/contato"
                  className="inline-block bg-white text-ondor-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100/90 transition-all duration-300 transform hover:scale-105 text-center"
                >
                  Solicitar Orçamento
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Servicos;
