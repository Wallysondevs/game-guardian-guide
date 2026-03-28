import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BypassAntiCheat() {
  return (
    <PageContainer
      title="Bypass Anti-Cheat"
      subtitle="Como contornar sistemas de detecção de cheats em jogos Android."
      difficulty="avancado"
      timeToRead="12 min"
    >
      <AlertBox type="danger" title="Aviso ético">
        Bypass de anti-cheat em jogos online multiplayer prejudica outros jogadores. Use apenas em jogos offline, single-player, ou em contas de teste. Esta seção tem fins educacionais.
      </AlertBox>

      <h2>Como funcionam os anti-cheats</h2>
      <p>
        Os sistemas anti-cheat em jogos mobile funcionam em várias camadas:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { tipo: "Detecção de Root", desc: "Verifica presença de arquivos como /su, /system/xbin/su, propriedades do sistema." },
          { tipo: "Detecção de Process Injection", desc: "Monitora se algum processo externo está fazendo ptrace ou se anexando ao jogo." },
          { tipo: "Verificação de Integridade", desc: "Compara hash do APK e dos arquivos de dados com valores originais." },
          { tipo: "Validação Server-Side", desc: "O servidor valida todos os valores — o hack client-side não tem efeito." },
          { tipo: "Detecção de Emulador", desc: "Verifica props do sistema que indicam ambiente virtual ou emulador." },
          { tipo: "Play Integrity API", desc: "O Google atesta se o dispositivo está em estado confiável (sem root, sem modificações)." },
        ].map((item) => (
          <div key={item.tipo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.tipo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Ocultando root com Magisk</h2>
      <p>
        O Magisk oferece várias ferramentas para ocultar o root:
      </p>
      <ul>
        <li><strong>Magisk Hide (legado)</strong> — oculta root de apps específicos. Funciona em Magisk 23 e anteriores.</li>
        <li><strong>DenyList</strong> — versão moderna do Magisk Hide no Magisk 24+. Vai em Magisk → Configurações → Habilitar DenyList, depois adicione o jogo.</li>
        <li><strong>PlayIntegrityFix</strong> — módulo Magisk que corrige as verificações de Play Integrity. Instale via Magisk → Módulos → pesquise por PlayIntegrityFix.</li>
        <li><strong>Shamiko</strong> — módulo que melhora o funcionamento do DenyList para apps difíceis.</li>
      </ul>

      <h2>KernelSU + módulos para bypass avançado</h2>
      <p>
        O KernelSU opera no nível do kernel e é muito mais difícil de detectar. Combinado com os módulos certos:
      </p>
      <ul>
        <li><strong>KernelSU + SUSFS</strong> — filesystem que esconde arquivos root de processos específicos</li>
        <li><strong>APatch</strong> — alternativa ao KernelSU com suporte a patches de kernel</li>
        <li><strong>Zygisk-Next</strong> — implementação do Zygisk para KernelSU, necessária para módulos Magisk</li>
      </ul>

      <h2>Configurando o GG para menor detecção</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Configuração</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Como fazer</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Efeito</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Modo furtivo", "GG → Configurações → Modo Furtivo → Ativo", "Reduz a assinatura de processo do GG"],
              ["Ocultar ícone flutuante", "GG → Configurações → Ocultar ícone do GG → Nenhum", "App anti-cheat não detecta overlay do GG"],
              ["Usar script em vez de busca manual", "Execute um .lua em vez de usar a UI do GG", "Menor interação com APIs monitoradas"],
              ["Adicionar GG ao DenyList", "Magisk → DenyList → Adicionar GG e o jogo", "Root não visível para o jogo"],
            ].map(([cfg, como, efeito], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{cfg}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{como}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{efeito}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="info" title="Validação server-side: o limite do GG">
        Se um jogo valida os valores no servidor (como Free Fire, PUBG, CoD Mobile), não há bypass client-side que funcione permanentemente. O servidor irá rejeitar os valores modificados ou detectar inconsistências. A única solução real são exploits server-side, que vão muito além do escopo do GG.
      </AlertBox>
    </PageContainer>
  );
}
