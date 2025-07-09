
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Calculadoras from "./pages/Calculadoras";
import CalculadoraRescisao from "./pages/CalculadoraRescisao";
import CalculadoraJurosCompostos from "./pages/CalculadoraJurosCompostos";
import CalculadoraHorasExtras from "./pages/CalculadoraHorasExtras";
import CalculadoraSalarioLiquido from "./pages/CalculadoraSalarioLiquido";
import CalculadoraFerias from "./pages/CalculadoraFerias";
import CalculadoraPrecoVenda from "./pages/CalculadoraPrecoVenda";
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
          <Route path="/calculadora/rescisao-clt" element={<CalculadoraRescisao />} />
          <Route path="/calculadora/juros-compostos" element={<CalculadoraJurosCompostos />} />
          <Route path="/calculadora/horas-extras" element={<CalculadoraHorasExtras />} />
          <Route path="/calculadora/salario-liquido" element={<CalculadoraSalarioLiquido />} />
          <Route path="/calculadora/ferias" element={<CalculadoraFerias />} />
          <Route path="/calculadora/preco-venda" element={<CalculadoraPrecoVenda />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
