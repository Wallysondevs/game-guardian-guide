# Game Guardian — Guia Completo 🎮

Guia técnico completo de modificação de memória Android usando o Game Guardian (GG), inteiramente em **Português Brasileiro**. Este projeto é uma referência didática profunda — desde os fundamentos absolutos até técnicas avançadas de scripting Lua, bypass de anti-cheat e considerações éticas sobre o uso da ferramenta.

## 📖 Acesse online

**[wallysondevs.github.io/game-guardian-guide](https://wallysondevs.github.io/game-guardian-guide/)**

## 🎯 Para quem é este guia

- **Iniciantes** que nunca usaram GG e querem aprender do zero, em português, sem assumir conhecimento prévio de hacking ou Linux.
- **Curiosos técnicos** interessados em entender como jogos armazenam dados na memória e como ferramentas de análise funcionam.
- **Estudantes de Ciência da Computação** que querem ver na prática conceitos de memória virtual, structs, ponteiros e segurança de software.
- **Pesquisadores em segurança mobile** que precisam de referência rápida sobre técnicas de instrumentação e bypass de anti-cheat.
- **Desenvolvedores de jogos** que querem entender como suas criações são analisadas — para construir defesas melhores.
- **Profissionais de QA** que usam GG para testar comportamento de jogos em condições extremas (HP zero, valores máximos, edge cases).

## 📚 Conteúdo do guia

O guia é dividido em **18 páginas** cobrindo desde o básico até o avançado:

### Fundamentos
- **Home** — visão geral do projeto e navegação
- **O que é Game Guardian** — história, contexto técnico, casos de uso
- **Instalação** — download oficial, instalação com e sem root, troubleshooting
- **Permissões Root** — Magisk, KernelSU, configuração de DenyList

### Interface e busca
- **Interface** — visão completa da UI do GG, controles, navegação
- **Tipos de busca** — Dword, Float, Double, XOR, Auto e quando usar cada um
- **Busca básica** — workflow inicial, refinamento, filtros
- **Grupos de valores** — busca em grupo (group search) para structs

### Edição e técnicas
- **Edição de memória** — modificar, congelar (freeze), favoritos, ponteiros
- **Hacks populares** — exemplos práticos: vida, dano, moedas, velocidade, XP

### Scripts Lua
- **Scripts Lua — Introdução** — sintaxe, primeiro script, funções essenciais do GG
- **Scripts Avançados** — ponteiros, dump de memória, hooks, otimização

### Configurações avançadas
- **Virtual Space** — usar o GG sem root via apps de espaço virtual
- **Bypass Anti-Cheat** — como anti-cheats funcionam e técnicas de evasão

### Uso responsável
- **Uso Seguro** — minimizar risco de ban, separação de contas, configuração defensiva
- **Troubleshooting** — soluções para problemas comuns organizados por categoria
- **Ética e Responsabilidade** — reflexões sobre uso ético, aspectos legais no Brasil
- **Referências e Recursos** — comunidades, ferramentas, livros, cursos, CTFs

## ✨ Características do guia

- 🇧🇷 **100% em Português Brasileiro** — escrito com terminologia técnica nacional, sem traduções literais robóticas
- 📖 **Conteúdo profundo** — cada página tem dezenas de exemplos práticos, tabelas comparativas, troubleshooting específico
- 💻 **Código real** — exemplos Lua testados, scripts completos prontos para usar
- 🎨 **Design moderno** — interface escura, tipografia legível, navegação intuitiva
- ⚡ **Performance** — site estático, carregamento instantâneo, funciona offline após primeira visita
- 📱 **Responsivo** — funciona perfeitamente em celular, tablet e desktop
- 🔍 **SEO otimizado** — meta tags, Open Graph, estrutura semântica para buscadores
- 🆓 **Open source** — código aberto sob licença MIT, contribuições bem-vindas

## 🛠️ Tecnologias

- **React 19** — biblioteca UI moderna com hooks e Server Components
- **Vite** — build tool ultra-rápido para desenvolvimento
- **TypeScript** — tipagem estática para confiabilidade
- **Tailwind CSS v4** — utility-first CSS para design consistente
- **Framer Motion** — animações fluidas e transições de página
- **React Syntax Highlighter** — destaque sintático para blocos de código Lua/text
- **Wouter** — roteamento mínimo com suporte a hash routing (compatível com GitHub Pages)
- **Lucide React** — ícones SVG modernos e otimizados

## 🚀 Desenvolvimento local

### Pré-requisitos

- Node.js 18+ ([nodejs.org](https://nodejs.org))
- npm 9+ (incluído com Node.js)

### Setup

```bash
# Clone o repositório
git clone https://github.com/Wallysondevs/game-guardian-guide.git
cd game-guardian-guide

# Instale as dependências
npm install

# Inicie o servidor de desenvolvimento
npm run dev
```

O site estará disponível em `http://localhost:5173/game-guardian-guide/`.

### Estrutura do projeto

```
game-guardian-guide/
├── public/                  # Assets estáticos (favicon, og-image)
├── src/
│   ├── components/          # Componentes reutilizáveis
│   │   ├── layout/          # PageContainer, Sidebar, Footer
│   │   └── ui/              # AlertBox, CodeBlock, etc.
│   ├── pages/               # Uma página por arquivo (.tsx)
│   ├── App.tsx              # Roteamento principal
│   ├── main.tsx             # Entry point
│   └── index.css            # Estilos globais Tailwind
├── index.html               # HTML base
├── vite.config.ts           # Configuração do Vite
├── tailwind.config.js       # Configuração do Tailwind
└── package.json             # Dependências e scripts
```

## 📦 Build para produção

```bash
# Compilar para produção
npm run build

# Preview do build local
npm run preview
```

Os arquivos gerados ficam em `dist/`. Faça upload para qualquer servidor estático (GitHub Pages, Netlify, Vercel, Cloudflare Pages).

## 🌐 Deploy automático no GitHub Pages

Este projeto está configurado para deploy automático via GitHub Actions. A cada push na branch `main`, o workflow:

1. Instala dependências
2. Roda `npm run build`
3. Publica `dist/` no branch `gh-pages`
4. GitHub Pages serve o conteúdo

URL final: `https://wallysondevs.github.io/game-guardian-guide/`

## 🤝 Contribuindo

Contribuições são muito bem-vindas! Maneiras de ajudar:

- 🐛 **Reportar bugs** — abra uma issue descrevendo o problema
- 💡 **Sugerir melhorias** — abra issue com sugestões de novo conteúdo ou melhorias
- ✏️ **Corrigir typos** — pull requests para correções de português, gramática, clareza
- 📝 **Adicionar exemplos** — scripts Lua testados em jogos específicos são valiosos
- 🌍 **Traduzir** — futuras versões em ES, EN, FR são bem-vindas
- 🎨 **Melhorar design** — sugestões de UX/UI para tornar o guia mais acessível

### Processo de contribuição

1. Faça fork do repositório
2. Crie uma branch para sua feature: `git checkout -b feature/minha-melhoria`
3. Commit das alterações: `git commit -m 'Adiciona exemplo de hack para Cookie Run'`
4. Push para sua branch: `git push origin feature/minha-melhoria`
5. Abra um Pull Request com descrição clara

### Padrões de código

- Mantenha consistência com PageContainer, AlertBox, CodeBlock existentes
- Texto em PT-BR técnico e didático
- Comentários em código também em português
- Code blocks usam `language="lua"` ou `language="text"`
- Sempre inclua warnings éticos em hacks que poderiam afetar jogos online

## ⚖️ Licença

MIT License — uso livre para fins educacionais e pessoais. Veja [LICENSE](LICENSE).

## ⚠️ Disclaimer

Este guia é estritamente educacional. O Game Guardian é uma ferramenta legítima de análise de memória, comparable ao Cheat Engine no PC. Como qualquer ferramenta poderosa, seu uso responsável é de inteira responsabilidade do usuário.

**Práticas explicitamente NÃO encorajadas neste guia:**

- ❌ Cheating em jogos competitivos online (PvP, ranked, torneios)
- ❌ Venda de contas hackeadas ou itens fraudulentos
- ❌ Distribuição comercial de cheats
- ❌ Uso para prejudicar outros jogadores
- ❌ Modificação em jogos com prêmios em dinheiro real

**Práticas que o guia apoia:**

- ✅ Uso em jogos single-player offline próprios
- ✅ Educação técnica e curiosidade legítima
- ✅ Pesquisa de segurança e bug bounty responsável
- ✅ Acessibilidade (ajustar dificuldade para limitações físicas)
- ✅ Desenvolvimento e QA de jogos próprios
- ✅ Aprendizado para carreira em segurança da informação

Os autores deste guia não se responsabilizam por uso indevido. Banimentos, perda de contas, ou consequências legais decorrentes do uso da ferramenta são inteiramente responsabilidade do usuário.

## 🌟 Apoie o projeto

Se este guia te ajudou:

- ⭐ **Star** este repositório no GitHub
- 🔄 **Compartilhe** com a comunidade brasileira de gaming/modding
- 💬 **Comente** em fóruns e Discord recomendando o guia
- 🤝 **Contribua** com correções, melhorias ou novos exemplos
- 📧 **Reporte** bugs e dificuldades para que possamos melhorar

## 📞 Contato

- **GitHub**: [@Wallysondevs](https://github.com/Wallysondevs)
- **Issues**: [github.com/Wallysondevs/game-guardian-guide/issues](https://github.com/Wallysondevs/game-guardian-guide/issues)

---

**Feito com ❤️ pela comunidade brasileira de gaming e modding.**

> ⚠️ Este guia é para fins educacionais. Use com responsabilidade.
