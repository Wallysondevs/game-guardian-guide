import { PageContainer } from "@/components/layout/PageContainer";
import { AlertBox } from "@/components/ui/AlertBox";

export default function Permissoes() {
  return (
    <PageContainer
      title="Permissões Root"
      subtitle="Entenda como o root funciona e por que o Game Guardian precisa dele."
      difficulty="iniciante"
      timeToRead="7 min"
    >
      <AlertBox type="info" title="Root não é obrigatório">
        Você pode usar o Game Guardian sem root através de Virtual Space (VMOS, VirtualXposed). Porém, com root o acesso à memória é mais completo e estável.
      </AlertBox>

      <h2>O que é root no Android?</h2>
      <p>
        Root é o acesso de superusuário no Android — equivalente ao "Administrador" no Windows ou "sudo" no Linux. Com root, você pode:
      </p>
      <ul>
        <li>Ler e escrever em qualquer região da memória de qualquer processo</li>
        <li>Acessar arquivos do sistema protegidos</li>
        <li>Instalar módulos que modificam o comportamento do sistema</li>
        <li>Remover apps do sistema (bloatware)</li>
      </ul>
      <p>
        O Game Guardian usa as permissões root para <strong>se injetar no processo do jogo</strong> e ter acesso à memória RAM do jogo.
      </p>

      <h2>Magisk vs KernelSU</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-6 not-prose">
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground text-lg mb-3">Magisk</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✅ Mais popular e com maior suporte</li>
            <li>✅ Systemless root — não modifica /system</li>
            <li>✅ MagiskHide para ocultar root de apps</li>
            <li>✅ Suporte a módulos (LSPosed, etc.)</li>
            <li>✅ Compatível com a maioria dos dispositivos</li>
            <li>⚠️ Pode ser detectado por alguns apps bancários</li>
          </ul>
        </div>
        <div className="bg-card border border-border rounded-xl p-5">
          <h3 className="font-bold text-foreground text-lg mb-3">KernelSU</h3>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li>✅ Root no nível do kernel — muito mais furtivo</li>
            <li>✅ Mais difícil de detectar por anti-cheat</li>
            <li>✅ Suporte a módulos como o Magisk</li>
            <li>✅ Melhor para jogos com anti-cheat avançado</li>
            <li>⚠️ Requer kernel compatível com o dispositivo</li>
            <li>⚠️ Menor compatibilidade de dispositivos</li>
          </ul>
        </div>
      </div>

      <h2>Como o GG usa o root</h2>
      <p>Quando você seleciona um processo no Game Guardian, ele executa internamente:</p>
      <ol>
        <li><strong>ptrace() syscall</strong> — anexa o GG ao processo do jogo como debugger</li>
        <li><strong>Leitura de /proc/[pid]/maps</strong> — mapeia as regiões de memória do jogo</li>
        <li><strong>Leitura/escrita via /proc/[pid]/mem</strong> — acessa e modifica os bytes diretamente</li>
        <li><strong>Detach</strong> — desanexa quando você termina, deixando o jogo continuar normalmente</li>
      </ol>

      <AlertBox type="warning" title="Atenção com SafetyNet / Play Integrity">
        O Google Play Protect e o Play Integrity API detectam root e bloqueiam alguns apps (bancários, jogos com anti-cheat). Use o módulo <strong>PlayIntegrityFix</strong> do Magisk para contornar isso ao jogar com GG.
      </AlertBox>

      <h2>Gerenciando permissões no Magisk</h2>
      <p>
        Quando o GG solicita root, o Magisk exibe um prompt. Você pode:
      </p>
      <ul>
        <li><strong>Conceder</strong> — GG terá acesso root permanente</li>
        <li><strong>Conceder (uma vez)</strong> — GG precisará pedir novamente na próxima vez</li>
        <li><strong>Negar</strong> — GG não funcionará com root</li>
      </ul>
      <p>
        Para gerenciar permissões concedidas: abra o Magisk → <strong>Superusuário</strong> → veja a lista de apps com acesso root. Você pode revogar a qualquer momento.
      </p>
    </PageContainer>
  );
}
