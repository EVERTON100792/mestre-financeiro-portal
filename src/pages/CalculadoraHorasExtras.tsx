import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Clock, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraHorasExtras = () => {
  const [salarioMensal, setSalarioMensal] = useState('');
  const [horasSemanais, setHorasSemanais] = useState('44');
  const [horasExtras50, setHorasExtras50] = useState('');
  const [horasExtras100, setHorasExtras100] = useState('');
  const [dsrIncluido, setDsrIncluido] = useState('sim');
  const [resultado, setResultado] = useState<any>(null);

  const calcularHorasExtras = () => {
    const salario = parseFloat(salarioMensal.replace(',', '.'));
    const horas50 = parseFloat(horasExtras50.replace(',', '.')) || 0;
    const horas100 = parseFloat(horasExtras100.replace(',', '.')) || 0;
    const horasSem = parseFloat(horasSemanais);

    if (!salario) {
      alert('Preencha o salário mensal');
      return;
    }

    // Cálculo do valor da hora normal
    const valorHoraNormal = salario / (horasSem * 4.33); // 4.33 semanas por mês

    // Horas extras 50%
    const valorHora50 = valorHoraNormal * 1.5;
    const totalHoras50 = horas50 * valorHora50;

    // Horas extras 100%
    const valorHora100 = valorHoraNormal * 2;
    const totalHoras100 = horas100 * valorHora100;

    // DSR sobre horas extras (se aplicável)
    let dsrHoras50 = 0;
    let dsrHoras100 = 0;
    
    if (dsrIncluido === 'sim') {
      dsrHoras50 = (totalHoras50 / 25) * 5; // 5 domingos e feriados por mês
      dsrHoras100 = (totalHoras100 / 25) * 5;
    }

    const totalGeral = totalHoras50 + totalHoras100 + dsrHoras50 + dsrHoras100;

    setResultado({
      valorHoraNormal,
      valorHora50,
      valorHora100,
      horas50,
      horas100,
      totalHoras50,
      totalHoras100,
      dsrHoras50,
      dsrHoras100,
      totalGeral,
      salario
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
            <div className="bg-orange-50 p-3 rounded-lg">
              <Clock className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Horas Extras
              </h1>
              <p className="text-gray-600 mt-2">
                Calcule o valor correto das horas extras 50% e 100%
              </p>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-800">Inclui DSR sobre horas extras</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados para Cálculo</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para calcular suas horas extras
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="salario">Salário Mensal (R$) *</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 2500,00"
                  value={salarioMensal}
                  onChange={(e) => setSalarioMensal(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="horas-semanais">Horas de Trabalho por Semana</Label>
                <Select value={horasSemanais} onValueChange={setHorasSemanais}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="40">40 horas</SelectItem>
                    <SelectItem value="44">44 horas</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="horas-50">Horas Extras 50% (quantidade)</Label>
                <Input
                  id="horas-50"
                  type="text"
                  placeholder="Ex: 10"
                  value={horasExtras50}
                  onChange={(e) => setHorasExtras50(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="horas-100">Horas Extras 100% (quantidade)</Label>
                <Input
                  id="horas-100"
                  type="text"
                  placeholder="Ex: 5"
                  value={horasExtras100}
                  onChange={(e) => setHorasExtras100(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="dsr">Incluir DSR sobre Horas Extras?</Label>
                <Select value={dsrIncluido} onValueChange={setDsrIncluido}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sim">Sim</SelectItem>
                    <SelectItem value="nao">Não</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calcularHorasExtras} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Horas Extras
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Resultado do Cálculo</CardTitle>
                  <CardDescription>Valores das suas horas extras</CardDescription>
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
                      <span>Valor Hora Normal:</span>
                      <span className="font-medium">{formatarMoeda(resultado.valorHoraNormal)}</span>
                    </div>

                    {resultado.horas50 > 0 && (
                      <>
                        <div className="flex justify-between py-2 border-b">
                          <span>Horas Extras 50% ({resultado.horas50}h):</span>
                          <span className="font-medium">{formatarMoeda(resultado.totalHoras50)}</span>
                        </div>
                        
                        {resultado.dsrHoras50 > 0 && (
                          <div className="flex justify-between py-2 border-b">
                            <span>DSR sobre 50%:</span>
                            <span className="font-medium">{formatarMoeda(resultado.dsrHoras50)}</span>
                          </div>
                        )}
                      </>
                    )}

                    {resultado.horas100 > 0 && (
                      <>
                        <div className="flex justify-between py-2 border-b">
                          <span>Horas Extras 100% ({resultado.horas100}h):</span>
                          <span className="font-medium">{formatarMoeda(resultado.totalHoras100)}</span>
                        </div>
                        
                        {resultado.dsrHoras100 > 0 && (
                          <div className="flex justify-between py-2 border-b">
                            <span>DSR sobre 100%:</span>
                            <span className="font-medium">{formatarMoeda(resultado.dsrHoras100)}</span>
                          </div>
                        )}
                      </>
                    )}
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total a Receber:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.totalGeral)}
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
              <CardTitle>Informações Importantes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700">
                <h4 className="text-lg font-semibold mb-3">Sobre o Cálculo:</h4>
                <ul className="space-y-2">
                  <li>• <strong>Horas Extras 50%:</strong> Aplicadas de segunda a sábado, até 2h por dia</li>
                  <li>• <strong>Horas Extras 100%:</strong> Domingos, feriados e após as 2h extras diárias</li>
                  <li>• <strong>DSR:</strong> Descanso Semanal Remunerado sobre as horas extras</li>
                  <li>• <strong>Base de Cálculo:</strong> Salário ÷ (horas semanais × 4,33 semanas)</li>
                </ul>
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

export default CalculadoraHorasExtras;
