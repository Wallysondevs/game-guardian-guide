import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Etica() {
  return (
    <PageContainer
      title="Ética e Responsabilidade"
      subtitle="Reflexões aprofundadas sobre o uso responsável do Game Guardian — onde está a linha entre aprendizado, diversão pessoal e prejuízo a outros."
      difficulty="iniciante"
      timeToRead="15 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Single-player"}</strong> {' — '} {"editar seu próprio save é ok."}
          </li>
        <li>
            <strong>{"Multiplayer"}</strong> {' — '} {"prejudica outros jogadores; ban é certo."}
          </li>
        <li>
            <strong>{"ToS"}</strong> {' — '} {"usar cheat geralmente viola Terms of Service."}
          </li>
        <li>
            <strong>{"Bans"}</strong> {' — '} {"contas, hardware ID e IP podem ser banidos."}
          </li>
        <li>
            <strong>{"Aprenda"}</strong> {' — '} {"use cheats como aprendizado de RE, não atalho."}
          </li>
        </ul>
        <AlertBox type="warning" title="Ferramenta poderosa, responsabilidade maior">
        O Game Guardian é uma ferramenta técnica legítima de análise de memória — equiparável ao Cheat Engine no PC, GDB para debugging, ou Frida para instrumentação dinâmica. Como qualquer ferramenta poderosa, seu impacto depende inteiramente de quem a usa e para quê. Esta seção convida você a refletir sobre as escolhas éticas envolvidas no uso de ferramentas de modificação de jogos.
      </AlertBox>

      <h2>O dilema fundamental</h2>
      <p>
        Modificar a memória de um jogo é, em si, uma ação tecnicamente fascinante e potencialmente educativa. Não é diferente de tomar um carro de brinquedo do seu próprio quarto e abrir para ver como funciona. O problema surge quando essa modificação afeta outras pessoas — quando você usa o conhecimento para prejudicar alguém que não consentiu em jogar contra um adversário modificado.
      </p>
      <p>
        A diferença ética não está na ferramenta. Está no contexto:
      </p>
      <ul>
        <li>Modificar HP em um RPG offline para terminar a história mais rápido = sua experiência, seu jogo, sua escolha. Inofensivo.</li>
        <li>Modificar HP em PvP competitivo para vencer adversários reais = você está roubando a vitória de outras pessoas. Imoral.</li>
        <li>Mesmo ato técnico, contexto completamente diferente, julgamento ético oposto.</li>
      </ul>

      <h2>Quando o uso é completamente aceitável</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { status: "✅", cor: "border-l-green-500", titulo: "Jogos offline single-player", desc: "Modificar sua própria experiência em jogos sem componente multiplayer não prejudica ninguém. Quer testar todos os itens do jogo? Dar skip em grind desnecessário? Refazer um boss difícil sem perder horas? Válido. É o seu jogo, sua máquina, sua diversão." },
          { status: "✅", cor: "border-l-green-500", titulo: "Desenvolvimento e QA", desc: "Desenvolvedores usam análise de memória profissionalmente para testar seus próprios jogos — verificar cálculos de HP, encontrar bugs de overflow, validar comportamento de structs de dados, simular estados raros (boss com 1 HP para testar animação de morte). Game studios têm equipes inteiras dedicadas a isso." },
          { status: "✅", cor: "border-l-green-500", titulo: "Acessibilidade", desc: "Jogadores com limitações físicas (tremores, mobilidade reduzida, deficiência visual parcial) podem usar GG para tornar jogos acessíveis: vida infinita em jogos rage que exigem reflexos perfeitos, slow time para quem tem tempo de reação reduzido, pular seções impossíveis. Acessibilidade > pureza do desafio." },
          { status: "✅", cor: "border-l-green-500", titulo: "Educação em segurança e CS", desc: "Entender como jogos armazenam dados ensina memória, estrutura de dados, compilação, segurança de software e engenharia reversa. É uma introdução prática a Ciência da Computação que livros didáticos raramente conseguem replicar. Muitos profissionais de cibersegurança começaram modificando jogos." },
          { status: "✅", cor: "border-l-green-500", titulo: "Pesquisa de segurança", desc: "Encontrar vulnerabilidades em jogos para reportar responsavelmente aos desenvolvedores melhora a segurança do ecossistema. Algumas empresas pagam bug bounties para esse trabalho (Riot, Activision têm programas formais)." },
          { status: "✅", cor: "border-l-green-500", titulo: "Curiosidade técnica", desc: "Apenas explorar e entender. Você não modifica nada que afete gameplay, só observa estruturas de memória e aprende. Engenharia reversa puramente educativa, sem cheating ativo." },
          { status: "✅", cor: "border-l-green-500", titulo: "Jogos abandonados / offline only", desc: "Servidores fechados, jogos que não recebem mais atualizações. Modificar é manter vivo conteúdo que de outra forma estaria perdido. Comunidades de speedrunning frequentemente usam memory tools para criar route otimizadas." },
          { status: "⚠️", cor: "border-l-yellow-500", titulo: "Jogos PvE cooperativo online", desc: "Hack em modo cooperativo impacta a economia do jogo (você ganha XP/loot mais rápido, devalorizando trabalho de outros). Menos grave que PvP mas afeta o matchmaking, a economia de itens raros e a experiência de outros jogadores. Comunique aos amigos antes." },
          { status: "⚠️", cor: "border-l-yellow-500", titulo: "Jogos com componente social mas sem PvP", desc: "MMORPGs onde você não luta contra outros mas exibe progresso (rank em leaderboard, riqueza visível, conquistas). Hackear cria expectativas falsas em jogadores honestos. Risco moral médio." },
          { status: "❌", cor: "border-l-destructive", titulo: "PvP e competitivo online", desc: "Prejudica diretamente outros jogadores reais. Uma partida com um jogador com vida infinita destrói a experiência de todos os outros participantes honestos. Sem nenhuma justificativa moral defensável. Não importa se é jogo casual ou ranqueado." },
          { status: "❌", cor: "border-l-destructive", titulo: "Venda de contas ou itens hackeados", desc: "É fraude. Você vende algo sem valor real como se tivesse. Em muitos países isso é crime sob leis de fraude eletrônica (Lei 12.737/12 no Brasil). Vítimas frequentemente têm contas banidas posteriormente, perdendo o que pagaram." },
          { status: "❌", cor: "border-l-destructive", titulo: "Boost pago para outros jogadores", desc: "Jogador A paga jogador B para subir rank usando hacks. A não sabe ou finge não saber. Resultado: ban de A quando descoberto, B desaparece. Fraude comercial." },
          { status: "❌", cor: "border-l-destructive", titulo: "Manipulação de torneios com prêmios reais", desc: "Cheat em competições com dinheiro real é crime de fraude. Não estamos falando só de ban — pode haver consequências legais sérias dependendo do valor envolvido." },
          { status: "❌", cor: "border-l-destructive", titulo: "Distribuir/vender hacks como serviço", desc: "Criar mercado negro de cheats prejudica o ecossistema inteiro. Jogos que viram 'cheating playground' perdem jogadores honestos, fecham servidores, comunidades morrem. Causa danos sistêmicos amplos." },
        ].map((item) => (
          <div key={item.titulo} className={"flex gap-4 bg-card border border-border rounded-xl p-4 border-l-4 " + item.cor}>
            <span className="text-xl shrink-0">{item.status}</span>
            <div>
              <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>O impacto real no ecossistema de jogos</h2>
      <p>
        Cheating não é vítima sem rosto. Cada jogador que usa cheats em modo competitivo causa danos mensuráveis ao jogo e à comunidade. Os números são reveladores:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { impacto: "Abandono de jogadores honestos", desc: "Pesquisas da Irdeto e da Newzoo mostram que 60-70% dos jogadores abandonam um jogo ao perceber cheaters frequentes. Isso colapsa a base de usuários progressivamente — uma vez começado o êxodo, é difícil reverter." },
          { impacto: "Custo de anti-cheat", desc: "Sistemas como Easy Anti-Cheat, BattleEye e Vanguard custam milhões por ano para licenciar e manter. Esse custo é repassado nos preços de jogos, microtransações, ou cortado de melhorias e novo conteúdo. Tudo isso porque uma minoria não consegue jogar honesto." },
          { impacto: "Toxicidade da comunidade", desc: "Ambientes com muitos cheaters se tornam hostis. Jogadores honestos passam a desconfiar de qualquer um que joga bem ('você tá usando hack?'). Acusações falsas crescem. Novos jogadores não ficam, veteranos vão embora, a comunidade murcha." },
          { impacto: "Fechamento de servidores", desc: "Títulos populares já fecharam servidores regionais parcialmente por cheating excessivo (algumas regiões da Ásia em CS:GO, Free Fire BR antes do anti-cheat melhorar). Pode acontecer com qualquer jogo que perca o controle." },
          { impacto: "Investimento financeiro perdido", desc: "Quando empresas decidem fechar jogos por unsustainability (incluindo cheating), todo investimento dos jogadores é perdido. Skins compradas, battle passes, contas premium — tudo vira nada." },
          { impacto: "Mortalidade de eSports", desc: "Cenas competitivas dependem de fé no resultado. Cheating em alto nível mata torneios, quebra patrocínios, encerra carreiras de pros honestos. A cena de Free Fire competitiva sofreu reveses sérios por escândalos de cheating em 2022-2023." },
          { impacto: "Carga em servidores", desc: "Anti-cheats consomem CPU/banda significativos para detectar. Servidores ficam mais lentos para todos. Ban hammer não restaura a performance perdida durante o ataque." },
          { impacto: "Custo psicológico individual", desc: "Jogadores honestos relatam frustração, ansiedade, perda de prazer no hobby. Adolescentes especialmente afetados quando jogos servem como escape e socialização. Pesquisas em saúde mental gamer documentam isso." },
        ].map((item) => (
          <div key={item.impacto} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.impacto}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Aspectos legais no Brasil</h2>
      <AlertBox type="danger" title="Disclaimer">
        Este guia não constitui assessoria jurídica. Para questões legais específicas, consulte um advogado especializado em Direito Digital ou Direito Penal Eletrônico. As informações abaixo são gerais e podem mudar com novas legislações ou jurisprudência.
      </AlertBox>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Lei</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Aplicação ao GG</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Risco</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["ToS do jogo (contrato civil)", "Uso de GG quase sempre viola os Termos de Serviço. Ban de conta é a punição padrão.", "Ban permanente, perda de itens comprados"],
              ["Lei 9.609/98 (Software)", "Modificar software protegido pode violar direitos autorais (decompilar, modificar APK).", "Cível — raramente processado para uso pessoal sem fins lucrativos"],
              ["Lei 12.737/12 (Lei Carolina Dieckmann)", "Acesso não autorizado a sistemas. Discutível para uso pessoal offline. Aplicável a sistemas críticos.", "Criminal — aplicado a sistemas críticos, raramente a jogos individuais"],
              ["Lei 12.965/14 (Marco Civil)", "Regula uso de aplicações na internet. Pouco aplicável diretamente, mais relevante para empresas que fornecem serviços.", "Cível — normalmente entre empresas"],
              ["Lei 13.709/18 (LGPD)", "Coleta indevida de dados de outros jogadores via cheats sociais.", "Multa LGPD pode ser pesada — relevante apenas se cheats coletam dados pessoais alheios"],
              ["Código Defesa Consumidor", "Vender conta hackeada é propaganda enganosa + estelionato.", "Cível + criminal (estelionato art. 171 CP)"],
              ["Código Penal — Art. 171 (Estelionato)", "Vender itens/contas hackeados a terceiros é fraude — induzir alguém a erro para obter vantagem.", "Pena 1-5 anos + multa, dependendo do valor envolvido"],
              ["Código Penal — Art. 154-A (Invasão dispositivo)", "Hackear conta de outro jogador para roubar itens é claramente crime.", "Pena 6 meses a 2 anos"],
              ["Lei 14.155/21 (Crimes informáticos)", "Atualizou penas para invasão e fraude eletrônica. Aplicável a fraudes envolvendo cheats em jogos com prêmios reais.", "Pena pode ser pesada (4-8 anos em casos qualificados)"],
              ["Termos de plataformas (Google, Apple)", "Usar GG via Play Store / App Store viola ToS. Banimento de conta de developer/publisher.", "Restrições de conta nas plataformas"],
            ].map(([lei, aplicacao, risco], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{lei}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{aplicacao}</td>
                <td className="px-4 py-2 border border-border text-destructive text-sm">{risco}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>O caso especial dos menores de idade</h2>
      <p>
        Boa parte dos usuários de cheats em jogos mobile são adolescentes. Algumas considerações especiais:
      </p>
      <ul>
        <li><strong>Responsabilidade civil dos pais</strong>: pais respondem por atos ilícitos cometidos por menores em alguns casos. Se um adolescente causa prejuízo significativo via cheats (vendendo contas hackeadas), pode haver consequências para a família.</li>
        <li><strong>Maturidade ética em desenvolvimento</strong>: adolescentes ainda estão formando senso de impacto em terceiros. Cheating em PvP pode parecer 'só um jogo' mas afeta pessoas reais.</li>
        <li><strong>Vício e tempo de tela</strong>: cheats podem agravar uso compulsivo (você sempre 'vence', sempre tem mais recursos, sempre quer mais). Reflita sobre o equilíbrio.</li>
        <li><strong>Habilidades técnicas valiosas</strong>: a curiosidade que leva ao cheating é a mesma que leva a carreiras em segurança, programação, engenharia. Direcione a energia construtivamente — aprenda Python, eletrônica, contribua para projetos open-source.</li>
      </ul>

      <h2>Reflexões sobre privilégio e justiça</h2>
      <p>
        Há um argumento defensivo comum: "uso cheat porque o jogo é injusto / favorece pagantes / exige tempo demais que não tenho". Vamos analisá-lo:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5">
          <h4 className="font-bold text-foreground mb-2">Argumentos a favor:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>• Jogos pay-to-win exploram comportamento compulsivo</li>
            <li>• Grind excessivo (centenas de horas) é design abusivo</li>
            <li>• Microtransações com loot boxes são quase gambling</li>
            <li>• Empresas lucram bilhões — o jogador hackear não os prejudica significativamente</li>
            <li>• Conteúdo deveria ser acessível, não bloqueado por dinheiro</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h4 className="font-bold text-foreground mb-2">Contra-argumentos:</h4>
          <ul className="space-y-1 text-xs text-foreground/80">
            <li>• Em PvP, você prejudica outros jogadores, não a empresa</li>
            <li>• Boicote (não jogar) é mais ético que cheating + jogar</li>
            <li>• Cheating não muda o sistema — apenas valida que o jogo é hackeavel</li>
            <li>• Jogadores honestos pagantes ficam ainda mais frustrados</li>
            <li>• Existem alternativas: jogos indie, jogos cooperativos, single-player</li>
          </ul>
        </div>
      </div>
      <p>
        A síntese pragmática: se você considera o jogo eticamente problemático, a resposta consistente é não jogá-lo. Continuar jogando + cheating é um meio-termo que prejudica outros jogadores sem realmente resolver o problema sistêmico que você critica.
      </p>

      <h2>Nossa filosofia neste guia</h2>
      <p>
        Este guia trata o GG como uma <strong>ferramenta de aprendizado técnico</strong>. A mesma curiosidade que leva alguém a explorar a memória de jogos pode levar a carreiras em:
      </p>
      <ul>
        <li><strong>Segurança da informação</strong>: pentesters, red teams, security researchers — começaram modificando jogos.</li>
        <li><strong>Desenvolvimento de games</strong>: entender como jogos funcionam por dentro é educação valiosa para ser desenvolvedor.</li>
        <li><strong>Engenharia reversa profissional</strong>: análise de malware, recuperação de software perdido, interoperabilidade.</li>
        <li><strong>Análise forense digital</strong>: entender como dados ficam na memória de processos vivos.</li>
        <li><strong>QA e testing automatizado</strong>: ferramentas como Frida, GG, Cheat Engine são usadas em testing profissional.</li>
      </ul>
      <p>
        Por isso o guia é tão técnico e detalhado — queremos que quem usa entenda o que está fazendo, não apenas siga receitas. Conhecimento real, contexto histórico, considerações éticas — tudo parte da formação técnica completa.
      </p>

      <h2>Princípios para uso ético</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { p: "1. Faça apenas em jogos próprios e offline", desc: "A regra mais simples e abrangente. Se o jogo é seu e single-player, você pode fazer o que quiser. Se há outros jogadores envolvidos, há considerações éticas." },
          { p: "2. Pergunte: alguém é prejudicado?", desc: "Se a resposta é 'sim, outros jogadores', repense. Se é 'apenas a empresa que vende loot boxes', considere se isso é eticamente aceitável para você (varia por pessoa)." },
          { p: "3. Não monetize cheats", desc: "Vender hacks ou contas hackeadas cria mercado negro, prejudica jogadores que pagam, pode ter consequências legais. Se compartilhar conhecimento, faça gratuitamente." },
          { p: "4. Respeite a comunidade dos jogos", desc: "Mesmo em jogos onde tecnicamente você pode hackear sem prejudicar (offline), pense na comunidade. Compartilhar tutoriais de cheat em fóruns oficiais geralmente viola etiqueta." },
          { p: "5. Use o conhecimento construtivamente", desc: "Se você ficou bom em GG, considere reportar bugs encontrados aos desenvolvedores. Muitos têm bug bounty programs. Você pode ganhar reconhecimento e até dinheiro pelo conhecimento técnico." },
          { p: "6. Não promova cheating em jogos online", desc: "Mesmo que você use, não estimule outros a fazer o mesmo em jogos competitivos. Cada novo cheater aumenta o problema sistêmico." },
          { p: "7. Seja transparente em ambientes amigos", desc: "Se você joga em modo cooperativo com amigos e usa cheats (ex: para pular partes chatas), comunique. Eles têm direito de saber e decidir se querem jogar com você nessa condição." },
          { p: "8. Nunca em torneios ou competições", desc: "Mesmo torneios amadores com prêmios pequenos. Mesmo entre amigos com 'aposta' de café. Cheating compete um cenário onde regras existem para definir vencedor justo." },
        ].map((item) => (
          <div key={item.p} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-primary">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.p}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <AlertBox type="success" title="Alternativas éticas">
        Quer um jogo mais fácil sem prejudicar ninguém? Algumas opções:
        <ul className="mt-2 space-y-1 text-xs">
          <li>• Jogue no modo de dificuldade mais baixo (muitos jogos têm 'Story Mode')</li>
          <li>• Procure versões offline ou single-player do jogo (modo arcade, modo prática)</li>
          <li>• Use mods oficialmente suportados (Steam Workshop, Nexus Mods)</li>
          <li>• Use o GG apenas em modo offline onde não há impacto em outros jogadores</li>
          <li>• Procure jogos de outros desenvolvedores com filosofias diferentes (jogos indie, cooperativos, narrativos)</li>
          <li>• Aceite o desafio — algumas vezes a satisfação vem de superar dificuldades, não de evitá-las</li>
          <li>• Use cheats existentes do próprio jogo (códigos de cheat clássicos, modo desenvolvedor)</li>
        </ul>
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Para aprofundar conhecimento técnico, vá para <strong>Referências e Recursos</strong> — comunidades, ferramentas complementares, livros e canais que ajudam a transformar curiosidade técnica em habilidades profissionais.
      </AlertBox>
    </PageContainer>
  );
}
