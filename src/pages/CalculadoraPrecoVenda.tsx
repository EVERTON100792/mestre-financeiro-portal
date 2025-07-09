
import { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Calculator, TrendingUp, AlertCircle, Printer } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';

const CalculadoraPrecoVenda = () => {
  const [custoProduto, setCustoProduto] = useState('');
  const [margemDesejada, setMargemDesejada] = useState('30');
  const [custoFixo, setCustoFixo] = useState('');
  const [impostos, setImpostos] = useState('8.5');
  const [resultado, setResultado] = useState<any>(null);

  const calcularPrecoVenda = () => {
    const custo = parseFloat(custoProduto.replace(',', '.'));
    const margem = parseFloat(margemDesejada.replace(',', '.'));
    const fixo = parseFloat(custoFixo.replace(',', '.')) || 0;
    const imposto = parseFloat(impostos.replace(',', '.'));

    if (!custo || !margem) {
      alert('Preencha o custo do produto e a margem desejada');
      return;
    }

    // Custo total (produto + custos fixos rateados)
    const custoTotal = custo + fixo;
    
    // Preço com margem
    const precoComMargem = custoTotal * (1 + margem / 100);
    
    // Preço final considerando impostos
    const precoFinal = precoComMargem / (1 - imposto / 100);
    
    // Valores de análise
    const valorMargem = precoComMargem - custoTotal;
    const valorImpostos = precoFinal - precoComMargem;
    const margemReal = ((precoFinal - custoTotal - valorImpostos) / precoFinal) * 100;
    const lucroUnitario = precoFinal - custoTotal - valorImpostos;

    setResultado({
      custoProduto: custo,
      custoFixo: fixo,
      custoTotal,
      margemDesejada: margem,
      valorMargem,
      valorImpostos,
      precoFinal,
      margemReal,
      lucroUnitario
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
            <div className="bg-purple-50 p-3 rounded-lg">
              <TrendingUp className="h-6 w-6 text-purple-600" />
            </div>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
                Calculadora de Preço de Venda
              </h1>
              <p className="text-gray-600 mt-2">
                Calcule o preço ideal considerando custos e margem desejada
              </p>
            </div>
          </div>
          <Badge className="bg-purple-100 text-purple-600">Para MEI e Pequenos Negócios</Badge>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Formulário */}
          <Card className="no-print">
            <CardHeader>
              <CardTitle>Dados do Produto</CardTitle>
              <CardDescription>
                Preencha os custos e margem para calcular o preço
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label htmlFor="custo-produto">Custo do Produto (R$) *</Label>
                <Input
                  id="custo-produto"
                  type="text"
                  placeholder="Ex: 50,00"
                  value={custoProduto}
                  onChange={(e) => setCustoProduto(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="custo-fixo">Custo Fixo Rateado (R$)</Label>
                <Input
                  id="custo-fixo"
                  type="text"
                  placeholder="Ex: 10,00 (aluguel, energia, etc.)"
                  value={custoFixo}
                  onChange={(e) => setCustoFixo(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="margem">Margem de Lucro Desejada (%) *</Label>
                <Input
                  id="margem"
                  type="text"
                  placeholder="Ex: 30"
                  value={margemDesejada}
                  onChange={(e) => setMargemDesejada(e.target.value)}
                />
              </div>

              <div>
                <Label htmlFor="impostos">Impostos (%) - Simples Nacional</Label>
                <Input
                  id="impostos"
                  type="text"
                  placeholder="Ex: 8,5"
                  value={impostos}
                  onChange={(e) => setImpostos(e.target.value)}
                />
              </div>

              <div className="bg-gray-50 p-4 rounded-lg">
                <h4 className="font-medium mb-2">Dica:</h4>
                <p className="text-sm text-gray-600">
                  Para produtos de revenda, considere uma margem entre 20-40%. 
                  Para serviços, margens de 50-100% são comuns.
                </p>
              </div>

              <Button 
                onClick={calcularPrecoVenda} 
                className="w-full bg-finance-blue hover:bg-finance-blue-light"
                size="lg"
              >
                <Calculator className="mr-2 h-5 w-5" />
                Calcular Preço de Venda
              </Button>
            </CardContent>
          </Card>

          {/* Resultado */}
          {resultado && (
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle className="text-finance-green">Resultado do Cálculo</CardTitle>
                  <CardDescription>Preço sugerido para venda</CardDescription>
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
                      <span>Custo do Produto:</span>
                      <span className="font-medium">{formatarMoeda(resultado.custoProduto)}</span>
                    </div>
                    
                    {resultado.custoFixo > 0 && (
                      <div className="flex justify-between py-2 border-b">
                        <span>Custo Fixo Rateado:</span>
                        <span className="font-medium">{formatarMoeda(resultado.custoFixo)}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2 border-b font-semibold">
                      <span>Custo Total:</span>
                      <span>{formatarMoeda(resultado.custoTotal)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b text-finance-green">
                      <span>Margem de Lucro:</span>
                      <span className="font-medium">+{formatarMoeda(resultado.valorMargem)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b text-red-600">
                      <span>Impostos:</span>
                      <span className="font-medium">-{formatarMoeda(resultado.valorImpostos)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Lucro Líquido por Unidade:</span>
                      <span className="font-medium">{formatarMoeda(resultado.lucroUnitario)}</span>
                    </div>
                    
                    <div className="flex justify-between py-2 border-b">
                      <span>Margem Real:</span>
                      <span className="font-medium">{formatarPorcentagem(resultado.margemReal)}</span>
                    </div>
                  </div>

                  <div className="bg-finance-green/10 p-4 rounded-lg mt-4">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-bold">Preço de Venda Sugerido:</span>
                      <span className="text-2xl font-bold text-finance-green">
                        {formatarMoeda(resultado.precoFinal)}
                      </span>
                    </div>
                  </div>
                </div>

                <Alert className="no-print">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Controle seu negócio!</strong> Use nossa 
                    <Button variant="link" className="p-0 ml-1 text-finance-blue">
                      Planilha de Viabilidade para Pequenos Negócios
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
              <CardTitle>Dicas para Precificação</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose max-w-none text-gray-700">
                <h4 className="text-lg font-semibold mb-3">Fatores a Considerar:</h4>
                <ul className="space-y-2">
                  <li>• <strong>Concorrência:</strong> Pesquise preços similares no mercado</li>
                  <li>• <strong>Público-alvo:</strong> Considere o poder de compra dos clientes</li>
                  <li>• <strong>Posicionamento:</strong> Premium, intermediário ou popular</li>
                  <li>• <strong>Sazonalidade:</strong> Ajuste preços conforme demanda</li>
                  <li>• <strong>Volume:</strong> Considere descontos para grandes quantidades</li>
                </ul>
                
                <h4 className="text-lg font-semibold mt-6 mb-3">Margens Típicas por Setor:</h4>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <strong>Produtos:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Alimentação: 20-40%</li>
                      <li>• Roupas: 50-100%</li>
                      <li>• Eletrônicos: 15-30%</li>
                    </ul>
                  </div>
                  <div>
                    <strong>Serviços:</strong>
                    <ul className="ml-4 mt-1 space-y-1">
                      <li>• Consultoria: 60-80%</li>
                      <li>• Manutenção: 40-60%</li>
                      <li>• Estética: 70-90%</li>
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

export default CalculadoraPrecoVenda;
