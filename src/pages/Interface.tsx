import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";
  import { CodeBlock } from "@/components/ui/CodeBlock";

  export default function Interface() {
    return (
      <PageContainer
        title="Interface do Game Guardian"
        subtitle="Conheça cada elemento da interface do GG e como usar cada função com eficiência."
        difficulty="iniciante"
        timeToRead="10 min"
      >
        <AlertBox type="info" title="Versão de referência">
          Este guia usa o GG versão 101+ como referência. Versões anteriores podem ter interface levemente diferente, mas as funcionalidades principais são as mesmas.
        </AlertBox>

        <h2>Visão geral da interface</h2>
        <p>
          O GG aparece como um ícone flutuante sobre outros aplicativos. Tocar nele abre o painel principal com quatro abas: Busca, Resultados, Favoritos e Scripts.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { icone: "🔍", nome: "Aba Busca", desc: "Onde você configura e executa buscas. Contém seletor de tipo de dado, campo de valor, seletor de região e botão de busca." },
            { icone: "📋", nome: "Aba Resultados", desc: "Lista todos os endereços encontrados. Permite selecionar, editar, freeze e adicionar endereços aos favoritos." },
            { icone: "⭐", nome: "Aba Favoritos", desc: "Endereços salvos permanentemente. Acesse rapidamente sem precisar refazer a busca. Organize por categorias." },
            { icone: "📜", nome: "Aba Scripts", desc: "Gerencie e execute scripts Lua. Carregue arquivos .lua do armazenamento ou escreva scripts inline." },
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
                ["Campo de valor", "Digite o valor a buscar. Aceita números, intervalos (min;max), expressões", "Deixe vazio para busca por valor desconhecido"],
                ["Seletor de tipo", "Escolhe Byte, Word, Dword, Qword, Float, Double, XOR, Texto, Hex, Auto", "Comece com Dword para inteiros, Float para decimais"],
                ["Seletor de região", "Ca, A, Xa, Ps, Cb, S — define qual área da RAM é varrida", "Ca é mais rápida; use A quando Ca não encontrar"],
                ["Botão Buscar (1ª vez)", "Inicia nova busca do zero", "Todos os resultados anteriores são descartados"],
                ["Botão Refinar (ícone)", "Busca apenas entre resultados existentes", "Aparece após a primeira busca — use para refinamento"],
                ["Filtro de resultados", "Limita quantos resultados são exibidos", "Máximo exibido ≠ máximo encontrado"],
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
            { acao: "Toque simples no endereço", efeito: "Abre o visualizador de memória naquele endereço. Mostra bytes ao redor para análise de estrutura.", uso: "Para analisar a struct ao redor do endereço encontrado." },
            { acao: "Toque e segure (long press)", efeito: "Abre menu de contexto: Copiar endereço, Editar, Adicionar a favoritos, Ir para endereço, Deletar.", uso: "Principal forma de interação com resultados individuais." },
            { acao: "Caixa de seleção (checkbox)", efeito: "Seleciona o endereço para operações em lote.", uso: "Selecione vários para editar ou freeze em conjunto." },
            { acao: "Ícone de cadeado (🔒)", efeito: "Ativa/desativa freeze no endereço selecionado. Valor fica constante.", uso: "Para manter HP, munição ou recursos sempre no máximo." },
            { acao: "Ícone de lápis (✏️)", efeito: "Edita o valor do endereço selecionado.", uso: "Para modificar o valor uma única vez sem freeze." },
            { acao: "Selecionar tudo", efeito: "Seleciona todos os resultados visíveis.", uso: "Para freeze ou edição em massa quando há poucos resultados." },
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
        <CodeBlock
          language="text"
          title="Como ler o visualizador de memória"
          code={"Endereço     Hex dump                     ASCII\n0xABCD1000   64 00 00 00  48 42 C8 42  d...HB.B\n0xABCD1008   50 00 00 00  00 00 00 00  P.......\n0xABCD1010   0F 00 00 00  CE EF 00 00  ........\n\n// 64 00 00 00 = 0x64 = 100 (Dword, little-endian)\n// 00 00 C8 42 = float 100.0 (IEEE 754)\n// 0F 00 00 00 = 15 (level)\n\n// Navegue com setas ou toque em endereço para pular"}
        />

        <h2>Atalhos e gestos úteis</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { gesto: "Arrastar ícone flutuante", efeito: "Move o ícone para qualquer posição da tela" },
            { gesto: "Duplo toque no ícone", efeito: "Abre/fecha o painel rapidamente" },
            { gesto: "Swipe esquerda nos resultados", efeito: "Deleta o resultado individualmente" },
            { gesto: "Pinça nos resultados", efeito: "Zoom in/out para ver mais ou menos itens" },
            { gesto: "Segurar botão Buscar", efeito: "Opções avançadas de busca (alinhamento, etc.)" },
            { gesto: "Swipe da aba de resultados", efeito: "Navega entre as abas Resultados/Favoritos/Scripts" },
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

        <AlertBox type="success" title="Personalizando o ícone flutuante">
          Em Configurações → Ícone Flutuante você pode trocar o ícone do GG por transparente, por um ícone de sistema (como configurações) ou desativar completamente e usar a notificação persistente para abrir o painel.
        </AlertBox>
      </PageContainer>
    );
  }
  