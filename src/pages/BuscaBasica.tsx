import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function BuscaBasica() {
  return (
    <PageContainer
      title="Busca Básica de Valores"
      subtitle="Aprenda o método fundamental para encontrar qualquer valor na memória de um jogo."
      difficulty="iniciante"
      timeToRead="10 min"
    >
      <AlertBox type="info" title="O que você vai aprender">
        O método de busca por refinamento progressivo — como partir de milhares de resultados e chegar no endereço exato que controla o valor que você quer modificar.
      </AlertBox>

      <h2>O método de refinamento</h2>
      <p>
        A lógica central do Game Guardian é simples: você sabe que um valor existe na memória (ex: você tem 100 de vida), então você busca por <strong>100</strong>. Vai encontrar milhares de endereços com esse valor. Então você <em>muda o valor no jogo</em> (perde vida, perde moeda) e busca de novo pelo novo valor. Repete até sobrar poucos endereços, e modifica.
      </p>

      <h2>Exemplo prático: modificar moedas</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          {
            n: "1",
            title: "Anote o valor inicial",
            desc: "Abra o jogo e note exatamente quantas moedas você tem. Ex: 1.250 moedas.",
            detail: "Importante: anote o número EXATO como aparece no jogo."
          },
          {
            n: "2",
            title: "Primeira busca",
            desc: "No GG, toque em 🔍 Buscar. Digite 1250, selecione Dword (4 bytes), região Ca. Clique em Buscar.",
            detail: "Você vai encontrar centenas ou milhares de resultados. Isso é normal!"
          },
          {
            n: "3",
            title: "Mude o valor no jogo",
            desc: "Volte ao jogo e gaste algumas moedas (compre algo). Agora você tem, digamos, 1.100 moedas.",
            detail: "O valor precisa mudar para que o refinamento funcione."
          },
          {
            n: "4",
            title: "Refine a busca",
            desc: "No GG, clique em 🔍 novamente. Agora busque por 1100. O GG vai procurar apenas entre os resultados anteriores.",
            detail: "Os resultados vão cair drasticamente — talvez para dezenas."
          },
          {
            n: "5",
            title: "Repita se necessário",
            desc: "Se ainda tiver muitos resultados, gaste mais moedas e refine novamente com o novo valor.",
            detail: "Geralmente 3-4 refinamentos são suficientes para isolar o endereço."
          },
          {
            n: "6",
            title: "Modifique!",
            desc: "Quando sobrar 1-3 resultados, selecione todos, toque em Editar e coloque o valor desejado (ex: 999999).",
            detail: "Volte ao jogo e verifique se o valor mudou. Se sim, você encontrou o endereço correto!"
          },
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

      <h2>Tipos de refinamento</h2>
      <p>Além de buscar pelo valor exato, o GG oferece outros tipos de refinamento:</p>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Quando usar</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["= (igual)", "Quando você sabe o valor exato"],
              ["≠ (diferente)", "Quando o valor mudou mas você não sabe o novo valor"],
              ["< (menor que)", "Quando o valor diminuiu (perdeu vida, gastou moeda)"],
              ["> (maior que)", "Quando o valor aumentou (ganhou XP, coletou item)"],
              ["≤ (menor ou igual)", "Quando o valor diminuiu ou permaneceu igual"],
              ["≥ (maior ou igual)", "Quando o valor aumentou ou permaneceu igual"],
              ["Não mudou", "Para filtrar valores que ficaram iguais"],
              ["Mudou", "Para filtrar valores que mudaram de qualquer forma"],
            ].map(([tipo, quando], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-mono text-primary text-sm">{tipo}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{quando}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="success" title="Dica: valores decimais (Float)">
        Vida, stamina, velocidade — esses valores geralmente são Floats. Se buscar como Dword e não encontrar, tente Float. Ex: 100.0 de vida pode estar armazenado como Float 100.0 ou como int 100 — tente os dois.
      </AlertBox>

      <h2>O que fazer quando não encontra nada</h2>
      <ul>
        <li><strong>Tente outro tipo de dado</strong> — a vida pode ser Float, não Dword</li>
        <li><strong>Tente outra região</strong> — mude de Ca para A (All)</li>
        <li><strong>O valor pode ser encriptado</strong> — alguns jogos usam XOR ou outros métodos. Veja a seção de Tipos de Busca.</li>
        <li><strong>O valor pode ser multiplicado</strong> — às vezes 100 de vida é armazenado como 10000 (x100) ou 0.01 (1/100)</li>
      </ul>
    </PageContainer>
  );
}
