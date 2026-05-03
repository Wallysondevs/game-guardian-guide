import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ScriptsLua() {
  return (
    <PageContainer
      title="Scripts Lua — Introdução"
      subtitle="Aprenda a automatizar modificações com Lua, a linguagem de scripting integrada ao Game Guardian. Do primeiro 'Hello World' até scripts completos com menus interativos para hackear jogos."
      difficulty="intermediario"
      timeToRead="25 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Lua"}</strong> {' — '} {"linguagem leve e embutida no GG."}
          </li>
        <li>
            <strong>{".lua extension"}</strong> {' — '} {"arquivos de script."}
          </li>
        <li>
            <strong>{"gg.alert"}</strong> {' — '} {"mostra mensagem na tela."}
          </li>
        <li>
            <strong>{"gg.toast"}</strong> {' — '} {"notificação curta."}
          </li>
        <li>
            <strong>{"Loops/timer"}</strong> {' — '} {"automatize ações repetitivas."}
          </li>
        </ul>
        <AlertBox type="info" title="Por que Lua?">
        Lua é uma linguagem leve, rápida e fácil de aprender — criada na PUC-Rio, no Brasil. O GG usa Lua 5.3 com funções extras para manipular memória, exibir menus e interagir com o jogo. Em 1-2 horas de prática você pode escrever scripts profissionais que automatizam todo o trabalho manual de busca e modificação. Imagine clicar 1 botão e ter vida infinita, moedas máximas e velocidade dobrada — em vez de 5 minutos de buscas manuais por sessão.
      </AlertBox>

      <h2>Por que aprender scripting?</h2>
      <p>
        Há três grandes razões para aprender scripts no GG, mesmo se você já consegue fazer todos os hacks manualmente:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 my-6 not-prose">
        {[
          { icone: "⚡", titulo: "Velocidade", desc: "Scripts executam em segundos o que levaria 5-10 minutos manualmente. Ideal para quem joga várias horas por dia ou testa muitos jogos diferentes." },
          { icone: "🔁", titulo: "Reproduzibilidade", desc: "Salve o script uma vez, use em qualquer dispositivo. Compartilhe com amigos ou na comunidade. Um bom script é um asset reutilizável." },
          { icone: "🎯", titulo: "Precisão", desc: "Scripts não erram tipo, região ou refinamento. Sempre executam exatamente os passos programados — eliminando erros humanos comuns." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-5 text-center">
            <div className="text-4xl mb-2">{item.icone}</div>
            <h4 className="font-bold text-foreground mb-2">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Conceitos básicos de Lua (5 minutos)</h2>
      <p>
        Antes dos exemplos do GG, uma revisão ultra-rápida dos conceitos essenciais de Lua. Se você já programou em qualquer linguagem (Python, JavaScript, etc.), vai entender em 5 minutos:
      </p>
      <CodeBlock
        language="lua"
        title="lua_basico.lua — sintaxe essencial"
        code={"-- Comentários começam com dois traços\n--[[ \n  Comentário de\n  múltiplas linhas\n]]\n\n-- VARIÁVEIS (sem declaração de tipo, dinâmicas)\nlocal x = 10              -- número inteiro\nlocal pi = 3.14159        -- número decimal\nlocal nome = \"Wallyson\"   -- string\nlocal ativo = true        -- booleano\nlocal nada = nil          -- null/none\n\n-- TABELAS (arrays e dicionários, tudo é tabela em Lua)\nlocal lista = {10, 20, 30, 40}      -- array (índice começa em 1!)\nlocal dict = {hp = 100, mp = 50}    -- dicionário\nprint(lista[1])    -- imprime 10 (NÃO 0!)\nprint(dict.hp)     -- imprime 100\n\n-- IF / ELSE\nif x > 5 then\n  print(\"x é maior que 5\")\nelseif x == 5 then\n  print(\"x é exatamente 5\")\nelse\n  print(\"x é menor que 5\")\nend\n\n-- LOOP FOR\nfor i = 1, 10 do          -- de 1 até 10 (inclusive)\n  print(i)\nend\n\nfor i = 1, 100, 10 do     -- de 1 até 100 de 10 em 10\n  print(i)                -- imprime 1, 11, 21, ..., 91\nend\n\n-- LOOP FOREACH em tabela\nfor indice, valor in ipairs(lista) do\n  print(indice, valor)    -- 1 10, 2 20, 3 30, 4 40\nend\n\nfor chave, valor in pairs(dict) do\n  print(chave, valor)\nend\n\n-- WHILE\nlocal n = 0\nwhile n < 10 do\n  n = n + 1\n  if n == 5 then break end  -- sai do loop\nend\n\n-- FUNÇÕES\nlocal function somar(a, b)\n  return a + b\nend\nprint(somar(3, 4))   -- 7\n\n-- CONCATENAÇÃO de strings com ..\nlocal msg = \"Olá, \" .. nome .. \"! Você tem \" .. x .. \" pontos.\"\nprint(msg)"}
      />

      <h2>Seu primeiro script GG</h2>
      <p>
        Todo script GG começa com funções básicas. Veja o exemplo mais simples possível — um hello world que apenas mostra uma mensagem na tela:
      </p>
      <CodeBlock
        language="lua"
        title="hello_world.lua"
        code={"-- Meu primeiro script Game Guardian\nprint(\"Hello, GG!\")  -- aparece no log do GG\ngg.alert(\"Script rodando!\")  -- popup no jogo\ngg.toast(\"Funcionou! 🎉\")  -- mensagem temporária"}
      />
      <p>
        Salve como <code>hello.lua</code>, importe no GG (Scripts → +) e execute. Você verá o popup e a mensagem. Parabéns — você já é capaz de criar scripts!
      </p>

      <h2>Funções essenciais do GG</h2>
      <h3>Exibindo mensagens ao usuário</h3>
      <CodeBlock
        language="lua"
        title="mensagens.lua"
        code={"-- Alerta simples (botão OK para fechar, BLOQUEIA execução)\ngg.alert(\"Operação concluída!\")\n\n-- Toast rápido (aparece e some sozinho, NÃO bloqueia)\ngg.toast(\"Valor modificado!\")\n\n-- Toast com tempo personalizado\ngg.toast(\"Mensagem mais demorada\", 3000)  -- 3 segundos\n\n-- Diálogo com múltiplas opções\nlocal resposta = gg.choice({\"Sim\", \"Não\"}, nil, \"Deseja aplicar o hack?\")\nif resposta == 1 then  -- usuário escolheu 'Sim'\n  gg.toast(\"Aplicando...\")\nelseif resposta == 2 then\n  gg.toast(\"Cancelado.\")\nelse\n  -- resposta == nil significa que usuário fechou o diálogo (ESC)\n  gg.toast(\"Diálogo fechado\")\nend\n\n-- Prompt para entrada de texto/número\nlocal entrada = gg.prompt(\n  {\"Quantas moedas você tem?\", \"Quanto quer aumentar?\"}, -- perguntas\n  {\"\", \"\"},                                              -- valores padrão\n  {\"number\", \"number\"}                                   -- tipos\n)\nif entrada then\n  local atual = tonumber(entrada[1])\n  local aumento = tonumber(entrada[2])\n  gg.alert(\"Total final: \" .. (atual + aumento))\nend\n\n-- Tipos de prompt suportados:\n-- \"text\"     = texto livre\n-- \"number\"   = apenas números\n-- \"checkbox\" = caixa de seleção (true/false)\n-- nil        = mesmo que text"}
      />

      <h3>Busca de valores</h3>
      <CodeBlock
        language="lua"
        title="busca.lua"
        code={"-- Limpar resultados anteriores antes de nova busca\ngg.clearResults()\n\n-- Definir região de memória onde buscar\ngg.setRanges(gg.REGION_C_ALLOC)  -- só na região Ca (mais rápido)\n\n-- Você pode combinar múltiplas regiões com OR (|)\n-- gg.setRanges(gg.REGION_C_ALLOC | gg.REGION_ANONYMOUS)\n\n-- Buscar valor 100 como Dword na região definida\ngg.searchNumber(\"100\", gg.TYPE_DWORD)\n\n-- Forma completa com todos os parâmetros:\ngg.searchNumber(\n  \"100\",                  -- valor a buscar (string!)\n  gg.TYPE_DWORD,          -- tipo de dado\n  false,                  -- encriptado? (geralmente false)\n  gg.SIGN_EQUAL,          -- operador (=, !=, <, >)\n  0,                      -- min address (0 = sem limite)\n  -1                      -- max address (-1 = sem limite)\n)\n\n-- Verificar quantos resultados foram encontrados\nlocal count = gg.getResultsCount()\nprint(\"Encontrados: \" .. count)\n\nif count > 1000 then\n  gg.alert(\"Muitos resultados (\" .. count .. \"). Refine antes de continuar.\")\n  return\nend\n\n-- Obter os resultados (máximo 100 para evitar lentidão)\nlocal resultados = gg.getResults(100)\nfor i, v in ipairs(resultados) do\n  print(i, string.format(\"0x%X\", v.address), v.value, v.flags)\nend\n\n-- Refinar busca (mantém só endereços que tinham 100 e agora têm 50)\ngg.searchNumber(\"50\", gg.TYPE_DWORD)\n\n-- Busca por intervalo (50 a 150)\ngg.searchNumber(\"50~150\", gg.TYPE_DWORD)\n\n-- Busca por valor desconhecido (sem refinamento)\ngg.searchNumber(\"0~~999999\", gg.TYPE_DWORD)"}
      />

      <h3>Modificando valores</h3>
      <CodeBlock
        language="lua"
        title="modificar.lua"
        code={"-- Buscar HP do personagem (100 de vida atual, tipo Float)\ngg.clearResults()\ngg.setRanges(gg.REGION_C_ALLOC)\ngg.searchNumber(\"100\", gg.TYPE_FLOAT)\n\nlocal count = gg.getResultsCount()\nif count == 0 then\n  gg.alert(\"Nenhum resultado encontrado!\")\n  return\nend\n\n-- Pegar todos os resultados\nlocal resultados = gg.getResults(count)\n\n-- Modificar todos para 9999\nfor i, v in ipairs(resultados) do\n  resultados[i].value = \"9999\"\n  resultados[i].freeze = false  -- não travar (true para freeze)\nend\n\n-- Aplicar as modificações\ngg.setValues(resultados)\ngg.toast(\"Vida modificada para 9999!\")\n\n-- Para FREEZE, defina freeze = true e use addListItems\nfor i, v in ipairs(resultados) do\n  resultados[i].freeze = true\n  resultados[i].freezeType = gg.FREEZE_NORMAL  -- ou MAY_INCREASE / MAY_DECREASE\nend\ngg.addListItems(resultados)  -- adiciona à lista de freezes ativos\n\n-- Para REMOVER freeze:\ngg.removeListItems(resultados)\n\n-- Para LIMPAR TODOS os freezes:\ngg.clearList()"}
      />

      <h2>Constantes importantes</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Constante</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Significado</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["gg.TYPE_BYTE", "1 byte (Byte)"],
              ["gg.TYPE_WORD", "2 bytes (Word)"],
              ["gg.TYPE_DWORD", "4 bytes (Dword) — inteiro"],
              ["gg.TYPE_QWORD", "8 bytes (Qword)"],
              ["gg.TYPE_FLOAT", "4 bytes (Float)"],
              ["gg.TYPE_DOUBLE", "8 bytes (Double)"],
              ["gg.TYPE_XOR", "Dword com XOR (4 bytes)"],
              ["gg.TYPE_AUTO", "GG escolhe automaticamente (lento)"],
              ["gg.REGION_C_ALLOC", "Região Ca (C heap, mais comum)"],
              ["gg.REGION_C_BSS", "Região Cb (variáveis globais)"],
              ["gg.REGION_C_DATA", "Região Cd (dados constantes)"],
              ["gg.REGION_C_HEAP", "Região Ch"],
              ["gg.REGION_JAVA_HEAP", "Java heap (Jh)"],
              ["gg.REGION_ANONYMOUS", "Região anônima A"],
              ["gg.REGION_STACK", "Stack (S)"],
              ["gg.REGION_CODE_APP", "Código do app (Xa)"],
              ["gg.REGION_VIDEO", "Vídeo / GPU memory"],
              ["gg.REGION_OTHER", "Outras regiões"],
              ["gg.SIGN_EQUAL", "Operador = (igual)"],
              ["gg.SIGN_NOT_EQUAL", "Operador ≠ (diferente)"],
              ["gg.SIGN_LESS", "Operador <"],
              ["gg.SIGN_LESS_OR_EQUAL", "Operador ≤"],
              ["gg.SIGN_GREATER", "Operador >"],
              ["gg.SIGN_GREATER_OR_EQUAL", "Operador ≥"],
              ["gg.FREEZE_NORMAL", "Freeze padrão"],
              ["gg.FREEZE_MAY_INCREASE", "Permite valor aumentar mas não diminuir"],
              ["gg.FREEZE_MAY_DECREASE", "Permite valor diminuir mas não aumentar"],
            ].map(([constante, sig], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-mono text-primary text-xs">{constante}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{sig}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Script completo: hack de moedas com menu</h2>
      <CodeBlock
        language="lua"
        title="hack_moedas.lua — script profissional completo"
        code={"-- HACK DE MOEDAS — Script Game Guardian\n-- Versão 1.0 — uso educacional\n-- ==========================================\n\n-- Função para encontrar e modificar moedas\nlocal function hackearMoedas()\n  -- Pedir valor atual de moedas ao usuário\n  local input = gg.prompt(\n    {\"Quantas moedas você tem agora?\"},\n    {\"\"},\n    {\"number\"}\n  )\n  if not input then return end -- usuário cancelou\n\n  local moedas = tonumber(input[1])\n  if not moedas or moedas <= 0 then\n    gg.alert(\"Valor inválido!\")\n    return\n  end\n\n  -- Primeira busca\n  gg.clearResults()\n  gg.setRanges(gg.REGION_C_ALLOC)\n  gg.searchNumber(tostring(moedas), gg.TYPE_DWORD)\n\n  local count = gg.getResultsCount()\n  if count == 0 then\n    -- Tentar como Float se Dword falhar\n    gg.searchNumber(tostring(moedas), gg.TYPE_FLOAT)\n    count = gg.getResultsCount()\n    if count == 0 then\n      gg.alert(\"Moedas não encontradas. Tente XOR manualmente.\")\n      return\n    end\n  end\n\n  gg.toast(\"Encontrados: \" .. count .. \" resultados. Gaste algumas moedas e clique OK.\")\n\n  -- Pedir novo valor de moedas após gastar algumas\n  local result = gg.alert(\"Gaste algumas moedas no jogo, depois clique OK\", \"OK\", \"Cancelar\")\n  if result == 2 then return end\n\n  local input2 = gg.prompt(\n    {\"Quantas moedas você tem agora?\"},\n    {\"\"},\n    {\"number\"}\n  )\n  if not input2 then return end\n\n  local novasMoedas = tonumber(input2[1])\n\n  -- Refinar busca\n  gg.searchNumber(tostring(novasMoedas), gg.TYPE_DWORD)\n  count = gg.getResultsCount()\n  gg.toast(\"Refinado: \" .. count .. \" resultados\")\n\n  if count > 0 and count <= 20 then\n    -- Modificar todos os resultados\n    local resultados = gg.getResults(count)\n    for i, v in ipairs(resultados) do\n      resultados[i].value = \"999999\"\n    end\n    gg.setValues(resultados)\n    gg.alert(\"✅ Moedas modificadas para 999999!\")\n  elseif count > 20 then\n    gg.alert(\"Ainda muitos resultados (\" .. count .. \"). Continue refinando manualmente.\")\n  else\n    gg.alert(\"Nenhum endereço sobrou. A busca pode ter sido perdida — tente novamente.\")\n  end\nend\n\n-- MENU PRINCIPAL com loop\nlocal opcao\nrepeat\n  opcao = gg.choice(\n    {\n      \"💰 Hackear Moedas\",\n      \"🔄 Limpar resultados\",\n      \"❌ Sair\"\n    },\n    nil,\n    \"== HACK MENU ==\\nEscolha uma opção:\"\n  )\n\n  if opcao == 1 then\n    hackearMoedas()\n  elseif opcao == 2 then\n    gg.clearResults()\n    gg.toast(\"Resultados limpos\")\n  end\nuntil opcao == 3 or opcao == nil\n\ngg.toast(\"Script encerrado.\")"}
      />

      <h2>Anatomia de um bom script</h2>
      <p>
        Os scripts mais profissionais (e os mais compartilhados em comunidades) seguem padrões consistentes:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "1. Cabeçalho identificando", desc: "Nome do script, versão, autor, jogo alvo, instruções. Comentários no topo com -- são essenciais para outros usuários (e você mesmo no futuro)." },
          { titulo: "2. Funções nomeadas", desc: "Em vez de código solto, encapsule cada hack em uma função nomeada (hackearMoedas, hackearVida, etc.). Mais legível e reutilizável." },
          { titulo: "3. Validação de entrada", desc: "Sempre verifique se gg.prompt retornou nil (usuário cancelou). Verifique se tonumber funcionou. Trate casos vazios." },
          { titulo: "4. Feedback ao usuário", desc: "gg.toast em cada passo importante. gg.alert para erros. Usuário deve sempre saber o que está acontecendo." },
          { titulo: "5. Tratamento de erros", desc: "Use pcall() para chamadas que podem falhar. Verifique getResultsCount antes de getResults para evitar erros." },
          { titulo: "6. Menu principal em loop", desc: "Não force usuário a re-executar o script para fazer coisas diferentes. Menu com opção 'Sair' permite múltiplos hacks por sessão." },
          { titulo: "7. Limpeza de estado", desc: "gg.clearResults() entre buscas. gg.clearList() ao terminar para não deixar freezes pendurados." },
          { titulo: "8. Documentação inline", desc: "Comentários explicando 'porquês', não 'oquês'. Ex: '-- Buscar Float pois Unity usa Float para HP' é melhor que '-- Buscar Float'." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Funções úteis adicionais</h2>
      <CodeBlock
        language="lua"
        title="funcoes_uteis.lua"
        code={"-- Pausar o script (em milissegundos)\ngg.sleep(1000)  -- pausa 1 segundo\n\n-- Verificar se o usuário tocou no botão de pausa do GG\nif gg.isVisible(true) then\n  -- Botão GG está visível, fazer algo\nend\n\n-- Esconder/mostrar a janela do GG\ngg.setVisible(false)  -- esconde\ngg.setVisible(true)   -- mostra\n\n-- Obter informações do dispositivo/processo\nlocal info = gg.getTargetInfo()\nprint(info.name)        -- nome do pacote do jogo\nprint(info.versionName) -- versão do jogo\nprint(info.x64)         -- true se 64-bit, false se 32-bit\n\n-- Listar todos os processos rodando\nlocal procs = gg.getRangesList()\nfor i, r in ipairs(procs) do\n  print(string.format(\"0x%X-0x%X\", r.start, r['end']), r.name, r.state)\nend\n\n-- Trabalhar com arquivos\nlocal f = io.open(\"/sdcard/log.txt\", \"a\")  -- append\nif f then\n  f:write(\"Script executado em \" .. os.date() .. \"\\n\")\n  f:close()\nend\n\n-- Ler arquivo\nlocal f = io.open(\"/sdcard/config.txt\", \"r\")\nif f then\n  local conteudo = f:read(\"*all\")\n  f:close()\n  print(conteudo)\nend\n\n-- Salvar/carregar valores entre sessões (persistência)\ngg.saveVariable(\"meu_endereco\", 0xABCD1234)\nlocal addr = gg.loadVariable(\"meu_endereco\")\n\n-- Copiar texto para clipboard\ngg.copyText(\"Hello World\")\n\n-- Detectar mudanças de processo (jogo reiniciou?)\nif gg.getTargetInfo() == nil then\n  gg.alert(\"Jogo fechado. Reabrindo...\")\n  -- lógica de reconexão\nend"}
      />

      <h2>Como instalar e executar scripts</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { n: "1", title: "Salvar o script .lua", desc: "Crie/baixe o arquivo .lua e coloque em /sdcard/Download/ ou /sdcard/Notes/ (ou qualquer pasta acessível).", detail: "Você pode criar com qualquer editor de texto: bloco de notas no PC, Termux no Android, ou apps como Acode." },
          { n: "2", title: "Abrir o GG dentro do jogo", desc: "Inicie o jogo, clique no ícone flutuante do GG, vá para a aba Scripts.", detail: "Se o GG não tem aba scripts visível, atualize para versão recente do gameguardian.net." },
          { n: "3", title: "Importar o script", desc: "Toque no botão + → 'Importar' → navegue até o arquivo .lua → selecione.", detail: "Alternativamente: 'Criar novo script' → cole o código manualmente." },
          { n: "4", title: "Executar", desc: "Toque no nome do script na lista. O script começa a rodar imediatamente.", detail: "Para parar um script rodando: ícone do GG → menu → Parar Script. Ou feche o GG completamente." },
          { n: "5", title: "Salvar como favorito", desc: "Scripts importados ficam salvos no GG mesmo após reiniciar — não precisa importar de novo.", detail: "Para deletar: toque longo no nome do script → Deletar." },
        ].map((item) => (
          <div key={item.n} className="bg-card border border-border rounded-xl p-4">
            <div className="flex gap-3 items-start">
              <span className="w-7 h-7 rounded-full bg-secondary text-secondary-foreground text-xs font-bold flex items-center justify-center shrink-0">{item.n}</span>
              <div>
                <h4 className="font-bold text-foreground mb-1 text-sm">{item.title}</h4>
                <p className="text-xs text-foreground/80 mb-1">{item.desc}</p>
                <p className="text-xs text-muted-foreground italic">{item.detail}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AlertBox type="success" title="Como executar seu script">
        No GG, vá para a aba de Scripts → toque no botão + → crie um novo script → cole o código → salve. Para executar, toque no nome do script na lista. Você pode pausar a qualquer momento tocando no botão flutuante do GG.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo: Scripts Avançados">
        Você agora domina o básico de scripting GG. Vá para <strong>Scripts Avançados</strong> para aprender ponteiros, dump de memória, automação de loops complexos, integração com structs, e padrões profissionais de scripts compartilhados na comunidade.
      </AlertBox>
    </PageContainer>
  );
}
