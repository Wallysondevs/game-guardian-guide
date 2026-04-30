import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Instalacao() {
  return (
    <PageContainer
      title="Instalação"
      subtitle="Como instalar e configurar o Game Guardian corretamente em dispositivos com e sem root, com guia completo de Magisk, KernelSU, APatch, DenyList e configurações iniciais."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <AlertBox type="warning" title="GG não está no Google Play">
        O Game Guardian só pode ser baixado do site oficial: <strong>gameguardian.net</strong>. Qualquer versão em outras lojas pode ser malware com a mesma cara. Sempre verifique o hash MD5/SHA-256 do arquivo baixado contra o publicado no site. Em 2023, dezenas de APKs falsos com trojans bancários foram distribuídos como "Game Guardian" em sites de download brasileiros.
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
              ["Android", "4.0 (Ice Cream Sandwich)", "10+ (Q ou superior, ideal 13/14)"],
              ["Root", "Root via Magisk, KernelSU ou APatch", "Magisk 26+ com Zygisk e DenyList habilitados"],
              ["RAM", "2 GB", "4 GB+ para buscas em região A com performance"],
              ["Arquitetura", "ARM32 ou ARM64", "ARM64 (64-bit) — padrão de dispositivos pós-2018"],
              ["Espaço livre", "20 MB para o GG", "200 MB+ contando módulos Magisk e backups"],
              ["Sem root", "Virtual Space app (limitado)", "VirtualXposed ou Parallel Space para mais compatibilidade"],
              ["Versão GG", "Versão 90+", "101+ (versão atual com melhorias de XOR e IL2CPP)"],
              ["Bootloader", "Travado (apenas Virtual Space)", "Desbloqueado (necessário para Magisk)"],
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

      <h2>Decidindo o método: com root ou sem root?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-green-500">
          <h4 className="font-bold text-foreground mb-2">Com root (recomendado)</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>✓ Funciona em praticamente qualquer jogo</li>
            <li>✓ Buscas mais rápidas (acesso direto à memória)</li>
            <li>✓ Suporte completo a todas as regiões (Xa, Cb, etc.)</li>
            <li>✓ Scripts Lua avançados sem limitações</li>
            <li>✓ Pode usar módulos como Shamiko/PIF para evasão</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2 italic">Mas exige bootloader desbloqueado e perde garantia.</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-yellow-500">
          <h4 className="font-bold text-foreground mb-2">Sem root (Virtual Space)</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>✓ Não modifica o sistema</li>
            <li>✓ Mantém garantia do dispositivo</li>
            <li>✓ Reversível — desinstala como qualquer app</li>
            <li>✓ Funciona em dispositivos sem suporte a root</li>
          </ul>
          <p className="text-xs text-muted-foreground mt-2 italic">Mas com compatibilidade reduzida e mais lento.</p>
        </div>
      </div>

      <h2>Instalação com Root (método completo)</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", title: "Verifique o root", desc: "Abra um emulador de terminal (ex: Termux disponível no F-Droid) e rode o comando 'su'. Se aparecer um diálogo do Magisk pedindo autorização e o prompt mudar para '#', o root está funcionando.", detail: "Se não tiver root ainda, vá para a seção 'Instalando root com Magisk' mais abaixo. Um teste alternativo é instalar 'Root Checker' da Play Store — app simples que confirma se há root ativo." },
          { n: "2", title: "Baixe o APK oficial", desc: "Acesse gameguardian.net pelo navegador → menu Downloads → baixe a versão estável mais recente (geralmente um arquivo .apk com 5-10 MB). Aceite o aviso de download de fonte externa.", detail: "Anote ou copie o MD5/SHA-256 mostrado no site. Após o download, use um app como 'Hash Droid' ou Termux com 'sha256sum' para confirmar que o hash bate. Se não bater, NÃO instale." },
          { n: "3", title: "Habilite fontes desconhecidas", desc: "Em Android 7 ou anterior: Configurações → Segurança → Fontes desconhecidas → Ativar. Em Android 8+: Configurações → Aplicativos → Permissões especiais → Instalar aplicativos desconhecidos → selecione o navegador ou gerenciador de arquivos que vai abrir o APK → Permitir.", detail: "Você pode revogar essa permissão após a instalação. Ela não é necessária para o app funcionar, apenas para instalar inicialmente." },
          { n: "4", title: "Instale o APK", desc: "Abra o gerenciador de arquivos (ex: Files do Google), navegue até a pasta Downloads, toque no APK do GG e em 'Instalar'. Aceite as permissões básicas.", detail: "Se aparecer aviso do Play Protect ('App pode ser prejudicial'), toque em 'Instalar mesmo assim'. O Play Protect marca o GG como suspeito porque ele acessa memória de outros apps — comportamento legítimo mas incomum." },
          { n: "5", title: "Conceda permissão root", desc: "Na primeira abertura, o GG vai exibir um diálogo pedindo acesso root. Toque em 'Conceder' (e marque 'Lembrar' se quiser). No Magisk, vá em Superusuário para confirmar que GG aparece com o switch ligado.", detail: "Se nenhum diálogo aparecer e o GG reclamar de falta de root, abra o Magisk Manager → Superusuário → toque no '+' → adicione o GG manualmente." },
          { n: "6", title: "Configure o DenyList (recomendado)", desc: "No Magisk: Configurações → encontre 'Habilitar DenyList' e ative. Depois: ainda em Configurações → DenyList → encontre o jogo na lista e marque o checkbox principal e todos os processos auxiliares listados embaixo.", detail: "Adicione TAMBÉM os processos do anti-cheat se estiverem em apps separados (ex: 'com.tencent.gamesafekiller' para alguns jogos). Sem isso, o jogo continua vendo o root." },
          { n: "7", title: "Conceda permissões adicionais", desc: "GG pede: acesso a Armazenamento (para scripts), Sobreposição (para o ícone flutuante) e Acessibilidade (opcional, melhora confiabilidade). Conceda todas para evitar problemas depois.", detail: "Em Configurações → Apps → Game Guardian → Permissões, todas devem estar verdes." },
          { n: "8", title: "Teste em jogo simples", desc: "Abra um jogo offline simples (ex: 2048, Candy Crush offline, qualquer puzzle). Toque no ícone flutuante do GG → selecione o jogo na lista → faça uma busca pelo número de pontos visível. Se aparecer resultados, está tudo funcionando.", detail: "Se a lista de processos vier vazia, o GG não está com root. Refaça os passos 1, 5 e 6." },
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

      <h2>Instalando root com Magisk — guia completo</h2>
      <AlertBox type="info" title="Magisk é o método de root mais popular em 2025">
        Magisk oferece root sistêmico com módulos, DenyList para ocultar root de apps específicos, suporte a Zygisk para hooks profundos e compatibilidade com a maioria dos dispositivos Android modernos. O criador (topjohnwu) saiu do projeto em 2022, mas a comunidade mantém ativamente.
      </AlertBox>

      <h3>Pré-requisitos para Magisk</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
        {[
          { titulo: "Bootloader desbloqueado", desc: "Pré-requisito absoluto. Cada fabricante tem um processo diferente: Xiaomi/POCO requer espera de 7+ dias e conta MI; Motorola/OnePlus aceitam código diretamente; Samsung varia (alguns modelos têm Knox que torna impossível)." },
          { titulo: "Cabo USB e PC", desc: "Necessário para flash de partições via fastboot. Use cabo de qualidade — cabos baratos travam no meio do flash." },
          { titulo: "Backup completo", desc: "Desbloquear bootloader APAGA todos os dados do dispositivo. Faça backup de fotos, contatos, mensagens, conversas WhatsApp ANTES." },
          { titulo: "Imagem de fábrica do dispositivo", desc: "Baixe a 'factory image' ou ROM oficial do site do fabricante para sua versão exata de Android. Essencial para extrair o boot.img." },
          { titulo: "Drivers ADB/Fastboot no PC", desc: "Windows precisa dos drivers do fabricante. Linux/Mac geralmente funcionam sem instalação. Teste com 'adb devices' — deve listar seu dispositivo." },
          { titulo: "Conhecimento básico de terminal", desc: "Você vai rodar comandos como 'fastboot flash boot magisk_patched.img'. Não precisa ser hacker, mas precisa estar confortável copiando comandos." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h3>Métodos de instalação do Magisk</h3>
      <div className="grid grid-cols-1 gap-3 my-4 not-prose">
        {[
          { metodo: "Método 1: Patch do boot.img (mais usado)", passos: ["Baixe a factory image do dispositivo do site do fabricante", "Extraia o arquivo boot.img da imagem (geralmente em payload.bin → use payload-dumper-go)", "Transfira o boot.img para o dispositivo", "Instale o APK do Magisk (magisk.apk do GitHub topjohnwu/Magisk)", "No Magisk: Instalar → Selecionar e Patchear arquivo → boot.img", "Magisk gera magisk_patched-XXX.img na pasta Downloads", "Transfira magisk_patched.img de volta para o PC", "Reinicie em fastboot: 'adb reboot bootloader'", "Flash: 'fastboot flash boot magisk_patched.img'", "Reinicie: 'fastboot reboot'"], dificuldade: "Médio" },
          { metodo: "Método 2: Recovery customizado (TWRP)", passos: ["Baixe TWRP para seu dispositivo (twrp.me)", "Reinicie em fastboot: 'adb reboot bootloader'", "Flash TWRP: 'fastboot flash recovery twrp.img'", "Entre em recovery: pressione volume+ no boot", "No TWRP: Install → selecione magisk.apk (sim, o APK)", "Confirme o flash", "Reinicie sistema"], dificuldade: "Mais complexo" },
          { metodo: "Método 3: Via Init_Boot (dispositivos novos)", passos: ["Para Android 13+ alguns dispositivos usam init_boot.img em vez de boot.img", "Procedimento idêntico mas patcha init_boot.img", "Flash com 'fastboot flash init_boot magisk_patched.img'"], dificuldade: "Mesma do Método 1" },
        ].map((item) => (
          <div key={item.metodo} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-start justify-between mb-2">
              <h4 className="font-bold text-foreground text-sm">{item.metodo}</h4>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-0.5 rounded">{item.dificuldade}</span>
            </div>
            <ol className="space-y-1 list-decimal list-inside">
              {item.passos.map((p, i) => <li key={i} className="text-xs text-foreground/80">{p}</li>)}
            </ol>
          </div>
        ))}
      </div>

      <h3>Módulos essenciais para o GG</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { nome: "PlayIntegrityFix (PIF)", autor: "chiteroman", desc: "Faz o dispositivo passar nas verificações de Play Integrity API (basic + device). Essencial para jogos modernos como Genshin Impact, PUBG Mobile, Free Fire que rejeitam dispositivos com root visível." },
          { nome: "Shamiko", autor: "LSPosed Devs", desc: "Esconde root de apps na DenyList de forma muito mais eficaz que o DenyList nativo. Trabalha em conjunto com Zygisk. Fundamental para anti-cheats agressivos." },
          { nome: "Zygisk-Next", autor: "Dr-TSNG", desc: "Substituto do Zygisk oficial com mais recursos. Necessário no KernelSU; em Magisk é alternativa quando Zygisk nativo dá problemas." },
          { nome: "TrickyStore", autor: "5ec1cff", desc: "Falsifica certificados de hardware (KeyAttestation), passando até em Strong Integrity de alguns jogos. Avançado." },
          { nome: "Universal SafetyNet Fix", autor: "kdrag0n", desc: "Versão antiga do PIF — útil se o PIF principal não funcionar no seu dispositivo. Mantida para compatibilidade." },
          { nome: "MagiskHide Props Config", autor: "Didgeridoohan", desc: "Permite editar propriedades do sistema (build.fingerprint, ro.product.brand) para fingir ser outro dispositivo. Útil em casos extremos." },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-start justify-between mb-1">
              <h4 className="font-bold text-foreground text-sm">{item.nome}</h4>
              <span className="text-xs text-muted-foreground italic">{item.autor}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Alternativas ao Magisk</h2>
      <div className="grid grid-cols-1 gap-4 my-6 not-prose">
        {[
          { nome: "KernelSU", desc: "Root no nível do kernel — opera em modo kernel, tornando-o muito mais difícil de detectar que o Magisk (que opera no espaço do usuário). Requer kernel customizado ou kernel oficial com KernelSU integrado.", quando: "Quando você quer máxima evasão de detecção e tem dispositivo com kernel suportado." },
          { nome: "APatch", desc: "Alternativa nova ao KernelSU. Patcha o kernel via modificação direta de bytes sem necessidade de recompilar. Mais fácil de instalar, mas comunidade menor.", quando: "Quando KernelSU não suporta seu dispositivo mas você quer root de kernel." },
          { nome: "Magisk Delta", desc: "Fork não oficial do Magisk com recursos adicionais (como MagiskHide voltando a funcionar nativamente). Comunidade menor.", quando: "Casos específicos onde Magisk oficial não funciona — raro." },
          { nome: "SuperSU (legado)", desc: "Antigo padrão de root, descontinuado em 2018. Ainda funciona em dispositivos antigos (Android 4-8) mas sem updates.", quando: "Apenas em dispositivos muito antigos." },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.nome}</h4>
            <p className="text-xs text-muted-foreground mb-1">{item.desc}</p>
            <p className="text-xs text-primary"><strong>Quando usar:</strong> {item.quando}</p>
          </div>
        ))}
      </div>

      <h2>Primeira execução e configuração</h2>
      <CodeBlock
        language="text"
        title="Configurações recomendadas após instalar"
        code={"1. Modo de execução:\n   GG → Configurações → Método de execução\n   → Selecione 'Root' se tiver root\n   → Selecione 'VirtualSpace' se não tiver root\n   → 'Híbrido' tenta root primeiro e cai para VS\n\n2. Modo furtivo:\n   GG → Configurações → Modo Furtivo → Habilitar\n   (Reduz visibilidade para anti-cheats)\n   (Renomeia o processo para algo genérico)\n\n3. Ícone flutuante:\n   GG → Configurações → Ícone flutuante\n   → 'GG' = ícone padrão (visível mas sem dúvida)\n   → 'Personalizado' = imagem que você escolher\n   → 'Ocultar' = sem ícone (acesse por notificação)\n\n4. Região padrão:\n   GG → Configurações → Região de busca padrão\n   → Defina 'Ca' para buscas mais rápidas\n\n5. Tipo de dado padrão:\n   → Defina 'Dword' para começar (mude conforme necessário)\n\n6. Velocidade de busca:\n   → Configurações → Performance\n   → Aumentar threads (4-8 em dispositivos modernos)\n   → Cuidado: muito alto pode causar travamento\n\n7. Idioma:\n   → Configurações → Idioma → Português Brasileiro\n   → Disponível desde versão 90+\n\n8. Notificação persistente:\n   → Permita notificação do GG sempre visível\n   → Útil para abrir GG quando ícone flutuante está oculto\n\n9. Pasta de scripts:\n   → Defina /sdcard/GameGuardian/Scripts/\n   → Coloque seus .lua nessa pasta para acesso rápido\n\n10. Backup de configurações:\n    → Configurações → Exportar configurações\n    → Útil ao trocar de dispositivo"}
      />

      <h2>Verificando que tudo está funcionando</h2>
      <CodeBlock
        language="text"
        title="Checklist de funcionamento — terminal Termux"
        code={"# 1. Root está ativo?\n$ su\n# (prompt deve mudar para #)\n# id\nuid=0(root) gid=0(root) groups=0(root) ...\n\n# 2. Magisk instalado e versão correta?\n# magisk -v\n26.4:MAGISK\n# magisk -V\n26400\n\n# 3. SELinux em modo correto?\n# getenforce\nEnforcing\n# (Magisk + módulos lidam com SELinux internamente)\n\n# 4. Zygisk habilitado?\n# magisk --zygisk\n(deve mostrar 'enabled')\n\n# 5. Módulos carregados?\n# ls /data/adb/modules/\nplayintegrityfix/\nshamiko/\nzygisk-next/\n\n# 6. GG tem root?\n# pm list packages | grep gameguardian\npackage:com.heinrich_r.btcoexapp.eu.gg\n\n# 7. Teste rápido em jogo simples\n# Abra qualquer jogo single-player com número visível na tela\n# (ex: pontuação em um quebra-cabeça)\n# Abra o GG → selecione o jogo → busque o número como Dword\n# Se aparecer resultados: tudo funciona\n# Se vier vazio ou GG não lista o jogo: revise root e DenyList"}
      />

      <AlertBox type="success" title="Testando se o GG está funcionando">
        Abra qualquer jogo simples (como um quebra-cabeça ou jogo de matemática) com um número visível na tela. Busque por esse número como Dword no GG. Se encontrar resultados, o GG está funcionando corretamente. Modifique o valor e veja se reflete no jogo — pronto, instalação validada.
      </AlertBox>

      <h2>Problemas na instalação</h2>
      <div className="grid grid-cols-1 gap-3 my-4 not-prose">
        {[
          { erro: "App não instalado (Error -24)", solucao: "Versão anterior corrompida. Vá em Configurações → Apps → desinstale o GG completamente, reinicie e instale de novo. Se persistir, limpe cache do sistema via recovery." },
          { erro: "Análise bloqueada pelo Play Protect", solucao: "No Google Play → Menu → Play Protect → Configurações → desative 'Verificar ameaças' temporariamente. Reative após instalação. Alternativamente, instale o APK via ADB ('adb install gg.apk') que pula a verificação." },
          { erro: "GG abre mas não lista processos", solucao: "Root não concedido. Abra Magisk → verifique se GG está em Superusuário com switch ligado. Se não estiver, abra o GG novamente — o diálogo de root deve aparecer. Se não aparecer, force parada do GG e reabra." },
          { erro: "Erro ao conceder root no GG", solucao: "Tente executar o GG como root via terminal: 'su -c am start -n com.heinrich_r.btcoexapp.eu.gg/.MainActivity'. Ou reinstale o Magisk. Em alguns dispositivos, mudar o modo Superusuário de 'Confirmar sempre' para 'Confirmar uma vez por sessão' resolve." },
          { erro: "GG anexa mas todas as buscas retornam 0", solucao: "Provavelmente DenyList está incorretamente configurado para o GG (esconde root DELE, não para ele). Remova o GG do DenyList. O DenyList deve ocultar o root do JOGO, não do GG." },
          { erro: "GG crasha ao abrir", solucao: "Versão incompatível com seu Android. Baixe a versão recomendada para sua versão de Android no site oficial — geralmente uma versão anterior funciona em Android antigo." },
          { erro: "Magisk não detecta root após instalar", solucao: "O patch pode não ter aplicado corretamente. Refaça: baixe boot.img novamente, patche, flash. Se persistir, pode ser que A/B partition esteja invertida — tente 'fastboot flash boot_a' e 'fastboot flash boot_b' alternados." },
          { erro: "Bootloop após instalar Magisk", solucao: "Algo deu errado no patch. Boot em fastboot ('volume- + power' por 10s) e flash o boot.img original (sem patch) para restaurar. Refaça o processo do início." },
          { erro: "Play Integrity falha mesmo com PIF", solucao: "PIF requer fingerprint atualizado. Vá em /data/adb/pif.json e edite com fingerprint de um dispositivo certificado recente. Comunidade mantém JSONs atualizados em fóruns como XDA." },
        ].map((item) => (
          <div key={item.erro} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
            <h4 className="font-bold text-destructive mb-1 text-sm">{item.erro}</h4>
            <p className="text-xs text-muted-foreground">{item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Atualizando o Game Guardian</h2>
      <p>
        O GG não tem auto-update (não está na Play Store). Verifique periodicamente novas versões em <strong>gameguardian.net</strong>. Para atualizar:
      </p>
      <ol>
        <li>Baixe o novo APK do site oficial</li>
        <li>Instale por cima da versão antiga (suas configurações e scripts são preservados)</li>
        <li>Reabra e verifique se as configurações continuam corretas</li>
        <li>Se algum script parar de funcionar, é provavelmente porque a API mudou — verifique o changelog</li>
      </ol>
      <p>
        Versões importantes a se manter atualizado: novas versões geralmente trazem melhorias em XOR, suporte a engines de jogo mais novos (IL2CPP atualizado, Unreal 5+) e bypass de detecções recentes. Vale a pena atualizar a cada 2-3 meses.
      </p>

      <h2>Desinstalando o Game Guardian</h2>
      <p>
        Se quiser remover completamente:
      </p>
      <ol>
        <li>Configurações Android → Apps → Game Guardian → Desinstalar</li>
        <li>Apague a pasta /sdcard/GameGuardian/ (contém scripts e backups)</li>
        <li>No Magisk → Superusuário → remova o GG da lista</li>
        <li>Se usou Virtual Space, desinstale o app de Virtual Space também</li>
      </ol>
      <p>
        A desinstalação é completa e não deixa rastros no sistema — diferente de outros apps de modificação que escrevem em partições do sistema.
      </p>

      <AlertBox type="info" title="Próximo passo">
        Com o GG instalado e funcionando, vá para <strong>Permissões e Root</strong> para entender em profundidade como o root funciona, ou pule para <strong>Interface do GG</strong> para conhecer cada parte do app.
      </AlertBox>
    </PageContainer>
  );
}
