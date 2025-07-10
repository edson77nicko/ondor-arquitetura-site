import React, { useState } from "react";
import Layout from '../components/Layout';
import { Users, Award, Clock, MapPin, Shield, Search, Hammer, Target, Eye, HeartHandshake } from 'lucide-react';
import { Tabs, TabsList, TabsTrigger, TabsContent } from "../components/ui/tabs";

// --- Tabs Verticais Institucionais ---
const valores = [
  {
    tab: "Expertise",
    title: "Especialistas em Projetos de Empreendimentos Verticais, Horizontais e Loteamentos",
    icon: Award,
    text: (
      <>
        <span className="font-semibold text-ondor-primary">Ondor Arquitetura e Construções</span> conta com vasta experiência e know-how no desenvolvimento de projetos para empreendimentos verticais (prédios residenciais e comerciais), horizontais (condomínios e conjuntos residenciais) e loteamentos.<br /><br />
        Nossa expertise abrange todas as etapas, desde o planejamento inicial até a execução técnica, garantindo soluções eficientes, inovadoras e alinhadas às necessidades do mercado e dos nossos clientes.
      </>
    ),
  },
  {
    tab: "Qualidade",
    title: "Qualidade e Profissionalismo Inegociáveis",
    icon: Shield,
    impact: "Qualidade, responsabilidade e respeito em cada projeto.",
    bullets: [
      "Projetos de alta qualidade e perfeição",
      "Viabilidade técnica, legal e financeira assegurada",
      "Apresentação organizada, site imponente e profissional"
    ],
    text: "Buscamos sempre a excelência, transmitindo formalidade e profissionalismo em tudo que entregamos."
  },
  {
    tab: "Transparência",
    title: "Transparência e Clareza em Cada Etapa",
    icon: Search,
    impact: "Clareza total para o cliente, do início ao fim.",
    bullets: [
      "Atendimento honesto e transparente",
      "Informação clara e acessível no site",
      "Compromisso com autenticidade e verdade"
    ],
    text: "Nosso objetivo é que o cliente compreenda plenamente nossos serviços e expertise, sem precisar 'caçar' informações."
  },
  {
    tab: "Soluções",
    title: "Soluções Completas e Personalizadas",
    icon: Hammer,
    impact: "Do projeto à obra, soluções integradas e personalizadas.",
    bullets: [
      "Assessoria para licenças, habite-se, CND e cartório",
      "Serviços de obra e vistoria técnica",
      "Grupo imobiliário próprio: ecossistema completo para o seu projeto"
    ],
    text: "Adaptamos nossa atuação ao perfil de cada cliente, entregando soluções completas do início ao fim."
  }
];

function ValoresInstitucionaisTabs() {
  const [active, setActive] = useState(0);
  const [progress, setProgress] = useState(0);
  React.useEffect(() => {
    setProgress(0);
    const textLength = typeof valores[active].text === 'string' ? valores[active].text.length : 300;
    const duration = Math.max(3500, textLength * 13);
    let raf;
    let start = Date.now();
    function animate() {
      const elapsed = Date.now() - start;
      setProgress(Math.min(100, (elapsed / duration) * 100));
      if (elapsed < duration) {
        raf = requestAnimationFrame(animate);
      } else {
        setTimeout(() => setActive((prev) => (prev + 1) % valores.length), 400);
      }
    }
    animate();
    return () => cancelAnimationFrame(raf);
  }, [active]);
  return (
    <div className="flex flex-col gap-10 w-full max-w-5xl mx-auto items-start relative z-10">
      {/* Missão, Visão, Valores - sem box, com ícones e visual mais interessante */}
      <div className="w-full flex flex-col md:flex-row gap-8 md:gap-12 mb-2">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-6 w-6 text-ondor-primary" />
            <h4 className="text-xl font-bold text-ondor-primary">Nossa Missão</h4>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">Oferecer soluções inteligentes, seguras e personalizadas em arquitetura e negócios imobiliários, promovendo a realização de sonhos com responsabilidade, qualidade e respeito.</p>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <Eye className="h-6 w-6 text-ondor-primary" />
            <h4 className="text-xl font-bold text-ondor-primary">Nossa Visão</h4>
          </div>
          <p className="text-gray-700 text-base leading-relaxed">Ser reconhecida como uma empresa de excelência, que une tradição familiar, inovação técnica e confiança em cada entrega.</p>
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <HeartHandshake className="h-6 w-6 text-ondor-primary" />
            <h4 className="text-xl font-bold text-ondor-primary">Nossos Valores</h4>
          </div>
          <ul className="list-disc pl-5 text-gray-700 text-base leading-relaxed space-y-1">
            <li><span className="font-semibold text-gray-900">Ética</span></li>
            <li><span className="font-semibold text-gray-900">Comprometimento</span></li>
            <li><span className="font-semibold text-gray-900">Transparência</span></li>
            <li><span className="font-semibold text-gray-900">Respeito</span></li>
            <li><span className="font-semibold text-gray-900">Inovação com responsabilidade</span></li>
            <li><span className="font-semibold text-gray-900">Valorização das relações humanas</span></li>
          </ul>
        </div>
      </div>
      {/* Tabs institucionais */}
      <div className="flex flex-col md:flex-row gap-8 w-full items-start">
        <div className="grid grid-cols-2 gap-2 md:flex md:flex-col md:w-72 w-full shrink-0 bg-white/80 border border-gray-200 rounded-2xl p-2 shadow-lg">
          {valores.map((v, i) => (
            <button
              key={v.tab}
              onClick={() => setActive(i)}
              className={`flex items-center gap-3 text-left w-full md:w-full md:justify-start md:rounded-xl md:mb-2 md:py-4 md:px-6 text-base font-semibold transition-all
                ${active === i ? 'bg-ondor-primary/90 text-white shadow-lg rounded-xl px-5 h-10' : 'text-gray-600 hover:bg-ondor-primary/10 rounded-lg'}
              `}
              style={{ outline: 'none', border: 'none' }}
            >
              {React.createElement(v.icon, { className: 'h-6 w-6 opacity-70' })}
              <span>{v.tab}</span>
            </button>
          ))}
        </div>
        <div className="flex-1 max-w-3xl min-w-0 bg-white rounded-2xl shadow-xl border border-gray-100 p-8 flex flex-col gap-6">
          <div className="flex items-center gap-4 mb-2">
            {valores[active].icon ? React.createElement(valores[active].icon, { className: 'h-10 w-10 text-ondor-primary/90' }) : null}
            <h3 className="text-2xl font-bold text-gray-900">{valores[active].title}</h3>
          </div>
          {valores[active].impact && (
            <div className="text-ondor-primary font-semibold text-lg mb-2">{valores[active].impact}</div>
          )}
          {valores[active].bullets && (
            <ul className="list-disc pl-6 space-y-1 text-gray-700 text-base">
              {valores[active].bullets.map((b, i) => <li key={i}><span className="font-medium text-gray-900">{b}</span></li>)}
            </ul>
          )}
          <div className="text-gray-700 text-lg leading-relaxed mt-2">{valores[active].text}</div>
          {/* Barra de progresso */}
          <div className="w-full h-2 bg-gray-200 rounded-full mt-6 overflow-hidden">
            <div className="h-full bg-ondor-primary transition-all" style={{ width: `${progress}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

const Sobre = () => {
  const values = [
    {
      icon: Users,
      title: "Tradição Familiar",
      description: "Fundada por Onofre e Dorotilde, mantemos os valores familiares em cada projeto."
    },
    {
      icon: Award,
      title: "Excelência Técnica",
      description: "Mais de 40 anos de experiência garantem qualidade e confiabilidade."
    },
    {
      icon: Clock,
      title: "Agilidade",
      description: "Processos otimizados para entregar resultados no menor tempo possível."
    },
    {
      icon: MapPin,
      title: "Presença Regional",
      description: "Sólida reputação em Cotia e região metropolitana de São Paulo."
    }
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
              backgroundImage: "url('https://images.unsplash.com/photo-1493397212122-2b85dda8106b?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
            }}
          />
          {/* Máscara preta igual à home */}
          <div className="absolute inset-0 bg-black/85 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[600px] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                Uma História de Arquitetura,<br />Família e Visão Estratégica
              </h1>
              <p className="text-xl text-gray-200 max-w-4xl mx-auto animate-fade-in-up">
                A ONDOR é mais que uma empresa: é um legado.
              </p>
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col-reverse lg:flex-row gap-12 items-center">
              <div className="animate-fade-in-up w-full lg:w-1/2">
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Nossa História
                </h2>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  A <strong className="text-gray-900 font-semibold">Ondor Arquitetura e Construções</strong> foi fundada em <strong className="text-ondor-primary font-semibold">1982</strong>, resultado da visão e dedicação de seus idealizadores. Com <strong className="text-ondor-primary font-semibold">sede própria</strong> localizada em <strong className="text-gray-900 font-semibold">Cotia</strong>, município da Grande São Paulo, atuamos com excelência no desenvolvimento de projetos para <strong className="text-ondor-primary font-semibold">empreendimentos residenciais, comerciais e industriais</strong>. Nosso compromisso é oferecer <strong className="text-ondor-primary font-semibold">serviços de alta qualidade</strong>, pautados pelo respeito aos clientes, colaboradores e à sociedade.
                </p>
                <p className="text-lg text-gray-700 mb-6 leading-relaxed">
                  Atualmente, a gestão da empresa é liderada por dois dos 4 filhos dos fundadores:<br/>
                  <span className="block mt-2"><span className="text-ondor-primary font-semibold">• Leide Malara</span>, responsável pela área administrativa e institucional.</span>
                  <span className="block"><span className="text-ondor-primary font-semibold">• Arquiteto Leno</span>, à frente da criação, desenvolvimento técnico e inovação dos projetos.</span>
                  Juntos, unem a <strong className="text-gray-900 font-semibold">tradição</strong> construída ao longo de décadas com a <strong className="text-ondor-primary font-semibold">inovação</strong> e o <strong className="text-ondor-primary font-semibold">dinamismo</strong> exigidos pelo mercado atual.
                </p>
              </div>
              <div className="animate-fade-in-up flex flex-col items-center w-full lg:w-1/2" style={{ animationDelay: '0.2s' }}>
                <div className="w-full max-w-xl aspect-video rounded-2xl overflow-hidden shadow-2xl border border-gray-200 mb-6">
                  <iframe
                    width="100%"
                    height="100%"
                    src="https://www.youtube.com/embed/YYC1gBqkgr0"
                    title="Vídeo Institucional ONDOR"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full"
                  ></iframe>
                </div>
                <p className="text-lg text-gray-700 leading-relaxed w-full text-left">
                  Como <strong className="text-gray-900 font-semibold">empresa familiar</strong>, contamos com uma equipe de profissionais habilitados e capacitados, comprometidos em transformar em realidade os sonhos e expectativas de nossos clientes por meio de <strong className="text-ondor-primary font-semibold">soluções arquitetônicas inovadoras e personalizadas</strong>.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 bg-gradient-to-b from-gray-50 via-white to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Nossos Valores
              </h2>
              <p className="text-xl text-gray-600">
                Os pilares que sustentam nossa trajetória de sucesso
              </p>
            </div>
            
            {/* Tabs Verticais de Valores */}
            <ValoresInstitucionaisTabs />
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 pb-24 bg-gradient-to-b from-gray-50 via-white to-gray-100">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16 animate-fade-in">
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Liderança Familiar
              </h2>
              <p className="text-xl text-gray-600">
                Continuando o legado com visão moderna
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-4xl mx-auto">
              <div className="text-center animate-fade-in-up">
                <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-ondor-special shadow-2xl transition-transform duration-300 hover:scale-105">
                  <img src="https://via.placeholder.com/144" alt="Leno" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-ondor-special mb-1">Leno Malara</h3>
                <p className="text-ondor-primary font-semibold mb-3 uppercase tracking-wide">Diretor Técnico</p>
                <p className="text-gray-700 text-base max-w-xs mx-auto">
                  Arquiteto e Urbanista especialista em idealizar e projetar.
                </p>
              </div>
              <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <div className="w-36 h-36 bg-gray-200 rounded-full mx-auto mb-6 flex items-center justify-center overflow-hidden border-4 border-ondor-special shadow-2xl transition-transform duration-300 hover:scale-105">
                  <img src="https://via.placeholder.com/144" alt="Leide" className="w-full h-full object-cover" />
                </div>
                <h3 className="text-2xl font-bold text-ondor-special mb-1">Leide</h3>
                <p className="text-ondor-primary font-semibold mb-3 uppercase tracking-wide">Diretora Administrativa</p>
                <p className="text-gray-700 text-base max-w-xs mx-auto">
                  Administradora e Corretora de Imóveis.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Sobre;
