import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Home() {
    return (
      <PageContainer
        title="Game Guardian — Guia Completo"
        subtitle="O guia mais completo sobre Game Guardian em Português Brasileiro — do básico ao avançado."
        difficulty="iniciante"
        timeToRead="3 min"
      >
        <AlertBox type="info" title="Bem-vindo ao Guia Game Guardian">
          Este guia cobre tudo sobre o Game Guardian: instalação, tipos de busca, edição de memória, scripts Lua, bypass de anti-cheat e muito mais. Tudo em português, com exemplos práticos.
        </AlertBox>

        <h2>O que você vai encontrar aqui</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { icone: "🔍", titulo: "Busca de Memória", desc: "Aprenda todos os tipos de busca — valor exato, intervalo, XOR para valores encriptados, busca por desconhecido e hexadecimal.", nivel: "Básico → Avançado" },
            { icone: "✏️", titulo: "Edição e Freeze", desc: "Como modificar valores, congelar endereços, trabalhar com ponteiros e navegar por estruturas de dados complexas.", nivel: "Intermediário" },
            { icone: "📜", titulo: "Scripts Lua", desc: "Automatize suas modificações com scripts Lua — desde scripts simples de uma ação até sistemas completos com UI.", nivel: "Avançado" },
            { icone: "🛡️", titulo: "Bypass Anti-Cheat", desc: "Como contornar sistemas de detecção com Magisk, DenyList, PlayIntegrityFix e modo furtivo.", nivel: "Avançado" },
            { icone: "📱", titulo: "Sem Root", desc: "Use o GG via Virtual Space sem precisar de root — com comparação completa de apps compatíveis.", nivel: "Básico" },
            { icone: "🎮", titulo: "Hacks Práticos", desc: "Exemplos passo a passo dos hacks mais comuns: moedas, vida, velocidade, teleporte e timers.", nivel: "Intermediário" },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-2 mb-2">
                <span className="text-2xl">{item.icone}</span>
                <h4 className="font-bold text-foreground text-sm">{item.titulo}</h4>
              </div>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <span className="text-xs text-primary font-medium">{item.nivel}</span>
            </div>
          ))}
        </div>

        <h2>Trilha de aprendizado recomendada</h2>
        <div className="grid grid-cols-1 gap-2 my-6 not-prose">
          {[
            { fase: "Fase 1 — Fundamentos", topicos: ["O que é Game Guardian?", "Instalação e configuração", "Interface do GG", "Permissões e Root"], cor: "border-l-green-500" },
            { fase: "Fase 2 — Busca", topicos: ["Grupos de Valores (tipos de dados)", "Busca Básica de Valores", "Tipos de Busca (incluindo XOR)", "Hacks Populares"], cor: "border-l-blue-500" },
            { fase: "Fase 3 — Edição Avançada", topicos: ["Edição de Memória", "Virtual Space", "Bypass Anti-Cheat", "Troubleshooting"], cor: "border-l-yellow-500" },
            { fase: "Fase 4 — Automação", topicos: ["Scripts Lua básicos", "Scripts Lua avançados", "Virtual Space + Scripts"], cor: "border-l-purple-500" },
          ].map((item) => (
            <div key={item.fase} className={"bg-card border border-border rounded-xl p-4 border-l-4 " + item.cor}>
              <h4 className="font-bold text-foreground mb-2 text-sm">{item.fase}</h4>
              <div className="flex flex-wrap gap-2">
                {item.topicos.map((t, i) => (
                  <span key={i} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{t}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2>Por que aprender Game Guardian?</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { titulo: "Aprenda na prática", desc: "Modificar memória de jogos é uma forma divertida e prática de aprender conceitos de programação, memória RAM, tipos de dados e estruturas de dados." },
            { titulo: "Economize tempo de grind", desc: "Use o GG para pular horas de grind repetitivo em jogos single-player e aproveitar o conteúdo que realmente importa." },
            { titulo: "Desenvolva habilidades técnicas", desc: "Os conceitos aprendidos aqui — ptrace, memória de processo, tipos de dados, ponteiros — são diretamente aplicáveis em desenvolvimento e segurança." },
            { titulo: "Comunidade ativa", desc: "O fórum do GG tem centenas de scripts e guias específicos para jogos. Uma vez entendidos os fundamentos, você pode contribuir e customizar." },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="success" title="Pronto para começar?">
          Se você é completamente novo, comece por <strong>O que é Game Guardian?</strong> no menu lateral. Se já tem experiência básica, vá direto para <strong>Tipos de Busca</strong> para aprender técnicas como busca XOR.
        </AlertBox>
      </PageContainer>
    );
  }
  