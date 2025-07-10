
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, PiggyBank, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraViverDeRenda = () => {
  const [gastosMensais, setGastosMensais] = useState('');
  const [rendimentoAnual, setRendimentoAnual] = useState('12');
  const [resultado, setResultado] = useState<any>(null);

  const calcularViverDeRenda = () => {
    const gastos = parseFloat(gastosMensais.replace(',', '.'));
    const rendimento = parseFloat(rendimentoAnual.replace(',', '.')) / 100;

    if (!gastos) {
      alert('Preencha seus gastos mensais');
      return;
    }

    const gastosAnuais = gastos * 12;
    const patrimonioNecessario = gastosAnuais / rendimento;
    const rendaMensal = patrimonioNecessario * rendimento / 12;

    setResultado({
      gastosMensais: gastos,
      gastosAnuais,
      rendimentoAnual: rendimento * 100,
      patrimonioNecessario,
      rendaMensal
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
              <PiggyBank className="h-6 w-6 text-finance-green" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora Viver de Renda
              </h1>
              <p className="text-gray-600 mt-2">
                Descubra quanto precisa investir para viver de renda
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-finance-green">Liberdade Financeira</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Seus Dados Financeiros</CardTitle>
              <CardDescription>Calcule quanto você precisa para viver de renda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="gastos">Gastos Mensais Desejados (R$) *</Label>
                <Input
                  id="gastos"
                  type="text"
                  placeholder="Ex: 5000,00"
                  value={gastosMensais}
                  onChange={(e) => setGastosMensais(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="rendimento">Rendimento Esperado (% ao ano)</Label>
                <Input
                  id="rendimento"
                  type="text"
                  placeholder="Ex: 12,0"
                  value={rendimentoAnual}
                  onChange={(e) => setRendimentoAnual(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularViverDeRenda} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Patrimônio Necessário
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Seu Plano de Liberdade Financeira</CardTitle>
                  <CardDescription>Patrimônio necessário para viver de renda</CardDescription>
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
                      <span>Gastos Mensais Desejados:</span>
                      <span className="font-medium">{formatarMoeda(resultado.gastosMensais)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Gastos Anuais:</span>
                      <span className="font-medium">{formatarMoeda(resultado.gastosAnuais)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Rendimento Esperado:</span>
                      <span className="font-medium">{resultado.rendimentoAnual.toFixed(1)}% ao ano</span>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-lg font-bold">Patrimônio Necessário:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.patrimonioNecessario)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">
                      Gerando uma renda mensal de {formatarMoeda(resultado.rendaMensal)}
                    </p>
                  </div>
                </div>

                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Organize seus investimentos!</strong> Use nossa 
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

export default CalculadoraViverDeRenda;
