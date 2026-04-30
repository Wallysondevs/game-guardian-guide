import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Troubleshooting() {
  return (
    <PageContainer
      title="Troubleshooting"
      subtitle="Soluções detalhadas para problemas mais comuns ao usar Game Guardian — desde instalação até falhas em buscas e edições, organizados por categoria."
      difficulty="iniciante"
      timeToRead="20 min"
    >
      <AlertBox type="info" title="Como usar este guia">
        Os problemas estão organizados por categoria. Se sua questão não está aqui, considere postar em fóruns como gameguardian.net/forum, comunidades do Telegram em português, ou Discord. Boas descrições de problema (modelo do aparelho, versão Android, jogo, exato comportamento) recebem ajuda mais rápida.
      </AlertBox>

      <h2>Problemas de instalação</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Erro 'Aplicativo não instalado'", causa: "APK corrompido durante download, falta de espaço, ou incompatibilidade com versão Android.", solucao: "Baixe novamente do site oficial gameguardian.net (não de mirrors), libere pelo menos 200MB de espaço no /data, verifique se a versão do GG é compatível com seu Android (mais antigo: GG 8.x; Android 12+: GG 101.x ou superior)." },
          { titulo: "Bloqueado pelo Play Protect", causa: "Google identifica GG como ameaça (categoria 'Apps potencialmente prejudiciais'). Reação automática.", solucao: "Configurações → Google → Segurança → Play Protect → desabilite verificação de apps. Após instalar GG, reabilite Play Protect (não vai escanear o GG já instalado se não atualizar via Play Store)." },
          { titulo: "GG instala mas não abre", causa: "Versão incompatível com a CPU (ARM vs ARM64), ou app falha em verificar permissões iniciais.", solucao: "Baixe a versão correta para sua arquitetura (descubra em Configurações → Sobre o telefone → CPU). Para Android 64-bit, use GG ARM64. Limpe cache: Configurações → Apps → GG → Armazenamento → Limpar cache. Se ainda não funcionar, desinstale e reinstale." },
          { titulo: "Mensagem 'O parser do APK falhou'", causa: "APK corrompido ou versão para Android diferente do seu.", solucao: "Re-baixe usando outro navegador ou rede. Se persistir, baixe a versão 'all-versions' do APK que detecta automaticamente sua arquitetura. Verifique no site oficial qual versão é para qual Android." },
          { titulo: "Antivírus do celular bloqueia", causa: "Avast Mobile, Norton, McAfee detectam GG como 'hacking tool'.", solucao: "Adicione GG à lista de exclusão do antivírus (todos os antivírus têm essa opção). Alternativamente, desinstale o antivírus durante instalação e reinstale depois." },
          { titulo: "Erro durante instalação 'INSTALL_FAILED_VERSION_DOWNGRADE'", causa: "Tentando instalar versão mais antiga do GG sobre uma mais nova.", solucao: "Desinstale a versão atual primeiro (Configurações → Apps → GG → Desinstalar). Depois instale a versão desejada. Para downgrade frequente, use ADB: 'adb install -d -r gg.apk' (-d permite downgrade)." },
          { titulo: "GG instalado mas não aparece na gaveta de apps", causa: "Modo furtivo ativo desde primeira instalação, ou ícone escondido por configuração.", solucao: "Acesse via Configurações → Apps → procure 'Game Guardian' → toque para abrir. Ou reinstale e desabilite modo furtivo na primeira execução." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-destructive">
            <h4 className="font-bold text-foreground mb-1 text-sm">❌ {item.titulo}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Problemas de root e permissões</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "GG não detecta root mesmo com Magisk instalado", causa: "Permissão SU não foi concedida explicitamente, ou Magisk Hide está bloqueando o GG.", solucao: "Abra Magisk Manager → DenyList → REMOVA o Game Guardian se estiver lá. Reabra o GG → Magisk pergunta sobre permissão SU → conceda 'Sempre'. Se ainda falhar, desinstale Magisk Hide e use apenas DenyList nativo." },
          { titulo: "Permissão SU é concedida mas GG mostra 'Sem root'", causa: "Magisk em modo seguro, daemon SU travado, ou configuração de Zygisk incorreta.", solucao: "Reinicie o telefone primeiro. Se persistir: Magisk → Configurações → desabilite Zygisk → reinicie → reabilite Zygisk → reinicie novamente. Em alguns dispositivos, atualizar o Magisk para versão mais recente resolve." },
          { titulo: "Erro 'Falha ao iniciar serviço root'", causa: "Daemon SU não está respondendo, MagiskSU bug, ou outro app consumindo a permissão.", solucao: "Verifique se 'su' funciona: instale Termux → digite 'su' → deve dar prompt de permissão. Se Termux funciona mas GG não, problema é específico do GG: limpe cache e dados do GG e reabra." },
          { titulo: "App de Virtual Space não abre o jogo", causa: "Versão do jogo incompatível com VS (geralmente jogos com proteção forte).", solucao: "Tente outro VS (VirtualXposed, Parallel Space, Dual Space). Verifique se o jogo é incompatível na lista do VS oficial. Como último recurso: rode jogo+GG via VMOS (Android virtual completo, mais pesado mas mais compatível)." },
          { titulo: "GG abre mas sem botão flutuante quando entro no jogo", causa: "Permissão 'Display over other apps' não foi concedida, ou Android 13+ bloqueou silenciosamente.", solucao: "Configurações → Apps → GG → Permissões → 'Aparecer em cima de outros apps' → permitir. No Android 13+, vá em 'Permissões especiais' separadamente e habilite ali também." },
          { titulo: "Jogo detecta root mesmo com PIF e Shamiko", causa: "Jogo usa verificações além de Play Integrity (verificação direta de arquivos /su, processos, etc).", solucao: "Adicione MagiskHide Props Config, Hide My Applist module, e considere KernelSU + SUSFS para detecção mais profunda. Para alguns jogos pesados, root simplesmente não passa — use Virtual Space." },
          { titulo: "Após update do Android, root parou de funcionar", causa: "Update OTA substituiu boot.img modificado pelo original.", solucao: "Refaça o root: baixe boot.img da nova versão Android, patch com Magisk, flash via fastboot. Em alguns Samsung modernos, OEM unlock precisa ser re-habilitado também." },
          { titulo: "Banco bloqueando após instalar Magisk", causa: "Banco detecta root via Play Integrity ou própria verificação.", solucao: "Adicione todos os apps bancários (Nubank, Itaú, Caixa, Bradesco, etc.) ao DenyList do Magisk. Force-stop os apps. Reabra. Para apps super sensíveis, considere usar GG via Virtual Space em vez de root completo." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-yellow-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">⚠️ {item.titulo}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Problemas de busca</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Busca retorna 0 resultados", causa: "Tipo de dado errado, valor incorreto, região errada, ou jogo usa encriptação.", solucao: "Sequência de testes: 1) tente Float em vez de Dword (ou vice-versa); 2) tente XOR (4 bytes) — encriptação é comum; 3) tente Auto (testa todos); 4) expanda região para A em vez de Ca; 5) verifique se o valor está exatamente correto na UI (1.250 ≠ 1250 com vírgula)." },
          { titulo: "Busca trava o telefone", causa: "Buscando em região muito grande (toda memória) sem refinamento prévio.", solucao: "Use sempre região Ca primeiro (não A). Aguarde busca terminar antes de tentar novamente — não é crash, está processando. Em dispositivos fracos, pode levar 1-2 minutos. Configure GG → Configurações → Performance → Limit results para 50.000." },
          { titulo: "Resultados muito altos (50.000+) que não diminuem", causa: "Refinamento não está realmente refinando, ou tipo de dado errado.", solucao: "Após primeira busca, mude o valor no jogo significativamente (ao menos 10%) antes de refinar. Se resultados não diminuem, valor que você está procurando pode estar com tipo errado — tente outro tipo." },
          { titulo: "GG fecha sozinho durante busca", causa: "Memória insuficiente — busca consumiu toda RAM disponível.", solucao: "Feche outros apps em background. Reduza limite de resultados em GG → Configurações → Performance → Max results para 10.000. Em dispositivos com 4GB RAM ou menos, busque sempre em região Ca apenas." },
          { titulo: "Encontrei valor mas modificar não funciona", causa: "Endereço errado entre vários candidatos, ou valor é apenas display (cache da UI).", solucao: "Refine mais antes de modificar — espere ter no máximo 5-10 resultados. Modifique todos simultaneamente para ver qual afeta. Se valor visível muda mas lógica do jogo não (ainda morre com pouco HP), você modificou apenas o display — encontre o valor real através de mudança forçada (sofra dano e refine)." },
          { titulo: "Refinamento elimina TODOS os resultados", causa: "Tempo decorrido entre busca inicial e refinamento foi muito longo, valor mudou por timer/regeneração.", solucao: "Faça pause no jogo se possível antes de mudar valores e refinar. Para valores que regeneram (HP, stamina), busque em momento que está estável (sem regen ativa)." },
          { titulo: "Busca por desconhecido (Unknown) traz milhões de resultados", causa: "Comportamento esperado — toda memória é considerada inicialmente.", solucao: "Faça AÇÃO clara no jogo (mova, atire, etc) e refine com 'Mudou'. Repita 10-20x para isolar. Use sempre em região Ca para reduzir pool inicial. Aceite que esse método é lento." },
          { titulo: "Busca em grupo não funciona", causa: "Offset incorreto entre valores, ou valores não estão realmente em struct contígua.", solucao: "Verifique a sintaxe: Group Search com tipo Float, group offset 4 (próximo Float está 4 bytes depois). Para coordenadas X,Y,Z: offset 4 (cada float ocupa 4 bytes). Se valores não estão em struct, faça buscas individuais." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-blue-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">🔍 {item.titulo}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Problemas de edição e freeze</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Valor modificado volta ao normal em segundos", causa: "Jogo está sobrescrevendo via timer, lógica de jogo, ou validação interna a cada frame.", solucao: "Use freeze (cadeado). Se valor ainda muda mesmo congelado: o jogo recalcula a partir de outra variável — encontre essa outra variável e congele também. Ou: aumente frequência de freeze em GG → Configurações → Freeze interval para 50ms (mais agressivo)." },
          { titulo: "Freeze causa lag massivo no jogo", causa: "Muitos endereços freezados ou intervalo muito agressivo (sub-100ms).", solucao: "Reduza para 5-10 endereços freezados simultaneamente. Aumente intervalo para 500ms-1s. Em dispositivos fracos, freeze de 50+ endereços é impraticável." },
          { titulo: "Modificar trava o jogo (crash)", causa: "Valor modificado causou overflow, divisão por zero, ou estado inválido.", solucao: "Tente valores menores e mais conservadores: 9999 em vez de 999999999. Para Float: evite NaN, infinito (1e30+), zero em divisores. Salve com modificação leve, depois aumente gradualmente para encontrar o limite seguro." },
          { titulo: "Edição funciona mas inimigos viram imortais", causa: "Você modificou estrutura compartilhada (não só seu personagem).", solucao: "Você editou um endereço que afeta múltiplas instâncias da struct. Faça refinamento mais agressivo para isolar exatamente o seu personagem. Mude valor 5+ vezes consecutivas para garantir que está no endereço único do player." },
          { titulo: "Após modificar, jogo entra em loop estranho", causa: "Modificou flag de estado interno (ex: 'isInCombat = true' permanente).", solucao: "Reinicie a fase ou recarregue save. Não modifique flags binárias (Byte 0/1) sem entender o que cada uma faz. Use favoritos e contexto para distinguir flags úteis de perigosas." },
          { titulo: "Freeze ativo desaparece sozinho", causa: "Endereço se tornou inválido (jogo realocou memória, mudou de fase, etc).", solucao: "Se acontece após mudança de fase: o endereço era dinâmico para essa fase. Use ponteiros (veja seção Edição de Memória) para acompanhar realocação. Salve favoritos com ponteiros, não endereços diretos." },
          { titulo: "Modificação não aparece visualmente mas afeta gameplay", causa: "Cache da UI desatualizado — valor real foi modificado mas display ainda mostra antigo.", solucao: "Faça uma ação que force redesenhar a UI (entre/saia do menu, sofra dano leve, recolete um item). Se UI persistente em mostrar errado, encontre endereço de display separado e modifique também." },
          { titulo: "Após restart do jogo, favoritos não funcionam", causa: "Endereços eram dinâmicos — jogo aloca em locais diferentes a cada sessão.", solucao: "Você precisa de PONTEIROS para favoritos persistentes entre sessões. Veja a seção 'Edição de Memória → Ponteiros'. Salve o ponteiro estático e GG seguirá automaticamente para o endereço atual em cada sessão." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-orange-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">✏️ {item.titulo}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Problemas com scripts Lua</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Script não executa — erro de sintaxe", causa: "Erro de sintaxe Lua (missing 'end', vírgula incorreta em tabela, etc).", solucao: "GG mostra erro com linha. Procure 'end' faltando para if/while/function. Verifique se uses 'do' após for/while. Lua é case-sensitive: 'gg.Alert' ≠ 'gg.alert'. Use editor com syntax highlighting Lua (Acode no Android, VSCode no PC)." },
          { titulo: "Script não encontra valores", causa: "Tipo, região, ou string de busca incorretos.", solucao: "Adicione print() para debug. print('Encontrados: ' .. gg.getResultsCount()). Verifique se setRanges foi chamado antes de searchNumber. Tipo de busca deve ser constante (gg.TYPE_FLOAT, não 'FLOAT'). Valor de busca deve ser STRING: '100' não 100." },
          { titulo: "gg.alert / gg.prompt não aparecem", causa: "Janela do GG está minimizada ou outro app sobrepondo.", solucao: "gg.setVisible(true) antes de mostrar diálogos. Se tem múltiplos diálogos, dê pequeno gg.sleep(100) entre eles. Verifique permissão 'Display over apps' do GG." },
          { titulo: "Loop while infinito trava o GG", causa: "Sem condição de saída ou sleep insuficiente.", solucao: "Adicione gg.sleep(100) ou maior dentro do loop. Adicione condição de saída (ex: contador máximo, verificação de gg.isVisible). Use 'break' para sair de loops quando necessário." },
          { titulo: "Script funciona em um dispositivo mas não em outro", causa: "Endereços hardcoded são específicos do dispositivo, ou diferenças 32-bit vs 64-bit.", solucao: "Use gg.getTargetInfo().x64 para detectar arquitetura. Use ponteiros em vez de endereços absolutos. Faça busca dinâmica em vez de assumir endereços." },
          { titulo: "Erro 'attempt to index nil value'", causa: "Variável usada antes de inicializada, ou função retornou nil.", solucao: "Sempre verifique retornos: 'local r = gg.getValues(...); if r and r[1] then ... end'. Inicialize variáveis: 'local x = 0' antes de usar. Use pcall() para chamadas que podem falhar." },
          { titulo: "Script funciona mas extremamente lento", causa: "getResults com count enorme, loops sem sleep, busca em região A grande.", solucao: "Limite getResults a 100. Adicione sleep em loops. Use Ca em vez de A. Lote operações: gg.getValues({tab1, tab2, tab3}) em vez de chamar 3x. Veja seção 'Performance' de Scripts Avançados." },
          { titulo: "Não consigo importar script de arquivo .lua", causa: "Permissão de Storage não concedida, ou arquivo em local não acessível.", solucao: "Conceda permissão Storage ao GG. Coloque .lua em /sdcard/Download/ ou /sdcard/Notes/ (caminhos sempre acessíveis). Em Android 11+, pode precisar de 'Acesso a todos os arquivos' especial." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-purple-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">📜 {item.titulo}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Problemas específicos com jogos</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Free Fire / PUBG / CoD Mobile detectam GG instantaneamente", causa: "Anti-cheats top-tier (BattleEye, Easy Anti-Cheat, custom) com detecção em tempo real.", solucao: "Não há solução prática. Esses jogos usam validação server-side completa + detecção de tools client-side múltipla camadas. Tentativa = ban garantido. Aceite a impossibilidade. Use GG em outros jogos." },
          { titulo: "Genshin Impact / Honkai abre, mas trava ao logar", causa: "miHoYo Anti-Cheat detectou tooling.", solucao: "Use sem nada de tooling visível: GG fechado totalmente, scripts Frida/Xposed desabilitados. Mesmo assim, ban é provável dentro de horas/dias se modificar QUALQUER valor. Não recomendado." },
          { titulo: "Roblox bane após qualquer modificação", causa: "Roblox tem proteção FE (Filtering Enabled) que valida tudo no servidor.", solucao: "Apenas hacks puramente cosméticos (camera zoom, etc.) podem funcionar. Modificação de valores in-game = ban via análise comportamental dentro de minutos." },
          { titulo: "Jogo Unity comum não acha valores como Dword", causa: "Unity tipicamente usa Float para tudo (engine padrão).", solucao: "Sempre tente Float em jogos Unity. HP, mana, dinheiro, stats — tudo Float. Para inteiros (level, contador), tente Float primeiro depois Dword. Para arrays grandes (inventário), busca em grupo Float." },
          { titulo: "Jogo Cocos2d-x / Lua não acha nada", causa: "Cocos2d-x frequentemente encripta valores na memória (XOR variável).", solucao: "Tente XOR (4 bytes) primeiro em jogos Cocos. Confirme com libcocos2dxlua.so na pasta lib do APK. Para Lua nativo, valores podem estar em string interpretada — tente busca por texto." },
          { titulo: "Jogo Java/Kotlin nativo não responde a busca em Ca", causa: "Java armazena dados na Java Heap (Jh), não na heap C nativa.", solucao: "Use região Jh (Java Heap) em vez de Ca. Tipos: int = Dword, long = Qword, float = Float. Strings em Java são objetos especiais — busque a referência primeiro." },
          { titulo: "Mobile Legends bane mesmo só observando memória", causa: "MOBA com proteção pesada — qualquer ferramenta detectável dispara ban.", solucao: "MLBB não tolera GG nem em modo passivo. Não tente. Use jogos com anti-cheat menos paranoico." },
          { titulo: "Pokemon GO bane por GPS spoof + GG combinado", causa: "Niantic tem detecção sofisticada de GPS spoof + análise de comportamento.", solucao: "Pokemon GO é caso especial — qualquer modificação detectável (GPS spoof, GG, joystick virtual) = ban da conta. Não há setup seguro para uso massivo." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">🎮 {item.titulo}</h4>
            <p className="text-xs text-muted-foreground mb-1"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-xs text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Comandos úteis para diagnóstico</h2>
      <CodeBlock
        language="text"
        title="Diagnóstico via Termux ou ADB shell"
        code={"# Verificar se SU funciona:\nsu -c 'id'\n# Esperado: uid=0(root) gid=0(root)\n\n# Verificar versão Android e arquitetura:\ngetprop ro.build.version.release   # versão Android (ex: 13)\ngetprop ro.product.cpu.abi         # arquitetura (arm64-v8a, armeabi-v7a)\ngetprop ro.product.model           # modelo do telefone\n\n# Verificar processos rodando:\nps -A | grep -i guardian\nps -A | grep [nome do jogo]\n\n# Listar bibliotecas carregadas pelo jogo (precisa root):\ncat /proc/[PID]/maps | grep '\\.so'\n\n# Verificar memória disponível:\nfree -h\n\n# Verificar permissões do GG:\npm dump com.gameguardian.app | grep -i permission\n\n# Verificar status do Magisk:\nsu -c 'magisk --list'\nsu -c 'magisk --denylist ls'\n\n# Verificar Play Integrity (precisa do app Play Integrity Checker):\n# Resultado esperado: MEETS_BASIC_INTEGRITY + MEETS_DEVICE_INTEGRITY\n\n# Logs em tempo real do sistema (ajuda diagnosticar crashes):\nlogcat -v time | grep -i guardian\nlogcat -v time | grep -i [nome do jogo]\n\n# Se o app estiver crashando:\nlogcat -b crash"}
      />

      <h2>Quando pedir ajuda na comunidade</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-green-500">
          <h4 className="font-bold text-foreground mb-2">✅ Bom post de problema:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>• Modelo exato do aparelho (ex: Samsung S22)</li>
            <li>• Versão Android (ex: Android 13)</li>
            <li>• Versão do GG (ex: 101.1)</li>
            <li>• Modo: root, Virtual Space, ou ambos</li>
            <li>• Nome exato do jogo + versão</li>
            <li>• Descrição do problema passo a passo</li>
            <li>• O que você já tentou</li>
            <li>• Mensagens de erro literais (screenshots ajudam)</li>
            <li>• Logs relevantes (logcat se possível)</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-destructive">
          <h4 className="font-bold text-foreground mb-2">❌ Post ruim:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>• 'GG não funciona, ajuda'</li>
            <li>• Sem informações de aparelho</li>
            <li>• Sem nome do jogo</li>
            <li>• Sem mostrar o que tentou</li>
            <li>• Pedindo cheat pronto sem aprender</li>
            <li>• Em jogo competitivo (ninguém vai ajudar — comunidade ética)</li>
            <li>• Em outro idioma sem tradução em fórum em inglês</li>
            <li>• Sem ler tutorials básicos antes</li>
          </ul>
        </div>
      </div>

      <AlertBox type="success" title="Boa parte dos problemas tem soluções simples">
        Antes de pedir ajuda, tente: 1) reiniciar o telefone, 2) limpar cache do GG, 3) atualizar GG e Magisk para versões mais recentes, 4) verificar se o jogo recebeu update recente. Esses 4 passos resolvem ~70% dos problemas relatados.
      </AlertBox>

      <AlertBox type="info" title="Ainda com problemas?">
        Confira a seção <strong>Referências e Recursos</strong> para links de fóruns, comunidades brasileiras de GG no Telegram, Discord e outras fontes de ajuda. Mantenha sempre a calma — a maioria dos problemas tem solução conhecida.
      </AlertBox>
    </PageContainer>
  );
}
