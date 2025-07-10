import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrintLayout from '@/components/PrintLayout';
import PrintTable from '@/components/PrintTable';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Calculator, Users, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraAposentadoria = () => {
  const [idade, setIdade] = useState('');
  const [salarioAtual, setSalarioAtual] = useState('');
  const [tempoContribuicao, setTempoContribuicao] = useState('');
  const [sexo, setSexo] = useState('masculino');
  const [resultado, setResultado] = useState<any>(null);

  const calcularAposentadoria = () => {
    const idadeAtual = parseInt(idade);
    const salario = parseFloat(salarioAtual.replace(',', '.'));
    const tempoContrib = parseInt(tempoContribuicao);

    if (!idadeAtual || !salario) {
      alert('Preencha a idade e o salário atual');
      return;
    }

    // Regras 2025 - simplificadas
    const idadeMinima = sexo === 'masculino' ? 65 : 62;
    const tempoMinimoContribuicao = sexo === 'masculino' ? 20 : 15;
    
    const anosRestantesIdade = Math.max(0, idadeMinima - idadeAtual);
    const anosRestantesContribuicao = Math.max(0, tempoMinimoContribuicao - tempoContrib);
    const anosRestantes = Math.max(anosRestantesIdade, anosRestantesContribuicao);

    // Cálculo simplificado do benefício
    let percentualBeneficio = 60; // Base
    if (tempoContrib > tempoMinimoContribuicao) {
      percentualBeneficio += (tempoContrib - tempoMinimoContribuicao) * 2;
    }
    percentualBeneficio = Math.min(percentualBeneficio, 100);

    const salarioLimite = Math.min(salario, 7786.02); // Teto INSS 2025
    const beneficioEstimado = (salarioLimite * percentualBeneficio) / 100;

    setResultado({
      idadeAtual,
      salario,
      tempoContrib,
      sexo,
      idadeMinima,
      tempoMinimoContribuicao,
      anosRestantes,
      percentualBeneficio,
      beneficioEstimado,
      podeAposentar: anosRestantes === 0
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
        <PrintLayout title="Simulação de Aposentadoria INSS">
          <PrintTable
            rows={[
              { label: "Sexo", value: resultado.sexo === 'masculino' ? 'Masculino' : 'Feminino' },
              { label: "Idade Atual", value: `${resultado.idadeAtual} anos`, category: "Situação Atual" },
              { label: "Salário Atual", value: resultado.salario },
              { label: "Tempo de Contribuição", value: `${resultado.tempoContrib} anos` },
              { label: "Idade Mínima", value: `${resultado.idadeMinima} anos`, category: "Requisitos" },
              { label: "Tempo Mínimo", value: `${resultado.tempoMinimoContribuicao} anos` },
              { label: "Tempo Restante", value: resultado.anosRestantes > 0 ? `${resultado.anosRestantes} anos` : "Pode se aposentar!" },
              { label: "BENEFÍCIO ESTIMADO", value: resultado.beneficioEstimado, highlight: true, category: "Resultado" },
              { label: "Percentual do Salário", value: `${resultado.percentualBeneficio}%` }
            ]}
          />
          <div className="print-summary">
            <p><strong>Atenção:</strong> Esta é uma estimativa baseada nas regras atuais do INSS. Para cálculos precisos, consulte diretamente o INSS ou um contador especializado.</p>
          </div>
        </PrintLayout>
      )}
      
      <div className="bg-white py-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-purple-50 p-3 rounded-lg">
              <Users className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Aposentadoria
              </h1>
              <p className="text-gray-600 mt-2">
                Planeje sua aposentadoria com simulações de INSS e previdência
              </p>
            </div>
          </div>
          <Badge className="bg-purple-100 text-purple-800">Regras atualizadas 2025</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Seus Dados</CardTitle>
              <CardDescription>Preencha os dados para calcular sua aposentadoria</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="sexo">Sexo</Label>
                <Select value={sexo} onValueChange={setSexo}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="masculino">Masculino</SelectItem>
                    <SelectItem value="feminino">Feminino</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="idade">Idade Atual *</Label>
                <Input
                  id="idade"
                  type="text"
                  placeholder="Ex: 35"
                  value={idade}
                  onChange={(e) => setIdade(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="salario">Salário Atual (R$) *</Label>
                <Input
                  id="salario"
                  type="text"
                  placeholder="Ex: 5000"
                  value={salarioAtual}
                  onChange={(e) => setSalarioAtual(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="tempo">Tempo de Contribuição (anos)</Label>
                <Input
                  id="tempo"
                  type="text"
                  placeholder="Ex: 10"
                  value={tempoContribuicao}
                  onChange={(e) => setTempoContribuicao(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularAposentadoria} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Aposentadoria
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Sua Simulação de Aposentadoria</CardTitle>
                  <CardDescription>Estimativa baseada nas regras atuais</CardDescription>
                </div>
                <Button onClick={imprimirPDF} variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>Idade Atual:</span>
                    <span className="font-medium">{resultado.idadeAtual} anos</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Tempo de Contribuição:</span>
                    <span className="font-medium">{resultado.tempoContrib} anos</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Idade Mínima ({resultado.sexo}):</span>
                    <span className="font-medium">{resultado.idadeMinima} anos</span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span>Tempo Mínimo de Contribuição:</span>
                    <span className="font-medium">{resultado.tempoMinimoContribuicao} anos</span>
                  </div>

                  {resultado.anosRestantes > 0 ? (
                    <div className="flex justify-between py-2 border-b">
                      <span>Tempo Restante:</span>
                      <span className="font-medium text-orange-600">{resultado.anosRestantes} anos</span>
                    </div>
                  ) : (
                    <div className="flex justify-between py-2 border-b">
                      <span>Status:</span>
                      <span className="font-medium text-finance-green">Pode se aposentar!</span>
                    </div>
                  )}
                </div>

                <div className="bg-finance-green/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-lg font-bold">Benefício Estimado:</span>
                    <span className="text-2xl font-bold text-finance-green">
                      {formatarMoeda(resultado.beneficioEstimado)}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">
                    {resultado.percentualBeneficio}% da média dos salários (limitado ao teto do INSS)
                  </p>
                </div>

                <Alert>
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Esta é uma estimativa!</strong> Consulte o INSS para cálculos precisos. 
                    Organize suas finanças com nossa 
                    <Button variant="link" className="p-0 ml-1 text-finance-blue">
                      Planilha de Aposentadoria
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

export default CalculadoraAposentadoria;
