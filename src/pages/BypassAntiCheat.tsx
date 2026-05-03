import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function BypassAntiCheat() {
  return (
    <PageContainer
      title="Bypass Anti-Cheat"
      subtitle="Como contornar sistemas de detecção de cheats em jogos Android — técnicas, ferramentas, configurações e os limites do que é tecnicamente possível."
      difficulty="avancado"
      timeToRead="28 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Anti-cheat"}</strong> {' — '} {"sistema que detecta modificação de memória."}
          </li>
        <li>
            <strong>{"Virtual Space"}</strong> {' — '} {"executa o jogo dentro de outro processo isolado."}
          </li>
        <li>
            <strong>{"SELinux"}</strong> {' — '} {"política do Android que pode bloquear injeção."}
          </li>
        <li>
            <strong>{"Detection"}</strong> {' — '} {"jogo varre código modificado e ban no servidor."}
          </li>
        <li>
            <strong>{"Ética"}</strong> {' — '} {"use só em offline/single-player."}
          </li>
        </ul>
        <AlertBox type="danger" title="Aviso ético e legal">
        Bypass de anti-cheat em jogos multiplayer online prejudica outros jogadores reais e viola os termos de serviço — quase sempre resulta em ban permanente da conta e às vezes do dispositivo. Use exclusivamente em jogos offline, single-player, ou em contas de teste descartáveis. Esta seção tem fins educacionais sobre como sistemas de segurança funcionam — entender é diferente de praticar.
      </AlertBox>

      <h2>Por que esta seção existe</h2>
      <p>
        Anti-cheats são sistemas complexos com múltiplas camadas. Compreender como funcionam é valioso para:
      </p>
      <ul>
        <li><strong>Pesquisadores de segurança</strong>: identificar vulnerabilidades e reportar responsavelmente.</li>
        <li><strong>Desenvolvedores de jogos</strong>: aprender o que outros estão fazendo para construir sistemas melhores.</li>
        <li><strong>Engenheiros mobile</strong>: entender técnicas de detecção de root, emulação e injeção.</li>
        <li><strong>Usuários casuais</strong>: saber porquê certos hacks funcionam em alguns jogos e em outros não.</li>
        <li><strong>Estudantes de CS</strong>: ver na prática conceitos de segurança, sandboxing, integridade de código.</li>
      </ul>
      <p>
        Esta seção descreve como funcionam — não estimula uso malicioso. Aplicar esse conhecimento em jogos competitivos online é antiético e ilegal em muitos casos.
      </p>

      <h2>Como funcionam os anti-cheats em jogos Android</h2>
      <p>Os sistemas anti-cheat em jogos mobile atuam em múltiplas camadas simultaneamente. Cada camada captura tipos diferentes de cheats:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { tipo: "Detecção de Root", nivel: "Client", desc: "Verifica arquivos /su, /system/xbin/su, /system/bin/su, propriedades do sistema (ro.build.tags=test-keys, ro.debuggable=1), presença do Magisk Manager, módulos instalados em /data/adb/modules, e mais de 50 outros indicadores de root. Bibliotecas como RootBeer e SafetyNet automatizam isso." },
          { tipo: "Detecção de Process Injection", nivel: "Client", desc: "Monitora processos que usam ptrace() para se anexar ao jogo. Detecta o GG pelo nome do processo, regiões de memória mapeadas (memory mapping anômalo), assinatura do binário e padrões de leitura de memória repetitivos típicos de busca." },
          { tipo: "Verificação de Integridade de Arquivo", nivel: "Client", desc: "Compara hashes MD5/SHA256 do APK e assets com valores originais armazenados ou validados via servidor. Detecta APKs modificados, patchados, ou com bibliotecas injetadas. Frida, Xposed e ferramentas de modding deixam assinaturas detectáveis." },
          { tipo: "Play Integrity API", nivel: "Client + Server", desc: "Atesta o estado do dispositivo via Google. Classifica como MEETS_BASIC_INTEGRITY (OK básico), MEETS_DEVICE_INTEGRITY (sem root visível), MEETS_STRONG_INTEGRITY (device certificado pelo fabricante, bootloader bloqueado). Substitui o antigo SafetyNet (descontinuado em 2024)." },
          { tipo: "Detecção de Emulador", nivel: "Client", desc: "Verifica ro.product.manufacturer (genérico = emulador), QEMU props (ro.kernel.qemu=1), presença de /dev/qemu_pipe e /dev/socket/qemud, sensores ausentes (sem giroscópio, sem acelerômetro), bateria sempre 100%, GPS sempre nas coordenadas (0,0)." },
          { tipo: "Validação Server-Side", nivel: "Server", desc: "Servidor valida todos os valores: HP, dinheiro, velocidade, posição. Rejeita valores impossíveis ou inconsistentes com o progresso do jogador. Impossível de burlar via GG — o cliente envia valores ao servidor que sempre tem a 'verdade'." },
          { tipo: "Análise Comportamental", nivel: "Server", desc: "Machine learning detecta padrões impossíveis: matar inimigos a distância impossível, coletar recursos 10x mais rápido que qualquer jogador legítimo, headshot rate de 100%, tempo de reação inferior a 50ms (humanamente impossível), padrões de movimento robóticos." },
          { tipo: "Monitoramento de Rede", nivel: "Server", desc: "Análise de padrões de pacotes. Modificações que geram pacotes incomuns são detectadas mesmo com dados corretos. Frequência anômala de chamadas API, ordem incorreta de mensagens, payloads com tamanho inesperado." },
          { tipo: "Replay Detection", nivel: "Server", desc: "Servidor reproduz suas ações com lógica determinística e compara com seu resultado reportado. Se você reportou matar boss em 5 segundos mas o cálculo mostra que precisaria de 30s, ban." },
          { tipo: "Honeypot Items", nivel: "Server", desc: "Itens 'invisíveis' que só aparecem para cheaters. Se você tem o item no inventário, é confissão automática de que usou ferramenta de inspeção de memória." },
          { tipo: "Telemetria de hardware", nivel: "Client + Server", desc: "Hash do hardware (modelo, IMEI, MAC, fingerprint) enviado ao servidor. Permite hardware ban — mesmo criando nova conta, dispositivo permanece banido." },
          { tipo: "Hooks de Frida/Xposed detection", nivel: "Client", desc: "Detecta ferramentas de instrumentação dinâmica via verificação de bibliotecas carregadas, hooks em funções nativas, threads suspeitas (frida-server thread)." },
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
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Dificuldade</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Detecção de root simples", "✅ Sim", "DenyList no Magisk + Shamiko", "Fácil"],
              ["Play Integrity (Basic)", "✅ Sim", "PlayIntegrityFix module", "Fácil"],
              ["Play Integrity (Device)", "🔶 Médio", "PIF + Shamiko + props customizados", "Médio"],
              ["Play Integrity (Strong)", "🔶 Difícil", "Requer dispositivo certificado sem root visível (KernelSU + SUSFS) ou assinatura de fabricante", "Muito difícil"],
              ["Detecção de processo GG", "✅ Sim", "Modo furtivo + renomear processo via Magisk", "Médio"],
              ["Verificação de APK (hash)", "✅ Sim", "APKTool para remover a verificação do código + reassinar", "Médio"],
              ["Detecção de emulador", "🔶 Parcial", "Props customizados via Magisk, mas imperfeito (sensores, GPU)", "Difícil"],
              ["Frida/Xposed detection", "✅ Sim", "FridaAntiAntiDebug, scripts custom", "Médio"],
              ["Validação server-side básica", "❌ Não", "Impossível client-side — requer exploits de servidor (fora de escopo)", "Impossível"],
              ["Validação server-side com replay", "❌ Não", "Mesmo problema, agravado pela validação extra", "Impossível"],
              ["Análise comportamental ML", "❌ Não", "O comportamento anormal é registrado no servidor independente do cliente", "Impossível"],
              ["Monitoramento de rede", "🔶 Parcial", "Modificar pacotes via proxy MITM (avançado, instável)", "Muito difícil"],
              ["Hardware ban", "🔶 Parcial", "Mudar IMEI, MAC (requer root profundo, pode brickar)", "Muito difícil"],
              ["Honeypot items", "❌ Não", "Já é confissão de cheating — não há como reverter sem aparecer", "Impossível"],
              ["Telemetria de hardware", "🔶 Parcial", "Spoof de fingerprint via módulos Magisk", "Médio"],
            ].map(([tipo, bypass, metodo, dif], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{tipo}</td>
                <td className="px-4 py-2 border border-border text-sm">{bypass}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{metodo}</td>
                <td className="px-4 py-2 border border-border text-secondary text-sm">{dif}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Bypassando detecção de root com Magisk</h2>
      <p>
        Magisk é o framework de root mais popular para Android e tem ferramentas dedicadas para esconder root de apps específicos. O processo é o método padrão para a vasta maioria dos casos:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", title: "Habilitar DenyList", desc: "Magisk → Configurações → Habilitar DenyList. Isso permite ocultar root de apps específicos.", detail: "Sem o DenyList habilitado, todos os apps veem o root. Em algumas versões, a opção pode estar como 'Zygisk' — habilite ambos." },
          { n: "2", title: "Adicionar o jogo ao DenyList", desc: "Magisk → DenyList → toque em Configurar → encontre o jogo → marque o processo principal.", detail: "Adicione TODOS os processos do jogo (às vezes há processo separado para anti-cheat — geralmente o pacote principal e variações com :gpsproc, :anti, etc). Após adicionar, force-stop e reabra o jogo." },
          { n: "3", title: "Instalar PlayIntegrityFix", desc: "Magisk → Módulos → Instalar de arquivo (ou pesquise 'PlayIntegrityFix') → instale → reinicie.", detail: "Essencial para jogos que usam Play Integrity API para verificar o dispositivo. O autor (chiteroman no GitHub) atualiza frequentemente — mantenha o módulo atualizado." },
          { n: "4", title: "Instalar Shamiko", desc: "Baixe o módulo Shamiko do GitHub (LSPosed/Shamiko) → instale via Magisk → reinicie.", detail: "Shamiko melhora significativamente a evasão do DenyList para apps mais sofisticados. Trabalha em conjunto com Zygisk para esconder o root no nível do processo Zygote." },
          { n: "5", title: "Instalar Universal SafetyNet Fix (legacy)", desc: "Para Android 10 e abaixo. Em Android 11+, é redundante com PlayIntegrityFix.", detail: "Se você está em Android antigo, este módulo ainda é necessário para SafetyNet (que alguns jogos antigos verificam)." },
          { n: "6", title: "Verificar com Play Integrity Checker", desc: "Instale 'Play Integrity Checker' (apk de terceiros, gratuito) e rode. Deve passar em Basic e Device Integrity.", detail: "Se ainda falhar em Basic Integrity, reveja instalação do PlayIntegrityFix — provavelmente módulo desatualizado. Strong Integrity geralmente é impossível com root, aceite essa limitação." },
          { n: "7", title: "Limpar cache do app verificado", desc: "Após configurar tudo, force-stop o jogo e limpe o cache do Google Play Services.", detail: "Caches antigos do Play Services podem reter o resultado anterior do Play Integrity. Limpar força nova verificação com a configuração atualizada." },
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

      <h2>KernelSU — root de nível de kernel</h2>
      <p>
        O KernelSU opera no nível do kernel, tornando-o muito mais difícil de detectar que o Magisk (que opera no espaço do usuário). Combinado com o SUSFS (Suspicious File System), é o método mais furtivo disponível em 2025. A trade-off é que requer kernel customizado — mais complexo de instalar.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-4 not-prose">
        {[
          { modulo: "KernelSU + SUSFS", desc: "SUSFS cria um filesystem virtual que esconde arquivos de root de processos específicos. Anti-cheats que procuram por /su, /data/adb/magisk não encontram nada — não porque está oculto, mas porque o kernel mente sobre a existência dos arquivos." },
          { modulo: "Zygisk-Next para KernelSU", desc: "Permite usar módulos Magisk (incluindo PlayIntegrityFix e Shamiko) no KernelSU. Necessário para compatibilidade máxima com módulos populares." },
          { modulo: "APatch", desc: "Alternativa ao KernelSU que patcha o kernel via modificação de bytes sem recompilar. Mais fácil de instalar em dispositivos não suportados pelo KernelSU oficialmente." },
          { modulo: "LSPosed (opcional)", desc: "Framework Xposed para KernelSU/Magisk. Permite hooks mais profundos em apps — útil para remover verificações anti-cheat específicas de um app individualmente, sem modificar o APK." },
          { modulo: "MagiskHide Props Config", desc: "Modifica propriedades do sistema (build.prop) em runtime para fingir ser outro dispositivo. Útil quando o anti-cheat verifica modelo específico." },
          { modulo: "DenyList Auto Helper", desc: "Adiciona automaticamente novos processos de jogos ao DenyList. Útil para jogos que criam subprocessos dinâmicos." },
          { modulo: "Hide My Applist", desc: "Esconde apps específicos da lista de packages instalados visível para outros apps. Anti-cheats não veem o GG instalado." },
          { modulo: "FrameworkPatch", desc: "Patcha o framework Android para esconder modificações estruturais. Útil contra anti-cheats que verificam integridade do system_server." },
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
        title="Checklist de configuração anti-detecção do GG"
        code={"1. Modo Furtivo ativado:\n   GG → Configurações → Modo Furtivo → ON\n   (Reduz assinatura do processo, randomiza nome)\n\n2. Ícone invisível:\n   GG → Configurações → Ícone → Nenhum\n   (Anti-cheat não detecta overlay nem ícone visível na tela)\n\n3. Use script em vez de interface manual:\n   Execute modificações via .lua script\n   (Menor interação com APIs monitoradas, mais discreto)\n\n4. Nunca modificar durante loading ou matchmaking:\n   Faça modificações apenas dentro da partida ativa\n   (Menor chance de detecção por timestamps suspeitos)\n\n5. Valores plausíveis:\n   999.999 moedas OK, 999.999.999 suspeito\n   HP = MaxHP OK, HP = 9999999 suspeito\n   Velocidade 1.5x OK, 50x suspeito\n\n6. Variar comportamento:\n   Não use o hack TODO o tempo — alterne sessões com cheat\n   e sem cheat para parecer mais natural\n\n7. Renomeie GG nas configurações:\n   GG → Configurações → Nome do app → 'Calculator' (ou similar)\n   (Engana inspeção visual e logs)\n\n8. Desabilite gravação de tela durante uso:\n   Anti-cheat pode detectar overlay de gravação combinado com GG\n\n9. Use SOMENTE um script por sessão:\n   Múltiplos scripts simultâneos aumentam footprint detectável\n\n10. Nunca exploit-se em ranked/PvP:\n    Mesmo com configurações perfeitas, jogo competitivo VAI banir"}
      />

      <h2>Removendo verificações anti-cheat via APKTool</h2>
      <AlertBox type="warning" title="Modificar APKs viola termos de serviço e possivelmente leis de copyright">
        Esta técnica é usada em pesquisa de segurança e em jogos offline para fins educacionais. Para jogos online, é detectada pelo servidor quando o APK modificado conecta — o servidor recebe o hash do APK e compara com o esperado.
      </AlertBox>
      <CodeBlock
        language="text"
        title="Processo de remoção de anti-cheat do APK"
        code={"// No PC com Java e APKTool instalados:\n\n1. Descompilar o APK:\n   apktool d jogo.apk -o jogo_decompilado\n   \n   // Cria pasta com smali/, res/, AndroidManifest.xml, etc.\n\n2. Encontrar verificações de root/cheat:\n   grep -r 'isRooted\\|SU\\|Magisk\\|GameGuardian' jogo_decompilado/smali\n   grep -r 'rootbeer\\|RootBeer' jogo_decompilado/smali\n   grep -r 'ptrace\\|debug' jogo_decompilado/smali\n   \n   // Identifica métodos de verificação suspeitos\n\n3. Substituir retornos de verificação:\n   // Função isRooted() que retorna true → mude para return false\n   // Em smali (a 'assembly' do Android):\n   .method public isRooted()Z\n     .registers 1\n     const/4 v0, 0x1   ← TROCAR PARA 0x0\n     return v0\n   .end method\n\n4. Recompilar:\n   apktool b jogo_decompilado -o jogo_mod.apk\n\n5. Assinar o APK (necessário para instalar):\n   keytool -genkey -v -keystore minha_chave.jks \\\n     -alias minha -keyalg RSA -validity 10000\n   apksigner sign --ks minha_chave.jks jogo_mod.apk\n\n6. Verificar assinatura:\n   apksigner verify jogo_mod.apk\n\n7. Instalar e testar:\n   adb install -r jogo_mod.apk\n   \n   // -r = replace (sobrescreve versão existente)\n\n// LIMITAÇÕES:\n// - Não funciona se o jogo verifica seu próprio hash\n//   (você precisaria patchar a verificação de hash também)\n// - Não funciona se o jogo recompila código nativo no startup\n// - Para jogos com código nativo (libcocos2dxlua.so, libUnity.so),\n//   precisa de IDA Pro / Ghidra além de APKTool\n// - Cada update do jogo refaz toda a modificação"}
      />

      <h2>Frida — instrumentação dinâmica</h2>
      <p>
        Para casos onde modificar APK não funciona, Frida permite hooks em runtime — modificar o comportamento do app enquanto roda, sem alterar arquivos:
      </p>
      <CodeBlock
        language="text"
        title="Exemplo Frida — bypass de root detection em runtime"
        code={"// frida-server precisa estar rodando no dispositivo\n// pip install frida-tools no PC\n\n// hook.js — script Frida\nJava.perform(function() {\n  // Hook na classe RootBeer\n  var RootBeer = Java.use('com.scottyab.rootbeer.RootBeer');\n  \n  // Sobrescrever método isRooted() para sempre retornar false\n  RootBeer.isRooted.implementation = function() {\n    console.log('[*] isRooted() chamado — retornando false');\n    return false;\n  };\n  \n  // Hook em todos os métodos suspeitos\n  RootBeer.detectRootManagementApps.implementation = function() {\n    return false;\n  };\n  RootBeer.detectPotentiallyDangerousApps.implementation = function() {\n    return false;\n  };\n  RootBeer.checkForBinary.implementation = function(binary) {\n    console.log('[*] checkForBinary(' + binary + ') — retornando false');\n    return false;\n  };\n  \n  console.log('[+] RootBeer hooks instalados');\n});\n\n// Executar:\n// frida -U -l hook.js -f com.jogo.exemplo --no-pause\n\n// VANTAGENS:\n// - Não modifica arquivos do app\n// - Pode ser ativado/desativado por sessão\n// - Permite hooks complexos (modificar parâmetros, retornos)\n// - Funciona em apps com verificação de hash do APK\n\n// DESVANTAGENS:\n// - Requer Frida Server rodando (detectável)\n// - Mais complexo de configurar que GG\n// - Hooks podem quebrar em updates do jogo\n// - Anti-cheats modernos detectam Frida facilmente"}
      />

      <h2>O limite intransponível — validação server-side</h2>
      <AlertBox type="danger" title="Free Fire, PUBG, CoD Mobile, Genshin Impact, Honkai Star Rail — não há bypass">
        Esses jogos (e muitos outros) validam TODOS os valores no servidor. Modificar HP no cliente para 99999 não tem efeito — o servidor continua calculando com o valor real. Ao enviar dados inconsistentes, o servidor detecta e bane automaticamente. Não há nenhum método client-side que resolva isso.
      </AlertBox>
      <p>
        A única forma de afetar jogos com validação total server-side é através de vulnerabilidades no próprio servidor (server-side exploits) — isso é hacking de verdade, ilegal em qualquer jurisdição séria, e completamente fora do escopo do GG e deste guia.
      </p>
      <CodeBlock
        language="text"
        title="Por que jogos modernos online são imbatíveis client-side"
        code={"ARQUITETURA TÍPICA de jogo online competitivo:\n\nCLIENTE (seu telefone):\n  - Apenas RENDERIZA o estado recebido do servidor\n  - Envia INTENÇÕES (atirar, mover, usar skill) ao servidor\n  - NÃO toma decisões importantes\n\nSERVIDOR (datacenter da empresa):\n  - Mantém o estado REAL do jogo\n  - Processa TODAS as ações dos jogadores\n  - Valida fisicamente: 'O jogador X poderia atingir Y?\n    (linha de visão, distância, tempo de vôo do projétil)'\n  - Calcula dano usando suas próprias fórmulas\n  - Envia resultados aos clientes\n\nSe você modificar HP no cliente para 9999:\n  - Visualmente, sua barra de HP vai aparecer cheia\n  - Mas o servidor continua com HP real (digamos, 50)\n  - Próxima vez que servidor envia atualização, HP volta a 50\n  - Se você perder os 50 reais, MORRE — mesmo aparentando ter 9999\n  - Anti-cheat detecta divergência: ban\n\nÚNICAS modificações que funcionam em jogos server-validated:\n  - Visuais puramente cosméticos (zoom hack em FPS — dá vantagem mínima)\n  - Aimbot client-side (usa apenas posições já recebidas)\n  - Wallhack (revela posições já enviadas)\n  - Estes ainda são detectáveis por análise comportamental"}
      />

      <h2>Jogos com anti-cheat fraco (bons candidatos para GG)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { tipo: "RPGs offline", desc: "Calculam tudo localmente. Sem servidor para validar. Perfeitos para GG. Exemplos: Star Wars KOTOR Mobile, Final Fantasy ports, GTA Mobile ports." },
          { tipo: "Jogos de puzzle/casual", desc: "Raramente têm anti-cheat. Fáceis de modificar. Exemplos: Candy Crush, Two Dots, Sudoku apps." },
          { tipo: "Clickers e idle games", desc: "Valores grandes armazenados client-side. Geralmente sem validação de servidor. Cookie Clicker, AdVenture Capitalist, Tap Titans." },
          { tipo: "Jogos com modo offline", desc: "O modo offline não tem validação de servidor. Use GG apenas nesse modo. Asphalt 9 offline, alguns racing games." },
          { tipo: "Visual novels", desc: "Engine simples, valores em memória previsíveis. Fácil de modificar pontos de afinidade, gold." },
          { tipo: "Tower defense single-player", desc: "Cálculos locais. Modificar gold, HP de torres, dano. Bloons TD, Plants vs Zombies single." },
          { tipo: "Roguelikes mobile", desc: "Sem persistência online importante. Modificar runs em andamento. Slay the Spire, Dead Cells mobile." },
          { tipo: "Jogos antigos (pré-2015)", desc: "Sem anti-cheat moderno. Funcionam plenamente com GG. Considere ports de jogos clássicos para mobile." },
        ].map((item) => (
          <div key={item.tipo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-green-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">✅ {item.tipo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <AlertBox type="success" title="Princípio fundamental">
        Se o jogo é offline ou puramente single-player: GG funciona quase sempre, com risco mínimo. Se o jogo é multiplayer competitivo: GG não vai funcionar bem, e qualquer tentativa será detectada. O sweet spot do GG está no meio — jogos com componente online apenas para social (rankings, amigos) mas com gameplay localmente calculado.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Agora que entende como anti-cheats funcionam, vá para <strong>Uso Seguro</strong> para aprender padrões de comportamento que minimizam risco de ban — mesmo em jogos com validação parcial.
      </AlertBox>
    </PageContainer>
  );
}
