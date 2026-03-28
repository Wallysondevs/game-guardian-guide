import { Link } from "wouter";
import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { Gamepad2, Search, Code, Shield, Zap, BookOpen } from "lucide-react";

export default function Home() {
  const topics = [
    { icon: Gamepad2, title: "O que é Game Guardian?", desc: "Entenda o que é essa ferramenta de modificação de memória Android e como ela funciona.", href: "/o-que-e" },
    { icon: Search, title: "Busca de Valores", desc: "Aprenda a encontrar e modificar valores na memória RAM de qualquer jogo Android.", href: "/busca-basica" },
    { icon: Code, title: "Scripts Lua", desc: "Automatize suas modificações com scripts poderosos escritos em Lua.", href: "/scripts-lua" },
    { icon: Shield, title: "Uso Seguro", desc: "Técnicas de proteção anti-ban e como usar o GG com segurança.", href: "/uso-seguro" },
    { icon: Zap, title: "Hacks Populares", desc: "Exemplos práticos de modificações em jogos populares como Free Fire e PUBG.", href: "/hacks-populares" },
    { icon: BookOpen, title: "Scripts Avançados", desc: "Lua avançado: loops, ponteiros, dump de memória e muito mais.", href: "/scripts-avancados" },
  ];

  return (
    <PageContainer
      title="Game Guardian"
      subtitle="Guia Completo de Modificação de Memória Android em Português Brasileiro — do básico ao avançado."
    >
      <AlertBox type="warning" title="Aviso importante">
        Este guia é para fins educacionais. O uso de Game Guardian em jogos online pode violar os termos de serviço e resultar em banimentos. Use com responsabilidade.
      </AlertBox>

      <h2>O que você vai aprender</h2>
      <p>
        O Game Guardian é uma das ferramentas de modificação de memória mais poderosas para Android. Com ele, você pode alterar valores de jogos em tempo real — vida, moeda, velocidade, dano — e automatizar tudo isso via scripts Lua.
      </p>
      <p>
        Este guia cobre desde a instalação básica até scripting avançado, bypass de anti-cheat e uso seguro, tudo explicado em detalhes com exemplos práticos.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
        {topics.map((item, i) => {
          const Icon = item.icon;
          return (
            <Link key={i} href={item.href}>
              <div className="group bg-card border border-border rounded-xl p-5 hover:border-primary/50 hover:bg-primary/5 transition-all duration-200 cursor-pointer h-full">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 group-hover:bg-primary/20 transition-colors">
                    <Icon className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-bold text-foreground text-base mb-1">{item.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <h2>Por que usar Game Guardian?</h2>
      <p>
        O GG é utilizado por milhões de usuários ao redor do mundo para:
      </p>
      <ul>
        <li><strong>Testes e desenvolvimento</strong> — desenvolvedores usam para testar seus jogos</li>
        <li><strong>Jogos offline</strong> — modificar experiência em jogos single-player</li>
        <li><strong>Aprendizado de programação</strong> — os scripts Lua são uma excelente introdução</li>
        <li><strong>Análise de memória</strong> — entender como jogos armazenam dados</li>
      </ul>

      <h2>Pré-requisitos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 not-prose">
        {[
          { label: "Android Root", desc: "Magisk ou KernelSU para acesso root completo" },
          { label: "Virtual Space", desc: "VirtualXposed ou VMOS para usar sem root" },
          { label: "Game Guardian APK", desc: "Baixado do site oficial gameguardian.net" },
        ].map((item, i) => (
          <div key={i} className="bg-muted/50 border border-border rounded-xl p-4 text-center">
            <span className="text-2xl font-bold text-primary block mb-1">{i + 1}</span>
            <span className="font-semibold text-foreground text-sm block mb-1">{item.label}</span>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>
    </PageContainer>
  );
}
