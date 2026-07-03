# web-nutriz

Frontend da plataforma Nutriz (doação de leite humano).

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

O gate fica em `use-eva-access.ts`. Não existe componente `Page`/`hasPermission`
neste repo, então o gate usa `useAuth()` + `EnumUserType`:

- **Permitidos**: visitante anônimo (não autenticado) e nutriz (`common`).
- **Negados**: `adm` e `nurse` — o FAB nem é montado (checagem no topo da árvore,
  não via CSS).

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
  (`conversation`/`message`) para auditoria; a listagem visual virá de uma API
  futura (`// TODO: carregar histórico via GET /conversations`).
  - Motivo: conversa de saúde em localStorage é dado sensível fora do controle do
    backend (risco LGPD) e duplicaria o que o backend já persiste.
- **Anônimo**: as mensagens vivem apenas em memória e são descartadas ao
  recarregar/fechar. Nunca em localStorage persistente.

### Variáveis de ambiente

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

### Rodando o E2E manual

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

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

---

# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type-aware lint rules:

```js
export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...

      // Remove tseslint.configs.recommended and replace with this
      tseslint.configs.recommendedTypeChecked,
      // Alternatively, use this for stricter rules
      tseslint.configs.strictTypeChecked,
      // Optionally, add this for stylistic rules
      tseslint.configs.stylisticTypeChecked,

      // Other configs...
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```

You can also install [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) for React-specific lint rules:

```js
// eslint.config.js
import reactX from 'eslint-plugin-react-x'
import reactDom from 'eslint-plugin-react-dom'

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{ts,tsx}'],
    extends: [
      // Other configs...
      // Enable lint rules for React
      reactX.configs['recommended-typescript'],
      // Enable lint rules for React DOM
      reactDom.configs.recommended,
    ],
    languageOptions: {
      parserOptions: {
        project: ['./tsconfig.node.json', './tsconfig.app.json'],
        tsconfigRootDir: import.meta.dirname,
      },
      // other options...
    },
  },
])
```
