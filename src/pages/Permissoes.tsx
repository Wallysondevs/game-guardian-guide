import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Permissoes() {
    return (
      <PageContainer
        title="Permissões e Root"
        subtitle="Como o Game Guardian obtém acesso à memória de outros processos — root, permissões e métodos de execução."
        difficulty="intermediario"
        timeToRead="14 min"
      >
        <AlertBox type="warning" title="Root é necessário para funcionalidade completa">
          O Android isola processos por segurança. Sem root, o GG não pode acessar a memória de outros apps. O Virtual Space contorna isso parcialmente, mas root oferece acesso completo.
        </AlertBox>

        <h2>Por que o GG precisa de root?</h2>
        <p>
          O Linux (núcleo do Android) usa um modelo de segurança baseado em usuários. Cada app tem seu próprio UID (User ID) e só pode acessar sua própria memória. Root (UID 0) remove essa restrição, permitindo que o GG leia e escreva na memória de qualquer processo.
        </p>
        <CodeBlock
          language="text"
          title="Como o GG acessa memória com root"
          code={"Sem root:\n  GG (UID 10045) tenta ler /proc/12345/mem\n  → Erro: Permission denied (UID diferente)\n\nCom root:\n  GG (UID 0) lê /proc/12345/mem\n  → Sucesso: acesso total à memória do processo 12345\n\n// O GG usa a syscall ptrace() para se anexar\n// ao processo do jogo e depois manipula /proc/PID/mem\n// diretamente para leitura/escrita em massa"}
        />

        <h2>Métodos de root disponíveis</h2>
        <div className="grid grid-cols-1 gap-4 my-6 not-prose">
          {[
            {
              nome: "Magisk", versao: "Magisk 26+", status: "✅ Recomendado",
              desc: "Root no espaço do usuário via Magic Mount. Não modifica a partição /system. Suporta módulos, DenyList e PlayIntegrityFix.",
              pros: ["DenyList para ocultar root por app", "Suporte a módulos (PlayIntegrityFix, Shamiko)", "Compatível com SafetyNet/Play Integrity", "Ampla compatibilidade de dispositivos"],
              cons: ["Requer bootloader desbloqueado", "SafetyNet pode falhar sem módulos extras"]
            },
            {
              nome: "KernelSU", versao: "Kernel 5.x+", status: "⭐ Avançado",
              desc: "Root no nível do kernel. Muito mais difícil de detectar que Magisk. Requer kernel personalizado ou compilação.",
              pros: ["Detecção muito mais difícil", "Controle granular por app", "Suporte a SUSFS (filesystem stealth)", "Compatível com módulos Magisk via Zygisk-Next"],
              cons: ["Requer kernel compatível ou customizado", "Instalação mais complexa", "Menos dispositivos suportados"]
            },
            {
              nome: "APatch", versao: "Recente", status: "🔶 Alternativa",
              desc: "Alternativa ao KernelSU. Patcha o kernel via patch de bytes sem necessidade de recompilar. Mais fácil que KernelSU.",
              pros: ["Mais fácil que KernelSU", "Não precisa recompilar kernel", "Suporte crescente"],
              cons: ["Comunidade menor", "Menos módulos disponíveis", "Bugs ocasionais"]
            },
          ].map((item) => (
            <div key={item.nome} className="bg-card border border-border rounded-xl p-5">
              <div className="flex items-center gap-3 mb-3">
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
                ["Magisk", "Abra o GG → aparece diálogo de root → conceda. Ou: Magisk → Superusuário → adicione o GG manualmente."],
                ["KernelSU", "KernelSU Manager → Superusuário → encontre o GG → conceda permissão de root."],
                ["APatch", "APatch Manager → SuperUser → adicione o GG com escopo de root."],
                ["Virtual Space (sem root)", "Não precisa conceder root — o VS simula as permissões internamente."],
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
          title="Comandos para verificar root no terminal"
          code={"// Abra Termux ou qualquer emulador de terminal:\n$ su\n# (prompt muda para # = root ativo!)\n\n// Verificar versão do Magisk:\n# magisk -v\n26.4:MAGISK\n\n// Verificar processos com acesso root:\n# cat /proc/1/status | grep CapEff\n\n// Verificar se GG está rodando como root:\n# ps aux | grep gameguardian\n// Deve mostrar UID 0 ou root na coluna de usuário"}
        />

        <h2>SELinux e permissões de kernel</h2>
        <p>
          O SELinux (Security-Enhanced Linux) adiciona outra camada de controle além do UID. Mesmo com root, o SELinux pode bloquear operações específicas.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { modo: "SELinux Enforcing", desc: "Modo padrão. Políticas de segurança ativas. Algumas operações do GG podem ser bloqueadas.", solucao: "Módulos Magisk como o próprio GG geralmente configuram políticas SELinux necessárias automaticamente." },
            { modo: "SELinux Permissive", desc: "Políticas ignoradas — tudo é permitido. Máxima compatibilidade com GG, mas menor segurança do sistema.", solucao: "Use 'setenforce 0' via terminal root para modo permissivo (temporário, volta ao Enforcing no reboot)." },
          ].map((item) => (
            <div key={item.modo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-1 text-sm">{item.modo}</h4>
              <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
              <p className="text-xs text-primary">{item.solucao}</p>
            </div>
          ))}
        </div>

        <AlertBox type="success" title="Play Integrity e certificação do dispositivo">
          Para jogos que verificam a integridade do dispositivo (Play Integrity API), instale o módulo <strong>PlayIntegrityFix</strong> via Magisk. Isso faz o dispositivo passar nas verificações mesmo com root ativo. Combine com <strong>Shamiko</strong> para melhor evasão de detecção.
        </AlertBox>
      </PageContainer>
    );
  }
  