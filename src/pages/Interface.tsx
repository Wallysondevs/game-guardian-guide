import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Interface() {
  return (
    <PageContainer
      title="Interface do App"
      subtitle="Conheça todos os elementos da interface do Game Guardian e para que servem."
      difficulty="iniciante"
      timeToRead="8 min"
    >
      <h2>O ícone flutuante</h2>
      <p>
        O Game Guardian roda como um <strong>overlay</strong> — uma camada sobre outros aplicativos. Quando ativo, você vê um ícone flutuante (por padrão, uma cesta de basquete) que pode ser arrastado para qualquer posição da tela.
      </p>
      <ul>
        <li><strong>Toque único</strong> — abre o painel principal do GG</li>
        <li><strong>Segurar e arrastar</strong> — move o ícone pela tela</li>
        <li><strong>Arrastar para a lixeira</strong> — encerra o GG (o ícone de lixeira aparece na parte inferior)</li>
      </ul>

      <h2>Painel principal</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { icon: "🔍", name: "Buscar", desc: "Abre a tela de busca de valores na memória. É a função mais usada." },
          { icon: "📋", name: "Resultados", desc: "Lista todos os endereços encontrados na última busca." },
          { icon: "⭐", name: "Favoritos", desc: "Endereços salvos que você quer monitorar ou modificar frequentemente." },
          { icon: "📝", name: "Scripts", desc: "Lista de scripts Lua salvos. Permite executar automações." },
          { icon: "💾", name: "Memória", desc: "Dump e análise de regiões específicas da memória." },
          { icon: "⚙️", name: "Configurações", desc: "Ajustes do GG: idioma, transparência, velocidade de busca, etc." },
        ].map((item) => (
          <div key={item.name} className="flex gap-4 items-start bg-card border border-border rounded-xl p-4">
            <span className="text-2xl">{item.icon}</span>
            <div>
              <h4 className="font-bold text-foreground">{item.name}</h4>
              <p className="text-sm text-muted-foreground">{item.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Tela de busca</h2>
      <p>A tela de busca tem os seguintes campos:</p>

      <h3>Valor</h3>
      <p>
        O valor que você quer encontrar na memória. Pode ser um número exato (ex: <code>100</code>), um intervalo (ex: <code>50;150</code> — busca entre 50 e 150), ou uma expressão especial.
      </p>

      <h3>Tipo de dado</h3>
      <p>Define o formato como o valor está armazenado na memória:</p>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tamanho</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Uso</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Byte (1)", "1 byte", "Valores de 0 a 255"],
              ["Word (2)", "2 bytes", "Valores de 0 a 65535"],
              ["Dword (4)", "4 bytes", "Inteiros grandes — o mais comum"],
              ["Qword (8)", "8 bytes", "Inteiros 64-bit"],
              ["Float (4)", "4 bytes", "Decimais — vida, velocidade, etc."],
              ["Double (8)", "8 bytes", "Decimais de alta precisão"],
              ["XOR (4)", "4 bytes", "Valores encriptados por XOR"],
              ["Texto", "variável", "Strings de texto"],
              ["Auto", "auto", "Detecta automaticamente"],
            ].map(([tipo, tam, uso], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-mono text-primary text-sm">{tipo}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{tam}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h3>Região de memória</h3>
      <p>
        Define em quais regiões da memória buscar. Para jogos Unity, use <strong>Ca</strong>. Para jogos Java, use <strong>Jh</strong>. Para buscas completas, use <strong>A</strong> (mais lento).
      </p>

      <AlertBox type="info" title="Dica de performance">
        Sempre que possível, use regiões específicas (Ca, Cd, Jh) em vez de "A" (All). A busca fica até 10x mais rápida e os resultados mais precisos.
      </AlertBox>
    </PageContainer>
  );
}
