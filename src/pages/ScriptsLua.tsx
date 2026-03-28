import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function ScriptsLua() {
  return (
    <PageContainer
      title="Scripts Lua — Introdução"
      subtitle="Aprenda a automatizar modificações com a linguagem de scripting integrada ao Game Guardian."
      difficulty="intermediario"
      timeToRead="15 min"
    >
      <AlertBox type="info" title="Por que Lua?">
        Lua é uma linguagem leve, rápida e fácil de aprender. O GG usa Lua 5.3 com funções extras para manipular memória, exibir menus e interagir com o jogo.
      </AlertBox>

      <h2>Seu primeiro script</h2>
      <p>
        Todo script GG começa com funções básicas. Veja o exemplo mais simples possível:
      </p>
      <CodeBlock
        language="lua"
        title="hello_world.lua"
        code={`-- Meu primeiro script Game Guardian
print("Hello, GG!")
gg.alert("Script rodando!")
`}
      />

      <h2>Funções essenciais do GG</h2>
      <h3>Exibindo mensagens</h3>
      <CodeBlock
        language="lua"
        title="mensagens.lua"
        code={`-- Alerta simples (OK para fechar)
gg.alert("Operação concluída!")

-- Toast rápido (aparece e some)
gg.toast("Valor modificado!")

-- Diálogo com duas opções
local resposta = gg.choice({"Sim", "Não"}, nil, "Deseja aplicar o hack?")
if resposta == 1 then
  gg.toast("Aplicando...")
else
  gg.toast("Cancelado.")
end
`}
      />

      <h3>Busca de valores</h3>
      <CodeBlock
        language="lua"
        title="busca.lua"
        code={`-- Limpar resultados anteriores
gg.clearResults()

-- Buscar valor 100 como Dword na região Ca
gg.setRanges(gg.REGION_C_ALLOC)
gg.searchNumber("100", gg.TYPE_DWORD)

-- Aguardar a busca terminar
gg.searchNumber("100", gg.TYPE_DWORD, false, gg.SIGN_EQUAL, 0, -1)

-- Obter resultados
local resultados = gg.getResults(100) -- máximo 100 resultados
print("Encontrados: " .. #resultados)
`}
      />

      <h3>Modificando valores</h3>
      <CodeBlock
        language="lua"
        title="modificar.lua"
        code={`-- Buscar vida (100 de vida atual, tipo Float)
gg.clearResults()
gg.setRanges(gg.REGION_C_ALLOC)
gg.searchNumber("100", gg.TYPE_FLOAT)

-- Pegar todos os resultados
local resultados = gg.getResults(gg.getResultsCount())

-- Modificar todos para 9999
for i, v in ipairs(resultados) do
  resultados[i].value = "9999"
  resultados[i].freeze = false -- não travar
end

-- Aplicar as modificações
gg.setValues(resultados)
gg.toast("Vida modificada para 9999!")
`}
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
              ["gg.TYPE_DWORD", "Inteiro de 4 bytes"],
              ["gg.TYPE_FLOAT", "Float de 4 bytes"],
              ["gg.TYPE_DOUBLE", "Double de 8 bytes"],
              ["gg.TYPE_BYTE", "1 byte"],
              ["gg.TYPE_WORD", "2 bytes"],
              ["gg.TYPE_QWORD", "8 bytes"],
              ["gg.REGION_C_ALLOC", "Região Ca (C heap)"],
              ["gg.REGION_JAVA_HEAP", "Java heap (Jh)"],
              ["gg.REGION_ANONYMOUS", "Região anônima"],
              ["gg.SIGN_EQUAL", "Operador ="],
              ["gg.SIGN_NOT_EQUAL", "Operador ≠"],
              ["gg.SIGN_LESS", "Operador <"],
              ["gg.SIGN_GREATER", "Operador >"],
            ].map(([constante, sig], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-mono text-primary text-xs">{constante}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{sig}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Script completo: hack de moedas</h2>
      <CodeBlock
        language="lua"
        title="hack_moedas.lua"
        code={`-- Script de hack de moedas com menu interativo

-- Pedir valor atual de moedas ao usuário
local valorAtual = gg.prompt({"Quantas moedas você tem agora?"}, {""}, {"number"})
if not valorAtual then return end -- usuário cancelou

local moedas = tonumber(valorAtual[1])
if not moedas then
  gg.alert("Valor inválido!")
  return
end

-- Primeira busca
gg.clearResults()
gg.setRanges(gg.REGION_C_ALLOC)
gg.searchNumber(tostring(moedas), gg.TYPE_DWORD)

local count = gg.getResultsCount()
gg.toast("Encontrados: " .. count .. " resultados")

-- Pedir novo valor de moedas após gastar algumas
gg.alert("Gaste algumas moedas no jogo, depois clique OK")

local novoValor = gg.prompt({"Quantas moedas você tem agora?"}, {""}, {"number"})
if not novoValor then return end

local novasMoedas = tonumber(novoValor[1])

-- Refinar busca
gg.searchNumber(tostring(novasMoedas), gg.TYPE_DWORD)
count = gg.getResultsCount()
gg.toast("Refinado: " .. count .. " resultados")

if count > 0 and count <= 10 then
  -- Modificar todos os resultados
  local resultados = gg.getResults(count)
  for i, v in ipairs(resultados) do
    resultados[i].value = "999999"
  end
  gg.setValues(resultados)
  gg.alert("✅ Moedas modificadas para 999999!")
else
  gg.alert("Ainda muitos resultados (" .. count .. "). Continue refinando.")
end
`}
      />

      <AlertBox type="success" title="Como executar seu script">
        No GG, vá para a aba de Scripts → toque no botão + → crie um novo script → cole o código → salve. Para executar, toque no nome do script na lista.
      </AlertBox>
    </PageContainer>
  );
}
