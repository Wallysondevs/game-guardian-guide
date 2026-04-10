import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function BypassAntiCheat() {
    return (
      <PageContainer
        title="Bypass Anti-Cheat"
        subtitle="Como contornar sistemas de detecção de cheats em jogos Android — técnicas, ferramentas e limites do possível."
        difficulty="avancado"
        timeToRead="18 min"
      >
        <AlertBox type="danger" title="Aviso ético e legal">
          Bypass de anti-cheat em jogos multiplayer online prejudica outros jogadores e viola os termos de serviço. Use exclusivamente em jogos offline, single-player, ou em contas de teste. Esta seção tem fins educacionais sobre como sistemas de segurança funcionam.
        </AlertBox>

        <h2>Como funcionam os anti-cheats em jogos Android</h2>
        <p>Os sistemas anti-cheat em jogos mobile atuam em múltiplas camadas simultaneamente:</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { tipo: "Detecção de Root", nivel: "Client", desc: "Verifica arquivos /su, /system/xbin/su, propriedades do sistema (ro.build.tags=test-keys), presença do Magisk e outros indicadores de root." },
            { tipo: "Detecção de Process Injection", nivel: "Client", desc: "Monitora processos que usam ptrace() para se anexar ao jogo. Detecta o GG pelo nome do processo, memória mapeada e assinatura." },
            { tipo: "Verificação de Integridade de Arquivo", nivel: "Client", desc: "Compara hashes MD5/SHA do APK e assets com valores originais. Detecta APKs modificados ou patchados." },
            { tipo: "Play Integrity API", nivel: "Client + Server", desc: "Atesta o estado do dispositivo via Google. Classifica como MEETS_BASIC_INTEGRITY (OK), MEETS_DEVICE_INTEGRITY (sem root), MEETS_STRONG_INTEGRITY (device certificado)." },
            { tipo: "Detecção de Emulador", nivel: "Client", desc: "Verifica ro.product.manufacturer, QEMU props, presença de /dev/qemu_pipe, sensores ausentes, e outros indicadores de ambiente virtual." },
            { tipo: "Validação Server-Side", nivel: "Server", desc: "Servidor valida todos os valores: HP, dinheiro, velocidade. Rejeita valores impossíveis ou inconsistentes com o progresso do jogador. Impossível de burlar via GG." },
            { tipo: "Análise Comportamental", nivel: "Server", desc: "Machine learning detecta padrões impossíveis: matar inimigos a distância impossível, coletar recursos 10x mais rápido que qualquer jogador legítimo, etc." },
            { tipo: "Monitoramento de Rede", nivel: "Server", desc: "Análise de padrões de pacotes. Modificações que geram pacotes incomuns são detectadas mesmo com dados corretos." },
          ].map((item) => (
            <div key={item.tipo} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-foreground text-sm">{item.tipo}</h4>
                <span className={"text-xs px-2 py-0.5 rounded " + (item.nivel.includes("Server") ? "bg-destructive/20 text-destructive" : "bg-yellow-500/20 text-yellow-500")}>{item.nivel}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>O que pode e o que não pode ser bypassado</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo de detecção</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Bypass possível?</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Método</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Detecção de root simples", "✅ Sim", "DenyList no Magisk + Shamiko"],
                ["Play Integrity (Basic)", "✅ Sim", "PlayIntegrityFix module"],
                ["Play Integrity (Strong)", "🔶 Difícil", "Requer dispositivo certificado sem root visível"],
                ["Detecção de processo GG", "✅ Sim", "Modo furtivo + renomear processo via Magisk"],
                ["Verificação de APK", "✅ Sim", "APKTool para remover a verificação do código"],
                ["Detecção de emulador", "🔶 Parcial", "Props customizados via Magisk, mas imperfeito"],
                ["Validação server-side", "❌ Não", "Impossível client-side — requer exploits de servidor"],
                ["Análise comportamental ML", "❌ Não", "O comportamento anormal é registrado no servidor"],
              ].map(([tipo, bypass, metodo], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border text-foreground text-sm">{tipo}</td>
                  <td className="px-4 py-2 border border-border text-sm">{bypass}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{metodo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Bypassando detecção de root com Magisk</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { n: "1", title: "Habilitar DenyList", desc: "Magisk → Configurações → Habilitar DenyList. Isso permite ocultar root de apps específicos.", detail: "Sem o DenyList habilitado, todos os apps veem o root." },
            { n: "2", title: "Adicionar o jogo ao DenyList", desc: "Magisk → DenyList → toque em Configurar → encontre o jogo → marque o processo principal.", detail: "Adicione TODOS os processos do jogo (às vezes há processo separado para anti-cheat)." },
            { n: "3", title: "Instalar PlayIntegrityFix", desc: "Magisk → Módulos → Instalar de arquivo (ou pesquise 'PlayIntegrityFix') → instale → reinicie.", detail: "Essencial para jogos que usam Play Integrity API para verificar o dispositivo." },
            { n: "4", title: "Instalar Shamiko", desc: "Baixe o módulo Shamiko do GitHub (LSPosed/Shamiko) → instale via Magisk → reinicie.", detail: "Shamiko melhora significativamente a evasão do DenyList para apps mais sofisticados." },
            { n: "5", title: "Verificar", desc: "Instale 'Play Integrity Checker' (apk de terceiros) e rode. Deve passar em Basic e Device Integrity.", detail: "Se ainda falhar em Basic Integrity, reveja instalação do PlayIntegrityFix." },
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

        <h2>KernelSU — root de kernel nivel</h2>
        <p>
          O KernelSU opera no nível do kernel, tornando-o muito mais difícil de detectar que o Magisk (que opera no espaço do usuário). Combinado com o SUSFS (Suspicious File System), é o método mais furtivo disponível.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
          {[
            { modulo: "KernelSU + SUSFS", desc: "SUSFS cria um filesystem virtual que esconde arquivos de root de processos específicos. Anti-cheats que procuram por /su, /data/adb/magisk não encontram nada." },
            { modulo: "Zygisk-Next para KernelSU", desc: "Permite usar módulos Magisk (incluindo PlayIntegrityFix e Shamiko) no KernelSU. Necessário para compatibilidade máxima." },
            { modulo: "APatch", desc: "Alternativa ao KernelSU que patcha o kernel via modificação de bytes sem recompilar. Mais fácil de instalar em dispositivos não suportados pelo KernelSU." },
            { modulo: "LSPosed (opcional)", desc: "Framework Xposed para KernelSU. Permite hooks mais profundos em apps — útil para remover verificações anti-cheat específicas de um app." },
          ].map((item) => (
            <div key={item.modulo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-2 text-sm">{item.modulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Configurando o GG para menor detecção</h2>
        <CodeBlock
          language="text"
          title="Checklist de configuração anti-detecção"
          code={"1. Modo Furtivo ativado:\n   GG → Configurações → Modo Furtivo → ON\n   (Reduz assinatura do processo)\n\n2. Ícone invisível:\n   GG → Configurações → Ícone → Nenhum\n   (Anti-cheat não detecta overlay)\n\n3. Use script em vez de interface manual:\n   Execute modificações via .lua script\n   (Menor interação com APIs monitoradas)\n\n4. Nunca modificar durante loading ou matchmaking:\n   Faça modificações apenas dentro da partida\n   (Menor chance de detecção por timestamps)\n\n5. Valores plausíveis:\n   999.999 moedas OK, 999.999.999 suspeito\n   HP = MaxHP OK, HP = 9999999 suspeito"}
        />

        <h2>Removendo verificações anti-cheat via APKTool</h2>
        <AlertBox type="warning" title="Modificar APKs viola termos de serviço e possivelmente leis de copyright">
          Esta técnica é usada em pesquisa de segurança e em jogos offline. Para jogos online, é detectada pelo servidor quando o APK modificado conecta.
        </AlertBox>
        <CodeBlock
          language="text"
          title="Processo de remoção de anti-cheat do APK"
          code={"// No PC com Java e APKTool instalados:\n\n1. Descompilar o APK:\n   apktool d jogo.apk -o jogo_decompilado\n\n2. Encontrar verificações de root/cheat:\n   grep -r 'isRooted\\|SU\\|Magisk\\|GameGuardian' jogo_decompilado/smali\n\n3. Substituir retornos de verificação:\n   // Função isRooted() que retorna true → mude para return false\n   // Em smali: const/4 v0, 0x1 → const/4 v0, 0x0\n\n4. Recompilar:\n   apktool b jogo_decompilado -o jogo_mod.apk\n\n5. Assinar o APK:\n   apksigner sign --ks minha_chave.jks jogo_mod.apk\n\n6. Instalar e testar"}
        />

        <h2>O limite intransponível — validação server-side</h2>
        <AlertBox type="danger" title="Free Fire, PUBG, CoD Mobile, Genshin Impact — não há bypass">
          Esses jogos (e muitos outros) validam TODOS os valores no servidor. Modificar HP no cliente para 99999 não tem efeito — o servidor continua calculando com o valor real. Ao enviar dados inconsistentes, o servidor detecta e bane automaticamente. Não há nenhum método client-side que resolva isso.
        </AlertBox>
        <p>
          A única forma de afetar jogos com validação total server-side é através de vulnerabilidades no próprio servidor — isso é hacking de verdade, ilegal, e completamente fora do escopo do GG e deste guia.
        </p>

        <h2>Jogos com anti-cheat fraco (bons candidatos para GG)</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { tipo: "RPGs offline", desc: "Calculam tudo localmente. Sem servidor para validar. Perfeitos para GG." },
            { tipo: "Jogos de puzzle/casual", desc: "Raramente têm anti-cheat. Fáceis de modificar." },
            { tipo: "Clickers e idle games", desc: "Valores grandes armazenados client-side. Geralmente sem validação de servidor." },
            { tipo: "Jogos com modo offline", desc: "O modo offline não tem validação de servidor. Use GG apenas nesse modo." },
          ].map((item) => (
            <div key={item.tipo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-green-500">
              <h4 className="font-bold text-foreground mb-1 text-sm">✅ {item.tipo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  