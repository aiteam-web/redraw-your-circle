import { useState, useCallback } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import IntroScreen from "./pages/IntroScreen";
import CircleScreen from "./pages/CircleScreen";
import ReflectionScreen from "./pages/ReflectionScreen";
import HistoryScreen from "./pages/HistoryScreen";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => {
  const [names, setNames] = useState<Record<string, string>>({});
  const reset = useCallback(() => setNames({}), []);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/intro" element={<IntroScreen />} />
            <Route
              path="/circle"
              element={<CircleScreen names={names} onNamesChange={setNames} />}
            />
            <Route
              path="/reflection"
              element={<ReflectionScreen names={names} onReset={reset} />}
            />
            <Route path="/history" element={<HistoryScreen />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
