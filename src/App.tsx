import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Ecosystem from "./pages/Ecosystem";
import Gallery from "./pages/Gallery";
import Species from "./pages/Species";
import NaturalBurial from "./pages/NaturalBurial";
import Shop from "./pages/Shop";
import SiteMap from "./pages/SiteMap";
import Contact from "./pages/Contact";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="about" element={<About />} />
            <Route path="ecosystem" element={<Ecosystem />} />
            <Route path="gallery" element={<Gallery />} />
            <Route path="species" element={<Species />} />
            <Route path="burial" element={<NaturalBurial />} />
            <Route path="shop" element={<Shop />} />
            <Route path="map" element={<SiteMap />} />
            <Route path="contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
