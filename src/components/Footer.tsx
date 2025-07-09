
import { Link } from 'react-router-dom';
import { Calculator, Mail, Shield, Heart } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Logo e Descrição */}
          <div className="col-span-1">
            <div className="flex items-center space-x-2 mb-4">
              <Calculator className="h-8 w-8 text-finance-blue" />
              <span className="text-xl font-bold">Calculadora Mestra</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Sua referência em ferramentas financeiras práticas. Calculadoras precisas, 
              planilhas premium e conteúdo especializado para dominar suas finanças.
            </p>
          </div>

          {/* Calculadoras */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Calculadoras</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/calculadora/rescisao-clt" className="text-gray-400 hover:text-white transition-colors">
                  Rescisão CLT
                </Link>
              </li>
              <li>
                <Link to="/calculadora/salario-liquido" className="text-gray-400 hover:text-white transition-colors">
                  Salário Líquido
                </Link>
              </li>
              <li>
                <Link to="/calculadora/juros-compostos" className="text-gray-400 hover:text-white transition-colors">
                  Juros Compostos
                </Link>
              </li>
              <li>
                <Link to="/calculadoras" className="text-gray-400 hover:text-white transition-colors">
                  Ver todas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Planilhas */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Planilhas Grátis</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/planilhas" className="text-gray-400 hover:text-white transition-colors">
                  Controle Financeiro
                </Link>
              </li>
              <li>
                <Link to="/planilhas" className="text-gray-400 hover:text-white transition-colors">
                  Viabilidade de Negócios
                </Link>
              </li>
              <li>
                <Link to="/planilhas" className="text-gray-400 hover:text-white transition-colors">
                  Comparação de Investimentos
                </Link>
              </li>
              <li>
                <Link to="/planilhas" className="text-gray-400 hover:text-white transition-colors">
                  Ver todas →
                </Link>
              </li>
            </ul>
          </div>

          {/* Informações */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Informações</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link to="/sobre" className="text-gray-400 hover:text-white transition-colors">
                  Sobre Nós
                </Link>
              </li>
              <li>
                <Link to="/contato" className="text-gray-400 hover:text-white transition-colors">
                  Contato
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/privacidade" className="text-gray-400 hover:text-white transition-colors">
                  Privacidade
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Linha separadora */}
        <div className="border-t border-gray-800 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-400">
              <div className="flex items-center space-x-1">
                <Shield className="h-4 w-4" />
                <span>100% Seguro</span>
              </div>
              <div className="flex items-center space-x-1">
                <Mail className="h-4 w-4" />
                <span>contato@calculadoramestra.com.br</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-1 text-sm text-gray-400">
              <span>Feito com</span>
              <Heart className="h-4 w-4 text-red-500" />
              <span>para o Brasil</span>
            </div>
          </div>
          
          <div className="text-center mt-4 text-sm text-gray-500">
            © 2025 Calculadora Mestra. Todos os direitos reservados.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
