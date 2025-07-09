
import { Calculator, Clock, TrendingUp, Users, DollarSign, FileText } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const FeaturedCalculators = () => {
  const calculators = [
    {
      title: 'Rescisão CLT',
      description: 'Calcule todos os direitos trabalhistas na demissão com precisão total.',
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      href: '/calculadora/rescisao-clt',
      popular: true
    },
    {
      title: 'Salário Líquido',
      description: 'Descubra quanto você recebe após descontos do INSS e IR.',
      icon: DollarSign,
      color: 'text-finance-green',
      bgColor: 'bg-green-50',
      href: '/calculadora/salario-liquido'
    },
    {
      title: 'Juros Compostos',
      description: 'Simule investimentos e veja o poder dos juros compostos.',
      icon: TrendingUp,
      color: 'text-finance-blue',
      bgColor: 'bg-blue-50',
      href: '/calculadora/juros-compostos'
    },
    {
      title: 'Férias + 1/3',
      description: 'Calcule o valor das suas férias incluindo o terço constitucional.',
      icon: Clock,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      href: '/calculadora/ferias'
    },
    {
      title: 'Horas Extras',
      description: 'Calcule o valor correto das horas extras trabalhadas.',
      icon: Clock,
      color: 'text-orange-600',
      bgColor: 'bg-orange-50',
      href: '/calculadora/horas-extras'
    },
    {
      title: 'Custo do Funcionário',
      description: 'Descubra o custo real de um funcionário para sua empresa.',
      icon: Users,
      color: 'text-indigo-600',
      bgColor: 'bg-indigo-50',
      href: '/calculadora/custo-funcionario'
    }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Calculadoras Mais Usadas
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Ferramentas precisas para resolver seus cálculos financeiros e trabalhistas
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {calculators.map((calc) => (
            <Card key={calc.title} className="hover:shadow-lg transition-shadow duration-300 relative">
              {calc.popular && (
                <div className="absolute -top-2 -right-2 bg-finance-green text-white text-xs px-2 py-1 rounded-full">
                  Mais Popular
                </div>
              )}
              
              <CardHeader>
                <div className={`${calc.bgColor} ${calc.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4`}>
                  <calc.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{calc.title}</CardTitle>
                <CardDescription className="text-gray-600">
                  {calc.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <Button className="w-full bg-finance-blue hover:bg-finance-blue-light" asChild>
                  <Link to={calc.href}>
                    Calcular Agora
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/calculadoras">
              Ver Todas as Calculadoras
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedCalculators;
