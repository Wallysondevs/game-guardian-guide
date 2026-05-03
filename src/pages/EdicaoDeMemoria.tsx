import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function EdicaoDeMemoria() {
  return (
    <PageContainer
      title="Edição de Memória"
      subtitle="Técnicas avançadas para modificar, congelar e manipular valores na memória de jogos Android — modificações simples, freeze, ponteiros, structs, edição em lote e padrões avançados."
      difficulty="intermediario"
      timeToRead="26 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"RAM editing"}</strong> {' — '} {"modifica valores em memória do processo."}
          </li>
        <li>
            <strong>{"Endereço"}</strong> {' — '} {"posição em memória onde o valor mora."}
          </li>
        <li>
            <strong>{"Tipo"}</strong> {' — '} {"int32, float, double, byte — escolha errada = lixo."}
          </li>
        <li>
            <strong>{"Salvamento"}</strong> {' — '} {"muitos jogos salvam estado em arquivo — edite ambos."}
          </li>
        <li>
            <strong>{"Frozen"}</strong> {' — '} {"GG mantém valor congelado mesmo se o jogo escrever por cima."}
          </li>
        </ul>
        <AlertBox type="info" title="O que você vai aprender">
        Como modificar valores, congelá-los (freeze), trabalhar com ponteiros, usar offsets, manipular structs de objetos de jogos e realizar edições programáticas em lote — do simples ao avançado. Esta é a aplicação prática de tudo que você aprendeu nas seções anteriores.
      </AlertBox>

      <h2>Modificação simples de valor</h2>
      <p>
        Após encontrar o endereço correto via busca, você modifica o valor diretamente. Esse é o caso mais comum e onde a maioria dos hacks acaba — não há nada mais a fazer depois de identificar o endereço e definir um novo valor.
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", title: "Selecione o endereço", desc: "Na lista de resultados da busca, toque e segure no endereço ou marque a caixa de seleção.", detail: "Para selecionar vários: marque a primeira caixa, depois toque longo na última e escolha 'Selecionar intervalo'. Ou toque em 'Selecionar tudo' no menu superior se quiser todos." },
          { n: "2", title: "Toque em Editar (lápis ✏️)", desc: "Aparece o campo para digitar o novo valor.", detail: "Você pode digitar qualquer valor dentro do intervalo do tipo de dado escolhido. Para Float, separe parte inteira e decimal com ponto (100.0 não 100,0)." },
          { n: "3", title: "Digite o novo valor", desc: "Ex: 999999 para moedas, 9999.0 para vida como Float, 0 para zerar cooldowns.", detail: "Para valores negativos (ex: força que começa do zero e vai subindo), tente valores negativos grandes como -1 ou -1000. Aceita também expressões: v+100 (valor atual + 100), v*2 (dobrar), v/2 (metade)." },
          { n: "4", title: "Confirme e volte ao jogo", desc: "O valor é escrito imediatamente na memória. Volte ao jogo para verificar.", detail: "Se o valor voltou ao normal, o jogo está sobrescrevendo — use freeze ou encontre o ponteiro correto. Se o jogo crashou, o valor era inválido para o tipo (overflow, divisão por zero) — tente valor menor." },
          { n: "5", title: "Salve nos favoritos", desc: "Toque longo no endereço modificado → Adicionar aos favoritos → dê um nome descritivo.", detail: "Próxima vez que precisar (mesmo após reiniciar o jogo, se o endereço for estático), acesse direto pelos favoritos sem refazer toda a busca." },
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

      <h2>Expressões matemáticas no campo de edição</h2>
      <p>
        O GG aceita expressões simples no campo de edição, usando <code>v</code> como placeholder do valor atual:
      </p>
      <CodeBlock
        language="text"
        title="Expressões úteis para edição"
        code={"v       = manter valor atual (sem mudança)\nv+100   = somar 100 ao valor atual\nv-50    = subtrair 50 do valor atual\nv*2     = dobrar o valor\nv/2     = dividir pela metade\nv*1.5   = multiplicar por 1.5x (útil para velocidade)\n9999    = definir valor fixo 9999 (sem usar v)\n-1      = definir valor negativo (-1 = 'sempre full HP' em jogos\n          que decrementam HP normalmente, fica negativo grande\n          em representação unsigned)\n0       = zerar (útil para cooldowns)\n0xFFFF  = hexadecimal (= 65535)\n\n// Em lote, se selecionar 10 endereços e digitar v+100,\n// cada um recebe seu próprio valor + 100. Útil para\n// aumentar todas as estatísticas de uma vez sem perder\n// proporção entre elas."}
      />

      <h2>Freeze (congelamento de valores)</h2>
      <p>
        Congelar um endereço faz o GG reescrever continuamente o valor definido — mesmo que o jogo tente alterá-lo. É como uma guerra de escrita: o jogo escreve 99 HP (você tomou dano), o GG imediatamente escreve 9999 de volta, antes do jogo desenhar o frame seguinte. Resultado: visualmente, o HP nunca muda.
      </p>
      <AlertBox type="warning" title="Freeze consome CPU">
        Quanto mais endereços congelados simultaneamente, maior o uso de CPU. Cada endereço congelado é uma escrita por intervalo de freeze (configurável, geralmente 100-500ms). Congele apenas o necessário. Em dispositivos fracos, freeze de 50+ endereços pode causar lag severo no jogo.
      </AlertBox>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo de Freeze</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Como ativar</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Comportamento</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Freeze simples", "Selecionar endereço → ícone de cadeado 🔒", "Mantém o valor exatamente como está no momento do freeze"],
              ["Freeze com valor", "Editar valor + ativar freeze", "Congela no valor que você definiu, não no atual"],
              ["Freeze incremental", "Script Lua com loop de escrita", "Aumenta o valor continuamente (útil para XP, stamina)"],
              ["Freeze de grupo", "Selecionar vários → freeze em conjunto", "Congela múltiplos endereços de uma vez"],
              ["Freeze condicional (script)", "Lua: if condicao then setValue end", "Só congela quando uma condição é satisfeita (ex: só em combate)"],
              ["Freeze pausado", "GG → Freezes ativos → toque em pause", "Mantém favorito mas para de reescrever temporariamente"],
              ["Freeze com range", "Edit value: '50;100' → freeze", "Mantém valor dentro de um intervalo, ajusta se sair"],
            ].map(([tipo, como, comportamento], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-primary text-sm">{tipo}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{como}</td>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{comportamento}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Quando usar freeze vs edição única</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-blue-500">
          <h4 className="font-bold text-foreground mb-2">Use freeze quando:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>✓ O valor diminui ao longo do tempo (HP em combate, stamina ao correr)</li>
            <li>✓ O valor é decrementado por ações (gastar moedas, usar munição)</li>
            <li>✓ Você quer manter um buff/multiplicador permanentemente</li>
            <li>✓ Cooldown de skills (freeze em 0 = sem cooldown)</li>
            <li>✓ Valores que o jogo recalcula a cada frame</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-yellow-500">
          <h4 className="font-bold text-foreground mb-2">Use edição única quando:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>✓ Definir level/XP para um valor desejado uma vez</li>
            <li>✓ Mudar nome/skin de personagem</li>
            <li>✓ Modificar configurações persistentes do jogo</li>
            <li>✓ Quando freeze causa detecção (anti-cheats notam padrão)</li>
            <li>✓ Quando valor não é alterado pelo jogo após edição</li>
          </ul>
        </div>
      </div>

      <h2>Ponteiros — encontrando o endereço permanente</h2>
      <p>
        Em jogos modernos, os objetos são alocados dinamicamente na heap. O endereço de HP do seu personagem pode ser diferente a cada sessão — e até a cada novo carregamento de fase, em alguns casos. A solução é encontrar o <strong>ponteiro</strong> — um endereço fixo (estático no executável) que aponta para o endereço variável.
      </p>
      <CodeBlock
        language="text"
        title="Conceito de ponteiro na memória"
        code={"// Sessão 1:\nEndereço fixo: 0x12345678  →  aponta para  →  0xABCD1234 (HP = 100)\n\n// Sessão 2 (game reiniciado):\nEndereço fixo: 0x12345678  →  aponta para  →  0xDEAD5678 (HP = 100)\n\n// Sessão 3 (fase carregada de novo):\nEndereço fixo: 0x12345678  →  aponta para  →  0xFEED9999 (HP = 100)\n\n// O endereço 0x12345678 SEMPRE contém o endereço atual do HP\n// independente de onde na memória o objeto Personagem foi alocado.\n// Se você guardar 0x12345678 nos favoritos, na próxima sessão\n// continua funcionando: lê o ponteiro, segue para o endereço\n// alvo, edita o HP.\n\n// Cadeia de ponteiros (pointer chain):\n// Em casos complexos, há múltiplos níveis:\n// 0x12345678 → 0xAAAA0000 → +0x10 → 0xBBBB0000 → +0x40 → HP\n//\n// O GG suporta até 6 níveis de ponteiros encadeados em\n// favoritos avançados (estrutura semelhante à do Cheat Engine)."}
      />
      <h3>Como encontrar ponteiros no GG</h3>
      <div className="grid grid-cols-1 gap-3 my-4 not-prose">
        {[
          { n: "1", title: "Anote o endereço encontrado", desc: "Depois de encontrar o HP via busca, anote o endereço. Ex: 0xABCD1234.", detail: "Toque e segure o endereço → Copiar. Cole em um app de notas para guardar." },
          { n: "2", title: "Busque pelo endereço como Dword/Qword", desc: "Agora busque na memória por quem aponta para esse endereço. Digite o endereço como valor Dword (32-bit) ou Qword (64-bit).", detail: "Em dispositivos 64-bit (a maioria desde 2020), use Qword. Em 32-bit, use Dword. Para incerteza, busque ambos." },
          { n: "3", title: "Encontre ponteiros estáticos", desc: "Dos resultados, identifique endereços que ficam fixos entre reinicializações. Esses são os ponteiros reais.", detail: "Endereços na região de executável (Xa) ou BSS (Cb) tendem a ser estáticos. Endereços muito altos (>0x70000000) em ARM64 geralmente são bibliotecas carregadas — também relativamente estáveis dentro da sessão." },
          { n: "4", title: "Use offset para navegar", desc: "Muitas vezes o ponteiro aponta para o início da struct. O HP pode estar em offset +0x10, MP em +0x14, etc.", detail: "Use GG → Ver região de memória para navegar pelos bytes ao redor do ponteiro e mapear a struct inteira." },
          { n: "5", title: "Salve ponteiro nos favoritos", desc: "Adicione o endereço do ponteiro aos favoritos → marque como 'Pointer' no tipo → defina o offset onde fica o valor real.", detail: "GG passará a seguir o ponteiro automaticamente, sempre lendo o endereço atual antes de editar o valor." },
          { n: "6", title: "Verifique entre sessões", desc: "Feche o jogo e o GG. Reabra ambos. Confira se o favorito do ponteiro ainda funciona.", detail: "Se funcionar: sucesso, você tem um ponteiro estável. Se não funcionar: o ponteiro também muda — você precisa subir mais um nível na cadeia (ponteiro do ponteiro)." },
        ].map((item) => (
          <div key={item.n} className="bg-card border border-border rounded-xl p-4">
            <div className="flex gap-3 items-start">
              <span className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-foreground/80 mb-1">{item.desc}</p>
                <p className="text-xs text-muted-foreground italic">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Navegação por offsets (estruturas de dados)</h2>
      <p>
        Uma vez encontrado um endereço de referência (como o HP), os outros atributos do personagem estão próximos na memória. Isso é porque jogos armazenam objetos em <strong>structs</strong> contíguas — uma única alocação de memória que contém todos os campos do objeto, dispostos sequencialmente.
      </p>
      <CodeBlock
        language="text"
        title="Exemplo de struct de personagem em memória"
        code={"Base address: 0xABCD1000\n\nOffset  Tipo     Campo               Valor\n+0x00   Float    HP atual            150.0\n+0x04   Float    HP máximo           200.0\n+0x08   Float    MP atual            80.0\n+0x0C   Float    MP máximo           100.0\n+0x10   Dword    Level               15\n+0x14   Dword    XP atual            45230\n+0x18   Dword    XP para próximo     50000\n+0x1C   Float    Velocidade          5.5\n+0x20   Float    Pos X               123.45\n+0x24   Float    Pos Y               67.89\n+0x28   Float    Pos Z               10.0\n+0x2C   Float    Rotação Yaw         45.0\n+0x30   Dword    Stat Força          25\n+0x34   Dword    Stat Destreza       18\n+0x38   Dword    Stat Inteligência   30\n+0x3C   Dword    Stat Constituição   22\n+0x40   Byte     IsAlive (flag)      1\n+0x41   Byte     IsInCombat (flag)   0\n+0x42   Byte     ClasseId            3 (= mago)\n+0x43   Byte     Padding             0\n+0x44   Dword    Gold                12500\n+0x48   Dword    InventarioCount     45\n\n// Se você encontrou HP em 0xABCD1000:\n// MaxHP está em 0xABCD1000 + 0x04 = 0xABCD1004\n// Level está em 0xABCD1000 + 0x10 = 0xABCD1010\n// Pos X está em 0xABCD1000 + 0x20 = 0xABCD1020\n// Gold está em 0xABCD1000 + 0x44 = 0xABCD1044\n//\n// IMPORTANTE: o GG tem botão 'Pesquisar valores próximos'\n// que automatiza isso. Após encontrar HP, ele sugere\n// outros valores (Float, Dword) em offsets pequenos para\n// você identificar os campos relacionados."}
      />

      <h2>Modificação em lote — múltiplos endereços</h2>
      <p>
        O GG permite operar em múltiplos endereços de uma vez, economizando muito tempo quando você tem grupos relacionados (ex: stats de um personagem):
      </p>
      <CodeBlock
        language="text"
        title="Editando grupo de endereços de uma vez"
        code={"// Selecione vários endereços na lista de resultados:\n// Toque e segure → Selecionar tudo OU\n// Marque individualmente cada caixa de seleção OU\n// Toque longo no primeiro, depois no último,\n// escolha 'Selecionar intervalo'\n\n// Com vários selecionados → Editar:\n// - Você pode definir um valor fixo igual para todos:\n//   9999999  = todos viram 9999999\n//\n// - Ou usar expressões matemáticas:\n//   v+1000   = cada valor recebe seu valor + 1000\n//   v*2      = cada valor é dobrado\n//   v        = mantém valor (útil para apenas freezeer)\n//\n// - Operações condicionais via script Lua:\n//   if v < 100 then return 100 else return v\n//   (sobe valores baixos para 100, mantém os altos)\n\n// FREEZE EM LOTE:\n// Selecione vários → toque no cadeado no menu superior\n// Todos passam a ser congelados simultaneamente\n// Para descongelar todos: cadeado novamente"}
      />

      <h2>Padrões avançados de edição</h2>
      <h3>Padrão 1: Edição instantânea para vencer</h3>
      <p>
        Em luta de boss difícil: encontre o HP do boss, espere começar a luta, edite o HP do boss para 1. Próximo ataque seu mata. Útil quando o boss tem HP enorme e você quer pular o grind. Não use freeze (boss precisa de 1 hit para morrer, depois HP vai para 0).
      </p>
      <h3>Padrão 2: Refrigerar cooldowns</h3>
      <p>
        Encontre todos os cooldowns ativos (Float, contagem regressiva). Use script para colocar todos em 0 simultaneamente sempre que detectar que algum está acima de 0.1. Resultado: skills sempre disponíveis sem freeze persistente que poderia ser detectado.
      </p>
      <h3>Padrão 3: Auto-pickup de itens</h3>
      <p>
        Em jogos onde itens caem mas você precisa coletar manualmente: encontre o array de itens caídos e a flag 'coletado'. Script percorre array e marca todos como coletados a cada 1 segundo.
      </p>
      <h3>Padrão 4: One-shot kill consistente</h3>
      <p>
        Em vez de freeze de damage no máximo (suspeito), encontre o multiplicador de dano (geralmente Float próximo de 1.0). Mude para 100.0 ou 1000.0. Visualmente o jogador parece muito forte, mas o sistema interno reconhece como "valor multiplicado normal" — menos suspeito que dano direto.
      </p>
      <h3>Padrão 5: Modificação reversa</h3>
      <p>
        Em vez de modificar HP do jogador para infinito, modifique o dano dos inimigos para 0. Mais sutil — anti-cheat foca em verificar HP do jogador, não dano de NPCs.
      </p>

      <h2>Gravando endereços (Favoritos)</h2>
      <p>
        Após encontrar os endereços corretos, salve-os como favoritos para não precisar refazer a busca toda vez.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Salvar como favorito", desc: "Toque e segure o endereço → Adicionar a favoritos. Dê um nome descritivo como 'HP Personagem' ou 'Gold Inventario'." },
          { titulo: "Salvar com offset", desc: "Para favoritos derivados de uma struct: salve o endereço base, depois use 'Offset' nos detalhes para apontar para o campo específico." },
          { titulo: "Categorias de favoritos", desc: "Organize por jogo: 'Genshin/HP', 'Genshin/Stamina', 'PUBG/recoil'. Use barra '/' no nome do favorito para criar hierarquia." },
          { titulo: "Exportar/importar favoritos", desc: "GG → Favoritos → Menu → Exportar para .txt. Compartilhe com outros usuários ou guarde como backup. Importação aceita o mesmo formato." },
          { titulo: "Usar com script Lua", desc: "Exporte os endereços como variáveis no script para acesso direto sem busca manual. local hp_addr = 0xABCD1234." },
          { titulo: "Compartilhar resultados", desc: "GG permite exportar endereços como texto formatado. Comunidade do GG (gameguardian.net/forum) compartilha listas para jogos populares." },
          { titulo: "Lista de memória", desc: "Acesse Ferramentas → Lista de Memória para ver todos os endereços salvos e editá-los em lote — visualização global e poderosa." },
          { titulo: "Backup automático", desc: "Configurações → Backup → ative backup automático de favoritos. Salva em /sdcard/GameGuardian/backups/ a cada modificação." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <AlertBox type="success" title="Dica: use scripts Lua para automatizar a modificação">
        Em vez de repetir os passos manualmente toda sessão, escreva um script Lua que encontra o endereço e modifica automaticamente. Veja a seção Scripts Lua para exemplos completos. Um bom script transforma 5 minutos de trabalho manual em 1 toque.
      </AlertBox>

      <h2>Problemas comuns na edição</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { problema: "Valor voltou ao normal após alguns segundos", causa: "O jogo está sobrescrevendo o valor via timer, lógica de jogo ou validação interna", solucao: "Use freeze (cadeado) para manter o valor constantemente. Se o freeze não vencer (intervalos curtos), aumente a frequência em Configurações → Performance → Freeze interval para 50-100ms." },
          { problema: "Freeze não funciona — valor ainda muda", causa: "O jogo usa validação server-side, calcula o valor em múltiplos endereços, ou recalcula a cada frame", solucao: "Encontre todos os endereços com aquele valor e freeze todos simultaneamente. Para validação server-side: não há solução client-side, valor real está no servidor." },
          { problema: "Encontrei o endereço mas ao modificar o jogo crasha", causa: "O valor modificado causou overflow, divisão por zero ou estado inválido", solucao: "Tente valores mais conservadores. Ex: 9999 em vez de 999999999. Para Float, evite NaN, infinito (1e30+) e zero (pode causar div/0)." },
          { problema: "O valor modificado não aparece na UI do jogo", causa: "O jogo tem um endereço para UI display e outro para lógica real", solucao: "Encontre o endereço da UI separadamente — procure o valor que aparece na tela. Modifique ambos: o de display e o de lógica." },
          { problema: "Edição funciona em um lugar, não em outro", causa: "Múltiplas instâncias da struct (HP do jogador 1 vs jogador 2 vs NPCs)", solucao: "Você modificou a struct errada. Faça refinamento mais agressivo (mude valor 5+ vezes) para isolar exatamente a struct do seu personagem." },
          { problema: "Após modificar, jogo entra em estado bugado mas não crasha", causa: "Modificou flag de estado interno (ex: 'is dead' = true mesmo com HP > 0)", solucao: "Você modificou um endereço próximo mas não exatamente o que queria. Refaça a busca, agora com refinamento mais cuidadoso." },
          { problema: "Freeze causa lag massivo no jogo", causa: "Muitos endereços freezados ou intervalo muito curto", solucao: "Reduza para 5-10 endereços freezados. Aumente intervalo para 500ms-1s em GG → Configurações." },
          { problema: "Modificou pero ao reiniciar fase volta tudo", causa: "Endereço era válido apenas para essa instância da fase. Nova alocação = novo endereço.", solucao: "Encontre o ponteiro estático (veja seção sobre ponteiros). Salve o ponteiro como favorito para acesso entre sessões." },
        ].map((item) => (
          <div key={item.problema} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
            <h4 className="font-bold text-destructive mb-1 text-sm">{item.problema}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <AlertBox type="info" title="Próximo passo">
        Você agora domina a edição manual. Vá para <strong>Hacks Populares</strong> para ver exemplos práticos passo a passo dos hacks mais comuns, ou pule para <strong>Scripts Lua</strong> para automatizar todo esse processo.
      </AlertBox>
    </PageContainer>
  );
}
