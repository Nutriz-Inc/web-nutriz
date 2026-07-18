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

A rota pública `/artigos` exibe a leitura dos 4 artigos da seção "Artigos para te apoiar em cada fase" da landing page. O artigo ativo é definido pelo query param `a` (ex.: `/artigos?a=2`), e os cards da landing navegam direto para o artigo correspondente.

- Os dados dos artigos (título, categoria, tempo de leitura, conteúdo e cores) ficam centralizados em `src/data/articles.ts`, compartilhados entre a landing e a tela de leitura.
- A troca de artigo (busca do header ou card "Outros artigos") anima com Framer Motion e respeita `prefers-reduced-motion`.
- O vídeo, os links de compartilhamento e a imagem de capa são mockados (marcados com `To do` no código).

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