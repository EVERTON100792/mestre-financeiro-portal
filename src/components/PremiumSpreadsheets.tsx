
import { FileSpreadsheet, Download, Star, CheckCircle } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Link } from 'react-router-dom';

const PremiumSpreadsheets = () => {
  const spreadsheets = [
    {
      title: 'Controle Financeiro Pessoal',
      description: 'Planilha completa para organizar receitas, despesas, metas e investimentos.',
      features: ['Dashboard com gráficos', 'Controle de cartão', 'Metas financeiras', 'Relatórios automáticos'],
      badge: 'Carro-chefe',
      badgeColor: 'bg-finance-green',
      downloads: '12.5k',
      rating: 4.9,
      href: '/planilha/controle-financeiro-pessoal'
    },
    {
      title: 'Viabilidade de Negócios',
      description: 'Analise a viabilidade do seu negócio com projeções e ponto de equilíbrio.',
      features: ['Análise de custos', 'Projeção de receitas', 'Break-even', 'Lucratividade'],
      badge: 'Empresarial',
      badgeColor: 'bg-finance-blue',
      downloads: '8.3k',
      rating: 4.8,
      href: '/planilha/viabilidade-negocios'
    },
    {
      title: 'Amortização de Financiamento',
      description: 'Simule o impacto de aportes extras no seu financiamento imobiliário.',
      features: ['Simulação SAC/Price', 'Aportes extras', 'Economia de juros', 'Redução de prazo'],
      badge: 'Imóveis',
      badgeColor: 'bg-purple-600',
      downloads: '6.1k',
      rating: 4.7,
      href: '/planilha/amortizacao-financiamento'
    },
    {
      title: 'Comparação de Investimentos',
      description: 'Compare rendimentos de CDB, LCI/LCA, Tesouro Direto e mais.',
      features: ['Múltiplos investimentos', 'Cálculo de IR', 'Rendimento líquido', 'Gráficos comparativos'],
      badge: 'Investimentos',
      badgeColor: 'bg-orange-600',
      downloads: '9.2k',
      rating: 4.6,
      href: '/planilha/comparacao-investimentos'
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Planilhas Premium
            <span className="text-finance-green ml-2">100% Gratuitas</span>
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Templates profissionais no Google Sheets para levar seu controle financeiro ao próximo nível. 
            Sem cadastro, sem pegadinhas.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {spreadsheets.map((sheet) => (
            <Card key={sheet.title} className="hover:shadow-xl transition-all duration-300 border-2 hover:border-finance-blue/20">
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className="bg-finance-blue/10 p-3 rounded-lg">
                      <FileSpreadsheet className="h-6 w-6 text-finance-blue" />
                    </div>
                    <div>
                      <CardTitle className="text-xl">{sheet.title}</CardTitle>
                      <div className="flex items-center space-x-2 mt-2">
                        <Badge className={`${sheet.badgeColor} text-white`}>
                          {sheet.badge}
                        </Badge>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Download className="h-4 w-4" />
                          <span>{sheet.downloads} downloads</span>
                        </div>
                        <div className="flex items-center space-x-1 text-sm text-gray-500">
                          <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          <span>{sheet.rating}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                
                <CardDescription className="text-gray-600 text-base mt-3">
                  {sheet.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="space-y-3 mb-6">
                  {sheet.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <CheckCircle className="h-4 w-4 text-finance-green" />
                      <span className="text-sm text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
                
                <Button className="w-full bg-finance-green hover:bg-finance-green-light text-white" asChild>
                  <Link to={sheet.href}>
                    <Download className="mr-2 h-4 w-4" />
                    Acessar Planilha Grátis
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" asChild>
            <Link to="/planilhas">Ver Todas as Planilhas</Link>
          </Button>
        </div>
      </div>
    </section>
  );
};

export default PremiumSpreadsheets;
