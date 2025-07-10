import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import PrintLayout from '@/components/PrintLayout';
import PrintTable from '@/components/PrintTable';
import { Button } from '@/components/ui/button';
import { Download, Printer, FileSpreadsheet, ArrowLeft } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { exportToExcel, ExcelData } from '@/utils/excelExport';

const PlanilhaControleFinanceiro = () => {
  const handlePrint = () => {
    window.print();
  };

  const handleDownloadExcel = () => {
    const sheets: ExcelData[] = [
      {
        sheetName: 'Receitas',
        data: receitasExemplo.map(receita => ({
          'Categoria': receita.categoria,
          'Tipo': receita.tipo,
          'Valor': receita.valor
        }))
      },
      {
        sheetName: 'Despesas',
        data: despesasExemplo.map(despesa => ({
          'Categoria': despesa.categoria,
          'Tipo': despesa.tipo,
          'Valor': despesa.valor
        }))
      },
      {
        sheetName: 'Resumo',
        data: [
          { 'Item': 'Total Receitas', 'Valor': totalReceitas },
          { 'Item': 'Total Despesas', 'Valor': totalDespesas },
          { 'Item': 'Saldo Final', 'Valor': saldoFinal }
        ]
      }
    ];

    exportToExcel('Controle_Financeiro_Pessoal', sheets);
  };

  const receitasExemplo = [
    { categoria: 'Salário', valor: 5000, tipo: 'Fixo' },
    { categoria: 'Freelances', valor: 1200, tipo: 'Variável' },
    { categoria: 'Investimentos', valor: 300, tipo: 'Passivo' },
    { categoria: 'Outros', valor: 200, tipo: 'Eventual' }
  ];

  const despesasExemplo = [
    { categoria: 'Moradia', valor: 1800, tipo: 'Fixo' },
    { categoria: 'Alimentação', valor: 800, tipo: 'Variável' },
    { categoria: 'Transporte', valor: 400, tipo: 'Fixo' },
    { categoria: 'Saúde', valor: 300, tipo: 'Fixo' },
    { categoria: 'Educação', valor: 250, tipo: 'Fixo' },
    { categoria: 'Lazer', valor: 400, tipo: 'Variável' },
    { categoria: 'Outros', valor: 200, tipo: 'Variável' }
  ];

  const totalReceitas = receitasExemplo.reduce((acc, item) => acc + item.valor, 0);
  const totalDespesas = despesasExemplo.reduce((acc, item) => acc + item.valor, 0);
  const saldoFinal = totalReceitas - totalDespesas;

  const printData = [
    { label: 'Total de Receitas', value: totalReceitas, highlight: true, category: 'Receitas' },
    ...receitasExemplo.map(item => ({ label: item.categoria, value: item.valor, category: 'Receitas' })),
    { label: 'Total de Despesas', value: totalDespesas, highlight: true, category: 'Despesas' },
    ...despesasExemplo.map(item => ({ label: item.categoria, value: item.valor, category: 'Despesas' })),
    { label: 'Saldo Final', value: saldoFinal, highlight: true, category: 'Resultado' },
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
                <div className="bg-finance-green/10 p-3 rounded-lg">
                  <FileSpreadsheet className="h-8 w-8 text-finance-green" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">Controle Financeiro Pessoal</h1>
                  <p className="text-gray-600">Planilha completa para organizar suas finanças</p>
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

          {/* Resumo Financeiro */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            <div className="bg-green-50 p-6 rounded-lg border border-green-200">
              <h3 className="text-lg font-semibold text-green-800 mb-2">Total Receitas</h3>
              <p className="text-2xl font-bold text-green-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalReceitas)}
              </p>
            </div>
            
            <div className="bg-red-50 p-6 rounded-lg border border-red-200">
              <h3 className="text-lg font-semibold text-red-800 mb-2">Total Despesas</h3>
              <p className="text-2xl font-bold text-red-600">
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(totalDespesas)}
              </p>
            </div>
            
            <div className={`${saldoFinal >= 0 ? 'bg-blue-50 border-blue-200' : 'bg-orange-50 border-orange-200'} p-6 rounded-lg border`}>
              <h3 className={`text-lg font-semibold mb-2 ${saldoFinal >= 0 ? 'text-blue-800' : 'text-orange-800'}`}>
                Saldo Final
              </h3>
              <p className={`text-2xl font-bold ${saldoFinal >= 0 ? 'text-blue-600' : 'text-orange-600'}`}>
                {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(saldoFinal)}
              </p>
            </div>
          </div>

          {/* Tabelas de Receitas e Despesas */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Receitas */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Receitas</h2>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {receitasExemplo.map((receita, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{receita.categoria}</TableCell>
                        <TableCell>{receita.tipo}</TableCell>
                        <TableCell className="text-right text-green-600 font-semibold">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(receita.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>

            {/* Despesas */}
            <div className="bg-white rounded-lg shadow">
              <div className="p-6 border-b">
                <h2 className="text-xl font-bold text-gray-900">Despesas</h2>
              </div>
              <div className="p-6">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Categoria</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead className="text-right">Valor</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {despesasExemplo.map((despesa, index) => (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{despesa.categoria}</TableCell>
                        <TableCell>{despesa.tipo}</TableCell>
                        <TableCell className="text-right text-red-600 font-semibold">
                          {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(despesa.valor)}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>

          {/* Instruções de Uso */}
          <div className="mt-8 bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Como Usar Esta Planilha</h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">1. Registre suas Receitas</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Adicione todas as suas fontes de renda: salário, freelances, investimentos, etc.
                </p>
                
                <h3 className="font-semibold text-gray-800 mb-2">2. Categorize suas Despesas</h3>
                <p className="text-gray-600 text-sm">
                  Organize seus gastos por categorias para melhor controle e análise.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">3. Monitore o Saldo</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Acompanhe mensalmente se suas receitas cobrem todas as despesas.
                </p>
                
                <h3 className="font-semibold text-gray-800 mb-2">4. Planeje o Futuro</h3>
                <p className="text-gray-600 text-sm">
                  Use os dados para criar metas de economia e investimento.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Layout de Impressão */}
      <PrintLayout title="Controle Financeiro Pessoal">
        <PrintTable rows={printData} />
        
        <div className="print-summary">
          <p><strong>Resumo Mensal:</strong></p>
          <p>Este controle financeiro permite organizar receitas e despesas de forma clara e objetiva.</p>
          <p>Saldo {saldoFinal >= 0 ? 'Positivo' : 'Negativo'}: {new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(Math.abs(saldoFinal))}</p>
        </div>
      </PrintLayout>
      
      <div className="no-print">
        <Footer />
      </div>
    </div>
  );
};

export default PlanilhaControleFinanceiro;
