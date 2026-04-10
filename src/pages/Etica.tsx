import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Etica() {
    return (
      <PageContainer
        title="Ética e Responsabilidade"
        subtitle="Reflexões sobre uso responsável do Game Guardian — onde está a linha entre aprendizado e prejuízo."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <AlertBox type="warning" title="Ferramenta poderosa, responsabilidade maior">
          O Game Guardian é uma ferramenta técnica legítima de análise de memória. Como qualquer ferramenta poderosa, seu impacto depende inteiramente de quem a usa e para quê.
        </AlertBox>

        <h2>Quando o uso é completamente aceitável</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { status: "✅", cor: "border-l-green-500", titulo: "Jogos offline single-player", desc: "Modificar sua própria experiência em jogos sem componente multiplayer não prejudica ninguém. Quer testar todos os itens do jogo? Dar skip em grind desnecessário? Válido." },
            { status: "✅", cor: "border-l-green-500", titulo: "Desenvolvimento e QA", desc: "Desenvolvedores usam análise de memória para testar seus próprios jogos — verificar cálculos de HP, bugs de overflow, comportamento de structs de dados." },
            { status: "✅", cor: "border-l-green-500", titulo: "Acessibilidade", desc: "Jogadores com limitações físicas podem usar o GG para tornar jogos mais acessíveis: vida infinita, tempo congelado, pular seções impossíveis para quem tem tremor nas mãos." },
            { status: "✅", cor: "border-l-green-500", titulo: "Educação em segurança", desc: "Entender como jogos armazenam dados ensina memória, estrutura de dados, compilação e segurança. É uma introdução prática a CS e engenharia reversa." },
            { status: "✅", cor: "border-l-green-500", titulo: "Pesquisa de segurança", desc: "Encontrar vulnerabilidades em jogos para reportar responsavelmente aos desenvolvedores melhora a segurança do ecossistema." },
            { status: "⚠️", cor: "border-l-yellow-500", titulo: "Jogos PvE cooperativo online", desc: "Hack em modo cooperativo impacta a economia do jogo. Menos grave que PvP mas afeta o matchmaking e a experiência de outros jogadores." },
            { status: "❌", cor: "border-l-destructive", titulo: "PvP e competitivo online", desc: "Prejudica diretamente outros jogadores reais. Uma partida com um jogador com vida infinita destrói a experiência de todos os outros participantes honestos." },
            { status: "❌", cor: "border-l-destructive", titulo: "Venda de contas ou itens hackeados", desc: "É fraude. Você vende algo sem valor real como se tivesse. Em muitos países isso é crime sob leis de fraude eletrônica." },
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
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { impacto: "Abandono de jogadores honestos", desc: "Pesquisas mostram que 60-70% dos jogadores abandonam um jogo ao perceber cheaters frequentes. Isso colapsa a base de usuários progressivamente." },
            { impacto: "Custo de anti-cheat", desc: "Sistemas como Easy Anti-Cheat custam milhões para manter. Esse custo é repassado nos preços ou cortado de melhorias no jogo." },
            { impacto: "Toxicidade da comunidade", desc: "Ambientes com muitos cheaters se tornam hostis. Novos jogadores não ficam, veteranos vão embora, a comunidade murcha." },
            { impacto: "Fechamento de servidores", desc: "Títulos populares já fecharam servidores regionais parcialmente por cheating excessivo e queda de monetização associada." },
          ].map((item) => (
            <div key={item.impacto} className="bg-card border border-border rounded-xl p-4">
              <h4 className="font-bold text-foreground mb-1 text-sm">{item.impacto}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Aspectos legais no Brasil</h2>
        <AlertBox type="danger" title="Disclaimer">
          Este guia não constitui assessoria jurídica. Para questões legais específicas, consulte um advogado.
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
                ["ToS do jogo", "Uso de GG quase sempre viola os Termos. Ban de conta é a punição padrão.", "Ban permanente, perda de itens"],
                ["Lei 9.609/98 (Software)", "Modificar software protegido pode violar direitos autorais.", "Cível — raramente processado para uso pessoal"],
                ["Lei 12.737/12", "Acesso não autorizado a sistemas. Discutível para uso pessoal offline.", "Criminal — aplicado a sistemas críticos, não jogos"],
                ["Código Defesa Consumidor", "Vender conta hackeada é propaganda enganosa.", "Cível + criminal (estelionato)"],
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

        <h2>Nossa filosofia</h2>
        <p>
          Este guia trata o GG como uma ferramenta de aprendizado técnico. A mesma curiosidade que leva alguém a explorar a memória de jogos pode levar a carreiras em segurança, desenvolvimento de games ou engenharia de sistemas.
        </p>
        <AlertBox type="success" title="Alternativas éticas">
          Quer um jogo mais fácil sem prejudicar ninguém? Jogue no modo de dificuldade mais baixo, procure versões offline do jogo, ou use o GG apenas em modo offline onde não há impacto em outros jogadores.
        </AlertBox>
      </PageContainer>
    );
  }
  