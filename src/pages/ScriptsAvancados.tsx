import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ScriptsAvancados() {
  return (
    <PageContainer
      title="Scripts Lua — Avançado"
      subtitle="Ponteiros, dump de memória, automação avançada, manipulação de structs e técnicas profissionais de scripting para o Game Guardian."
      difficulty="avancado"
      timeToRead="32 min"
    >
      <AlertBox type="info" title="Pré-requisitos">
          Ler "O que é" e "Instalação"; device com root ou Virtual Space.
        </AlertBox>
        <h2>Glossário rápido</h2>
        <ul>
          <li>
            <strong>{"Lua API"}</strong> {' — '} {"linguagem de script integrada ao GG."}
          </li>
        <li>
            <strong>{"gg.searchNumber"}</strong> {' — '} {"busca programática."}
          </li>
        <li>
            <strong>{"gg.getResults"}</strong> {' — '} {"recupera resultados em tabela Lua."}
          </li>
        <li>
            <strong>{"gg.editAll"}</strong> {' — '} {"edita lote de endereços."}
          </li>
        <li>
            <strong>{"Menu"}</strong> {' — '} {"gg.choice() cria menu interativo."}
          </li>
        </ul>
        <AlertBox type="info" title="Pré-requisito">
        Esta seção assume que você já leu <strong>Scripts Lua — Introdução</strong> e está confortável com sintaxe básica, busca, modificação e menus. Aqui mergulhamos em técnicas que diferenciam scripts amadores de scripts profissionais — os mesmos padrões que você vê em scripts populares na comunidade GG.
      </AlertBox>

      <h2>Ponteiros (Pointers) — o coração da automação avançada</h2>
      <p>
        Em jogos mais complexos, os valores não ficam em endereços fixos — eles são acessados via <strong>ponteiros</strong>. Um ponteiro é simplesmente um endereço que contém o endereço de outro dado. Entender ponteiros é o que separa scripts que funcionam apenas em uma sessão de scripts que funcionam consistentemente em todas as sessões.
      </p>
      <p>
        Para encontrar a vida do personagem, por exemplo, pode ser necessário seguir uma cadeia de ponteiros. O endereço fixo no executável aponta para a struct GameState, que tem um ponteiro para PlayerCharacter, que tem um campo HP em offset 0x10:
      </p>
      <CodeBlock
        language="lua"
        title="ponteiros.lua — leitura e modificação via ponteiros"
        code={"-- LEITURA DE PONTEIRO BÁSICA\n-- Suponha que sabemos que em 0x7f000000 há um ponteiro para a struct do personagem\nlocal base_addr = 0x7f000000\n\n-- Em apps 32-bit, ponteiro = Dword (4 bytes)\n-- Em apps 64-bit (a maioria hoje), ponteiro = Qword (8 bytes)\n-- gg.getTargetInfo().x64 retorna true em 64-bit\n\nlocal info = gg.getTargetInfo()\nlocal ptrType = info.x64 and gg.TYPE_QWORD or gg.TYPE_DWORD\n\n-- Ler o endereço apontado\nlocal ptr = gg.getValues({{address = base_addr, type = ptrType}})\nlocal struct_addr = ptr[1].value\n\nprint(string.format(\"Struct está em: 0x%X\", struct_addr))\n\n-- Validar — se o valor for 0 ou muito pequeno, ponteiro inválido\nif struct_addr < 0x10000 then\n  gg.alert(\"Ponteiro inválido — jogo pode estar em estado errado\")\n  return\nend\n\n-- Agora ler a vida do personagem (offset +0x10 da struct)\nlocal vida_addr = struct_addr + 0x10\nlocal vida = gg.getValues({{address = vida_addr, type = gg.TYPE_FLOAT}})\nprint(\"Vida atual: \" .. vida[1].value)\n\n-- Modificar a vida\ngg.setValues({{address = vida_addr, type = gg.TYPE_FLOAT, value = 9999}})\ngg.toast(\"Vida modificada!\")\n\n-- CADEIA DE PONTEIROS (multi-level)\n-- Função genérica para seguir cadeia de ponteiros\nlocal function followPointerChain(baseAddr, offsets, finalType)\n  local info = gg.getTargetInfo()\n  local ptrType = info.x64 and gg.TYPE_QWORD or gg.TYPE_DWORD\n  local current = baseAddr\n  \n  -- Seguir cada nível da cadeia\n  for i, offset in ipairs(offsets) do\n    if i < #offsets then\n      -- Não é o último — ler como ponteiro e adicionar offset\n      local result = gg.getValues({{address = current, type = ptrType}})\n      if not result[1] or result[1].value == 0 then\n        return nil  -- ponteiro nulo, abortar\n      end\n      current = result[1].value + offset\n    else\n      -- Último offset — ler como o tipo final\n      current = current + offset\n      local result = gg.getValues({{address = current, type = finalType}})\n      return current, result[1].value\n    end\n  end\nend\n\n-- Uso: ler HP via cadeia 0x12345678 → +0x40 → +0x10\nlocal addr, hp = followPointerChain(0x12345678, {0x40, 0x10}, gg.TYPE_FLOAT)\nprint(string.format(\"HP em 0x%X = %f\", addr, hp))"}
      />

      <h2>Encontrando ponteiros com o GG (workflow completo)</h2>
      <p>
        O método prático para encontrar ponteiros estáveis combina busca manual no GG com automação via script:
      </p>
      <ol>
        <li><strong>Encontre o endereço dinâmico</strong>: localize o valor (ex: HP) pelo método normal de busca. Anote: <code>0x7f1a3c50</code>.</li>
        <li><strong>Verifique que é dinâmico</strong>: feche e reabra o jogo, refaça a busca. Se o endereço mudou, é dinâmico — você precisa de ponteiro.</li>
        <li><strong>Procure quem aponta</strong>: agora busque por esse endereço como Dword (32-bit) ou Qword (64-bit). Os endereços resultantes são candidatos a ponteiros.</li>
        <li><strong>Filtre ponteiros estáticos</strong>: ponteiros válidos geralmente estão em regiões Cb (BSS), Cd (data) ou Xa (código). Endereços em Ca também podem servir mas são menos estáveis.</li>
        <li><strong>Reinicie o jogo e valide</strong>: feche e reabra. Para cada candidato, leia o valor apontado e verifique se ainda contém o endereço correto da nova alocação.</li>
        <li><strong>Salve no script</strong>: hardcode o ponteiro válido como constante e use a função <code>followPointerChain</code> acima para sempre ler o HP atual sem refazer busca.</li>
      </ol>

      <h2>Dump de memória programático</h2>
      <p>
        Dump de memória permite salvar uma região inteira em arquivo para análise externa (com hex editor, IDA, Ghidra). Útil para engenharia reversa de structs complexas:
      </p>
      <CodeBlock
        language="lua"
        title="dump_memoria.lua"
        code={"-- Fazer dump de uma região de memória para arquivo\nlocal inicio = 0x7f000000\nlocal tamanho = 1024  -- 1KB\n\n-- Ler bloco de memória byte a byte\nlocal pedidos = {}\nfor i = 0, tamanho - 1 do\n  pedidos[#pedidos + 1] = {address = inicio + i, type = gg.TYPE_BYTE}\nend\n\n-- Ler em lote (mais rápido que um por vez)\nlocal dados = gg.getValues(pedidos)\n\n-- Salvar em arquivo binário\nlocal arquivo = io.open(\"/sdcard/dump.bin\", \"wb\")\nif arquivo then\n  for _, v in ipairs(dados) do\n    arquivo:write(string.char(v.value & 0xFF))\n  end\n  arquivo:close()\n  gg.toast(\"Dump salvo em /sdcard/dump.bin (\" .. tamanho .. \" bytes)\")\nend\n\n-- DUMP COM HEXDUMP FORMATADO\nlocal function hexdump(addr, size)\n  local out = io.open(\"/sdcard/dump.txt\", \"w\")\n  local pedidos = {}\n  for i = 0, size - 1 do\n    pedidos[#pedidos + 1] = {address = addr + i, type = gg.TYPE_BYTE}\n  end\n  local data = gg.getValues(pedidos)\n  \n  for offset = 0, size - 1, 16 do\n    -- Coluna de endereço\n    out:write(string.format(\"%08X  \", addr + offset))\n    \n    -- Coluna de bytes em hex\n    local ascii = \"\"\n    for j = 0, 15 do\n      local idx = offset + j + 1\n      if data[idx] then\n        local b = data[idx].value & 0xFF\n        out:write(string.format(\"%02X \", b))\n        if b >= 32 and b < 127 then\n          ascii = ascii .. string.char(b)\n        else\n          ascii = ascii .. \".\"\n        end\n      else\n        out:write(\"   \")\n        ascii = ascii .. \" \"\n      end\n    end\n    out:write(\" |\" .. ascii .. \"|\\n\")\n  end\n  out:close()\nend\n\nhexdump(0x7f000000, 256)\ngg.toast(\"Hexdump salvo!\")"}
      />

      <h2>Loop de monitoramento contínuo</h2>
      <p>
        Loops de monitoramento permitem manter valores ativos de forma personalizada — alternativa programática ao freeze padrão. Útil quando você precisa de lógica condicional (ex: só recuperar HP quando estiver baixo, não sempre):
      </p>
      <CodeBlock
        language="lua"
        title="monitor_vida.lua — loop com lógica condicional"
        code={"-- Monitorar HP — recuperar apenas quando ficar baixo\n-- AVISO: loops pesados podem afetar performance do jogo\n\nlocal endereco_vida = 0xABCD1234  -- substitua pelo endereço real\nlocal hp_minimo = 100             -- abaixo disso, recuperar\nlocal hp_alvo = 9999              -- recuperar para esse valor\n\n-- Loop principal\nlocal contador = 0\nlocal max_iteracoes = 10000  -- segurança contra loop infinito\n\nwhile contador < max_iteracoes do\n  -- Ler HP atual\n  local result = gg.getValues({{address = endereco_vida, type = gg.TYPE_FLOAT}})\n  local hp = result[1].value\n  \n  -- Se HP baixo, recuperar\n  if hp < hp_minimo then\n    gg.setValues({{\n      address = endereco_vida,\n      type = gg.TYPE_FLOAT,\n      value = hp_alvo\n    }})\n    gg.toast(\"⚕️ Curado de \" .. hp .. \" para \" .. hp_alvo)\n  end\n  \n  -- Aguardar 500ms entre verificações\n  gg.sleep(500)\n  \n  -- Verificar se usuário quer parar (clicar no ícone GG mostra janela)\n  if gg.isVisible(true) then\n    gg.setVisible(false)\n    local opcao = gg.choice({\"Continuar\", \"Parar\"}, nil, \"Monitor ativo. Parar?\")\n    if opcao == 2 then break end\n  end\n  \n  contador = contador + 1\nend\n\ngg.toast(\"Monitor encerrado após \" .. contador .. \" verificações\")"}
      />

      <h2>Menu interativo completo (template profissional)</h2>
      <CodeBlock
        language="lua"
        title="menu_completo.lua — template para hacks múltiplos"
        code={"-- =====================================\n-- HACK MULTI-FUNÇÕES — Template profissional\n-- Versão 2.0 — modular e escalável\n-- =====================================\n\n-- Estado global do script\nlocal estado = {\n  vida_ativa = false,\n  moedas_ativa = false,\n  velocidade_ativa = false,\n  endereco_vida = nil,\n  endereco_moedas = nil,\n  endereco_velocidade = nil,\n}\n\n-- =====================================\n-- FUNÇÕES DE HACK\n-- =====================================\nlocal function aplicarVidaInfinita()\n  if estado.vida_ativa then\n    gg.toast(\"Vida infinita já está ativa!\")\n    return\n  end\n  \n  gg.clearResults()\n  gg.setRanges(gg.REGION_C_ALLOC)\n  \n  -- Pedir HP atual ao usuário\n  local input = gg.prompt({\"Quantos HP você tem?\"}, {\"\"}, {\"number\"})\n  if not input then return end\n  local hp = tonumber(input[1])\n  \n  -- Buscar como Float (Unity padrão)\n  gg.searchNumber(tostring(hp), gg.TYPE_FLOAT)\n  if gg.getResultsCount() == 0 then\n    gg.searchNumber(tostring(hp), gg.TYPE_DWORD)\n  end\n  \n  if gg.getResultsCount() == 0 then\n    gg.alert(\"❌ HP não encontrado\")\n    return\n  end\n  \n  gg.alert(\"Sofra dano e clique OK para refinar\")\n  local input2 = gg.prompt({\"HP atual:\"}, {\"\"}, {\"number\"})\n  if not input2 then return end\n  gg.searchNumber(input2[1], gg.TYPE_FLOAT)\n  \n  if gg.getResultsCount() <= 10 then\n    local res = gg.getResults(gg.getResultsCount())\n    for i = 1, #res do\n      res[i].value = \"9999\"\n      res[i].freeze = true\n    end\n    gg.addListItems(res)\n    estado.vida_ativa = true\n    gg.toast(\"✅ Vida infinita ativada!\")\n  else\n    gg.alert(\"Refinamento insuficiente. \" .. gg.getResultsCount() .. \" resultados.\")\n  end\nend\n\nlocal function aplicarMoedasMax()\n  -- ... lógica similar para moedas (Dword)\n  estado.moedas_ativa = true\n  gg.toast(\"✅ Moedas maximizadas!\")\nend\n\nlocal function aplicarVelocidade()\n  -- ... lógica para velocidade (Float ~5.0)\n  estado.velocidade_ativa = true\n  gg.toast(\"✅ Velocidade x2 ativada!\")\nend\n\nlocal function desativarTudo()\n  gg.clearList()\n  gg.clearResults()\n  estado.vida_ativa = false\n  estado.moedas_ativa = false\n  estado.velocidade_ativa = false\n  gg.toast(\"❌ Todos os hacks desativados\")\nend\n\n-- =====================================\n-- LOOP DO MENU\n-- =====================================\nwhile true do\n  -- Construir labels com indicador de status\n  local labels = {\n    (estado.vida_ativa and \"💚 Vida Infinita ✅\" or \"💚 Vida Infinita\"),\n    (estado.moedas_ativa and \"💰 Moedas Max ✅\" or \"💰 Moedas Max\"),\n    (estado.velocidade_ativa and \"⚡ Velocidade x2 ✅\" or \"⚡ Velocidade x2\"),\n    \"❌ Desativar Tudo\",\n    \"🚪 Sair\"\n  }\n  \n  local opcao = gg.choice(labels, nil, \"== HACK MENU ==\\nSelecione:\")\n  \n  if not opcao then break end -- usuário fechou o menu\n  \n  if opcao == 1 then aplicarVidaInfinita()\n  elseif opcao == 2 then aplicarMoedasMax()\n  elseif opcao == 3 then aplicarVelocidade()\n  elseif opcao == 4 then desativarTudo()\n  elseif opcao == 5 then break\n  end\nend\n\ngg.toast(\"Script encerrado.\")"}
      />

      <AlertBox type="warning" title="Performance e estabilidade">
        Loops com <code>gg.sleep()</code> muito curto (menos de 100ms) podem causar travamentos. Sempre use um sleep mínimo de 100-500ms em loops contínuos e monitore o uso de CPU. Em dispositivos fracos, prefira freeze padrão a loops manuais — o freeze do GG é otimizado em código nativo.
      </AlertBox>

      <h2>Trabalhando com offsets de structs</h2>
      <p>
        Quando você descobre que um jogo armazena os atributos do personagem em uma struct contígua, pode ler/modificar todos de uma vez de forma eficiente:
      </p>
      <CodeBlock
        language="lua"
        title="struct_personagem.lua"
        code={"-- Exemplo de uma struct de personagem típica em Unity:\n-- offset +0x00: HP atual (float)\n-- offset +0x04: HP máximo (float)\n-- offset +0x08: Mana atual (float)\n-- offset +0x0C: Mana máxima (float)\n-- offset +0x10: Velocidade (float)\n-- offset +0x14: Nível (int)\n-- offset +0x18: XP atual (int)\n-- offset +0x1C: Stat Força (int)\n-- offset +0x20: Stat Destreza (int)\n-- offset +0x24: Stat Inteligência (int)\n\nlocal base = 0x7f1a3c40 -- endereço base da struct (encontrado via busca)\n\n-- LEITURA EM LOTE (todos os atributos de uma vez)\nlocal function lerPersonagem(baseAddr)\n  local vals = gg.getValues({\n    {address = baseAddr + 0x00, type = gg.TYPE_FLOAT}, -- HP\n    {address = baseAddr + 0x04, type = gg.TYPE_FLOAT}, -- MaxHP\n    {address = baseAddr + 0x08, type = gg.TYPE_FLOAT}, -- MP\n    {address = baseAddr + 0x0C, type = gg.TYPE_FLOAT}, -- MaxMP\n    {address = baseAddr + 0x10, type = gg.TYPE_FLOAT}, -- Speed\n    {address = baseAddr + 0x14, type = gg.TYPE_DWORD}, -- Level\n    {address = baseAddr + 0x18, type = gg.TYPE_DWORD}, -- XP\n    {address = baseAddr + 0x1C, type = gg.TYPE_DWORD}, -- Strength\n    {address = baseAddr + 0x20, type = gg.TYPE_DWORD}, -- Dexterity\n    {address = baseAddr + 0x24, type = gg.TYPE_DWORD}, -- Intelligence\n  })\n  return {\n    hp     = vals[1].value,\n    hpMax  = vals[2].value,\n    mp     = vals[3].value,\n    mpMax  = vals[4].value,\n    speed  = vals[5].value,\n    level  = vals[6].value,\n    xp     = vals[7].value,\n    str    = vals[8].value,\n    dex    = vals[9].value,\n    int    = vals[10].value,\n  }\nend\n\nlocal char = lerPersonagem(base)\ngg.alert(string.format(\n  \"📋 STATUS DO PERSONAGEM\\n\\n\" ..\n  \"HP: %.0f/%.0f\\n\" ..\n  \"MP: %.0f/%.0f\\n\" ..\n  \"Velocidade: %.2f\\n\" ..\n  \"Nível: %d\\n\" ..\n  \"XP: %d\\n\\n\" ..\n  \"💪 FOR: %d\\n\" ..\n  \"🏃 DES: %d\\n\" ..\n  \"🧠 INT: %d\",\n  char.hp, char.hpMax,\n  char.mp, char.mpMax,\n  char.speed,\n  char.level,\n  char.xp,\n  char.str, char.dex, char.int\n))\n\n-- ESCRITA EM LOTE (god mode)\nlocal function godMode(baseAddr)\n  gg.setValues({\n    {address = baseAddr + 0x00, type = gg.TYPE_FLOAT, value = 9999}, -- HP\n    {address = baseAddr + 0x04, type = gg.TYPE_FLOAT, value = 9999}, -- MaxHP\n    {address = baseAddr + 0x08, type = gg.TYPE_FLOAT, value = 9999}, -- MP\n    {address = baseAddr + 0x0C, type = gg.TYPE_FLOAT, value = 9999}, -- MaxMP\n    {address = baseAddr + 0x10, type = gg.TYPE_FLOAT, value = 15.0}, -- Speed 3x\n    {address = baseAddr + 0x14, type = gg.TYPE_DWORD, value = 99},   -- Level máximo\n    {address = baseAddr + 0x1C, type = gg.TYPE_DWORD, value = 999},  -- Stats máximos\n    {address = baseAddr + 0x20, type = gg.TYPE_DWORD, value = 999},\n    {address = baseAddr + 0x24, type = gg.TYPE_DWORD, value = 999},\n  })\n  gg.toast(\"⚡ GOD MODE ATIVADO\")\nend\n\ngodMode(base)"}
      />

      <h2>Padrão: Hooks de jogo (detecção de eventos)</h2>
      <p>
        Em vez de freeze constante, alguns scripts implementam "hooks" — detectam quando algo específico acontece no jogo (ex: você foi atingido) e respondem na hora. Isso é mais eficiente e mais difícil de detectar:
      </p>
      <CodeBlock
        language="lua"
        title="hook_combat.lua — auto-cure quando atingido"
        code={"-- Detectar quando o jogador é atingido e curar instantaneamente\nlocal hp_addr = 0xABCD1234\nlocal hp_max = 1000\nlocal hp_anterior = hp_max\n\nwhile true do\n  local hp_atual = gg.getValues({{address = hp_addr, type = gg.TYPE_FLOAT}})[1].value\n  \n  -- Detectou queda de HP (foi atingido)?\n  if hp_atual < hp_anterior then\n    local dano = hp_anterior - hp_atual\n    \n    -- Curar instantaneamente\n    gg.setValues({{address = hp_addr, type = gg.TYPE_FLOAT, value = hp_max}})\n    \n    -- Log opcional\n    gg.toast(string.format(\"⚕️ Bloqueado dano de %.0f\", dano))\n  end\n  \n  hp_anterior = hp_max\n  gg.sleep(50)  -- verificação 20x por segundo\nend\n\n-- Vantagens deste método sobre freeze:\n-- 1. Mais 'natural' — HP cai brevemente antes de subir\n-- 2. Não escreve constantemente no endereço (menor footprint)\n-- 3. Pode adicionar lógica: só curar se dano > X, só curar em combate, etc.\n-- 4. Anti-cheats com timestamp tendem a perder esse padrão"}
      />

      <h2>Bibliotecas e organização de código</h2>
      <p>
        Scripts grandes ficam difíceis de manter. Use o padrão de "biblioteca" para reuso de código entre scripts:
      </p>
      <CodeBlock
        language="lua"
        title="lib_gg.lua — funções utilitárias reutilizáveis"
        code={"-- Salvar como /sdcard/Notes/lib_gg.lua\n-- Em outros scripts: dofile('/sdcard/Notes/lib_gg.lua')\n\nlocal lib = {}\n\n-- Buscar valor com fallback automático de tipos\nfunction lib.smartSearch(value, prioridades)\n  prioridades = prioridades or {gg.TYPE_DWORD, gg.TYPE_FLOAT, gg.TYPE_XOR}\n  for _, tipo in ipairs(prioridades) do\n    gg.clearResults()\n    gg.searchNumber(tostring(value), tipo)\n    if gg.getResultsCount() > 0 then\n      return tipo, gg.getResultsCount()\n    end\n  end\n  return nil, 0\nend\n\n-- Refinar busca múltiplas vezes interativamente\nfunction lib.refinarInterativo(prompt_msg)\n  while gg.getResultsCount() > 5 do\n    local input = gg.prompt({prompt_msg}, {\"\"}, {\"number\"})\n    if not input then return false end\n    local v = tonumber(input[1])\n    gg.searchNumber(tostring(v), gg.TYPE_AUTO)\n    gg.toast(\"Restantes: \" .. gg.getResultsCount())\n  end\n  return true\nend\n\n-- Modificar e congelar todos os resultados atuais\nfunction lib.modificarTodosEFreezar(novo_valor)\n  local count = gg.getResultsCount()\n  if count == 0 then return false end\n  local r = gg.getResults(count)\n  for i = 1, #r do\n    r[i].value = tostring(novo_valor)\n    r[i].freeze = true\n  end\n  gg.setValues(r)\n  gg.addListItems(r)\n  return true\nend\n\n-- Detectar engine do jogo\nfunction lib.detectarEngine()\n  local info = gg.getTargetInfo()\n  -- TODO: análise de bibliotecas carregadas\n  -- Procurar libunity.so, libUE4.so, libcocos2dxlua.so, etc.\n  return \"Unity\" -- exemplo\nend\n\n-- Log com timestamp\nfunction lib.log(msg)\n  local f = io.open(\"/sdcard/gg_log.txt\", \"a\")\n  if f then\n    f:write(os.date(\"[%Y-%m-%d %H:%M:%S] \") .. msg .. \"\\n\")\n    f:close()\n  end\nend\n\nreturn lib\n\n-- USO em outro script:\n-- local lib = dofile('/sdcard/Notes/lib_gg.lua')\n-- local tipo, count = lib.smartSearch(1250)\n-- lib.modificarTodosEFreezar(999999)"}
      />

      <h2>Performance — técnicas de otimização</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "1. Use setRanges restrita", desc: "Buscar em região Ca é 10-50x mais rápido que em A. Use A só quando necessário. Combine com BSS (Cb) para variáveis globais." },
          { titulo: "2. Limite getResults", desc: "gg.getResults(100) é muito mais rápido que getResults(getResultsCount()). Pegue só o necessário para análise." },
          { titulo: "3. Lote com getValues/setValues", desc: "Uma chamada com 100 endereços é ~100x mais rápida que 100 chamadas com 1 endereço cada. Sempre lote operações em massa." },
          { titulo: "4. Sleep adequado em loops", desc: "Sleep 50-100ms é ideal para monitoramento. Sleep < 30ms causa lag. Sleep > 1s perde responsividade." },
          { titulo: "5. Variáveis locais", desc: "Em Lua, variáveis locais são MUITO mais rápidas que globais. Use 'local' sempre. Pequena diferença mas em loops apertados é significativo." },
          { titulo: "6. Cache de funções gg.", desc: "local search = gg.searchNumber. Em loops longos, evita lookup do namespace gg a cada chamada." },
          { titulo: "7. Evite string.format em loops", desc: "string.format é lento. Em loops apertados, prefira concatenação com .. ou use table.concat para junções de strings." },
          { titulo: "8. Pause GG durante loops", desc: "gg.setVisible(false) antes de loops longos. A interface do GG consome CPU para renderização." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-2 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Distribuindo seus scripts</h2>
      <p>
        Quando você criar scripts úteis, há várias formas de compartilhar:
      </p>
      <ul>
        <li><strong>Fórum oficial GG (gameguardian.net/forum)</strong>: maior comunidade. Use a seção 'Scripts' com tags do jogo. Anexe o .lua diretamente.</li>
        <li><strong>GitHub</strong>: para scripts mais elaborados, organize em repo com README, exemplos e changelog. Ótimo para colaboração.</li>
        <li><strong>Telegram/Discord</strong>: comunidades brasileiras de GG no Telegram e Discord aceitam scripts. Ideal para distribuição rápida.</li>
        <li><strong>Encripte/proteja</strong>: scripts populares costumam ser ofuscados (luac, encriptação custom) para evitar cópia. Há ferramentas online de obfuscação Lua.</li>
        <li><strong>Versionamento</strong>: use semver (v1.0.0, v1.1.0, v2.0.0) e mantenha changelog. Usuários valorizam scripts atualizados.</li>
      </ul>

      <AlertBox type="success" title="Você é agora um scripter avançado">
        Com ponteiros, structs, hooks e bibliotecas você tem todas as ferramentas dos scripts mais sofisticados da comunidade GG. Continue aprendendo lendo scripts open-source no fórum oficial — você vai se surpreender com os padrões criativos que outros desenvolveram.
      </AlertBox>

      <AlertBox type="info" title="Próximo passo">
        Agora que sabe scripting profissional, considere ler <strong>Bypass Anti-Cheat</strong> para entender como tornar seus scripts mais difíceis de detectar, ou <strong>Uso Seguro</strong> para evitar bans e proteger sua conta.
      </AlertBox>
    </PageContainer>
  );
}
