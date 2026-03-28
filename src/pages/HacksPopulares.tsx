import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function HacksPopulares() {
  return (
    <PageContainer
      title="Hacks Populares"
      subtitle="Exemplos práticos de modificações em jogos populares — sempre em modo offline."
      difficulty="intermediario"
      timeToRead="14 min"
    >
      <AlertBox type="danger" title="Use apenas offline">
        Os exemplos a seguir são para uso educacional em jogos offline ou em contas de teste. Usar hacks em jogos online multiplayer viola os termos de serviço e pode resultar em banimento permanente.
      </AlertBox>

      <h2>Modificando velocidade de movimento</h2>
      <p>
        A velocidade do personagem é geralmente um valor Float armazenado na struct do personagem. Para encontrá-la:
      </p>
      <ol>
        <li>Mova o personagem e note a velocidade de corrida (ex: 5.0)</li>
        <li>Busque por <code>5.0</code> como Float na região Ca</li>
        <li>Pare o personagem e refine com <code>5.0</code> novamente (não mudou)</li>
        <li>Corra novamente e refine com "mudou"</li>
        <li>Repita até encontrar 1-3 resultados</li>
        <li>Modifique para 20.0 (4x mais rápido)</li>
      </ol>

      <AlertBox type="warning" title="Speed hack pode causar glitches">
        Velocidade muito alta pode causar glitches no jogo, como atravessar paredes ou travar em colisões. Comece com valores moderados (2x-3x).
      </AlertBox>

      <h2>Hack de tempo (timer)</h2>
      <p>
        Para jogos com timer contagem regressiva (ex: 60 segundos):
      </p>
      <CodeBlock
        language="lua"
        title="hack_timer.lua"
        code={`-- O timer geralmente é Float ou Dword
-- Ao iniciar com 60 segundos, busque por 60 (Float)
-- Depois de alguns segundos, o valor cai para ~55
-- Refine com 55, depois com o valor atual

-- Quando encontrar, travar em 9999:
local resultados = gg.getResults(gg.getResultsCount())
for i, v in ipairs(resultados) do
  resultados[i].value = "9999"
  resultados[i].freeze = true -- travar!
end
gg.setValues(resultados)
gg.toast("Timer travado em 9999!")
`}
      />

      <h2>Modificando quantidade de itens</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { item: "Gemas / Diamantes", tip: "Geralmente Dword ou Int64. Busque pelo valor exato e refine comprando algo pequeno." },
          { item: "Munição", tip: "Normalmente Dword ou Byte. Em jogos FPS, busque pela munição atual (ex: 30) e atire alguns tiros." },
          { item: "Energia / Stamina", tip: "Quase sempre Float. Busque por 100.0 ou o valor máximo de energia." },
          { item: "XP / Experiência", tip: "Pode ser Int64 em jogos modernos. Busque pelo XP atual e ganhe um pouco de XP." },
        ].map((item) => (
          <div key={item.item} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-semibold text-primary mb-1">🎮 {item.item}</h4>
            <p className="text-sm text-muted-foreground">{item.tip}</p>
          </div>
        ))}
      </div>

      <h2>Hack de damage (dano)</h2>
      <p>
        O dano de armas é um valor Float que fica na struct do item ou da arma equipada. Como encontrar:
      </p>
      <ol>
        <li>Verifique o dano da sua arma nas stats do jogo (ex: 150 de dano)</li>
        <li>Busque por <code>150</code> como Float</li>
        <li>Equipe uma arma diferente com dano diferente (ex: 200)</li>
        <li>Refine por <code>200</code></li>
        <li>Modifique para 9999</li>
      </ol>

      <h2>God Mode (vida infinita automática)</h2>
      <CodeBlock
        language="lua"
        title="god_mode.lua"
        code={`-- Script de God Mode com auto-heal
-- Encontra a vida e a mantém sempre no máximo

local vida_addr = nil
local vida_max_addr = nil

-- Configurações
local INTERVALO = 200 -- ms entre escritas
local VALOR_VIDA = 99999

local function ativarGodMode()
  if not vida_addr then
    gg.alert("Configure o endereço de vida primeiro!")
    return
  end
  
  gg.toast("God Mode ATIVO - Toque no ícone GG para parar")
  
  while not gg.isVisible(true) do
    gg.setValues({
      {address = vida_addr, type = gg.TYPE_FLOAT, value = VALOR_VIDA},
    })
    if vida_max_addr then
      gg.setValues({
        {address = vida_max_addr, type = gg.TYPE_FLOAT, value = VALOR_VIDA},
      })
    end
    gg.sleep(INTERVALO)
  end
  
  gg.toast("God Mode DESATIVADO")
end

-- Menu principal
local opcao = gg.choice({"Buscar endereço de vida", "Ativar God Mode", "Sair"})

if opcao == 1 then
  local val = gg.prompt({"Valor de vida atual:"}, {""}, {"number"})
  if val then
    gg.clearResults()
    gg.setRanges(gg.REGION_C_ALLOC)
    gg.searchNumber(val[1], gg.TYPE_FLOAT)
    gg.toast("Encontrados: " .. gg.getResultsCount() .. " - Refine no app")
  end
elseif opcao == 2 then
  ativarGodMode()
end
`}
      />
    </PageContainer>
  );
}
