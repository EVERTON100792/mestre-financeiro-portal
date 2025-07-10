
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, Briefcase, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraCustoFuncionario = () => {
  const [salarioBase, setSalarioBase] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcularCusto = () => {
    const salario = parseFloat(salarioBase.replace(',', '.'));

    if (!salario) {
      alert('Preencha o salário base');
      return;
    }

    // Encargos sobre folha (Simples Nacional)
    const fgts = salario * 0.08; // 8%
    const ferias = salario / 12; // Férias
    const tercoFerias = ferias / 3; // 1/3 sobre férias
    const decimoTerceiro = salario / 12; // 13º salário
    const inss = salario * 0.075; // Aproximado (varia por faixa)

    // Outros custos estimados
    const valeTransporte = salario * 0.06; // Máximo 6% do salário
    const valeRefeicao = 25 * 22; // R$ 25 por dia útil
    const planoSaude = 300; // Estimativa
    const seguroVida = 15; // Estimativa

    const totalEncargos = fgts + ferias + tercoFerias + decimoTerceiro + inss;
    const totalBeneficios = valeTransporte + valeRefeicao + planoSaude + seguroVida;
    const custoTotal = salario + totalEncargos + totalBeneficios;

    setResultado({
      salarioBase: salario,
      fgts,
      ferias,
      tercoFerias,
      decimoTerceiro,
      inss,
      totalEncargos,
      valeTransporte,
      valeRefeicao,
      planoSaude,
      seguroVida,
      totalBeneficios,
      custoTotal
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
            <div className="bg-purple-50 p-3 rounded-lg">
              <Briefcase className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Custo do Funcionário
              </h1>
              <p className="text-gray-600 mt-2">
                Descubra o custo total de um funcionário (Simples Nacional)
              </p>
            </div>
          </div>
          <Badge className="bg-purple-100 text-purple-800">Inclui encargos e benefícios</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados do Funcionário</CardTitle>
              <CardDescription>Calcule o custo total com encargos e benefícios</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="salario">Salário Base (R$) *</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 3000,00"
                  value={salarioBase}
                  onChange={(e) => setSalarioBase(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularCusto} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Custo Total
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Custo Total do Funcionário</CardTitle>
                  <CardDescription>Breakdown completo de custos</CardDescription>
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
                      <span className="font-semibold">Salário Base:</span>
                      <span className="font-medium">{formatarMoeda(resultado.salarioBase)}</span>
                    </div>
                    
                    <h4 className="font-semibold text-red-600 mt-4">Encargos Trabalhistas:</h4>
                    <div className="flex justify-between py-1">
                      <span>FGTS (8%):</span>
                      <span>{formatarMoeda(resultado.fgts)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Férias (1/12):</span>
                      <span>{formatarMoeda(resultado.ferias)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>1/3 sobre Férias:</span>
                      <span>{formatarMoeda(resultado.tercoFerias)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>13º Salário (1/12):</span>
                      <span>{formatarMoeda(resultado.decimoTerceiro)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>INSS:</span>
                      <span>{formatarMoeda(resultado.inss)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b font-medium text-red-600">
                      <span>Total Encargos:</span>
                      <span>{formatarMoeda(resultado.totalEncargos)}</span>
                    </div>

                    <h4 className="font-semibold text-blue-600 mt-4">Benefícios (estimativa):</h4>
                    <div className="flex justify-between py-1">
                      <span>Vale Transporte:</span>
                      <span>{formatarMoeda(resultado.valeTransporte)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Vale Refeição:</span>
                      <span>{formatarMoeda(resultado.valeRefeicao)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Plano de Saúde:</span>
                      <span>{formatarMoeda(resultado.planoSaude)}</span>
                    </div>
                    <div className="flex justify-between py-1">
                      <span>Seguro de Vida:</span>
                      <span>{formatarMoeda(resultado.seguroVida)}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b font-medium text-blue-600">
                      <span>Total Benefícios:</span>
                      <span>{formatarMoeda(resultado.totalBeneficios)}</span>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Custo Total Mensal:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.custoTotal)}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {((resultado.custoTotal / resultado.salarioBase - 1) * 100).toFixed(0)}% a mais que o salário base
                    </p>
                  </div>
                </div>

                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Gerencie seus custos!</strong> Use nossa 
                    <Button variant="link" className="p-0 ml-1 text-finance-blue">
                      Planilha de Controle Empresarial
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

export default CalculadoraCustoFuncionario;
