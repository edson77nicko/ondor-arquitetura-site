import Layout from '../components/Layout';
import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const Contato = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "Localização",
      info: "ONDOR Negócios Imobiliários",
      detail: "R. Topázio, 458 - Jardim Nomura, Cotia - SP, 06717-235"
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 4703-2874",
      detail: "Atendimento de segunda a sexta"
    },
    {
      icon: Clock,
      title: "Horário de funcionamento",
      info: "08:00–17:00",
      detail: "segunda-feira a sexta-feira"
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
              backgroundImage: "url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&auto=format&fit=crop&w=2000&q=80')"
            }}
          />
          {/* Máscara preta igual à home */}
          <div className="absolute inset-0 bg-black/85 z-0" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
          
          {/* Content */}
          <div className="relative z-10 flex items-center min-h-[600px] pt-24 pb-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-6 animate-fade-in">
                Vamos Conversar Sobre o Seu Empreendimento?
              </h1>
              <p className="text-xl text-gray-200 max-w-3xl mx-auto animate-fade-in-up">
                Estamos prontos para transformar seu terreno em um negócio viável. Agende uma conversa com nosso time técnico e descubra como podemos ajudar.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <div className="animate-fade-in-up bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-8">
                  Solicite sua Consulta Estratégica
                </h2>
                
                <form className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors"
                        placeholder="Seu nome completo"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="telefone" className="block text-sm font-medium text-gray-700 mb-2">
                        Telefone *
                      </label>
                      <input
                        type="tel"
                        id="telefone"
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors"
                        placeholder="(11) 99999-9999"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                      E-mail *
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="projeto" className="block text-sm font-medium text-gray-700 mb-2">
                      Tipo de Projeto *
                    </label>
                    <select
                      id="projeto"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors"
                    >
                      <option value="">Selecione o tipo de projeto</option>
                      <option value="residencial">Empreendimento Residencial</option>
                      <option value="comercial">Empreendimento Comercial</option>
                      <option value="loteamento">Loteamento</option>
                      <option value="aprovacao">Aprovação de Projeto</option>
                      <option value="consultoria">Consultoria Imobiliária</option>
                      <option value="outro">Outro</option>
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      rows={6}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors resize-none"
                      placeholder="Conte-nos mais detalhes sobre seu projeto, localização, prazos e expectativas..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    className="w-full bg-ondor-primary text-white py-2 rounded-lg font-semibold text-lg hover:bg-ondor-primary/90 transition-all duration-300 transform hover:scale-105"
                  >
                    Enviar Solicitação
                  </button>
                </form>
              </div>

              {/* Contact Info */}
              <div className="animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
                <h3 className="text-2xl font-bold text-gray-900 mb-8">
                  Informações de Contato
                </h3>
                
                <div className="space-y-6 mb-12">
                  {contactInfo.map((item, index) => (
                    <div key={index} className="flex items-start space-x-4">
                      <item.icon className="h-6 w-6 text-ondor-primary/90 mt-1 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold text-gray-900">{item.title}</h4>
                        <p className="text-ondor-primary/90 font-medium">{item.info}</p>
                        <p className="text-gray-600 text-sm">{item.detail}</p>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="bg-gray-50 p-8 rounded-2xl border border-gray-100">
                  <h4 className="text-lg font-semibold text-gray-900 mb-4">
                    Por que escolher a ONDOR?
                  </h4>
                  <ul className="space-y-3 text-gray-700">
                    <li className="flex items-start">
                      <span className="text-ondor-primary/90 mr-2">•</span>
                      Mais de 40 anos de experiência no mercado
                    </li>
                    <li className="flex items-start">
                      <span className="text-ondor-primary/90 mr-2">•</span>
                      Equipe técnica especializada e multidisciplinar
                    </li>
                    <li className="flex items-start">
                      <span className="text-ondor-primary/90 mr-2">•</span>
                      Soluções integradas de arquitetura e imobiliária
                    </li>
                    <li className="flex items-start">
                      <span className="text-ondor-primary/90 mr-2">•</span>
                      Acompanhamento completo do projeto
                    </li>
                    <li className="flex items-start">
                      <span className="text-ondor-primary/90 mr-2">•</span>
                      Referência em Cotia e região metropolitana
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Map Section */}
        <section className="py-20 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12 animate-fade-in">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">
                Nossa Localização
              </h2>
              <p className="text-lg text-gray-600">
                Estrategicamente localizados em Cotia para melhor atender a região metropolitana
              </p>
            </div>
            
            <div className="bg-gray-100 rounded-2xl h-96 overflow-hidden animate-fade-in-up border border-gray-200">
              <iframe
                title="Mapa Ondor Arquitetura"
                src="https://www.google.com/maps?q=R.+Top%C3%A1zio,+458+-+Jardim+Nomura,+Cotia+-+SP,+06717-235&output=embed"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-96 min-h-[350px] rounded-2xl border-none"
              ></iframe>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
};

export default Contato;
