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

A rota privada `/conteudo-educativo` (`src/pages/private/content-hub/`) é a home de artigos da área logada, acessível pelo menu hambúrguer. Destaques, grid "Mais conteúdos", vídeos em destaque, dicas rápidas e um accordion de dúvidas frequentes — todos os cards/vídeos abrem a mesma tela de leitura de artigos acima.

## Chat da EVA (widget flutuante)

A EVA é a assistente de IA que atende nutrizes 24/7. Ela é um **widget flutuante
global** (FAB no canto inferior direito → modal de chat), disponível em qualquer
página permitida. Consome o microserviço `nutriz-ia-service` (FastAPI, porta
8000) via WebSocket com streaming.

- Componentes do widget: `src/pages/private/eva/widget/` (`eva-widget.tsx`,
  `eva-chat-panel.tsx`, `eva-welcome-panel.tsx`, `use-eva-access.ts`).
- Montado globalmente em `src/App.tsx`, ao lado do `RouterProvider`.
- Componentes de chat reaproveitados (bolhas, input, typing, avatar, chips):
  `src/pages/private/eva/components/`. Hook de streaming: `hooks/use-eva-chat.ts`.

### Controle de acesso

O gate fica em `use-eva-access.ts`, construído sobre `useAuth()` + `EnumUserType`:

- **Permitidos**: visitante anônimo (não autenticado) e nutriz (`common`).
- **Negados**: `adm` e `nurse` — o FAB nem é montado (checagem no topo da árvore,
  não via CSS). O backend também recusa esses papéis no `/ws/chat`.

### Dois modos

- **Nutriz logada (`common`)**: conecta em `/ws/chat` com `auth.token`.
- **Visitante anônimo**: `POST /session/anonymous` → token efêmero → `/ws/chat-public`.
  Rate limit, detecção de PII e anti-jailbreak são aplicados no backend; close
  codes `4029` (rate limit) e `4008` (jailbreak) encerram com aviso amigável.

### Boas-vindas

- Anônimo: vê a tela de boas-vindas (com aviso LGPD) **toda vez** — cada visita é
  uma nova sessão.
- Nutriz logada: vê a boas-vindas **só na primeira vez** (flag em localStorage
  `eva:welcome-seen:<id_user>`).

### Persistência de mensagens (decisão MVP)

- **Nutriz logada**: as mensagens **NÃO** são persistidas em localStorage. Ao
  recarregar, o chat reinicia limpo na UI. O backend já grava tudo
  (`conversation`/`message`) para auditoria; a listagem visual virá numa fase
  futura consumindo o `GET /conversations` já existente no IA service.
  - Motivo: conversa de saúde em localStorage é dado sensível fora do controle do
    backend (risco LGPD) e duplicaria o que o backend já persiste.
- **Anônimo**: as mensagens vivem apenas em memória e são descartadas ao
  recarregar/fechar. Nunca em localStorage persistente.

### Variáveis de ambiente da EVA

Em `.env.development`:

```
VITE_EVA_WS_URL=ws://localhost:8000
VITE_EVA_API_URL=http://localhost:8000
VITE_EVA_DEV_TOKEN=
```

- `VITE_EVA_WS_URL`: URL do WebSocket do IA service (`/ws/chat` e `/ws/chat-public`).
- `VITE_EVA_API_URL`: URL HTTP do IA service (usada no `POST /session/anonymous`).
- `VITE_EVA_DEV_TOKEN`: somente desenvolvimento. Quando preenchido, substitui o
  token da sessão logada na conexão do chat. Deixe vazio em qualquer outro cenário.

### Subindo o backend da EVA

```bash
# no repositório nutriz-ia-service
docker compose up -d
```

Sobe a API na porta 8000 e o banco pgvector com migrations. O IA service já
aceita a origin do Vite (`http://localhost:5173`) via CORS.

### Testando a EVA manualmente

- **Anônimo**: abra `http://localhost:5173/` (deslogado), clique no FAB, aceite o
  aviso LGPD e converse. Recarregar descarta o histórico.
- **Nutriz logada**: semeie a sessão no console (F12) com um token de teste
  (gerado no IA service) e recarregue:

```js
localStorage.setItem("data", JSON.stringify({ token: "<TOKEN>", id_user: "<UUID_DA_USUARIA>", name: "Usuaria Teste", type: "common", addresses: [] }));
location.reload();
```

  O FAB aparece; o chat conecta em `/ws/chat`. Para confirmar o gate, repita com
  `type: "nurse"` e verifique que o FAB **não** aparece.

Close codes `4001` (sessão) e `4003` (consentimento) bloqueiam o input com aviso;
quedas de conexão disparam reconexão com backoff (1s → 2s → 4s).

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
