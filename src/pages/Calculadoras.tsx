
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calculator, Clock, TrendingUp, Users, DollarSign, FileText, Home, Car, Briefcase, PiggyBank } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Calculadoras = () => {
  const categories = [
    {
      title: 'Trabalhistas',
      description: 'Calculadoras para direitos trabalhistas e benefícios',
      icon: FileText,
      color: 'text-red-600',
      bgColor: 'bg-red-50',
      calculators: [
        {
          title: 'Rescisão CLT Completa',
          description: 'Calcule todos os direitos na demissão: aviso prévio, férias, 13º, FGTS e multa.',
          href: '/calculadora/rescisao-clt',
          popular: true
        },
        {
          title: 'Férias + 1/3 Constitucional',
          description: 'Calcule o valor das férias incluindo o terço constitucional.',
          href: '/calculadora/ferias'
        },
        {
          title: 'Salário Líquido',
          description: 'Descubra quanto você recebe após INSS, IR e outros descontos.',
          href: '/calculadora/salario-liquido'
        },
        {
          title: 'Horas Extras',
          description: 'Calcule o valor correto das horas extras (50% e 100%).',
          href: '/calculadora/horas-extras'
        }
      ]
    },
    {
      title: 'Financeiras Pessoais',
      description: 'Organize e planeje suas finanças pessoais',
      icon: PiggyBank,
      color: 'text-finance-green',
      bgColor: 'bg-green-50',
      calculators: [
        {
          title: 'Juros Compostos',
          description: 'Simule investimentos e veja o poder dos juros compostos com gráficos.',
          href: '/calculadora/juros-compostos',
          popular: true
        },
        {
          title: 'Financiamento Imóvel',
          description: 'Simule financiamentos SAC e Price, compare parcelas e juros.',
          href: '/calculadora/financiamento-imovel'
        },
        {
          title: 'Viver de Renda',
          description: 'Descubra quanto precisa investir para viver de renda.',
          href: '/calculadora/viver-de-renda'
        },
        {
          title: 'Financiamento Veículo',
          description: 'Simule o financiamento do seu carro ou moto.',
          href: '/calculadora/financiamento-veiculo'
        }
      ]
    },
    {
      title: 'Investimentos',
      description: 'Compare e analise seus investimentos',
      icon: TrendingUp,
      color: 'text-finance-blue',
      bgColor: 'bg-blue-50',
      calculators: [
        {
          title: 'Renda Fixa',
          description: 'Compare CDB, LCI/LCA, Tesouro Direto e Poupança.',
          href: '/calculadora/renda-fixa'
        },
        {
          title: 'Dividend Yield',
          description: 'Calcule o rendimento de dividendos das suas ações.',
          href: '/calculadora/dividend-yield'
        },
        {
          title: 'Aposentadoria',
          description: 'Planeje sua aposentadoria com simulações de INSS e previdência.',
          href: '/calculadora/aposentadoria'
        }
      ]
    },
    {
      title: 'Empresariais',
      description: 'Ferramentas para MEI e pequenos negócios',
      icon: Briefcase,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
      calculators: [
        {
          title: 'Preço de Venda',
          description: 'Calcule o preço ideal considerando custos e margem desejada.',
          href: '/calculadora/preco-venda'
        },
        {
          title: 'Custo do Funcionário',
          description: 'Descubra o custo total de um funcionário (Simples Nacional).',
          href: '/calculadora/custo-funcionario'
        },
        {
          title: 'Ponto de Equilíbrio',
          description: 'Calcule quantas vendas precisa para cobrir os custos.',
          href: '/calculadora/ponto-equilibrio'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Todas as Calculadoras
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Ferramentas precisas e atualizadas para resolver todos os seus cálculos financeiros e trabalhistas. 
            Sem cadastro, sem limitações.
          </p>
        </div>
      </div>

      {/* Calculadoras por categoria */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {categories.map((category) => (
          <div key={category.title} className="mb-16">
            <div className="flex items-center space-x-3 mb-8">
              <div className={`${category.bgColor} ${category.color} p-3 rounded-lg`}>
                <category.icon className="h-6 w-6" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-gray-900">{category.title}</h2>
                <p className="text-gray-600">{category.description}</p>
              </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {category.calculators.map((calc) => (
                <Card key={calc.title} className="hover:shadow-lg transition-shadow duration-300 relative">
                  {calc.popular && (
                    <div className="absolute -top-2 -right-2 bg-finance-green text-white text-xs px-2 py-1 rounded-full z-10">
                      Popular
                    </div>
                  )}
                  
                  <CardHeader>
                    <CardTitle className="text-lg">{calc.title}</CardTitle>
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
          </div>
        ))}
      </div>

      <Footer />
    </div>
  );
};

export default Calculadoras;
