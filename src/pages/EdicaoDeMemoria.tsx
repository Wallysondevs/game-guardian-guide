import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function EdicaoDeMemoria() {
  return (
    <PageContainer
      title="Edição de Memória"
      subtitle="Como modificar valores encontrados, travar endereços e criar modificações persistentes."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Editando um valor único</h2>
      <p>
        Após encontrar o endereço correto, toque nele na lista de resultados. Um menu aparecerá com as opções:
      </p>
      <ul>
        <li><strong>Editar valor</strong> — altera o valor naquele endereço imediatamente</li>
        <li><strong>Adicionar a favoritos</strong> — salva o endereço para acesso rápido</li>
        <li><strong>Travar valor</strong> — mantém o valor constante (freeze)</li>
        <li><strong>Ver em dump</strong> — abre o visualizador de bytes ao redor desse endereço</li>
      </ul>

      <h2>Editando múltiplos valores de uma vez</h2>
      <p>
        Para editar todos os resultados ao mesmo tempo: na tela de resultados, toque em <strong>Selecionar todos</strong> (ícone de checkbox no canto), depois em <strong>Editar</strong>. Digite o novo valor e confirme.
      </p>

      <AlertBox type="warning" title="Cuidado ao editar múltiplos endereços">
        Editar muitos endereços de uma vez pode travar o jogo se algum deles for crítico ao sistema. Se o jogo travar, são os endereços errados — você ainda não isolou o correto. Continue refinando.
      </AlertBox>

      <h2>Travando valores (Freeze)</h2>
      <p>
        O "freeze" trava um endereço no valor atual, impedindo que o jogo o modifique. Isso é útil para:
      </p>
      <ul>
        <li>Manter a vida sempre em 9999</li>
        <li>Impedir que munição seja consumida</li>
        <li>Manter o timer de uma fase sempre em zero</li>
      </ul>
      <p>
        Para travar: nos favoritos, ao lado de cada endereço há um <strong>ícone de cadeado 🔒</strong>. Ative para travar, desative para liberar.
      </p>
      <p>
        O GG reescreve o valor travado em intervalos regulares (configurável em Configurações → Intervalo de atualização). Valores mais curtos (ex: 100ms) tornam o travamento mais efetivo mas consomem mais bateria.
      </p>

      <h2>O editor hexadecimal</h2>
      <p>
        O <strong>Dump de memória</strong> mostra os bytes brutos ao redor de um endereço. É como abrir um editor hex profissional. Você pode:
      </p>
      <ul>
        <li>Ver os bytes antes e depois do valor encontrado</li>
        <li>Editar qualquer byte individualmente</li>
        <li>Identificar estruturas de dados (structs)</li>
        <li>Navegar pela memória do jogo</li>
      </ul>

      <CodeBlock
        language="text"
        title="Exemplo de dump de memória"
        code={`Endereço   | Hex                              | ASCII
-----------+----------------------------------+--------
0x7f1a2000 | 64 00 00 00  C8 00 00 00  01 00 | d.......
0x7f1a2008 | 00 00  00 00 80 3F  00 00 C0 3F | .....?.?
0x7f1a2010 | 00 00 00 40  00 00 00 00  00 00 | ...@....

// 0x7f1a2000: Dword 100 (0x64) — pode ser HP
// 0x7f1a2004: Dword 200 (0xC8) — pode ser HP Máximo
// 0x7f1a2008: int 1
// 0x7f1a200C: Float 1.0 (0x3F800000)`}
      />

      <h2>Encontrando endereços relacionados</h2>
      <p>
        Uma técnica poderosa: quando você encontra um endereço (ex: vida atual), <strong>endereços próximos costumam ser relacionados</strong>. Abra o dump e inspecione os bytes ao redor. Você provavelmente encontrará:
      </p>
      <ul>
        <li>Vida máxima logo após a vida atual</li>
        <li>Mana ao lado de vida</li>
        <li>Level e XP juntos</li>
        <li>Posição X, Y, Z em sequência</li>
      </ul>

      <h2>Salvando endereços para próximas sessões</h2>
      <AlertBox type="warning" title="Endereços mudam a cada sessão">
        Os endereços de memória mudam toda vez que o jogo é reiniciado. Isso acontece por causa do ASLR (Address Space Layout Randomization). Não adianta anotar um endereço e usar na próxima sessão — você precisará buscar novamente.
      </AlertBox>
      <p>
        A solução para uso repetido é criar um <strong>Script Lua</strong> que automatiza a busca e modificação. Veja a seção de Scripts Lua.
      </p>
    </PageContainer>
  );
}
