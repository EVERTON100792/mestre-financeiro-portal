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
import { Calculator, Home, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraFinanciamentoImovel = () => {
  const [valorImovel, setValorImovel] = useState('');
  const [entrada, setEntrada] = useState('');
  const [prazoAnos, setPrazoAnos] = useState('30');
  const [taxaJuros, setTaxaJuros] = useState('10.5');
  const [sistema, setSistema] = useState('price');
  const [resultado, setResultado] = useState<any>(null);

  const calcularFinanciamento = () => {
    const valor = parseFloat(valorImovel.replace(',', '.'));
    const entradaValor = parseFloat(entrada.replace(',', '.')) || 0;
    const prazo = parseInt(prazoAnos) * 12; // em meses
    const taxa = parseFloat(taxaJuros.replace(',', '.')) / 100 / 12; // taxa mensal

    if (!valor) {
      alert('Preencha o valor do imóvel');
      return;
    }

    const valorFinanciado = valor - entradaValor;

    if (sistema === 'price') {
      // Sistema PRICE
      const parcela = (valorFinanciado * taxa * Math.pow(1 + taxa, prazo)) / (Math.pow(1 + taxa, prazo) - 1);
      const totalPago = parcela * prazo;
      const jurosTotal = totalPago - valorFinanciado;

      setResultado({
        valorImovel: valor,
        entrada: entradaValor,
        valorFinanciado,
        parcela,
        totalPago,
        jurosTotal,
        sistema: 'PRICE',
        prazoMeses: prazo
      });
    } else {
      // Sistema SAC
      const amortizacao = valorFinanciado / prazo;
      const primeiraParcela = amortizacao + (valorFinanciado * taxa);
      const ultimaParcela = amortizacao + (amortizacao * taxa);
      const totalPago = (valorFinanciado * taxa * (prazo + 1)) / 2 + valorFinanciado;
      const jurosTotal = totalPago - valorFinanciado;

      setResultado({
        valorImovel: valor,
        entrada: entradaValor,
        valorFinanciado,
        primeiraParcela,
        ultimaParcela,
        totalPago,
        jurosTotal,
        sistema: 'SAC',
        prazoMeses: prazo
      });
    }
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
        <PrintLayout title={`Simulação Financiamento Imobiliário - Sistema ${resultado.sistema}`}>
          <PrintTable
            rows={[
              { label: "Valor do Imóvel", value: resultado.valorImovel },
              { label: "Entrada", value: resultado.entrada, category: "Condições do Financiamento" },
              { label: "Valor Financiado", value: resultado.valorFinanciado },
              { label: "Sistema", value: resultado.sistema },
              { label: "Prazo", value: `${Math.floor(resultado.prazoMeses/12)} anos (${resultado.prazoMeses} meses)` },
              ...(resultado.sistema === 'PRICE' 
                ? [{ label: "PARCELA FIXA", value: resultado.parcela, highlight: true, category: "Resultado da Simulação" }]
                : [
                    { label: "PRIMEIRA PARCELA", value: resultado.primeiraParcela, highlight: true, category: "Resultado da Simulação" },
                    { label: "ÚLTIMA PARCELA", value: resultado.ultimaParcela, highlight: true }
                  ]
              ),
              { label: "Total de Juros", value: resultado.jurosTotal },
              { label: "Total a Pagar", value: resultado.totalPago }
            ]}
          />
          <div className="print-summary">
            <p><strong>Resumo:</strong> Financiamento imobiliário de {formatarMoeda(resultado.valorImovel)} pelo sistema {resultado.sistema}, com total de juros de {formatarMoeda(resultado.jurosTotal)} ao longo de {Math.floor(resultado.prazoMeses/12)} anos.</p>
          </div>
        </PrintLayout>
      )}
      
      <div className="bg-white py-12 no-print">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-3 mb-4">
            <div className="bg-blue-50 p-3 rounded-lg">
              <Home className="h-6 w-6 text-finance-blue" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Financiamento Imobiliário
              </h1>
              <p className="text-gray-600 mt-2">
                Simule financiamentos SAC e Price, compare parcelas e juros
              </p>
            </div>
          </div>
          <Badge className="bg-blue-100 text-finance-blue">Sistemas SAC e PRICE</Badge>
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
                <Label htmlFor="valor-imovel">Valor do Imóvel (R$) *</Label>
                <Input
                  id="valor-imovel"
                  type="text"
                  placeholder="Ex: 350000,00"
                  value={valorImovel}
                  onChange={(e) => setValorImovel(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="entrada">Entrada (R$)</Label>
                <Input
                  id="entrada"
                  type="text"
                  placeholder="Ex: 70000,00"
                  value={entrada}
                  onChange={(e) => setEntrada(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="prazo">Prazo (anos)</Label>
                <Select value={prazoAnos} onValueChange={setPrazoAnos}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="10">10 anos</SelectItem>
                    <SelectItem value="15">15 anos</SelectItem>
                    <SelectItem value="20">20 anos</SelectItem>
                    <SelectItem value="25">25 anos</SelectItem>
                    <SelectItem value="30">30 anos</SelectItem>
                    <SelectItem value="35">35 anos</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="taxa">Taxa de Juros (% ao ano)</Label>
                <Input
                  id="taxa"
                  type="text"
                  placeholder="Ex: 10,5"
                  value={taxaJuros}
                  onChange={(e) => setTaxaJuros(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="sistema">Sistema de Amortização</Label>
                <Select value={sistema} onValueChange={setSistema}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="price">PRICE (parcelas fixas)</SelectItem>
                    <SelectItem value="sac">SAC (parcelas decrescentes)</SelectItem>
                  </SelectContent>
                </Select>
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
                  <CardTitle className="text-finance-green">Simulação - Sistema {resultado.sistema}</CardTitle>
                  <CardDescription>Resultado do seu financiamento</CardDescription>
                </div>
                <Button onClick={imprimirPDF} variant="outline">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </Button>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between py-2 border-b">
                    <span>Valor do Imóvel:</span>
                    <span className="font-medium">{formatarMoeda(resultado.valorImovel)}</span>
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

                  {resultado.sistema === 'PRICE' ? (
                    <div className="flex justify-between py-2 border-b">
                      <span>Parcela Fixa:</span>
                      <span className="font-medium text-finance-blue">{formatarMoeda(resultado.parcela)}</span>
                    </div>
                  ) : (
                    <>
                      <div className="flex justify-between py-2 border-b">
                        <span>Primeira Parcela:</span>
                        <span className="font-medium text-finance-blue">{formatarMoeda(resultado.primeiraParcela)}</span>
                      </div>
                      <div className="flex justify-between py-2 border-b">
                        <span>Última Parcela:</span>
                        <span className="font-medium text-finance-blue">{formatarMoeda(resultado.ultimaParcela)}</span>
                      </div>
                    </>
                  )}

                  <div className="flex justify-between py-2 border-b">
                    <span>Total de Juros:</span>
                    <span className="font-medium text-red-600">{formatarMoeda(resultado.jurosTotal)}</span>
                  </div>
                  
                  <div className="flex justify-between py-2 border-b">
                    <span>Total a Pagar:</span>
                    <span className="font-medium">{formatarMoeda(resultado.totalPago)}</span>
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

export default CalculadoraFinanciamentoImovel;
