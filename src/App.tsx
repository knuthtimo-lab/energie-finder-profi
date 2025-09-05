import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import Solar from "./pages/Solar";
import Wind from "./pages/Wind";
import InstallateurFinden from "./pages/InstallateurFinden";
import KostenloseBeratung from "./pages/KostenloseBeratung";
import UnternehmenListen from "./pages/UnternehmenListen";
import Impressum from "./pages/Impressum";
import Datenschutz from "./pages/Datenschutz";
import CookieEinstellungen from "./pages/CookieEinstellungen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/solar" element={<Solar />} />
          <Route path="/wind" element={<Wind />} />
          <Route path="/installateur-finden" element={<InstallateurFinden />} />
          <Route path="/kostenlose-beratung" element={<KostenloseBeratung />} />
          <Route path="/unternehmen-listen" element={<UnternehmenListen />} />
          <Route path="/impressum" element={<Impressum />} />
          <Route path="/datenschutz" element={<Datenschutz />} />
          <Route path="/cookie-einstellungen" element={<CookieEinstellungen />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
