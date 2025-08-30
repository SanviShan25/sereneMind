// src/App.tsx
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { HashRouter as Router, Routes, Route } from "react-router-dom"; // ⬅️ switched to HashRouter
import { Navbar } from "@/components/Navbar";
import Index from "./pages/Index";
import Chatbot from "./pages/Chatbot";
import Emergency from "./pages/Emergency";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      {/* ⬇️ HashRouter to support URLs like /#/intake (matches your screenshots) */}
      <Router>
        <div className="min-h-screen bg-background">
          <Navbar />
          <Routes>
            {/* Home / Landing */}
            <Route path="/" element={<Index />} />

            {/* Intake (if your Intake form is a separate route or section anchor) */}
            <Route path="/intake" element={<Index />} />

            {/* Chatbot screen (navigate('/chatbot') after submit) */}
            <Route path="/chatbot" element={<Chatbot />} />

            {/* Emergency contacts */}
            <Route path="/emergency" element={<Emergency />} />

            {/* 404 */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </Router>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;