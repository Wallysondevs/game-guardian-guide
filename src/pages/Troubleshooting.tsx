import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Troubleshooting() {
  return (
    <PageContainer
      title="Troubleshooting"
      subtitle="Soluções para os problemas mais comuns ao usar o Game Guardian."
      difficulty="intermediario"
      timeToRead="10 min"
    >
      <h2>Problemas de instalação</h2>
      <div className="space-y-4 my-6 not-prose">
        {[
          {
            problema: "GG não instala — 'App não instalado'",
            causa: "Fontes desconhecidas não habilitadas, ou conflito com versão anterior",
            solucao: "Vá em Configurações → Segurança → ative 'Fontes desconhecidas'. Desinstale versões anteriores do GG antes de instalar a nova."
          },
          {
            problema: "GG não abre — fecha imediatamente",
            causa: "Conflito com Play Protect ou Google Play detectando o app",
            solucao: "Desative o Google Play Protect temporariamente: Play Store → Perfil → Play Protect → Desativar. Depois abra o GG."
          },
          {
            problema: "Permissão root negada automaticamente",
            causa: "Magisk bloqueou o app ou a permissão expirou",
            solucao: "Abra o Magisk → Superusuário → remova o GG da lista se estiver lá. Abra o GG novamente e conceda root manualmente."
          },
        ].map((item) => (
          <div key={item.problema} className="bg-card border border-border rounded-xl p-5">
            <h4 className="font-bold text-red-400 mb-2 text-sm">🔴 {item.problema}</h4>
            <p className="text-xs text-muted-foreground mb-2"><strong>Causa:</strong> {item.causa}</p>
            <p className="text-sm text-foreground/80"><strong>Solução:</strong> {item.solucao}</p>
          </div>
        ))}
      </div>

      <h2>Problemas na busca</h2>
      <div className="space-y-4 my-6 not-prose">
        {[
          {
            problema: "Nenhum resultado encontrado",
            solucao: ["Verifique o tipo de dado (tente Float, Dword, XOR)", "Mude a região de busca (tente 'A' para buscar tudo)", "O valor pode estar multiplicado (ex: 100 de vida = 10000 na memória)", "Tente buscar com intervalo (ex: 90;110 para encontrar ~100)"]
          },
          {
            problema: "Muitos resultados, refinamento não funciona",
            solucao: ["Use operadores relacionais (<, >, ≠) além de busca por valor exato", "Mude o valor no jogo de formas diferentes (ganhe e perca)", "Tente uma região mais específica (Ca ao invés de A)"]
          },
          {
            problema: "Valor modificado mas o jogo reverte imediatamente",
            solucao: ["O jogo tem validação: use a função freeze (travar) no endereço", "O endereço pode ser somente leitura — você modificou uma cópia na memória de display, não o valor real", "Tente buscar em outras regiões — o valor real pode estar em Cd ou Xa"]
          },
          {
            problema: "Jogo trava após modificar valores",
            solucao: ["Você provavelmente modificou um endereço errado (falso positivo)", "Reinicie o jogo e refine mais antes de modificar", "Tente modificar apenas 1 resultado de cada vez"]
          },
        ].map((item) => (
          <div key={item.problema} className="bg-card border border-border rounded-xl p-5">
            <h4 className="font-bold text-yellow-400 mb-3 text-sm">🟡 {item.problema}</h4>
            <ul className="space-y-1">
              {item.solucao.map((s, i) => (
                <li key={i} className="text-sm text-foreground/80 flex gap-2">
                  <span className="text-primary shrink-0">→</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <h2>Problemas com scripts</h2>
      <div className="space-y-4 my-6 not-prose">
        {[
          {
            problema: "Script retorna erro 'attempt to call nil value'",
            solucao: "Uma função que você chamou não existe ou retornou nil. Verifique o nome da função (gg.searchNumber, não gg.search_number) e se o GG está selecionado em um processo ativo."
          },
          {
            problema: "Script executa mas não modifica valores",
            solucao: "Verifique se gg.setValues() está sendo chamado com os dados corretos. Print os resultados antes de modificar para ver o que o GG encontrou."
          },
          {
            problema: "Script muito lento / trava o jogo",
            solucao: "Adicione gg.sleep(100) em loops. Evite buscas em regiões grandes ('A') dentro de loops. Limite o número de resultados com gg.getResults(100) em vez de pegar tudo."
          },
        ].map((item) => (
          <div key={item.problema} className="bg-card border border-border rounded-xl p-5">
            <h4 className="font-bold text-blue-400 mb-2 text-sm">🔵 {item.problema}</h4>
            <p className="text-sm text-foreground/80">{item.solucao}</p>
          </div>
        ))}
      </div>

      <AlertBox type="info" title="Onde buscar mais ajuda">
        Acesse o fórum oficial em <strong>gameguardian.net/forum</strong> e a comunidade no Reddit em <strong>r/gameguardian</strong>. Inclua sempre: versão do Android, versão do GG, nome do jogo e o erro exato.
      </AlertBox>
    </PageContainer>
  );
}
