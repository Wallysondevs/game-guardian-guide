import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function VirtualSpace() {
    return (
      <PageContainer
        title="Virtual Space — Sem Root"
        subtitle="Use o Game Guardian sem root usando aplicativos de espaço virtual. Guia completo com vantagens, limitações e configuração."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <AlertBox type="info" title="O que é Virtual Space?">
          Um Virtual Space (espaço virtual) é um aplicativo que cria um ambiente Android isolado, onde outros apps rodam como se tivessem permissões elevadas. O GG pode funcionar dentro desse espaço para monitorar e modificar a memória de jogos rodando no mesmo ambiente — sem root real.
        </AlertBox>

        <h2>Como funciona o Virtual Space</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { titulo: "Ambiente isolado", desc: "O Virtual Space cria um contêiner separado com sistema de arquivos próprio, onde apps instalados funcionam como processos do espaço virtual." },
            { titulo: "Permissões elevadas internas", desc: "Dentro do espaço virtual, o GG pode ter permissão para acessar a memória de outros processos sem root real do sistema." },
            { titulo: "Mesma sessão de processo", desc: "O jogo e o GG rodam como subprocessos do mesmo app de Virtual Space, permitindo cross-process memory access." },
            { titulo: "Limitações de kernel", desc: "Sem root real, algumas operações de kernel não são possíveis. Anti-cheats podem detectar o ambiente virtual e recusar rodar." },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Aplicativos de Virtual Space compatíveis</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">App</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Android</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Compatibilidade GG</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Notas</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Virtual Space (oficial)", "5.0 – 12", "⭐⭐⭐⭐⭐", "Integrado ao GG. Opção nativa no próprio app."],
                ["VirtualXposed", "5.0 – 10", "⭐⭐⭐⭐", "Suporta módulos Xposed sem root. Pode ser instável no Android 10+."],
                ["Parallel Space", "4.0 – 11", "⭐⭐⭐", "Popular para contas duplas. Suporte ao GG variável."],
                ["Dual Space Pro", "5.0 – 12", "⭐⭐⭐", "Baseado no Parallel Space. Funciona com alguns jogos."],
                ["Island", "5.0 – 13", "⭐⭐", "Usa Work Profile do Android. Mais limitado para hacks."],
                ["Shelter", "8.0 – 13", "⭐⭐", "Similar ao Island. Bom para privacidade, limitado para GG."],
              ].map(([app, android, compat, notas], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{app}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{android}</td>
                  <td className="px-4 py-2 border border-border text-sm">{compat}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{notas}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Configurando o Virtual Space integrado do GG</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { n: "1", title: "Instale o GG normalmente", desc: "Baixe e instale o APK do GG do site oficial (gameguardian.net). Não precisa de root.", detail: "Habilite 'Fontes desconhecidas' nas configurações de segurança do Android." },
            { n: "2", title: "Selecione Virtual Space na primeira abertura", desc: "Ao abrir o GG, ele pergunta como executar. Selecione 'Virtual Space' (sem root).", detail: "Uma cópia do app Virtual Space será instalada automaticamente." },
            { n: "3", title: "Instale o jogo dentro do Virtual Space", desc: "No GG → Virtual Space → Adicionar Aplicativo → selecione o jogo instalado. O jogo será 'clonado' no ambiente virtual.", detail: "O jogo roda em paralelo com a versão original. Seus dados são separados." },
            { n: "4", title: "Inicie o jogo pelo Virtual Space", desc: "No GG → Virtual Space → toque no ícone do jogo. O jogo abre dentro do espaço virtual com o GG monitorando.", detail: "IMPORTANTE: o jogo deve ser iniciado pelo GG/Virtual Space, não pelo ícone normal na tela inicial." },
            { n: "5", title: "Use o GG normalmente", desc: "Com o jogo aberto pelo Virtual Space, toque no ícone flutuante do GG e faça as buscas normalmente.", detail: "As mesmas técnicas de busca funcionam — pode haver pequenas diferenças de velocidade." },
          ].map((item) => (
            <div key={item.n} className="bg-card border border-border rounded-xl p-5">
              <div className="flex gap-3 items-start">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground/80 mb-1">{item.desc}</p>
                  <p className="text-xs text-muted-foreground italic">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Root vs Virtual Space — comparação</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Aspecto</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Com Root</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Virtual Space (Sem Root)</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Configuração", "Complexa (requer desbloqueio de bootloader)", "Simples — instale e use"],
                ["Compatibilidade de jogos", "Alta — funciona com a maioria", "Média — alguns jogos recusam rodar em VS"],
                ["Velocidade de busca", "Máxima", "Levemente mais lenta"],
                ["Regiões de memória", "Todas disponíveis", "Algumas regiões podem ser limitadas"],
                ["Risco para o dispositivo", "Garante root permanente, void warranty", "Nenhum risco — desinstale a qualquer hora"],
                ["Detecção anti-cheat", "Detectável (root), requer DenyList", "Detectável (processo virtual)"],
                ["Scripts Lua avançados", "Suporte completo", "Alguns recursos avançados indisponíveis"],
              ].map(([aspecto, root, vs], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{aspecto}</td>
                  <td className="px-4 py-2 border border-border text-green-400 text-sm">{root}</td>
                  <td className="px-4 py-2 border border-border text-yellow-400 text-sm">{vs}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <AlertBox type="warning" title="Jogos que bloqueiam Virtual Space">
          Alguns jogos verificam se estão rodando em um ambiente virtual e recusam iniciar ou funcionam de forma limitada. Nesses casos, a única opção é usar root real com DenyList configurado.
        </AlertBox>

        <h2>Problemas comuns com Virtual Space</h2>
        <div className="grid grid-cols-1 gap-3 my-4 not-prose">
          {[
            { prob: "Jogo não aparece na lista do Virtual Space", sol: "O jogo pode estar na lista de incompatíveis. Tente VirtualXposed ou Parallel Space como alternativa." },
            { prob: "GG não encontra processo do jogo", sol: "Abra o jogo pelo Virtual Space (não pelo ícone normal). O processo só é visível ao GG quando iniciado dentro do VS." },
            { prob: "Busca retorna 0 resultados (diferente do root)", sol: "VS pode não ter acesso a todas as regiões de memória. Tente região A em vez de Ca." },
            { prob: "Jogo fecha ao abrir pelo Virtual Space", sol: "Alguns jogos detectam o ambiente virtual. Tente desabilitar a assinatura APK no VS ou use versão mais antiga do jogo." },
          ].map((item) => (
            <div key={item.prob} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-yellow-500">
              <h4 className="font-bold text-foreground mb-1 text-sm">⚠️ {item.prob}</h4>
              <p className="text-xs text-muted-foreground">{item.sol}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  