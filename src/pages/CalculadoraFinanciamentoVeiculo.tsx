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
import { Calculator, Car, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraFinanciamentoVeiculo = () => {
  const [valorVeiculo, setValorVeiculo] = useState('');
  const [entrada, setEntrada] = useState('');
  const [prazoMeses, setPrazoMeses] = useState('60');
  const [taxaJuros, setTaxaJuros] = useState('1.99');
  const [resultado, setResultado] = useState<any>(null);

  const calcularFinanciamento = () => {
    const valor = parseFloat(valorVeiculo.replace(',', '.'));
    const entradaValor = parseFloat(entrada.replace(',', '.')) || 0;
    const prazo = parseInt(prazoMeses);
    const taxa = parseFloat(taxaJuros.replace(',', '.')) / 100; // taxa mensal

    if (!valor) {
      alert('Preencha o valor do veículo');
      return;
    }

    const valorFinanciado = valor - entradaValor;
    const parcela = (valorFinanciado * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
    const totalPago = parcela * prazo;
    const jurosTotal = totalPago - valorFinanciado;

    setResultado({
      valorVeiculo: valor,
      entrada: entradaValor,
      valorFinanciado,
      parcela,
      totalPago,
      jurosTotal,
      prazoMeses: prazo
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

      {resultado && (
        <PrintLayout title="Simulação de Financiamento de Veículo">
          <PrintTable
            rows={[
              { label: "Valor do Veículo", value: resultado.valorVeiculo },
              { label: "Entrada", value: resultado.entrada, category: "Condições do Financiamento" },
              { label: "Valor Financiado", value: resultado.valorFinanciado },
              { label: "Prazo", value: `${resultado.prazoMeses} meses` },
              { label: "PARCELA MENSAL", value: resultado.parcela, highlight: true, category: "Resultado da Simulação" },
              { label: "Total de Juros", value: resultado.jurosTotal },
              { label: "Total a Pagar", value: resultado.totalPago }
            ]}
          />
          <div className="print-summary">
            <p><strong>Resumo:</strong> Financiamento de {formatarMoeda(resultado.valorVeiculo)} em {resultado.prazoMeses} meses, com parcelas de {formatarMoeda(resultado.parcela)} e total de juros de {formatarMoeda(resultado.jurosTotal)}.</p>
          </div>
        </PrintLayout>
      )}
      
      <div className="bg-white py-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-orange-50 p-3 rounded-lg">
              <Car className="h-6 w-6 text-orange-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Financiamento Veículo
              </h1>
              <p className="text-gray-600 mt-2">
                Simule o financiamento do seu carro ou moto
              </p>
            </div>
          </div>
          <Badge className="bg-orange-100 text-orange-800">Carros e Motos</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 no-print">
        <div className="grid lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Dados do Financiamento</CardTitle>
              <CardDescription>Preencha os dados para simular seu financiamento</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="valor">Valor do Veículo (R$) *</Label>
                <Input
                  id="valor"
                  type="text"
                  placeholder="Ex: 45000,00"
                  value={valorVeiculo}
                  onChange={(e) => setValorVeiculo(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="entrada">Entrada (R$)</Label>
                <Input
                  id="entrada"
                  type="text"
                  placeholder="Ex: 10000,00"
                  value={entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="prazo">Prazo (meses)</Label>
                <Select value={prazoMeses} onValueChange={setPrazoMeses}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="12">12 meses</SelectItem>
                    <SelectItem value="24">24 meses</SelectItem>
                    <SelectItem value="36">36 meses</SelectItem>
                    <SelectItem value="48">48 meses</SelectItem>
                    <SelectItem value="60">60 meses</SelectItem>
                    <SelectItem value="72">72 meses</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="taxa">Taxa de Juros (% ao mês)</Label>
                <Input
                  id="taxa"
                  type="text"
                  placeholder="Ex: 1,99"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(e.target.value)}
                />
              </div>

              <Button 
                onClick={calcularFinanciamento} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Simular Financiamento
              </Button>
            </CardContent>
          </Card>

          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Simulação do Financiamento</CardTitle>
                  <CardDescription>Resultado da sua simulação</CardDescription>
                </div>
                <Button onClick={imprimirPDF} variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>Valor do Veículo:</span>
                    <span className="font-medium">{formatarMoeda(resultado.valorVeiculo)}</span>
                  </div>
                  
                  {resultado.entrada > 0 && (
                    <div className="flex justify-between py-2 border-b">
                      <span>Entrada:</span>
                      <span className="font-medium">{formatarMoeda(resultado.entrada)}</span>
                    </div>
                  )}
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Valor Financiado:</span>
                    <span className="font-medium">{formatarMoeda(resultado.valorFinanciado)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Prazo:</span>
                    <span className="font-medium">{resultado.prazoMeses} meses</span>
                  </div>

                  <div className="flex justify-between py-2 border-b">
                    <span>Total de Juros:</span>
                    <span className="font-medium text-red-600">{formatarMoeda(resultado.jurosTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Total a Pagar:</span>
                    <span className="font-medium">{formatarMoeda(resultado.totalPago)}</span>
                  </div>
                </div>

                <div className="bg-finance-green/10 p-4 rounded-lg">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-bold">Parcela Mensal:</span>
                    <span className="text-2xl font-bold text-finance-green">
                      {formatarMoeda(resultado.parcela)}
                    </span>
                  </div>
                </div>

                <Alert>
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
      </div>

      <Footer />
    </div>
  );
};

export default CalculadoraFinanciamentoVeiculo;
