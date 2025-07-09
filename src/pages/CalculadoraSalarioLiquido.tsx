import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, DollarSign, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraSalarioLiquido = () => {
  const [salarioBruto, setSalarioBruto] = useState('');
  const [dependentes, setDependentes] = useState('0');
  const [outrosDescontos, setOutrosDescontos] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcularSalarioLiquido = () => {
    const bruto = parseFloat(salarioBruto.replace(',', '.'));
    const numDependentes = parseInt(dependentes);
    const outros = parseFloat(outrosDescontos.replace(',', '.')) || 0;

    if (!bruto) {
      alert('Preencha o salário bruto');
      return;
    }

    // INSS 2024
    let inss = 0;
    if (bruto <= 1412) {
      inss = bruto * 0.075;
    } else if (bruto <= 2666.68) {
      inss = 105.90 + (bruto - 1412) * 0.09;
    } else if (bruto <= 4000.03) {
      inss = 105.90 + 112.93 + (bruto - 2666.68) * 0.12;
    } else if (bruto <= 7786.02) {
      inss = 105.90 + 112.93 + 160.00 + (bruto - 4000.03) * 0.14;
    } else {
      inss = 908.85; // Teto do INSS
    }

    // Base de cálculo do IR
    const baseIR = bruto - inss - (numDependentes * 189.59);

    // Imposto de Renda 2024
    let ir = 0;
    if (baseIR <= 2112) {
      ir = 0;
    } else if (baseIR <= 2826.65) {
      ir = baseIR * 0.075 - 158.40;
    } else if (baseIR <= 3751.05) {
      ir = baseIR * 0.15 - 370.40;
    } else if (baseIR <= 4664.68) {
      ir = baseIR * 0.225 - 651.73;
    } else {
      ir = baseIR * 0.275 - 884.96;
    }

    // Garantir que o IR não seja negativo
    ir = Math.max(0, ir);

    const totalDescontos = inss + ir + outros;
    const salarioLiquido = bruto - totalDescontos;

    setResultado({
      salarioBruto: bruto,
      inss,
      ir,
      outrosDescontos: outros,
      totalDescontos,
      salarioLiquido,
      dependentes: numDependentes
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
            <div className="bg-green-50 p-3 rounded-lg">
              <DollarSign className="h-6 w-6 text-finance-green" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Salário Líquido
              </h1>
              <p className="text-gray-600 mt-2">
                Descubra quanto você recebe após INSS, IR e outros descontos
              </p>
            </div>
          </div>
          <Badge className="bg-green-100 text-finance-green">Tabelas atualizadas 2025</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados do Salário</CardTitle>
              <CardDescription>
                Preencha os dados para calcular seu salário líquido
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="salario-bruto">Salário Bruto (R$) *</Label>
                <Input
                  id="salario-bruto"
                  type="text"
                  placeholder="Ex: 5000,00"
                  value={salarioBruto}
                  onChange={(e) => setSalarioBruto(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dependentes">Número de Dependentes</Label>
                <Select value={dependentes} onValueChange={setDependentes}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">0 dependentes</SelectItem>
                    <SelectItem value="1">1 dependente</SelectItem>
                    <SelectItem value="2">2 dependentes</SelectItem>
                    <SelectItem value="3">3 dependentes</SelectItem>
                    <SelectItem value="4">4 dependentes</SelectItem>
                    <SelectItem value="5">5 ou mais dependentes</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="outros-descontos">Outros Descontos (R$)</Label>
                <Input
                  id="outros-descontos"
                  type="text"
                  placeholder="Ex: 150,00 (vale transporte, plano saúde, etc.)"
                  value={outrosDescontos}
                  onChange={(e) => setOutrosDescontos(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularSalarioLiquido} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Salário Líquido
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Resultado do Cálculo</CardTitle>
                  <CardDescription>Seu salário líquido detalhado</CardDescription>
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
                      <span>Salário Bruto:</span>
                      <span className="font-medium">{formatarMoeda(resultado.salarioBruto)}</span>
                    </div>
                    
                    <div className="text-red-600">
                      <div className="flex justify-between py-2 border-b">
                        <span>(-) INSS:</span>
                        <span className="font-medium">-{formatarMoeda(resultado.inss)}</span>
                      </div>
                      
                      <div className="flex justify-between py-2 border-b">
                        <span>(-) Imposto de Renda:</span>
                        <span className="font-medium">-{formatarMoeda(resultado.ir)}</span>
                      </div>
                      
                      {resultado.outrosDescontos > 0 && (
                        <div className="flex justify-between py-2 border-b">
                          <span>(-) Outros Descontos:</span>
                          <span className="font-medium">-{formatarMoeda(resultado.outrosDescontos)}</span>
                        </div>
                      )}
                      
                      <div className="flex justify-between py-2 border-b">
                        <span className="font-semibold">Total de Descontos:</span>
                        <span className="font-semibold">-{formatarMoeda(resultado.totalDescontos)}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Salário Líquido:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.salarioLiquido)}
                      </span>
                    </div>
                  </div>
                </div>

                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Organize suas finanças!</strong> Use nossa 
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
              <CardTitle>Tabelas de Desconto 2025</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-lg font-semibold mb-3">INSS:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Até R$ 1.412,00: 7,5%</li>
                    <li>• De R$ 1.412,01 a R$ 2.666,68: 9%</li>
                    <li>• De R$ 2.666,69 a R$ 4.000,03: 12%</li>
                    <li>• De R$ 4.000,04 a R$ 7.786,02: 14%</li>
                    <li>• <strong>Teto máximo:</strong> R$ 908,85</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-lg font-semibold mb-3">Imposto de Renda:</h4>
                  <ul className="space-y-2 text-sm">
                    <li>• Até R$ 2.112,00: Isento</li>
                    <li>• De R$ 2.112,01 a R$ 2.826,65: 7,5%</li>
                    <li>• De R$ 2.826,66 a R$ 3.751,05: 15%</li>
                    <li>• De R$ 3.751,06 a R$ 4.664,68: 22,5%</li>
                    <li>• Acima de R$ 4.664,68: 27,5%</li>
                    <li>• <strong>Dependente:</strong> R$ 189,59 (dedução)</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>
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

export default CalculadoraSalarioLiquido;
