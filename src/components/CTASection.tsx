import { Link } from 'react-router-dom';

const CTASection = () => {
  return (
    <section 
      className="relative pt-20 pb-32 bg-cover bg-center bg-fixed bg-no-repeat overflow-hidden"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80')`
      }}
    >
      <div className="absolute inset-0 bg-black/85 z-0" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-0" />
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-end">
          <div className="max-w-2xl bg-white/15 backdrop-blur-sm rounded-2xl p-12 border border-white/30">
            <h2 className="text-4xl font-bold text-white mb-6 leading-tight">
              Transforme Seu Terreno em um Projeto de <span className="text-ondor-special">Sucesso</span>
            </h2>
            <p className="text-xl text-gray-200 mb-8 leading-relaxed">
              Agende uma conversa com nosso time e descubra como podemos estruturar seu empreendimento com segurança e estratégia.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/contato"
                className="inline-block bg-white text-ondor-primary px-8 py-4 rounded-xl font-semibold text-lg hover:bg-gray-100/90 transition-all duration-300 transform hover:scale-105 text-center"
              >
                Quero Falar com a ONDOR
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
  );
};

export default CTASection;
