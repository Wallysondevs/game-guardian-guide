import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";
import { CodeBlock } from "@/components/ui/CodeBlock";

export default function TiposDeBusca() {
  return (
    <PageContainer
      title="Tipos de Busca"
      subtitle="Explore todos os métodos avançados de busca de memória do Game Guardian."
      difficulty="intermediario"
      timeToRead="12 min"
    >
      <h2>Busca por valor exato</h2>
      <p>
        O método mais simples — você conhece o valor e busca por ele. Já cobrimos isso na seção anterior. Serve para a maioria dos jogos simples.
      </p>

      <h2>Busca por intervalo</h2>
      <p>
        Use quando você não sabe o valor exato mas conhece o intervalo. Sintaxe: <code>min;max</code>
      </p>
      <p>
        Exemplo: se você sabe que tem entre 500 e 700 de vida, busque <code>500;700</code> como Dword.
      </p>

      <h2>Busca por valor desconhecido (Unknown Initial Value)</h2>
      <p>
        Quando você não sabe nem o valor nem o intervalo. Você busca por "qualquer valor" e depois usa operadores como "diminuiu", "aumentou" para refinar.
      </p>
      <h3>Como usar:</h3>
      <ol>
        <li>Toque em Buscar → selecione o tipo de dado → deixe o campo de valor vazio</li>
        <li>Clique em "Valor desconhecido" (Unknown)</li>
        <li>O GG salva um snapshot de toda a memória (pode demorar)</li>
        <li>Faça uma ação no jogo (perca vida, ganhe XP)</li>
        <li>Refine usando {">"}, {"<"}, ou ≠</li>
        <li>Repita até isolar o endereço</li>
      </ol>

      <AlertBox type="warning" title="Atenção: uso de memória">
        A busca por valor desconhecido usa muita RAM e armazenamento do dispositivo. Em jogos pesados, pode travar o celular. Use apenas quando necessário.
      </AlertBox>

      <h2>Busca por XOR (valores encriptados)</h2>
      <p>
        Muitos jogos "encriptam" os valores na memória usando XOR para dificultar hacks. O GG tem suporte nativo ao tipo <strong>XOR</strong>.
      </p>
      <p>
        XOR funciona assim: o valor real (ex: 100) é combinado com uma chave (ex: 12345) usando a operação XOR. O resultado (ex: 12281) é o que fica na memória. O jogo sabe a chave e recalcula o valor real na hora de usar.
      </p>

      <h3>Usando XOR no GG:</h3>
      <ol>
        <li>Na tela de busca, selecione o tipo <strong>XOR (4 bytes)</strong></li>
        <li>Digite o valor que você vê no jogo (ex: 100)</li>
        <li>O GG vai buscar automaticamente todas as combinações XOR possíveis que resultam em 100</li>
        <li>Refine normalmente após mudar o valor no jogo</li>
      </ol>

      <h2>Busca por texto (String)</h2>
      <p>
        Para encontrar nomes, mensagens ou identificadores armazenados como texto. Útil para:
      </p>
      <ul>
        <li>Encontrar o nome do personagem na memória</li>
        <li>Buscar identificadores de itens ("sword_legendary")</li>
        <li>Localizar mensagens de erro para engenharia reversa</li>
      </ul>

      <h3>Exemplo — buscar por texto:</h3>
      <CodeBlock
        language="text"
        title="Busca por string"
        code={`Tipo: Texto (UTF-8)
Valor: "diamond"
Região: A (All)

// Encontra todos os endereços onde "diamond" aparece como texto
// Útil para encontrar referências a itens premium`}
      />

      <h2>Busca por bytes em hexadecimal</h2>
      <p>
        Para usuários avançados. Permite buscar por sequências de bytes específicas — útil para encontrar instruções de código ou estruturas de dados complexas.
      </p>
      <CodeBlock
        language="text"
        title="Busca hexadecimal"
        code={`Tipo: Hex (bytes)
Valor: 64 00 00 00
// Equivale a buscar pelo Dword 100 (0x64 em little-endian)

Valor: ?? 00 00 00
// ?? = wildcard, qualquer byte
// Busca qualquer Dword que termine em 00 00 00`}
      />

      <h2>Busca em grupo (múltiplos valores)</h2>
      <p>
        Permite buscar por vários valores ao mesmo tempo. Útil quando um dado está distribuído em múltiplos endereços consecutivos (ex: posição X, Y, Z de um personagem).
      </p>
      <CodeBlock
        language="text"
        title="Busca em grupo"
        code={`Grupo de valores:
100;200;300 (tipo: Dword, offset: 4)
// Busca onde memória[addr] = 100
//          memória[addr+4] = 200
//          memória[addr+8] = 300

// Excelente para encontrar structs de personagens:
// pos_x, pos_y, pos_z armazenados em sequência`}
      />

      <AlertBox type="success" title="Busca em grupo para coordenadas">
        Em jogos 3D, a posição do personagem geralmente é uma struct {`{float x, float y, float z}`}. Use busca em grupo com tipo Float e os valores aproximados de X, Y, Z que você vê no minimapa para encontrar exatamente esse endereço.
      </AlertBox>
    </PageContainer>
  );
}
