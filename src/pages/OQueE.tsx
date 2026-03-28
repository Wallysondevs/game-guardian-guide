import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function OQueE() {
  return (
    <PageContainer
      title="O que é Game Guardian?"
      subtitle="Entenda como funciona essa poderosa ferramenta de modificação de memória Android."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <AlertBox type="info" title="Definição resumida">
        Game Guardian (GG) é um app Android que permite ler e modificar a memória RAM de jogos em tempo real, alterando valores como vida, dinheiro, velocidade e muito mais.
      </AlertBox>

      <h2>O que é modificação de memória?</h2>
      <p>
        Todo programa em execução armazena dados temporários na memória RAM do dispositivo. Um jogo, por exemplo, mantém na RAM valores como:
      </p>
      <ul>
        <li>A quantidade de vida atual do personagem</li>
        <li>O saldo de moedas ou gemas do jogador</li>
        <li>O multiplicador de velocidade de movimento</li>
        <li>O tempo restante de uma partida</li>
      </ul>
      <p>
        O Game Guardian consegue <strong>localizar esses endereços de memória</strong> e <strong>alterar seus valores</strong> enquanto o jogo está rodando. É como editar um save, mas em tempo real.
      </p>

      <h2>Como o GG funciona?</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-8 not-prose">
        {[
          { step: "1", title: "Injeção de processo", desc: "O GG se anexa ao processo do jogo usando permissões root ou um ambiente virtual." },
          { step: "2", title: "Varredura de memória", desc: "Você informa um valor conhecido (ex: 100 de vida) e o GG encontra todos os endereços com esse valor." },
          { step: "3", title: "Refinamento", desc: "Após mudar o valor no jogo, você refaz a busca para eliminar falsos positivos e isolar o endereço correto." },
          { step: "4", title: "Modificação", desc: "Com o endereço encontrado, você altera o valor para o que desejar (ex: 9999 de vida)." },
        ].map((item) => (
          <div key={item.step} className="bg-card border border-border rounded-xl p-5">
            <span className="text-xs font-bold text-primary uppercase tracking-wider">Passo {item.step}</span>
            <h3 className="text-base font-bold text-foreground mt-1 mb-2">{item.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Game Guardian vs outros memory hackers</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Ferramenta</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Plataforma</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Scripts</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Root necessário</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Game Guardian", "Android", "Lua", "Opcional (Virtual Space)"],
              ["Cheat Engine", "Windows/Mac", "Lua", "Não"],
              ["GameCih", "Android", "Não", "Sim"],
              ["SB Game Hacker", "Android", "Não", "Sim"],
              ["Lucky Patcher", "Android", "Não", "Opcional"],
            ].map(([tool, plat, scripts, root], i) => (
              <tr key={i}>
                <td className="px-4 py-2 border border-border font-medium text-foreground">{tool}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground">{plat}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground">{scripts}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground">{root}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Tipos de memória que o GG pode acessar</h2>
      <p>O Game Guardian pode varrer diferentes regiões da memória:</p>
      <ul>
        <li><strong>Ca (C Alloc / Heap)</strong> — memória alocada pelo jogo dinamicamente. Onde ficam a maioria dos valores de gameplay.</li>
        <li><strong>Cd (C++ Data)</strong> — segmento de dados do código nativo.</li>
        <li><strong>Xa (Executable Anon)</strong> — memória executável anônima, usada por engines como Unity.</li>
        <li><strong>Xs (Executable Stack)</strong> — pilha de execução.</li>
        <li><strong>Jh (Java Heap)</strong> — heap da JVM, para jogos escritos em Java/Kotlin.</li>
        <li><strong>A (All)</strong> — varre tudo. Mais lento, mas encontra qualquer valor.</li>
      </ul>

      <AlertBox type="success" title="Dica para iniciantes">
        Para a maioria dos jogos Unity (que são a maioria dos jogos mobile modernos), comece varrendo a região <strong>Ca</strong>. É onde os valores de gameplay ficam e a busca é muito mais rápida.
      </AlertBox>
    </PageContainer>
  );
}
