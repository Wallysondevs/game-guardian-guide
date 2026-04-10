import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function UsoSeguro() {
    return (
      <PageContainer
        title="Uso Seguro"
        subtitle="Como usar o Game Guardian minimizando riscos de ban, detecção e problemas de segurança."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <AlertBox type="warning" title="Nenhum método é 100% indetectável">
          Jogos online competitivos investem pesado em anti-cheat. Este guia reduz significativamente o risco, mas não elimina. A única garantia absoluta é usar o GG apenas em jogos offline.
        </AlertBox>

        <h2>Conta de testes — regra de ouro</h2>
        <p>Nunca use o GG na sua conta principal de jogos online. Crie uma conta separada exclusivamente para testes.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { titulo: "Por que conta separada?", pontos: ["Ban perde todos os itens comprados com dinheiro real", "Hardware ban pode banir o dispositivo, não só a conta", "Conta de teste pode ser sacrificada sem perda real"] },
            { titulo: "Como criar conta de teste", pontos: ["Crie novo e-mail só para isso", "Não vincule ao Google Play principal", "Use VirtualSpace para isolamento completo"] },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
              <ul className="space-y-1">
                {item.pontos.map((p, i) => <li key={i} className="text-xs text-foreground/80">• {p}</li>)}
              </ul>
            </div>
          ))}
        </div>

        <h2>Configurações anti-detecção no GG</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { titulo: "Modo Furtivo", onde: "GG → Configurações → Modo Furtivo", efeito: "Reduz a assinatura do processo do GG. O anti-cheat não vê o nome do processo facilmente.", nivel: "Básico" },
            { titulo: "Ocultar ícone flutuante", onde: "GG → Configurações → Ícone → Nenhum", efeito: "Remove o overlay visível. Apps que detectam overlays não verão o GG.", nivel: "Básico" },
            { titulo: "DenyList no Magisk", onde: "Magisk → DenyList → adicionar o jogo", efeito: "O jogo não vê que o dispositivo tem root.", nivel: "Importante" },
            { titulo: "PlayIntegrityFix + Shamiko", onde: "Magisk → Módulos → instalar ambos", efeito: "Passa nas verificações de Play Integrity API.", nivel: "Avançado" },
            { titulo: "Use scripts Lua em vez de UI", onde: "GG → Scripts → execute .lua", efeito: "Menor footprint de detecção — sem interação com UI monitorada.", nivel: "Avançado" },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-start justify-between mb-2">
                <h4 className="font-bold text-foreground text-sm">{item.titulo}</h4>
                <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{item.nivel}</span>
              </div>
              <code className="text-xs text-primary block mb-1">{item.onde}</code>
              <p className="text-xs text-muted-foreground">{item.efeito}</p>
            </div>
          ))}
        </div>

        <h2>Comportamentos que geram ban</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Comportamento</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Motivo</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Alternativa</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Modificar para 999.999.999 de ouro", "Valor impossível pelo nível do jogador", "Use valor apenas acima do possível legítimo"],
                ["HP fixo sempre em 100.0 (freeze)", "Padrão impossível — dano sempre zero", "Congele em valor alto mas não no máximo exato"],
                ["Velocidade 10x maior", "Coordenadas impossíveis — detecção de teleporte", "Use apenas 1.5x ou 2x o normal"],
                ["Usar GG sem DenyList ativo", "GG visível como processo com acesso root", "Configure DenyList antes de abrir o jogo"],
                ["Jogar ranked com valores modificados", "Estatísticas impossíveis nos logs do servidor", "Nunca use em modos competitivos"],
              ].map(([comp, motivo, alt], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border text-destructive text-sm">{comp}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{motivo}</td>
                  <td className="px-4 py-2 border border-border text-green-400 text-sm">{alt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Segurança do dispositivo</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { titulo: "Baixe apenas do site oficial", desc: "APKs de GG de sites alternativos frequentemente contêm malware. O site oficial é gameguardian.net — verifique o MD5 do arquivo.", risco: "Alto" },
            { titulo: "Cuidado com scripts Lua de terceiros", desc: "Scripts .lua têm acesso à API do GG e podem fazer operações maliciosas. Execute apenas de fontes confiáveis.", risco: "Alto" },
            { titulo: "Gerencie permissões root cuidadosamente", desc: "Com root ativo, qualquer app com permissão root tem controle total. Conceda apenas ao necessário.", risco: "Médio" },
            { titulo: "Backup antes de instalar Magisk", desc: "Antes de modificar o sistema, faça backup completo. TWRP permite backups de partições.", risco: "Médio" },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-yellow-500">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-bold text-foreground text-sm">{item.titulo}</h4>
                <span className={"text-xs px-2 py-0.5 rounded " + (item.risco === "Alto" ? "bg-destructive/20 text-destructive" : "bg-yellow-500/20 text-yellow-500")}>{item.risco}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="success" title="Cenário ideal de uso seguro">
          Um dispositivo Android secundário sem conta Google principal, com Magisk + DenyList, rodando apenas jogos offline. Nenhum risco de ban de conta principal, nenhum risco para dados pessoais.
        </AlertBox>
      </PageContainer>
    );
  }
  