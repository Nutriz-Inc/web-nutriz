# Design system Nutriz

Tokens e padrões visuais introduzidos no redesign da **home da doadora**
(`src/pages/private/home`). Esta tela é a âncora visual do sistema — as
próximas telas devem seguir o que está aqui, em vez de repetir hex soltos.

Tudo vive em `src/index.css`, no bloco final marcado como
_"Design system Nutriz — camada ADITIVA"_.

> ⚠️ **A camada é aditiva de propósito.** Nenhum token do shadcn
> (`--primary`, `--background`, `--radius`, `--font-sans`) foi redefinido,
> porque o restante do app (landing, artigos, central de conteúdos, cadastro,
> login) usa hex hardcoded e a escala de radius antiga. Ao evoluir o tema,
> mantenha essa regra: **adicione, não substitua.**

---

## Paleta

Definida em `oklch` no `:root` e exposta ao Tailwind via `@theme inline`.

| Token | Utilitário | Uso |
|---|---|---|
| `--blue-deep` | `text-blue-deep` `bg-blue-deep` | Títulos de seção, texto sobre fundo claro, início do gradiente |
| `--blue` | `text-blue` `bg-blue` | Links, valores de destaque secundários |
| `--blue-bright` | `text-blue-bright` | Rótulos de seção em caixa alta, fim do gradiente |
| `--blue-tint` | `bg-blue-tint` | Chips e superfícies suaves, hover de botão claro |
| `--blue-tint-2` | `bg-blue-tint-2` `border-blue-tint-2` | Bordas, separadores, texto secundário sobre azul |
| `--eva` | `text-eva` | Rótulo da seção "Rede de apoio", ícone de coração |
| `--eva-bright` / `--eva-tint` | `bg-eva-tint` | Chips e blobs da camada afetiva |
| `--surface` … `--surface-3` | `bg-surface` | Superfícies brancas / cinzas de card |
| `--ink` / `--ink-2` / `--ink-3` | `text-ink` `text-ink-2` | Texto sobre fundo claro |
| `--canvas` | `bg-canvas` | Fundo da página |

### Regra de contraste (WCAG AA)

- **`text-ink-3` não passa AA em texto pequeno sobre branco** (≈2,9:1). O
  design usava `ink-3` nos textos auxiliares dos cards; aqui eles usam
  **`text-ink-2`** (≈8:1). Reserve `ink-3` para elementos decorativos ou
  texto grande.
- Sobre `gradient-blue`, use **`text-white`** ou **`text-blue-tint`** em texto
  pequeno. `text-blue-tint-2` só em texto grande (≥24px bold), onde 3:1 basta.

---

## Tipografia

**IBM Plex Sans** é a família única do sistema, via `@fontsource-variable/ibm-plex-sans`.
Não há pareamento de fontes: display e corpo são a mesma família, diferenciados
por peso e tamanho.

| Token | Aponta para | Uso |
|---|---|---|
| `font-sans` | IBM Plex Sans Variable | Fonte global do app |
| `font-display` | `var(--font-sans)` | Títulos, números grandes, rótulos em caixa alta |
| `font-body` | `var(--font-sans)` | Corpo de texto |

> O design original usava Bricolage Grotesque + Inter Tight. Foram trocados a
> pedido do time: o pareamento deixava os micro-títulos com aparência genérica.
> As dependências antigas (`bricolage-grotesque`, `inter-tight`, `geist`,
> `archivo`) foram removidas do projeto.
>
> ⚠️ O eixo de peso do IBM Plex Sans vai de **100 a 700** — não existe 800.
> Use `font-bold` no lugar de `font-extrabold`: o 800 é truncado para 700
> silenciosamente, então o código fica dizendo uma coisa e renderizando outra.
>
> O widget da EVA fixa a própria família (`Plus Jakarta Sans` em
> `eva.css`) e não é afetado por mudanças no tema.

Padrão de rótulo de seção:
`font-display text-xs font-bold uppercase tracking-[0.12em]`.
O `tracking` foi reduzido de `0.22em` para `0.12em` — o espaçamento exagerado
era parte do que deixava os micro-títulos com cara de template.

---

## Radius

O `--radius` base do shadcn (`0.625rem`) segue intacto — botões, inputs e
sheets não mudaram. O que foi reduzido foi a **escala de card**, porque o
arredondamento anterior era exagerado e descaracterizava o produto:

| Utilitário | Antes | Agora |
|---|---|---|
| `rounded-xl` | 14px | **12px** |
| `rounded-2xl` | 18px | **14px** |
| `rounded-3xl` | 22px | **16px** |
| `rounded-4xl` | 26px | **18px** |

Os cards do novo design usam dois utilitários próprios, responsivos:

| Utilitário | Mobile | ≥640px | Uso |
|---|---|---|---|
| `rounded-card` | `0.875rem` | `1.125rem` | Cards grandes: hero, mural de histórias |
| `rounded-card-sm` | `0.75rem` | `0.875rem` | Cards de conteúdo: estatística, status |

> O design original do Lovable trazia cantos assimétricos de até `3.25rem`
> (`rounded-[2.75rem_3.25rem…]`). Foram abandonados a pedido do time: o
> excesso de arredondamento deixava a tela com aparência genérica.

---

## Sombras

| Utilitário | Uso |
|---|---|
| `shadow-soft` | Card em repouso |
| `shadow-lift` | Hero e hover de card (`hover:shadow-lift`) |

---

## Gradientes

| Utilitário | Quando usar |
|---|---|
| `gradient-blue` | **Um por tela**, no bloco de maior hierarquia (o hero). Nunca em cards secundários |
| `gradient-milk` | Fundos de seção que precisam de uma transição suave para o branco |
| `gradient-eva` | Somente superfícies ligadas à camada afetiva/EVA |

## `ink-blob`

Forma orgânica desfocada de fundo. Sempre em `<span>` com
`aria-hidden="true"`, dentro de um contêiner `relative isolate overflow-hidden`,
combinada com `blur-2xl`/`blur-3xl` e uma cor de tint em baixa opacidade.

---

## Componentes compartilhados

| Componente | Caminho | Uso |
|---|---|---|
| `SectionHeading` | `src/components/full/SectionHeading.tsx` | Rótulo em caixa alta + título de seção (`tone="blue" \| "eva"`, `actionSlot`) |
| `Reveal` | `src/components/full/Reveal.tsx` | Reveal on-scroll sutil; respeita `prefers-reduced-motion` |
| `ImpactCard` | `src/pages/private/home/components/ImpactCard.tsx` | Card de estatística (`tone`, `featured`) |

### Button

Dois tamanhos novos, aditivos, em `src/components/ui/button.tsx`:

- `size="pill"` — `h-11`, cantos totalmente arredondados. CTA principal.
- `size="icon-pill"` — `size-11`, circular. Botões de ícone com alvo ≥44px.

As variantes e tamanhos antigos não foram alterados.

---

## Layout

Contêiner padrão das telas do novo design:

```
mx-auto w-full max-w-[1400px] px-5 sm:px-6 lg:px-10
```

Margens laterais menores que as anteriores (`px-20` no desktop) a pedido de
produto, com o padding mobile preservado em `px-5`.
