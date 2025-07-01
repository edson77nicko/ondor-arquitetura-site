import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-black text-white pt-20 rounded-t-3xl z-20 -mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 items-start">
          {/* Logo */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center md:items-start text-center md:text-left">
            <img src="https://i.postimg.cc/kX3G6gFQ/Logo-Footer.png" alt="Logo Ondor" className="mb-2 w-40 h-auto mx-auto md:mx-0" />
            {/* Social Media Block - Lucide icons */}
            <div className="flex flex-row items-center gap-6 mt-2 justify-center md:justify-start">
              <a href="https://www.instagram.com/ondor_arquitetura/" target="_blank" rel="noopener noreferrer" aria-label="Instagram Ondor" className="hover:text-ondor-special transition-colors">
                <Instagram className="h-7 w-7" />
              </a>
              <a href="https://www.facebook.com/ondor.arquitetura" target="_blank" rel="noopener noreferrer" aria-label="Facebook Ondor" className="hover:text-ondor-special transition-colors">
                <Facebook className="h-7 w-7" />
              </a>
              <a href="https://www.linkedin.com/company/ondor-arquitetura/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn Ondor" className="hover:text-ondor-special transition-colors">
                <Linkedin className="h-7 w-7" />
              </a>
            </div>
          </div>

          {/* Links Institucionais */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center md:items-start mt-10 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Institucional</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/sobre" className="text-gray-300 hover:text-white transition-colors">
                  Sobre
                </Link>
              </li>
              <li>
                <Link to="/servicos" className="text-gray-300 hover:text-white transition-colors">
                  Serviços
                </Link>
              </li>
              <li>
                <Link to="/portfolio" className="text-gray-300 hover:text-white transition-colors">
                  Portfólio
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-300 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
            </ul>
          </div>

          {/* Endereço */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center md:items-start mt-10 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Endereço</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p className="font-semibold text-white">Ondor Arquitetura e Construções</p>
              <p>Localizado em: ONDOR Negócios Imobiliários</p>
              <p>R. Topázio, 458 - Jardim Nomura, Cotia - SP, 06717-235</p>
            </div>
          </div>

          {/* Contato */}
          <div className="col-span-1 md:col-span-3 flex flex-col items-center md:items-start mt-10 md:mt-0">
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p>Telefone: <a href="tel:+551147032874" className="hover:underline">(11) 4703-2874</a></p>
              <div className="mt-2">
                <span className="block font-semibold text-white mb-1">Horário de funcionamento:</span>
                <ul className="ml-2">
                  <li>segunda a sexta: 08:00–17:00</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400 text-sm">
          <p>&copy; 2024 ONDOR - Arquitetura e Imobiliária. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
