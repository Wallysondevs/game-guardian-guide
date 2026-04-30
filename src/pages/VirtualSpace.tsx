import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function VirtualSpace() {
  return (
    <PageContainer
      title="Virtual Space — Sem Root"
      subtitle="Use o Game Guardian sem root usando aplicativos de espaço virtual. Guia completo com vantagens, limitações, configuração passo a passo e troubleshooting de cada cenário."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <AlertBox type="info" title="O que é Virtual Space?">
        Um Virtual Space (espaço virtual) é um aplicativo que cria um ambiente Android isolado, onde outros apps rodam como se tivessem permissões elevadas. O GG pode funcionar dentro desse espaço para monitorar e modificar a memória de jogos rodando no mesmo ambiente — sem root real do dispositivo. Isso democratiza o uso do GG: não é mais preciso desbloquear bootloader, fazer root, arriscar warranty ou bricar o aparelho.
      </AlertBox>

      <h2>O problema que o Virtual Space resolve</h2>
      <p>
        Tradicionalmente, o Game Guardian sempre exigiu root. Isso porque o sistema Android isola cada app em uma "sandbox" — cada app só pode acessar a própria memória. Para o GG ler/escrever na memória de outro processo (o jogo), ele precisa de privilégios elevados que apenas o root concede via syscall <code>ptrace()</code>.
      </p>
      <p>
        Mas root tem custos significativos:
      </p>
      <ul>
        <li><strong>Perda de garantia</strong>: muitos fabricantes consideram bootloader desbloqueado como motivo para anular garantia.</li>
        <li><strong>Risco de bricking</strong>: erros durante o processo de root podem deixar o aparelho inutilizável.</li>
        <li><strong>Apps bancários e Pix bloqueados</strong>: SafetyNet/Play Integrity detectam root e bloqueiam Nubank, Itaú, Caixa, e outros apps financeiros.</li>
        <li><strong>Atualizações OTA quebram</strong>: atualizações de sistema costumam falhar ou voltar para sem-root, exigindo refazer todo o processo.</li>
        <li><strong>Complexidade técnica</strong>: o processo varia por modelo, ROM, versão Android — exige pesquisa e tempo.</li>
      </ul>
      <p>
        O Virtual Space contorna isso elegantemente: cria um ambiente onde apps "convivem" no mesmo processo do VS, e portanto têm acesso natural à memória uns dos outros. Sem alterar nada no sistema base do Android.
      </p>

      <h2>Como funciona o Virtual Space</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Ambiente isolado", desc: "O Virtual Space cria um contêiner separado com sistema de arquivos próprio (montado em /data/data/com.virtual.space/), onde apps instalados funcionam como subprocessos do espaço virtual em vez de processos top-level do Android." },
          { titulo: "Permissões elevadas internas", desc: "Dentro do espaço virtual, o GG tem permissão para acessar a memória de outros processos rodando no MESMO espaço sem root real do sistema. Isso porque, do ponto de vista do Linux, todos rodam como filhos do mesmo processo pai (o Virtual Space)." },
          { titulo: "Mesma sessão de processo", desc: "O jogo e o GG rodam como subprocessos do mesmo app de Virtual Space, permitindo cross-process memory access. Tecnicamente, é o app Virtual Space quem faz o ptrace() — e como ele é o pai dos dois processos, isso é permitido sem root." },
          { titulo: "Limitações de kernel", desc: "Sem root real, algumas operações de kernel não são possíveis: hooks profundos, modificação de syscalls, leitura de memória de processos fora do VS. Anti-cheats podem detectar o ambiente virtual e recusar rodar." },
          { titulo: "Performance", desc: "Há overhead de virtualização — o Virtual Space precisa interceptar chamadas de sistema e mediar entre o jogo e o Android real. Isso causa 5-15% de queda de FPS em jogos pesados." },
          { titulo: "Armazenamento separado", desc: "Cada app instalado no VS tem seus próprios saves, separados do app instalado normalmente no Android. Cuidado: progresso de uma instância NÃO sincroniza com a outra a menos que use cloud save." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Aplicativos de Virtual Space compatíveis</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">App</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Android</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Compatibilidade GG</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Notas</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Virtual Space (oficial)", "5.0 – 12", "⭐⭐⭐⭐⭐", "Integrado ao GG. Opção nativa no próprio app. Sempre primeira escolha."],
              ["VirtualXposed", "5.0 – 10", "⭐⭐⭐⭐", "Suporta módulos Xposed sem root. Pode ser instável no Android 10+. Bom para hooks avançados."],
              ["Parallel Space", "4.0 – 11", "⭐⭐⭐", "Popular para contas duplas. Suporte ao GG variável. Cheio de propaganda na versão grátis."],
              ["Dual Space Pro", "5.0 – 12", "⭐⭐⭐", "Baseado no Parallel Space. Funciona com alguns jogos. Versão paga sem ads."],
              ["Island", "5.0 – 13", "⭐⭐", "Usa Work Profile do Android. Mais limitado para hacks mas oficialmente suportado pelo Google."],
              ["Shelter", "8.0 – 13", "⭐⭐", "Similar ao Island. Bom para privacidade, limitado para GG. Open-source."],
              ["F-Droid (DroidGuard)", "7.0 – 13", "⭐⭐", "Alternativa open-source sem rastreio. Configuração mais técnica."],
              ["GameSpace (do GG)", "5.0 – 13", "⭐⭐⭐⭐⭐", "Versão melhorada do Virtual Space oficial. Otimizado especificamente para gaming + GG."],
              ["VMOS / VirtualMachine", "5.0 – 12", "⭐⭐⭐⭐", "Cria Android completo em VM. Mais lento mas isola tudo. Funciona com root virtual interno."],
            ].map(([app, android, compat, notas], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{app}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{android}</td>
                <td className="px-4 py-2 border border-border text-sm">{compat}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{notas}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Configurando o Virtual Space integrado do GG</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", title: "Instale o GG normalmente", desc: "Baixe e instale o APK do GG do site oficial (gameguardian.net). Não precisa de root.", detail: "Habilite 'Fontes desconhecidas' nas configurações de segurança do Android. Em Android 10+, isso é por app — autorize especificamente o navegador ou app de arquivos que está instalando o APK." },
          { n: "2", title: "Selecione Virtual Space na primeira abertura", desc: "Ao abrir o GG, ele pergunta como executar. Selecione 'Virtual Space' (sem root).", detail: "Uma cópia do app Virtual Space será instalada automaticamente. Tamanho aproximado: 30-50MB extras. Primeira execução pode demorar 30-60 segundos para configurar o ambiente." },
          { n: "3", title: "Instale o jogo dentro do Virtual Space", desc: "No GG → Virtual Space → Adicionar Aplicativo → selecione o jogo instalado. O jogo será 'clonado' no ambiente virtual.", detail: "O jogo roda em paralelo com a versão original. Seus dados são separados — começa do zero. Para jogos com cloud save, faça login com a mesma conta para recuperar progresso." },
          { n: "4", title: "Inicie o jogo pelo Virtual Space", desc: "No GG → Virtual Space → toque no ícone do jogo. O jogo abre dentro do espaço virtual com o GG monitorando.", detail: "IMPORTANTE: o jogo deve ser iniciado pelo GG/Virtual Space, não pelo ícone normal na tela inicial. Você pode criar atalho na home do Android para abrir direto pelo VS." },
          { n: "5", title: "Use o GG normalmente", desc: "Com o jogo aberto pelo Virtual Space, toque no ícone flutuante do GG e faça as buscas normalmente.", detail: "As mesmas técnicas de busca funcionam — pode haver pequenas diferenças de velocidade. Espere 5-15% mais lento em buscas extensas." },
          { n: "6", title: "Configure persistência (opcional)", desc: "GG → Configurações → Iniciar com sistema → habilitado. O VS abre automaticamente ao ligar o aparelho.", detail: "Útil se você usa o VS frequentemente. Consome bateria adicional em standby — desabilite se não usa diariamente." },
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

      <h2>Configurando VirtualXposed (alternativa avançada)</h2>
      <p>
        Se o Virtual Space oficial do GG não funciona com seu jogo, o VirtualXposed é a próxima melhor opção. Ele suporta módulos Xposed, permitindo hooks adicionais que ajudam a contornar detecções:
      </p>
      <CodeBlock
        language="text"
        title="Setup VirtualXposed para GG"
        code={"1. Baixe VirtualXposed do GitHub oficial:\n   https://github.com/android-hacker/VirtualXposed\n   (Último release estável geralmente é v0.20.x)\n\n2. Instale o APK\n   - Habilite 'Fontes desconhecidas'\n   - Aceite todas as permissões\n\n3. Adicione o GG ao VirtualXposed\n   - Abra VirtualXposed\n   - Toque em '+' → Adicionar Aplicativo\n   - Selecione Game Guardian\n   - Aguarde processamento (1-2 min)\n\n4. Adicione o JOGO ao VirtualXposed\n   - Mesmo processo: '+' → Adicionar → selecione jogo\n\n5. (Opcional) Instale módulos Xposed úteis\n   - VirtualXposed → módulos → instalar\n   - 'Hide My Applist' → esconde GG do jogo\n   - 'XPrivacyLua' → falsifica permissões\n   - Reinicie VirtualXposed após instalar módulos\n\n6. Use o jogo via VirtualXposed\n   - Toque no jogo dentro do VirtualXposed\n   - Abra o GG via menu flutuante normal\n\n// VANTAGENS sobre Virtual Space oficial:\n// - Suporte a módulos Xposed (mais flexibilidade)\n// - Melhor compatibilidade com jogos que detectam VS\n// - Open-source — auditável\n//\n// DESVANTAGENS:\n// - Mais complexo de configurar\n// - Não é atualizado tão frequentemente\n// - Menos otimizado para gaming"}
      />

      <h2>Root vs Virtual Space — comparação detalhada</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Aspecto</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Com Root</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Virtual Space (Sem Root)</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Configuração", "Complexa (requer desbloqueio de bootloader, flash de Magisk)", "Simples — instale e use em 5 minutos"],
              ["Tempo de setup", "30 minutos a 2 horas (varia por modelo)", "5-10 minutos"],
              ["Risco de bricking", "Existe — erros podem inutilizar o aparelho", "Zero — apenas instala app"],
              ["Garantia", "Geralmente perdida (bootloader desbloqueado)", "Mantida"],
              ["Apps bancários (Pix, Nubank)", "Bloqueados sem PlayIntegrityFix configurado", "Funcionam normalmente"],
              ["Compatibilidade de jogos", "Alta — funciona com a maioria", "Média — alguns jogos recusam rodar em VS"],
              ["Velocidade de busca", "Máxima — sem overhead", "Levemente mais lenta (5-15%)"],
              ["Regiões de memória", "Todas disponíveis (Ca, Cb, Cd, Xa, A, S)", "Algumas regiões podem ser limitadas"],
              ["Java heap (Jh) acesso", "Total", "Limitado em alguns VS"],
              ["Memória de outros apps", "Acessível", "Apenas apps DENTRO do VS"],
              ["Performance no jogo", "Nativa", "5-15% queda de FPS"],
              ["Detecção anti-cheat", "Detectável (root), requer DenyList", "Detectável (processo virtual), mais difícil de bypass"],
              ["Updates OTA do Android", "Quebram setup, precisa refazer root", "Funcionam normalmente"],
              ["Scripts Lua avançados", "Suporte completo", "Alguns recursos avançados indisponíveis (memória de outros processos)"],
              ["Múltiplas contas no jogo", "Possível mas complicado", "Nativo — VS é o caso de uso"],
              ["Backup completo do save", "Total via TWRP", "Apenas dentro do VS"],
            ].map(([aspecto, root, vs], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{aspecto}</td>
                <td className="px-4 py-2 border border-border text-green-400 text-sm">{root}</td>
                <td className="px-4 py-2 border border-border text-yellow-400 text-sm">{vs}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="warning" title="Jogos que bloqueiam Virtual Space">
        Alguns jogos verificam se estão rodando em um ambiente virtual e recusam iniciar ou funcionam de forma limitada. Exemplos conhecidos: PUBG Mobile, Free Fire, Call of Duty Mobile, Genshin Impact, Honkai Star Rail. Nesses casos, a única opção é usar root real com DenyList configurado, ou aceitar que o jogo não é hackeável via GG no seu dispositivo.
      </AlertBox>

      <h2>Engine de detecção de Virtual Space</h2>
      <p>
        Como os jogos detectam Virtual Space? Entender isso ajuda a escolher qual VS usar e diagnosticar problemas:
      </p>
      <CodeBlock
        language="text"
        title="Métodos de detecção de Virtual Space (referência)"
        code={"1. ProcessId (PID) suspeito\n   Apps em VS têm PID de processo filho do VS\n   Anti-cheat verifica getppid() != 1 (parent != init)\n   Defesa: VS modifica getppid() para retornar 1\n\n2. Pacote pai (parent package)\n   Verifica se o package que iniciou o app é o app oficial\n   Em VS, parent é com.virtual.space (ou similar)\n   Defesa: módulo Xposed que mente sobre parent\n\n3. Path do APK\n   APK normal: /data/app/com.jogo.exemplo/base.apk\n   APK em VS: /data/data/com.virtual.space/virtual/data/app/.../base.apk\n   Anti-cheat verifica path com File.getAbsolutePath()\n   Defesa: VS faz spoof de path\n\n4. Processos rodando\n   Anti-cheat lista processos via ps ou /proc/\n   Vê com.virtual.space rodando em paralelo\n   Defesa: filtrar lista de processos visíveis\n\n5. UID compartilhado\n   Em VS, jogos têm o mesmo UID do VS\n   Anti-cheat verifica se UID é único\n   Defesa: VS aloca UIDs separados (alguns)\n\n6. Hooks de funções nativas\n   Funções como mmap, ptrace são interceptadas pelo VS\n   Anti-cheat compara endereços de funções\n   Defesa: VirtualXposed reescreve essas verificações\n\n7. Verificação de Play Store install\n   App pergunta ao Play Store se foi instalado por lá\n   Apps em VS não têm registro\n   Defesa: módulo que falsifica resposta da Play Store\n\n// Conclusão: jogos modernos (com investimento em anti-cheat)\n// detectam VS facilmente. Jogos casuais e indies geralmente não.\n// VS é melhor para 60-70% dos jogos mobile, mas não para os top tier."}
      />

      <h2>Problemas comuns com Virtual Space</h2>
      <div className="grid grid-cols-1 gap-3 my-4 not-prose">
        {[
          { prob: "Jogo não aparece na lista do Virtual Space", sol: "O jogo pode estar na lista de incompatíveis do VS oficial. Tente VirtualXposed ou Parallel Space como alternativa. Verifique também se o jogo está realmente instalado no Android (não em outro VS)." },
          { prob: "GG não encontra processo do jogo", sol: "Abra o jogo pelo Virtual Space (não pelo ícone normal). O processo só é visível ao GG quando iniciado dentro do VS. Se mesmo assim não aparecer, reinicie o VS completamente." },
          { prob: "Busca retorna 0 resultados (diferente do root)", sol: "VS pode não ter acesso a todas as regiões de memória. Tente região A em vez de Ca. Algumas regiões da Java Heap (Jh) também podem estar inacessíveis dependendo do VS." },
          { prob: "Jogo fecha ao abrir pelo Virtual Space", sol: "Alguns jogos detectam o ambiente virtual. Tente desabilitar a assinatura APK no VS, ou use versão mais antiga do jogo. Última opção: tente VMOS (Android virtual completo)." },
          { prob: "FPS muito baixo no jogo via VS", sol: "Esperado overhead de 5-15%. Se for muito mais, feche outros apps, baixe configurações gráficas. VMOS tem mais overhead que VS comum." },
          { prob: "Save game perdeu progresso", sol: "Saves dentro do VS são separados. Para preservar, faça login com conta cloud (Google, Facebook) que sincroniza saves. Backup local é por VS — perde tudo se desinstalar o VS." },
          { prob: "Bateria descarregando rápido", sol: "VS consome mais CPU constantemente. Feche o VS quando não estiver jogando. Desabilite 'iniciar com sistema' se ativado." },
          { prob: "GG flutuante não aparece dentro do jogo via VS", sol: "Permissão 'Display over other apps' precisa ser concedida ao GG E ao Virtual Space. Verifique em Configurações Android → Apps → permissões especiais." },
          { prob: "Sem som no jogo via VS", sol: "Conhecido bug em alguns VS no Android 12+. Tente VirtualXposed ou GameSpace. Algumas vezes resolve reiniciar o telefone após instalar VS." },
          { prob: "Login com Google não funciona dentro do VS", sol: "VS sem suporte a Google Play Services. Use email/senha em vez de Google login, ou instale Google Play Services dentro do próprio VS (em alguns VS é possível)." },
        ].map((item) => (
          <div key={item.prob} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-yellow-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">⚠️ {item.prob}</h4>
            <p className="text-xs text-muted-foreground">{item.sol}</p>
          </div>
        ))}
      </div>

      <h2>Quando preferir cada solução</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-blue-500">
          <h4 className="font-bold text-foreground mb-2">Use Virtual Space quando:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>✓ Você não quer ou não pode fazer root</li>
            <li>✓ Aparelho ainda na garantia</li>
            <li>✓ Usa apps bancários (Pix, Nubank, Itaú)</li>
            <li>✓ Jogo é offline ou casual sem anti-cheat pesado</li>
            <li>✓ Quer testar o GG sem comprometer o aparelho</li>
            <li>✓ Aparelho secundário sem dados importantes</li>
            <li>✓ Quer múltiplas contas no mesmo jogo</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-green-500">
          <h4 className="font-bold text-foreground mb-2">Use Root quando:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>✓ Jogo recusa rodar em Virtual Space</li>
            <li>✓ Precisa de máxima compatibilidade</li>
            <li>✓ Quer scripts Lua avançados sem limitações</li>
            <li>✓ Jogo tem anti-cheat que você precisa bypassar</li>
            <li>✓ Você já tem expertise em Magisk</li>
            <li>✓ Aparelho é dedicado a gaming/hacking</li>
            <li>✓ Performance máxima é crítica</li>
          </ul>
        </div>
      </div>

      <AlertBox type="success" title="Recomendação para iniciantes">
        Comece <strong>sempre</strong> pelo Virtual Space. Se o jogo que você quer hackear funcionar, ótimo — você tem todas as funcionalidades sem riscos. Só considere root se o VS não der certo, ou se você quer aprender técnicas avançadas que exigem acesso completo. A grande maioria dos jogos casuais e RPGs offline funcionam perfeitamente via VS.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Para entender em detalhe como anti-cheats funcionam (root ou VS detection), vá para <strong>Bypass Anti-Cheat</strong>. Para minimizar risco de ban em qualquer modo (root ou VS), leia <strong>Uso Seguro</strong>.
      </AlertBox>
    </PageContainer>
  );
}
