
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculadoras from "./pages/Calculadoras";
import Planilhas from "./pages/Planilhas";
import PlanilhaControleFinanceiro from "./pages/PlanilhaControleFinanceiro";
import PlanilhaViabilidadeNegocios from "./pages/PlanilhaViabilidadeNegocios";
import CalculadoraRescisao from "./pages/CalculadoraRescisao";
import CalculadoraJurosCompostos from "./pages/CalculadoraJurosCompostos";
import CalculadoraHorasExtras from "./pages/CalculadoraHorasExtras";
import CalculadoraSalarioLiquido from "./pages/CalculadoraSalarioLiquido";
import CalculadoraFerias from "./pages/CalculadoraFerias";
import CalculadoraPrecoVenda from "./pages/CalculadoraPrecoVenda";
import CalculadoraFinanciamentoImovel from "./pages/CalculadoraFinanciamentoImovel";
import CalculadoraViverDeRenda from "./pages/CalculadoraViverDeRenda";
import CalculadoraFinanciamentoVeiculo from "./pages/CalculadoraFinanciamentoVeiculo";
import CalculadoraRendaFixa from "./pages/CalculadoraRendaFixa";
import CalculadoraDividendYield from "./pages/CalculadoraDividendYield";
import CalculadoraAposentadoria from "./pages/CalculadoraAposentadoria";
import CalculadoraCustoFuncionario from "./pages/CalculadoraCustoFuncionario";
import CalculadoraPontoEquilibrio from "./pages/CalculadoraPontoEquilibrio";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/calculadoras" element={<Calculadoras />} />
          <Route path="/planilhas" element={<Planilhas />} />
          <Route path="/planilha/controle-financeiro-pessoal" element={<PlanilhaControleFinanceiro />} />
          <Route path="/planilha/viabilidade-negocios" element={<PlanilhaViabilidadeNegocios />} />
          <Route path="/calculadora/rescisao-clt" element={<CalculadoraRescisao />} />
          <Route path="/calculadora/juros-compostos" element={<CalculadoraJurosCompostos />} />
          <Route path="/calculadora/horas-extras" element={<CalculadoraHorasExtras />} />
          <Route path="/calculadora/salario-liquido" element={<CalculadoraSalarioLiquido />} />
          <Route path="/calculadora/ferias" element={<CalculadoraFerias />} />
          <Route path="/calculadora/preco-venda" element={<CalculadoraPrecoVenda />} />
          <Route path="/calculadora/financiamento-imovel" element={<CalculadoraFinanciamentoImovel />} />
          <Route path="/calculadora/viver-de-renda" element={<CalculadoraViverDeRenda />} />
          <Route path="/calculadora/financiamento-veiculo" element={<CalculadoraFinanciamentoVeiculo />} />
          <Route path="/calculadora/renda-fixa" element={<CalculadoraRendaFixa />} />
          <Route path="/calculadora/dividend-yield" element={<CalculadoraDividendYield />} />
          <Route path="/calculadora/aposentadoria" element={<CalculadoraAposentadoria />} />
          <Route path="/calculadora/custo-funcionario" element={<CalculadoraCustoFuncionario />} />
          <Route path="/calculadora/ponto-equilibrio" element={<CalculadoraPontoEquilibrio />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
