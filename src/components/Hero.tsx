
import { ArrowRight, TrendingUp, Shield, Zap } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <section className="bg-gradient-to-br from-finance-blue to-finance-blue-light text-white py-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">
            Sua Calculadora
            <span className="block text-finance-green">Financeira Mestra</span>
          </h1>
          
          <p className="text-xl md:text-2xl mb-8 text-blue-100 max-w-3xl mx-auto animate-fade-in">
            Ferramentas precisas, planilhas premium gratuitas e conteúdo especializado 
            para dominar suas finanças pessoais e empresariais.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button size="lg" className="bg-finance-green hover:bg-finance-green-light text-white" asChild>
              <Link to="/calculadoras">
                Ver Calculadoras
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
            
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-finance-blue" asChild>
              <Link to="/planilhas">
                Planilhas Grátis
              </Link>
            </Button>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mt-16">
            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Zap className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Acesso Imediato</h3>
              <p className="text-blue-100">
                Resolva seus cálculos financeiros em segundos, sem cadastros ou barreiras.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Shield className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">100% Confiável</h3>
              <p className="text-blue-100">
                Cálculos precisos baseados na legislação brasileira mais atual.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-white/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <TrendingUp className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Planilhas Premium</h3>
              <p className="text-blue-100">
                Templates profissionais no Google Sheets, totalmente gratuitos.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
