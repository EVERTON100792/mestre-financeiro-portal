
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, FileSpreadsheet, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraRescisao = () => {
  const [salario, setSalario] = useState('');
  const [tipoRescisao, setTipoRescisao] = useState('');
  const [mesesTrabalhados, setMesesTrabalhados] = useState('');
  const [feriasVencidas, setFeriasVencidas] = useState('');
  const [resultado, setResultado] = useState<any>(null);

  const calcularRescisao = () => {
    const salarioNum = parseFloat(salario.replace(',', '.'));
    const meses = parseInt(mesesTrabalhados);
    const ferias = parseInt(feriasVencidas);

    if (!salarioNum || !meses || !tipoRescisao) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    const salarioBase = salarioNum;
    
    // Aviso Prévio (30 dias)
    const avisoPrevio = tipoRescisao === 'sem-justa-causa' ? salarioBase : 0;
    
    // 13º Salário Proporcional
    const decimoTerceiro = (salarioBase / 12) * meses;
    
    // Férias Proporcionais + 1/3
    const feriasProporcionais = ((salarioBase / 12) * meses) + ((salarioBase / 12) * meses * 0.33);
    
    // Férias Vencidas + 1/3
    const feriasVencidasValor = ferias > 0 ? salarioBase + (salarioBase * 0.33) : 0;
    
    // FGTS (8% sobre salários + multa de 40% se demissão sem justa causa)
    const fgtsDepositos = salarioBase * 0.08 * meses;
    const multaFgts = tipoRescisao === 'sem-justa-causa' ? fgtsDepositos * 0.4 : 0;
    
    // Seguro Desemprego (apenas informativo)
    const seguroDesemprego = tipoRescisao === 'sem-justa-causa' ? 'Tem direito' : 'Não tem direito';

    const total = avisoPrevio + decimoTerceiro + feriasProporcionais + feriasVencidasValor + fgtsDepositos + multaFgts;

    setResultado({
      avisoPrevio,
      decimoTerceiro,
      feriasProporcionais,
      feriasVencidasValor,
      fgtsDepositos,
      multaFgts,
      seguroDesemprego,
      total
    });
  };

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const imprimirPDF = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-red-50 p-3 rounded-lg">
              <Calculator className="h-6 w-6 text-red-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Rescisão CLT
              </h1>
              <p className="text-gray-600 mt-2">
                Calcule todos os seus direitos trabalhistas na demissão
              </p>
            </div>
          </div>
          <Badge className="bg-red-100 text-red-800">Atualizada com a legislação 2025</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados da Rescisão</CardTitle>
              <CardDescription>
                Preencha os dados abaixo para calcular seus direitos
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="salario">Salário Bruto Mensal *</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 3000,00"
                  value={salario}
                  onChange={(e) => setSalario(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tipo-rescisao">Tipo de Rescisão *</Label>
                <Select value={tipoRescisao} onValueChange={setTipoRescisao}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o tipo de rescisão" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sem-justa-causa">Demissão sem justa causa</SelectItem>
                    <SelectItem value="com-justa-causa">Demissão com justa causa</SelectItem>
                    <SelectItem value="pedido-demissao">Pedido de demissão</SelectItem>
                    <SelectItem value="acordo">Acordo (Lei 13.467/2017)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="meses">Meses trabalhados no ano *</Label>
                <Input
                  id="meses"
                  type="number"
                  placeholder="Ex: 8"
                  min="1"
                  max="12"
                  value={mesesTrabalhados}
                  onChange={(e) => setMesesTrabalhados(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="ferias">Períodos de férias vencidas</Label>
                <Select value={feriasVencidas} onValueChange={setFeriasVencidas}>
                  <SelectTrigger>
                    <SelectValue placeholder="Quantos períodos de férias não tirou?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="0">Nenhum</SelectItem>
                    <SelectItem value="1">1 período</SelectItem>
                    <SelectItem value="2">2 períodos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={calcularRescisao} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Rescisão
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Resultado da Rescisão</CardTitle>
                  <CardDescription>Valores que você tem direito a receber</CardDescription>
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
                    {resultado.avisoPrevio > 0 && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Aviso Prévio:</span>
                        <span className="font-medium">{formatarMoeda(resultado.avisoPrevio)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>13º Salário Proporcional:</span>
                      <span className="font-medium">{formatarMoeda(resultado.decimoTerceiro)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Férias Proporcionais + 1/3:</span>
                      <span className="font-medium">{formatarMoeda(resultado.feriasProporcionais)}</span>
                    </div>
                    
                    {resultado.feriasVencidasValor > 0 && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Férias Vencidas + 1/3:</span>
                        <span className="font-medium">{formatarMoeda(resultado.feriasVencidasValor)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Saldo FGTS:</span>
                      <span className="font-medium">{formatarMoeda(resultado.fgtsDepositos)}</span>
                    </div>
                    
                    {resultado.multaFgts > 0 && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Multa FGTS (40%):</span>
                        <span className="font-medium">{formatarMoeda(resultado.multaFgts)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Seguro Desemprego:</span>
                      <span className="font-medium">{resultado.seguroDesemprego}</span>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Total a Receber:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.total)}
                      </span>
                    </div>
                  </div>
                </div>

                {/* CTA para planilha */}
                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Gostou do cálculo?</strong> Organize essa rescisão e planeje seu futuro financeiro com nossa 
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
                <h4 className="text-lg font-semibold mb-3">Sobre os Cálculos:</h4>
                <ul className="space-y-2">
                  <li>• <strong>Aviso Prévio:</strong> Devido apenas na demissão sem justa causa (30 dias de salário)</li>
                  <li>• <strong>13º Proporcional:</strong> Calculado com base nos meses trabalhados no ano</li>
                  <li>• <strong>Férias Proporcionais:</strong> Incluem o adicional de 1/3 constitucional</li>
                  <li>• <strong>FGTS:</strong> Saque do saldo + multa de 40% (se demissão sem justa causa)</li>
                  <li>• <strong>Seguro Desemprego:</strong> Disponível apenas para demissão sem justa causa</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Documentos Necessários:</h4>
                <ul className="space-y-2">
                  <li>• Carteira de Trabalho</li>
                  <li>• Termo de Rescisão do Contrato de Trabalho (TRCT)</li>
                  <li>• Comprovante de Depósito de Rescisão (CDR)</li>
                  <li>• Guia do Seguro-Desemprego</li>
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

export default CalculadoraRescisao;
