# Web Nutriz

Frontend do projeto Nutriz, construído com React + TypeScript + Vite.

## Estrutura de pastas

```
src/
├── assets/         # Imagens, ícones e outros arquivos estáticos
├── components/
│   ├── full/       # Componentes completos/compostos da aplicação
│   ├── layout/     # Componentes de layout (Header, Footer, etc.)
│   └── ui/         # Componentes de UI reutilizáveis (shadcn/radix)
├── config/         # Configurações gerais da aplicação
├── context/        # Contextos React (estado global)
├── hooks/          # Custom hooks
├── lib/            # Funções utilitárias e helpers
├── pages/
│   ├── private/    # Páginas que exigem autenticação (ex: home)
│   └── public/     # Páginas públicas (ex: landing-page, login)
├── router/         # Configuração de rotas
└── services/
    └── types/      # Tipagens usadas nos serviços/API
```

## Tela de artigos

A rota `/artigos` exibe a leitura dos artigos da seção "Artigos para te apoiar em cada fase" da landing page — é acessível tanto deslogada (`publicRouter`) quanto logada (`routerPrivate`, vinda da Central de Conteúdos), por isso está registrada nos dois roteadores. O artigo ativo é definido pelo query param `a` (ex.: `/artigos?a=2`), e o botão "Voltar" muda de destino conforme o contexto (landing para visitante, Central de Conteúdos para usuária logada).

- Os dados dos artigos (título, categoria, tempo de leitura, conteúdo, cores e imagem de capa) moram em `src/pages/public/articles/data.ts`. Landing, Central de Conteúdos e a tela de artigo individual importam direto desse módulo.
- A troca de artigo (card "Outros artigos" na sidebar) anima com Framer Motion e respeita `prefers-reduced-motion`.
- A capa de cada artigo é uma imagem real (`src/assets/artigos/`). O vídeo usa `Article.videoUrl` quando definido (embed real); sem URL, mostra a capa com o selo "Vídeo em breve" em vez de simular um player.
- O cabeçalho de cada tela usa o componente compartilhado `Page` (título/descrição/botão de voltar); não há mais busca nem função de compartilhar.

## Central de conteúdos

A rota privada `/conteudo-educativo` (`src/pages/private/content-hub/`) é a home de artigos da área logada, acessível pelo menu hambúrguer. Destaques, grid "Mais conteúdos", vídeos em destaque, dicas rápidas e um accordion de dúvidas frequentes — todos os cards/vídeos abrem a mesma tela de leitura de artigos acima. O CTA de newsletter no rodapé é mockado (`// TODO: integrar newsletter`).

## Como rodar o projeto

1. Instale as dependências:
   ```bash
   pnpm install
   ```
2. Configure o arquivo `.env.development` e preencha `VITE_API_URL` com o link que será enviado no privado.
3. Rode o projeto em modo desenvolvimento:
   ```bash
   pnpm dev
   ```

### Outros comandos úteis

```bash
pnpm build      # Gera o build de produção
pnpm preview    # Faz o preview do build de produção
pnpm lint       # Verifica lint (biome)
pnpm lint:fix   # Corrige problemas de lint automaticamente
pnpm format     # Formata o código
```

## Fluxo de contribuição

- Nunca faça merge direto na branch principal. Sempre abra um **Pull Request**.
- Todo PR deve conter um **vídeo de evidência** mostrando o que foi feito/testado antes de ser revisado e mergeado.