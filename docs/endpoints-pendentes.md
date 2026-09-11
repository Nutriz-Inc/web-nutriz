# Endpoints pendentes — artigos e notificações

Especificação do que o `nutriz-backend-service` (Go) precisa expor para as duas
features ficarem possíveis. Nada disso existe hoje: a Fase 0 confirmou que não
há entidade, tabela nem endpoint de artigo ou de notificação, e que o Kafka está
configurado mas **nenhum evento de domínio é publicado**.

Escrito para ser lido pelo time de backend. As convenções seguem as que o
próprio repositório já usa: rotas sob `/internal`, paginação
`{data, page, page_size, total}`, IDs `VARCHAR(36)`, soft delete em
`removed_at`/`removed_by`, auditoria em `created_by`/`updated_by`, header
`action-by` com o id de quem age.

---

# Parte 1 — Artigos

## Situação atual

Os artigos são um **arquivo TypeScript estático** no front
(`src/pages/public/articles/data.ts`): 8 artigos, com as imagens importadas de
`src/assets/artigos/` e empacotadas no build. O renderer entende **4 tipos de
bloco**: `h` (título), `p` (parágrafo), `list` (lista) e `callout` (destaque).

Para o adm criar artigo pelo painel, o conteúdo precisa sair do bundle e virar
dado.

## Entidade sugerida

```sql
CREATE TABLE article (
  id_article      VARCHAR(36) PRIMARY KEY,
  slug            VARCHAR(160) NOT NULL UNIQUE,
  title           VARCHAR(160) NOT NULL,
  summary         VARCHAR(400) NOT NULL,
  category        VARCHAR(30)  NOT NULL,
  status          VARCHAR(20)  NOT NULL DEFAULT 'draft',
  cover_image_url TEXT,
  cover_alt       VARCHAR(200),
  author_name     VARCHAR(120) NOT NULL,
  author_bio      VARCHAR(300),
  read_time_min   INT,
  takeaways       JSONB NOT NULL DEFAULT '[]',
  blocks          JSONB NOT NULL DEFAULT '[]',
  rblh_validated  BOOLEAN NOT NULL DEFAULT false,
  published_at    TIMESTAMP,
  created_at      TIMESTAMP NOT NULL DEFAULT now(),
  created_by      VARCHAR(36) NOT NULL,
  updated_at      TIMESTAMP,
  updated_by      VARCHAR(36),
  removed_at      TIMESTAMP,
  removed_by      VARCHAR(36)
);
```

`category`: `Amamentação` | `Nutrição` | `Acolhimento` | `Cuidados`
`status`: `draft` | `published`

**`blocks` como JSONB, não tabela filha.** O bloco só existe dentro do artigo,
sempre é lido junto e a ordem é o próprio índice do array. Tabela filha traria
join e uma coluna de ordem para manter na mão, sem ganho: ninguém consulta bloco
solto.

### Formato dos blocos

O front já consome estes quatro e o renderer vai ser estendido para os outros
quatro. Um bloco é um objeto com **uma única chave**, que identifica o tipo:

```json
[
  { "h": "O frasco ideal" },
  { "p": "Use sempre frascos de vidro com tampa plástica." },
  { "list": ["Ferva por 15 minutos", "Seque naturalmente"] },
  { "callout": "Nunca armazene na porta da geladeira." },
  { "image": { "url": "https://...", "alt": "Frascos em freezer", "caption": "opcional" } },
  { "video": { "url": "https://...", "title": "Como esterilizar", "duration": "3:42" } },
  { "quote": { "text": "Cada gota conta.", "author": "Dra. Mariana Costa" } },
  { "divider": true }
]
```

O backend **não precisa validar o conteúdo de cada bloco** além de ser JSON
válido e array — a validação de forma é do editor. O que o backend precisa
garantir é o resto: `title`, `summary`, `category` e pelo menos um bloco.

### `rblh_validated`

É o selo "Validado por rBLH e Fiocruz". Afirmação de validação por órgão de
saúde: só pode ser gravado quando for verdade. Vale considerar restringir a
marcação a um perfil específico, ou registrar quem marcou.

## Endpoints

| Método | Rota | Quem | Para quê |
|---|---|---|---|
| `GET` | `/public/article` | qualquer um | lista de publicados (landing e leitura) |
| `GET` | `/public/article/:slug` | qualquer um | artigo publicado por slug |
| `GET` | `/internal/article` | adm | lista com rascunhos, filtros e busca |
| `GET` | `/internal/article/:id` | adm | artigo para edição |
| `POST` | `/internal/article` | adm | cria (nasce `draft`) |
| `PATCH` | `/internal/article/:id` | adm | atualiza campos e blocos |
| `PATCH` | `/internal/article/:id/status` | adm | publica / despublica |
| `DELETE` | `/internal/article/:id` | adm | soft delete |
| `POST` | `/internal/upload/image` | adm | **não existe nada de upload no projeto** |

### `GET /public/article`

Query: `page`, `page_size`, `category` (opcional).
Só `status = 'published'` e `removed_at IS NULL`, mais recentes primeiro.

```json
{
  "data": [
    {
      "id_article": "...", "slug": "como-armazenar-leite",
      "title": "...", "summary": "...", "category": "Cuidados",
      "cover_image_url": "...", "cover_alt": "...",
      "author_name": "...", "read_time_min": 4,
      "rblh_validated": true, "published_at": "2026-07-12T10:00:00Z"
    }
  ],
  "page": 1, "page_size": 10, "total": 8
}
```

A lista **não traz `blocks`** — é payload grande e ninguém usa na listagem.

### `GET /public/article/:slug`

O objeto acima **mais** `blocks`, `takeaways` e `author_bio`. 404 se não existir
ou não estiver publicado.

### `GET /internal/article`

Query: `page`, `page_size`, `status`, `category`, `title` (busca parcial).
Inclui rascunho. Mesma forma de resposta da lista pública, mais `status`,
`created_at` e `updated_at`.

### `POST /internal/article`

Header `action-by`. Body:

```json
{
  "title": "...", "summary": "...", "category": "Cuidados",
  "cover_image_url": "...", "cover_alt": "...",
  "author_name": "...", "author_bio": "...",
  "read_time_min": 4, "takeaways": ["...", "..."],
  "blocks": [ ... ], "rblh_validated": false
}
```

Responde o artigo criado com `status: "draft"` e o `slug` gerado do título
(minúsculo, sem acento, hífens; sufixo numérico em caso de colisão). **201.**

### `PATCH /internal/article/:id/status`

```json
{ "status": "published" }
```

Ao publicar pela primeira vez, gravar `published_at`. Despublicar (`draft`)
**não** apaga `published_at` — serve de histórico.

### `POST /internal/upload/image`

Não existe nada de upload no backend hoje — nenhum `multipart`, nenhum
`FormFile`, nenhum storage. É a maior dependência desta feature e vale decidir
antes do resto:

- `multipart/form-data`, campo `file`
- aceitar `image/jpeg`, `image/png`, `image/webp`
- limite sugerido: 5 MB
- resposta: `{ "url": "https://..." }`

Onde hospedar é decisão de infra (bucket, Cloudinary, disco do serviço). Se a
decisão demorar, o editor pode trabalhar só com **URL externa** na v1 — o campo
já é uma URL, então o upload entra depois sem migration.

## Permissões

Criar, editar, publicar e excluir: **apenas `adm`**, validado no backend. O gate
de UI não conta — a Fase 0 desta missão achou exatamente esse tipo de buraco no
serviço de IA (papel novo que nunca entrou no gate do backend).

---

# Parte 2 — Notificações

## Situação atual

Não existe entidade, tabela nem endpoint. E, mais importante: **nenhum evento de
domínio é publicado hoje**. O Kafka está configurado (`config/kafka.go`,
`shared/module/main.go`), mas não há produtor nem consumidor de negócio. Ou
seja, a feature não é só "expor uma lista" — é decidir onde os eventos nascem.

## Entidade sugerida

```sql
CREATE TABLE notification (
  id_notification VARCHAR(36) PRIMARY KEY,
  id_user         VARCHAR(36) NOT NULL,
  type            VARCHAR(40) NOT NULL,
  title           VARCHAR(120) NOT NULL,
  description     VARCHAR(300),
  priority        VARCHAR(10) NOT NULL DEFAULT 'normal',
  action_path     VARCHAR(200),
  entity_type     VARCHAR(30),
  entity_id       VARCHAR(36),
  read_at         TIMESTAMP,
  created_at      TIMESTAMP NOT NULL DEFAULT now(),
  created_by      VARCHAR(36) NOT NULL
);

CREATE INDEX idx_notification_user_unread
  ON notification (id_user, read_at, created_at DESC);
```

`priority`: `normal` | `high`
`action_path`: caminho no front (`/rotas/abc`, `/minhas-doacoes`) — o backend
não precisa conhecer as telas, só repassar o que quem criou definiu.

⚠️ **`title` e `description` são lidos por humanos e podem carregar dado
clínico** se forem montados a partir de texto livre (é o mesmo risco que levou o
serviço de IA a não espelhar `job` e `donation_step_timeline`). A recomendação é
montar os dois a partir de **templates fixos por `type`**, nunca concatenando
`description` de job ou de etapa.

## Endpoints

| Método | Rota | Para quê |
|---|---|---|
| `GET` | `/internal/notification` | lista do usuário do token |
| `GET` | `/internal/notification/unread-count` | só o contador, para o sino |
| `PATCH` | `/internal/notification/:id/read` | marca uma como lida |
| `PATCH` | `/internal/notification/read-all` | marca todas como lidas |
| `DELETE` | `/internal/notification/read` | limpa as já lidas |

### `GET /internal/notification`

Query: `page`, `page_size`, `type` (opcional), `only_unread` (opcional).
**Sempre filtrado pelo usuário do token** — nunca por `id_user` vindo do
cliente.

```json
{
  "data": [
    {
      "id_notification": "...", "type": "route_assigned",
      "title": "Nova rota atribuída",
      "description": "Coletas zona sul, 3 paradas",
      "priority": "normal", "action_path": "/rotas/abc",
      "read_at": null, "created_at": "2026-09-11T12:30:00Z"
    }
  ],
  "page": 1, "page_size": 20, "total": 34
}
```

### `GET /internal/notification/unread-count`

```json
{ "count": 3 }
```

Endpoint separado de propósito: o sino chama esse em intervalo curto, e ele
precisa ser barato (o índice acima cobre). A lista só é buscada quando o painel
abre.

## Tipos por papel

| Papel | `type` |
|---|---|
| common | `article_published`, `donation_step_changed`, `donation_warn`, `collection_scheduled`, `collection_reminder`, `milk_analysis_ready` |
| adm | `route_done`, `route_error`, `donation_created`, `donation_step_changed`, `donation_failed`, `donor_registered`, `job_overdue` |
| nurse | `job_assigned`, `job_due_soon`, `job_step_changed`, `donation_needs_attention` |
| driver | `route_assigned`, `route_changed`, `route_canceled`, `route_not_started` |

## Onde os eventos nascem

O que gera notificação já acontece no código — só não avisa ninguém:

| Evento | Onde | Notifica |
|---|---|---|
| etapa muda de status | `update-donation-step` | a nutriz dona + adm |
| doação criada | `create-donation` | adm |
| job criado | `create-job` | a enfermeira do `id_user` |
| job concluído/reprovado | `update-job` | adm |
| rota criada | `create-route` | o motorista do `id_driver` |
| parada adicionada/removida | `create-route-stop`, `remove-route-stop` | o motorista da rota |
| rota finalizada | `update-route` (`date_end`) | adm |
| usuário criado com `type=common` | `create-user` | adm |

Os quatro últimos tipos (`collection_reminder`, `job_due_soon`, `job_overdue`,
`route_not_started`) **não têm gatilho de request** — dependem de tempo, então
exigem um job agendado. Dá para deixar para uma segunda rodada: são os únicos
que precisam de scheduler.

## Atualização no front

Sem push de navegador nesta rodada (exigiria service worker, permissão e infra
de push). O plano é **polling do contador** (~60s) mais refetch ao abrir o
painel e ao focar a aba, que o React Query já faz. O WebSocket da EVA **não**
vai ser reaproveitado: responsabilidades distintas, e acoplar as duas faria a
notificação cair junto quando o chat cair.

---

# Resumo do que trava o quê

| Feature | Bloqueada por |
|---|---|
| Editor de artigos | tabela + CRUD + **decisão de hospedagem de imagem** |
| Leitura de artigos vinda da API | `GET /public/article` |
| Sino e painel de notificações | tabela + 5 endpoints |
| Notificação chegando sozinha | emissão de evento nos 8 pontos acima |

O front está pronto para começar assim que os contratos existirem: o padrão de
service por domínio (`src/services/`), hook de página com React Query e
componentes compartilhados já cobrem tudo que essas telas precisam.
