import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function GruposDeValores() {
    return (
      <PageContainer
        title="Grupos de Valores"
        subtitle="Entenda os tipos de dados usados na memória de jogos — a base para encontrar qualquer valor."
        difficulty="iniciante"
        timeToRead="14 min"
      >
        <AlertBox type="info" title="Por que isso importa?">
          Usar o tipo errado é a causa número 1 de buscas sem resultado. Um Float buscado como Dword nunca vai ser encontrado mesmo que o endereço exista. Entender cada tipo elimina 90% dos problemas de busca.
        </AlertBox>

        <h2>Inteiros (números sem casas decimais)</h2>
        <div className="grid grid-cols-1 gap-4 my-6 not-prose">
          {[
            {
              tipo: "Byte (1 byte)", sigla: "Byte", bits: "8 bits",
              range: "0 a 255 (sem sinal) / -128 a 127 (com sinal)",
              usos: ["Flags de status (true/false, 0/1)", "Contadores pequenos (número de vidas: 0-9)", "Buffs e debuffs ativos (bitmask)", "Nível de dificuldade"],
              dica: "Raramente útil para valores de moeda ou HP — muito pequeno para a maioria dos jogos modernos."
            },
            {
              tipo: "Word (2 bytes)", sigla: "Word", bits: "16 bits",
              range: "0 a 65.535 (sem sinal) / -32.768 a 32.767 (com sinal)",
              usos: ["Munição em jogos antigos", "HP em RPGs simples (máximo 9999)", "IDs de itens", "Contadores de partidas"],
              dica: "Jogos antigos (pré-2015) frequentemente usam Word para HP e MP. Jogos modernos preferem Dword."
            },
            {
              tipo: "Dword (4 bytes)", sigla: "Dword", bits: "32 bits",
              range: "0 a 4.294.967.295 (sem sinal) / -2.1 bi a 2.1 bi (com sinal)",
              usos: ["Moedas e ouro", "XP e pontuação", "Quantidade de itens no inventário", "IDs de jogador", "Timers em milissegundos"],
              dica: "O tipo mais comum. Sempre comece com Dword para valores inteiros visíveis no jogo."
            },
            {
              tipo: "Qword (8 bytes)", sigla: "Qword", bits: "64 bits",
              range: "0 a 18,4 quintilhões",
              usos: ["Moedas em jogos idle/clicker", "Timestamps Unix", "IDs únicos de servidor", "Scores em jogos de alta pontuação"],
              dica: "Use quando o valor no jogo tem 10+ dígitos ou quando Dword não retorna resultados para valores grandes."
            },
          ].map((item) => (
            <div key={item.tipo} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <code className="text-primary font-bold text-lg">{item.sigla}</code>
                <span className="text-foreground font-semibold">{item.tipo}</span>
                <span className="text-xs text-muted-foreground ml-auto">{item.bits}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-2 font-mono">{item.range}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <div>
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Usado para</p>
                  <ul className="space-y-0.5">
                    {item.usos.map((u, i) => <li key={i} className="text-xs text-foreground/80">• {u}</li>)}
                  </ul>
                </div>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs font-semibold text-muted-foreground uppercase mb-1">Dica</p>
                  <p className="text-xs text-foreground/80">{item.dica}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Ponto flutuante (números com casas decimais)</h2>
        <div className="grid grid-cols-1 gap-4 my-6 not-prose">
          {[
            {
              tipo: "Float (4 bytes)", sigla: "Float",
              range: "±3.4 × 10³⁸ com ~7 dígitos de precisão",
              usos: ["HP e stamina (100.0, 99.5, 87.3)", "Velocidade de movimento (5.5, 2.7)", "Coordenadas X, Y, Z", "Multiplicadores (1.5x dano, 2.0x velocidade)", "Timers em segundos"],
              dica: "Segundo tipo mais comum. Se Dword não funcionar, tente Float com o mesmo valor.",
              exemplo: "100 de HP → busque Float 100 ou intervalo 99.0;101.0"
            },
            {
              tipo: "Double (8 bytes)", sigla: "Double",
              range: "±1.7 × 10³⁰⁸ com ~15 dígitos de precisão",
              usos: ["Coordenadas de alta precisão em jogos 3D", "Física realista (simuladores)", "Valores monetários em jogos financeiros", "Tempo em alta precisão"],
              dica: "Raro em jogos mobile. Use quando Float não encontrar e o valor tem muitas casas decimais.",
              exemplo: "Coordenada 123.456789 → pode ser Double para alta precisão"
            },
          ].map((item) => (
            <div key={item.tipo} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
                <code className="text-secondary font-bold text-lg">{item.sigla}</code>
                <span className="text-foreground font-semibold">{item.tipo}</span>
              </div>
              <p className="text-xs text-muted-foreground mb-1 font-mono">{item.range}</p>
              <p className="text-xs text-primary mb-3">Ex: {item.exemplo}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                <ul className="space-y-0.5">
                  {item.usos.map((u, i) => <li key={i} className="text-xs text-foreground/80">• {u}</li>)}
                </ul>
                <div className="bg-muted/30 rounded-lg p-3">
                  <p className="text-xs text-foreground/80">{item.dica}</p>
                </div>
              </div>
            </div>
          ))}
        </div>

        <h2>Tipos especiais</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { tipo: "XOR (4 bytes)", desc: "Dword encriptado com operação XOR. O jogo gera uma chave aleatória por sessão. Use quando Dword retorna 0 resultados — sinal claro de encriptação XOR.", cor: "text-yellow-400" },
            { tipo: "XOR (8 bytes)", desc: "Versão Qword do XOR. Jogos com valores grandes encriptados. Mais lento para buscar mas necessário quando o valor tem 64 bits.", cor: "text-yellow-400" },
            { tipo: "Auto", desc: "O GG testa todos os tipos automaticamente. Muito mais lento mas útil quando você não faz ideia de qual tipo usar. Gera muitos resultados falsos.", cor: "text-muted-foreground" },
            { tipo: "Texto (UTF-8/UTF-16)", desc: "Strings de texto. Para encontrar nomes de itens, identificadores, mensagens. UTF-16 é padrão em jogos Unity.", cor: "text-blue-400" },
            { tipo: "Hex (bytes)", desc: "Sequência exata de bytes em hexadecimal. Suporta wildcards (??) para padrões flexíveis. Para usuários avançados.", cor: "text-green-400" },
          ].map((item) => (
            <div key={item.tipo} className="bg-card border border-border rounded-xl p-4">
              <code className={"font-bold text-base mb-2 block " + item.cor}>{item.tipo}</code>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Quando usar cada tipo — guia rápido</h2>
        <CodeBlock
          language="text"
          title="Árvore de decisão para escolher o tipo certo"
          code={"O valor no jogo tem casas decimais? (ex: 87.5)\n→ SIM: use Float. Se não encontrar, tente Double.\n→ NÃO: continue abaixo\n\nO valor é maior que 65.000?\n→ SIM: use Dword. Se não encontrar, tente Qword.\n→ NÃO: tente Dword primeiro, depois Word e Byte.\n\nNenhum tipo encontrou nada?\n→ Tente XOR (4 bytes) com o mesmo valor — jogo pode usar encriptação\n→ Tente intervalo: valor-10;valor+10 como Float\n→ Tente o valor multiplicado: valor×10, valor×100\n→ Tente busca por valor desconhecido como último recurso"}
        />

        <h2>Representação na memória</h2>
        <CodeBlock
          language="text"
          title="Como os mesmos bytes representam valores diferentes"
          code={"Bytes na memória:  64 00 00 00\n\nInterpretado como Dword:  100\nInterpretado como Float:  1.4×10⁻⁴³ (quase zero — inútil)\nInterpretado como Hex:    0x00000064\n\n---\n\nBytes na memória:  00 00 C8 42\n\nInterpretado como Float:  100.0\nInterpretado como Dword:  1123147776 (não é 100!)\n\n// Isso explica por que o tipo errado não encontra nada:\n// você busca por 100 (Dword=0x64) mas na memória está\n// 0x4248000 (Float=100.0) — bytes completamente diferentes!"}
        />

        <AlertBox type="success" title="Regra de ouro para iniciantes">
          Comece sempre com <strong>Dword</strong> para números inteiros visíveis e <strong>Float</strong> para valores com casas decimais ou que pareçam contínuos (HP, stamina). Esses dois tipos cobrem 80% dos casos.
        </AlertBox>
      </PageContainer>
    );
  }
  