import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function Interface() {
  return (
    <PageContainer
      title="Interface do Game Guardian"
      subtitle="Conheça cada elemento da interface do GG e como usar cada função com eficiência — do ícone flutuante aos menus de contexto avançados."
      difficulty="iniciante"
      timeToRead="16 min"
    >
      <AlertBox type="info" title="Versão de referência">
        Este guia usa o GG versão 101+ como referência. Versões anteriores podem ter interface levemente diferente, mas as funcionalidades principais são as mesmas. Os screenshots mentais aqui descritos são os elementos comuns desde a versão 90 até a atual.
      </AlertBox>

      <h2>Visão geral da interface</h2>
      <p>
        O GG aparece como um <strong>ícone flutuante</strong> sobre outros aplicativos. Tocar nele abre o painel principal com várias abas. A flutuabilidade é fundamental porque permite usar o GG enquanto o jogo continua rodando — você não precisa sair, perdendo o estado da partida.
      </p>
      <p>
        O painel principal organiza-se em quatro abas principais e várias telas auxiliares acessíveis via botões e menus de contexto:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { icone: "🔍", nome: "Aba Busca", desc: "Onde você configura e executa buscas. Contém seletor de tipo de dado, campo de valor, seletor de região, opções de alinhamento, botão de busca e botão de busca por valor desconhecido." },
          { icone: "📋", nome: "Aba Resultados", desc: "Lista todos os endereços encontrados pela busca atual. Permite selecionar endereços individualmente ou em massa, editar valores, ativar freeze, copiar endereços e adicionar aos favoritos." },
          { icone: "⭐", nome: "Aba Favoritos", desc: "Endereços salvos permanentemente — sobrevivem ao fechamento do app. Acesse rapidamente sem precisar refazer a busca. Pode-se organizar com nomes descritivos e categorias." },
          { icone: "📜", nome: "Aba Scripts", desc: "Gerencia e executa scripts Lua. Carregue arquivos .lua do armazenamento, execute scripts pré-instalados ou cole código diretamente. Mostra logs de execução e erros." },
          { icone: "💾", nome: "Aba Memória", desc: "Visualizador hexadecimal da memória — vê os bytes ao redor de qualquer endereço. Permite navegação manual e edição direta byte a byte." },
          { icone: "⚙️", nome: "Configurações", desc: "Acessível via menu (três pontos). Centenas de opções — método de execução, modo furtivo, idioma, performance, exportar/importar." },
          { icone: "ℹ️", nome: "Sobre", desc: "Versão do GG, créditos, links para fórum oficial e doações ao desenvolvedor. Útil para verificar se a versão está atualizada." },
          { icone: "🔄", nome: "Lista de processos", desc: "Selecionar qual processo (jogo) anexar. Aparece logo ao abrir o GG. Mostra todos os processos em execução com suas pastas de instalação." },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-2xl">{item.icone}</span>
              <h4 className="font-bold text-foreground text-sm">{item.nome}</h4>
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Ícone flutuante — comportamento e personalização</h2>
      <p>
        O ícone flutuante é a sua porta de entrada para o GG enquanto qualquer app está aberto. Por padrão é um ícone redondo com a letra "GG", mas é altamente personalizável:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Arrastar para mover", desc: "Toque e segure o ícone, arraste para qualquer canto da tela. A posição é lembrada por jogo." },
          { titulo: "Toque simples", desc: "Abre o painel do GG. Se já estiver aberto, fecha." },
          { titulo: "Duplo toque", desc: "Atalho configurável — por padrão, abre/fecha rapidamente. Pode ser configurado para executar último script." },
          { titulo: "Toque longo", desc: "Abre menu de ações rápidas: ocultar ícone, executar script favorito, ir para favoritos." },
          { titulo: "Mudar aparência", desc: "Configurações → Ícone Flutuante → escolha entre: GG padrão, círculo transparente, ícone de configurações (camuflagem) ou imagem personalizada." },
          { titulo: "Ocultar completamente", desc: "Configurações → Ícone Flutuante → 'Ocultar'. Use a notificação persistente para acessar o GG quando precisar." },
          { titulo: "Tamanho", desc: "Configurações → Aparência → Tamanho do ícone (10-100%). Útil em tablets ou para ocultar visualmente." },
          { titulo: "Transparência", desc: "Configurações → Aparência → Opacidade. Ícone semi-transparente é menos invasivo durante o jogo." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-3">
            <h4 className="font-bold text-foreground mb-1 text-xs">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Lista de processos — escolhendo o alvo</h2>
      <p>
        Ao abrir o GG, a primeira tela é a lista de processos rodando no dispositivo. É preciso escolher qual deles você quer "anexar" para começar as buscas.
      </p>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Filtro</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">O que mostra</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Quando usar</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Apps do usuário (padrão)", "Apenas apps instalados pelo usuário, não do sistema", "Quase sempre — esconde ruído"],
              ["Todos os processos", "Todos os processos em execução, incluindo do sistema Android", "Quando o jogo aparece com nome estranho"],
              ["Apenas em primeiro plano", "Apenas o app atualmente em foco", "Identificação rápida de qual processo é o jogo"],
              ["Buscar por nome", "Filtra por substring do nome do pacote", "Quando há muitos apps abertos"],
              ["Mostrar PID", "Adiciona o número do processo (PID) ao lado do nome", "Para análise técnica ou múltiplas instâncias"],
              ["Ordenar por uso de RAM", "Lista em ordem decrescente de memória usada", "Jogos pesados são fáceis de identificar — sempre no topo"],
            ].map(([filtro, oque, quando], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{filtro}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{oque}</td>
                <td className="px-4 py-2 border border-border text-primary text-sm">{quando}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <AlertBox type="warning" title="Cuidado com processos auxiliares">
        Alguns jogos rodam em múltiplos processos. Por exemplo, "com.tencent.ig" pode ter um processo principal e um <code>:gpu</code> e um <code>:vendor</code>. Geralmente o processo principal (sem sufixo após dois pontos) é o que você quer. Para jogos como Genshin Impact que têm anti-cheat em processo separado, pode ser necessário anexar a ambos.
      </AlertBox>

      <h2>Painel de busca — detalhado</h2>
      <div className="not-prose overflow-x-auto my-6">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Elemento</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Função</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Dica</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Campo de valor", "Digite o valor a buscar. Aceita números, intervalos (min;max), expressões matemáticas, sequências hex", "Deixe vazio para busca por valor desconhecido. Use ';' para separar intervalo."],
              ["Seletor de tipo", "Escolhe Byte, Word, Dword, Qword, Float, Double, XOR, UTF-8, UTF-16, Hex, Auto", "Comece com Dword para inteiros, Float para decimais, XOR só quando padrão falhar"],
              ["Seletor de região", "Ca, A, Xa, Ps, Cb, S, Cd — define qual área da RAM é varrida", "Ca é mais rápida; use A quando Ca não encontrar"],
              ["Botão Buscar (ícone 🔍)", "Inicia nova busca do zero", "Todos os resultados anteriores são descartados"],
              ["Botão Refinar (ícone)", "Busca apenas entre resultados existentes", "Aparece após a primeira busca — use para refinamento"],
              ["Botão '?' (Desconhecido)", "Faz snapshot da memória sem comparar com valor — para refinamento sem saber o valor", "Combinado com 'mudou'/'não mudou' depois"],
              ["Filtro de resultados", "Limita quantos resultados são exibidos (não os encontrados)", "Máximo exibido ≠ máximo encontrado — apenas paginação"],
              ["Botão de pausa", "Pausa o processo do jogo durante operações longas", "Útil para evitar que valores mudem durante refinamento"],
              ["Operadores (=, ≠, <, >, ≤, ≥)", "Tipo de comparação no refinamento", "Padrão é '=' (igual) — mude conforme o caso"],
              ["Alinhamento", "Define em quais offsets de bytes a busca procura (4 = padrão, 1 = byte a byte mais lento)", "Mantenha 4 para Dword/Float — quase sempre alinhado em 4"],
              ["Limite de buffer", "Quanto buffer alocar para a busca (em MB)", "Aumente se buscas grandes der 'out of memory'"],
            ].map(([elem, func, dica], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{elem}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{func}</td>
                <td className="px-4 py-2 border border-border text-primary text-sm">{dica}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Aba de resultados — ações disponíveis</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { acao: "Toque simples no endereço", efeito: "Abre o visualizador de memória naquele endereço. Mostra bytes ao redor para análise de estrutura.", uso: "Para analisar a struct ao redor do endereço encontrado e descobrir campos relacionados (HP máximo, MP, Level, etc.)." },
          { acao: "Toque e segure (long press)", efeito: "Abre menu de contexto: Copiar endereço, Editar, Adicionar a favoritos, Ir para endereço, Deletar, Pesquisar referências.", uso: "Principal forma de interação com resultados individuais. Aceite que vai usar isso o tempo todo." },
          { acao: "Caixa de seleção (checkbox)", efeito: "Seleciona o endereço para operações em lote.", uso: "Selecione vários para editar todos de uma vez ou aplicar freeze em conjunto." },
          { acao: "Ícone de cadeado (🔒)", efeito: "Ativa/desativa freeze no endereço selecionado. Valor fica constante — GG reescreve continuamente.", uso: "Para manter HP, munição ou recursos sempre no máximo. Cuidado: freeze de muitos endereços impacta performance." },
          { acao: "Ícone de lápis (✏️)", efeito: "Edita o valor do endereço selecionado uma única vez. Sem freeze.", uso: "Para modificar o valor pontualmente sem manter constante. O jogo pode mudar de novo." },
          { acao: "Selecionar tudo", efeito: "Seleciona todos os resultados visíveis para ação em lote.", uso: "Para freeze ou edição em massa quando há poucos resultados (ex: 1-20)." },
          { acao: "Botão de incremento/decremento", efeito: "Ajusta valor para cima ou para baixo em incrementos.", uso: "Para sintonizar valores quando você não sabe exatamente qual quer (ex: aumentar velocidade gradualmente)." },
          { acao: "Botão de reordenação", efeito: "Ordena resultados por endereço crescente, valor, ou ordem original.", uso: "Endereços próximos no espaço de memória geralmente fazem parte da mesma struct — útil identificar." },
          { acao: "Filtro por valor", efeito: "Mostra apenas resultados com valor específico.", uso: "Quando há centenas de resultados, filtra para encontrar visualmente o que procura." },
          { acao: "Encontrar valores próximos", efeito: "Procura outros valores em endereços próximos (offset configurável).", uso: "Após achar HP, encontre MaxHP, MP, Level usando offsets pequenos (4, 8, 12 bytes)." },
        ].map((item) => (
          <div key={item.acao} className="bg-card border border-border rounded-xl p-4 flex gap-4">
            <div className="flex-1">
              <h4 className="font-bold text-foreground mb-1 text-sm">{item.acao}</h4>
              <p className="text-xs text-foreground/80 mb-1">{item.efeito}</p>
              <p className="text-xs text-muted-foreground"><strong>Quando usar:</strong> {item.uso}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Visualizador de memória</h2>
      <p>
        O visualizador de memória mostra os bytes brutos ao redor de qualquer endereço. É essencial para entender a estrutura de dados do jogo e descobrir campos relacionados ao valor que você encontrou.
      </p>
      <CodeBlock
        language="text"
        title="Como ler o visualizador de memória"
        code={"Endereço     Hex dump                     ASCII\n0xABCD1000   64 00 00 00  48 42 C8 42  d...HB.B\n0xABCD1008   50 00 00 00  00 00 00 00  P.......\n0xABCD1010   0F 00 00 00  CE EF 00 00  ........\n0xABCD1018   01 00 00 00  00 00 00 00  ........\n\n// Como interpretar os bytes:\n//\n// 64 00 00 00 = 0x00000064 = 100 (Dword little-endian)\n//              = poderia ser HP atual\n// 48 42 C8 42 = 0x42C84248 = float ~100.13\n//              = pode ser velocidade ou multiplicador\n// 50 00 00 00 = 80 (Dword)  = pode ser MP, dano ou contador\n// 00 00 00 00 = 0 (Dword)   = padding ou flag\n// 0F 00 00 00 = 15 (Dword)  = pode ser nível\n// CE EF 00 00 = 61390 (Dword) = pode ser XP\n// 01 00 00 00 = 1 (Dword)   = bool/flag (alive=true?)\n\n// Navegação:\n// - Setas para deslocar 16 bytes\n// - Toque em endereço para ir direto\n// - Pinça para zoom (mais bytes por linha)\n//\n// Edição direta:\n// - Toque longo em qualquer byte → editar\n// - Aceita hex (00-FF) ou ASCII"}
      />
      <p>
        Entender little-endian é importante: em ARM/x86, o byte menos significativo vem primeiro. Então o número 100 (0x64) aparece como <code>64 00 00 00</code> em vez de <code>00 00 00 64</code>. Floats seguem o padrão IEEE 754 — 100.0 é exatamente <code>00 00 C8 42</code>.
      </p>

      <h2>Atalhos e gestos úteis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { gesto: "Arrastar ícone flutuante", efeito: "Move o ícone para qualquer posição da tela" },
          { gesto: "Duplo toque no ícone", efeito: "Abre/fecha o painel rapidamente (ou último script)" },
          { gesto: "Swipe esquerda nos resultados", efeito: "Deleta o resultado individualmente" },
          { gesto: "Swipe direita nos resultados", efeito: "Adiciona aos favoritos rapidamente" },
          { gesto: "Pinça nos resultados", efeito: "Zoom in/out para ver mais ou menos itens" },
          { gesto: "Segurar botão Buscar", efeito: "Opções avançadas de busca (alinhamento, threads, etc.)" },
          { gesto: "Swipe da aba de resultados", efeito: "Navega entre as abas Resultados/Favoritos/Scripts" },
          { gesto: "Volume + GG ícone", efeito: "Em alguns casos, atalho para script específico" },
          { gesto: "Toque longo em valor numérico", efeito: "Copia o valor para clipboard" },
          { gesto: "Sacudir dispositivo", efeito: "Configurável — pode disparar abrir/fechar GG ou pausar processo" },
          { gesto: "Botão back físico no painel", efeito: "Volta uma tela (preserva resultados)" },
          { gesto: "Toque no nome do processo (topo)", efeito: "Volta para a lista de processos para trocar de jogo" },
        ].map((item) => (
          <div key={item.gesto} className="bg-card border border-border rounded-xl p-3 flex gap-3 items-start">
            <span className="text-primary text-xs font-mono font-bold shrink-0 mt-0.5">→</span>
            <div>
              <p className="font-semibold text-foreground text-xs">{item.gesto}</p>
              <p className="text-xs text-muted-foreground">{item.efeito}</p>
            </div>
          </div>
        ))}
      </div>

      <h2>Menu de configurações — visão geral</h2>
      <p>
        O menu de configurações tem dezenas de opções organizadas em seções. Aqui está a visão geral do que cada seção contém:
      </p>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { secao: "Geral", opcoes: "Idioma, tema (claro/escuro), notificação persistente, comportamento ao iniciar" },
          { secao: "Aparência", opcoes: "Tamanho do ícone, opacidade, posição inicial, animações" },
          { secao: "Método de execução", opcoes: "Root direto, Virtual Space, modo híbrido, pasta de scripts" },
          { secao: "Modo furtivo", opcoes: "Renomear processo, ocultar ícone durante jogo, anti-detecção, mascarar TracerPid" },
          { secao: "Performance", opcoes: "Threads de busca, buffer de memória, prioridade do processo, cache de resultados" },
          { secao: "Busca", opcoes: "Tipo padrão, região padrão, alinhamento padrão, máximo de resultados exibidos" },
          { secao: "Avançado", opcoes: "Exportar/importar configurações, dump de processo, hooks JNI, frequência de freeze" },
          { secao: "Notificações", opcoes: "Som ao concluir, vibração, persistente, conteúdo da notificação" },
          { secao: "Atalhos", opcoes: "Configurar duplo toque, sacudir, volume, gestos personalizados" },
          { secao: "Backup", opcoes: "Salvar/restaurar configurações, favoritos, lista de scripts" },
        ].map((item) => (
          <div key={item.secao} className="bg-card border border-border rounded-xl p-3">
            <h4 className="font-bold text-foreground text-sm">{item.secao}</h4>
            <p className="text-xs text-muted-foreground">{item.opcoes}</p>
          </div>
        ))}
      </div>

      <h2>Notificação persistente — sua segunda forma de acesso</h2>
      <p>
        O GG mantém uma notificação ativa quando está rodando. Toque nela para abrir o painel mesmo se o ícone flutuante estiver oculto. A notificação também mostra o status (anexado/desanexado, processo atual, número de favoritos com freeze ativo).
      </p>
      <p>
        Em Configurações → Notificações você pode personalizar:
      </p>
      <ul>
        <li>Mostrar nome do processo anexado</li>
        <li>Mostrar contador de freezes ativos</li>
        <li>Botão de ação rápida (executar último script, parar todos os freezes)</li>
        <li>Estilo (compacto vs expandido)</li>
        <li>Prioridade (silenciosa, default, alta)</li>
      </ul>

      <AlertBox type="success" title="Personalizando o ícone flutuante">
        Em Configurações → Ícone Flutuante você pode trocar o ícone do GG por transparente, por um ícone de sistema (como engrenagem de configurações para camuflagem) ou desativar completamente e usar a notificação persistente para abrir o painel. Para máxima discrição em jogos com anti-cheat agressivo, oculte completamente o ícone e acesse apenas pela notificação puxada para baixo.
      </AlertBox>

      <h2>Dicas avançadas de uso da interface</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Use favoritos com nomes", desc: "Não deixe os favoritos como '0xABCD1234'. Renomeie para 'HP_atual_personagem1', 'gold', 'velocidade_movimento'. Vai economizar horas no futuro." },
          { titulo: "Crie categorias de favoritos", desc: "Organize favoritos em categorias por jogo ou tipo: 'Genshin/HP', 'Genshin/Stamina', 'PUBG/recoil'. O GG suporta categorias hierárquicas." },
          { titulo: "Exporte favoritos por jogo", desc: "Após uma sessão produtiva descobrindo endereços, exporte os favoritos para .txt/.json. Compartilhe ou guarde para outros jogadores." },
          { titulo: "Use o histórico de buscas", desc: "GG guarda as últimas buscas. Toque longo no campo de valor para ver o histórico — útil para repetir buscas similares." },
          { titulo: "Configure tema escuro", desc: "Tema escuro reduz fadiga ocular em sessões longas e gasta menos bateria em telas OLED." },
          { titulo: "Aprenda atalhos", desc: "Volume + ícone, sacudir, duplo toque — atalhos economizam dezenas de toques por sessão." },
          { titulo: "Use 'Pesquisar referências'", desc: "Ao tocar longo num endereço → 'Pesquisar referências' encontra outros lugares que apontam para esse endereço. Essencial para descobrir ponteiros." },
          { titulo: "Pause antes de operações críticas", desc: "Antes de modificar HP em luta importante, pause o processo (botão pause). Evita que o jogo sobrescreva o valor que você acabou de mudar." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <AlertBox type="info" title="Próximo passo">
        Agora que você domina a interface, vá para <strong>Busca Básica de Valores</strong> para fazer seu primeiro hack real, ou pule para <strong>Grupos de Valores</strong> para entender os tipos de dados a fundo.
      </AlertBox>
    </PageContainer>
  );
}
