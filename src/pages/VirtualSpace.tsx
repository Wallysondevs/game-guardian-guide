import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function VirtualSpace() {
  return (
    <PageContainer
      title="Virtual Space / VMOS"
      subtitle="Use o Game Guardian sem root real através de ambientes virtualizados."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <AlertBox type="success" title="Sem root real">
        O Virtual Space é a maneira mais segura de usar o GG — você não precisa fazer root no seu dispositivo principal, e os hacks ficam isolados no ambiente virtual.
      </AlertBox>

      <h2>O que é Virtual Space?</h2>
      <p>
        Virtual Space é um ambiente Android virtualizado que roda dentro do seu Android real. Pense nele como um "Android dentro do Android". Dentro desse ambiente virtual, você pode:
      </p>
      <ul>
        <li>Ter root completo sem afetar o sistema principal</li>
        <li>Instalar apps de forma isolada</li>
        <li>Rodar o GG com acesso total à memória dos apps dentro do virtual space</li>
        <li>Proteger sua conta principal de banimentos</li>
      </ul>

      <h2>Comparativo de Virtual Spaces</h2>
      <div className="grid grid-cols-1 gap-4 my-6 not-prose">
        {[
          {
            name: "VMOS Pro",
            pros: ["Sistema Android completo (7 ou 9)", "Root nativo disponível", "Muito estável", "Suporta a maioria dos jogos pesados", "Suporte a ARM translation"],
            cons: ["App pago (tem versão free limitada)", "Consome muita RAM (2GB+)", "Instalação inicial demorada"],
            rating: "⭐⭐⭐⭐⭐",
            recomendado: true
          },
          {
            name: "VirtualXposed",
            pros: ["Gratuito e open-source", "Suporte a módulos Xposed", "Mais leve que VMOS", "Fácil de configurar"],
            cons: ["Menor compatibilidade com jogos pesados", "Menos mantido atualmente", "Pode ter instabilidades"],
            rating: "⭐⭐⭐⭐",
            recomendado: false
          },
          {
            name: "F1 VM",
            pros: ["Root interno", "Interface limpa", "Bom desempenho"],
            cons: ["Compatibilidade limitada", "Menor comunidade de suporte"],
            rating: "⭐⭐⭐",
            recomendado: false
          },
        ].map((app) => (
          <div key={app.name} className={`bg-card border rounded-xl p-5 ${app.recomendado ? "border-primary/50" : "border-border"}`}>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h3 className="font-bold text-foreground text-lg">{app.name}</h3>
                {app.recomendado && <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded-full font-medium">Recomendado</span>}
              </div>
              <span className="text-lg">{app.rating}</span>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-semibold text-green-500 mb-2">✅ Prós</p>
                <ul className="space-y-1">
                  {app.pros.map((p, i) => <li key={i} className="text-xs text-muted-foreground">{p}</li>)}
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold text-red-500 mb-2">❌ Contras</p>
                <ul className="space-y-1">
                  {app.cons.map((c, i) => <li key={i} className="text-xs text-muted-foreground">{c}</li>)}
                </ul>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Configurando o VMOS Pro passo a passo</h2>
      <div className="space-y-3 my-4 not-prose">
        {[
          "Baixe o VMOS Pro na Play Store ou no site oficial vmos.com",
          "Na primeira abertura, escolha a imagem do sistema (Android 7 recomendado para compatibilidade, Android 9 para jogos mais novos)",
          "Aguarde o download da imagem (500MB-1GB dependendo da versão)",
          "Quando o sistema virtual inicializar, vá em Configurações → Sobre o Telefone",
          "Toque 7 vezes em 'Número de compilação' para ativar as opções de desenvolvedor",
          "Em Opções do desenvolvedor, ative 'Root' e reinicie o sistema virtual",
          "Instale o Game Guardian dentro do VMOS: use o gerenciador de arquivos para transferir o APK do storage principal",
          "Instale também o jogo que deseja hackear dentro do VMOS",
          "Abra o jogo → depois o GG → selecione o processo e comece a hackear!",
        ].map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="w-7 h-7 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
            <p className="text-sm text-foreground/80 pt-1">{step}</p>
          </div>
        ))}
      </div>

      <AlertBox type="info" title="Limitação: jogos com verificação de dispositivo">
        Alguns jogos detectam que estão rodando em um ambiente virtualizado e recusam iniciar. Nesse caso, você precisará de root real ou de técnicas de bypass mais avançadas (ver seção de Bypass Anti-Cheat).
      </AlertBox>
    </PageContainer>
  );
}
