# Polimento final — auditoria (Fase 0)

Branch: `polish/acabamento-final`, criada de `develop` em `4349fc5`.
Data: 04/09/2026. Estado inicial: `tsc` verde, `vite build` verde, Biome com 8
erros e 19 avisos — todos pré-existentes.

> **Método.** Esta auditoria foi feita por **varredura de código**, com scripts
> que contam e medem. Contraste foi calculado a partir dos tokens em oklch,
> convertidos para sRGB. O que **não** foi verificado: jank a 60fps no DevTools
> Performance e conferência visual tela a tela — não tenho sessão de navegador
> autenticada. Os itens que dependem disso estão marcados como
> **não verificável por mim**.

---

## 1. Código

| Item | Medido | Onde |
|---|---|---|
| Comentários | **110** (83 de linha, 27 de bloco, 8 em JSX) em **37 arquivos** | Concentrados nas telas de rota |
| `console.*` | **1** | `pages/private/eva/hooks/use-eva-chat.ts:24` |
| `any` | **0** | — |
| Arquivos nunca importados | **6** | ver abaixo |
| Biome | 8 erros, 19 avisos | pré-existentes |

### Comentários — top 10 arquivos

| Nº | Arquivo |
|---|---|
| 17 | `routes/list/components/RouteMiniMap.tsx` |
| 9 | `routes/detail/index.tsx` |
| 9 | `routes/detail/components/RouteMap.tsx` |
| 7 | `routes/list/components/CreateRouteDialog.tsx` |
| 6 | `routes/detail/components/RouteStopList.tsx` |
| 5 | `routes/detail/constants.ts` |
| 4 | `routes/list/index.tsx`, `routes/list/components/StopsPicker.tsx`, `routes/detail/hooks/index.ts`, `components/full/HeroBackground.tsx`, `components/full/ExpandableText.tsx` |

Os demais 26 arquivos têm 1–3 cada.

⚠️ **Ponto a decidir.** A maioria desses comentários explica *por que* uma
decisão foi tomada — o `-mt-1.5` do cartão da parada atual, o motivo de o
marcador do celular usar `wrapperClassName`, a razão de o tile do mapa ficar
claro no tema escuro. Remover tudo cumpre o pedido, mas apaga o raciocínio que
evitou bugs de repetição. **Está tudo registrado no vault do Obsidian**
(`05-diario/`), então a informação não se perde — só sai do código.

### `console.*` — o único caso

`use-eva-chat.ts:24` é um `console.warn`. Preciso ler o contexto antes de
remover: se for aviso de configuração ausente (env não definida), é tratamento
real e **fica**; se for debug, sai. Classificado como **verificar antes**.

### Arquivos nunca importados (0 referências cada)

- `assets/icons/ClockIcon.tsx`
- `assets/icons/HeartIcon.tsx`
- `assets/icons/LinkedinIcon.tsx`
- `assets/icons/ShieldIcon.tsx`
- `hooks/use-count-up.ts`
- `pages/private/eva/components/suggestion-chips.tsx`

⚠️ `suggestion-chips.tsx` é da EVA. A regra da missão diz para não tocar na
lógica da EVA. O arquivo não é importado por ninguém, mas **proponho reportar e
não deletar** — risco desnecessário perto da apresentação.

---

## 2. Consistência visual

### Border-radius — dispersão alta

| Classe | Ocorrências |
|---|---|
| `rounded-full` | 212 |
| `rounded-xl` | 94 |
| `rounded-card-sm` | 84 |
| `rounded-lg` | 35 |
| `rounded-2xl` | 32 |
| `rounded-card` | 21 |
| `rounded-md` | 11 |
| `rounded-3xl` | 4 |
| `rounded-sm` | 3 |

O projeto tem **dois tokens semânticos** (`rounded-card`, `rounded-card-sm`) mas
usa muito mais os genéricos. `rounded-xl` (94) provavelmente cumpre o papel de
"cartão" em metade das telas enquanto a outra metade usa `rounded-card-sm`.
**É a maior fonte de inconsistência visual do projeto.**

### Sombras

| Classe | Ocorrências |
|---|---|
| `shadow-soft` | 69 |
| `shadow-lift` | 23 |
| `shadow-nudge` | 1 |

Coerente. `shadow-nudge` com 1 uso único é candidato a revisão.

### Cores fora dos tokens — 45 ocorrências em TSX

| Nº | Arquivo | Natureza |
|---|---|---|
| 13 | `components/full/HeroBackground.tsx` | gradiente em malha e véus do vídeo |
| 4 | `routes/detail/components/RouteMap.tsx` | ícone Leaflet (HTML string) |
| 3 | `landing-page/components/HowItWorksSection.tsx` | — |
| 3 | `landing-page/components/HeroSection.tsx` | `#72f2eb` do título e do badge |
| 3 | `donation-points/components/MapPreview.tsx` | ícone Leaflet |
| 5 | `assets/icons/*.tsx` (4 arquivos) | ícones órfãos |
| 1 cada | `ActivityBadge`, `RouteMiniMap`, `StepHelpCard`, `create/index.tsx` | — |

⚠️ **Nem todas devem virar token.** Os marcadores do Leaflet são montados como
**string HTML** injetada no DOM — classe Tailwind não funciona ali. Dá para usar
`var(--token)` no CSS inline (foi o que fiz no `RouteMap` para verde/vermelho),
mas isso **não é um token Tailwind**, é CSS var. O gradiente do
`HeroBackground` são 7 camadas de `radial-gradient` com alfa — viraria um token
por camada, o que é pior que o problema.

**Proposta:** converter só o que tem token equivalente direto (o `#72f2eb` do
hero, se corresponder a `mint-bright` ou similar) e **reportar o resto como
justificado**.

---

## 3. Acessibilidade

### Contraste — MEDIDO (oklch → sRGB → WCAG)

| Par | Claro | Escuro | Status |
|---|---|---|---|
| `ink` / `surface` | 16,35 | 13,82 | AA ok |
| `ink-2` / `surface` | 8,09 | 9,14 | AA ok |
| `ink-3` / `surface` | 5,17 | 6,12 | AA ok |
| `ink` / `canvas` | 14,65 | 15,25 | AA ok |
| `ink-2` / `canvas` | 7,25 | 10,09 | AA ok |
| `ink-3` / `canvas` | 4,63 | 6,76 | AA ok |
| `ink-3` / `surface-2` | 4,90 | 5,42 | AA ok |
| `blue-deep` / `surface` | 13,03 | 8,13 | AA ok |
| `blue-deep` / `blue-tint` | 11,34 | 6,82 | AA ok |
| `blue-bright` / `surface` | 5,33 | 7,06 | AA ok |
| `danger` / `danger-tint` | 6,15 | 6,05 | AA ok |
| `success` / `success-tint` | 5,45 | 7,36 | AA ok |
| `warning` / `warning-tint` | 5,86 | 7,56 | AA ok |
| `purple` / `purple-tint` | 5,97 | 6,11 | AA ok |
| `magenta` / `magenta-tint` | 6,31 | 6,02 | AA ok |
| `eva-deep` / `eva-tint` | 4,60 | 6,53 | AA ok |
| **`teal` / `teal-tint`** | **4,49** | 7,31 | ⚠️ **falta 0,01** |
| **`amber` / `amber-tint`** | **1,64** | 8,03 | ❌ **reprova** |

**Duas conclusões que mudam o plano:**

1. **O `amber` reprova feio (1,64) mas tem ZERO usos** — `text-amber` e
   `amber-tint` não aparecem em nenhum `.tsx`. É token sujo, não bug. **Custo de
   correção: nenhum impacto visual.**

2. **O `ink-3` está OK** (5,17 e 4,63). O [[backlog]] do vault diz "corrigir
   contraste `ink-3` (2,64:1, 147 usos)" — **essa anotação está desatualizada**,
   alguém já corrigiu o token. Item pode sair do backlog.

3. **O `teal` erra por 0,01** (4,49 contra 4,5 exigido). Usado no
   `Badge tone="teal"` em 5 telas: gestão de doações, minhas doações, detalhe da
   doação e a landing. Escurecer o `--teal` do tema claro em um passo resolve, com
   mudança visual quase imperceptível.

### Alvos de toque abaixo de 44×44px — 7 casos

| Tamanho | Arquivo |
|---|---|
| 28px | `routes/detail/components/OpenInMapsButton.tsx:25` (variante compacta, celular) |
| 28px | `routes/detail/components/RouteStopItem.tsx:114` (remover parada, adm) |
| 32px | `users/list/components/UserSearchField.tsx:69` |
| 36px | `routes/detail/components/RouteDetailsCard.tsx:28` (lápis de editar) |
| 36px | `landing-page/components/LandingFooter.tsx:35` |
| 40px | `routes/detail/components/RouteStopItem.tsx:148` e `:162` (Cheguei / Imprevisto) |

⚠️ Os dois de 40px são **os botões que o motorista mais usa**, no celular.
Prioridade alta.

### Rótulos e ARIA

- **17 inputs** sem `id` nem `aria-label`, em 12 arquivos. Inclui componentes
  genéricos (`ui/input.tsx`, `full/SearchBar.tsx`) que podem receber o rótulo do
  pai — **precisa checar caso a caso**, o número bruto superestima.
- **12 botões só com ícone** sem `aria-label`: `CopyableId`, `FaqItem`,
  `VideoPreviewCard`, `ChangeLocationSheet`, `AddStepToRouteButton`,
  `UpdateStepDescriptionForm`, `CreateAppointmentSheet`, `UpdateStepStatusForm`,
  `AddBabyButton`, `CreateRouteDialog:423`, `DeactivateUserSheet`,
  `CreateUserSheet`.
- **Imagens sem `alt`: 0.** (Um grep linha a linha acusa 28, mas é falso
  positivo — o atributo está na linha seguinte em JSX multilinha.)

### Estrutura

- `<main>` 6 · `<header>` 2 · `<nav>` 7 · `<footer>` 3 · `<section>` 32
- **Skip link existe e está ativo** (`App.tsx:67`) — item já cumprido.
- Headings: 5 `h1`, 17 `h2`, 9 `h3`. Os `h1` vêm do componente `Page`, então a
  contagem baixa é esperada. Oito componentes começam em `h3` — são cartões
  dentro de seções com `h2`, provavelmente corretos. **Precisa de verificação
  por página renderizada, não por arquivo.**

---

## 4. Animações

- **`whileInView`: 4 usos, todos com `viewportOnce`** (`{ once: true,
  margin: "-80px" }`, em `lib/motion.ts`). ✅ Item já cumprido.
- **Propriedade cara animada: 1 caso** —
  `content-hub/components/FaqItem.tsx:40` anima `height: "auto"`.
  ⚠️ É o caso clássico em que `transform` **não** substitui: acordeão de altura
  desconhecida. Converter para `scaleY` distorce o conteúdo. A alternativa
  correta seria medir a altura e animar, o que é reescrita. **Proponho manter e
  reportar.**
- **Jank a 60fps: não verificável por mim** (exige DevTools Performance com a
  aplicação rodando).

---

## 5. Estados

| Estado | Situação |
|---|---|
| Loading | **Inconsistente.** Spinner (`LoaderCircle`) em 54 pontos / 26 arquivos; skeleton (`animate-pulse`) em 3 pontos / 3 arquivos (`minhas-doacoes`, `StepTimelineSheet`, `RouteDriverCard`) |
| Feedback | `toast` só em `App.tsx` e `hooks/use-step-alerts.ts` — **verificar se as ações de salvar/criar/excluir dão retorno visível** |
| Vazio | `EmptyState` compartilhado existe e aceita ilustração; usado em várias telas |

**Proposta:** padronizar para **spinner** (é a maioria esmagadora) e converter os
3 pontos de skeleton — ou o inverso, se você preferir skeleton. É decisão sua.

---

## 6. Pedido específico — imagens na listagem de paradas

Estado atual (corrigido ontem, `d3d4302`): a imagem trava pela **altura** e a
largura segue, com teto de 110px no celular, então ela **encolhe inteira em vez
de cortar**.

O que a missão pede agora é diferente: **se não couber, não mostrar**.

⚠️ **Observação honesta:** a arte no rodapé da lista de paradas é **puramente
decorativa** e a própria missão diz que "listagem é sobre dados, não sobre
decoração". Some isso ao peso — **~4 MB de PNG** para as três artes. A opção mais
alinhada ao pedido seria **remover a arte da listagem** e manter apenas no estado
vazio (onde ela informa que não há nada). Mas você pediu essas artes
explicitamente ontem e decidiu mantê-las no celular. **Preciso da sua decisão.**

---

## 7. Bugs encontrados

Nenhum bug funcional novo encontrado na varredura de código. Os pontos abertos
são os já conhecidos e registrados:

- Chip "Erro" na listagem depende de filtro no cliente porque o backend recusa
  `status=error` (pendência do Léo).
- Badge cinza que você relatou: o código mapeia `error` → vermelho
  (`bg-danger-tint text-danger`) e o backend devolve `"error"`. O único status
  cinza é `canceled` → "Cancelada". **Aguardando sua confirmação de qual badge
  era.**

---

## 8. Peso de mídia (pré-existente, em produção)

- vídeo do hero: **4 MB**
- três artes de rota em PNG: **~4 MB**

Contra ~10 KB das demais ilustrações (SVG). Converter para WebM/WebP resolve sem
perda visível. **Não há ferramenta de mídia instalada no repo.**

---

# Correções aplicadas (Fases 1 e 2)

## ⚠️ Correção do relatório da Fase 0

Três números que eu apresentei estavam **errados**, por detecção minha ruim.
Os valores certos, verificados:

| Item | Eu disse | Real | Por que errei |
|---|---|---|---|
| Botões só com ícone sem `aria-label` | 12 | **0** | descartei `{expressão}` como se não fosse texto visível — os botões têm rótulo vindo de variável |
| Inputs sem rótulo | 17 | **6** | a regex parava no `>` do `=>` de arrow function; e 7 estão dentro de `<label>`, o que já dá nome acessível |
| Imagens sem `alt` | 0 | 0 | ✅ esse estava certo |

## Commits

| Commit | O que |
|---|---|
| `3e8945f` | remove 110 comentários de 26 arquivos; preserva 12 pragmas |
| `950b81b` | remove 5 arquivos órfãos |
| `81d1e5a` | imagens da listagem de paradas medidas por `ResizeObserver` |
| `55e8eca` | 4 hex → tokens (`mint`, `mint-bright`, `blue`, `blue-bright`) |
| `83185f8` | `--teal` L 0.521 → 0.516 |
| `4eda071` | `aria-label` em 6 inputs |
| `de0e1e1` | "Cheguei"/"Imprevisto" 40px → 44px |

## Contraste — antes e depois

| Par | Antes | Depois | AA |
|---|---|---|---|
| `teal` / `teal-tint` (claro) | **4,49** | **4,58** | ✅ |
| `teal` / `surface` (claro) | 5,13 | 5,23 | ✅ |
| branco / `teal-fill` | 5,13 | 5,23 | ✅ |
| `amber` / `amber-tint` | 1,64 | 1,64 | não corrigido — par nunca renderiza |

## Alvos de toque

| Antes | Depois | Elemento |
|---|---|---|
| 40px | **44px** | "Cheguei" e "Imprevisto" (motorista, toda parada) |

Mantidos abaixo de 44px, todos acima do mínimo de 24px do WCAG 2.5.8 (AA):
`OpenInMapsButton` 28px, remover parada 28px, limpar busca 32px, lápis de editar
36px, redes sociais do rodapé 36px.

---

# Fase 3.1 — tabela de padronização (AGUARDANDO APROVAÇÃO)

## O que os raios realmente valem

| Classe | Celular | ≥640px |
|---|---|---|
| `rounded-card` | 14px | **18px** |
| `rounded-card-sm` | 12px | **14px** |
| `rounded-2xl` | 14px | 14px |
| `rounded-xl` | 12px | 12px |
| `rounded-lg` | 10px | 10px |

**A descoberta:** `rounded-xl` é idêntico a `rounded-card-sm` **no celular** e 2px
menos redondo no desktop. `rounded-2xl` idêntico a `rounded-card` no celular e
4px menos no desktop. A diferença entre os tokens semânticos e os genéricos não é
o raio — é que **só os semânticos crescem em tela grande**.

## Raio dominante por tela

| Tela | Hoje | Deveria ser |
|---|---|---|
| home | `rounded-card-sm` (4) + `card` (2) | ✅ referência |
| dashboard | `rounded-card-sm` (9) | ✅ |
| central de conteúdos | `rounded-card-sm` (6) | ✅ |
| perfil | `rounded-card-sm` (3) | ✅ |
| minhas doações | `rounded-2xl` (4) | → `rounded-card` |
| pontos de coleta | `rounded-xl` (6) | → `rounded-card-sm` |
| rotas (listagem) | `rounded-lg` (6) + `xl` (5) | → `rounded-card-sm` |
| rotas (detalhe) | `rounded-xl` (16) | → `rounded-card-sm` |

## Padding de cartão

| Tela | Hoje |
|---|---|
| home | `p-6` (24px) |
| perfil | `p-6` / `p-5` |
| rotas (detalhe) | `p-5` (20px) |
| minhas doações | `p-5` / `p-3.5` |
| central de conteúdos | `p-4` / `p-5` |

Referência da home: **`p-6`**. Divergência real está em `p-3.5` e `p-4`.

---

# Fases 4 a 6 — medido no navegador

A partir daqui a auditoria deixou de ser só leitura de código: subi o Vite e
rodei Chromium headless (Playwright via `npx`, **sem entrar no package.json**)
em **390px** e **1440px** nas quatro telas públicas.

## Responsividade — item 16 da validação

| Tela | 390px | 1440px |
|---|---|---|
| landing | **0px** de overflow | **0px** |
| login | **0px** | **0px** |
| cadastro | **0px** | **0px** |
| artigos | **0px** | **0px** |

**Zero scroll horizontal em todas as combinações.** Os elementos que o script
apontou "fora da viewport" são os `ink-blob` (borrões decorativos posicionados
em negativo de propósito, com o pai em `overflow-hidden`) e o trilho do
carrossel de depoimentos — nenhum gera overflow real.

## Estrutura — itens 19, 20 e 26

| Tela | `<main>` | `<h1>` | `#conteudo` | Salto de heading |
|---|---|---|---|---|
| landing | ✅ | ✅ | ✅ | nenhum |
| login | ✅ | ✅ | ✅ | nenhum |
| cadastro | ✅ | ✅ | ✅ | nenhum |
| artigos | ✅ | ✅ | ✅ | nenhum |

Hierarquia da landing medida no DOM: `[1,2,3,3,3,3,2,2,2,3,3,3,3,2,2,3,3]` —
sem pular nível. O `#conteudo` confirma que o skip link tem alvo real agora.

## Alvos de toque — medidos, antes e depois

| Elemento | Antes | Depois |
|---|---|---|
| "Ler artigo" (landing) | 78×20 | **min-h-6** |
| "Entrar" (cadastro) | 42×18 | **min-h-6** |
| links do rodapé | 97×21 | **min-h-6** |
| pontinhos do carrossel | 8×8 | **≥24px** via `::before` |
| Leaflet / Esri | 51×14 e 21×14 | não corrigidos — markup da biblioteca |

Nos pontinhos, verificado com `elementFromPoint`: o clique pega 12px acima e 8px
para cada lado, com o ponto visual ainda em 8px.

## O vídeo do hero — falso alarme

Nos prints o vídeo não aparece, e cheguei a suspeitar de bug em produção.
Investigado: `video.error = 4` (`MEDIA_ERR_SRC_NOT_SUPPORTED`), mas o arquivo é
**H.264** (`ftypisom…avc1mp41`) e chega com HTTP 200/206.

A causa é o Chromium do Playwright, que vem **sem codecs proprietários**. Em
Chrome, Edge, Firefox ou Safari o vídeo toca normalmente. **Não há bug** — mas
significa que nenhum print meu vai mostrar o hero com vídeo.

## Ainda não verificado

As telas privadas (home, minhas doações, timeline, pontos de coleta, perfil,
rotas nas 3 roles, EVA) exigem login. Sem credencial de teste, tudo acima vale
só para as 4 telas públicas.
