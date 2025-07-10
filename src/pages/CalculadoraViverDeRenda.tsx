import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrintLayout from '@/components/PrintLayout';
import PrintTable from '@/components/PrintTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Target, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraViverDeRenda = () => {
  const [rendaMensal, setRendaMensal] = useState('');
  const [taxaJuros, setTaxaJuros] = useState('0.8');
  const [resultado, setResultado] = useState<any>(null);

  const calcularPatrimonio = () => {
    const renda = parseFloat(rendaMensal.replace(',', '.'));
    const taxa = parseFloat(taxaJuros.replace(',', '.')) / 100; // Convertendo para decimal

    if (!renda || !taxa) {
      alert('Preencha a renda desejada e a taxa de juros');
      return;
    }

    const patrimonioNecessario = renda / taxa;
    const aporteAnual = patrimonioNecessario * 0.2; // 20% do patrimônio por ano
    const aporteMensal = aporteAnual / 12;
    const anosNecessarios = patrimonioNecessario / aporteAnual;

    setResultado({
      rendaMensal: renda,
      taxaJuros: taxa * 100,
      patrimonioNecessario,
      aporteAnual,
      aporteMensal,
      anosNecessarios
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

      {/* Conteúdo para impressão */}
      {resultado && (
        <PrintLayout title="Relatório para Viver de Renda">
          <PrintTable
            rows={[
              { label: "Renda Mensal Desejada", value: resultado.rendaMensal },
              { label: "Taxa de Juros Mensal", value: `${resultado.taxaJuros.toFixed(2)}%` },
              { label: "PATRIMÔNIO NECESSÁRIO", value: resultado.patrimonioNecessario, highlight: true },
              { label: "Aporte Anual Necessário", value: resultado.aporteAnual, category: "Estratégia de Acumulação" },
              { label: "Aporte Mensal", value: resultado.aporteMensal },
              { label: "Tempo Estimado", value: `${resultado.anosNecessarios.toFixed(1)} anos` }
            ]}
          />
          <div className="print-summary">
            <p><strong>Resumo:</strong> Para ter uma renda mensal de {formatarMoeda(resultado.rendaMensal)}, você precisa acumular {formatarMoeda(resultado.patrimonioNecessario)} investindo {formatarMoeda(resultado.aporteMensal)} por mês durante aproximadamente {resultado.anosNecessarios.toFixed(1)} anos.</p>
          </div>
        </PrintLayout>
      )}
      
      <div className="bg-white py-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <Target className="h-6 w-6 text-finance-green" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora para Viver de Renda
              </h1>
              <p className="text-gray-600 mt-2">
                Descubra quanto precisa investir para ter independência financeira
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-finance-green">Independência Financeira</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Seus Objetivos</CardTitle>
              <CardDescription>Calcule quanto precisa para viver de renda</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="renda">Renda Mensal Desejada (R$) *</Label>
                <Input
                  id="renda"
                  type="text"
                  placeholder="Ex: 5000,00"
                  value={rendaMensal}
                  onChange={(e) => setRendaMensal(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="taxa">Taxa de Juros Mensal (%) *</Label>
                <Input
                  id="taxa"
                  type="text"
                  placeholder="Ex: 0,8 (Tesouro Direto)"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularPatrimonio} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Patrimônio
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Plano de Independência</CardTitle>
                  <CardDescription>Seu caminho para a liberdade financeira</CardDescription>
                </div>
                <Button onClick={imprimirPDF} variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>Renda Mensal Desejada:</span>
                    <span className="font-medium">{formatarMoeda(resultado.rendaMensal)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Taxa de Juros:</span>
                    <span className="font-medium">{resultado.taxaJuros.toFixed(2)}% ao mês</span>
                  </div>
                </div>

                <div className="bg-finance-green/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">Patrimônio Necessário:</span>
                    <span className="text-2xl font-bold text-finance-green">
                      {formatarMoeda(resultado.patrimonioNecessario)}
                    </span>
                  </div>
                </div>

                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-bold text-blue-800 mb-2">Estratégia:</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span>Aporte Mensal:</span>
                      <span className="font-bold">{formatarMoeda(resultado.aporteMensal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Tempo Estimado:</span>
                      <span className="font-bold">{resultado.anosNecessarios.toFixed(1)} anos</span>
                    </div>
                  </div>
                </div>

                <Alert>
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
    </div>
  );
};

export default CalculadoraViverDeRenda;
