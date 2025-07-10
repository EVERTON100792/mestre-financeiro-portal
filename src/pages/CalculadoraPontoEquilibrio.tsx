
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Target, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraPontoEquilibrio = () => {
  const [custosFixos, setCustosFixos] = useState('');
  const [precoVenda, setPrecoVenda] = useState('');
  const [custoVariavel, setCustoVariavel] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcularPontoEquilibrio = () => {
    const custoFixo = parseFloat(custosFixos.replace(',', '.'));
    const preco = parseFloat(precoVenda.replace(',', '.'));
    const custoVar = parseFloat(custoVariavel.replace(',', '.'));

    if (!custoFixo || !preco || !custoVar) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    if (preco <= custoVar) {
      alert('O preço de venda deve ser maior que o custo variável');
      return;
    }

    const margemContribuicao = preco - custoVar;
    const pontoEquilibrio = custoFixo / margemContribuicao;
    const faturamentoEquilibrio = pontoEquilibrio * preco;
    const percentualMargem = (margemContribuicao / preco) * 100;

    // Meta para lucro desejado (exemplo: 20% sobre custos fixos)
    const lucroDesejado = custoFixo * 0.20;
    const pontoEquilibrioComLucro = (custoFixo + lucroDesejado) / margemContribuicao;
    const faturamentoComLucro = pontoEquilibrioComLucro * preco;

    setResultado({
      custosFixos: custoFixo,
      precoVenda: preco,
      custoVariavel: custoVar,
      margemContribuicao,
      percentualMargem,
      pontoEquilibrio: Math.ceil(pontoEquilibrio),
      faturamentoEquilibrio,
      pontoEquilibrioComLucro: Math.ceil(pontoEquilibrioComLucro),
      faturamentoComLucro,
      lucroDesejado
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
            <div className="bg-green-50 p-3 rounded-lg">
              <Target className="h-6 w-6 text-finance-green" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Ponto de Equilíbrio
              </h1>
              <p className="text-gray-600 mt-2">
                Calcule quantas vendas precisa para cobrir os custos
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-finance-green">Break-even point</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados do Negócio</CardTitle>
              <CardDescription>Preencha os dados para calcular o ponto de equilíbrio</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="custos-fixos">Custos Fixos Mensais (R$) *</Label>
                <Input
                  id="custos-fixos"
                  type="text"
                  placeholder="Ex: 5000,00 (aluguel, salários, etc.)"
                  value={custosFixos}
                  onChange={(e) => setCustosFixos(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="preco">Preço de Venda Unitário (R$) *</Label>
                <Input
                  id="preco"
                  type="text"
                  placeholder="Ex: 50,00"
                  value={precoVenda}
                  onChange={(e) => setPrecoVenda(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="custo-variavel">Custo Variável Unitário (R$) *</Label>
                <Input
                  id="custo-variavel"
                  type="text"
                  placeholder="Ex: 20,00 (matéria-prima, comissões, etc.)"
                  value={custoVariavel}
                  onChange={(e) => setCustoVariavel(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularPontoEquilibrio} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Ponto de Equilíbrio
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Análise do Ponto de Equilíbrio</CardTitle>
                  <CardDescription>Meta de vendas para o seu negócio</CardDescription>
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
                      <span>Custos Fixos Mensais:</span>
                      <span className="font-medium">{formatarMoeda(resultado.custosFixos)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Preço de Venda:</span>
                      <span className="font-medium">{formatarMoeda(resultado.precoVenda)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Custo Variável:</span>
                      <span className="font-medium">{formatarMoeda(resultado.custoVariavel)}</span>
                    </div>

                    <div className="flex justify-between py-2 border-b">
                      <span>Margem de Contribuição:</span>
                      <span className="font-medium text-finance-green">
                        {formatarMoeda(resultado.margemContribuicao)} ({resultado.percentualMargem.toFixed(1)}%)
                      </span>
                    </div>
                  </div>

                  <div className="bg-orange-50 p-4 rounded-lg mt-4">
                    <h4 className="font-bold text-orange-800 mb-2">Para Não Ter Prejuízo:</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span>Vendas Necessárias:</span>
                      <span className="text-xl font-bold text-orange-800">
                        {resultado.pontoEquilibrio} unidades/mês
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Faturamento Necessário:</span>
                      <span className="font-bold text-orange-800">
                        {formatarMoeda(resultado.faturamentoEquilibrio)}
                      </span>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <h4 className="font-bold text-finance-green mb-2">Para Ter Lucro (20%):</h4>
                    <div className="flex justify-between items-center mb-1">
                      <span>Vendas Necessárias:</span>
                      <span className="text-xl font-bold text-finance-green">
                        {resultado.pontoEquilibrioComLucro} unidades/mês
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>Faturamento Necessário:</span>
                      <span className="font-bold text-finance-green">
                        {formatarMoeda(resultado.faturamentoComLucro)}
                      </span>
                    </div>
                  </div>
                </div>

                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Controle seu negócio!</strong> Use nossa 
                    <Button variant="link" className="p-0 ml-1 text-finance-blue">
                      Planilha de Viabilidade Empresarial
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

export default CalculadoraPontoEquilibrio;
