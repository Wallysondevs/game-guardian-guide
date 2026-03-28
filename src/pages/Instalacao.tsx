import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Instalacao() {
  return (
    <PageContainer
      title="Download e Instalação"
      subtitle="Como baixar e instalar o Game Guardian corretamente no seu Android."
      difficulty="iniciante"
      timeToRead="6 min"
    >
      <AlertBox type="warning" title="Baixe apenas do site oficial">
        Sempre baixe o Game Guardian do site oficial: <strong>gameguardian.net</strong>. APKs de sites alternativos podem conter malware.
      </AlertBox>

      <h2>Método 1: Com Root (Recomendado)</h2>
      <p>
        O método mais poderoso e estável é usar o GG com um dispositivo Android com root (Magisk ou KernelSU).
      </p>

      <h3>Passo a passo</h3>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", t: "Ative fontes desconhecidas", d: "Vá em Configurações → Segurança → Fontes Desconhecidas e habilite a instalação de APKs externos." },
          { n: "2", t: "Baixe o APK", d: "Acesse gameguardian.net e baixe a versão mais recente do Game Guardian." },
          { n: "3", t: "Instale o APK", d: "Abra o arquivo baixado e clique em Instalar. Confirme qualquer aviso de segurança." },
          { n: "4", t: "Conceda acesso root", d: "Ao abrir o GG pela primeira vez, o Magisk solicitará permissão root. Clique em 'Conceder'." },
          { n: "5", t: "Selecione o processo", d: "Abra o jogo que deseja hackear, volte ao GG e selecione o processo na lista." },
        ].map((item) => (
          <div key={item.n} className="flex gap-4 bg-card border border-border rounded-xl p-4">
            <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
            <div>
              <h4 className="font-semibold text-foreground mb-1">{item.t}</h4>
              <p className="text-sm text-muted-foreground">{item.d}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Método 2: Sem Root (Virtual Space)</h2>
      <p>
        Se você não tem root, pode usar um <strong>Virtual Space</strong> — um ambiente Android virtualizado dentro do seu dispositivo. O GG roda dentro desse ambiente com permissões elevadas, sem precisar de root real.
      </p>

      <h3>Apps de Virtual Space compatíveis</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { name: "VirtualXposed", desc: "Baseado em VirtualApp. Suporte a módulos Xposed sem root.", rating: "⭐⭐⭐⭐" },
          { name: "VMOS Pro", desc: "Sistema Android completo virtualizado. Muito estável.", rating: "⭐⭐⭐⭐⭐" },
          { name: "Parallel Space", desc: "Popular para clonar apps, suporte básico ao GG.", rating: "⭐⭐⭐" },
          { name: "F1 VM", desc: "Virtual machine Android, suporte a root interno.", rating: "⭐⭐⭐⭐" },
        ].map((app) => (
          <div key={app.name} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-2">
              <h3 className="font-bold text-foreground">{app.name}</h3>
              <span className="text-sm">{app.rating}</span>
            </div>
            <p className="text-sm text-muted-foreground">{app.desc}</p>
          </div>
        ))}
      </div>

      <h3>Configurando com VMOS Pro</h3>
      <div className="not-prose space-y-3 my-4">
        {[
          "Baixe e instale o VMOS Pro na Play Store ou site oficial",
          "Abra o VMOS e configure o sistema virtual (Android 7 ou 9 recomendado)",
          "Dentro do VMOS, ative Root nas configurações do sistema virtual",
          "Instale o APK do Game Guardian dentro do VMOS (use o gerenciador de arquivos interno)",
          "Instale o APK do jogo que deseja hackear também dentro do VMOS",
          "Abra o jogo dentro do VMOS, depois abra o GG e selecione o processo",
        ].map((step, i) => (
          <div key={i} className="flex gap-3 items-start">
            <span className="w-6 h-6 rounded-full bg-primary/20 text-primary text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">{i + 1}</span>
            <p className="text-sm text-foreground/80">{step}</p>
          </div>
        ))}
      </div>

      <h2>Verificando a instalação</h2>
      <p>Para confirmar que o GG está funcionando corretamente:</p>
      <CodeBlock
        language="text"
        title="Checklist de instalação"
        code={`✅ GG abre sem erros
✅ Permissão root concedida (Magisk mostra na lista de apps)
✅ Ao abrir o GG, aparece o ícone flutuante sobre outros apps
✅ Ao selecionar um processo, a lista de processos em execução aparece
✅ É possível realizar uma busca simples (ex: buscar valor 100)`}
      />

      <AlertBox type="danger" title="Problema comum: GG não aparece na lista de processos">
        Se o jogo não aparecer na lista de processos, tente: 1) Abrir o jogo primeiro, depois o GG. 2) Reiniciar o GG como root. 3) Verificar se o Magisk está atualizado. 4) Tentar o método Virtual Space como alternativa.
      </AlertBox>
    </PageContainer>
  );
}
