import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function HacksPopulares() {
  return (
    <PageContainer
      title="Hacks Populares"
      subtitle="As modificações mais comuns feitas com Game Guardian — exemplos práticos passo a passo dos hacks que dominam 90% dos casos de uso, desde moedas infinitas até teleporte e desbloqueio de skins."
      difficulty="intermediario"
      timeToRead="28 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"God mode"}</strong> {' — '} {"HP nunca diminui — congele o valor."}
          </li>
        <li>
            <strong>{"Money/gold"}</strong> {' — '} {"edita o valor da moeda em memória."}
          </li>
        <li>
            <strong>{"Speed hack"}</strong> {' — '} {"altera a taxa de tick do jogo."}
          </li>
        <li>
            <strong>{"Damage multiplier"}</strong> {' — '} {"modifica fórmula de dano."}
          </li>
        <li>
            <strong>{"One-hit kill"}</strong> {' — '} {"HP do inimigo vai a zero ao acertar."}
          </li>
        </ul>
        <AlertBox type="warning" title="Use apenas em jogos offline ou conta de testes">
        Os exemplos nesta seção funcionam em jogos que armazenam valores client-side. Jogos online com validação de servidor não serão afetados ou resultarão em ban permanente da conta. Para mais detalhes sobre detecção, consulte as seções <strong>Bypass Anti-Cheat</strong> e <strong>Uso Seguro</strong>.
      </AlertBox>

      <h2>Visão geral dos hacks mais comuns</h2>
      <p>
        Apesar da diversidade de jogos mobile, a esmagadora maioria dos hacks populares cai em meia dúzia de categorias. Cada uma tem um padrão de busca, refinamento e modificação relativamente previsível, que você pode aplicar a quase qualquer jogo single-player. Esta seção é o seu manual de receitas — siga os passos como instrução e adapte conforme necessário.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 my-6 not-prose">
        {[
          { titulo: "💰 Moedas infinitas", dificuldade: "Fácil", taxaSucesso: "85%", desc: "O hack mais clássico e fácil em jogos offline." },
          { titulo: "❤️ HP / Vida infinita", dificuldade: "Fácil", taxaSucesso: "75%", desc: "Encontrado por busca exata + refinamento por dano." },
          { titulo: "🏃 Velocidade modificada", dificuldade: "Médio", taxaSucesso: "65%", desc: "Float entre 1.0 e 10.0. Cuidado com detecção." },
          { titulo: "🔫 Munição infinita", dificuldade: "Fácil", taxaSucesso: "80%", desc: "Dword/Word do contador de balas." },
          { titulo: "📍 Teleporte", dificuldade: "Médio", taxaSucesso: "60%", desc: "Coordenadas X, Y, Z em struct contígua." },
          { titulo: "⏱️ Timer / Cooldown", dificuldade: "Médio", taxaSucesso: "70%", desc: "Float em segundos, busca por desconhecido." },
          { titulo: "🔓 Desbloqueio de itens", dificuldade: "Difícil", taxaSucesso: "45%", desc: "Flags de unlock — Byte 0/1." },
          { titulo: "⭐ Level / XP máximo", dificuldade: "Fácil", taxaSucesso: "80%", desc: "Dword de XP, modifique para o cap máximo." },
          { titulo: "💪 Dano multiplicado", dificuldade: "Médio", taxaSucesso: "60%", desc: "Multiplicador Float próximo a 1.0." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
            <div className="flex gap-2 mb-2">
              <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">{item.dificuldade}</span>
              <span className="text-xs bg-green-500/20 text-green-400 px-2 py-0.5 rounded">{item.taxaSucesso}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>1. Moedas / Ouro infinito</h2>
      <p>O hack mais clássico — e mais fácil. Funciona em 80%+ dos jogos mobile que não têm validação server-side. Ideal para começar se você é iniciante: o procedimento é direto, não exige conhecimento avançado, e o feedback é imediato (você vê o número mudar na tela).</p>
      <div className="grid grid-cols-1 gap-3 my-4 not-prose">
        {[
          { n: "1", title: "Note o valor exato atual", desc: "Você tem 1.250 moedas. Anote: 1250.", detail: "O número precisa ser exato. Se o jogo mostra '1.2K' ou '1,25K', encontre o valor real gastando até ver o número exato. Algumas moedas usam separador de milhar (1.250 vs 1250) — desconsidere o separador, busque sempre 1250." },
          { n: "2", title: "Busque como Dword na região Ca", desc: "GG → Buscar → Digite 1250 → Tipo: Dword → Região: Ca (C heap) → Buscar.", detail: "Se não encontrar nada, tente Float: 1250.0 (engines Unity podem usar Float até para inteiros). Se ainda nada, tente XOR (4 bytes) — alguns jogos encriptam moedas. Última opção: região 'A' (toda memória) — mais lento mas garante cobertura." },
          { n: "3", title: "Gaste algumas moedas no jogo", desc: "Compre algo barato no jogo. Agora você tem, por exemplo, 1.100 moedas (gastou 150).", detail: "A diferença precisa ser significativa para o refinamento eliminar falsos positivos. Idealmente gaste pelo menos 10% do total. Não gaste tudo de uma vez — você quer fazer múltiplas refinações." },
          { n: "4", title: "Refine a busca", desc: "GG → Buscar novamente (sem limpar resultados) → Digite 1100 → Buscar (refinar). O GG só mantém endereços que ANTES eram 1250 e AGORA são 1100.", detail: "Repita gasto + refinamento até restar 1-5 resultados. Geralmente 2-3 refinações já isolam. Se não cair de 1000+ para poucos rapidamente, você pode estar com tipo errado — tente outro." },
          { n: "5", title: "Ganhe moedas (opcional, para confirmar)", desc: "Faça uma ação que dê moedas. Refine para o novo valor. Endereços que sobem corretamente são os reais.", detail: "Esse passo elimina endereços que coincidiram por acaso. Se um endereço diminuiu mas não subiu junto com a recompensa, não é o real." },
          { n: "6", title: "Modifique e congele", desc: "Selecione todos os resultados → Editar → Digite 9999999 → Ative freeze (cadeado).", detail: "O freeze é importante caso o jogo tente decrementar o valor após uma compra. Sem freeze, comprar algo de 100 moedas vai descer para 9999899 e ficar lá — funciona, mas com freeze você nunca perde moedas." },
          { n: "7", title: "Salve nos favoritos", desc: "Toque longo nos endereços encontrados → Adicionar a favoritos → nomeie 'Moedas [Nome do Jogo]'.", detail: "Próxima vez que jogar, acesse os favoritos diretamente sem refazer toda a busca (válido se o jogo usa endereços relativamente estáticos)." },
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
        O jogo pode usar dois endereços: um para o valor atual exibido e um para o valor "real" (geralmente em outro lugar da memória). Tente encontrar o endereço que fica congelado antes da compra. Às vezes, é mais eficiente modificar o <strong>valor de custo do item para 0</strong> em vez de modificar as moedas — assim, comprar não desce nada.
      </AlertBox>

      <h2>2. HP / Vida infinita (Float)</h2>
      <p>
        HP é o hack que mais varia entre jogos. Em RPGs clássicos é Word ou Dword, em jogos Unity modernos é quase sempre Float. A dica universal: se Dword não encontrar, tente Float com o mesmo número.
      </p>
      <CodeBlock
        language="text"
        title="Passo a passo — HP em jogos de ação"
        code={"HP visível na UI: 150/200\n\nBusca 1: Float 150.0 em região Ca\n  Se não encontrar: Float 150 em A (toda memória)\n  Se ainda não encontrar: XOR (4 bytes) com valor 150\n  Último recurso: Dword 150 em A\n\nSofra dano no jogo (ex: leve um hit) → HP vai para 120\nRefinamento: Float 120.0\n  (O GG mantém só endereços que eram 150 e agora são 120)\n\nSofra mais dano → HP = 80\nRefinamento: Float 80.0\n\nUse poção/cura → HP = 150\nRefinamento: Float 150.0 (validação, deve voltar aos mesmos)\n\nDeve restar 1-3 endereços.\nFreeze no valor máximo (200.0) ou em valor seguro (9999.0)\n\n// Dica importante: congele em 200.0 (ou MaxHP), não em 999999\n// Valores absurdos podem:\n// 1. Causar crash em alguns engines (overflow de Float)\n// 2. Criar bugs visuais (barra de HP fica fora da tela)\n// 3. Triggerar detecção de anti-cheat (HP impossível)\n\n// VARIANTE: HP máximo separado\n// Em alguns jogos, MaxHP é outra variável que pode ser editada.\n// Encontre próximo do HP atual (offset +4 ou +8 normalmente).\n// Modifique MaxHP para 9999, depois HP atual sobe sozinho ao curar."}
      />

      <h2>3. Velocidade de movimento</h2>
      <p>
        Velocidade é quase sempre Float, geralmente entre 1.0 e 10.0 dependendo do jogo. Velocidade modificada é um dos hacks mais detectáveis em jogos online — coordenadas anormais são bandeira vermelha imediata para anti-cheats server-side.
      </p>
      <CodeBlock
        language="text"
        title="Hack de velocidade"
        code={"Estratégia 1 — busca direta:\n  Float 5.0 (valor típico) em região A\n  Aumente/reduza velocidade no jogo se possível\n  (alguns jogos têm botão de turbo ou modo lento)\n  Refine com novo valor\n\nEstratégia 2 — busca por desconhecido (recomendado):\n  Busca desconhecida (Unknown) como Float em A\n  Mova o personagem → Refine com 'Mudou'\n  Fique parado → Refine com 'Não mudou'\n  Repita 5-10 vezes\n  No final, sobram poucos endereços —\n  velocidade ATUAL (Float) e geralmente posição X/Y/Z\n\nEstratégia 3 — busca por struct conhecida:\n  Engines Unity: speed = 5.5 ou 6.0 são comuns\n  Use range search: Float entre 4.0 e 7.0\n  Refine com 'Mudou' ao mover, 'Não mudou' parado\n\nApós encontrar:\n  Modifique para 2.0x - 3.0x o valor original\n  Ex: original era 5.0 → coloque 10.0 ou 15.0\n  Para velocidade insana (apenas offline): 50.0\n\n// ATENÇÃO: valores muito altos (50x+) podem:\n// - Causar detecção por coordenadas impossíveis em jogos online\n// - Atravessar paredes/ground (clipping bugs)\n// - Crashar a câmera ou física do jogo\n// - Fazer NPCs e inimigos não conseguirem interagir corretamente\n//\n// Valores 'seguros' offline: 2x a 5x o original\n// Valores extremos: apenas para fun em sandbox single-player"}
      />

      <h2>4. Munição infinita</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
        {[
          { titulo: "Munição no carregador (pequena)", desc: "Geralmente Word ou Byte (0-255 balas). Busque o valor exato, atire algumas balas, refine. Freeze no máximo (geralmente 30-60 dependendo da arma)." },
          { titulo: "Munição em reserva (maior)", desc: "Dword ou Word. Mesmo processo. Se o jogo separa 'no carregador' de 'na reserva', são endereços diferentes — encontre ambos. Geralmente próximos um do outro na memória." },
          { titulo: "Cooldown de recarga", desc: "Float em segundos. Busque por desconhecido, recarregue a arma, refine com 'Diminuiu'. Congele em 0.0 para recarga instantânea." },
          { titulo: "Projéteis ilimitados especiais", desc: "Granadas, skills, bombas — geralmente Byte ou Word. Busque o valor atual, use uma, refine com o novo valor. Geralmente bem fácil de isolar (poucos endereços com aquele valor)." },
          { titulo: "Munição de armas múltiplas", desc: "Cada arma tem seu próprio contador de munição. Para hackear todas: encontre uma, depois busque endereços próximos com Word/Dword até encontrar todas as munições." },
          { titulo: "Sem necessidade de recarregar (no reload)", desc: "Encontre a flag 'is_reloading' (Byte 0/1) durante a recarga. Congele em 0 = nunca recarrega, ou ache o tempo de recarga (Float) e congele em 0.0." },
          { titulo: "Espalhamento (recoil) zero", desc: "Em FPS, há valor Float de recoil (0.0 = perfeito, 1.0+ = espalha). Busque desconhecido Float, atire algumas vezes (sobe), refine 'Aumentou'. Congele em 0.0 para precisão perfeita." },
          { titulo: "Headshot multiplicado", desc: "Dano de headshot é Float (geralmente 2.0 ou 3.0 = multiplicador 2x ou 3x). Modifique para 100.0 = headshots one-shot." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>5. Teleporte (modificar coordenadas)</h2>
      <AlertBox type="warning" title="Teleporte é altamente detectável em jogos online">
        Coordenadas impossíveis (pular 1000 metros instantaneamente) são detectadas por praticamente qualquer anti-cheat server-side. Use apenas offline ou em jogos sem componente competitivo.
      </AlertBox>
      <CodeBlock
        language="text"
        title="Como fazer teleporte"
        code={"// Coordenadas são SEMPRE Float em jogos modernos\n// Geralmente em struct contígua: [X][Y][Z] com offsets de 4 bytes\n// Ou em Unity: Vector3 = (float x, float y, float z) = 12 bytes\n\nMÉTODO 1: Busca em grupo (mais rápido)\n  Tipo: Float, Group: 4\n  Valores: X_atual;Y_atual;Z_atual\n  // Onde X, Y, Z vêm do minimapa, debug overlay,\n  // ou ferramenta como Cheat Engine inicial\n\nMÉTODO 2: Busca por desconhecido isolada\n  Mova apenas em direção X (leste/oeste no minimapa)\n  Busca desconhecida Float\n  → Refine com 'Mudou'\n  Fique parado → Refine com 'Não mudou'\n  5-10 ciclos isolam o endereço de X\n  \n  Repita para Y e Z separadamente\n  Y geralmente está em offset +4 do X encontrado\n  Z em offset +8 do X\n\nApós encontrar a struct de posição:\n  X está em: base_addr\n  Y está em: base_addr + 4\n  Z está em: base_addr + 8 (geralmente é a altura/Y vertical)\n\nModifique X e Z para as coordenadas de destino\nCUIDADO com valores de Z (altura):\n  - Z muito alto: cai do mapa, morre\n  - Z negativo: pode atravessar o chão\n  - Mude Z apenas +1 ou +2 do atual para evitar problemas\n\n// USOS PRÁTICOS:\n// - Pular cutscenes/cenas chatas (TP para próxima zona)\n// - Coletar todos os baús de um mapa rapidamente\n// - Atravessar paredes para ver áreas escondidas\n// - Resgatar personagem preso em geometria do jogo"}
      />

      <h2>6. Skip de timer / tempo congelado</h2>
      <CodeBlock
        language="text"
        title="Hack de timer"
        code={"// Timers geralmente são Float (segundos) ou Dword (milissegundos)\n// Em Unity: float deltaTime acumulado\n// Em código nativo: long timestamp em ms\n\nPara tempo que diminui (countdown):\n  Busque o valor atual como Float\n  Espere 10 segundos → Refine com 'Diminuiu'\n  Espere mais 10s → Refine novamente\n  Repita até isolar (geralmente 2-3 refinos)\n  Freeze em valor alto (99999.0)\n  → Timer nunca chega a zero\n\nPara cooldown de skill:\n  Busca desconhecida como Float\n  Use a skill → Refine 'Aumentou' (cooldown aparece)\n  Espere um pouco → Refine 'Diminuiu'\n  Repita 3-5 vezes\n  Congele em 0.0 para sem cooldown\n  → Pode usar a skill sem parar\n\nPara timer de energia/stamina:\n  Mesmo processo da stamina/HP\n  Encontre o valor atual\n  Congele em 0.0 (recuperação instantânea — energia nunca sobe pq já está cheia)\n  Ou em valor máximo (sempre cheia)\n\nPara timer de espera entre rodadas (multiplayer):\n  NÃO TENTE — sempre validado pelo servidor\n  Mesmo modificando localmente, servidor controla quando rodada começa\n\nPara construção/produção em estratégia (ex: Clash of Clans):\n  Tempo restante geralmente Dword em segundos\n  Modificar para 1 = construção pronta no próximo tick do servidor\n  ATENÇÃO: jogos como CoC validam — pode dar ban"}
      />

      <h2>7. Desbloqueio de itens bloqueados</h2>
      <p>
        Alguns jogos têm itens bloqueados representados como flag 0 (bloqueado) ou 1 (desbloqueado). Encontrar e modificar essas flags pode desbloquear conteúdo. É um dos hacks mais difíceis pois há centenas de Bytes 0/1 na memória — isolar o correto exige muita refinação.
      </p>
      <CodeBlock
        language="text"
        title="Hack de flags de desbloqueio"
        code={"ESTRATÉGIA 1 — busca por Byte 0 ou 1\n  Busque Byte 0 (bloqueado) → terá MILHARES de resultados\n  Não dá para isolar diretamente. Use estratégia 2 ou 3.\n\nESTRATÉGIA 2 — buscar evento de desbloqueio (RECOMENDADO)\n  1. Busque Byte 0 OU Dword 0 OU Word 0 com toda memória\n  2. Sem refinar nada, vá ao jogo e desbloqueie UM item gratuito\n     (ex: progrida na história até desbloquear o próximo nível)\n  3. Refine: agora busque Byte 1 (= item passou de bloqueado para desbloqueado)\n  4. Os endereços que mudaram de 0 para 1 são candidatos\n  5. Geralmente sobram 5-50 endereços\n  6. Tente modificar cada um para 1 e veja qual desbloqueia o item desejado\n\nESTRATÉGIA 3 — busca por nome do item\n  1. Busque UTF-8 'item_nome' ou 'character_id' do item desejado\n  2. Encontre o endereço da string (geralmente em Cb ou Xa)\n  3. Análise bytes ao redor — 50 bytes antes e 50 depois\n  4. Procure padrões como 0 ou 1 em offsets típicos (+0x10, +0x20, +0x40)\n  5. Modifique esses offsets de 0 para 1\n\nESTRATÉGIA 4 — busca por contador de itens desbloqueados\n  1. UI mostra: '15/100 itens desbloqueados'\n  2. Busque Dword 15\n  3. Desbloqueie 1 item → refine com 16\n  4. Encontrou o contador. Modifique para 100\n  5. Em alguns jogos isso desbloqueia tudo automaticamente\n  6. Em outros, ainda precisa modificar flags individuais"}
      />

      <h2>8. Hack de prêmios de gacha / loot</h2>
      <p>
        Gacha (sorteio aleatório de itens) é um dos hacks mais buscados — todo mundo quer skin lendária. Mas é também um dos mais difíceis e detectáveis.
      </p>
      <AlertBox type="info" title="Gacha com seed aleatório do servidor">
        Jogos modernos (Genshin, Honkai, FGO, Pokémon Masters) calculam o resultado <strong>no servidor</strong> antes de enviar para o cliente. A animação local é puramente visual — o item já foi decidido. Não há como interferir client-side.
      </AlertBox>
      <CodeBlock
        language="text"
        title="Quando gacha pode ser hackeado (raro)"
        code={"GACHA HACKÁVEL: jogo offline ou jogo simples online\n  - Sorteio calculado localmente\n  - Servidor apenas registra o resultado, não calcula\n\nMÉTODO:\n  1. Antes do pull: busque Dword com IDs típicos de itens\n     (raros geralmente têm IDs 1000+, comuns IDs 1-100)\n  2. Faça o pull e observe a animação\n  3. Refine com o ID do item desejado durante a animação\n  4. Modifique o endereço para o ID do item lendário\n  5. Animação completa → mostra o item modificado\n\nLIMITAÇÕES IMPORTANTES:\n  - Mesmo recebendo o item visualmente, o servidor pode\n    'corrigir' depois que você desconectar\n  - Ban automático se o servidor detectar item impossível\n  - Funciona melhor em jogos OFFLINE puros\n\nGACHA HACKÁVEL EM JOGOS OFFLINE:\n  - Save game tem o inventário em texto/binário\n  - Modificar diretamente o save (mais fácil que GG)\n  - GG pode ajudar a encontrar a estrutura do save em RAM"}
      />

      <h2>9. Modificar cap de level/XP</h2>
      <p>
        Subir do level 1 ao 50 instantaneamente em vez de horas de grind. Um dos hacks mais 'satisfatórios' em RPGs offline.
      </p>
      <CodeBlock
        language="text"
        title="XP / Level máximo"
        code={"PARTE 1: Modificar XP atual\n  Você está level 5 com 1250 XP\n  Para próximo level precisa de 2000 XP\n  \n  Busque Dword 1250 em Ca\n  Mate alguns inimigos → XP sobe para, ex, 1380\n  Refine Dword 1380\n  Repita até isolar\n  \n  Modifique para um valor enorme: 999999999\n  → Provavelmente vai 'level upar' várias vezes consecutivas\n\nPARTE 2: Modificar Level diretamente\n  (Mais limpo, mas alguns jogos bloqueiam)\n  Encontre Dword/Byte com seu level atual (ex: 5)\n  Refine após levelar (level = 6)\n  Modifique para o cap (ex: 50, 99, 100)\n\nPARTE 3: Bypass de cap (level 999)\n  Alguns jogos têm cap rígido no código (não passa do 100)\n  Mesmo modificando para 999 na memória, jogo trava em 100\n  Solução: encontrar a constante 100 no código (Xa)\n  e modificar para 9999. Avançado e raro."}
      />

      <h2>10. Multiplicador de dano</h2>
      <p>
        Em vez de modificar HP do inimigo (impraticável — milhares de inimigos), modifique o seu multiplicador de dano. Resultado: você mata tudo com um hit.
      </p>
      <CodeBlock
        language="text"
        title="Hack de dano"
        code={"// Dano em jogos modernos costuma ser:\n// dano_final = dano_base × multiplicador × (1 + bônus_skill)\n\nESTRATÉGIA: encontrar o multiplicador (Float próximo a 1.0)\n  Busque Float 1.0 em região A → muitos resultados\n  Use uma skill que aumenta dano (ex: buff +50%)\n  Refine Float 1.5 → reduz drasticamente\n  Tire o buff (volta para 1.0)\n  Refine Float 1.0\n  \n  Sobram poucos. Modifique para 100.0 ou 1000.0\n  → Cada hit faz 100x ou 1000x o dano normal\n\nALTERNATIVA: dano base (Dword)\n  Personagem tem 'Ataque: 250'\n  Busque Dword 250\n  Equipe arma diferente → 'Ataque: 320'\n  Refine Dword 320\n  Modifique para 999999\n  → Dano absurdo em todas as armas\n\nCUIDADOS:\n  - Dano insanamente alto pode causar bugs visuais\n    (números fora da tela, animações de morte travam)\n  - Em jogos online, dano impossível = ban imediato\n  - Bosses imunes podem ainda te matar — modifique HP também"}
      />

      <h2>Referência rápida de tipos por hack</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Hack</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo provável</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Fallback</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Região</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Dificuldade</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Moedas / Ouro", "Dword", "Float → XOR (4b)", "Ca", "⭐ Fácil"],
              ["HP / Vida", "Float", "Dword → XOR Float", "Ca", "⭐ Fácil"],
              ["Velocidade", "Float", "Double", "Ca / A", "⭐⭐ Médio"],
              ["Munição (carregador)", "Byte / Word", "Dword", "Ca", "⭐ Fácil"],
              ["Munição (reserva)", "Word / Dword", "—", "Ca", "⭐ Fácil"],
              ["Coordenadas (X,Y,Z)", "Float (×3)", "Double (×3)", "Ca", "⭐⭐ Médio"],
              ["Timer / Cooldown", "Float", "Dword (ms)", "Ca / A", "⭐⭐ Médio"],
              ["Level / XP", "Dword", "Float / Qword", "Ca", "⭐ Fácil"],
              ["Flag de desbloqueio", "Byte", "Dword (0/1)", "Cb / Ca", "⭐⭐⭐ Difícil"],
              ["Stamina / Energia", "Float", "Dword", "Ca", "⭐ Fácil"],
              ["Multiplicador dano", "Float (~1.0)", "Dword", "Ca", "⭐⭐ Médio"],
              ["Recoil (FPS)", "Float (0.0-1.0)", "—", "Ca", "⭐⭐⭐ Difícil"],
              ["ID de item gacha", "Dword (1000+)", "Word", "Ca", "⭐⭐⭐⭐ Muito Difícil"],
              ["Cap de nível", "Dword (constante)", "Byte", "Xa", "⭐⭐⭐⭐ Muito Difícil"],
              ["Velocidade do tempo", "Float (geralmente 1.0)", "Double", "Ca", "⭐⭐⭐ Difícil"],
            ].map(([hack, tipo, fallback, regiao, dif], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{hack}</td>
                <td className="px-4 py-2 border border-border text-primary text-sm font-mono">{tipo}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{fallback}</td>
                <td className="px-4 py-2 border border-border text-secondary text-sm font-mono">{regiao}</td>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{dif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="success" title="Próximo nível: automação">
        Cansado de fazer todas essas buscas manualmente toda sessão? Vá para <strong>Scripts Lua</strong> e aprenda a automatizar todo esse processo em scripts que executam todos os hacks com 1 clique.
      </AlertBox>
    </PageContainer>
  );
}
