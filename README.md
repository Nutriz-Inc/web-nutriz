# web-nutriz

Frontend da plataforma Nutriz (doação de leite humano).

## Chat da EVA

A EVA é a assistente de IA que atende nutrizes 24/7. As telas ficam em `src/pages/private/eva/` (rotas privadas `/eva` e `/eva/chat`) e consomem o microserviço `nutriz-ia-service` (FastAPI, porta 8000) via WebSocket com streaming.

### Variáveis de ambiente

Em `.env.development`:

```
VITE_EVA_WS_URL=ws://localhost:8000
VITE_EVA_DEV_TOKEN=
```

- `VITE_EVA_WS_URL`: URL do WebSocket do IA service (endpoint `/ws/chat?token=<JWT>`).
- `VITE_EVA_DEV_TOKEN`: somente desenvolvimento. Quando preenchido, substitui o token da sessão logada (`useAuth().auth.token`) na conexão do chat — útil quando o login E2E não está disponível. Deixe vazio em qualquer outro cenário.

### Subindo o backend da EVA

```bash
# no repositório nutriz-ia-service
docker compose up -d
```

Isso sobe a API na porta 8000 e o banco pgvector com migrations. Para gerar um token de teste (validade 4h), no repositório do IA service:

```bash
python -c "import jwt; from datetime import datetime, timedelta, timezone; from app.config import settings; print(jwt.encode({'id_user':'<UUID_DA_USUARIA>','exp':int((datetime.now(timezone.utc) + timedelta(hours=4)).timestamp())}, settings.JWT_SECRET, algorithm=settings.JWT_ALGORITHM))"
```

### Rodando o E2E manual

```bash
pnpm install
pnpm dev        # http://localhost:5173
```

Como `/eva` é rota privada, semeie a sessão no console do navegador (F12) com o token gerado acima:

```js
localStorage.setItem("data", JSON.stringify({ token: "<TOKEN>", id_user: "<UUID_DA_USUARIA>", name: "Usuaria Teste", type: "common", addresses: [] }));
location.reload();
```

Depois abra `http://localhost:5173/eva`, inicie a conversa e verifique o streaming da resposta chunk a chunk. O chat mantém a mesma conexão WebSocket durante toda a sessão; close codes `4001` (sessão expirada) e `4003` (sem consentimento LGPD) bloqueiam o input com aviso, e quedas de conexão disparam reconexão com backoff (1s → 2s → 4s) antes do erro com "Tentar novamente".

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
