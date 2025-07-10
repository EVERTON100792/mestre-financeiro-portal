
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraDividendYield = () => {
  const [nomeAcao, setNomeAcao] = useState('');
  const [precoAcao, setPrecoAcao] = useState('');
  const [dividendosAnuais, setDividendosAnuais] = useState('');
  const [quantidadeAcoes, setQuantidadeAcoes] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcularDividendYield = () => {
    const preco = parseFloat(precoAcao.replace(',', '.'));
    const dividendos = parseFloat(dividendosAnuais.replace(',', '.'));
    const quantidade = parseInt(quantidadeAcoes) || 1;

    if (!preco || !dividendos) {
      alert('Preencha o preço da ação e os dividendos anuais');
      return;
    }

    const dividendYield = (dividendos / preco) * 100;
    const investimentoTotal = preco * quantidade;
    const rendimentoAnual = dividendos * quantidade;
    const rendimentoMensal = rendimentoAnual / 12;

    setResultado({
      nomeAcao: nomeAcao || 'Ação',
      precoAcao: preco,
      dividendosAnuais: dividendos,
      quantidadeAcoes: quantidade,
      dividendYield,
      investimentoTotal,
      rendimentoAnual,
      rendimentoMensal
    });
  };

  const imprimirPDF = () => {
    window.print();
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-finance-blue" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Dividend Yield
              </h1>
              <p className="text-gray-600 mt-2">
                Calcule o rendimento de dividendos das suas ações
              </p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-finance-blue">Renda passiva com ações</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados da Ação</CardTitle>
              <CardDescription>Preencha os dados para calcular o dividend yield</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="nome">Nome da Ação (opcional)</Label>
                <Input
                  id="nome"
                  type="text"
                  placeholder="Ex: ITUB4, VALE3"
                  value={nomeAcao}
                  onChange={(e) => setNomeAcao(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="preco">Preço da Ação (R$) *</Label>
                <Input
                  id="preco"
                  type="text"
                  placeholder="Ex: 25,50"
                  value={precoAcao}
                  onChange={(e) => setPrecoAcao(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dividendos">Dividendos Anuais por Ação (R$) *</Label>
                <Input
                  id="dividendos"
                  type="text"
                  placeholder="Ex: 1,50"
                  value={dividendosAnuais}
                  onChange={(e) => setDividendosAnuais(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="quantidade">Quantidade de Ações</Label>
                <Input
                  id="quantidade"
                  type="text"
                  placeholder="Ex: 100"
                  value={quantidadeAcoes}
                  onChange={(e) => setQuantidadeAcoes(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularDividendYield} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Dividend Yield
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Análise de {resultado.nomeAcao}</CardTitle>
                  <CardDescription>Rendimento dos seus dividendos</CardDescription>
                </div>
                <Button onClick={imprimirPDF} variant="outline" className="no-print">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="print-section">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span>Preço da Ação:</span>
                      <span className="font-medium">{formatarMoeda(resultado.precoAcao)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Dividendos por Ação (ano):</span>
                      <span className="font-medium">{formatarMoeda(resultado.dividendosAnuais)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Quantidade de Ações:</span>
                      <span className="font-medium">{resultado.quantidadeAcoes}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b">
                      <span>Investimento Total:</span>
                      <span className="font-medium">{formatarMoeda(resultado.investimentoTotal)}</span>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">Dividend Yield:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {resultado.dividendYield.toFixed(2)}%
                      </span>
                    </div>
                    <div className="space-y-1 text-sm text-gray-600">
                      <div className="flex justify-between">
                        <span>Rendimento Anual:</span>
                        <span>{formatarMoeda(resultado.rendimentoAnual)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Rendimento Mensal:</span>
                        <span>{formatarMoeda(resultado.rendimentoMensal)}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Organize sua carteira!</strong> Use nossa 
                    <Button variant="link" className="p-0 ml-1 text-finance-blue">
                      Planilha de Controle de Investimentos
                    </Button>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>
      </div>

      <Footer />
      
      <style>{`
        @media print {
          .no-print { display: none !important; }
          .print-section { break-inside: avoid; }
          body { font-size: 12pt; }
        }
      `}</style>
    </div>
  );
};

export default CalculadoraDividendYield;
