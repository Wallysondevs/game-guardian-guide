import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Referencias() {
  return (
    <PageContainer
      title="Referências"
      subtitle="Recursos oficiais, comunidades e materiais de estudo sobre Game Guardian."
      difficulty="iniciante"
      timeToRead="3 min"
    >
      <h2>Site e documentação oficial</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { name: "gameguardian.net", desc: "Site oficial — download, fórum e documentação", url: "https://gameguardian.net" },
          { name: "Documentação da API Lua", desc: "Referência completa de todas as funções gg.*", url: "https://gameguardian.net/help/" },
          { name: "Fórum oficial", desc: "Scripts, tutoriais e suporte da comunidade", url: "https://gameguardian.net/forum/" },
          { name: "Canal YouTube oficial", desc: "Tutoriais em vídeo pelo time do GG", url: "https://youtube.com/@gameguardian" },
        ].map((item) => (
          <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
            className="block bg-card border border-border hover:border-primary/50 rounded-xl p-4 transition-colors group">
            <h4 className="font-bold text-primary group-hover:underline mb-1">{item.name} ↗</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </a>
        ))}
      </div>

      <h2>Comunidades</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        {[
          { name: "r/gameguardian", desc: "Subreddit com tutoriais, scripts e suporte", url: "https://reddit.com/r/gameguardian" },
          { name: "r/androidhacking", desc: "Comunidade geral de hacking Android", url: "https://reddit.com/r/androidhacking" },
          { name: "GitHub - GG Scripts", desc: "Repositórios com scripts Lua para vários jogos", url: "https://github.com/topics/gameguardian" },
          { name: "XDA Developers", desc: "Fórum técnico sobre Android, root e modificações", url: "https://xda-developers.com" },
        ].map((item) => (
          <a key={item.name} href={item.url} target="_blank" rel="noopener noreferrer"
            className="block bg-card border border-border hover:border-primary/50 rounded-xl p-4 transition-colors group">
            <h4 className="font-bold text-primary group-hover:underline mb-1">{item.name} ↗</h4>
            <p className="text-sm text-muted-foreground">{item.desc}</p>
          </a>
        ))}
      </div>

      <h2>Ferramentas relacionadas</h2>
      <div className="not-prose overflow-x-auto my-4">
        <table className="w-full border-collapse text-sm">
          <thead>
            <tr>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Ferramenta</th>
              <th className="bg-muted text-foreground font-semibold px-4 py-2 text-left border border-border">Uso</th>
            </tr>
          </thead>
          <tbody>
            {[
              ["Magisk", "Root systemless para Android"],
              ["KernelSU", "Root no nível do kernel (mais furtivo)"],
              ["VMOS Pro", "Virtual space Android com root"],
              ["VirtualXposed", "Virtual space com suporte a Xposed"],
              ["APKTool", "Decompila APKs para análise"],
              ["jadx", "Decompilador de bytecode Dalvik/Java"],
              ["Ghidra", "Engenharia reversa de binários nativos (.so)"],
              ["Frida", "Framework de instrumentação dinâmica"],
            ].map(([tool, uso], i) => (
              <tr key={i} className={i % 2 === 1 ? "bg-muted/20" : ""}>
                <td className="px-4 py-2 border border-border font-mono text-primary text-sm">{tool}</td>
                <td className="px-4 py-2 border border-border text-muted-foreground text-sm">{uso}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AlertBox type="info" title="Continue aprendendo">
        O Game Guardian é uma porta de entrada para o fascinante mundo da análise de memória, engenharia reversa e segurança de software. Se você se interessar por esses temas, explore ferramentas como Frida, Ghidra e IDA Pro para ir muito além do GG.
      </AlertBox>
    </PageContainer>
  );
}
