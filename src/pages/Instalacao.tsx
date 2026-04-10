import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Instalacao() {
    return (
      <PageContainer
        title="Instalação"
        subtitle="Como instalar e configurar o Game Guardian corretamente em dispositivos com e sem root."
        difficulty="iniciante"
        timeToRead="12 min"
      >
        <AlertBox type="warning" title="GG não está no Google Play">
          O Game Guardian só pode ser baixado do site oficial: <strong>gameguardian.net</strong>. Qualquer versão em outras lojas pode ser malware. Sempre verifique o hash MD5/SHA do arquivo baixado.
        </AlertBox>

        <h2>Requisitos do sistema</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Requisito</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Mínimo</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Recomendado</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["Android", "4.0 (Ice Cream Sandwich)", "8.0+ (Oreo ou superior)"],
                ["Root", "Root via Magisk, KernelSU ou APatch", "Magisk 26+ com DenyList habilitado"],
                ["RAM", "2 GB", "4 GB+ para buscas em região A"],
                ["Arquitetura", "ARM32 ou ARM64", "ARM64 (64-bit) para melhor suporte"],
                ["Sem root", "Virtual Space app (limitado)", "VirtualXposed ou Parallel Space"],
              ].map(([req, min, rec], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{req}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{min}</td>
                  <td className="px-4 py-2 border border-border text-primary text-sm">{rec}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Instalação com Root (método completo)</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { n: "1", title: "Verifique o root", desc: "Abra um emulador de terminal (ex: Termux) e rode o comando 'su'. Se o prompt mudar para '#', o root está funcionando.", detail: "Se não tiver root, vá para a seção de instalação sem root ou root via Magisk." },
            { n: "2", title: "Baixe o APK oficial", desc: "Acesse gameguardian.net → Downloads → baixe a versão mais recente. O arquivo tem extensão .apk.", detail: "Anote o MD5 mostrado no site e compare com o arquivo baixado para verificar integridade." },
            { n: "3", title: "Habilite fontes desconhecidas", desc: "Configurações → Segurança → Fontes desconhecidas → Ativar. Em Android 8+: Configurações → Aplicativos → Permissões especiais → Instalar aplicativos desconhecidos.", detail: "Você pode desativar após a instalação." },
            { n: "4", title: "Instale o APK", desc: "Abra o gerenciador de arquivos, navegue até o APK baixado e toque para instalar. Confirme as permissões.", detail: "O GG pode pedir permissões de overlay (exibir sobre outros apps) durante a instalação." },
            { n: "5", title: "Conceda permissão root", desc: "Na primeira abertura, o GG vai solicitar acesso root. Conceda. No Magisk, vá em Superusuário para confirmar que GG está listado.", detail: "Se nenhum diálogo aparecer, abra o Magisk manualmente e conceda root ao GG." },
            { n: "6", title: "Configure o DenyList (recomendado)", desc: "No Magisk: Configurações → Habilitar DenyList. Depois: DenyList → adicione o jogo que quer hackear.", detail: "Isso faz o root ficar invisível para o jogo, reduzindo detecção de anti-cheat." },
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

        <h2>Instalando root com Magisk</h2>
        <AlertBox type="info" title="Magisk é o método de root mais popular em 2024">
          Magisk oferece root sistêmico com módulos, DenyList para ocultar root de apps específicos e compatibilidade com a maioria dos dispositivos Android modernos.
        </AlertBox>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { titulo: "Método via Recovery", desc: "Requer TWRP ou recovery personalizado. Instala o Magisk como módulo de sistema. Método mais completo mas mais complexo." },
            { titulo: "Método via Fastboot (boot.img)", desc: "Baixe a factory image do seu dispositivo, extraia o boot.img, patch via Magisk app e flash via fastboot. Método oficial e mais seguro." },
            { titulo: "Magisk via ADB", desc: "Para dispositivos com modo de desenvolvedor ativo. Requer PC com ADB instalado.", },
            { titulo: "Alternativas: KernelSU, APatch", desc: "Para dispositivos não compatíveis com Magisk. KernelSU opera no nível de kernel — mais difícil de detectar." },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Primeira execução e configuração</h2>
        <CodeBlock
          language="text"
          title="Configurações recomendadas após instalar"
          code={"1. Modo de execução:\n   GG → Configurações → Método de execução\n   → Selecione 'Root' se tiver root\n   → Selecione 'VirtualSpace' se não tiver root\n\n2. Modo furtivo:\n   GG → Configurações → Modo Furtivo → Habilitar\n   (Reduz visibilidade para anti-cheats)\n\n3. Ícone flutuante:\n   GG → Configurações → Ícone flutuante\n   → 'GG' = ícone padrão\n   → 'Ocultar' = sem ícone (acesse por notificação)\n\n4. Região padrão:\n   GG → Configurações → Região de busca padrão\n   → Defina 'Ca' para buscas mais rápidas\n\n5. Tipo de dado padrão:\n   → Defina 'Dword' para começar (mude conforme necessário)"}
        />

        <AlertBox type="success" title="Testando se o GG está funcionando">
          Abra qualquer jogo simples (como um quebra-cabeça) com um número visível na tela. Busque por esse número como Dword no GG. Se encontrar resultados, o GG está funcionando corretamente.
        </AlertBox>

        <h2>Problemas na instalação</h2>
        <div className="grid grid-cols-1 gap-3 my-4 not-prose">
          {[
            { erro: "App não instalado (Error -24)", solucao: "Versão anterior corrompida. Vá em Configurações → Apps → desinstale o GG completamente, reinicie e instale de novo." },
            { erro: "Análise bloqueada pelo Play Protect", solucao: "No Google Play → Menu → Play Protect → Configurações → desative 'Verificar ameaças'. Reative após instalação." },
            { erro: "GG abre mas não lista processos", solucao: "Root não concedido. Abra Magisk → verifique se GG está em Superusuário. Se não estiver, abra o GG novamente e conceda." },
            { erro: "Erro ao conceder root no GG", solucao: "Tente executar o GG como root via terminal: 'su -c am start gameguardian'. Ou reinstale o Magisk." },
          ].map((item) => (
            <div key={item.erro} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
              <h4 className="font-bold text-destructive mb-1 text-sm">{item.erro}</h4>
              <p className="text-xs text-muted-foreground">{item.solucao}</p>
            </div>
          ))}
        </div>
      </PageContainer>
    );
  }
  