import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function BuscaBasica() {
  return (
    <PageContainer
      title="Busca Básica de Valores"
      subtitle="Aprenda o método fundamental para encontrar qualquer valor na memória de um jogo — refinamento progressivo, valores conhecidos, valores desconhecidos e técnicas de isolamento."
      difficulty="iniciante"
      timeToRead="18 min"
    >
      <AlertBox type="info" title="O que você vai aprender">
        O método de busca por refinamento progressivo — como partir de milhares de resultados e chegar no endereço exato que controla o valor que você quer modificar. Esta é a habilidade mais fundamental do Game Guardian. Domine isso e 80% dos hacks ficam acessíveis.
      </AlertBox>

      <h2>O método de refinamento — a ideia central</h2>
      <p>
        A lógica central do Game Guardian é simples: você sabe que um valor existe na memória (ex: você tem 100 de vida), então você busca por <strong>100</strong>. Vai encontrar milhares de endereços com esse valor — porque o número 100 aparece em muitos lugares na memória de qualquer programa (constantes, strings, contadores, etc.). Então você <em>muda o valor no jogo</em> (perde vida, perde moeda, ganha XP) e busca de novo pelo novo valor. O GG procura entre os resultados anteriores apenas pelos endereços que agora contêm o novo valor — eliminando todos os outros como falsos positivos.
      </p>
      <p>
        Repete o ciclo até sobrar poucos endereços (idealmente 1 a 5), e modifica. É exatamente como o jogo de adivinhação "alto, baixo" mas em alto volume. Cada refinamento reduz drasticamente o número de candidatos.
      </p>

      <h2>Por que aparecem milhares de resultados na primeira busca</h2>
      <p>
        Para entender por que precisa refinar, é importante saber por que a busca inicial retorna tantos resultados. Quando você busca pelo número 100 na memória de um jogo, você encontra:
      </p>
      <ul>
        <li>O HP atual do personagem (o que você quer)</li>
        <li>O HP máximo (também 100, naturalmente)</li>
        <li>Constantes do código (limites, multiplicadores, valores padrão)</li>
        <li>Contadores diversos (quantidade de inimigos, frame counter)</li>
        <li>Pixels de cores (em texturas carregadas)</li>
        <li>Tamanhos de buffers, índices de arrays</li>
        <li>Configurações de áudio, gráficos, controles</li>
        <li>Coordenadas de UI, posições de elementos na tela</li>
        <li>Dados de outras entidades no jogo (NPCs, inimigos com HP=100)</li>
        <li>Cachê de strings e referências internas</li>
      </ul>
      <p>
        Em jogos modernos com 200-500 MB de RAM usados, é comum encontrar 5.000 a 50.000 endereços com o mesmo valor de 100. O refinamento é a forma de eliminar todos esses falsos positivos rapidamente.
      </p>

      <h2>Exemplo prático: modificar moedas</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          {
            n: "1",
            title: "Anote o valor inicial",
            desc: "Abra o jogo e note exatamente quantas moedas você tem. Ex: 1.250 moedas.",
            detail: "Importante: anote o número EXATO como aparece no jogo. Sem aproximações, sem arredondamentos. Se mostrar '1.2K' e na verdade são 1247, você precisa do valor real (faça uma transação para descobrir)."
          },
          {
            n: "2",
            title: "Primeira busca",
            desc: "No GG, toque em 🔍 Buscar. Digite 1250, selecione Dword (4 bytes), região Ca. Clique em Buscar.",
            detail: "Você vai encontrar centenas ou milhares de resultados. Isso é normal e esperado! Não tente entender cada um — é tudo ruído mais o endereço que você quer."
          },
          {
            n: "3",
            title: "Mude o valor no jogo",
            desc: "Volte ao jogo e gaste algumas moedas (compre algo barato). Agora você tem, digamos, 1.100 moedas.",
            detail: "O valor precisa mudar para que o refinamento funcione. Idealmente mude por uma quantidade significativa (centenas, não 1 ou 2 — pequenas variações podem ter ruído)."
          },
          {
            n: "4",
            title: "Refine a busca",
            desc: "No GG, clique em 🔍 novamente. Agora busque por 1100. O GG vai procurar apenas entre os resultados anteriores.",
            detail: "Os resultados vão cair drasticamente — talvez de 5.000 para 30, ou de 1.000 para 5. Se ainda for muito (>100), faça mais um ciclo de mudança e refinamento."
          },
          {
            n: "5",
            title: "Repita se necessário",
            desc: "Se ainda tiver muitos resultados, gaste mais moedas e refine novamente com o novo valor.",
            detail: "Geralmente 3-4 refinamentos são suficientes para isolar o endereço. Se passar de 5 refinamentos sem chegar a < 10 resultados, pode ser que o tipo de dado esteja errado (tente Float, ou XOR)."
          },
          {
            n: "6",
            title: "Modifique!",
            desc: "Quando sobrar 1-3 resultados, selecione todos, toque em Editar e coloque o valor desejado (ex: 999999).",
            detail: "Volte ao jogo e verifique se o valor mudou. Se sim, você encontrou o endereço correto! Adicione aos favoritos com um nome descritivo ('moedas_jogadorprincipal') para acesso futuro sem refazer a busca."
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
      <p>Além de buscar pelo valor exato, o GG oferece outros tipos de refinamento que são essenciais quando o valor muda mas você não sabe exatamente para quê:</p>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Tipo</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Quando usar</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Exemplo prático</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["= (igual)", "Quando você sabe o valor exato", "HP voltou para 100 após poção"],
              ["≠ (diferente)", "Quando o valor mudou mas você não sabe o novo valor", "Inimigo apareceu, alguma flag mudou"],
              ["< (menor que)", "Quando o valor diminuiu (perdeu vida, gastou moeda)", "Tomou dano: HP < 100"],
              ["> (maior que)", "Quando o valor aumentou (ganhou XP, coletou item)", "Coletou ouro: gold > 1250"],
              ["≤ (menor ou igual)", "Quando o valor diminuiu ou permaneceu igual", "Ataque pode ter falhado (não tomou dano)"],
              ["≥ (maior ou igual)", "Quando o valor aumentou ou permaneceu igual", "XP só aumenta, nunca diminui"],
              ["Não mudou", "Para filtrar valores que ficaram iguais", "Recursos que não foram tocados"],
              ["Mudou", "Para filtrar valores que mudaram de qualquer forma", "Algum contador interno mudou"],
              ["Intervalo (a;b)", "Quando o novo valor está num range conhecido", "HP entre 80 e 90 (não sei exato)"],
            ].map(([tipo, quando, exemplo], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-mono text-primary text-sm">{tipo}</td>
                <td className="px-4 py-2 border border-border text-foreground text-sm">{quando}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{exemplo}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Busca por valor desconhecido — quando você não sabe o número</h2>
      <p>
        Existem situações em que o jogo mostra "barra de vida" sem números, ou a velocidade é representada apenas visualmente, ou o valor está armazenado num formato impossível de adivinhar (ex: percentual normalizado entre 0 e 1, ou quaternion para rotação). Nesses casos, use busca por valor desconhecido:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", title: "Faça snapshot inicial", desc: "Toque em Buscar → deixe o campo de valor VAZIO → escolha o tipo (Dword ou Float) → toque no '?'. O GG salva uma cópia interna de toda a memória da região selecionada." },
          { n: "2", title: "Faça algo no jogo", desc: "Tome dano (vida vai diminuir), gaste recurso, ganhe XP — qualquer ação que mude o valor que você quer encontrar." },
          { n: "3", title: "Refine com 'diminuiu'", desc: "Volte ao GG, toque em Buscar → deixe campo vazio → selecione 'Diminuiu' (ou 'Aumentou', 'Mudou', dependendo da ação)." },
          { n: "4", title: "Faça outra ação no jogo", desc: "Cure-se (vida aumenta), ou tome mais dano, ou faça algo neutro. Diferentes tipos de ação eliminam diferentes falsos positivos." },
          { n: "5", title: "Refine novamente", desc: "Continue alternando entre 'aumentou', 'diminuiu', 'não mudou' conforme suas ações no jogo." },
          { n: "6", title: "Isole e modifique", desc: "Após 5-10 ciclos, deve sobrar 1-10 endereços. Modifique-os e veja qual afeta o valor que você queria mudar." },
        ].map((item) => (
          <div key={item.n} className="bg-card border border-border rounded-xl p-5">
            <div className="flex gap-3 items-start">
              <span className="w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
                <p className="text-sm text-foreground/80">{item.desc}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <CodeBlock
        language="text"
        title="Exemplo: encontrar HP em jogo sem barra numérica"
        code={"Cenário: jogo de luta sem mostrar HP em número.\nObjetivo: encontrar e modificar HP do personagem.\n\n1. GG → Buscar → vazio → Float → '?' → escolher 'Ca'\n   (Espera: snapshot demora 5-30s)\n   Resultado: ~3.000.000 endereços salvos no snapshot\n\n2. Ir ao jogo, tomar UM hit do oponente\n   (Vida diminui)\n\n3. GG → Buscar → vazio → 'Diminuiu'\n   Resultado: ~80.000 endereços (eliminou os que aumentaram\n             ou ficaram iguais — a maioria dos valores não\n             muda durante combate)\n\n4. Não fazer nada por 5 segundos\n\n5. GG → Buscar → vazio → 'Não mudou'\n   Resultado: ~5.000 endereços\n\n6. Tomar mais um hit\n\n7. GG → Buscar → vazio → 'Diminuiu'\n   Resultado: ~50 endereços\n\n8. Esperar 5s parado\n\n9. GG → Buscar → vazio → 'Não mudou'\n   Resultado: ~10 endereços\n\n10. Modificar todos para 999.0 (ou usar freeze)\n    → Volte ao jogo: HP no máximo, oponente não consegue\n    matar você. Encontrado!"}
      />

      <AlertBox type="success" title="Dica: valores decimais (Float)">
        Vida, stamina, velocidade — esses valores geralmente são Floats. Se buscar como Dword e não encontrar, tente Float. Ex: 100.0 de vida pode estar armazenado como Float 100.0 ou como int 100 — tente os dois. Em jogos Unity (a maioria dos jogos mobile), HP é quase sempre Float.
      </AlertBox>

      <h2>Quando o valor está em uma escala diferente</h2>
      <p>
        Às vezes o jogo mostra um valor mas o armazena com uma escala diferente. Casos comuns:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Multiplicado por 100", desc: "Vida mostra '100' mas armazena 10000 (em centésimos). Comum quando o jogo precisa de precisão decimal mas usa int. Tente buscar 10000 também." },
          { titulo: "Dividido por 100 ou 1000", desc: "Velocidade mostra '50' mas armazena 0.05 ou 0.5 (proporção). Tente Float com 0.05, 0.5, 0.005." },
          { titulo: "Em milisegundos", desc: "Tempo mostra '5 segundos' mas armazena 5000 (ms) ou 5000000 (microssegundos). Para timers e cooldowns." },
          { titulo: "Como percentual normalizado", desc: "Vida cheia armazena 1.0 e zerada armazena 0.0. Independente do número visual. Comum em barras de vida." },
          { titulo: "Em coordenadas mundiais", desc: "Posição em pixels (UI) é diferente de posição em coordenadas do mundo (3D). Para teleporte, use o sistema de coordenadas do mundo." },
          { titulo: "Encriptado com XOR", desc: "Valor mascarado com chave aleatória. GG tem busca XOR específica para isso. Veja seção Tipos de Busca." },
          { titulo: "Como Big Endian", desc: "Raríssimo em ARM/x86, mas alguns jogos portados de console usam. Se nada funcionar, considere busca em hex byte a byte." },
          { titulo: "Em ponto fixo", desc: "Engines antigas usam ponto fixo (16.16) em vez de float. Ex: 1.5 é armazenado como 0x00018000 (98304 decimal)." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Estratégias para acelerar o processo</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Use mudanças grandes, não pequenas", desc: "Mudar de 100 para 99 elimina menos falsos positivos que mudar de 100 para 50. Faça mudanças significativas — gastar muito ouro de uma vez, perder muita vida — para refinamento mais eficiente." },
          { titulo: "Combine 'aumentou' com 'diminuiu'", desc: "Em busca por valor desconhecido, alterne ações. Cure-se (aumentou) → tome dano (diminuiu) → cure-se (aumentou). Cada mudança elimina falsos positivos diferentes." },
          { titulo: "Pause o jogo durante refinamento", desc: "GG tem botão de pausar processo. Use em jogos onde valores mudam constantemente (timer, framerate counter). Pausa congela tudo durante a busca." },
          { titulo: "Use região 'Ca' primeiro, sempre", desc: "É 5-10x mais rápida que região 'A'. Só vá para 'A' se 'Ca' não encontrar nada após várias tentativas." },
          { titulo: "Comece com valores únicos", desc: "Em vez de buscar 100 (muito comum), gaste recurso até ter um número 'estranho' como 247 ou 1873. Bem menos falsos positivos." },
          { titulo: "Filtre antes de modificar", desc: "Após poucos resultados, modifique APENAS UM por vez. Se o valor no jogo não mudar, não era esse — desfaça e tente o próximo. Evita modificar coisa errada e quebrar o jogo." },
          { titulo: "Salve os endereços em favoritos imediatamente", desc: "Assim que isolar, adicione aos favoritos com nome. Endereços podem ser reusados na mesma sessão sem refazer a busca toda." },
          { titulo: "Documente o que aprende", desc: "Para um jogo específico, anote: 'HP é Float em região Ca, offset +4 do MaxHP, +8 do level'. Esse conhecimento acelera próximas sessões." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>O que fazer quando não encontra nada</h2>
      <ul>
        <li><strong>Tente outro tipo de dado</strong> — a vida pode ser Float, não Dword. Velocidade idem. Tempo pode ser Qword.</li>
        <li><strong>Tente outra região</strong> — mude de Ca para A (All). Para jogos Unity modernos com IL2CPP, tente Xa também.</li>
        <li><strong>O valor pode ser encriptado</strong> — alguns jogos usam XOR ou outros métodos. Veja a seção de Tipos de Busca para busca XOR.</li>
        <li><strong>O valor pode ser multiplicado ou dividido</strong> — às vezes 100 de vida é armazenado como 10000 (×100) ou 0.01 (÷100). Tente várias escalas.</li>
        <li><strong>Verifique se o jogo tem validação server-side</strong> — em Free Fire, PUBG Mobile, Clash Royale e outros jogos online competitivos, valores são calculados no servidor. Modificação local não tem efeito visual.</li>
        <li><strong>Use busca por valor desconhecido</strong> — quando o número não aparece visualmente, esta é a única forma.</li>
        <li><strong>Reinicie o GG</strong> — às vezes a anexação ao processo trava. Force parada e reabra.</li>
        <li><strong>Tente em outra fase/menu do jogo</strong> — alguns valores só são alocados após certos eventos (ex: HP do boss só existe quando você entra na sala dele).</li>
      </ul>

      <h2>Erros comuns de iniciantes</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { erro: "Modificar todos os resultados sem refinar", desc: "Se você tem 5.000 resultados e edita todos para 9999, vai modificar 5.000 lugares aleatórios da memória do jogo — quase certo de causar crash. Sempre refine até < 20 resultados antes de modificar." },
          { erro: "Refinar sem mudar o valor no jogo", desc: "Se você não mudou nada no jogo entre a busca inicial e o refinamento, o GG simplesmente vai retornar os mesmos resultados. Sem mudança = sem refinamento." },
          { erro: "Buscar valor estilizado em vez do real", desc: "Jogo mostra '1.5K moedas'. Você busca 1500 e não encontra. O valor real é 1547 ou 1488. Faça uma transação (compre/venda algo) para ver o número exato." },
          { erro: "Ignorar o tipo de dado", desc: "Buscar HP de 100.5 como Dword não vai encontrar — tem que ser Float. Iniciantes usam Dword para tudo e ficam frustrados quando não acha." },
          { erro: "Aplicar freeze antes de validar", desc: "Aplicar freeze em endereço errado pode fazer o jogo crashar ou ter comportamento estranho. Primeiro modifique uma vez, valide que é o endereço certo, depois ative freeze." },
          { erro: "Esquecer de remover freeze antigos", desc: "Múltiplos freezes ativos de jogos anteriores ficam consumindo recursos e podem interferir. Limpe favoritos com freeze ativo entre sessões." },
        ].map((item) => (
          <div key={item.erro} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-yellow-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.erro}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <AlertBox type="info" title="Próximo passo">
        Agora que você domina a busca básica, vá para <strong>Tipos de Busca</strong> para aprender técnicas avançadas como busca XOR para valores encriptados, busca em grupo para structs de personagem e busca hexadecimal com wildcards.
      </AlertBox>
    </PageContainer>
  );
}
