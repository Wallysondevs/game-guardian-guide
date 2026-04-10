import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Troubleshooting() {
    return (
      <PageContainer
        title="Solução de Problemas"
        subtitle="Diagnóstico e correção dos erros mais comuns ao usar o Game Guardian."
        difficulty="intermediario"
        timeToRead="15 min"
      >
        <AlertBox type="info" title="Como usar este guia">
          Identifique o sintoma na seção correta, leia as causas prováveis e aplique as soluções na ordem sugerida. A maioria dos problemas tem 2-3 causas possíveis.
        </AlertBox>

        <h2>O GG não consegue se anexar ao jogo</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { problema: "Mensagem: 'Cannot attach to process'", causas: ["Root não está ativo ou GG não tem permissão root", "O jogo está em processo separado (multi-process)", "SELinux bloqueando o ptrace"], solucoes: ["Verifique root: abra terminal e rode 'su' — deve aparecer prompt #", "No Magisk: conceda permissão root ao GG", "Tente modo furtivo no GG: Configurações → Modo Furtivo"] },
            { problema: "GG trava na tela de seleção de processo", causas: ["Muitos processos rodando", "GG incompatível com versão do Android"], solucoes: ["Reinicie o dispositivo e abra apenas o jogo", "Tente versão mais antiga do GG para Android mais novo"] },
            { problema: "O jogo fecha ao selecionar no GG", causas: ["Anti-cheat detectou o GG", "DenyList não configurado"], solucoes: ["Configure DenyList no Magisk para o jogo e para o GG", "Instale módulo PlayIntegrityFix e Shamiko"] },
          ].map((item) => (
            <div key={item.problema} className="bg-card border border-border rounded-xl p-5 mb-3">
              <h4 className="font-bold text-destructive mb-3 text-sm">❌ {item.problema}</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Causas</p>
                  <ul className="space-y-1">
                    {item.causas.map((c, i) => <li key={i} className="text-xs text-foreground/80">• {c}</li>)}
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Soluções</p>
                  <ul className="space-y-1">
                    {item.solucoes.map((s, i) => <li key={i} className="text-xs text-foreground/80">✓ {s}</li>)}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Busca não retorna resultados</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Sintoma</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Causa provável</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Solução</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["0 resultados para Dword", "Valor é Float ou Word", "Tente Float com o mesmo número"],
                ["0 resultados para Float", "Valor está encriptado (XOR)", "Selecione tipo XOR (4 bytes) e busque o mesmo valor"],
                ["0 resultados com XOR", "Encriptação mais complexa (AES, custom)", "Use busca por valor desconhecido e refinamento"],
                ["Milhares de resultados e não diminui", "Muitos endereços com o mesmo valor", "Use operador 'Diminuiu/Aumentou' em vez de valor exato"],
                ["Resultado correto mas muda ao modificar", "Jogo usa múltiplos endereços para o mesmo valor", "Selecione todos os resultados e edite/freeze todos juntos"],
                ["Busca em Ca retorna 0, em A retorna resultados", "Valor está fora da região de cache", "Use região A para esse jogo específico"],
              ].map(([sintoma, causa, solucao], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border text-foreground text-sm">{sintoma}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{causa}</td>
                  <td className="px-4 py-2 border border-border text-primary text-sm">{solucao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Modificação não tem efeito</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { titulo: "Valor volta ao normal em segundos", desc: "O jogo sobrescreve o endereço via lógica interna. Use freeze (cadeado) para manter o valor. Se o freeze também não funcionar, o valor pode ser calculado por fórmula a partir de outros endereços." },
            { titulo: "Valor muda na UI mas não no gameplay", desc: "Há dois endereços: um para display e um para lógica. Você modificou o de display. Refaça a busca mas desta vez execute uma ação que mude o valor (perca vida) para confirmar qual é o endereço lógico." },
            { titulo: "Modificação funciona offline mas não online", desc: "Validação server-side ativa. O servidor recalcula ou rejeita o valor. Não há solução via GG para isso — apenas exploits server-side resolveriam, o que está fora do escopo deste guia." },
            { titulo: "Crash ao modificar para valores grandes", desc: "O jogo não trata overflow. Tente valores menores: 99999 em vez de 2147483647. Alguns jogos também limitam o valor máximo via cap (ex: moedas no máximo 99999)." },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-yellow-500">
              <h4 className="font-bold text-foreground mb-2 text-sm">⚠️ {item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Problemas de performance</h2>
        <AlertBox type="warning" title="GG pode causar lag durante operações intensas">
          Buscas em toda a memória (região A) e freeze de muitos endereços consomem CPU e RAM significativamente. Isso é esperado e temporário.
        </AlertBox>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Problema</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Solução</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Jogo lento durante busca", "Normal — aguarde. Use região Ca em vez de A para buscas mais rápidas."],
                ["Celular aquecendo muito", "Reduce freeze simultâneo. Use script com delay entre escritas."],
                ["GG crasha durante busca", "Memória RAM insuficiente. Feche outros apps e tente novamente."],
                ["Busca por desconhecido trava o celular", "Reduza a região de busca. Use Ca e Ps em vez de A."],
                ["Jogo crasha após modificar", "Valor inválido para o tipo de dado. Tente valores menores ou diferentes."],
              ].map(([problema, solucao], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border text-foreground text-sm">{problema}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{solucao}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Diagnóstico passo a passo</h2>
        <CodeBlock
          language="text"
          title="Fluxo de diagnóstico quando nada funciona"
          code={"1. Root está ativo?\n   → Abra terminal → digite 'su' → prompt deve mudar para '#'\n   → Se não: reinstale Magisk ou KernelSU\n\n2. GG tem permissão root?\n   → Magisk → Superusuário → verifique se GG está listado\n   → Se não: abra GG → acesse via Virtual Space → ou conceda root manualmente\n\n3. DenyList configurado?\n   → Magisk → DenyList → GG e o Jogo devem estar marcados\n\n4. Play Integrity passando?\n   → Instale Play Integrity Checker → rode teste\n   → Se falhar: instale PlayIntegrityFix + Shamiko\n\n5. Ainda não funciona?\n   → Tente VirtualSpace (sem root) → Veja seção VirtualSpace"}
        />

        <AlertBox type="success" title="Recurso: comunidade Game Guardian">
          O fórum oficial (gameguardian.net/forum) tem seção de suporte com soluções para jogos específicos. Pesquise pelo nome do jogo antes de perguntar — provavelmente alguém já teve o mesmo problema.
        </AlertBox>

        <h2>Erros comuns de script Lua</h2>
        <CodeBlock
          language="lua"
          title="Erros frequentes e como corrigir"
          code={"-- Erro: attempt to call nil value\n-- Causa: função do GG não existe nessa versão\n-- Solução: verifique a versão mínima do GG na documentação\n\n-- Erro: bad argument #1 (number expected, got string)\n-- Causa: passando string onde número é esperado\ngg.searchNumber('100', gg.TYPE_DWORD)  -- errado\ngg.searchNumber('100', gg.TYPE_DWORD)  -- string OK, GG converte\n\n-- Erro: Script stopped after 100000 iterations\n-- Causa: loop infinito sem gg.sleep()\n-- Solução: adicione gg.sleep(100) dentro do loop\n\n-- Erro: cannot access protected process\n-- Causa: anti-cheat bloqueando o script\n-- Solução: use modo furtivo + DenyList"}
        />
      </PageContainer>
    );
  }
  