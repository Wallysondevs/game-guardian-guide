import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function EdicaoDeMemoria() {
    return (
      <PageContainer
        title="Edição de Memória"
        subtitle="Técnicas avançadas para modificar, congelar e manipular valores na memória de jogos Android."
        difficulty="intermediario"
        timeToRead="18 min"
      >
        <AlertBox type="info" title="O que você vai aprender">
          Como modificar valores, congelá-los (freeze), trabalhar com ponteiros, usar offsets e manipular structs de objetos de jogos — do simples ao avançado.
        </AlertBox>

        <h2>Modificação simples de valor</h2>
        <p>
          Após encontrar o endereço correto via busca, você modifica o valor diretamente. Esse é o caso mais comum.
        </p>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { n: "1", title: "Selecione o endereço", desc: "Na lista de resultados da busca, toque e segure no endereço ou marque a caixa de seleção.", detail: "Para selecionar vários: marque a primeira, depois a última e toque em 'Selecionar intervalo'." },
            { n: "2", title: "Toque em Editar (lápis)", desc: "Aparece o campo para digitar o novo valor.", detail: "Você pode digitar qualquer valor dentro do intervalo do tipo de dado escolhido." },
            { n: "3", title: "Digite o novo valor", desc: "Ex: 999999 para moedas, 9999.0 para vida como Float.", detail: "Para valores negativos (ex: força que começa do zero e vai subindo), tente valores negativos grandes como -1." },
            { n: "4", title: "Confirme e volte ao jogo", desc: "O valor é escrito imediatamente na memória. Volte ao jogo para verificar.", detail: "Se o valor voltou ao normal, o jogo está sobrescrevendo — use freeze ou encontre o ponteiro correto." },
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

        <h2>Freeze (congelamento de valores)</h2>
        <p>
          Congelar um endereço faz o GG reescrever continuamente o valor definido — mesmo que o jogo tente alterá-lo. É como uma guerra de escrita: o jogo escreve 99 HP, o GG imediatamente escreve 9999 de volta.
        </p>
        <AlertBox type="warning" title="Freeze consome CPU">
          Quanto mais endereços congelados simultaneamente, maior o uso de CPU. Congele apenas o necessário. Em dispositivos fracos, freeze de muitos endereços pode causar lag severo.
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
                ["Freeze simples", "Selecionar endereço → ícone de cadeado", "Mantém o valor exatamente como está no momento do freeze"],
                ["Freeze com valor", "Editar valor + ativar freeze", "Congela no valor que você definiu, não no atual"],
                ["Freeze incremental", "Script Lua com loop de escrita", "Aumenta o valor continuamente (útil para XP, stamina)"],
                ["Freeze de grupo", "Selecionar vários → freeze em conjunto", "Congela múltiplos endereços de uma vez"],
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

        <h2>Ponteiros — encontrando o endereço permanente</h2>
        <p>
          Em jogos modernos, os objetos são alocados dinamicamente na heap. O endereço de HP do seu personagem pode ser diferente a cada sessão. A solução é encontrar o <strong>ponteiro</strong> — um endereço fixo que aponta para o endereço variável.
        </p>
        <CodeBlock
          language="text"
          title="Conceito de ponteiro na memória"
          code={"// Sessão 1:\nEndereço fixo: 0x12345678  →  aponta para  →  0xABCD1234 (HP = 100)\n\n// Sessão 2 (game reiniciado):\nEndereço fixo: 0x12345678  →  aponta para  →  0xDEAD5678 (HP = 100)\n\n// O endereço 0x12345678 sempre contém o HP correto\n// independente de onde na memória o objeto foi alocado"}
        />
        <h3>Como encontrar ponteiros no GG</h3>
        <div className="grid grid-cols-1 gap-3 my-4 not-prose">
          {[
            { n: "1", title: "Anote o endereço encontrado", desc: "Depois de encontrar o HP via busca, anote o endereço. Ex: 0xABCD1234.", detail: "Toque e segure o endereço → Copiar." },
            { n: "2", title: "Busque pelo endereço como Dword/Qword", desc: "Agora busque na memória por quem aponta para esse endereço. Digite o endereço como valor Dword (32-bit) ou Qword (64-bit).", detail: "Em dispositivos 64-bit, use Qword. Em 32-bit, use Dword." },
            { n: "3", title: "Encontre ponteiros estáticos", desc: "Dos resultados, identifique endereços que ficam fixos entre reinicializações. Esses são os ponteiros reais.", detail: "Endereços na região de executável (Xa) ou BSS (Cb) tendem a ser estáticos." },
            { n: "4", title: "Use offset para navegar", desc: "Muitas vezes o ponteiro aponta para o início da struct. O HP pode estar em offset +0x10, MP em +0x14, etc.", detail: "Use GG → Ver região de memória para navegar pelos bytes ao redor do ponteiro." },
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
          Uma vez encontrado um endereço de referência (como o HP), os outros atributos do personagem estão próximos na memória. Isso é porque jogos armazenam objetos em structs contíguas.
        </p>
        <CodeBlock
          language="text"
          title="Exemplo de struct de personagem em memória"
          code={"Base address: 0xABCD1000\n\n+0x00  Float    HP atual          = 150.0\n+0x04  Float    HP máximo          = 200.0\n+0x08  Float    MP atual           = 80.0\n+0x0C  Float    MP máximo          = 100.0\n+0x10  Dword    Level              = 15\n+0x14  Dword    XP atual           = 45230\n+0x18  Dword    XP para próximo nível = 50000\n+0x1C  Float    Velocidade         = 5.5\n+0x20  Float    Pos X              = 123.45\n+0x24  Float    Pos Y              = 67.89\n+0x28  Float    Pos Z              = 10.0\n\n// Se você encontrou HP em 0xABCD1000:\n// MaxHP está em 0xABCD1000 + 0x04 = 0xABCD1004\n// Level está em 0xABCD1000 + 0x10 = 0xABCD1010"}
        />

        <h2>Modificação em lote — múltiplos endereços</h2>
        <CodeBlock
          language="text"
          title="Editando grupo de endereços de uma vez"
          code={"// Selecione vários endereços na lista de resultados:\n// Toque e segure → Selecionar tudo OU\n// Marque individualmente cada caixa de seleção\n\n// Com vários selecionados → Editar:\n// - Você pode definir um valor fixo igual para todos\n// - Ou usar expressões matemáticas:\n//   v+1000   = valor atual + 1000\n//   v*2      = valor atual × 2\n//   9999999  = valor fixo para todos"}
        />

        <h2>Gravando endereços (Favoritos)</h2>
        <p>
          Após encontrar os endereços corretos, salve-os como favoritos para não precisar refazer a busca toda vez.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { titulo: "Salvar como favorito", desc: "Toque e segure o endereço → Adicionar a favoritos. Dê um nome descritivo como 'HP Personagem'." },
            { titulo: "Usar com script Lua", desc: "Exporte os endereços como variáveis no script para acesso direto sem busca manual." },
            { titulo: "Compartilhar resultados", desc: "GG permite exportar endereços como texto para compartilhar com outros jogadores." },
            { titulo: "Lista de memória", desc: "Acesse Ferramentas → Lista de Memória para ver todos os endereços salvos e editá-los em lote." },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="success" title="Dica: use scripts Lua para automatizar a modificação">
          Em vez de repetir os passos manualmente toda sessão, escreva um script Lua que encontra o endereço e modifica automaticamente. Veja a seção Scripts Lua para exemplos completos.
        </AlertBox>

        <h2>Problemas comuns na edição</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { problema: "Valor voltou ao normal após alguns segundos", causa: "O jogo está sobrescrevendo o valor via timer ou lógica de servidor", solucao: "Use freeze (cadeado) para manter o valor constantemente." },
            { problema: "Freeze não funciona — valor ainda muda", causa: "O jogo usa validação server-side ou calcula o valor em múltiplos endereços", solucao: "Encontre todos os endereços com aquele valor e freeze todos simultaneamente." },
            { problema: "Encontrei o endereço mas ao modificar o jogo crasha", causa: "O valor modificado causou overflow, divisão por zero ou estado inválido", solucao: "Tente valores mais conservadores. Ex: 9999 em vez de 999999999." },
            { problema: "O valor modificado não aparece na UI do jogo", causa: "O jogo tem um endereço para UI e outro para lógica real", solucao: "Encontre o endereço da UI separadamente — procure o valor que aparece na tela." },
          ].map((item) => (
            <div key={item.problema} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
              <h4 className="font-bold text-destructive mb-1 text-sm">{item.problema}</h4>
              <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
              <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  