import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function UsoSeguro() {
  return (
    <PageContainer
      title="Uso Seguro (Anti-ban)"
      subtitle="Boas práticas para usar o Game Guardian sem risco de banimento."
      difficulty="intermediario"
      timeToRead="8 min"
    >
      <AlertBox type="danger" title="Não existe 100% de segurança online">
        Qualquer uso de GG em jogos online carrega risco de banimento. As dicas abaixo reduzem o risco mas não eliminam. A única forma garantida de não ser banido é jogar offline.
      </AlertBox>

      <h2>Regras de ouro</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", titulo: "Use conta alternativa", desc: "NUNCA use sua conta principal. Crie uma conta nova exclusivamente para hackear. O risco de ban deve ser absorvido por uma conta dispensável." },
          { n: "2", titulo: "Valores realistas", desc: "Não coloque 999.999.999 de ouro. Valores absurdos são detectados facilmente. Use valores que poderiam ser atingidos normalmente no jogo." },
          { n: "3", titulo: "Não jogue online com hacks ativos", desc: "Ative os hacks apenas em modos offline, PvE ou solo. Nunca em partidas ranqueadas ou PvP." },
          { n: "4", titulo: "Use Virtual Space", desc: "Jogar dentro de um Virtual Space isola o ambiente e reduz a visibilidade do GG para o jogo." },
          { n: "5", titulo: "Feche o GG antes de logar", desc: "Sempre feche completamente o GG antes de abrir o jogo e fazer login. Alguns sistemas detectam o overlay ativo." },
          { n: "6", titulo: "Não compartilhe prints/vídeos", desc: "Nunca compartille capturas de tela ou vídeos mostrando valores hackeados com seu nick visível. A empresa pode revisar manualmente." },
        ].map((item) => (
          <div key={item.n} className="flex gap-4 bg-card border border-border rounded-xl p-5">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
            <div>
              <h4 className="font-bold text-foreground mb-1">{item.titulo}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Tipos de banimento</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Duração</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Reversal</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Ban de conta", "Permanente", "Impossível na maioria dos casos"],
              ["Ban de dispositivo (IMEI)", "Permanente para o aparelho", "Trocar IMEI ou usar outro dispositivo"],
              ["Ban de IP", "Temporário ou permanente", "Mudar IP (VPN, reiniciar roteador)"],
              ["Shadow ban", "Indefinido", "Você joga, mas com outros cheaters"],
              ["Ban temporário", "Dias a semanas", "Aguardar o prazo expirar"],
            ].map(([tipo, dur, rev], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{tipo}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{dur}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{rev}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Checklist antes de hackear online</h2>
      <ul>
        <li>✅ Estou usando uma conta alternativa sem investimento real</li>
        <li>✅ O GG está configurado em modo furtivo</li>
        <li>✅ O root está oculto para o jogo (Magisk DenyList ativo)</li>
        <li>✅ Estou usando valores realistas, não absurdos</li>
        <li>✅ O Virtual Space está ativo (ou KernelSU instalado)</li>
        <li>✅ Não vou fazer stream/gravar com nick visível</li>
        <li>✅ Vou evitar partidas competitivas com outros jogadores</li>
      </ul>
    </PageContainer>
  );
}
