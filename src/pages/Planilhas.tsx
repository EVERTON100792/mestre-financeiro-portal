
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PremiumSpreadsheets from '@/components/PremiumSpreadsheets';
import { FileSpreadsheet, Download, Star, CheckCircle, Eye, Printer } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const Planilhas = () => {
  const planilhas = [
    {
      title: 'Controle Financeiro Pessoal',
      description: 'Planilha completa para organizar receitas, despesas, metas e investimentos pessoais.',
      features: ['Dashboard com gráficos', 'Controle de cartão', 'Metas financeiras', 'Relatórios automáticos'],
      badge: 'Mais Popular',
      badgeColor: 'bg-finance-green',
      downloads: '12.5k',
      rating: 4.9,
      href: '/planilha/controle-financeiro-pessoal'
    },
    {
      title: 'Viabilidade de Negócios',
      description: 'Analise a viabilidade do seu negócio com projeções detalhadas e ponto de equilíbrio.',
      features: ['Análise de custos', 'Projeção de receitas', 'Break-even point', 'Indicadores de lucratividade'],
      badge: 'Empresarial',
      badgeColor: 'bg-finance-blue',
      downloads: '8.3k',
      rating: 4.8,
      href: '/planilha/viabilidade-negocios'
    },
    {
      title: 'Amortização de Financiamento',
      description: 'Simule cenários de financiamento e o impacto de aportes extras no seu imóvel.',
      features: ['Simulação SAC/Price', 'Aportes extras', 'Economia de juros', 'Redução de prazo'],
      badge: 'Imóveis',
      badgeColor: 'bg-purple-600',
      downloads: '6.1k',
      rating: 4.7,
      href: '/planilha/amortizacao-financiamento'
    },
    {
      title: 'Comparação de Investimentos',
      description: 'Compare rendimentos de diferentes investimentos: CDB, LCI/LCA, Tesouro Direto e mais.',
      features: ['Múltiplos investimentos', 'Cálculo de IR', 'Rendimento líquido', 'Gráficos comparativos'],
      badge: 'Investimentos',
      badgeColor: 'bg-orange-600',
      downloads: '9.2k',
      rating: 4.6,
      href: '/planilha/comparacao-investimentos'
    },
    {
      title: 'Controle de Estoque',
      description: 'Gerencie seu estoque com controle de entrada, saída e alertas de reposição.',
      features: ['Controle entrada/saída', 'Alertas de estoque baixo', 'Relatório de movimentação', 'Custo médio'],
      badge: 'Empresarial',
      badgeColor: 'bg-finance-blue',
      downloads: '5.8k',
      rating: 4.5,
      href: '/planilha/controle-estoque'
    },
    {
      title: 'Fluxo de Caixa Empresarial',
      description: 'Controle completo do fluxo de caixa da sua empresa com projeções futuras.',
      features: ['Entradas e saídas', 'Projeção de caixa', 'Categorização', 'Indicadores DRE'],
      badge: 'Empresarial',
      badgeColor: 'bg-finance-blue',
      downloads: '7.1k',
      rating: 4.6,
      href: '/planilha/fluxo-caixa'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Planilhas Premium
            <span className="text-finance-green ml-2">100% Gratuitas</span>
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Templates profissionais no Excel e Google Sheets para levar seu controle financeiro e empresarial 
            ao próximo nível. Prontas para usar, sem cadastro.
          </p>
        </div>
      </div>

      {/* Planilhas Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {planilhas.map((planilha) => (
            <Card key={planilha.title} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-finance-blue/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-finance-blue/10 p-3 rounded-lg">
                      <FileSpreadsheet className="h-6 w-6 text-finance-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-lg">{planilha.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={`${planilha.badgeColor} text-white text-xs`}>
                          {planilha.badge}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Download className="h-4 w-4" />
                          <span>{planilha.downloads}</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{planilha.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardDescription className="text-gray-600 text-sm mt-3">
                  {planilha.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-2 mb-6">
                  {planilha.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-finance-green" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <div className="space-y-2">
                  <Button className="w-full bg-finance-green hover:bg-finance-green-light text-white" asChild>
                    <Link to={planilha.href}>
                      <Eye className="mr-2 h-4 w-4" />
                      Ver Planilha
                    </Link>
                  </Button>
                  <Button variant="outline" className="w-full" asChild>
                    <Link to={`${planilha.href}/imprimir`}>
                      <Printer className="mr-2 h-4 w-4" />
                      Imprimir PDF
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-finance-blue py-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            Precisa de uma Planilha Personalizada?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Entre em contato conosco para desenvolver planilhas customizadas para seu negócio.
          </p>
          <Button size="lg" className="bg-white text-finance-blue hover:bg-gray-100">
            Solicitar Planilha Personalizada
          </Button>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Planilhas;
