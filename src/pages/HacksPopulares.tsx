import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function HacksPopulares() {
    return (
      <PageContainer
        title="Hacks Populares"
        subtitle="Os modificações mais comuns feitas com Game Guardian — exemplos práticos passo a passo para jogos genéricos."
        difficulty="intermediario"
        timeToRead="20 min"
      >
        <AlertBox type="warning" title="Use apenas em jogos offline ou conta de testes">
          Os exemplos nesta seção funcionam em jogos que armazenam valores client-side. Jogos online com validação de servidor não serão afetados ou resultarão em ban.
        </AlertBox>

        <h2>1. Moedas / Ouro infinito</h2>
        <p>O hack mais clássico — e mais fácil. Funciona em 80% dos jogos mobile que não têm validação server-side.</p>
        <div className="grid grid-cols-1 gap-3 my-4 not-prose">
          {[
            { n: "1", title: "Note o valor exato", desc: "Você tem 1.250 moedas. Anote: 1250.", detail: "O número precisa ser exato. Se o jogo mostra '1.2K', encontre o valor real gastando e verificando." },
            { n: "2", title: "Busque como Dword", desc: "GG → Buscar → Digite 1250 → Tipo: Dword → Região: Ca → Buscar.", detail: "Se não encontrar nada, tente Float: 1250.0. Se ainda nada, tente XOR (4 bytes)." },
            { n: "3", title: "Gaste algumas moedas", desc: "Compre algo no jogo. Agora tem 1.100 moedas.", detail: "A diferença precisa ser significativa para o refinamento eliminar falsos positivos." },
            { n: "4", title: "Refine", desc: "GG → Buscar novamente → Digite 1100 → Buscar (refinar).", detail: "Repita gasto + refinamento até restar 1-5 resultados." },
            { n: "5", title: "Modifique e freeze", desc: "Selecione todos os resultados → Editar → Digite 9999999 → Ative freeze (cadeado).", detail: "O freeze é importante caso o jogo tente decrementar o valor após uma compra." },
          ].map((item) => (
            <div key={item.n} className="bg-card border border-border rounded-xl p-4">
              <div className="flex gap-3 items-start">
                <span className="w-7 h-7 rounded-full bg-primary text-primary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
                <div>
                  <h4 className="font-bold text-foreground mb-1 text-sm">{item.title}</h4>
                  <p className="text-xs text-foreground/80 mb-1">{item.desc}</p>
                  <p className="text-xs text-muted-foreground italic">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
        <AlertBox type="info" title="Se o valor voltou após uma compra">
          O jogo pode usar dois endereços: um para o valor atual e um para o valor "real" no servidor. Tente encontrar o endereço que fica congelado antes da compra. Às vezes, modificar o valor de custo do item para 0 é mais eficiente que modificar as moedas.
        </AlertBox>

        <h2>2. HP / Vida infinita (Float)</h2>
        <CodeBlock
          language="text"
          title="Passo a passo — HP em jogos de ação"
          code={"HP visível: 150/200\n\nBusca 1: Float 150.0 em Ca\nSe não encontrar: Float 150 em A\nSe não encontrar: XOR (4 bytes) com valor 150\n\nSofra dano no jogo → HP vai para 120\nRefinamento: Float 120.0\n\nSofra mais dano → HP = 80\nRefinamento: Float 80.0\n\nDeve restar 1-3 endereços.\nFreeze no valor máximo (200.0 ou 9999.0)\n\n// Dica: congele em 200.0 (máximo) não em 999999\n// Valores absurdos podem causar crash em alguns engines"}
        />

        <h2>3. Velocidade de movimento</h2>
        <p>
          Velocidade é quase sempre Float. O valor padrão costuma ser entre 1.0 e 10.0 dependendo do jogo.
        </p>
        <CodeBlock
          language="text"
          title="Hack de velocidade"
          code={"Estratégia 1 — busca direta:\nFloat 5.0 (valor típico) em A\nAumente/reduza velocidade no jogo se possível\nRefine com novo valor\n\nEstratégia 2 — busca por desconhecido:\nBusca desconhecida (Unknown) como Float em A\nMova o personagem → Refine com 'Mudou'\nFique parado → Refine com 'Não mudou'\nRepita 5-10 vezes\n\nApós encontrar:\nModifique para 2.0x - 3.0x o valor original\nEx: original era 5.0 → coloque 10.0 ou 15.0\n\n// ATENÇÃO: valores muito altos (50x+) podem\n// causar detecção por coordenadas impossíveis\n// em jogos online"}
        />

        <h2>4. Munição infinita</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
          {[
            { titulo: "Munição no carregador (pequena)", desc: "Geralmente Word ou Byte (0-255 balas). Busque o valor exato, atire algumas balas, refine. Freeze no máximo." },
            { titulo: "Munição em reserva (maior)", desc: "Dword ou Word. Mesmo processo. Se o jogo separa 'no carregador' de 'na reserva', são endereços diferentes — encontre ambos." },
            { titulo: "Cooldown de recarga", desc: "Float em segundos. Busque por desconhecido, recarregue a arma, refine com 'Diminuiu'. Congele em 0.0 para recarga instantânea." },
            { titulo: "Projéteis ilimitados especiais", desc: "Granadas, skills, bombas — geralmente Byte ou Word. Busque o valor atual, use uma, refine com o novo valor." },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>5. Teleporte (modificar coordenadas)</h2>
        <AlertBox type="warning" title="Teleporte é altamente detectável em jogos online">
          Coordenadas impossíveis (pular 1000 metros instantaneamente) são detectadas por praticamente qualquer anti-cheat server-side. Use apenas offline.
        </AlertBox>
        <CodeBlock
          language="text"
          title="Como fazer teleporte"
          code={"// Coordenadas são sempre Float\n// Geralmente em struct: [X][Y][Z] com offset de 4 bytes\n\nBusca em grupo:\nTipo: Float, Offset: 4\nValores: X_atual;Y_atual;Z_atual\n// Onde X, Y, Z vêm do minimapa ou de cheat engine\n\nApós encontrar a struct:\nX está em: base_addr\nY está em: base_addr + 4\nZ está em: base_addr + 8\n\nModifique X e Z para as coordenadas de destino\n(Z é geralmente a altura — cuidado com valores de Z altos)\n\n// Alternativa: use busca por desconhecido Float\n// Mova apenas em X → refine com 'Mudou'\n// Fique parado → refine com 'Não mudou'\n// 5-10 ciclos isolam o endereço de X"}
        />

        <h2>6. Skip de timer / tempo congelado</h2>
        <CodeBlock
          language="text"
          title="Hack de timer"
          code={"// Timers geralmente são Float (segundos) ou Dword (ms)\n\n// Para tempo que diminui (countdown):\nBusque o valor atual como Float\nEspere 10 segundos → Refine com 'Diminuiu'\nEspere mais → Refine novamente\nAté isolar. Freeze em valor alto (99999.0)\n\n// Para cooldown de skill:\nBusca desconhecida como Float\nUse a skill → Refine 'Aumentou' (cooldown aparece)\nEspere um pouco → Refine 'Diminuiu'\nRepita. Congele em 0.0 para sem cooldown\n\n// Para timer de energia/stamina:\nMesmo processo. Congele em 0.0 para\nrecuperação instantânea ou em valor alto\npara nunca gastar energia"}
        />

        <h2>7. Desbloqueio de itens bloqueados</h2>
        <p>
          Alguns jogos têm itens bloqueados representados como flag 0 (bloqueado) ou 1 (desbloqueado). Encontrar e modificar essas flags pode desbloquear conteúdo.
        </p>
        <CodeBlock
          language="text"
          title="Hack de flags de desbloqueio"
          code={"// Estratégia 1 — busca por Byte 0 ou 1\nBusque Byte 0 (bloqueado) e Byte 1 (desbloqueado)\nIsole endereços próximos ao item que quer desbloquear\nModifique de 0 para 1\n\n// Estratégia 2 — busca por texto (nome do item)\nBusque UTF-8 'item_name' ou 'locked'\nEncontre o endereço do texto\nAnálise bytes ao redor para encontrar a flag\n\n// Estratégia 3 — busca por valor de unlock\nAlguns jogos usam Dword: 0 = locked, 1 = unlocked\nBusque Dword 0, desbloqueie um item gratuito\nRefine Dword 1 → localiza endereços de desbloqueio\nModifique outros de 0 para 1"}
        />

        <h2>8. Hack de prêmios de gacha / loot</h2>
        <p>
          Alguns jogos de gacha armazenam o resultado do pull antes de animá-lo. É possível (mas difícil) interferir nesse momento.
        </p>
        <AlertBox type="info" title="Gacha com seed aleatório">
          Jogos mais modernos calculam o resultado no servidor antes de enviar para o cliente. Não há como interferir client-side. Para jogos que calculam localmente (rare), busque pelo ID do item resultante enquanto a animação de gacha carrega e modifique antes de completar.
        </AlertBox>

        <h2>Referência rápida de tipos por hack</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Hack</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo provável</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Fallback</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Moedas / Ouro", "Dword", "Float → XOR (4b)"],
                ["HP / Vida", "Float", "Dword → XOR Float"],
                ["Velocidade", "Float", "Double"],
                ["Munição", "Word / Dword", "Byte"],
                ["Coordenadas (X,Y,Z)", "Float", "Double"],
                ["Timer / Cooldown", "Float", "Dword (ms)"],
                ["Level / XP", "Dword", "Float"],
                ["Flag de desbloqueio", "Byte", "Dword (0/1)"],
                ["Stamina / Energia", "Float", "Dword"],
              ].map(([hack, tipo, fallback], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{hack}</td>
                  <td className="px-4 py-2 border border-border text-primary text-sm font-mono">{tipo}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{fallback}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </PageContainer>
    );
  }
  