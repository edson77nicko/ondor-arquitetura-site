import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Instagram, Facebook } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="relative bg-ondor-footer text-white pt-20 rounded-t-3xl z-20 -mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1 md:col-span-2">
            <img src="https://i.postimg.cc/kX3G6gFQ/Logo-Footer.png" alt="Logo Ondor" className="mb-4 w-40 h-auto" />
            <p className="text-gray-300 mb-4">
              Arquitetura e Imobiliária com Alma, Técnica e Resultado.
            </p>
            {/* Social Media Block - Lucide icons */}
            <div className="flex flex-row items-center gap-6 mt-6">
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
          <div>
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

          {/* Contato */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <div className="space-y-2 text-gray-300 text-sm">
              <p className="font-semibold text-white">Ondor Arquitetura e Construções</p>
              <p>Localizado em: ONDOR Negócios Imobiliários</p>
              <p>Endereço: R. Topázio, 458 - Jardim Nomura, Cotia - SP, 06717-235</p>
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

        <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-400">
          <p>&copy; 2024 ONDOR - Arquitetura e Imobiliária. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
