import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function OQueE() {
  return (
    <PageContainer
      title="O que é Game Guardian?"
      subtitle="Entenda como funciona essa poderosa ferramenta de modificação de memória Android — desde o conceito básico até os detalhes técnicos do funcionamento interno."
      difficulty="iniciante"
      timeToRead="14 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Game Guardian"}</strong> {' — '} {"editor de memória para jogos Android."}
          </li>
        <li>
            <strong>{"Cheat tool"}</strong> {' — '} {"similar ao Cheat Engine para PC."}
          </li>
        <li>
            <strong>{"Open source"}</strong> {' — '} {"gratuito, sem ads, com plugins Lua."}
          </li>
        <li>
            <strong>{"Comunidade"}</strong> {' — '} {"fórum com scripts prontos para milhares de jogos."}
          </li>
        <li>
            <strong>{"Educational"}</strong> {' — '} {"ótimo para aprender memory editing e RE."}
          </li>
        </ul>
        <AlertBox type="info" title="Definição resumida">
        Game Guardian (GG) é um aplicativo Android que permite ler e modificar a memória RAM de jogos em tempo real, alterando valores como vida, dinheiro, velocidade, munição e qualquer outro número que o jogo armazene localmente. Funciona via root, ou através de espaços virtuais sem root, e suporta automação completa via scripts Lua.
      </AlertBox>

      <h2>O que é modificação de memória?</h2>
      <p>
        Todo programa em execução armazena dados temporários na memória RAM do dispositivo. Quando o sistema operacional carrega um app — qualquer app, jogo ou não — ele reserva uma região de memória só para esse processo. Essa memória é organizada em "páginas" virtuais que o sistema mapeia internamente para chips físicos de RAM, e contém tudo que o app precisa enquanto roda: variáveis, objetos, texturas carregadas, código compilado, e os valores que mudam a cada segundo do jogo.
      </p>
      <p>
        Um jogo, por exemplo, mantém na RAM valores como:
      </p>
      <ul>
        <li>A quantidade de vida atual do personagem (geralmente <code>Float</code>, ex: <code>87.5</code>)</li>
        <li>O saldo de moedas, ouro ou gemas do jogador (geralmente <code>Dword</code> de 4 bytes)</li>
        <li>O multiplicador de velocidade de movimento (<code>Float</code>, ex: <code>5.5</code> unidades/segundo)</li>
        <li>O tempo restante de uma partida ou cooldown de uma habilidade</li>
        <li>Coordenadas X, Y, Z de cada personagem na cena (três <code>Float</code> consecutivos)</li>
        <li>Quantos itens de cada tipo o jogador tem no inventário</li>
        <li>Flags booleanas que indicam se uma fase está completa, se um item está desbloqueado, etc.</li>
        <li>Estatísticas de combate: dano por hit, taxa de crítico, defesa, evasão</li>
      </ul>
      <p>
        O Game Guardian consegue <strong>localizar esses endereços de memória</strong> e <strong>alterar seus valores</strong> enquanto o jogo está rodando. É como editar um arquivo de save, mas em tempo real, com o jogo aberto, vendo a mudança refletir imediatamente na tela.
      </p>

      <h2>Como o GG funciona — fluxo completo</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
        {[
          { step: "1", title: "Injeção de processo", desc: "O GG se anexa ao processo do jogo usando a syscall ptrace() (com root) ou através de hospedagem em ambiente virtual (sem root). A partir desse momento ele tem acesso de leitura/escrita à memória do jogo." },
          { step: "2", title: "Varredura de memória", desc: "Você informa um valor conhecido (ex: 100 de vida) e o GG percorre toda a região de memória selecionada byte a byte, comparando cada posição com o valor procurado e listando todos os endereços que contêm esse valor exato." },
          { step: "3", title: "Refinamento", desc: "Como o mesmo número aparece em centenas de lugares na memória, você muda o valor no jogo (perde vida, gasta moeda) e refaz a busca apenas entre os resultados anteriores. Isso elimina endereços que não correspondem ao valor que você quer." },
          { step: "4", title: "Modificação", desc: "Com o endereço encontrado e isolado, você usa o GG para escrever um novo valor naquela posição da memória. O jogo lê o valor modificado na próxima vez que ele consulta a variável e o efeito aparece imediatamente." },
        ].map((item) => (
          <div key={item.step} className="bg-card border border-border rounded-xl p-5">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Passo {item.step}</span>
            <h3 className="text-base font-bold text-foreground mt-1 mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Por baixo do capô — como o Android isola processos</h2>
      <p>
        Para entender por que o GG precisa de root (ou Virtual Space), é preciso entender o modelo de segurança do Linux, que é o kernel do Android. Cada app instalado recebe um <strong>UID</strong> (User ID) único — basicamente, o Android trata cada app como se fosse um usuário diferente do sistema. O Linux/Android impede que um usuário leia arquivos ou memória de outro usuário, exatamente como em um servidor compartilhado: você não pode ler os e-mails do colega que tem conta na mesma máquina.
      </p>
      <p>
        A memória de cada processo fica acessível através de um arquivo virtual em <code>/proc/PID/mem</code>, onde <code>PID</code> é o número do processo. Essa interface é usada por debuggers, profilers e — sim — pelo Game Guardian. Sem root, apenas o próprio processo pode ler seu próprio <code>/proc/PID/mem</code>. Com root (UID 0, "superusuário"), todas as restrições caem.
      </p>
      <CodeBlock
        language="text"
        title="Como o root habilita o GG"
        code={"// Sem root — bloqueado:\nGG (UID 10054) tenta abrir /proc/12345/mem  (jogo)\n→ open(): Permission denied (EACCES)\n\n// Com root — permitido:\nGG (UID 0, root) abre /proc/12345/mem\n→ open(): sucesso, retorna file descriptor\n→ pread(): lê 4 bytes do endereço 0xABCD1234\n→ pwrite(): escreve novo valor 0x270F (=9999) no mesmo endereço\n\n// O jogo vai ler esse novo valor na próxima\n// vez que consultar a variável de HP."}
      />

      <h2>Game Guardian vs outros memory hackers</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Ferramenta</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Plataforma</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Scripts</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Root</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Status</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Game Guardian", "Android", "Lua 5.3", "Opcional (Virtual Space)", "Ativo, atualizações frequentes"],
              ["Cheat Engine", "Windows/Mac/Linux", "Lua", "Não (Admin)", "Ativo, padrão de PC"],
              ["GameCih", "Android", "Não", "Sim", "Descontinuado"],
              ["SB Game Hacker", "Android", "Não", "Sim", "Descontinuado"],
              ["Lucky Patcher", "Android", "Não", "Opcional", "Ativo (foco em IAP)"],
              ["Frida", "Multi", "JavaScript", "Sim ou USB", "Ativo, foco em pen-testing"],
              ["GameKiller", "Android", "Não", "Sim", "Descontinuado"],
              ["HxD / Cheat Engine PC", "Windows", "Lua", "Não", "Ativo (PC apenas)"],
            ].map(([tool, plat, scripts, root, status], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{tool}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{plat}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{scripts}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{root}</td>
                <td className="px-4 py-2 border border-border text-primary text-sm">{status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <p>
        O GG é hoje a opção mais completa e ativamente mantida para Android. Para PC, Cheat Engine continua sendo o padrão da indústria. Para análise de segurança profissional, Frida é mais poderoso (com hooks de função, injeção de JavaScript em qualquer processo, etc.), mas tem curva de aprendizado muito mais íngreme.
      </p>

      <h2>Tipos de memória que o GG pode acessar</h2>
      <p>
        O Game Guardian pode varrer diferentes regiões da memória virtual de um processo. Cada região tem características diferentes em termos de velocidade de busca, tipo de dado armazenado e probabilidade de conter valores de gameplay:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { sigla: "Ca", nome: "C Alloc / Heap", desc: "Memória alocada dinamicamente pelo código nativo (C/C++) do jogo. É onde ficam a maioria absoluta dos valores de gameplay: stats de personagem, inventário, posições, contadores. Comece sempre por aqui — é a região mais rápida de varrer e onde 80% dos hacks acontecem.", quando: "Sempre, primeiro" },
          { sigla: "Cb", nome: "C++ BSS", desc: "Segmento de variáveis globais não inicializadas do código nativo. Mantém valores constantes durante a sessão. Ocasionalmente contém configurações globais e contadores que persistem entre fases.", quando: "Quando Ca não encontrar" },
          { sigla: "Cd", nome: "C++ Data", desc: "Segmento de variáveis globais inicializadas. Onde ficam constantes do jogo (limites máximos, multiplicadores fixos definidos no código). Endereços tendem a ser estáticos.", quando: "Quando precisa de endereço fixo" },
          { sigla: "Xa", nome: "Executável Anônimo", desc: "Memória executável anônima — código compilado em runtime, JIT (just-in-time compilation). Engines como Unity (com IL2CPP) usam essa região intensamente.", quando: "Jogos Unity modernos" },
          { sigla: "Xs", nome: "Executável Stack", desc: "Pilha de execução — endereços de retorno, variáveis locais de funções. Muito volátil, mudanças a cada chamada de função. Raramente útil para hacks de gameplay.", quando: "Análise muito avançada" },
          { sigla: "Jh", nome: "Java Heap", desc: "Heap da Java Virtual Machine (JVM). Onde ficam objetos Java/Kotlin. Para jogos escritos em Java puro (raros hoje em dia) ou para apps não-jogos.", quando: "Apps Java/Kotlin nativos" },
          { sigla: "Ps", nome: "Pseudo-heap", desc: "Heap geral do processo — variação da heap padrão usada por algumas engines. Pode conter structs de objetos de jogo em Unity/Unreal.", quando: "Jogos Unity/Unreal" },
          { sigla: "S", nome: "Stack do thread principal", desc: "Pilha do thread principal. Pode conter referências temporárias a structs importantes durante chamadas de funções de gameplay.", quando: "Raramente usado" },
          { sigla: "A", nome: "All / Toda", desc: "Varre absolutamente toda a memória mapeada do processo. É a opção mais lenta (pode levar minutos), mas a mais abrangente. Use quando todas as regiões específicas falharem.", quando: "Último recurso" },
          { sigla: "V", nome: "Video / GPU", desc: "Memória relacionada à GPU e renderização. Para análise de texturas, framebuffers. Não tem valores de gameplay.", quando: "Análise de gráficos" },
          { sigla: "B", nome: "Bad", desc: "Regiões marcadas como problemáticas pelo kernel. Geralmente puladas. Ignore.", quando: "Não usar" },
          { sigla: "O", nome: "Other / Outras", desc: "Regiões que não se encaixam nas categorias acima. Pouco usado.", quando: "Não usar normalmente" },
        ].map((item) => (
          <div key={item.sigla} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-3 mb-2">
              <code className="text-primary font-bold text-base">{item.sigla}</code>
              <span className="text-foreground font-semibold text-sm">{item.nome}</span>
              <span className="text-xs text-muted-foreground ml-auto bg-muted px-2 py-0.5 rounded">{item.quando}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Como o jogo armazena valores — exemplo prático</h2>
      <p>
        Para entender o GG profundamente, vale ver um exemplo concreto. Considere um RPG simples onde o personagem tem HP e Mana. No código C++ do jogo, isso provavelmente se parece com:
      </p>
      <CodeBlock
        language="text"
        title="Como o código do jogo se traduz em memória"
        code={"// Código do jogo (C++):\nclass Personagem {\n  float hp = 100.0f;        // 4 bytes\n  float hp_max = 100.0f;    // 4 bytes\n  float mana = 50.0f;       // 4 bytes\n  float mana_max = 50.0f;   // 4 bytes\n  int   level = 1;          // 4 bytes\n  int   xp = 0;             // 4 bytes\n  int   gold = 250;         // 4 bytes\n  // ... mais campos\n};\n\nPersonagem* jogador = new Personagem();\n// new aloca em algum endereço, ex: 0x7f1a3c50\n\n// Como fica na memória RAM (a partir de 0x7f1a3c50):\n//\n// Endereço      Bytes              Valor\n// 0x7f1a3c50    00 00 C8 42        100.0f  (hp)\n// 0x7f1a3c54    00 00 C8 42        100.0f  (hp_max)\n// 0x7f1a3c58    00 00 48 42        50.0f   (mana)\n// 0x7f1a3c5c    00 00 48 42        50.0f   (mana_max)\n// 0x7f1a3c60    01 00 00 00        1       (level)\n// 0x7f1a3c64    00 00 00 00        0       (xp)\n// 0x7f1a3c68    FA 00 00 00        250     (gold)\n\n// O GG busca '100' como Float → encontra 0x7f1a3c50 e 0x7f1a3c54\n// Refinamento (perdendo vida) → isola 0x7f1a3c50 (hp atual)\n// Modificação para 9999.0 → escrita em 0x7f1a3c50\n// Próximo frame, jogo lê 9999.0 e desenha na tela"}
      />

      <h2>Do que o GG é capaz</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Ler memória de qualquer processo", desc: "Com root, lê /proc/PID/mem de qualquer app rodando. Pode dumpar regiões inteiras para análise offline." },
          { titulo: "Escrever em qualquer endereço", desc: "Modifica valores em tempo real. A mudança é instantânea e o jogo reage no próximo frame." },
          { titulo: "Buscar todos os tipos de dados", desc: "Byte, Word, Dword, Qword, Float, Double, XOR, texto UTF-8/16, sequências hexadecimais." },
          { titulo: "Congelar valores (freeze)", desc: "Reescreve continuamente o valor para impedir que o jogo o altere. Útil para vida, recursos e timers." },
          { titulo: "Buscar por valor desconhecido", desc: "Quando você não sabe o valor, faz snapshot da memória e refina por diferenças (mudou/não mudou/diminuiu)." },
          { titulo: "Buscar valores encriptados (XOR)", desc: "Quebra encriptação XOR de 4 e 8 bytes automaticamente. Resolve o caso comum de jogos que escondem valores." },
          { titulo: "Executar scripts Lua", desc: "Automação completa: menus interativos, refinamento automático, hooks, dumps, monitoramento contínuo." },
          { titulo: "Acessar estruturas (structs)", desc: "Navega por offsets para acessar campos relacionados (HP + MaxHP + MP + Level em sequência)." },
          { titulo: "Modificar em lote", desc: "Edita múltiplos endereços de uma vez. Aceita expressões matemáticas (v+1000, v*2)." },
          { titulo: "Salvar favoritos", desc: "Persiste endereços encontrados para acesso futuro sem precisar refazer a busca." },
          { titulo: "Funcionar sem root", desc: "Via Virtual Space integrado, contornando a necessidade de root real (com algumas limitações)." },
          { titulo: "Modo furtivo", desc: "Reduz assinatura de processo e oculta ícone para diminuir detecção por anti-cheats." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-3">
            <h4 className="font-bold text-foreground mb-1 text-xs">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>O que o GG não consegue fazer</h2>
      <p>
        Limitações fundamentais do GG, importantes de entender antes de tentar coisas impossíveis:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Modificar dados no servidor", desc: "Servidores de jogos online ficam em data centers — fora do seu celular. O GG só toca na memória local. Em jogos com validação server-side, modificar HP localmente para 9999 não tem efeito porque o servidor calcula com o valor real (100)." },
          { titulo: "Burlar verificações criptográficas fortes", desc: "Se o valor é encriptado com AES-256 + chave derivada de hash do servidor, o GG não consegue achar nem modificar coerentemente. Felizmente, jogos raramente usam isso (custo de CPU)." },
          { titulo: "Gerar conteúdo do nada", desc: "Não dá para 'criar' um item raro que você não tem. Itens premium são entregues pelo servidor após validação de pagamento. O GG modifica apenas o que existe na memória." },
          { titulo: "Hackar contas de outros jogadores", desc: "Confusão muito comum. O GG modifica memória do SEU celular, não do jogo dos outros nem do servidor. Quem busca isso está perdendo tempo (e tentando algo ilegal)." },
          { titulo: "Funcionar sem acesso à memória do processo", desc: "Sem root e sem Virtual Space, o GG simplesmente não tem permissão para ler outros processos. Não é falha do app, é design do Android." },
          { titulo: "Burlar machine learning anti-cheat", desc: "Análise comportamental do servidor detecta padrões impossíveis (kill streak de 100 sem morrer, recursos coletados 50x mais rápido). Mesmo modificando valores 'plausíveis', anomalias estatísticas geram ban." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Histórico do projeto</h2>
      <p>
        O Game Guardian foi criado em 2014 pelo desenvolvedor russo conhecido como <strong>Brevent</strong>. As primeiras versões eram simples — apenas busca por valor exato e modificação de Dword. Ao longo de uma década:
      </p>
      <ul>
        <li><strong>2014–2015</strong>: versões iniciais com busca básica e suporte a root</li>
        <li><strong>2016</strong>: introdução do suporte a Lua para automação via scripts</li>
        <li><strong>2017</strong>: adicionado modo furtivo e bypass básico de detecção</li>
        <li><strong>2018</strong>: integração com VirtualXposed para uso sem root</li>
        <li><strong>2019</strong>: Virtual Space próprio integrado ao app</li>
        <li><strong>2020–2022</strong>: melhorias massivas de performance, suporte a XOR de 8 bytes, hooks JNI</li>
        <li><strong>2023–2025</strong>: compatibilidade com Android 14+, KernelSU, melhorias no engine de scripts</li>
      </ul>
      <p>
        O app sempre foi gratuito e sem propaganda, financiado por doações via Patreon. O código não é open source, mas a comunidade verificou repetidamente que o app não envia dados pessoais para servidores (análise de tráfego com Wireshark/PCAPdroid não mostra comunicação suspeita), o que mantém a confiança após mais de 50 milhões de downloads acumulados.
      </p>

      <AlertBox type="success" title="Dica para iniciantes">
        Para a maioria dos jogos Unity (que são a maioria dos jogos mobile modernos), comece varrendo a região <strong>Ca</strong>. É onde os valores de gameplay ficam e a busca é muito mais rápida. Use <strong>Dword</strong> para inteiros (moedas, XP) e <strong>Float</strong> para decimais (vida, velocidade). Esses três padrões resolvem ~80% dos casos práticos.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Agora que você entende o que é e como funciona o GG, o próximo passo é instalar e configurar corretamente. Vá para <strong>Instalação</strong> no menu lateral.
      </AlertBox>
    </PageContainer>
  );
}
