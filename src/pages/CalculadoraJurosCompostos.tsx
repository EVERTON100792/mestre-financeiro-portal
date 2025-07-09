import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const CalculadoraJurosCompostos = () => {
  const [valorInicial, setValorInicial] = useState('10000');
  const [aporteMensal, setAporteMensal] = useState('500');
  const [taxaJuros, setTaxaJuros] = useState('12');
  const [periodo, setPeriodo] = useState('120');
  const [resultado, setResultado] = useState<any>(null);
  const [dadosGrafico, setDadosGrafico] = useState([]);

  const calcularJurosCompostos = () => {
    const principal = parseFloat(valorInicial.replace(',', '.'));
    const aporte = parseFloat(aporteMensal.replace(',', '.'));
    const taxa = parseFloat(taxaJuros.replace(',', '.')) / 100 / 12; // Taxa mensal
    const meses = parseInt(periodo);

    if (!principal || !taxa || !meses) {
      alert('Preencha todos os campos obrigatórios');
      return;
    }

    let saldo = principal;
    let valorInvestido = principal;
    let dadosChart = [];

    // Cálculo mês a mês
    for (let mes = 0; mes <= meses; mes++) {
      if (mes > 0) {
        saldo = saldo * (1 + taxa) + aporte;
        valorInvestido += aporte;
      }

      // Adicionar dados para o gráfico (a cada 6 meses para não ficar muito carregado)
      if (mes % 6 === 0 || mes === meses) {
        dadosChart.push({
          mes: mes,
          saldo: Math.round(saldo),
          investido: Math.round(valorInvestido),
          juros: Math.round(saldo - valorInvestido)
        });
      }
    }

    const valorFinal = saldo;
    const totalInvestido = valorInvestido;
    const rendimento = valorFinal - totalInvestido;
    const percentualGanho = ((rendimento / totalInvestido) * 100);

    setResultado({
      valorFinal,
      totalInvestido,
      rendimento,
      percentualGanho,
      meses
    });

    setDadosGrafico(dadosChart as any);
  };

  const imprimirPDF = () => {
    window.print();
  };

  // Calcular automaticamente quando os valores mudarem
  useEffect(() => {
    calcularJurosCompostos();
  }, [valorInicial, aporteMensal, taxaJuros, periodo]);

  const formatarMoeda = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(valor);
  };

  const formatarPorcentagem = (valor: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'percent',
      minimumFractionDigits: 1,
      maximumFractionDigits: 1
    }).format(valor / 100);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation />
      
      {/* Header */}
      <div className="bg-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-finance-blue" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Juros Compostos
              </h1>
              <p className="text-gray-600 mt-2">
                Simule o crescimento dos seus investimentos ao longo do tempo
              </p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-finance-blue">Com gráficos interativos</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Formulário */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados do Investimento</CardTitle>
              <CardDescription>
                Configure sua simulação de investimento
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="valor-inicial">Valor Inicial (R$)</Label>
                <Input
                  id="valor-inicial"
                  type="text"
                  placeholder="10.000,00"
                  value={valorInicial}
                  onChange={(e) => setValorInicial(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="aporte-mensal">Aporte Mensal (R$)</Label>
                <Input
                  id="aporte-mensal"
                  type="text"
                  placeholder="500,00"
                  value={aporteMensal}
                  onChange={(e) => setAporteMensal(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="taxa-juros">Taxa de Juros Anual (%)</Label>
                <Input
                  id="taxa-juros"
                  type="text"
                  placeholder="12,00"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="periodo">Período (meses)</Label>
                <Input
                  id="periodo"
                  type="number"
                  placeholder="120"
                  min="1"
                  max="600"
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value)}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Exemplos de Taxa:</h4>
                <div className="text-sm space-y-1 text-gray-600">
                  <div>• Poupança: ~3% ao ano</div>
                  <div>• CDB/LCI: 8-13% ao ano</div>
                  <div>• Tesouro Selic: ~12% ao ano</div>
                  <div>• Ações (histórico): ~15% ao ano</div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Resultado */}
          {resultado && (
            <div className="lg:col-span-2 space-y-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                  <div>
                    <CardTitle className="text-finance-green">Resultado da Simulação</CardTitle>
                    <CardDescription>
                      Valores após {Math.round(resultado.meses / 12)} anos e {resultado.meses % 12} meses
                    </CardDescription>
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
                <CardContent>
                  <div className="print-section">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <div className="bg-blue-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Total Investido</div>
                          <div className="text-2xl font-bold text-finance-blue">
                            {formatarMoeda(resultado.totalInvestido)}
                          </div>
                        </div>
                        
                        <div className="bg-green-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Rendimento</div>
                          <div className="text-2xl font-bold text-finance-green">
                            {formatarMoeda(resultado.rendimento)}
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4">
                        <div className="bg-finance-green/10 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Valor Final</div>
                          <div className="text-3xl font-bold text-finance-green">
                            {formatarMoeda(resultado.valorFinal)}
                          </div>
                        </div>
                        
                        <div className="bg-purple-50 p-4 rounded-lg">
                          <div className="text-sm text-gray-600">Ganho Total</div>
                          <div className="text-2xl font-bold text-purple-600">
                            {formatarPorcentagem(resultado.percentualGanho)}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Gráfico */}
              <Card className="no-print">
                <CardHeader>
                  <CardTitle>Evolução do Investimento</CardTitle>
                  <CardDescription>
                    Acompanhe o crescimento do seu patrimônio ao longo do tempo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-80">
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={dadosGrafico}>
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis 
                          dataKey="mes" 
                          label={{ value: 'Meses', position: 'insideBottom', offset: -10 }}
                        />
                        <YAxis 
                          tickFormatter={(value) => `R$ ${(value / 1000).toFixed(0)}k`}
                        />
                        <Tooltip 
                          formatter={(value, name) => [
                            formatarMoeda(value as number), 
                            name === 'saldo' ? 'Saldo Total' : 
                            name === 'investido' ? 'Total Investido' : 'Rendimento'
                          ]}
                          labelFormatter={(label) => `Mês ${label}`}
                        />
                        <Line 
                          type="monotone" 
                          dataKey="investido" 
                          stroke="#3B82F6" 
                          strokeWidth={2}
                          name="investido"
                        />
                        <Line 
                          type="monotone" 
                          dataKey="saldo" 
                          stroke="#10B981" 
                          strokeWidth={3}
                          name="saldo"
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              {/* CTA para planilha */}
              <Alert className="no-print">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  <strong>Quer organizar seus investimentos?</strong> Use nossa 
                  <Button variant="link" className="p-0 ml-1 text-finance-blue">
                    Planilha de Comparação de Investimentos Gratuita
                  </Button>
                  {' '}para acompanhar todos os seus ativos em um só lugar.
                </AlertDescription>
              </Alert>
            </div>
          )}
        </div>

        {/* Informações educativas */}
        <div className="mt-12 no-print">
          <Card>
            <CardHeader>
              <CardTitle>Entenda os Juros Compostos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700">
                <h4 className="text-lg font-semibold mb-3">O que são Juros Compostos?</h4>
                <p className="mb-4">
                  Os juros compostos são os "juros sobre juros". A cada período, os rendimentos 
                  são somados ao capital inicial e passam a render também. Essa é a base do 
                  crescimento exponencial dos investimentos.
                </p>
                
                <h4 className="text-lg font-semibold mb-3">Dicas Importantes:</h4>
                <ul className="space-y-2">
                  <li>• <strong>Tempo é seu aliado:</strong> Quanto mais tempo, maior o efeito dos juros compostos</li>
                  <li>• <strong>Consistência:</strong> Aportes mensais regulares potencializam os resultados</li>
                  <li>• <strong>Reinvestimento:</strong> Sempre reinvista os rendimentos para maximizar os ganhos</li>
                  <li>• <strong>Disciplina:</strong> Evite saques desnecessários que quebram o ciclo de crescimento</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Onde Investir:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <strong>Renda Fixa (Conservador):</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Tesouro Direto</li>
                      <li>• CDB/LCI/LCA</li>
                      <li>• Fundos DI</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Renda Variável (Moderado/Arrojado):</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Ações</li>
                      <li>• FIIs</li>
                      <li>• ETFs</li>
                    </ul>
                  </div>
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

export default CalculadoraJurosCompostos;
