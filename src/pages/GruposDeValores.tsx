import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function GruposDeValores() {
  return (
    <PageContainer
      title="Grupos e Favoritos"
      subtitle="Organize endereços e crie listas de modificações para uso rápido."
      difficulty="intermediario"
      timeToRead="6 min"
    >
      <h2>A aba de Favoritos</h2>
      <p>
        A aba de Favoritos (⭐) é onde você salva endereços para acesso rápido. É muito útil quando você já conhece os endereços de um jogo específico e quer modificá-los rapidamente toda sessão.
      </p>

      <h2>Adicionando endereços aos favoritos</h2>
      <ol>
        <li>Faça a busca normalmente e encontre o endereço correto</li>
        <li>Na lista de resultados, toque no endereço</li>
        <li>Selecione <strong>"Adicionar a favoritos"</strong></li>
        <li>Dê um nome descritivo (ex: "Vida", "Moedas", "Ammo")</li>
        <li>Defina o tipo de dado (Dword, Float, etc.)</li>
        <li>Opcionalmente, defina um valor padrão</li>
      </ol>

      <h2>Gerenciando favoritos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { title: "Editar valor", desc: "Toque no valor ao lado do endereço para editá-lo rapidamente." },
          { title: "Travar (Freeze)", desc: "O ícone 🔒 ao lado trava o valor, impedindo o jogo de modificá-lo." },
          { title: "Renomear", desc: "Segure o favorito e selecione Renomear para organizar melhor." },
          { title: "Excluir", desc: "Deslize para o lado ou segure e selecione Excluir." },
          { title: "Exportar lista", desc: "Menu → Exportar para salvar seus favoritos em um arquivo." },
          { title: "Importar lista", desc: "Compartilhe listas de endereços entre dispositivos." },
        ].map((item) => (
          <div key={item.title} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground mb-1">{item.title}</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <AlertBox type="warning" title="Lembre-se: endereços mudam por sessão">
        Os endereços favoritos são válidos apenas durante a sessão atual. Na próxima vez que abrir o jogo, os endereços serão diferentes (ASLR). Para uso persistente, crie um Script Lua que automatiza a busca.
      </AlertBox>

      <h2>Grupos de endereços</h2>
      <p>
        Você pode organizar seus favoritos em <strong>grupos</strong> para separar diferentes jogos ou categorias de modificações.
      </p>
      <ul>
        <li>Na aba Favoritos, toque no menu (⋮) → <strong>Criar grupo</strong></li>
        <li>Dê um nome ao grupo (ex: "Free Fire - Armas", "PUBG - Vida")</li>
        <li>Arraste favoritos para dentro do grupo</li>
        <li>Ative ou desative grupos inteiros de uma vez</li>
      </ul>

      <h2>Importando listas prontas da comunidade</h2>
      <p>
        A comunidade do GG compartilha <strong>listas de favoritos</strong> (.gg ou .txt) com endereços pré-mapeados para jogos populares. Você pode importar essas listas direto no GG:
      </p>
      <ol>
        <li>Baixe o arquivo de lista (.gg) do fórum ou grupo do jogo</li>
        <li>No GG, vá para Favoritos → Menu → <strong>Importar</strong></li>
        <li>Navegue até o arquivo e confirme</li>
        <li>Abra o jogo, execute uma busca rápida para atualizar os endereços</li>
      </ol>

      <AlertBox type="info" title="Comunidades ativas de Game Guardian">
        Você pode encontrar listas prontas e tutoriais em: Reddit (r/gameguardian), fóruns como GameGuardian.net, grupos no Telegram e Discord de games específicos.
      </AlertBox>
    </PageContainer>
  );
}
