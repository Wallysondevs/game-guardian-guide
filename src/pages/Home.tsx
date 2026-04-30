import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Home() {
  return (
    <PageContainer
      title="Game Guardian — Guia Completo"
      subtitle="O guia mais completo sobre Game Guardian em Português Brasileiro — do básico ao avançado, com exemplos práticos, scripts prontos e centenas de dicas testadas pela comunidade."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <AlertBox type="info" title="Bem-vindo ao Guia Game Guardian">
        Este guia cobre absolutamente tudo sobre o Game Guardian: instalação, configuração de root, todos os tipos de busca de memória, edição de valores, freeze, ponteiros, scripts Lua básicos e avançados, bypass de anti-cheat, uso sem root, ética e muito mais. Mais de 100 mil palavras de conteúdo técnico em português brasileiro, organizado em uma trilha didática do iniciante ao especialista.
      </AlertBox>

      <h2>O que você vai encontrar aqui</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { icone: "🔍", titulo: "Busca de Memória", desc: "Aprenda todos os tipos de busca — valor exato, intervalo, XOR para valores encriptados, busca por desconhecido, hexadecimal, busca em grupo e busca por texto. Com exemplos para cada cenário comum.", nivel: "Básico → Avançado" },
          { icone: "✏️", titulo: "Edição e Freeze", desc: "Como modificar valores uma vez, congelar endereços com cadeado, trabalhar com ponteiros estáticos, navegar por estruturas de dados (structs) complexas e fazer modificação em lote.", nivel: "Intermediário" },
          { icone: "📜", titulo: "Scripts Lua", desc: "Automatize suas modificações com scripts Lua — desde scripts simples de uma ação até sistemas completos com menus interativos, multi-thread, dump de memória, hooks de função e muito mais.", nivel: "Avançado" },
          { icone: "🛡️", titulo: "Bypass Anti-Cheat", desc: "Como contornar sistemas de detecção: Magisk + DenyList, Shamiko, PlayIntegrityFix, KernelSU + SUSFS, modo furtivo, renomeação de processo, modificação de APK e os limites do que é possível bypassar.", nivel: "Avançado" },
          { icone: "📱", titulo: "Sem Root", desc: "Use o GG via Virtual Space sem precisar de root — comparação de 6 apps compatíveis, instalação passo a passo, limitações reais, performance e quando é melhor usar root real.", nivel: "Básico" },
          { icone: "🎮", titulo: "Hacks Práticos", desc: "Exemplos passo a passo dos hacks mais comuns: moedas/ouro, vida/HP, velocidade, munição, teleporte, timer, cooldown, desbloqueio de itens, gacha, energia/stamina e muito mais.", nivel: "Intermediário" },
          { icone: "🧰", titulo: "Diagnóstico", desc: "Soluções para os problemas mais comuns: GG não anexa ao processo, busca não retorna resultados, modificação não funciona, jogo crasha, performance ruim — com fluxos de diagnóstico testados.", nivel: "Todos os níveis" },
          { icone: "⚖️", titulo: "Ética e Legal", desc: "Onde está a linha entre uso responsável e prejuízo a outros jogadores. Aspectos legais no Brasil. Quando o uso é aceitável e quando representa fraude ou violação de TOS.", nivel: "Todos os níveis" },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{item.icone}</span>
              <h4 className="font-bold text-foreground text-sm">{item.titulo}</h4>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <span className="text-xs text-primary font-medium">{item.nivel}</span>
          </div>
        ))}
      </div>

      <h2>Trilha de aprendizado recomendada</h2>
      <p>
        Se você é totalmente novo no Game Guardian, siga as fases na ordem. Cada fase constrói sobre a anterior. Pular etapas é o motivo número um pelo qual iniciantes desistem ou se frustram. Calcule cerca de <strong>1-2 horas para a Fase 1</strong>, <strong>3-5 horas para a Fase 2</strong>, e mais algumas dezenas de horas de prática para dominar as Fases 3 e 4 com fluência.
      </p>
      <div className="grid grid-cols-1 gap-2 my-6 not-prose">
        {[
          { fase: "Fase 1 — Fundamentos", topicos: ["O que é Game Guardian?", "Instalação e configuração", "Permissões e Root", "Interface do GG"], cor: "border-l-green-500", desc: "Você termina esta fase sabendo instalar o GG, conceder root, navegar pela interface e entender o que cada elemento da tela faz." },
          { fase: "Fase 2 — Busca", topicos: ["Grupos de Valores (tipos de dados)", "Busca Básica de Valores", "Tipos de Busca (incluindo XOR)", "Hacks Populares"], cor: "border-l-blue-500", desc: "Você termina esta fase fazendo seus primeiros hacks reais — moedas infinitas, vida infinita, velocidade x2 — em jogos offline simples." },
          { fase: "Fase 3 — Edição Avançada", topicos: ["Edição de Memória", "Virtual Space", "Bypass Anti-Cheat", "Solução de Problemas"], cor: "border-l-yellow-500", desc: "Você termina esta fase manipulando ponteiros, lidando com jogos protegidos, configurando ambientes furtivos e diagnosticando problemas sozinho." },
          { fase: "Fase 4 — Automação", topicos: ["Scripts Lua básicos", "Scripts Lua avançados", "Virtual Space + Scripts", "Uso seguro e ética"], cor: "border-l-purple-500", desc: "Você termina esta fase escrevendo scripts próprios — menus interativos, automação de buscas complexas, monitoramento contínuo e até dump/análise de memória." },
        ].map((item) => (
          <div key={item.fase} className={"bg-card border border-border rounded-xl p-4 border-l-4 " + item.cor}>
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.fase}</h4>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <div className="flex flex-wrap gap-2">
              {item.topicos.map((t, i) => (
                <span key={i} className="text-xs bg-muted px-2 py-1 rounded text-muted-foreground">{t}</span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2>Pré-requisitos — o que você precisa antes de começar</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Dispositivo Android", desc: "Qualquer smartphone ou tablet rodando Android 5.0 ou superior. Recomendamos Android 10+ por compatibilidade com Magisk e KernelSU modernos. Tablets, celulares secundários e até emuladores funcionam.", obrigatorio: "Obrigatório" },
          { titulo: "Espaço livre", desc: "Cerca de 20 MB para o app GG, mais 100-300 MB para Magisk + módulos, e o espaço dos jogos que você quer modificar. Reserve pelo menos 1 GB livre para conforto.", obrigatorio: "Obrigatório" },
          { titulo: "Root (recomendado)", desc: "Magisk, KernelSU ou APatch. Sem root, você fica limitado ao Virtual Space, que tem compatibilidade reduzida. Cobrimos a instalação de root passo a passo.", obrigatorio: "Recomendado" },
          { titulo: "Paciência e curiosidade", desc: "Buscar valores na memória é um processo iterativo. Esperam-se 5-15 buscas refinadas até isolar um endereço. Quem persiste descobre coisas incríveis.", obrigatorio: "Mentalidade" },
          { titulo: "Jogos offline para testar", desc: "Comece com jogos simples e single-player. Tower defense, RPGs offline, idle/clicker e quebra-cabeças são perfeitos. Multiplayer fica para depois — se ficar.", obrigatorio: "Recomendado" },
          { titulo: "Conta de testes", desc: "Para qualquer jogo online onde você queira experimentar, crie uma conta separada da principal. Ban é sempre possível em jogos online.", obrigatorio: "Importante" },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-foreground text-sm">{item.titulo}</h4>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{item.obrigatorio}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Por que aprender Game Guardian?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Aprenda na prática", desc: "Modificar memória de jogos é uma forma divertida e prática de aprender conceitos fundamentais de computação: memória RAM, tipos de dados, ponteiros, structs, encriptação básica e até engenharia reversa. Conhecimento real, não acadêmico." },
          { titulo: "Economize tempo de grind", desc: "Use o GG para pular horas de grind repetitivo em jogos single-player e aproveitar o conteúdo que realmente importa. Aquele RPG de 80 horas vira 20. Aquele idle game que pediria meses fica jogável em uma tarde." },
          { titulo: "Desenvolva habilidades técnicas", desc: "Os conceitos aprendidos aqui — ptrace, /proc/PID/mem, regiões virtuais, IEEE 754, encriptação XOR, ponteiros estáticos vs dinâmicos — são diretamente aplicáveis em desenvolvimento, segurança ofensiva, pen-testing mobile e CTFs." },
          { titulo: "Comunidade ativa", desc: "O fórum oficial do GG tem dezenas de milhares de scripts e guias específicos para cada jogo popular. Uma vez entendidos os fundamentos, você pode contribuir, customizar scripts existentes e criar os seus próprios." },
          { titulo: "Acessibilidade", desc: "Para jogadores com limitações físicas (tremor nas mãos, tempo de reação reduzido, dificuldade com jogos rítmicos), o GG é uma ferramenta legítima de acessibilidade que torna jogos jogáveis quando o desenvolvedor não pensou em modos fáceis." },
          { titulo: "Trampolim para segurança", desc: "Quem domina o GG tem base prática para aprender Frida, Objection, Ghidra e outras ferramentas de pen-testing mobile. Vários profissionais de bug bounty começaram explorando jogos com o GG." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>O que o Game Guardian NÃO faz</h2>
      <p>
        Para evitar expectativas irreais — muito tempo é perdido tentando fazer o GG fazer o que ele simplesmente não pode fazer:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "❌ Não burla validação server-side", desc: "Em jogos competitivos online (Free Fire, PUBG, Clash Royale, Brawl Stars, Genshin Impact, Mobile Legends, Call of Duty Mobile, Wild Rift), o servidor calcula tudo. Modificar HP no celular para 99999 não tem efeito — o servidor continua sabendo que você tem 100." },
          { titulo: "❌ Não burla machine learning anti-cheat", desc: "Análise comportamental no servidor detecta padrões impossíveis (matar 100 inimigos sem errar, coletar recursos 50x mais rápido que jogadores normais). Mesmo com valores 'plausíveis', estatísticas anormais geram ban." },
          { titulo: "❌ Não 'gera' itens, dinheiro real ou conteúdo do servidor", desc: "Itens premium são entregues pelo servidor após validação de pagamento. O GG modifica apenas o que está na memória do seu celular — não cria nada do lado do servidor." },
          { titulo: "❌ Não desbloqueia recursos pagos em apps que validam compras", desc: "Apps modernos verificam licenças com Google Play. Modificar uma flag local não convence o servidor de que você comprou. Para isso existe Lucky Patcher (e mesmo ele falha em apps modernos)." },
          { titulo: "❌ Não funciona sem root real ou Virtual Space", desc: "Sem uma das duas opções, o Android isola o GG dos outros processos. É uma limitação fundamental do sistema operacional, não uma falha do app." },
          { titulo: "❌ Não 'invade' jogos online ou roubar contas alheias", desc: "Confusão muito comum: o GG modifica seu próprio celular, não o servidor do jogo nem outras contas. Quem busca isso está perdendo tempo." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Histórico do Game Guardian</h2>
      <p>
        O Game Guardian foi criado em 2014 pelo desenvolvedor russo conhecido como <strong>Brevent</strong> (também responsável por outros utilitários Android avançados). Inicialmente era uma ferramenta simples para encontrar valores numéricos. Ao longo dos anos cresceu para incluir suporte a Lua, busca XOR, Virtual Space, bypass de anti-cheats, hooks JNI e muito mais. Hoje é considerada a ferramenta de modificação de memória Android mais completa, com mais de 50 milhões de downloads históricos e uma comunidade ativa que produz milhares de scripts por mês.
      </p>
      <p>
        O desenvolvedor mantém o GG como software gratuito e sem propaganda, financiado por doações. O código não é open source, mas o app não envia dados para servidores externos (verificável via análise de tráfego), o que aumenta a confiança da comunidade.
      </p>

      <h2>Glossário rápido para iniciantes</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Termo</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Significado</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["GG", "Game Guardian — abreviação usada o tempo todo"],
              ["Root", "Privilégio de superusuário no Android, necessário para o GG ler memória de outros apps"],
              ["Magisk", "Software mais popular para conceder root sem modificar a partição de sistema"],
              ["Endereço de memória", "Posição numérica (ex: 0x7f1a3c50) onde um valor está armazenado na RAM"],
              ["Dword", "Inteiro de 4 bytes — o tipo de dado mais comum em jogos"],
              ["Float", "Número decimal de 4 bytes — usado para HP, velocidade, coordenadas"],
              ["Freeze", "Travar um endereço para que o jogo não consiga mudar o valor"],
              ["Refinar", "Repetir uma busca apenas entre os resultados anteriores para isolar o endereço correto"],
              ["XOR", "Operação de encriptação simples usada por jogos para esconder valores"],
              ["Ponteiro", "Endereço fixo que aponta para outro endereço variável — solução para hacks permanentes"],
              ["Script Lua", "Programa em linguagem Lua que automatiza ações no GG"],
              ["DenyList", "Lista no Magisk de apps que não devem 'ver' que o dispositivo tem root"],
              ["Anti-cheat", "Sistema do jogo que detecta e baneia jogadores que modificam memória"],
              ["Server-side", "Lógica que roda no servidor do jogo — impossível de modificar via GG"],
            ].map(([termo, sig], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-mono text-primary text-sm font-bold">{termo}</td>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{sig}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="success" title="Pronto para começar?">
        Se você é completamente novo, comece por <strong>O que é Game Guardian?</strong> no menu lateral. Se já tem experiência básica e quer melhorar suas buscas, vá direto para <strong>Tipos de Busca</strong> para aprender técnicas como busca XOR, busca em grupo e busca por valor desconhecido. Se você já modifica jogos com facilidade mas quer automatizar, pule para <strong>Scripts Lua</strong>.
      </AlertBox>

      <AlertBox type="warning" title="Aviso final antes de começar">
        Este guia é educacional. O uso do Game Guardian em jogos online competitivos viola os termos de serviço da maioria dos jogos e pode resultar em ban permanente da sua conta. Use com responsabilidade — preferencialmente em jogos offline, single-player ou em conta de testes. Leia a seção <strong>Ética e Responsabilidade</strong> antes de aplicar qualquer hack em jogos com outros jogadores reais.
      </AlertBox>
    </PageContainer>
  );
}
