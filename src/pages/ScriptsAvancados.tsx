import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ScriptsAvancados() {
  return (
    <PageContainer
      title="Scripts Lua — Avançado"
      subtitle="Ponteiros, dump de memória, automação avançada e técnicas de scripting profissional."
      difficulty="avancado"
      timeToRead="20 min"
    >
      <h2>Ponteiros (Pointers)</h2>
      <p>
        Em jogos mais complexos, os valores não ficam em endereços fixos — eles são acessados via <strong>ponteiros</strong>. Um ponteiro é um endereço que contém o endereço de outro dado.
      </p>
      <p>
        Para encontrar a vida do personagem, por exemplo, pode ser necessário seguir uma cadeia de ponteiros:
      </p>
      <CodeBlock
        language="lua"
        title="ponteiros.lua"
        code={`-- Lendo um ponteiro
-- Suponha que sabemos que em 0x7f000000 há um ponteiro para a struct do personagem
local base_addr = 0x7f000000

-- Ler o endereço apontado (4 bytes = Dword no modo 32-bit)
local ptr = gg.getValues({{address = base_addr, type = gg.TYPE_DWORD}})
local struct_addr = ptr[1].value

-- Agora ler a vida do personagem (offset +0x10 da struct)
local vida_addr = struct_addr + 0x10
local vida = gg.getValues({{address = vida_addr, type = gg.TYPE_FLOAT}})
print("Vida atual: " .. vida[1].value)

-- Modificar a vida
gg.setValues({{address = vida_addr, type = gg.TYPE_FLOAT, value = 9999}})
`}
      />

      <h2>Encontrando ponteiros com o GG</h2>
      <p>
        O método prático para encontrar ponteiros:
      </p>
      <ol>
        <li>Encontre o endereço do valor (ex: vida) pelo método normal de busca</li>
        <li>Anote o endereço: ex: <code>0x7f1a3c50</code></li>
        <li>Busque por esse endereço como Dword ou Qword (dependendo se é 32 ou 64-bit)</li>
        <li>Os endereços que apontam para ele são seus ponteiros</li>
        <li>Reinicie o jogo e verifique se o ponteiro ainda aponta para o valor correto</li>
      </ol>

      <h2>Dump de memória programático</h2>
      <CodeBlock
        language="lua"
        title="dump_memoria.lua"
        code={`-- Fazer dump de uma região de memória para arquivo
local inicio = 0x7f000000
local tamanho = 1024 -- 1KB

-- Ler bloco de memória
local dados = gg.getValues({{
  address = inicio,
  type = gg.TYPE_BYTE,
  size = tamanho
}})

-- Salvar em arquivo
local arquivo = io.open("/sdcard/dump.bin", "wb")
if arquivo then
  for _, v in ipairs(dados) do
    arquivo:write(string.char(v.value & 0xFF))
  end
  arquivo:close()
  gg.toast("Dump salvo em /sdcard/dump.bin")
end
`}
      />

      <h2>Loop de monitoramento contínuo</h2>
      <CodeBlock
        language="lua"
        title="monitor_vida.lua"
        code={`-- Monitorar e manter vida sempre em 9999
-- AVISO: loops pesados podem afetar performance do jogo

local endereco_vida = nil

-- Primeiro, encontrar o endereço
local function encontrarVida(valorAtual)
  gg.clearResults()
  gg.setRanges(gg.REGION_C_ALLOC)
  gg.searchNumber(tostring(valorAtual), gg.TYPE_FLOAT)
  gg.toast("Encontrados: " .. gg.getResultsCount())
end

-- Se o endereço já foi encontrado anteriormente
if endereco_vida then
  -- Loop de manutenção
  while true do
    gg.setValues({{address = endereco_vida, type = gg.TYPE_FLOAT, value = 9999}})
    gg.sleep(500) -- aguarda 500ms entre escritas
    
    -- Verificar se usuário quer parar
    if gg.isVisible(true) then break end
  end
else
  gg.alert("Execute a busca de vida primeiro!")
end
`}
      />

      <h2>Menu interativo completo</h2>
      <CodeBlock
        language="lua"
        title="menu_completo.lua"
        code={`-- Menu principal do script

local function aplicarVidaInfinita()
  gg.clearResults()
  gg.setRanges(gg.REGION_C_ALLOC)
  gg.searchNumber("100", gg.TYPE_FLOAT)
  -- ... lógica de refinamento
  gg.toast("✅ Vida infinita ativada!")
end

local function aplicarMoedasMax()
  -- ... lógica de moedas
  gg.toast("✅ Moedas maximizadas!")
end

local function desativarTudo()
  gg.clearResults()
  gg.toast("❌ Hacks desativados")
end

-- Loop do menu
while true do
  local opcao = gg.choice(
    {"💚 Vida Infinita", "💰 Moedas Max", "⚡ Velocidade x2", "❌ Desativar Tudo", "🚪 Sair"},
    nil,
    "Selecione uma opção:"
  )
  
  if not opcao then break end -- usuário fechou o menu
  
  if opcao == 1 then aplicarVidaInfinita()
  elseif opcao == 2 then aplicarMoedasMax()
  elseif opcao == 4 then desativarTudo()
  elseif opcao == 5 then break
  end
end

gg.toast("Script encerrado.")
`}
      />

      <AlertBox type="warning" title="Performance e estabilidade">
        Loops com <code>gg.sleep()</code> muito curto (menos de 100ms) podem causar travamentos. Sempre use um sleep mínimo de 100-500ms em loops contínuos e monitore o uso de CPU.
      </AlertBox>

      <h2>Trabalhando com offsets de structs</h2>
      <CodeBlock
        language="lua"
        title="struct_personagem.lua"
        code={`-- Exemplo de uma struct de personagem típica em Unity:
-- offset +0x00: HP atual (float)
-- offset +0x04: HP máximo (float)
-- offset +0x08: Mana atual (float)
-- offset +0x0C: Mana máxima (float)
-- offset +0x10: Velocidade (float)
-- offset +0x14: Nivel (int)

local base = 0x7f1a3c40 -- endereço base da struct

local function lerPersonagem(baseAddr)
  local vals = gg.getValues({
    {address = baseAddr + 0x00, type = gg.TYPE_FLOAT},
    {address = baseAddr + 0x04, type = gg.TYPE_FLOAT},
    {address = baseAddr + 0x08, type = gg.TYPE_FLOAT},
    {address = baseAddr + 0x10, type = gg.TYPE_FLOAT},
    {address = baseAddr + 0x14, type = gg.TYPE_DWORD},
  })
  return {
    hp     = vals[1].value,
    hpMax  = vals[2].value,
    mana   = vals[3].value,
    speed  = vals[4].value,
    level  = vals[5].value,
  }
end

local char = lerPersonagem(base)
gg.alert(string.format("HP: %.0f/%.0f\\nMana: %.0f\\nSpeed: %.2f\\nNivel: %d",
  char.hp, char.hpMax, char.mana, char.speed, char.level))
`}
      />
    </PageContainer>
  );
}
