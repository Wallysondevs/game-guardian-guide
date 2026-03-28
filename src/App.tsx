import { useState, useEffect } from "react";
import { Switch, Route, Router as WouterRouter } from "wouter";
import { useHashLocation } from "wouter/use-hash-location";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { Sidebar } from "@/components/layout/Sidebar";
import { Header } from "@/components/layout/Header";

import Home from "@/pages/Home";
import OQueE from "@/pages/OQueE";
import Instalacao from "@/pages/Instalacao";
import Permissoes from "@/pages/Permissoes";
import Interface from "@/pages/Interface";
import BuscaBasica from "@/pages/BuscaBasica";
import TiposDeBusca from "@/pages/TiposDeBusca";
import EdicaoDeMemoria from "@/pages/EdicaoDeMemoria";
import GruposDeValores from "@/pages/GruposDeValores";
import ScriptsLua from "@/pages/ScriptsLua";
import ScriptsAvancados from "@/pages/ScriptsAvancados";
import HacksPopulares from "@/pages/HacksPopulares";
import VirtualSpace from "@/pages/VirtualSpace";
import BypassAntiCheat from "@/pages/BypassAntiCheat";
import UsoSeguro from "@/pages/UsoSeguro";
import Troubleshooting from "@/pages/Troubleshooting";
import Etica from "@/pages/Etica";
import Referencias from "@/pages/Referencias";
import NotFound from "@/pages/not-found";

const queryClient = new QueryClient();

function Layout({ children }: { children: React.ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const [location] = useHashLocation();
  useEffect(() => {
    setIsSidebarOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <div className="min-h-screen bg-background text-foreground flex">
      <Sidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
      <div className="flex-1 lg:pl-72 flex flex-col min-w-0 transition-all duration-300">
        <Header onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1">
          {children}
        </main>
      </div>
    </div>
  );
}

function Router() {
  return (
    <Layout>
      <Switch>
        <Route path="/" component={Home} />
        <Route path="/o-que-e" component={OQueE} />
        <Route path="/instalacao" component={Instalacao} />
        <Route path="/permissoes" component={Permissoes} />
        <Route path="/interface" component={Interface} />
        <Route path="/busca-basica" component={BuscaBasica} />
        <Route path="/tipos-de-busca" component={TiposDeBusca} />
        <Route path="/edicao-de-memoria" component={EdicaoDeMemoria} />
        <Route path="/grupos-de-valores" component={GruposDeValores} />
        <Route path="/scripts-lua" component={ScriptsLua} />
        <Route path="/scripts-avancados" component={ScriptsAvancados} />
        <Route path="/hacks-populares" component={HacksPopulares} />
        <Route path="/virtual-space" component={VirtualSpace} />
        <Route path="/bypass-anti-cheat" component={BypassAntiCheat} />
        <Route path="/uso-seguro" component={UsoSeguro} />
        <Route path="/troubleshooting" component={Troubleshooting} />
        <Route path="/etica" component={Etica} />
        <Route path="/referencias" component={Referencias} />
        <Route component={NotFound} />
      </Switch>
    </Layout>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <WouterRouter hook={useHashLocation}>
        <Router />
      </WouterRouter>
    </QueryClientProvider>
  );
}

export default App;
