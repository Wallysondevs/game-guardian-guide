import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function TiposDeBusca() {
    return (
      <PageContainer
        title="Tipos de Busca"
        subtitle="Todos os métodos de busca do Game Guardian — do valor exato à decodificação de valores encriptados com XOR."
        difficulty="intermediario"
        timeToRead="20 min"
      >
        <AlertBox type="info" title="Dominar os tipos de busca é a habilidade mais importante no GG">
          A maioria dos fracassos ao usar o Game Guardian ocorre por usar o tipo de dado errado. Este guia cobre todos os tipos disponíveis com exemplos práticos e o que fazer quando a busca não retorna nada.
        </AlertBox>

        <h2>Tipos de dados numéricos</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tamanho</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Intervalo</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Uso típico</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Byte", "1 byte", "0 a 255", "Flags de status, buffs, contadores pequenos"],
                ["Word (2 bytes)", "2 bytes", "0 a 65.535", "Vida em jogos antigos, municão"],
                ["Dword (4 bytes)", "4 bytes", "0 a 4 bilhões", "Moedas, XP, pontuações — o mais comum"],
                ["Qword (8 bytes)", "8 bytes", "0 a 18 quintilhões", "Valores muito grandes, timestamps"],
                ["Float (4 bytes)", "4 bytes", "±3.4×10³⁸", "Vida, velocidade, coordenadas, stamina"],
                ["Double (8 bytes)", "8 bytes", "±1.7×10³⁰⁸", "Coordenadas de alta precisão, física"],
                ["XOR (4 bytes)", "4 bytes", "0 a 4 bilhões (mascarado)", "Valores encriptados com chave XOR"],
                ["XOR (8 bytes)", "8 bytes", "Qualquer Qword mascarado", "Encriptação XOR de 64 bits"],
                ["Auto", "variável", "Qualquer", "GG testa todos os tipos — mais lento"],
              ].map(([tipo, tam, range, uso], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-mono text-primary text-sm font-bold">{tipo}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{tam}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{range}</td>
                  <td className="px-4 py-2 border border-border text-foreground text-sm">{uso}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Busca por valor exato</h2>
        <p>
          O método base. Você conhece o valor exato que aparece no jogo e digita esse número. Funciona para a maioria dos jogos que não usam encriptação.
        </p>
        <CodeBlock
          language="text"
          title="Exemplo: buscar 1250 moedas como Dword"
          code={"Tipo: Dword (4 bytes)\nValor: 1250\nRegião: Ca (Cache — mais rápida)\n\n// Se não encontrar em Ca, tente:\nRegião: A (All — busca em toda a memória)\n\n// Se ainda não encontrar, tente:\nTipo: Float\nValor: 1250.0"}
        />

        <h2>Busca por intervalo (range)</h2>
        <p>
          Quando você não sabe o valor exato mas conhece um intervalo. Extremamente útil quando o jogo mostra valores arredondados na UI mas armazena o valor real com casas decimais.
        </p>
        <CodeBlock
          language="text"
          title="Sintaxe de intervalo"
          code={"Sintaxe: valor_min;valor_max\n\nExemplo: 500;700\n// Encontra todos os endereços com valor entre 500 e 700\n\nExemplo com Float:\n98.0;102.0\n// Útil quando a vida mostra '100' mas é float 100.0 ± ruído"}
        />
        <AlertBox type="success" title="Truque: busca fuzzy com intervalo">
          Se seu personagem tem 847 de HP mas você não tem certeza se é exatamente 847 ou um float como 847.23, busque <strong>840;850</strong> como Float. Você vai encontrar mesmo com pequenas diferenças.
        </AlertBox>

        <h2>Busca por valor desconhecido (Unknown)</h2>
        <p>
          Quando você não sabe absolutamente nada sobre o valor — nem o número, nem o intervalo. O GG tira um snapshot de toda a memória e depois você usa operadores relacionais para refinar.
        </p>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { n: "1", title: "Snapshot inicial", desc: "Toque em Buscar → deixe o campo vazio → selecione tipo → clique em '??' (Desconhecido). O GG salva um snapshot de toda a região de memória selecionada.", warn: "Pode demorar 10-30 segundos dependendo da região." },
            { n: "2", title: "Faça algo no jogo", desc: "Perca vida, gaste recursos, aumente o nível — qualquer ação que mude o valor que você quer encontrar.", warn: "Quanto mais específica a mudança, mais eficiente o refinamento." },
            { n: "3", title: "Refine com operador", desc: "Toque em Buscar novamente. Selecione 'Diminuiu' se perdeu, 'Aumentou' se ganhou, 'Mudou' se não sabe a direção, 'Não mudou' para eliminar variáveis.", warn: "Não coloque número — apenas o operador." },
            { n: "4", title: "Repita", desc: "Continue fazendo ações no jogo e refinando. Em 5-10 ciclos geralmente resta 1-5 endereços.", warn: "Freeze o valor para identificar qual é o correto." },
          ].map((item) => (
            <div key={item.n} className="bg-card border border-border rounded-xl p-5">
              <div className="flex gap-3 items-start">
                <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground/80 mb-1">{item.desc}</p>
                  <p className="text-xs text-muted-foreground italic">{item.warn}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Busca XOR — quebrando encriptação básica</h2>
        <AlertBox type="warning" title="Por que jogos usam XOR?">
          Muitos jogos Android encriptam valores sensíveis na memória usando XOR com uma chave gerada aleatoriamente em cada sessão. O objetivo é dificultar exatamente o que estamos fazendo. O GG tem suporte nativo para quebrar XOR de 4 e 8 bytes.
        </AlertBox>
        <p>
          A operação XOR funciona assim: se o valor real é <strong>100</strong> e a chave é <strong>12345</strong>, o valor armazenado na memória é <strong>100 XOR 12345 = 12281</strong>. O jogo guarda a chave em outro endereço e reconstrói o valor real na hora de usá-lo.
        </p>
        <CodeBlock
          language="text"
          title="Como funciona o XOR internamente"
          code={"Valor real:    100      = 0x00000064\nChave XOR:     12345    = 0x00003039\nValor na RAM:  100 ^ 12345 = 0x0000305D (12381)\n\n// O que você vê no GG ao buscar 100 como Dword: NADA\n// O que você precisa fazer: selecionar tipo XOR e buscar 100\n// O GG testa todas as chaves possíveis automaticamente"}
        />
        <h3>Passo a passo: busca XOR</h3>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { n: "1", title: "Identificar que o valor está encriptado", desc: "Você busca o valor como Dword/Float e não encontra nada, ou encontra mas freeze não tem efeito. Sinal claro de encriptação.", detail: "Outros sinais: valor muda aleatoriamente entre sessões, busca retorna 0 resultados mesmo com região A." },
            { n: "2", title: "Selecionar tipo XOR", desc: "Na tela de busca, toque no seletor de tipo e escolha 'XOR (4 bytes)'. Para valores grandes use 'XOR (8 bytes)'.", detail: "O GG também aceita XOR em Word (2 bytes) para jogos mais antigos." },
            { n: "3", title: "Digitar o valor visível", desc: "Digite o valor que APARECE no jogo — o valor real, não o encriptado. Ex: se você tem 500 de ouro, digite 500.", detail: "O GG vai internamente testar XOR(500, chave) para milhares de chaves possíveis." },
            { n: "4", title: "Buscar com região A", desc: "Use região 'A' (All) pois a chave e o valor podem estar em regiões diferentes. A busca XOR é mais lenta — pode demorar 1-2 minutos.", detail: "Tenha paciência. A região Ca pode não funcionar para XOR." },
            { n: "5", title: "Refinar normalmente", desc: "Mude o valor no jogo e refine com o novo valor. O GG mantém o tipo XOR no refinamento automático.", detail: "Geralmente 2-3 refinamentos são suficientes após o XOR correto ser isolado." },
            { n: "6", title: "Verificar e modificar", desc: "Selecione os resultados restantes e tente congelar. Se o valor no jogo ficar fixo, você encontrou. Altere para o valor desejado.", detail: "Ao modificar, o GG calcula automaticamente o valor XOR correto para armazenar na memória." },
          ].map((item) => (
            <div key={item.n} className="bg-card border border-border rounded-xl p-5">
              <div className="flex gap-3 items-start">
                <span className="w-8 h-8 rounded-full bg-secondary text-secondary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
                <div>
                  <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                  <p className="text-sm text-foreground/80 mb-2">{item.desc}</p>
                  <p className="text-xs text-muted-foreground italic">{item.detail}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <AlertBox type="success" title="Script Lua para busca XOR automática">
          Em vez de usar a UI, você pode automatizar a busca XOR com um script Lua. Veja a seção Scripts Avançados para exemplos de scripts que fazem busca XOR e refinamento em loop.
        </AlertBox>

        <h2>O que fazer quando a busca não retorna nada</h2>
        <p>
          Esta é a situação mais frustrante para quem está começando. Há uma sequência lógica de tentativas:
        </p>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tentativa</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">O que fazer</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Motivo</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["1ª", "Tente Float em vez de Dword", "Vida, velocidade e stamina são quase sempre Float"],
                ["2ª", "Mude a região de Ca para A (All)", "O valor pode estar em região não-cache"],
                ["3ª", "Tente XOR (4 bytes) com o mesmo valor", "Jogo usa encriptação XOR básica"],
                ["4ª", "Tente busca por intervalo ±20%", "Valor pode ser arredondado na UI"],
                ["5ª", "Tente valor × 100 ou ÷ 100", "Alguns jogos armazenam 100 como 10000 ou 1.0"],
                ["6ª", "Tente valor negativo (-100)", "Raramente, jogos guardam o inverso do valor"],
                ["7ª", "Use busca por valor desconhecido", "Quando não sabe como o valor está formatado"],
                ["8ª", "Verifique se o jogo tem validação server-side", "Se sim, modificação local não tem efeito"],
              ].map(([tentativa, oque, motivo], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-bold text-primary text-sm">{tentativa}</td>
                  <td className="px-4 py-2 border border-border text-foreground text-sm">{oque}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{motivo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Busca por texto (String)</h2>
        <p>
          Encontra sequências de texto na memória. Útil para localizar identificadores de itens, nomes de personagens e referências a conteúdo premium.
        </p>
        <CodeBlock
          language="text"
          title="Busca por string — exemplos"
          code={"// Encontrar referências a diamantes em qualquer encoding:\nTipo: UTF-8  | Valor: diamond\nTipo: UTF-16 | Valor: diamond   (jogos Unity geralmente usam UTF-16)\n\n// Encontrar nome do personagem:\nTipo: UTF-8  | Valor: SeuNome\n\n// Após encontrar o endereço do texto, analise\n// os endereços próximos — geralmente há valores\n// numéricos (contagem de itens) adjacentes na struct"}
        />

        <h2>Busca hexadecimal</h2>
        <p>
          Para usuários avançados. Permite buscar sequências exatas de bytes, incluindo wildcards. Essencial para encontrar estruturas de dados complexas e instruções de código ARM.
        </p>
        <CodeBlock
          language="text"
          title="Busca hexadecimal com wildcards"
          code={"// Buscar Dword 100 em little-endian:\n64 00 00 00\n\n// Buscar float 100.0 (IEEE 754):\n00 00 C8 42\n\n// Wildcard com ??:\n64 00 ?? 00\n// Encontra: 64 00 00 00, 64 00 FF 00, 64 00 AB 00...\n\n// Padrão de struct de personagem (HP + MaxHP + Level):\n?? ?? ?? ??  64 00 00 00  01 00 00 00\n//          HP(qualquer) MaxHP=100   Level=1"}
        />

        <h2>Busca em grupo (múltiplos valores simultâneos)</h2>
        <p>
          Busca por vários valores ao mesmo tempo em endereços consecutivos. Ideal para encontrar structs de personagem onde HP, MP e Level ficam lado a lado na memória.
        </p>
        <CodeBlock
          language="text"
          title="Busca em grupo — struct de personagem"
          code={"// Sintaxe: valor1;valor2;valor3  tipo  offset\n// offset = distância em bytes entre cada valor\n\n// HP=150, MP=80, Level=10 em sequência (offset 4 bytes cada):\n150;80;10  tipo:Dword  offset:4\n\n// Coordenadas X,Y,Z de um personagem (float, offset 4):\n123.5;456.2;10.0  tipo:Float  offset:4\n\n// Útil para jogos Unity onde Stats ficam em C# struct:\n// [HP][MaxHP][MP][MaxMP][Level][Exp]\n// tudo com offset de 4 bytes"}
        />

        <AlertBox type="info" title="Dica de ouro: busca em grupo para coordenadas">
          Em jogos 3D, localizar o endereço de posição X do personagem é o primeiro passo para hacks de teleporte. Use busca em grupo Float com as coordenadas aproximadas que você vê no minimapa. Uma vez encontrado X, Y e Z estão a 4 e 8 bytes de distância.
        </AlertBox>

        <h2>Operadores de refinamento</h2>
        <div className="not-prose overflow-x-auto my-4">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Operador</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Sintaxe GG</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Quando usar</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Igual", "= 1250", "Valor exato conhecido"],
                ["Diferente", "≠ (sem valor)", "Valor mudou mas não sabe para quê"],
                ["Menor que", "< 1250", "Valor diminuiu (gastou recursos)"],
                ["Maior que", "> 1250", "Valor aumentou (ganhou recursos)"],
                ["Intervalo", "1100;1400", "Novo valor está nesse intervalo"],
                ["Não mudou", "= (sem valor, Não mudou)", "Para eliminar valores voláteis"],
                ["Mudou", "≠ (sem valor, Mudou)", "Para filtrar apenas o que mudou"],
                ["Menor/igual", "≤ 1250", "Diminuiu ou ficou igual"],
                ["Maior/igual", "≥ 1250", "Aumentou ou ficou igual"],
              ].map(([op, sintaxe, quando], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-bold text-primary text-sm">{op}</td>
                  <td className="px-4 py-2 border border-border font-mono text-foreground text-sm">{sintaxe}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{quando}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Regiões de memória</h2>
        <p>
          Escolher a região certa acelera muito a busca e aumenta as chances de sucesso:
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { sigla: "Ca", nome: "Cache", desc: "Memória de acesso rápido. Contém a maioria dos valores de gameplay. Comece sempre aqui — é a mais rápida.", tag: "🟢 Recomendada" },
            { sigla: "A", nome: "All (Toda)", desc: "Varre toda a memória virtual do processo. Mais lenta mas encontra tudo. Use quando Ca falhar.", tag: "🟡 Fallback" },
            { sigla: "Xa", nome: "Executável", desc: "Região de código compilado. Útil para patches de instruções ARM/x86. Avançado.", tag: "🔴 Avançado" },
            { sigla: "Ps", nome: "Pseudo-heap", desc: "Heap do processo. Onde structs de objetos são alocadas. Útil para engines Unity/Unreal.", tag: "🟡 Intermediário" },
            { sigla: "Cb", nome: "C++ BSS", desc: "Variáveis estáticas não inicializadas. Às vezes contém contadores globais.", tag: "🟡 Intermediário" },
            { sigla: "S", nome: "Stack", desc: "Pilha de execução. Volátil — valores mudam a cada frame. Raramente útil.", tag: "⚫ Raramente" },
          ].map((item) => (
            <div key={item.sigla} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <code className="text-primary font-bold text-base">{item.sigla}</code>
                <span className="text-foreground font-semibold text-sm">{item.nome}</span>
                <span className="text-xs ml-auto">{item.tag}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="warning" title="Nunca modifique a região Xa sem saber o que está fazendo">
          Alterar código executável (região Xa) pode causar crash imediato do jogo ou corrupção do processo. Isso é território de engenharia reversa — diferente de modificar dados de gameplay.
        </AlertBox>
      </PageContainer>
    );
  }
  