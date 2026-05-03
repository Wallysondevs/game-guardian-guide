import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function GruposDeValores() {
  return (
    <PageContainer
      title="Grupos de Valores"
      subtitle="Entenda profundamente os tipos de dados usados na memória de jogos — Byte, Word, Dword, Qword, Float, Double, XOR, strings e bytes brutos. A escolha certa do tipo é a diferença entre encontrar o valor em segundos ou nunca encontrar."
      difficulty="iniciante"
      timeToRead="22 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Group search"}</strong> {' — '} {"busca conjuntos de valores próximos em memória."}
          </li>
        <li>
            <strong>{"Estruturas"}</strong> {' — '} {"jogos guardam stats em structs contíguas."}
          </li>
        <li>
            <strong>{"Sintaxe"}</strong> {' — '} {"100;200;300:50 — busca 100,200,300 dentro de 50 bytes."}
          </li>
        <li>
            <strong>{"Vantagem"}</strong> {' — '} {"precisão maior que busca simples."}
          </li>
        <li>
            <strong>{"Casos"}</strong> {' — '} {"muito útil para inventory slots, stats de personagem."}
          </li>
        </ul>
        <AlertBox type="info" title="Por que isso importa?">
        Usar o tipo errado é a causa número 1 de buscas sem resultado. Um Float buscado como Dword nunca vai ser encontrado mesmo que o endereço exista — porque os bytes que representam 100.0 (Float) são completamente diferentes dos bytes que representam 100 (inteiro). Entender cada tipo elimina 90% dos problemas de busca e abre acesso a valores que pareciam impossíveis de encontrar.
      </AlertBox>

      <h2>Como o computador armazena números</h2>
      <p>
        Antes de mergulhar nos tipos do GG, vale revisar conceitos fundamentais. Toda memória de computador é uma sequência linear de <strong>bytes</strong> (cada byte = 8 bits = um número de 0 a 255). Para armazenar valores maiores que 255, usamos múltiplos bytes consecutivos. Para armazenar números com casas decimais, usamos formatos especiais (IEEE 754).
      </p>
      <p>
        Os processadores ARM e x86 (que rodam Android) são <strong>little-endian</strong>: o byte menos significativo vem primeiro na memória. Então o número decimal 100, que em hexadecimal é 0x00000064, é armazenado em memória como <code>64 00 00 00</code>. Isso parece estranho mas é importante para interpretar dumps hexadecimais.
      </p>
      <CodeBlock
        language="text"
        title="Conceitos fundamentais"
        code={"1 byte  = 8 bits  = valores 0-255 (sem sinal) ou -128 a 127 (com sinal)\n2 bytes = 16 bits = valores 0-65.535 ou -32.768 a 32.767\n4 bytes = 32 bits = valores até ~4 bilhões\n8 bytes = 64 bits = valores até ~18 quintilhões\n\nLittle-endian (ARM/x86):\n  Decimal 100 (0x64)        → memória: 64 00 00 00\n  Decimal 1000 (0x3E8)      → memória: E8 03 00 00\n  Decimal 65536 (0x10000)   → memória: 00 00 01 00\n  Decimal 1234567 (0x12D687) → memória: 87 D6 12 00\n\nFloat IEEE 754 (4 bytes):\n  Estrutura: 1 bit sinal | 8 bits expoente | 23 bits mantissa\n  Float 100.0  → 0x42C80000 → memória: 00 00 C8 42\n  Float 0.5    → 0x3F000000 → memória: 00 00 00 3F\n  Float -1.0   → 0xBF800000 → memória: 00 00 80 BF\n\nDouble IEEE 754 (8 bytes):\n  Estrutura: 1 sinal | 11 expoente | 52 mantissa\n  Double 100.0 → memória: 00 00 00 00 00 00 59 40"}
      />

      <h2>Inteiros (números sem casas decimais)</h2>
      <div className="grid grid-cols-1 gap-4 my-6 not-prose">
        {[
          {
            tipo: "Byte (1 byte)", sigla: "Byte", bits: "8 bits",
            range: "0 a 255 (sem sinal) / -128 a 127 (com sinal)",
            usos: ["Flags de status (true/false, 0/1)", "Contadores pequenos (número de vidas: 0-9)", "Buffs e debuffs ativos (bitmask)", "Nível de dificuldade", "Cores RGB individuais (R, G ou B)", "Quantidade de jogadores em uma sala (1-10)", "Tipo de inimigo (enum 0-255)"],
            dica: "Raramente útil para valores de moeda ou HP — muito pequeno para a maioria dos jogos modernos. Bom para flags e enums."
          },
          {
            tipo: "Word (2 bytes)", sigla: "Word", bits: "16 bits",
            range: "0 a 65.535 (sem sinal) / -32.768 a 32.767 (com sinal)",
            usos: ["Munição em jogos antigos (até 65k balas)", "HP em RPGs simples (máximo 9999)", "IDs de itens (até 65k itens diferentes)", "Contadores de partidas/wins", "Resoluções de tela (1920x1080)", "Coordenadas de tile em jogos 2D"],
            dica: "Jogos antigos (pré-2015) frequentemente usam Word para HP e MP. Jogos modernos preferem Dword. Tente Word se Dword não encontrar e o valor é < 65000."
          },
          {
            tipo: "Dword (4 bytes)", sigla: "Dword", bits: "32 bits",
            range: "0 a 4.294.967.295 (sem sinal) / -2.1 bi a 2.1 bi (com sinal)",
            usos: ["Moedas e ouro (valores até ~4 bilhões)", "XP e pontuação", "Quantidade de itens no inventário", "IDs de jogador (geralmente Dword)", "Timers em milissegundos", "Endereços de memória (em apps 32-bit)", "Hash codes de objetos", "Cores RGBA empacotadas (0xAARRGGBB)"],
            dica: "O tipo mais comum em geral. Sempre comece com Dword para valores inteiros visíveis no jogo. Cobre 50%+ dos casos."
          },
          {
            tipo: "Qword (8 bytes)", sigla: "Qword", bits: "64 bits",
            range: "0 a 18,4 quintilhões (sem sinal) ou ±9 quintilhões (com sinal)",
            usos: ["Moedas em jogos idle/clicker (Cookie Clicker, AdVenture Capitalist)", "Timestamps Unix em milissegundos", "IDs únicos de servidor (UUIDs reduzidos)", "Scores em jogos de alta pontuação acumulada", "Endereços de memória em apps 64-bit (Android moderno)", "Steam IDs / Discord IDs", "Distâncias em coordenadas mundiais grandes"],
            dica: "Use quando o valor no jogo tem 10+ dígitos ou quando Dword não retorna resultados para valores grandes. Em dispositivos 64-bit modernos (a maioria), endereços de ponteiros são Qword."
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

      <h2>Inteiros com sinal vs sem sinal</h2>
      <p>
        Cada tipo inteiro tem versões "com sinal" (signed) e "sem sinal" (unsigned). O bit mais alto serve como indicador de sinal no modo signed:
      </p>
      <CodeBlock
        language="text"
        title="Diferença entre signed e unsigned"
        code={"Byte (1 byte = 8 bits):\n  Sem sinal: 0 a 255\n    Bytes: 00=0, 7F=127, FF=255\n  Com sinal: -128 a 127\n    Bytes: 00=0, 7F=127, 80=-128, FF=-1\n\nDword (4 bytes):\n  Sem sinal: 0 a 4.294.967.295\n    Bytes FF FF FF FF = 4.294.967.295\n  Com sinal: -2.147.483.648 a 2.147.483.647\n    Bytes FF FF FF FF = -1\n    Bytes 00 00 00 80 = -2.147.483.648\n\n// O GG geralmente trata como signed por padrão.\n// Mas isso significa que valores de 'gold' que parecem\n// ter 'estourado' para um número negativo gigante\n// (ex: -1.000.000.000) podem na verdade ser valores\n// 'sem sinal' muito grandes (~3.3 bilhões).\n//\n// Para encontrar esses valores, busque também por\n// formas equivalentes."}
      />

      <h2>Ponto flutuante (números com casas decimais)</h2>
      <div className="grid grid-cols-1 gap-4 my-6 not-prose">
        {[
          {
            tipo: "Float (4 bytes)", sigla: "Float",
            range: "±3.4 × 10³⁸ com ~7 dígitos de precisão",
            usos: ["HP e stamina (100.0, 99.5, 87.3)", "Velocidade de movimento (5.5, 2.7)", "Coordenadas X, Y, Z em jogos 3D", "Multiplicadores (1.5x dano, 2.0x velocidade)", "Timers em segundos (5.5s de cooldown)", "Ângulos de rotação (0.0 a 360.0 graus)", "Ratios e percentuais (0.0 a 1.0)", "Pesos físicos (massa de objetos)", "Volume de áudio (0.0 a 1.0)"],
            dica: "Segundo tipo mais comum. Se Dword não funcionar, tente Float com o mesmo valor.",
            exemplo: "100 de HP → busque Float 100 ou intervalo 99.0;101.0"
          },
          {
            tipo: "Double (8 bytes)", sigla: "Double",
            range: "±1.7 × 10³⁰⁸ com ~15 dígitos de precisão",
            usos: ["Coordenadas de alta precisão em jogos 3D abertos (open world)", "Física realista (simuladores de voo, corrida)", "Valores monetários em jogos financeiros (decimais exatos)", "Tempo em alta precisão (timestamps de servidor)", "Cálculos científicos em jogos educativos", "Distâncias astronômicas em jogos espaciais", "Coordenadas geográficas (lat/long)"],
            dica: "Raro em jogos mobile (consome dobro de memória). Use quando Float não encontrar e o valor tem muitas casas decimais ou o jogo é simulação realista.",
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

      <h2>Por que Float é tão usado em jogos</h2>
      <p>
        Floats são preferidos para gameplay por uma série de razões técnicas:
      </p>
      <ul>
        <li><strong>Hardware otimizado</strong>: GPUs e CPUs modernas têm unidades dedicadas para operações com float (FPU, NEON em ARM). Cálculos de física, gráficos e animações são muito mais rápidos com floats.</li>
        <li><strong>Engines usam Float internamente</strong>: Unity (que move ~50% dos jogos mobile) usa <code>Vector3</code> de floats para tudo: posição, rotação, escala, forças físicas. Unreal Engine idem.</li>
        <li><strong>Suaviza transições</strong>: HP de 100.0 indo para 99.7 e depois 99.4 (decremento contínuo) cria animações suaves de barra de vida. Inteiros forçariam saltos visuais.</li>
        <li><strong>Cálculos com porcentagens</strong>: dano = ataque × (1.0 - defesa/100.0). Resultados quase sempre não inteiros.</li>
        <li><strong>Range muito maior que inteiros</strong>: Float pode representar valores até 10³⁸ (vs 10⁹ do Dword), com perda gradual de precisão para números muito grandes.</li>
      </ul>
      <p>
        A consequência prática é: em qualquer jogo Unity/Unreal moderno, <strong>tente Float primeiro</strong> para HP, stamina, energia, recursos contínuos, velocidade, qualquer multiplicador ou estatística com decimais.
      </p>

      <h2>Tipos especiais</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { tipo: "XOR (4 bytes)", desc: "Dword encriptado com operação XOR. O jogo gera uma chave aleatória por sessão e XOReia o valor antes de armazenar. Use quando Dword retorna 0 resultados — sinal claro de encriptação XOR. O GG quebra automaticamente a chave testando valores típicos.", cor: "text-yellow-400" },
          { tipo: "XOR (8 bytes)", desc: "Versão Qword do XOR. Jogos com valores grandes encriptados (gold em idles, scores acumulados). Mais lento para buscar mas necessário quando o valor tem 64 bits. Engines como Cocos2d-x são conhecidas por usar.", cor: "text-yellow-400" },
          { tipo: "Auto", desc: "O GG testa todos os tipos automaticamente. Muito mais lento (faz N buscas em paralelo) mas útil quando você não faz ideia de qual tipo usar. Gera muitos resultados falsos. Use só como último recurso ou para análise inicial de jogo desconhecido.", cor: "text-muted-foreground" },
          { tipo: "Texto UTF-8", desc: "Strings ASCII/UTF-8 (1 byte por caractere para letras latinas). Para encontrar nomes de itens, identificadores em texto, mensagens. Engines C++ tradicionais usam.", cor: "text-blue-400" },
          { tipo: "Texto UTF-16", desc: "Strings UTF-16 (2 bytes por caractere). Padrão em jogos Unity (C#) e Java. Se buscar 'Sword' como UTF-8 não encontrar, tente UTF-16 — provavelmente o jogo usa essa codificação.", cor: "text-blue-400" },
          { tipo: "Hex (bytes)", desc: "Sequência exata de bytes em hexadecimal. Suporta wildcards (??) para padrões flexíveis. Para usuários avançados — encontrar assinaturas de funções, padrões de instruções ARM, identificar engines.", cor: "text-green-400" },
          { tipo: "Pointer", desc: "Tipo derivado para encontrar ponteiros. Busca por endereços de memória válidos que apontam para regiões mapeadas. Útil para análise de structs.", cor: "text-purple-400" },
          { tipo: "Múltiplos tipos", desc: "GG aceita 'D' (Dword), 'F' (Float), 'X' (XOR), etc. Pode-se buscar 100D;100F (busca 100 como ambos simultaneamente).", cor: "text-pink-400" },
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
        code={"O valor no jogo tem casas decimais? (ex: 87.5)\n→ SIM: use Float. Se não encontrar, tente Double.\n→ NÃO: continue abaixo\n\nO valor é inteiro e maior que 4 bilhões?\n→ SIM: use Qword (com possível XOR 8 bytes se nada).\n→ NÃO: continue abaixo\n\nO valor é maior que 65.535?\n→ SIM: use Dword. Se não encontrar, tente XOR (4 bytes).\n→ NÃO: continue abaixo\n\nO valor é maior que 255?\n→ SIM: use Word.\n→ NÃO: tente Byte primeiro, depois Word.\n\nNenhum tipo encontrou nada?\n→ Tente XOR (4 bytes) com o mesmo valor — jogo pode usar encriptação\n→ Tente Float com pequena variação: valor-1.0;valor+1.0\n→ Tente o valor multiplicado: valor×10, valor×100, valor×1000\n→ Tente o valor como string (se for visível na UI)\n→ Tente busca por valor desconhecido como último recurso\n\nVALORES TÍPICOS POR CONTEXTO:\n- HP/MP/Stamina        → Float (Unity), Word (RPG clássico)\n- Moeda do jogo        → Dword (mainstream), Qword (idle)\n- XP / Score           → Dword, Qword (acumulado)\n- Munição              → Word, Byte (até 255 balas), Dword\n- Velocidade           → Float\n- Coordenadas X/Y/Z    → Float, Double (alta precisão)\n- Timers (segundos)    → Float\n- Timers (milisegundos)→ Dword\n- Level                → Byte (1-99), Word, Dword\n- Flags (bool)         → Byte (0/1), Dword (0/1)\n- IDs de itens         → Word, Dword\n- Cor RGB              → Dword (0xAARRGGBB)"}
      />

      <h2>Representação na memória — o problema dos tipos</h2>
      <CodeBlock
        language="text"
        title="Como os mesmos bytes representam valores diferentes"
        code={"Bytes na memória:  64 00 00 00\n\nInterpretado como Byte:   0x64 = 100\nInterpretado como Word:   0x0064 = 100\nInterpretado como Dword:  0x00000064 = 100\nInterpretado como Float:  1.4×10⁻⁴³ (quase zero — inútil)\nInterpretado como Hex:    64 00 00 00\nInterpretado como String UTF-8: 'd' (caractere d)\n\n---\n\nBytes na memória:  00 00 C8 42\n\nInterpretado como Float:  100.0\nInterpretado como Dword:  1.123.147.776 (não é 100!)\nInterpretado como Word:   0x0000 = 0 (lê só os 2 primeiros bytes)\nInterpretado como String: '..ÈB' (lixo)\n\n---\n\nBytes na memória:  48 65 6C 6C 6F\n\nInterpretado como String UTF-8: 'Hello'\nInterpretado como Dword:  0x6C6C6548 = 1.819.043.144 (lixo)\nInterpretado como Float:  ~1.14×10²⁷ (lixo)\n\n// Isso explica por que o tipo errado não encontra nada:\n// você busca por 100 (Dword=0x64) mas na memória está\n// 0x4248000 (Float=100.0) — bytes completamente diferentes!\n// A busca por 100 como Dword nunca vai achar o Float 100.0,\n// mesmo que ambos representem 'cem' do ponto de vista humano."}
      />

      <h2>Identificando o tipo correto observando o jogo</h2>
      <p>
        Algumas pistas visuais ajudam a deduzir qual tipo o jogo provavelmente usa antes mesmo de buscar:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { dica: "Valor muda em decimais visíveis (87.5, 99.3)", conclusao: "Quase certo Float. Tente Double se Float falhar." },
          { dica: "Valor pequeno e preso entre 0-100", conclusao: "Possivelmente Byte ou Dword. Se for percentual (0-100%), pode ser Float (0.0-1.0)." },
          { dica: "Valor mostra notação científica (1.5e9, 2.3M, 4.2B)", conclusao: "Em idle games, é Double ou Qword. Em jogos casuais, Dword com formatação." },
          { dica: "Engine identificável como Unity (apk tem 'libunity.so')", conclusao: "HP, MP, velocidade são Float. Inventário e moedas são Dword. Coordenadas são Float (Vector3)." },
          { dica: "Engine Unreal Engine 4/5", conclusao: "Similar ao Unity. Float para gameplay contínuo, int32 (Dword) para contadores." },
          { dica: "Jogo escrito em Java/Kotlin nativo (raro hoje)", conclusao: "Tudo na Java Heap (Jh). int = 4 bytes (Dword), long = 8 bytes (Qword), float = Float." },
          { dica: "Jogo antigo (pré-2015)", conclusao: "Word para HP/MP, Byte para flags. Engines mais simples." },
          { dica: "Jogo de tiro/FPS", conclusao: "Munição = Word ou Byte. HP = Float. Coordenadas = Float ou Double." },
          { dica: "RPG com numerão de dano", conclusao: "Dano = Dword. HP = Float. XP = Dword ou Qword. Drop rate = Float (0.0-1.0)." },
          { dica: "Idle/Clicker", conclusao: "Recursos = Qword ou Double (números enormes). Multiplicadores = Float." },
        ].map((item) => (
          <div key={item.dica} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.dica}</h4>
            <p className="text-xs text-primary">{item.conclusao}</p>
          </div>
        ))}
      </div>

      <h2>XOR — entendendo a encriptação simples</h2>
      <p>
        XOR (eXclusive OR) é uma operação bit a bit reversível: <code>A XOR B XOR B = A</code>. Jogos usam isso para "esconder" valores na memória de forma barata (sem custo perceptível de CPU). O fluxo é:
      </p>
      <CodeBlock
        language="text"
        title="Como o XOR funciona em jogos"
        code={"Quando o jogo INICIA:\n  chave = random_dword()  // ex: 0xDEADBEEF (gerada aleatoriamente)\n\nQuando o jogo armazena HP=100:\n  hp_armazenado = 100 XOR 0xDEADBEEF = 0xDEADBE8B\n  Memória contém: 8B BE AD DE  (não é mais 100!)\n\nQuando o jogo lê HP:\n  hp_real = memoria XOR 0xDEADBEEF = 0xDEADBE8B XOR 0xDEADBEEF = 100\n\n// O GG ao buscar XOR Dword 100:\n// Tenta TODAS as chaves possíveis e verifica se algum endereço,\n// quando XORado com a chave, dá 100. Isso parece exponencial,\n// mas na prática o GG usa heurísticas: chaves que aparecem em\n// múltiplos endereços (memória global do jogo guarda a chave) e\n// chaves que produzem valores 'plausíveis' em vários offsets.\n\n// Pistas de que o jogo usa XOR:\n// - Buscar como Dword/Float/Byte/Word retorna 0 resultados\n// - Mas o valor é claramente visível na UI do jogo\n// - Engine do jogo é conhecida por usar XOR (Cocos2d-x)\n// - Aviso 'verificação de integridade' aparece em jogos similares"}
      />

      <h2>Tabela rápida de tipos e seus tamanhos</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-3 py-2 text-left border border-border">Tipo</th>
              <th className="bg-muted text-foreground font-semibold px-3 py-2 text-left border border-border">Bytes</th>
              <th className="bg-muted text-foreground font-semibold px-3 py-2 text-left border border-border">Range típico</th>
              <th className="bg-muted text-foreground font-semibold px-3 py-2 text-left border border-border">Equivalente C/C++</th>
              <th className="bg-muted text-foreground font-semibold px-3 py-2 text-left border border-border">Equivalente C# (Unity)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Byte", "1", "0-255 / -128 a 127", "uint8_t / int8_t / char", "byte / sbyte"],
              ["Word", "2", "0-65k / -32k a 32k", "uint16_t / int16_t / short", "ushort / short"],
              ["Dword", "4", "0-4 bi / -2 bi a 2 bi", "uint32_t / int32_t / int", "uint / int"],
              ["Qword", "8", "0-18 quintilhões", "uint64_t / int64_t / long long", "ulong / long"],
              ["Float", "4", "±3.4×10³⁸ (~7 dígitos)", "float", "float"],
              ["Double", "8", "±1.7×10³⁰⁸ (~15 dígitos)", "double", "double"],
              ["XOR (4b)", "4", "Dword encriptado", "—", "—"],
              ["XOR (8b)", "8", "Qword encriptado", "—", "—"],
              ["UTF-8", "var", "Strings", "char[] / std::string", "—"],
              ["UTF-16", "var (×2)", "Strings Unicode", "wchar_t[]", "string (C# usa UTF-16)"],
              ["Hex", "var", "Bytes brutos", "uint8_t[]", "byte[]"],
            ].map(([tipo, bytes, range, c, cs], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-3 py-2 border border-border font-mono text-primary text-xs">{tipo}</td>
                <td className="px-3 py-2 border border-border text-foreground text-xs">{bytes}</td>
                <td className="px-3 py-2 border border-border text-muted-foreground text-xs">{range}</td>
                <td className="px-3 py-2 border border-border text-muted-foreground text-xs font-mono">{c}</td>
                <td className="px-3 py-2 border border-border text-muted-foreground text-xs font-mono">{cs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="success" title="Regra de ouro para iniciantes">
        Comece sempre com <strong>Dword</strong> para números inteiros visíveis e <strong>Float</strong> para valores com casas decimais ou que pareçam contínuos (HP, stamina, velocidade). Esses dois tipos cobrem 80% dos casos. Se nenhum funcionar, vá para <strong>XOR (4 bytes)</strong> — terceira opção mais comum.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Agora que você domina os tipos de dados, vá para <strong>Tipos de Busca</strong> para aprender técnicas avançadas de varredura — busca em grupo para structs, busca por intervalo, busca hexadecimal com wildcards e busca por valor desconhecido.
      </AlertBox>
    </PageContainer>
  );
}
