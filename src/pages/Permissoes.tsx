import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Permissoes() {
  return (
    <PageContainer
      title="Permissões e Root"
      subtitle="Como o Game Guardian obtém acesso à memória de outros processos — root, permissões, métodos de execução, ptrace, SELinux e tudo que acontece por baixo do capô."
      difficulty="intermediario"
      timeToRead="22 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Root"}</strong> {' — '} {"acesso total ao sistema; necessário sem VS."}
          </li>
        <li>
            <strong>{"Draw over apps"}</strong> {' — '} {"para overlay flutuante sobre o jogo."}
          </li>
        <li>
            <strong>{"Storage"}</strong> {' — '} {"salvar tabelas e scripts."}
          </li>
        <li>
            <strong>{"Magisk DenyList"}</strong> {' — '} {"esconde root do jogo."}
          </li>
        <li>
            <strong>{"SELinux permissive"}</strong> {' — '} {"se setenforce 0 ajuda em alguns devices."}
          </li>
        </ul>
        <AlertBox type="warning" title="Root é necessário para funcionalidade completa">
        O Android isola processos por segurança. Sem root, o GG não pode acessar a memória de outros apps. O Virtual Space contorna isso parcialmente criando um sandbox onde o jogo e o GG vivem como subprocessos do mesmo app de VS — mas root real oferece acesso completo, mais velocidade e compatibilidade com mais jogos.
      </AlertBox>

      <h2>Por que o GG precisa de root?</h2>
      <p>
        O Linux (núcleo do Android) usa um modelo de segurança baseado em usuários. Cada app instalado recebe um <strong>UID</strong> (User ID) único — geralmente algo como 10045, 10052, etc. Quando você instala um jogo, ele recebe um UID. Quando você instala o GG, ele recebe outro UID diferente. Essa separação é fundamental para a segurança do Android.
      </p>
      <p>
        O kernel Linux impede que um processo com UID X leia ou escreva na memória de um processo com UID Y diferente. Tecnicamente, isso é implementado através do controle de acesso ao arquivo virtual <code>/proc/PID/mem</code>, que representa a memória do processo. Sem root, apenas o próprio processo (mesmo UID) pode acessar seu próprio <code>/proc/PID/mem</code>. Com root (UID 0, "superusuário"), todas as restrições caem.
      </p>
      <CodeBlock
        language="text"
        title="Como o GG acessa memória com e sem root"
        code={"Sem root:\n  GG (UID 10045) tenta abrir /proc/12345/mem (jogo)\n  → open() retorna -1, errno = EACCES (Permission denied)\n  → Mesmo se forçar via syscall direta: bloqueado pelo kernel\n  → Resultado: GG não consegue listar nem ler valores do jogo\n\nCom root:\n  GG (UID 0, root) abre /proc/12345/mem\n  → open() retorna file descriptor válido\n  → Pode usar pread()/pwrite() em qualquer offset\n  → Resultado: acesso total à memória do processo 12345\n\nFluxo interno do GG:\n  1. GG enumera processos via /proc/[0-9]+\n  2. Lê /proc/PID/maps para descobrir regiões de memória\n     (ex: 7f1a000000-7f1a100000 rw-p [heap])\n  3. Anexa-se ao processo via ptrace(PTRACE_ATTACH, PID)\n     → pausa o processo do jogo brevemente\n  4. Lê /proc/PID/mem em massa para a busca\n  5. Escreve no /proc/PID/mem para modificar valores\n  6. ptrace(PTRACE_DETACH, PID) para desanexar"}
      />

      <h2>O que é ptrace e por que importa</h2>
      <p>
        <code>ptrace</code> é uma syscall do Linux que permite a um processo controlar outro processo — ler/escrever sua memória, ler seus registradores, pausar e continuar a execução. É a mesma syscall usada por debuggers como o gdb. O GG usa ptrace para se "anexar" ao jogo.
      </p>
      <CodeBlock
        language="text"
        title="Anatomia de uma operação ptrace típica do GG"
        code={"// 1. GG identifica o PID do processo do jogo\nint pid_jogo = 12345;\n\n// 2. Anexa ao processo (com root, sempre permitido)\nptrace(PTRACE_ATTACH, pid_jogo, 0, 0);\nwaitpid(pid_jogo, &status, 0);  // espera processo parar\n\n// 3. Abre /proc/PID/mem\nint mem_fd = open(\"/proc/12345/mem\", O_RDWR);\n\n// 4. Lê 4 bytes do endereço 0x7f1a3c50\nuint32_t valor;\npread(mem_fd, &valor, 4, 0x7f1a3c50);\n// valor = 100 (HP atual do personagem)\n\n// 5. Escreve novo valor (9999)\nuint32_t novo_valor = 9999;\npwrite(mem_fd, &novo_valor, 4, 0x7f1a3c50);\n\n// 6. Fecha file descriptor\nclose(mem_fd);\n\n// 7. Desanexa do processo (jogo continua)\nptrace(PTRACE_DETACH, pid_jogo, 0, 0);\n\n// O jogo na próxima leitura de hp encontra 9999\n// e desenha esse valor na tela."}
      />
      <p>
        Apps que monitoram tentativas de ptrace conseguem detectar o GG. Por isso, anti-cheats avançados verificam <code>/proc/self/status</code> para ver o campo <code>TracerPid</code> — se for diferente de 0, o app sabe que está sendo "traçado". O modo furtivo do GG mascara essa informação.
      </p>

      <h2>Métodos de root disponíveis em 2025</h2>
      <div className="grid grid-cols-1 gap-4 my-6 not-prose">
        {[
          {
            nome: "Magisk", versao: "Magisk 27+ (2025)", status: "✅ Recomendado para 95% dos casos",
            desc: "Root no espaço do usuário via Magic Mount — não modifica a partição /system, apenas a sobrepõe em runtime. Suporta módulos, DenyList nativo, Zygisk para hooks profundos. Mantido pela comunidade após topjohnwu sair do projeto em 2022.",
            pros: ["DenyList para ocultar root por app", "Suporte massivo a módulos (PlayIntegrityFix, Shamiko, TrickyStore, etc.)", "Compatível com SafetyNet/Play Integrity (com módulos)", "Ampla compatibilidade — funciona em quase qualquer Android moderno", "Comunidade enorme, suporte em XDA, Reddit, Telegram", "Atualizações regulares"],
            cons: ["Requer bootloader desbloqueado (apaga dados)", "Detectável por anti-cheats avançados se não configurado", "SafetyNet pode falhar sem módulos extras", "Em alguns dispositivos, OTA quebra root e precisa re-patchar"],
            inst: "Site: github.com/topjohnwu/Magisk"
          },
          {
            nome: "KernelSU", versao: "Kernel 5.4+ requerido", status: "⭐ Avançado, máxima evasão",
            desc: "Root no nível do kernel — opera dentro do próprio kernel do Linux, antes mesmo do espaço do usuário. Muito mais difícil de detectar que Magisk porque processos no espaço do usuário não conseguem ver o que acontece no kernel diretamente.",
            pros: ["Detecção muito mais difícil", "Controle granular por app — root concedido individualmente", "Suporte a SUSFS (filesystem stealth) para esconder arquivos", "Compatível com módulos Magisk via Zygisk-Next", "Performance levemente melhor", "Não usa Magic Mount — mais limpo"],
            cons: ["Requer kernel compatível (verificar lista oficial)", "Para dispositivos não suportados, precisa compilar kernel customizado", "Instalação mais complexa", "Menos módulos exclusivos disponíveis", "Documentação ainda em desenvolvimento"],
            inst: "Site: github.com/tiann/KernelSU"
          },
          {
            nome: "APatch", versao: "Recente (2024+)", status: "🔶 Alternativa ao KernelSU",
            desc: "Patcha o kernel via patch de bytes em runtime, sem necessidade de recompilar o kernel inteiro. Mais fácil de instalar que KernelSU em dispositivos não suportados nativamente.",
            pros: ["Mais fácil que KernelSU para dispositivos não suportados", "Não precisa recompilar kernel", "Suporte crescente", "Funciona em mais dispositivos que KernelSU", "Compatível com módulos Magisk via APModule"],
            cons: ["Comunidade muito menor", "Menos módulos disponíveis", "Bugs ocasionais (projeto novo)", "Documentação limitada", "Risco maior em dispositivos não testados"],
            inst: "Site: github.com/bmax121/APatch"
          },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center gap-3 mb-3 flex-wrap">
              <h4 className="font-bold text-foreground text-base">{item.nome}</h4>
              <code className="text-xs text-muted-foreground">{item.versao}</code>
              <span className="text-xs ml-auto">{item.status}</span>
            </div>
            <p className="text-sm text-foreground/80 mb-3">{item.desc}</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-xs font-semibold text-green-400 mb-1">Vantagens</p>
                <ul className="space-y-0.5">{item.pros.map((p, i) => <li key={i} className="text-xs text-foreground/80">✓ {p}</li>)}</ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-destructive mb-1">Desvantagens</p>
                <ul className="space-y-0.5">{item.cons.map((c, i) => <li key={i} className="text-xs text-muted-foreground">✗ {c}</li>)}</ul>
              </div>
            </div>
            <p className="text-xs text-primary mt-3">{item.inst}</p>
          </div>
        ))}
      </div>

      <h2>Concedendo permissão root ao GG</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Método de root</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Como conceder ao GG</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Magisk", "Abra o GG → aparece diálogo de root → conceda. Ou: Magisk → Superusuário → toque no '+' → adicione o GG manualmente. Recomenda-se 'Lembrar para sempre'."],
              ["KernelSU", "KernelSU Manager → Superusuário → encontre o GG na lista de apps → toque no switch → escolha 'Permitir'. Configure também os 'Capability sets' se necessário (deixe padrão)."],
              ["APatch", "APatch Manager → SuperUser → adicione o GG com escopo de root. Pode customizar UID, GID e capabilities específicas se for usuário avançado."],
              ["Virtual Space (sem root)", "Não precisa conceder root — o VS simula as permissões internamente. O GG vê o jogo porque ambos rodam no mesmo processo do app de Virtual Space."],
              ["SuperSU (legado)", "SuperSU app → toque no GG na lista → 'Conceder'. Use apenas em Android antigo (4-7) que não suporta Magisk moderno."],
            ].map(([metodo, como], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-primary text-sm">{metodo}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{como}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Verificando se o root está ativo</h2>
      <CodeBlock
        language="text"
        title="Comandos para verificar root no terminal (Termux ou similar)"
        code={"// Abra Termux ou qualquer emulador de terminal:\n$ su\n# (prompt muda para # = root ativo!)\n\n// Verificar UID atual (deve ser 0):\n# id\nuid=0(root) gid=0(root) groups=0(root) ...\n\n// Verificar versão do Magisk:\n# magisk -v\n26.4:MAGISK\n# magisk -V\n26400\n\n// Verificar Zygisk:\n# magisk --zygisk\nenabled\n\n// Verificar processos com acesso root:\n# cat /proc/1/status | grep CapEff\nCapEff: 000001ffffffffff (todas as capabilities)\n\n// Verificar se GG está rodando como root:\n# ps -ef | grep gameguardian\nu0_a45 ... com.heinrich_r.btcoexapp.eu.gg\n# (aparece como u0_a45 normalmente; quando precisa de root,\n#  invoca su internamente para a operação específica)\n\n// Verificar SELinux:\n# getenforce\nEnforcing\n# (Magisk lida com políticas necessárias automaticamente)\n\n// Verificar módulos instalados:\n# ls /data/adb/modules/\nplayintegrityfix/\nshamiko/\nzygisk-next/\n\n// Testar capacidade de ler memória de outro processo:\n# ps -ef | grep telegram   # exemplo, qualquer app rodando\n# (anote o PID, ex: 4567)\n# cat /proc/4567/maps | head\n# (deve listar regiões de memória sem 'Permission denied')"}
      />

      <h2>SELinux e permissões de kernel</h2>
      <p>
        O <strong>SELinux</strong> (Security-Enhanced Linux) é uma camada adicional de controle de acesso obrigatório (MAC — Mandatory Access Control) que opera além do controle por UID. Foi originalmente desenvolvido pela NSA dos EUA e adotado pelo Android desde a versão 4.3. Mesmo com root (UID 0), o SELinux pode bloquear operações específicas baseado em "tipos" de processo e arquivo.
      </p>
      <p>
        O Android usa SELinux em modo Enforcing por padrão desde 5.0. Isso significa que cada processo é rotulado com um tipo (ex: <code>untrusted_app</code>, <code>system_server</code>, <code>kernel</code>) e há regras detalhadas sobre quais tipos podem fazer o quê com quais arquivos. Por exemplo, mesmo que um app tenha UID root, o SELinux pode impedir que ele leia arquivos de sistema com tipo <code>system_data_file</code>.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { modo: "SELinux Enforcing", desc: "Modo padrão de produção. Políticas de segurança ativas e bloqueando violações. Algumas operações do GG podem ser bloqueadas em casos específicos.", solucao: "Módulos Magisk como o próprio GG geralmente configuram políticas SELinux (.te files) necessárias automaticamente. Se houver problema, instale o módulo 'magiskpolicy' adicional." },
          { modo: "SELinux Permissive", desc: "Políticas registradas mas não impostas — tudo é permitido, violações são apenas logadas. Máxima compatibilidade, mas menor segurança do sistema. Não recomendado em uso geral.", solucao: "Use 'su -c setenforce 0' via terminal root para modo permissivo (temporário, volta ao Enforcing no reboot). Permanente requer modificação de boot.img ou módulo Magisk específico." },
          { modo: "SELinux Disabled", desc: "Completamente desligado. Praticamente nunca usado em Android moderno — quebra muitas coisas do sistema. Apenas em ROMs muito específicas.", solucao: "Não recomendado para uso normal. Apenas para análise de segurança em laboratório." },
        ].map((item) => (
          <div key={item.modo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.modo}</h4>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <p className="text-xs text-primary">{item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Permissões adicionais que o GG pede</h2>
      <p>
        Além de root, o GG precisa de algumas permissões padrão Android para funcionar plenamente:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { perm: "Armazenamento", api: "READ_EXTERNAL_STORAGE / WRITE_EXTERNAL_STORAGE", desc: "Necessário para ler scripts .lua armazenados em /sdcard/, salvar dumps de memória, importar/exportar listas de favoritos." },
          { perm: "Sobreposição (overlay)", api: "SYSTEM_ALERT_WINDOW", desc: "Permite o ícone flutuante e o painel do GG aparecerem sobre outros apps. Sem isso, você precisaria sair do jogo para acessar o GG — inviável." },
          { perm: "Acessibilidade (opcional)", api: "BIND_ACCESSIBILITY_SERVICE", desc: "Melhora confiabilidade em alguns cenários. Permite ao GG detectar quando o jogo está em foco e ajustar comportamento." },
          { perm: "Notificação persistente", api: "FOREGROUND_SERVICE", desc: "Mantém uma notificação ativa que serve como ponto de entrada quando o ícone flutuante está oculto." },
          { perm: "Instalação de apps", api: "REQUEST_INSTALL_PACKAGES", desc: "Para o caso do GG pedir para instalar app de Virtual Space na primeira execução." },
          { perm: "Vibração", api: "VIBRATE", desc: "Feedback tátil ao concluir buscas ou modificações." },
        ].map((item) => (
          <div key={item.perm} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.perm}</h4>
            <code className="text-xs text-muted-foreground block mb-2">{item.api}</code>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Permissões avançadas (apenas com root)</h2>
      <p>
        Quando o root está ativo, o GG ganha acesso a operações que apps normais nunca conseguiriam:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Leitura de /proc/PID/mem", desc: "O coração do GG. Permite ler a memória RAM completa de qualquer processo do sistema." },
          { titulo: "Escrita em /proc/PID/mem", desc: "Permite modificar memória de qualquer processo. Sem isso, o GG seria apenas um leitor sem capacidade de modificar." },
          { titulo: "ptrace() em qualquer processo", desc: "Anexa ao processo do jogo para pausar e analisar. Necessário para escrita coerente em alguns casos." },
          { titulo: "Acesso a /dev/kmem (alguns dispositivos)", desc: "Memória do kernel. Quase nunca usado pelo GG, mas tecnicamente acessível." },
          { titulo: "Modificação de propriedades do sistema", desc: "Via setprop, pode mudar fingerprint do dispositivo (usado por módulos como PIF)." },
          { titulo: "Acesso ao filesystem completo", desc: "Pode ler/escrever em /system, /data/data/* (pasta privada de outros apps), /vendor, etc." },
          { titulo: "Manipulação de processos", desc: "kill -9 em qualquer processo, mudar prioridade, suspender/retomar threads." },
          { titulo: "Acesso direto ao kernel via syscalls privilegiadas", desc: "Operações como mount/umount de filesystems, modprobe (carregar módulos do kernel), etc." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-3">
            <h4 className="font-bold text-foreground mb-1 text-xs">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Como o root é detectado por anti-cheats</h2>
      <p>
        Anti-cheats usam várias estratégias para detectar dispositivos com root. Entender como eles detectam ajuda a configurar a evasão correta:
      </p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Método de detecção</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">O que verifica</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Como o GG/Magisk burla</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Verificação de arquivos su", "Existência de /system/bin/su, /system/xbin/su, /sbin/su, /vendor/bin/su", "Magisk não copia 'su' para /system — usa magic mount em runtime, invisível para listagem normal"],
              ["Build tags", "ro.build.tags = 'test-keys' (indica build não oficial)", "PIF e MagiskHide modificam essa propriedade para 'release-keys'"],
              ["Detecção de Magisk", "Existência de /sbin/.magisk, /data/adb/magisk, processo magiskd", "Shamiko + Zygisk escondem esses caminhos do app específico"],
              ["KeyAttestation", "Pede ao TEE (Trusted Execution Environment) para atestar integridade do kernel", "TrickyStore intercepta e fornece atestação válida falsa"],
              ["TracerPid em /proc/self/status", "Se outro processo está fazendo ptrace neste app", "Modo furtivo do GG zera esse campo após anexar"],
              ["Detecção de overlays", "Apps com permissão de SYSTEM_ALERT_WINDOW desenhando sobre o jogo", "GG → Configurações → ocultar ícone, ou desabilitar overlay durante o jogo"],
              ["Análise de pacotes instalados", "Verifica se apps suspeitos (GG, Lucky Patcher) estão instalados via PackageManager", "DenyList esconde apps específicos da listagem"],
              ["Hash de bibliotecas", "Calcula MD5 das libs nativas do jogo e compara com servidor", "Não há bypass via Magisk — requer modificação do APK"],
              ["Comportamento em runtime", "Detecta operações suspeitas (escritas estranhas em memória própria)", "Configurações conservadoras: valores plausíveis, não freeze de muitos endereços, etc."],
            ].map(([metodo, oque, bypass], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{metodo}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{oque}</td>
                <td className="px-4 py-2 border border-border text-primary text-sm">{bypass}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Configurando DenyList passo a passo</h2>
      <CodeBlock
        language="text"
        title="DenyList — configuração detalhada para máxima evasão"
        code={"1. Habilite o DenyList:\n   Magisk → Configurações → role até a seção 'Magisk'\n   → 'Habilitar DenyList' = ON\n   → 'Habilitar Zygisk' = ON (necessário para Shamiko funcionar)\n\n2. Adicione o jogo:\n   Magisk → Configurações → DenyList → toque em 'Configurar'\n   → role e encontre o jogo (ex: 'Free Fire')\n   → marque o checkbox principal\n   → expanda e marque TODOS os processos auxiliares\n     (anti-cheat geralmente roda em processo separado)\n\n3. Adicione apps relacionados:\n   - O jogo principal\n   - Anti-cheat (se for app separado, ex: 'GameSafe')\n   - Sistema do fabricante que verifica root (em Samsung Knox)\n   - Google Play Services? NÃO — adicionar quebra Play Integrity\n\n4. Instale Shamiko:\n   - Baixe Shamiko mais recente do GitHub LSPosed/LSPosed.github.io\n   - Magisk → Módulos → Instalar de arquivo → selecione zip\n   - Reinicie\n\n5. Configure Shamiko (modo whitelist):\n   - Por padrão Shamiko esconde root de apps na DenyList\n   - Modo whitelist (mais seguro): cria pasta /data/adb/shamiko/whitelist\n   - Sem essa pasta: modo blacklist (DenyList = oculto)\n   - Com essa pasta: TUDO é oculto exceto apps na whitelist\n\n6. Reinicie e teste:\n   - Reinicie o dispositivo\n   - Abra o jogo\n   - Use 'Play Integrity Checker' antes para confirmar passou em Basic e Device\n\n7. Se ainda detectar:\n   - Adicione webview do sistema ao DenyList\n   - Verifique se o jogo tem processo separado para anti-cheat\n   - Considere instalar TrickyStore para passar Strong Integrity"}
      />

      <h2>Erros comuns relacionados a permissões</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { erro: "GG abre mas lista de processos vem vazia", causa: "Root não está sendo concedido na hora certa, ou Magisk Manager não está reconhecendo o GG.", solucao: "Force parada do GG → reabra → conceda root no diálogo. Se o diálogo não aparecer: Magisk → Superusuário → adicione GG manualmente com switch 'on'." },
          { erro: "GG anexa mas todas as buscas retornam 0", causa: "DenyList configurado errado para o próprio GG, ou SELinux bloqueando alguma operação.", solucao: "Remova o GG do DenyList (ele NÃO deve estar na DenyList — é o jogo que deve estar). Se persistir, tente 'su -c setenforce 0' temporariamente para confirmar se é SELinux." },
          { erro: "Permission denied ao ler memória do jogo", causa: "ptrace_scope pode estar restritivo no kernel.", solucao: "Termux → 'su -c \"echo 0 > /proc/sys/kernel/yama/ptrace_scope\"' (temporário). Permanente requer módulo Magisk específico." },
          { erro: "GG funciona em alguns jogos mas não em outros", causa: "Jogos com anti-cheat detectaram root e estão bloqueando ptrace internamente.", solucao: "Configure DenyList + Shamiko + PIF para o jogo específico. Verifique também o ícone flutuante — ocultar pode resolver." },
          { erro: "Após OTA do sistema, GG/Magisk pararam", causa: "Atualização do Android sobrescreveu o boot.img patcheado.", solucao: "Repita o processo de patch: baixe novo boot.img da OTA, patche no Magisk, flash via fastboot. Use 'Direct Install (Recommended)' no Magisk para evitar." },
        ].map((item) => (
          <div key={item.erro} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-yellow-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.erro}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <AlertBox type="success" title="Play Integrity e certificação do dispositivo">
        Para jogos que verificam a integridade do dispositivo (Play Integrity API), instale o módulo <strong>PlayIntegrityFix</strong> via Magisk. Isso faz o dispositivo passar nas verificações 'Basic' e 'Device' mesmo com root ativo. Para passar em 'Strong Integrity' (mais raro, mas usado por bancos e Pokémon Go), considere também o <strong>TrickyStore</strong>. Combine sempre com <strong>Shamiko</strong> para melhor evasão de detecção em apps específicos.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Com root configurado e funcionando, vá para <strong>Interface do GG</strong> para conhecer cada elemento da tela do app. Se preferir começar a usar logo, pule para <strong>Busca Básica de Valores</strong>.
      </AlertBox>
    </PageContainer>
  );
}
