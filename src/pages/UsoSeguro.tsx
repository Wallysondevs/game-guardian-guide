import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function UsoSeguro() {
  return (
    <PageContainer
      title="Uso Seguro"
      subtitle="Práticas para minimizar risco de ban, proteger sua conta principal e usar o Game Guardian de forma responsável e sustentável."
      difficulty="iniciante"
      timeToRead="18 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Conta secundária"}</strong> {' — '} {"nunca use cheat na conta principal."}
          </li>
        <li>
            <strong>{"Backup do save"}</strong> {' — '} {"antes de editar, copie o save."}
          </li>
        <li>
            <strong>{"Single-player"}</strong> {' — '} {"foco em offline minimiza risco."}
          </li>
        <li>
            <strong>{"Não compartilhe"}</strong> {' — '} {"prints com cheat ativo viram evidência."}
          </li>
        <li>
            <strong>{"Ética"}</strong> {' — '} {"respeite outros jogadores."}
          </li>
        </ul>
        <AlertBox type="warning" title="Risco zero não existe">
        Qualquer modificação em jogos online tem risco — não importa quão sofisticado seja o seu setup. A diferença está entre risco controlado (conta de testes, jogo offline, valores discretos) e risco alto (conta principal em jogo competitivo). Use estas práticas para reduzir, mas nunca elimine, o risco.
      </AlertBox>

      <h2>A regra de ouro: separação de contas</h2>
      <p>
        A prática mais importante de uso seguro é nunca usar GG na sua conta principal de jogos online. Crie uma conta dedicada apenas para experimentos. Se a conta de testes for banida, você não perde nada de valor — sem progresso de anos, sem dinheiro real investido, sem amigos da comunidade.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-destructive">
          <h4 className="font-bold text-destructive mb-2">❌ Conta principal</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>• Sua conta principal — nunca cheats</li>
            <li>• Email pessoal real (Gmail, etc.)</li>
            <li>• Compras em dinheiro real</li>
            <li>• Progresso de anos de jogo</li>
            <li>• Vinculada a redes sociais (Facebook, etc.)</li>
            <li>• Acesso a guildas e amigos</li>
            <li>• Itens raros ou exclusivos</li>
          </ul>
          <p className="mt-3 text-xs text-destructive font-semibold">JAMAIS usar GG aqui</p>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-yellow-500">
          <h4 className="font-bold text-yellow-500 mb-2">✅ Conta de testes</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>• Email descartável (10minmail, ProtonMail)</li>
            <li>• Sem informação real (nome falso, idade falsa)</li>
            <li>• Zero gastos em dinheiro real</li>
            <li>• Sem vinculação a redes sociais reais</li>
            <li>• Sem amigos importantes adicionados</li>
            <li>• Pronta para descartar a qualquer momento</li>
            <li>• Numerar (Teste1, Teste2, Teste3)</li>
          </ul>
          <p className="mt-3 text-xs text-yellow-500 font-semibold">Use GG livremente aqui</p>
        </div>
      </div>

      <h2>Princípios de uso seguro</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "1. Nunca em conta principal de jogos online", desc: "Se for testar GG em um jogo online, crie uma conta secundária dedicada. Banir uma conta de teste não dói — banir sua conta principal de Genshin com 200 horas e R$ 800 investidos dói para sempre." },
          { titulo: "2. Backup antes de tudo", desc: "Faça backup do save game (cópia da pasta /sdcard/Android/data/com.jogo.exemplo/) antes de qualquer modificação. Modificações ruins podem corromper saves permanentemente. Em jogos com cloud save: desabilite cloud sync temporariamente para evitar sincronizar save corrompido." },
          { titulo: "3. Modificações modestas", desc: "999.999 moedas é menos suspeito que 999.999.999. HP máximo do jogo é mais seguro que valores absurdos. Velocidade 1.5x passa despercebida; 10x dispara alarmes. Use o mínimo necessário para sua diversão." },
          { titulo: "4. Não em modo competitivo", desc: "Use apenas em modos offline, cooperativo ou casual. Modos ranqueados, torneios, eventos com prêmios reais são monitorados de perto e bans são instantâneos. Mesmo em modo casual, evite jogar contra jogadores humanos com hacks ativos." },
          { titulo: "5. Sessões curtas e variadas", desc: "Use o hack apenas pelo tempo necessário, depois desative. Sessões de 8 horas seguidas com cheats ativos são mais detectáveis que 30 minutos esporádicos. Alterne sessões com e sem cheat para parecer comportamento orgânico." },
          { titulo: "6. Sem screenshots/streaming", desc: "Não compartilhe screenshots com valores absurdos em redes sociais ou Discord. Anti-cheats monitoram redes sociais buscando capturas suspeitas. 'Olha como meu inventário tem 999B de moedas' = ban automático na próxima verificação." },
          { titulo: "7. Comportamento natural", desc: "Mesmo com cheats, jogue como um jogador normal. Não use velocidade 10x para correr toda a fase em 5 segundos. Não complete missões de 10 horas em 2 minutos. Comportamento alienígena = ML detection ban." },
          { titulo: "8. Atualizações cuidadosas", desc: "Após updates do jogo, verifique se anti-cheat foi atualizado. Force-stop o jogo, limpe cache, refaça verificações de Play Integrity antes de usar GG novamente. Updates frequentemente contêm novas detecções." },
          { titulo: "9. Sem cheats em apps que processam dinheiro", desc: "Aplicativos com componente financeiro (jogos com prêmios em dinheiro real, slots, gambling apps) podem ter consequências legais além do ban. Algumas jurisdições consideram fraude eletrônica." },
          { titulo: "10. Documente e revise", desc: "Mantenha um log dos jogos onde você usa GG, valores modificados, e qualquer warning recebido. Se um jogo começa a dar mensagens estranhas ('atividade suspeita detectada'), pare imediatamente — provavelmente está prestes a banir." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Tabela de risco por tipo de jogo</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo de Jogo</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Risco de Ban</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Severidade</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Recomendação</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Single-player offline puro", "🟢 Mínimo", "Sem ban — não há servidor", "Use livremente — sua experiência, seu jogo"],
              ["Offline com cloud save", "🟢 Baixo", "Save pode ser revertido pelo cloud", "OK, mas desative sync ao usar GG"],
              ["Cooperativo casual (PvE)", "🟡 Baixo-Médio", "Ban da conta após relatos repetidos", "Use só com amigos cientes do uso"],
              ["MMORPG casual", "🟡 Médio", "Ban temporário (3-30 dias)", "Conta secundária apenas, valores discretos"],
              ["MMORPG competitivo", "🟠 Alto", "Ban permanente da conta", "NUNCA — use GG em conta de testes"],
              ["MOBA (Mobile Legends, Wild Rift)", "🔴 Crítico", "Ban permanente + IP/Device ban", "JAMAIS — detecção é instantânea"],
              ["FPS competitivo (Free Fire, PUBG, CoD)", "🔴 Crítico", "Hardware ban — todo o aparelho", "JAMAIS — sem reverter, perde o aparelho"],
              ["Battle Royale ranked", "🔴 Crítico", "Ban + lista pública de cheaters", "JAMAIS — afeta reputação online"],
              ["Gacha (Genshin, Honkai, FGO)", "🔴 Crítico", "Ban + perda de toda compra real", "JAMAIS — investimento financeiro alto"],
              ["Idle/clicker offline", "🟢 Mínimo", "Sem ban — não há servidor competitivo", "Use livremente — adequado para GG"],
              ["Puzzle casual (Candy Crush, etc.)", "🟢 Baixo", "Save pode ser corrigido pelo servidor", "OK, mas evite valores absurdos"],
              ["Slots/Casino simulator", "🟡 Médio-Alto", "Ban + perda de gemas/moedas pagas", "Apenas se não comprou nada com dinheiro real"],
              ["Sports (FIFA, NBA mobile)", "🟠 Alto", "Ban da conta + perda de progresso", "Conta secundária, modo offline apenas"],
              ["Visual novel offline", "🟢 Mínimo", "Sem servidor — sem ban possível", "Use livremente"],
              ["Roguelike single-player", "🟢 Mínimo", "Sem competição online", "Use livremente"],
            ].map(([tipo, risco, severidade, rec], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{tipo}</td>
                <td className="px-4 py-2 border border-border text-sm">{risco}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{severidade}</td>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{rec}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Tipos de ban — entendendo as consequências</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { tipo: "Soft ban (temporário)", duracao: "1-30 dias", desc: "Conta suspensa por período definido. Após o prazo, volta normalmente. Geralmente primeiro aviso. Reincidência leva a bans mais severos.", recuperacao: "Esperar o prazo. Não tente burlar com VPN — pode escalar para hard ban." },
          { tipo: "Hard ban (permanente da conta)", duracao: "Para sempre", desc: "Conta banida permanentemente. Login é bloqueado. Compras em dinheiro real são perdidas (algumas jurisdições obrigam reembolso, mas é raro). Email pode ser bloqueado de criar nova conta.", recuperacao: "Conta perdida. Criar nova conta requer email diferente, telefone diferente, possivelmente IP diferente." },
          { tipo: "Device/Hardware ban", duracao: "Para sempre", desc: "Não só a conta, mas o dispositivo é banido (via IMEI, MAC address, fingerprint de hardware). Qualquer conta criada nesse aparelho é banida automaticamente.", recuperacao: "Mudar dispositivo é a única solução real. Spoof de hardware é detectável em jogos modernos." },
          { tipo: "IP ban", duracao: "Variável", desc: "Endereço IP banido — qualquer conexão dessa rede é bloqueada. Comum em jogos competitivos com cheaters frequentes.", recuperacao: "Mudar de rede (4G, WiFi alternativa, VPN). Mas o IP pode ser desbanido após algum tempo." },
          { tipo: "Shadow ban", duracao: "Para sempre", desc: "Conta funciona normalmente para você, mas você é matchado APENAS com outros suspeitos de cheating. Você não percebe — apenas que jogos são estranhos. Forma de 'isolar' cheaters sem alertá-los.", recuperacao: "Praticamente impossível detectar do lado do jogador. Conta basicamente inútil para jogo competitivo." },
          { tipo: "Vanity ban (só itens)", duracao: "Permanente", desc: "Itens obtidos via cheat são removidos. Conta continua mas com inventário 'higienizado'. Mensagem clara: 'sabemos o que você fez'. Próximo passo geralmente é hard ban.", recuperacao: "Pare imediatamente. Próximo cheat = ban permanente certo." },
          { tipo: "Wave ban (em massa)", duracao: "Variável", desc: "Em vez de banir individualmente, jogo acumula evidências e bane milhares simultaneamente em waves periódicos (mensais, trimestrais). Você pode usar cheat por 2 meses sem ser detectado e ser banido junto com outros 50.000.", recuperacao: "Sem como detectar até a wave. Usar cheat = aceitar que ban virá eventualmente." },
          { tipo: "Reputation ban (público)", duracao: "Permanente", desc: "Nome do jogador adicionado a lista pública de cheaters (Steam VAC, Riot, etc). Visível para outros jogadores. Estigma social.", recuperacao: "Reputação online afetada permanentemente. Em jogos sociais, isso é mais doloroso que o ban em si." },
        ].map((item) => (
          <div key={item.tipo} className="bg-card border border-border rounded-xl p-5">
            <div className="flex items-center justify-between mb-2">
              <h4 className="font-bold text-foreground text-sm">{item.tipo}</h4>
              <span className="text-xs text-muted-foreground">{item.duracao}</span>
            </div>
            <p className="text-xs text-muted-foreground mb-2">{item.desc}</p>
            <div className="bg-muted/30 rounded p-2">
              <p className="text-xs text-foreground/80"><strong>Recuperação:</strong> {item.recuperacao}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Configuração defensiva do GG</h2>
      <CodeBlock
        language="text"
        title="Configurações recomendadas para uso seguro"
        code={"GG → Configurações:\n\n[INTERFACE]\n☑ Modo Furtivo (ON)\n☑ Esconder ícone (Nenhum)\n☐ Notificações (OFF — não anunciar uso)\n☑ Pausar ao sair do jogo (ON)\n\n[BUSCA]\n☑ Reduzir uso de CPU (ON em background)\n☐ Auto-refresh resultados (OFF — manual)\nIntervalo de freeze: 200-500ms (não muito agressivo)\n\n[EDIÇÃO]\n☑ Confirmar antes de editar (ON — evita modificar errado)\n☐ Auto-aplicar favoritos (OFF — manual)\n\n[PERMISSÕES]\nApenas o necessário:\n- Display over apps: ON\n- Storage: ON (para saves)\n- Outros: OFF\n\n[ROOT/VS]\nUse Virtual Space sempre que possível\nSe usar root: DenyList + PIF + Shamiko configurados\n\n[SCRIPTS]\nUm script ativo por vez\nNão deixe scripts rodando após uso\n\n[BACKUPS]\n☑ Auto-backup de favoritos (ON)\nLocalização: /sdcard/GameGuardian/backups/"}
      />

      <h2>O que fazer se receber um warning</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", title: "Pare imediatamente", desc: "Desative GG, force-stop o jogo, remova qualquer freeze ativo. Não tente continuar — você está marcado." },
          { n: "2", title: "Não logue por 24-48h", desc: "Logar imediatamente após warning é vermelho para anti-cheats. Aguarde algumas dias antes de retomar normalmente (sem cheats)." },
          { n: "3", title: "Avalie a severidade", desc: "Warning genérico ('atividade suspeita') = aviso leve. Warning específico ('uso de ferramentas não autorizadas') = sério. Mensagens como 'última chance' = pré-ban iminente." },
          { n: "4", title: "Considere mudar conta", desc: "Se a conta tem warnings repetidos, está sendo monitorada de perto. Mude para conta nova antes que o ban venha." },
          { n: "5", title: "Limpe vestígios", desc: "Remova GG e VS, desinstale o jogo, limpe cache. Reinstale tudo do zero antes de continuar (em conta nova)." },
          { n: "6", title: "Aprenda com o erro", desc: "Pense: o que disparou? Valor muito alto? Sessão muito longa? Ação muito anormal? Ajuste seu padrão para próxima conta." },
        ].map((item) => (
          <div key={item.n} className="bg-card border border-border rounded-xl p-4">
            <div className="flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-destructive text-destructive-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-foreground mb-1 text-sm">{item.title}</h4>
                <p className="text-xs text-muted-foreground">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <h2>Privacidade do dispositivo</h2>
      <p>
        Algumas práticas para proteger seu dispositivo enquanto usa GG:
      </p>
      <ul>
        <li><strong>Apps bancários separados</strong>: idealmente, dispositivo dedicado para gaming/hacking, e outro para apps bancários. Se compartilhar, configure DenyList do Magisk para bancos.</li>
        <li><strong>Sem login Google principal</strong>: no aparelho de testes, use conta Google secundária. Evite conta principal vinculada a tudo.</li>
        <li><strong>VPN ao testar jogos online</strong>: oculta seu IP real. Se ban acontecer, IP banido não é o seu real.</li>
        <li><strong>Logs e arquivos</strong>: GG cria logs em /sdcard/GameGuardian/. Periodicamente limpe para evitar evidências em caso de auditoria por algum app.</li>
        <li><strong>Cuidado com permissões</strong>: GG pede acesso a Storage, Display over apps, etc. Não conceda permissões adicionais (camera, microfone, contatos) — não são necessárias.</li>
      </ul>

      <h2>Padrões saudáveis de uso</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-green-500">
          <h4 className="font-bold text-green-500 mb-2">✅ Padrões saudáveis</h4>
          <ul className="space-y-2 text-xs text-foreground/80">
            <li><strong>GG como ferramenta de aprendizado</strong>: explorar como jogos funcionam tecnicamente, entender memória virtual, structs, ponteiros.</li>
            <li><strong>GG para acessibilidade</strong>: jogadores com limitações usando GG para tornar jogos jogáveis (vida infinita em jogos rage, slow time para tremor).</li>
            <li><strong>GG em jogos terminados</strong>: revisitar jogos antigos com god mode após zerar legitimamente — rejogabilidade casual.</li>
            <li><strong>GG para experimentação</strong>: testar 'e se' — e se eu tivesse 999 de Força no início do RPG? Como muda a experiência?</li>
            <li><strong>GG para pesquisa</strong>: estudantes de segurança aprendendo análise de memória num ambiente seguro (jogos próprios).</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-5 border-l-4 border-l-destructive">
          <h4 className="font-bold text-destructive mb-2">❌ Padrões problemáticos</h4>
          <ul className="space-y-2 text-xs text-foreground/80">
            <li><strong>Cheats em multiplayer competitivo</strong>: estraga experiência de outros, é antiético, leva a ban.</li>
            <li><strong>Vender contas/itens hackeados</strong>: fraude, ilegal em muitos países.</li>
            <li><strong>'Carry' pago para outros via hack</strong>: fraude comercial.</li>
            <li><strong>Cheats em torneios com prêmios reais</strong>: pode ser crime de fraude.</li>
            <li><strong>Distribuir hacks pagos como serviço</strong>: cria mercado negro, prejudica ecossistema.</li>
            <li><strong>Usar GG para descobrir contas alheias</strong>: ataque a outras pessoas, não modificação de jogo.</li>
            <li><strong>Hacks que prejudicam jogadores</strong>: kick scripts, lag scripts, skill steal — abuso direto.</li>
          </ul>
        </div>
      </div>

      <AlertBox type="success" title="Princípio fundamental">
        GG é uma ferramenta. Como qualquer ferramenta poderosa, seu impacto depende do uso. Empregar para sua diversão pessoal em jogos offline = inofensivo. Empregar para prejudicar outros em PvP = causa real dano. Faça as escolhas certas — sua reputação online, suas contas, seu dispositivo e os outros jogadores agradecem.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Se algo deu errado durante seus testes, vá para <strong>Troubleshooting</strong> — temos soluções para os problemas mais comuns. Para reflexão sobre os limites éticos de uso, veja <strong>Ética e Responsabilidade</strong>.
      </AlertBox>
    </PageContainer>
  );
}
