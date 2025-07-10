import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrintLayout from '@/components/PrintLayout';
import PrintTable from '@/components/PrintTable';
import { Button } from '@/components/ui/button';
import { Download, Printer, Briefcase, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { exportToExcel, ExcelData } from '@/utils/excelExport';

const PlanilhaViabilidadeNegocios = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadExcel = () => {
    const sheets: ExcelData[] = [
      {
        sheetName: 'Custos Fixos',
        data: custosFixos.map(custo => ({
          'Item': custo.item,
          'Valor Mensal': custo.valor
        }))
      },
      {
        sheetName: 'Custos Variáveis',
        data: custosVariaveis.map(custo => ({
          'Item': custo.item,
          'Percentual sobre Vendas': `${custo.percentual}%`
        }))
      },
      {
        sheetName: 'Análise de Viabilidade',
        data: [
          { 'Indicador': 'Investimento Inicial', 'Valor': investimentoInicial },
          { 'Indicador': 'Total Custos Fixos', 'Valor': totalCustosFixos },
          { 'Indicador': 'Custos Variáveis (%)', 'Valor': `${totalCustosVariaveisPerc}%` },
          { 'Indicador': 'Ponto de Equilíbrio (un)', 'Valor': pontoEquilibrio },
          { 'Indicador': 'Receita Ponto Equilíbrio', 'Valor': receitaPontoEquilibrio },
          { 'Indicador': 'Vendas Projetadas (un)', 'Valor': vendasProjetadas },
          { 'Indicador': 'Receita Projetada', 'Valor': receitaProjetada },
          { 'Indicador': 'Lucro Líquido Mensal', 'Valor': lucroLiquido },
          { 'Indicador': 'Margem de Lucro (%)', 'Valor': `${margemLucro.toFixed(1)}%` },
          { 'Indicador': 'Payback (meses)', 'Valor': `${payback.toFixed(1)}` }
        ]
      }
    ];

    exportToExcel('Viabilidade_de_Negocios', sheets);
  };

  const investimentoInicial = 50000;
  const custosFixos = [
    { item: 'Aluguel', valor: 2500 },
    { item: 'Salários', valor: 8000 },
    { item: 'Energia/Água', valor: 500 },
    { item: 'Internet/Telefone', valor: 300 },
    { item: 'Seguros', valor: 400 },
    { item: 'Contabilidade', valor: 600 }
  ];

  const custosVariaveis = [
    { item: 'Matéria-prima', percentual: 35 },
    { item: 'Comissões', percentual: 5 },
    { item: 'Impostos sobre vendas', percentual: 8 },
    { item: 'Frete/Entrega', percentual: 3 }
  ];

  const totalCustosFixos = custosFixos.reduce((acc, item) => acc + item.valor, 0);
  const totalCustosVariaveisPerc = custosVariaveis.reduce((acc, item) => acc + item.percentual, 0);
  
  const precoVendaUnitario = 50;
  const pontoEquilibrio = Math.ceil(totalCustosFixos / (precoVendaUnitario * (1 - totalCustosVariaveisPerc / 100)));
  const receitaPontoEquilibrio = pontoEquilibrio * precoVendaUnitario;
  
  const vendasProjetadas = 1500;
  const receitaProjetada = vendasProjetadas * precoVendaUnitario;
  const custosVariaveisTotais = receitaProjetada * (totalCustosVariaveisPerc / 100);
  const lucroLiquido = receitaProjetada - totalCustosFixos - custosVariaveisTotais;
  const margemLucro = (lucroLiquido / receitaProjetada) * 100;
  const payback = investimentoInicial / (lucroLiquido / 12);

  const printData = [
    { label: 'Investimento Inicial', value: investimentoInicial, highlight: true, category: 'Investimento' },
    { label: 'Total Custos Fixos Mensais', value: totalCustosFixos, highlight: true, category: 'Custos Fixos' },
    ...custosFixos.map(item => ({ label: item.item, value: item.valor, category: 'Custos Fixos' })),
    { label: 'Custos Variáveis (%)', value: `${totalCustosVariaveisPerc}%`, category: 'Custos Variáveis' },
    { label: 'Ponto de Equilíbrio (unidades)', value: `${pontoEquilibrio} un`, highlight: true, category: 'Análise' },
    { label: 'Receita Ponto Equilíbrio', value: receitaPontoEquilibrio, highlight: true, category: 'Análise' },
    { label: 'Vendas Projetadas (unidades)', value: `${vendasProjetadas} un`, category: 'Projeção' },
    { label: 'Receita Projetada', value: receitaProjetada, category: 'Projeção' },
    { label: 'Lucro Líquido Mensal', value: lucroLiquido, highlight: true, category: 'Resultado' },
    { label: 'Margem de Lucro', value: `${margemLucro.toFixed(1)}%`, highlight: true, category: 'Resultado' },
    { label: 'Payback (meses)', value: `${payback.toFixed(1)} meses`, highlight: true, category: 'Resultado' }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="no-print">
        <Navigation />
        
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-6">
            <Button variant="outline" asChild className="mb-4">
              <Link to="/planilhas">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Voltar para Planilhas
              </Link>
            </Button>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="bg-finance-blue/10 p-3 rounded-lg">
                  <Briefcase className="h-8 w-8 text-finance-blue" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Viabilidade de Negócios</h1>
                  <p className="text-gray-600">Análise completa de viabilidade empresarial</p>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <Button onClick={handlePrint} className="bg-finance-blue hover:bg-finance-blue-light">
                  <Printer className="mr-2 h-4 w-4" />
                  Imprimir PDF
                </Button>
                <Button onClick={handleDownloadExcel} className="bg-finance-green hover:bg-finance-green-light">
                  <Download className="mr-2 h-4 w-4" />
                  Baixar Excel
                </Button>
              </div>
            </div>
          </div>

          {/* Indicadores Principais */}
          <div className="grid md:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">Ponto de Equilíbrio</h3>
              <p className="text-xl font-bold text-blue-600">{pontoEquilibrio} un/mês</p>
            </div>
            
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-sm font-semibold text-green-800 mb-2">Lucro Mensal</h3>
              <p className="text-xl font-bold text-green-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lucroLiquido)}
              </p>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border border-purple-200">
              <h3 className="text-sm font-semibold text-purple-800 mb-2">Margem de Lucro</h3>
              <p className="text-xl font-bold text-purple-600">{margemLucro.toFixed(1)}%</p>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg border border-orange-200">
              <h3 className="text-sm font-semibold text-orange-800 mb-2">Payback</h3>
              <p className="text-xl font-bold text-orange-600">{payback.toFixed(1)} meses</p>
            </div>
          </div>

          {/* Tabelas de Análise */}
          <div className="grid md:grid-cols-2 gap-8 mb-8">
            {/* Custos Fixos */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Custos Fixos Mensais</h2>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {custosFixos.map((custo, index) => (
                      <TableRow key={index}>
                        <TableCell>{custo.item}</TableCell>
                        <TableCell className="text-right font-semibold">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(custo.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold text-red-600">
                        {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCustosFixos)}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Custos Variáveis */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Custos Variáveis</h2>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Item</TableHead>
                      <TableHead className="text-right">% sobre Vendas</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {custosVariaveis.map((custo, index) => (
                      <TableRow key={index}>
                        <TableCell>{custo.item}</TableCell>
                        <TableCell className="text-right font-semibold">{custo.percentual}%</TableCell>
                      </TableRow>
                    ))}
                    <TableRow className="border-t-2">
                      <TableCell className="font-bold">Total</TableCell>
                      <TableCell className="text-right font-bold text-orange-600">{totalCustosVariaveisPerc}%</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Projeção Financeira */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Projeção Financeira Mensal</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Receitas</h3>
                <p className="text-2xl font-bold text-green-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receitaProjetada)}
                </p>
                <p className="text-sm text-gray-600">{vendasProjetadas} unidades × R$ {precoVendaUnitario}</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Custos Totais</h3>
                <p className="text-2xl font-bold text-red-600">
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalCustosFixos + custosVariaveisTotais)}
                </p>
                <p className="text-sm text-gray-600">Fixos + Variáveis</p>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Lucro Líquido</h3>
                <p className={`text-2xl font-bold ${lucroLiquido >= 0 ? 'text-blue-600' : 'text-red-600'}`}>
                  {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(lucroLiquido)}
                </p>
                <p className="text-sm text-gray-600">Margem: {margemLucro.toFixed(1)}%</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout de Impressão */}
      <PrintLayout title="Análise de Viabilidade de Negócios">
        <PrintTable rows={printData} />
        
        <div className="print-summary">
          <p><strong>Conclusão da Análise:</strong></p>
          <p>Negócio {lucroLiquido >= 0 ? 'VIÁVEL' : 'INVIÁVEL'} com as premissas atuais.</p>
          <p>Ponto de equilíbrio: {pontoEquilibrio} unidades/mês</p>
          <p>Retorno do investimento em {payback.toFixed(1)} meses.</p>
        </div>
      </PrintLayout>
      
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
};

export default PlanilhaViabilidadeNegocios;
