
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraRendaFixa = () => {
  const [valorInvestido, setValorInvestido] = useState('');
  const [prazoMeses, setPrazoMeses] = useState('12');
  const [tipoInvestimento, setTipoInvestimento] = useState('cdb');
  const [taxaCdi, setTaxaCdi] = useState('12.75');
  const [percentualCdi, setPercentualCdi] = useState('100');
  const [resultado, setResultado] = useState<any>(null);

  const calcularRendimento = () => {
    const valor = parseFloat(valorInvestido.replace(',', '.'));
    const prazo = parseInt(prazoMeses);
    const cdi = parseFloat(taxaCdi.replace(',', '.')) / 100;
    const percentual = parseFloat(percentualCdi.replace(',', '.')) / 100;

    if (!valor) {
      alert('Preencha o valor investido');
      return;
    }

    const taxaReal = cdi * percentual;
    const taxaMensal = Math.pow(1 + taxaReal, 1/12) - 1;
    const valorFinal = valor * Math.pow(1 + taxaMensal, prazo);
    const rendimentoBruto = valorFinal - valor;

    // Cálculo do IR
    let aliquotaIR = 0;
    if (prazo <= 6) aliquotaIR = 0.225;
    else if (prazo <= 12) aliquotaIR = 0.20;
    else if (prazo <= 24) aliquotaIR = 0.175;
    else aliquotaIR = 0.15;

    // Para LCI/LCA não há IR
    const impostoRenda = tipoInvestimento === 'lci' || tipoInvestimento === 'lca' ? 0 : rendimentoBruto * aliquotaIR;
    const rendimentoLiquido = rendimentoBruto - impostoRenda;
    const valorLiquido = valor + rendimentoLiquido;

    setResultado({
      valorInvestido: valor,
      prazoMeses: prazo,
      tipoInvestimento,
      taxaAnual: taxaReal * 100,
      valorFinal,
      rendimentoBruto,
      impostoRenda,
      rendimentoLiquido,
      valorLiquido,
      aliquotaIR: aliquotaIR * 100
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

  const getTipoNome = (tipo: string) => {
    const tipos = {
      cdb: 'CDB',
      lci: 'LCI',
      lca: 'LCA',
      tesouro: 'Tesouro Selic'
    };
    return tipos[tipo as keyof typeof tipos] || tipo;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-green-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-finance-green" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Renda Fixa
              </h1>
              <p className="text-gray-600 mt-2">
                Compare CDB, LCI/LCA, Tesouro Direto e Poupança
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-finance-green">Inclui cálculo de IR</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados do Investimento</CardTitle>
              <CardDescription>Preencha os dados para calcular o rendimento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="valor">Valor a Investir (R$) *</Label>
                <Input
                  id="valor"
                  type="text"
                  placeholder="Ex: 10000,00"
                  value={valorInvestido}
                  onChange={(e) => setValorInvestido(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tipo">Tipo de Investimento</Label>
                <Select value={tipoInvestimento} onValueChange={setTipoInvestimento}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="cdb">CDB</SelectItem>
                    <SelectItem value="lci">LCI</SelectItem>
                    <SelectItem value="lca">LCA</SelectItem>
                    <SelectItem value="tesouro">Tesouro Selic</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="prazo">Prazo (meses)</Label>
                <Select value={prazoMeses} onValueChange={setPrazoMeses}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="6">6 meses</SelectItem>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="18">18 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                    <SelectItem value="60">60 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="cdi">Taxa CDI (% ao ano)</Label>
                <Input
                  id="cdi"
                  type="text"
                  placeholder="Ex: 12,75"
                  value={taxaCdi}
                  onChange={(e) => setTaxaCdi(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="percentual">Percentual do CDI (%)</Label>
                <Input
                  id="percentual"
                  type="text"
                  placeholder="Ex: 100"
                  value={percentualCdi}
                  onChange={(e) => setPercentualCdi(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularRendimento} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Rendimento
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Simulação de {getTipoNome(resultado.tipoInvestimento)}</CardTitle>
                  <CardDescription>Seu rendimento detalhado</CardDescription>
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
                      <span>Valor Investido:</span>
                      <span className="font-medium">{formatarMoeda(resultado.valorInvestido)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Prazo:</span>
                      <span className="font-medium">{resultado.prazoMeses} meses</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Taxa Anual:</span>
                      <span className="font-medium">{resultado.taxaAnual.toFixed(2)}% a.a.</span>
                    </div>

                    <div className="flex justify-between py-2 border-b">
                      <span>Rendimento Bruto:</span>
                      <span className="font-medium text-finance-green">{formatarMoeda(resultado.rendimentoBruto)}</span>
                    </div>

                    {resultado.impostoRenda > 0 && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Imposto de Renda ({resultado.aliquotaIR}%):</span>
                        <span className="font-medium text-red-600">-{formatarMoeda(resultado.impostoRenda)}</span>
                      </div>
                    )}

                    <div className="flex justify-between py-2 border-b">
                      <span>Rendimento Líquido:</span>
                      <span className="font-medium text-finance-green">{formatarMoeda(resultado.rendimentoLiquido)}</span>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Valor Final:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.valorLiquido)}
                      </span>
                    </div>
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

export default CalculadoraRendaFixa;
