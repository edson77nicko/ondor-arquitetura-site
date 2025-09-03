import Layout from '../components/Layout';
import SEOHead from '../components/SEOHead';
import { MapPin, Phone, Mail, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { useState } from 'react';

const Contato = () => {
  const [formData, setFormData] = useState({
    nome: '',
    telefone: '',
    email: '',
    projeto: '',
    mensagem: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const formatPhoneNumber = (value: string) => {
    // Remove todos os caracteres não numéricos
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara brasileira
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 7) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    
    if (id === 'telefone') {
      const formattedPhone = formatPhoneNumber(value);
      setFormData(prev => ({ ...prev, [id]: formattedPhone }));
    } else {
      setFormData(prev => ({ ...prev, [id]: value }));
    }
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, projeto: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('https://n8hook.onprodutivo.com.br/webhook/ondor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nome: formData.nome,
          telefone: formData.telefone,
          email: formData.email,
          projeto: formData.projeto,
          mensagem: formData.mensagem,
          timestamp: new Date().toISOString(),
          source: 'website_contato'
        })
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          nome: '',
          telefone: '',
          email: '',
          projeto: '',
          mensagem: ''
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Erro ao enviar formulário:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };
  const contactInfo = [
    {
      icon: MapPin,
      title: "ONDOR",
      info: "",
      detail: "R. Topázio, 458 - Jardim Nomura, Cotia - SP, 06717-235"
    },
    {
      icon: Phone,
      title: "Telefone",
      info: "(11) 4703-2874",
      detail: "Atendimento de segunda a sexta"
    },
    {
      icon: Phone,
      title: "Celular Comercial",
      info: "(11) 94709-5205",
      detail: "WhatsApp disponível",
      link: "https://wa.me/5511947095205?text=Olá! Gostaria de iniciar meu projeto com a ONDOR. Podem me ajudar?"
    },
    {
      icon: Mail,
      title: "E-mail Comercial",
      info: "comercial@ondor.com.br",
      detail: "Resposta em até 24h"
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
      <SEOHead 
        title="Contato | ONDOR Arquitetura & Imobiliária"
        description="Entre em contato com a ONDOR para seu projeto de arquitetura. Estamos em Cotia-SP. Telefone: (11) 4703-2874. Consulta estratégica para empreendimentos."
        keywords="contato ONDOR, arquitetura Cotia, telefone ONDOR, consulta projeto, empreendimento, orçamento"
        url="https://ondor.com.br/contato"
      />
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
                Estamos prontos para transformar sua área em um negócio viável. Agende uma conversa com nosso time técnico e descubra como podemos ajudar.
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
                
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Status Messages */}
                  {submitStatus === 'success' && (
                    <div className="bg-green-50 border border-green-200 rounded-lg p-4 flex items-center space-x-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <p className="text-green-800 font-medium">Mensagem enviada com sucesso! Entraremos em contato em breve.</p>
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 flex items-center space-x-3">
                      <AlertCircle className="h-5 w-5 text-red-600" />
                      <p className="text-red-800 font-medium">Erro ao enviar mensagem. Tente novamente ou entre em contato por telefone.</p>
                    </div>
                  )}

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-2">
                        Nome *
                      </label>
                      <input
                        type="text"
                        id="nome"
                        value={formData.nome}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                        value={formData.telefone}
                        onChange={handleInputChange}
                        required
                        disabled={isSubmitting}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
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
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="seu@email.com"
                    />
                  </div>
                  
                  <div>
                    <div>
                      <label htmlFor="projeto" className="block text-sm font-medium text-gray-700 mb-2">
                        Tipo de Projeto *
                      </label>
                      <Select value={formData.projeto} onValueChange={handleSelectChange} disabled={isSubmitting}>
                        <SelectTrigger id="projeto" className="w-full border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed">
                          <SelectValue placeholder="Selecione o tipo de projeto" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="residencial">Empreendimento Residencial</SelectItem>
                          <SelectItem value="comercial">Empreendimento Comercial</SelectItem>
                          <SelectItem value="loteamento">Loteamento</SelectItem>
                          <SelectItem value="aprovacao">Aprovação de Projeto</SelectItem>
                          <SelectItem value="consultoria">Consultoria Imobiliária</SelectItem>
                          <SelectItem value="outro">Outro</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="mensagem" className="block text-sm font-medium text-gray-700 mb-2">
                      Mensagem
                    </label>
                    <textarea
                      id="mensagem"
                      rows={6}
                      value={formData.mensagem}
                      onChange={handleInputChange}
                      disabled={isSubmitting}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-ondor-primary/70 focus:border-transparent outline-none transition-colors resize-none disabled:bg-gray-100 disabled:cursor-not-allowed"
                      placeholder="Conte-nos mais detalhes sobre seu projeto, localização, prazos e expectativas..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting || !formData.nome || !formData.telefone || !formData.email || !formData.projeto}
                    className="w-full bg-ondor-primary text-white py-3 rounded-lg font-semibold text-lg hover:bg-ondor-primary/90 transition-all duration-300 transform hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed disabled:transform-none disabled:hover:scale-100"
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar Solicitação'}
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
                        {item.link ? (
                          <a href={item.link} target="_blank" rel="noopener noreferrer" className="text-ondor-primary/90 font-medium hover:underline">{item.info}</a>
                        ) : (
                          <p className="text-ondor-primary/90 font-medium">{item.info}</p>
                        )}
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
