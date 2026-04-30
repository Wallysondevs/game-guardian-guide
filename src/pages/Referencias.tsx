import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Referencias() {
  return (
    <PageContainer
      title="Referências e Recursos"
      subtitle="Links, ferramentas, comunidades, livros, canais e cursos para aprofundar seu conhecimento sobre Game Guardian, engenharia reversa e segurança mobile."
      difficulty="iniciante"
      timeToRead="14 min"
    >
      <AlertBox type="info" title="Recursos organizados por categoria">
        Aqui você encontra os melhores recursos da comunidade GG e do ecossistema de segurança mobile — fóruns, ferramentas complementares, documentação oficial, livros, canais de YouTube e CTFs para evoluir do GG para uma carreira em cibersegurança ou pesquisa de segurança em jogos.
      </AlertBox>

      <h2>Site e downloads oficiais</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { nome: "gameguardian.net", url: "https://gameguardian.net", desc: "Site oficial. Downloads do APK, changelog detalhado, fórum de suporte e lista de scripts compartilhados pela comunidade. Atualizado regularmente.", tipo: "Oficial" },
          { nome: "gameguardian.net/forum", url: "https://gameguardian.net/forum", desc: "Fórum da comunidade. Seções de scripts por jogo, suporte técnico, pedidos de hacks específicos e tutoriais detalhados. Comunidade global, com seção em português.", tipo: "Oficial" },
          { nome: "gameguardian.net/docs", url: "https://gameguardian.net/docs", desc: "Documentação completa da API Lua do GG. Referência exaustiva de todas as funções (gg.searchNumber, gg.setValues, gg.choice, etc.), com exemplos.", tipo: "Documentação" },
          { nome: "GitHub - GameGuardian Scripts", url: "https://github.com/topics/gameguardian", desc: "Repositórios open-source de scripts GG. Bom lugar para ver código profissional e estudar padrões avançados de scripting.", tipo: "Open Source" },
          { nome: "Telegram @GameGuardianOfficial", url: "https://t.me/GameGuardianOfficial", desc: "Canal oficial no Telegram com anúncios de updates e novidades. Útil para saber sobre novas versões antes do site oficial.", tipo: "Notícias" },
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

      <h2>Ferramentas complementares ao GG</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { nome: "Cheat Engine", plataforma: "PC (Windows/Mac/Linux)", desc: "O 'GG do PC'. Essencial para analisar jogos em emuladores Android no computador. Interface mais poderosa para análise inicial. Free, open-source, mantido há 20+ anos por Dark Byte." },
          { nome: "IDA Pro / IDA Free", plataforma: "PC (Windows/Linux/Mac)", desc: "Disassembler comercial líder do mercado. Versão Free gratuita para uso pessoal. Quando o GG não encontra o endereço, IDA pode localizar via análise estática do código nativo do APK." },
          { nome: "Ghidra", plataforma: "PC (multiplataforma)", desc: "Alternativa gratuita e open-source ao IDA, desenvolvida pela NSA. Análise estática completa de binários, suporte a ARM/ARM64 nativo do Android. Curva de aprendizado mais íngreme mas extremamente poderoso." },
          { nome: "APKTool", plataforma: "PC (Windows/Linux/Mac)", desc: "Descompila e recompila APKs Android. Útil para remover verificações anti-cheat no código antes de usar o GG. Gera código smali (assembly do Android) editável." },
          { nome: "jadx", plataforma: "PC (multiplataforma)", desc: "Descompilador de DEX/APK para código Java legível. Mais user-friendly que apktool para entender lógica do jogo. Tem GUI visual e CLI." },
          { nome: "Frida", plataforma: "PC + Android", desc: "Framework de instrumentação dinâmica. Permite hooks em runtime — modificar comportamento de funções enquanto o app roda. Mais poderoso que GG para casos avançados, mas mais detectável." },
          { nome: "Objection", plataforma: "PC + Android", desc: "Wrapper sobre Frida com comandos pré-feitos para pen testing mobile. Bypass de root detection, dump de memória, modificação de funções comuns. Ótimo ponto de partida para Frida." },
          { nome: "Magisk Manager", plataforma: "Android", desc: "Gerenciador de root mais popular. Essencial para configurar DenyList e instalar módulos de bypass de anti-cheat (PlayIntegrityFix, Shamiko, etc.)." },
          { nome: "KernelSU", plataforma: "Android", desc: "Alternativa moderna ao Magisk, opera no nível do kernel. Mais difícil de detectar mas requer kernel customizado. Ideal para jogos com anti-cheat agressivo." },
          { nome: "Termux", plataforma: "Android", desc: "Terminal Linux completo no Android. Útil para verificar permissões root, rodar ADB local, executar scripts shell, instalar Python/git/etc." },
          { nome: "MT Manager", plataforma: "Android", desc: "Gerenciador de arquivos e modificador de APK no próprio Android. Pode editar APKs, decompilar smali, e modificar arquivos de save de jogos. Versão paga mais completa." },
          { nome: "HxD / 010 Editor", plataforma: "PC", desc: "Editores hexadecimais profissionais. Úteis para analisar dumps de memória do GG ou modificar arquivos de save binários. 010 Editor tem 'binary templates' para parser estruturas conhecidas." },
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
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Idioma</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["GG Official Forum", "gameguardian.net/forum", "Scripts, suporte, pedidos de hacks específicos. Comunidade mais ativa e técnica.", "EN (com seções multilíngues)"],
              ["r/AndroidGaming", "Reddit", "Discussão geral de jogos mobile, às vezes sobre GG. Bom para descobrir novos jogos hackeáveis.", "EN"],
              ["r/Magisk", "Reddit", "Tudo sobre Magisk e root Android. Essencial para problemas de DenyList, módulos, KernelSU.", "EN"],
              ["Telegram GG Brasil", "Telegram (vários grupos)", "Comunidade BR — dicas, scripts, suporte em português. Procure 'Game Guardian Brasil' no Telegram.", "PT-BR"],
              ["Discord GG/Modding", "Discord (vários servers)", "Servidores de modding com canais de GG. Procure por convites em fóruns oficiais.", "EN, PT, ES, RU"],
              ["XDA Developers", "xda-developers.com", "Root, Magisk, KernelSU, custom ROMs. Base técnica para usar o GG efetivamente.", "EN"],
              ["MMO-Champion", "mmo-champion.com", "Discussão sobre MMOs, incluindo investigações de cheats em jogos populares.", "EN"],
              ["Guided Hacking", "guidedhacking.com", "Tutoriais profissionais de game hacking. Cobre PC e mobile. Versão paga premium.", "EN"],
              ["UnknownCheats", "unknowncheats.me", "Maior comunidade de game hacking do mundo. Foco em PC mas seção mobile crescente.", "EN, RU"],
              ["XDA Forums - Magisk Modules", "xda-developers.com", "Repositório de módulos Magisk com discussões. Encontre PlayIntegrityFix updates aqui.", "EN"],
              ["Guilded - Modding Communities", "guilded.gg", "Alternativa ao Discord para comunidades de modding. Servers públicos de game hacking.", "EN"],
              ["GitHub - LSPosed", "github.com/LSPosed", "Org do LSPosed, Shamiko, e outros módulos de bypass essenciais. Código aberto.", "EN"],
            ].map(([comunidade, plataforma, foco, idioma], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-medium text-foreground text-sm">{comunidade}</td>
                <td className="px-4 py-2 border border-border text-primary text-sm">{plataforma}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{foco}</td>
                <td className="px-4 py-2 border border-border text-secondary text-sm">{idioma}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2>Comunidades brasileiras</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { nome: "Telegram GG Brasil", desc: "Maior comunidade BR de Game Guardian no Telegram. Compartilha scripts em português, tutoriais e dicas para jogos populares no Brasil." },
          { nome: "Discord Modders BR", desc: "Servidores de Discord brasileiros com canais dedicados a GG, Magisk, e modding em geral. Pesquise 'modding brasil discord' para encontrar convites ativos." },
          { nome: "Fórum Adrenaline (Mobile)", desc: "Subseção de games mobile no fórum Adrenaline. Brasileiros discutem hacks, otimizações, e troubleshooting." },
          { nome: "YouTube BR - Canais de Hack", desc: "Vários canais brasileiros ensinam GG. Cuidado com qualidade variável — prefira canais que explicam por quê, não só receitas." },
          { nome: "Fórum Mod-Tibia BR", desc: "Comunidade de modding focada em Tibia/MMORPGs antigos. Conhecimento técnico transferível para outros jogos." },
          { nome: "Reddit r/InternetBrasil", desc: "Discussões gerais que às vezes tocam em modding e game hacking. Boa para questões legais brasileiras." },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-green-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">🇧🇷 {item.nome}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Leitura adicional — conceitos técnicos</h2>
      <div className="grid grid-cols-1 gap-3 my-6 not-prose">
        {[
          { titulo: "Memória Virtual e Paginação", desc: "Entender como o Linux gerencia memória virtual ajuda a compreender por que o GG funciona com /proc/pid/mem. Busque: 'Linux virtual memory tutorial' ou leia o capítulo 15 do livro 'Operating Systems: Three Easy Pieces' (gratuito online em pages.cs.wisc.edu/~remzi/OSTEP/)." },
          { titulo: "Tipos de dados em C/C++", desc: "Jogos são escritos em C/C++ ou linguagens que compilam para código nativo. Saber que int = 4 bytes, float = 4 bytes IEEE 754, double = 8 bytes explica diretamente os tipos do GG. Leia 'C Primer Plus' ou tutoriais em learncpp.com." },
          { titulo: "Engenharia Reversa Android", desc: "Livro gratuito: 'OWASP Mobile Application Security Testing Guide'. Cobre APKs, smali, DEX, código nativo — tudo relevante para entender como o GG encontra valores. Disponível em mas.owasp.org." },
          { titulo: "Linguagem Lua", desc: "Lua é simples e poderosa. O livro oficial 'Programming in Lua' (Ierusalimschy, criador da linguagem) é gratuito online: lua.org/pil/. Tutorial completo em 30 minutos. Essencial para scripts GG avançados." },
          { titulo: "ptrace() e /proc filesystem", desc: "'man ptrace' no Linux documenta exatamente o que o GG usa para se anexar ao processo. 'The /proc filesystem' (kernel.org/doc/html/latest/filesystems/proc.html) explica /proc/[pid]/mem em detalhes." },
          { titulo: "Engine Unity (interno)", desc: "A maioria dos jogos mobile usa Unity. Entender il2cpp, MonoBehaviour, e GameObject ajuda a buscar valores. O blog oficial do Unity tem posts técnicos profundos. Site: blog.unity.com." },
          { titulo: "Engine Unreal (interno)", desc: "Unreal usa Blueprint + C++. Mais difícil de hackear que Unity (código compilado nativo, mais ofuscado). Documentação em docs.unrealengine.com tem detalhes da arquitetura." },
          { titulo: "ARM64 Assembly", desc: "Smartphones modernos rodam ARM64. Saber assembly ajuda em casos avançados onde GG precisa modificar instruções de código (não só dados). Livro recomendado: 'ARM 64-Bit Assembly Language' de Larry Pyeatt." },
          { titulo: "Anti-Cheat Internals", desc: "'Game Hacking: Developing Autonomous Bots for Online Games' (Nick Cano, No Starch Press) — livro de referência. Foca em PC mas conceitos de detecção e bypass se aplicam ao mobile." },
          { titulo: "Cryptography for hackers", desc: "Para entender encriptação de save games e validação de mensagens, conheça AES, RSA, SHA. 'Serious Cryptography' (Aumasson) é referência moderna acessível." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-primary">
            <h4 className="font-bold text-foreground mb-1 text-sm">{item.titulo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Cursos e canais educativos</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { nome: "Guided Hacking (YouTube + paid)", tipo: "Curso/Canal", desc: "Tutoriais profissionais de game hacking. Foco em PC mas técnicas transferíveis. Versão paga tem comunidade premium e cursos estruturados." },
          { nome: "LiveOverflow (YouTube)", tipo: "Canal", desc: "Pesquisador de segurança que explica conceitos profundos de forma acessível. Vídeos sobre Frida, reverse engineering, CTFs. Excelente para iniciantes em segurança." },
          { nome: "stacksmashing (YouTube)", tipo: "Canal", desc: "Hardware hacking, reverse engineering, exploitation. Demonstra técnicas avançadas. Inspirador para evoluir além de cheats simples." },
          { nome: "Pwn College (Arizona State)", tipo: "Curso (gratuito)", desc: "Curso universitário gratuito de segurança ofensiva. Cobre binary exploitation, reverse engineering, web security. Material disponível em pwn.college." },
          { nome: "OffSec PEN-200 (OSCP)", tipo: "Curso (pago)", desc: "Certificação profissional de pen testing. Caro mas reconhecido. Foco em penetration testing geral, não apenas mobile." },
          { nome: "SANS SEC575", tipo: "Curso (pago)", desc: "Mobile Device Security and Penetration Testing. Curso enterprise sério, foco em segurança mobile profissional. Caro mas é o padrão da indústria." },
          { nome: "Hack The Box - Mobile", tipo: "Plataforma de prática", desc: "Plataforma de CTF com módulos mobile. Pratique reverse engineering em apps Android em ambiente legal e estruturado." },
          { nome: "TryHackMe", tipo: "Plataforma educacional", desc: "Aprenda segurança ofensiva interativamente. Trilhas para mobile security, Android, etc. Versão gratuita generosa." },
          { nome: "PortSwigger Academy", tipo: "Curso (gratuito)", desc: "Treinamento gratuito de web security. Útil para entender APIs de jogos online (validação server-side, autenticação)." },
          { nome: "Coursera - Cybersecurity", tipo: "Cursos universitários", desc: "Cursos de universidades top (Stanford, Maryland, NYU). Versão auditável gratuita. Cobre fundamentos relevantes para game hacking." },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center gap-2 mb-1">
              <h4 className="font-bold text-foreground text-sm">{item.nome}</h4>
              <span className="text-xs bg-secondary/20 text-secondary px-2 py-0.5 rounded ml-auto">{item.tipo}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Plataformas de CTF e pratica legal</h2>
      <p>
        Quer praticar reverse engineering em ambiente 100% legal e ético? Capture The Flag (CTF) competitions são o caminho:
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { nome: "CTFtime.org", desc: "Calendário global de CTFs. Centenas de eventos por ano, muitos online e gratuitos. Categorias incluem reverse engineering, mobile, web, crypto." },
          { nome: "Hack The Box", desc: "Maquinas vulneráveis para hackear legalmente. Trilhas estruturadas. Versão gratuita generosa com 20+ máquinas iniciantes." },
          { nome: "TryHackMe", desc: "Trilhas guiadas para iniciantes. Mais didático que HTB. Cobre Android, iOS, web, Linux. Ótimo ponto de partida." },
          { nome: "Root-Me", desc: "Plataforma francesa multilíngue (incluindo PT). Centenas de desafios de RE, web, crypto. Gratuito." },
          { nome: "PicoCTF", desc: "CTF educacional da Carnegie Mellon. Foco em iniciantes (estudantes ensino médio/universidade). Material didático excelente." },
          { nome: "CryptoHack", desc: "Especializado em criptografia. Útil para entender como jogos protegem comunicação e save games." },
          { nome: "OverTheWire", desc: "Wargames clássicos para aprender Linux, networking, exploitation. Bandit (iniciante) é referência." },
          { nome: "DefCon CTF", desc: "Mais prestigioso CTF do mundo. Quals abertas anualmente. Top 5 vão para final em Las Vegas. Alvo de longo prazo para profissionais." },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-4 border-l-4 border-l-purple-500">
            <h4 className="font-bold text-foreground mb-1 text-sm">🚩 {item.nome}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Bug Bounty Programs (carreira em segurança)</h2>
      <p>
        Se você ficou bom em encontrar vulnerabilidades em jogos, considere reportar responsavelmente. Várias empresas pagam por bugs encontrados:
      </p>
      <ul>
        <li><strong>HackerOne</strong>: maior plataforma de bug bounty. Riot Games, Activision, e outros têm programas ativos.</li>
        <li><strong>BugCrowd</strong>: alternativa ao HackerOne. Programas para diversas empresas de jogos.</li>
        <li><strong>Google Vulnerability Reward Program</strong>: paga por vulnerabilidades em apps Android (incluindo jogos populares hospedados na Play Store).</li>
        <li><strong>Apple Security Bounty</strong>: para apps iOS. Inclui escalação via apps populares.</li>
        <li><strong>Programas próprios</strong>: empresas como Riot, Valve, EA têm programas internos. Pesquise no site oficial 'security' ou 'responsible disclosure'.</li>
      </ul>
      <p>
        Pagamentos variam de centenas a centenas de milhares de dólares dependendo da severidade. O conhecimento adquirido com GG é fundação valiosa para essa carreira.
      </p>

      <h2>Livros recomendados (em português e inglês)</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { titulo: "Game Hacking: Developing Autonomous Bots", autor: "Nick Cano (No Starch Press)", desc: "Bíblia do game hacking. Foca em PC mas técnicas se aplicam ao mobile. ~$30 USD. Existe versão em PDF/ePub." },
          { titulo: "The IDA Pro Book", autor: "Chris Eagle (No Starch Press)", desc: "Guia definitivo para usar IDA Pro. Reverse engineering profissional. ~$50 USD." },
          { titulo: "Practical Reverse Engineering", autor: "Bruce Dang (Wiley)", desc: "Cobre x86, ARM, Windows kernel, e ferramentas. Acadêmico mas acessível. ~$50 USD." },
          { titulo: "The Mobile Application Hacker's Handbook", autor: "Dominic Chell (Wiley)", desc: "Foco em segurança Android e iOS. Pen testing mobile profissional. ~$45 USD." },
          { titulo: "Programming in Lua", autor: "Roberto Ierusalimschy (Lua.org)", desc: "Pelo criador da Lua. Versão online é gratuita em lua.org/pil/. Versão em papel ~$30 USD." },
          { titulo: "Engenharia Reversa em Software", autor: "Bruno Cardoso (Brasport)", desc: "Livro brasileiro em português sobre RE. Boa introdução em PT-BR. Disponível em livrarias online." },
          { titulo: "Android Hacker's Handbook", autor: "Joshua Drake (Wiley)", desc: "Embora datado (2014), conceitos fundamentais de Android internals continuam relevantes. ~$40 USD." },
          { titulo: "Hacker: Code of Conduct", autor: "Diversos autores", desc: "Reflexões éticas sobre hacking. Importante leitura paralela ao aprendizado técnico." },
        ].map((item) => (
          <div key={item.titulo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-bold text-foreground text-sm mb-1">📚 {item.titulo}</h4>
            <p className="text-xs text-primary mb-1">{item.autor}</p>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Repositórios GitHub úteis</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { repo: "topjohnwu/Magisk", desc: "Source code do Magisk. Para entender como funciona internamente." },
          { repo: "tiann/KernelSU", desc: "KernelSU, alternativa moderna ao Magisk. Documentação completa." },
          { repo: "LSPosed/Shamiko", desc: "Módulo essencial para esconder root de apps específicos." },
          { repo: "chiteroman/PlayIntegrityFix", desc: "Módulo para passar Play Integrity API mesmo com root. Atualizado frequentemente." },
          { repo: "frida/frida", desc: "Source code do Frida. Documentação extensa para uso em projetos próprios." },
          { repo: "skylot/jadx", desc: "Decompiler de DEX/APK para Java. Open source, ativo." },
          { repo: "ibotpeaches/Apktool", desc: "Decompiler/recompiler de APK. Fundamental para modding Android." },
          { repo: "NationalSecurityAgency/ghidra", desc: "Ghidra (NSA). Reverse engineering profissional gratuito." },
          { repo: "horsicq/DIE-engine", desc: "Detect It Easy — identifica packers, protetores, encriptação em executáveis." },
          { repo: "RootBeerFresh/Universal-RootBeer-Bypass", desc: "Bypass específico para RootBeer (biblioteca de root detection comum em jogos)." },
        ].map((item) => (
          <div key={item.repo} className="bg-card border border-border rounded-xl p-4">
            <h4 className="font-mono text-primary text-xs mb-1">{item.repo}</h4>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2>Eventos e conferências</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { nome: "DEF CON", local: "Las Vegas (anual)", desc: "Maior conferência de hacking do mundo. Vilas dedicadas a IoT, mobile, hardware. Vale a pena assistir keynotes online (gravadas)." },
          { nome: "Black Hat", local: "Vegas + EU + Asia", desc: "Versão corporate da DEF CON. Pesquisas mais formais. Trainings caros mas world-class." },
          { nome: "RSA Conference", local: "San Francisco (anual)", desc: "Foco em segurança corporativa. Networking profissional. Vasto expo floor." },
          { nome: "BSidesSP / BSidesBH", local: "São Paulo / BH", desc: "Edições brasileiras de Security BSides. Comunidade local, gratuito ou barato. Networking nacional." },
          { nome: "H2HC (Hackers to Hackers)", local: "São Paulo (anual)", desc: "Maior conferência de hacking do Brasil. Palestras técnicas em PT e EN. Trainings de qualidade." },
          { nome: "Roadsec", local: "Vários (Brasil)", desc: "Tour de eventos pelo Brasil. Capítulos em várias capitais. Acessível para iniciantes." },
        ].map((item) => (
          <div key={item.nome} className="bg-card border border-border rounded-xl p-4">
            <div className="flex items-center justify-between mb-1">
              <h4 className="font-bold text-foreground text-sm">🎤 {item.nome}</h4>
              <span className="text-xs text-muted-foreground">{item.local}</span>
            </div>
            <p className="text-xs text-muted-foreground">{item.desc}</p>
          </div>
        ))}
      </div>

      <AlertBox type="success" title="Próximos passos após dominar o GG">
        Com as habilidades do GG, você está pronto para explorar Frida (dynamic instrumentation), Objection (pen testing mobile), e até contribuir para CTFs de segurança mobile. O GG é um excelente trampolim para uma carreira em segurança de aplicações, pen testing mobile, ou desenvolvimento de jogos. A curiosidade técnica que te trouxe aqui é a mesma que move profissionais top da indústria de segurança — invista nela, vá além dos cheats, construa algo significativo.
      </AlertBox>

      <AlertBox type="info" title="Volte para o início">
        Quer revisar os fundamentos? Volte para <strong>O que é Game Guardian</strong> ou comece pela <strong>Instalação</strong>. Já dominou tudo? Considere contribuir com este guia no GitHub adicionando suas próprias dicas e descobertas — comunidade open-source agradece.
      </AlertBox>
    </PageContainer>
  );
}
