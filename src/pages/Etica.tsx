import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Etica() {
  return (
    <PageContainer
      title="Ética e Responsabilidade"
      subtitle="Reflexões sobre o uso responsável do Game Guardian."
      difficulty="iniciante"
      timeToRead="5 min"
    >
      <AlertBox type="warning" title="Usar com responsabilidade">
        O conhecimento sobre modificação de memória é uma ferramenta poderosa. Como qualquer ferramenta, seu impacto depende de como você a usa.
      </AlertBox>

      <h2>Quando o uso é aceitável</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { status: "✅", titulo: "Jogos offline single-player", desc: "Modificar sua própria experiência em jogos que não têm componente multiplayer não prejudica ninguém." },
          { status: "✅", titulo: "Desenvolvimento e testes", desc: "Desenvolvedores usam ferramentas de memória para testar seus próprios jogos." },
          { status: "✅", titulo: "Acessibilidade", desc: "Jogadores com dificuldades motoras podem usar o GG para tornar jogos mais acessíveis." },
          { status: "✅", titulo: "Aprendizado", desc: "Estudar como jogos armazenam dados é educacional e introduz conceitos de programação e segurança." },
          { status: "⚠️", titulo: "Jogos online PvE", desc: "Depende do jogo e dos termos. Geralmente menos problemático, mas ainda viola TOS." },
          { status: "❌", titulo: "PvP e competitivo online", desc: "Prejudica diretamente outros jogadores. Arruína a experiência de quem joga de forma justa." },
          { status: "❌", titulo: "Venda de contas/itens hackeados", desc: "Constitui fraude e pode ter consequências legais dependendo do país." },
        ].map((item) => (
          <div key={item.titulo} className="flex gap-4 bg-card border border-border rounded-xl p-4">
            <span className="text-xl shrink-0">{item.status}</span>
            <div>
              <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>O impacto no ecossistema de jogos</h2>
      <p>
        Cheating em jogos online tem consequências reais:
      </p>
      <ul>
        <li>Jogadores honestos abandonam o jogo, reduzindo a base de usuários</li>
        <li>Empresas investem mais em anti-cheat, aumentando o custo de desenvolvimento</li>
        <li>A monetização cai, levando ao fechamento de jogos ou redução de suporte</li>
        <li>A comunidade se torna tóxica e hostil</li>
      </ul>

      <h2>Aspectos legais</h2>
      <p>
        Em muitos países, o uso de cheats viola:
      </p>
      <ul>
        <li><strong>Termos de Serviço</strong> — pode resultar em ban e perda de itens comprados</li>
        <li><strong>Leis de propriedade intelectual</strong> — modificar código de software pode ser ilegal</li>
        <li><strong>Leis de fraude eletrônica</strong> — vender contas ou itens hackeados pode ser crime</li>
      </ul>

      <h2>Nossa posição</h2>
      <p>
        Este guia existe para fins educacionais — para entender como a modificação de memória funciona, aprender programação com Lua e explorar o Game Guardian como ferramenta de aprendizado técnico.
      </p>
      <p>
        Incentivamos o uso responsável: jogue offline com sua conta pessoal de testes, aprenda e experimente livremente, mas respeite outros jogadores e os termos dos jogos que você aprecia.
      </p>
    </PageContainer>
  );
}
