import { PageContainer } from "@/components/layout/PageContainer";
  import { AlertBox } from "@/components/ui/AlertBox";

  export default function Referencias() {
    return (
      <PageContainer
        title="Referências e Recursos"
        subtitle="Links, ferramentas, comunidades e recursos para aprofundar seu conhecimento sobre Game Guardian."
        difficulty="iniciante"
        timeToRead="8 min"
      >
        <AlertBox type="info" title="Recursos organizados por categoria">
          Aqui você encontra os melhores recursos da comunidade GG — fóruns, ferramentas complementares, documentação e canais de conteúdo.
        </AlertBox>

        <h2>Site e downloads oficiais</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { nome: "gameguardian.net", url: "https://gameguardian.net", desc: "Site oficial. Downloads do APK, changelog, fórum de suporte e lista de scripts.", tipo: "Oficial" },
            { nome: "gameguardian.net/forum", url: "https://gameguardian.net/forum", desc: "Fórum da comunidade. Seções de scripts, suporte técnico, pedidos de hacks específicos e tutoriais.", tipo: "Oficial" },
            { nome: "gameguardian.net/docs", url: "https://gameguardian.net/docs", desc: "Documentação da API Lua do GG. Referência completa de todas as funções disponíveis para scripts.", tipo: "Documentação" },
          ].map((item) => (
            <a key={item.nome} href={item.url} target="_blank" rel="noopener noreferrer" className="block bg-card border border-border rounded-xl p-4 hover:border-primary transition-colors">
              <div className="flex items-start justify-between mb-1">
                <h4 className="font-bold text-primary text-sm">{item.nome}</h4>
                <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">{item.tipo}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </a>
          ))}
        </div>

        <h2>Ferramentas complementares</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
          {[
            { nome: "Cheat Engine", plataforma: "PC (Windows)", desc: "O GG do PC. Essencial para analisar jogos em emuladores Android no computador. Interface mais poderosa para análise inicial." },
            { nome: "IDA Pro / Ghidra", plataforma: "PC (Windows/Linux)", desc: "Disassemblers para análise de APKs. Quando o GG não encontra o endereço, Ghidra (gratuito) pode localizar via engenharia reversa do código." },
            { nome: "APKTool", plataforma: "PC (Windows/Linux/Mac)", desc: "Descompila e recompila APKs Android. Útil para remover verificações anti-cheat no código antes de usar o GG." },
            { nome: "jadx", plataforma: "PC (multiplataforma)", desc: "Descompilador de DEX/APK para código Java legível. Ajuda a entender como o jogo armazena valores — confirma tipos de dados usados." },
            { nome: "Magisk Manager", plataforma: "Android", desc: "Gerenciador de root. Essencial para configurar DenyList e instalar módulos de bypass de anti-cheat." },
            { nome: "Termux", plataforma: "Android", desc: "Terminal Linux no Android. Útil para verificar permissões root, rodar ADB local e executar scripts shell." },
          ].map((item) => (
            <div key={item.nome} className="bg-card border border-border rounded-xl p-4">
              <div className="flex items-center gap-2 mb-1">
                <h4 className="font-bold text-foreground text-sm">{item.nome}</h4>
                <span className="text-xs text-muted-foreground ml-auto">{item.plataforma}</span>
              </div>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <h2>Comunidades e fóruns</h2>
        <div className="not-prose overflow-x-auto my-6">
          <table className="w-full border-collapse text-sm">
            <thead>
              <tr>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Comunidade</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Plataforma</th>
                <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Foco</th>
              </tr>
            </thead>
            <tbody>
              {[
                ["GG Official Forum", "gameguardian.net", "Scripts, suporte, pedidos de hacks específicos"],
                ["r/AndroidGaming (Reddit)", "Reddit", "Discussão geral, às vezes sobre GG"],
                ["Telegram GG Brasil", "Telegram", "Comunidade BR — dicas, scripts, suporte em PT"],
                ["Discord Game Modding", "Discord", "Servidores de modding com canais de GG"],
                ["XDA Developers", "xda-developers.com", "Root, Magisk, KernelSU — base técnica para usar o GG"],
              ].map(([comunidade, plataforma, foco], i) => (
                <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                  <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{comunidade}</td>
                  <td className="px-4 py-2 border border-border text-primary text-sm">{plataforma}</td>
                  <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{foco}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2>Leitura adicional — conceitos técnicos</h2>
        <div className="grid grid-cols-1 gap-3 my-6 not-prose">
          {[
            { titulo: "Memória Virtual e Paginação", desc: "Entender como o Linux gerencia memória virtual ajuda a compreender por que o GG funciona com /proc/pid/mem. Busque: 'Linux virtual memory tutorial'." },
            { titulo: "Tipos de dados em C/C++", desc: "Jogos são escritos em C/C++. Saber que int = 4 bytes, float = 4 bytes IEEE 754, double = 8 bytes explica diretamente os tipos do GG." },
            { titulo: "Engenharia Reversa Android", desc: "Livro gratuito: 'Android Reverse Engineering' (OWASP). Cobre APKs, smali, DEX e nativo — tudo relevante para entender como o GG encontra valores." },
            { titulo: "Linguagem Lua", desc: "Lua é simples e poderosa. O site oficial (lua.org) tem tutorial completo em 30 minutos. Essencial para scripts GG avançados." },
            { titulo: "ptrace() e /proc filesystem", desc: "man ptrace no Linux documenta exatamente o que o GG usa para se anexar ao processo. 'The /proc filesystem' (kernel.org) explica /proc/pid/mem." },
          ].map((item) => (
            <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-primary">
              <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
              <p className="text-xs text-muted-foreground">{item.desc}</p>
            </div>
          ))}
        </div>

        <AlertBox type="success" title="Próximos passos após dominar o GG">
          Com as habilidades do GG, você está pronto para explorar Frida (dynamic instrumentation), Objection (pen testing mobile), e até contribuir para CTFs de segurança mobile. O GG é um excelente trampolim para segurança de aplicações.
        </AlertBox>
      </PageContainer>
    );
  }
  