
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Calendar, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraFerias = () => {
  const [salario, setSalario] = useState('');
  const [diasFerias, setDiasFerias] = useState('30');
  const [adiantamento13, setAdiantamento13] = useState('nao');
  const [resultado, setResultado] = useState<any>(null);

  const calcularFerias = () => {
    const salarioNum = parseFloat(salario.replace(',', '.'));
    const dias = parseInt(diasFerias);

    if (!salarioNum) {
      alert('Preencha o salário');
      return;
    }

    // Férias proporcionais
    const feriasProporcionais = (salarioNum / 30) * dias;
    
    // 1/3 constitucional
    const umTerco = feriasProporcionais / 3;
    
    // Adiantamento 13º (se solicitado)
    const adiantamento = adiantamento13 === 'sim' ? salarioNum / 2 : 0;
    
    // Total bruto
    const totalBruto = feriasProporcionais + umTerco + adiantamento;
    
    // Descontos (INSS sobre férias + 1/3)
    const baseDesconto = feriasProporcionais + umTerco;
    let inss = 0;
    
    if (baseDesconto <= 1412) {
      inss = baseDesconto * 0.075;
    } else if (baseDesconto <= 2666.68) {
      inss = 105.90 + (baseDesconto - 1412) * 0.09;
    } else if (baseDesconto <= 4000.03) {
      inss = 105.90 + 112.93 + (baseDesconto - 2666.68) * 0.12;
    } else if (baseDesconto <= 7786.02) {
      inss = 105.90 + 112.93 + 160.00 + (baseDesconto - 4000.03) * 0.14;
    } else {
      inss = 908.85; // Teto do INSS
    }
    
    // IR sobre férias (se aplicável)
    const baseIR = baseDesconto - inss;
    let ir = 0;
    if (baseIR > 2112) {
      if (baseIR <= 2826.65) {
        ir = baseIR * 0.075 - 158.40;
      } else if (baseIR <= 3751.05) {
        ir = baseIR * 0.15 - 370.40;
      } else if (baseIR <= 4664.68) {
        ir = baseIR * 0.225 - 651.73;
      } else {
        ir = baseIR * 0.275 - 884.96;
      }
    }
    ir = Math.max(0, ir);
    
    const totalDescontos = inss + ir;
    const totalLiquido = totalBruto - totalDescontos;

    setResultado({
      salario: salarioNum,
      dias,
      feriasProporcionais,
      umTerco,
      adiantamento,
      totalBruto,
      inss,
      ir,
      totalDescontos,
      totalLiquido
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
      
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Calendar className="h-6 w-6 text-finance-blue" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Férias + 1/3
              </h1>
              <p className="text-gray-600 mt-2">
                Calcule o valor das férias incluindo o terço constitucional
              </p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-finance-blue">Inclui adiantamento do 13º</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados das Férias</CardTitle>
              <CardDescription>
                Preencha os dados para calcular suas férias
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="salario">Salário Mensal (R$) *</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 3000,00"
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dias-ferias">Dias de Férias</Label>
                <Select value={diasFerias} onValueChange={setDiasFerias}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="30">30 dias (férias completas)</SelectItem>
                    <SelectItem value="20">20 dias (venda de 10 dias)</SelectItem>
                    <SelectItem value="15">15 dias (1º período)</SelectItem>
                    <SelectItem value="10">10 dias (2º período)</SelectItem>
                    <SelectItem value="5">5 dias (3º período)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="adiantamento">Solicitar Adiantamento do 13º?</Label>
                <Select value={adiantamento13} onValueChange={setAdiantamento13}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="nao">Não</SelectItem>
                    <SelectItem value="sim">Sim (50% do salário)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calcularFerias} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Férias
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Resultado do Cálculo</CardTitle>
                  <CardDescription>Valores das suas férias</CardDescription>
                </div>
                <Button 
                  onClick={imprimirPDF} 
                  variant="outline"
                  className="no-print"
                >
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="print-section">
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span>Salário Base:</span>
                      <span className="font-medium">{formatarMoeda(resultado.salario)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Férias ({resultado.dias} dias):</span>
                      <span className="font-medium">{formatarMoeda(resultado.feriasProporcionais)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>1/3 Constitucional:</span>
                      <span className="font-medium">{formatarMoeda(resultado.umTerco)}</span>
                    </div>
                    
                    {resultado.adiantamento > 0 && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Adiantamento 13º:</span>
                        <span className="font-medium">{formatarMoeda(resultado.adiantamento)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2 border-b font-semibold">
                      <span>Subtotal:</span>
                      <span>{formatarMoeda(resultado.totalBruto)}</span>
                    </div>
                    
                    <div className="text-red-600 space-y-2">
                      <div className="flex justify-between py-2 border-b">
                        <span>(-) INSS:</span>
                        <span className="font-medium">-{formatarMoeda(resultado.inss)}</span>
                      </div>
                      
                      {resultado.ir > 0 && (
                        <div className="flex justify-between py-2 border-b">
                          <span>(-) Imposto de Renda:</span>
                          <span className="font-medium">-{formatarMoeda(resultado.ir)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total Líquido:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.totalLiquido)}
                      </span>
                    </div>
                  </div>
                </div>

                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Planeje suas férias!</strong> Use nossa 
                    <Button variant="link" className="p-0 ml-1 text-finance-blue">
                      Planilha de Controle Financeiro Gratuita
                    </Button>
                  </AlertDescription>
                </Alert>
              </CardContent>
            </Card>
          )}
        </div>

        {/* Informações adicionais */}
        <div className="mt-12 no-print">
          <Card>
            <CardHeader>
              <CardTitle>Direitos nas Férias</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700">
                <h4 className="text-lg font-semibold mb-3">Regras Importantes:</h4>
                <ul className="space-y-2">
                  <li>• <strong>Pagamento:</strong> Deve ser feito até 2 dias antes do início das férias</li>
                  <li>• <strong>Venda de Férias:</strong> É permitido vender até 1/3 dos dias (10 dias)</li>
                  <li>• <strong>Fracionamento:</strong> Férias podem ser divididas em até 3 períodos</li>
                  <li>• <strong>Período Mínimo:</strong> Nenhum período pode ser inferior a 5 dias</li>
                  <li>• <strong>1/3 Constitucional:</strong> Garantido pela Constituição Federal</li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
      
      <style jsx>{`
        @media print {
          .no-print { display: none !important; }
          .print-section { break-inside: avoid; }
          body { font-size: 12pt; }
        }
      `}</style>
    </div>
  );
};

export default CalculadoraFerias;
