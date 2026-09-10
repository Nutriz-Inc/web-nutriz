# Refinamento premium

Branch `polish/refinamento-premium`, criada de `polish/acabamento-final`
(`ad49bf4`), que por sua vez saiu de `develop` em `4349fc5`.

Este documento continua o `docs/polimento-final.md`. Aquele passe cuidou de
acabamento medido — contraste, alvo de toque, raio de cartão, comentário morto.
Este cuida do que separa "funciona" de "parece caro": hierarquia, movimento,
vocabulário do domínio e os estados que aparecem quando não há dado.

> **Método e limites.** A auditoria foi feita por varredura de código com
> scripts que contam e medem, mais leitura tela a tela do JSX. O que **não**
> foi verificado nesta rodada: perfilagem a 60fps no DevTools Performance,
> conferência visual em aparelho real e regressão funcional contra o backend
> (EVA anônima, EVA logada, rota do motorista de ponta a ponta). Esses itens
> estão marcados como **não verificado** na tabela final — não como aprovados.

---

# Fase 0 — Auditoria

## Impacto alto

| # | Achado | Onde | Por que importa |
|---|---|---|---|
| 1 | **Quatro componentes de status** independentes, com vocabulário divergente para o mesmo conceito | `Status`, `DonationStatusBadge`, `AppointmentStatusBadge`, `RouteStatusBadge` | `pending` era "Pendente" na rota e "Aguardando" no agendamento; `failed` era "Erro" na doação e "Não Concluído" no agendamento |
| 2 | **Cor contrariando o significado** | mapa de cores do status | `review` saía verde (tom de sucesso) e `warn` saía vermelho (tom de erro) |
| 3 | **Zero skeleton no projeto** | busca por "skeleton" no `src` voltava 0 | Sete listas mostravam spinner genérico girando no vazio; o gate do `Page` mostrava três caixas cinza estáticas de `h-28`, iguais para dashboard, lista e detalhe |
| 4 | **Nenhuma transição de página** | os três grupos do router | `AnimatePresence` existia em quatro arquivos, todos para animação local — nunca no router. Toda navegação era corte seco |
| 5 | **Mensagem de erro crua do backend** | toast global | Mostrava `error.response.data.message` direto: texto técnico, possivelmente em inglês, possivelmente com nome de tabela |
| 6 | **Erro sem saída em 14 de 16 telas** | telas com query | Query que falhava deixava a tela em branco ou parada no carregamento; o único sinal era um toast passageiro |
| 7 | **404 em silêncio** | `routerPrivate()` e `publicRouter()` | URL desconhecida redirecionava sem dizer nada — quem digitava errado se via em outra tela sem entender por quê |
| 8 | **Toast único para 25 mutações** | `MutationCache` do `App` | Criar usuário, finalizar rota, salvar perfil e remover bebê confirmavam a mesma coisa: "Ação realizada com sucesso." |

## Impacto médio

| # | Achado | Medido | Por que importa |
|---|---|---|---|
| 9 | **Geometria de botão dispersa** | 6 alturas (`h-9`, `h-11`, `h-12`, `h-14`, `h-[43px]`, `h-[46px]`) e 6 raios (`full`, `xl`, `2xl`, `md`, `lg`, `card-sm`) só nas ações primárias | Dois botões primários lado a lado no mesmo fluxo saíam com forma diferente |
| 10 | **144 `<button>` crus contra 10 arquivos usando o `Button`** | varredura no `src` | O `Button` compartilhado só tinha as variantes do shadcn, que usam tokens (`bg-primary`) que este projeto não adota — sem variante que servisse, cada tela remontava o botão na mão |
| 11 | **Contadores estáticos** | landing, home, dashboard | A barra da landing vinha de constantes já formatadas como texto (`"4.200+"`); home e dashboard imprimiam o valor final direto. O hook `use-count-up` existia, órfão |
| 12 | **Grids entrando de uma vez** | dashboard, rotas, detalhe do usuário, central de conteúdos | Todos os cartões no mesmo quadro, sem sequência |
| 13 | **Bolhas da EVA sem animação** | `message-bubble` | Nenhuma linha de animação: cada mensagem aparecia em pop seco no meio da conversa |
| 14 | **Estado vazio tratando dois casos como um** | listas de rota, agendamento, doações, usuários | "Nenhum X encontrado. Ajuste a busca ou o filtro selecionado." aparecia igual para quem filtrou e não achou e para quem ainda não tem nada — mandar o motorista "ajustar o filtro" quando não há filtro nenhum |
| 15 | **Regra das 6h presa ao detalhe** | `RouteTimeCard`, `FinishRouteSheet` | Listagem de rotas e dashboard — por onde a adm acompanha o dia — não mostravam o limite em lugar nenhum |

## Impacto baixo

| # | Achado | Medido |
|---|---|---|
| 16 | Data em `12/08/2026` e hora em `14:30` | formatos brasileiros válidos, mas não os que a missão pede; e o chat da EVA e o check-in montavam hora na mão com `toLocaleTimeString`, ficando em `14:30` contra `14h30` do resto |
| 17 | Três funções duplicadas | `users/info/utils.ts` tinha cópia própria de `formatML`, `formatShortDateTime` e `formatTimeHM` |
| 18 | `leite materno` onde o produto é ordenhado | 6 ocorrências — central de conteúdo, CTA dos artigos, WhatsApp da nova doação, dois textos alternativos de capa, um parágrafo |
| 19 | `extração` no lugar de `ordenha` | 2 textos alternativos de capa |
| 20 | `posto de coleta` contra `ponto de coleta` do resto do app | 3 textos de artigo |
| 21 | `recipiente` no lugar de `frasco` | 1 texto alternativo |
| 22 | Volume sem separador de milhar | 1 caso — o total da home saía `4200 ml`, interpolado direto |
| 23 | Placeholder repetindo o rótulo | 9 campos — "Nome do bebê" embaixo do rótulo "Nome do bebê", "Digite seu e-mail" embaixo de "E-mail" |
| 24 | Escrita inconsistente | `__/__/____` contra `DD/MM/AAAA`; `Ex:` contra `Ex.:` |

## O que a auditoria olhou e aprovou

- **CTA com verbo imperativo** — zero "Clique aqui" no projeto; as chamadas são
  "Quero doar", "Quero ser doadora", "Fazer minha primeira doação".
- **CPF e telefone** — sempre exibidos com máscara (`formatCpf`,
  `formatPhoneNumber`), em perfil, gestão de doações, detalhe do agendamento e
  ponto de coleta.
- **Acentuação e concordância** — varredura por 30 palavras que costumam perder
  acento em código não achou nenhum caso real.
- **Indicador de digitação da EVA** e **spring do modal** — já tinham ritmo
  próprio (`eva.css`, `stiffness 260 / damping 18`); ficaram como estavam.
- **`prefers-reduced-motion`** — respeitado em todo componente novo.

---

# O que foi corrigido

Um commit por assunto, na ordem em que foram aplicados.

| Commit | O que mudou | Por quê |
|---|---|---|
| `b59690e` | Vocabulário único de status em `utils/status.ts` + um `StatusBadge` | Quatro componentes divergentes viram um; a cor passa a acompanhar o significado |
| `9acc7c3` | Variantes Nutriz no `Button`; 47 botões migrados em 33 arquivos | Uma altura por tamanho, um raio por variante |
| `04c0351` | `use-count-up` de volta, agora com `IntersectionObserver`, + componente `CountUp` | Número que conta ao entrar na tela; 11 alvos |
| `03dbcbe` | Utilitário `esqueleto` com brilho + prop `skeleton` no `Page` | Caixa cinza parada parece layout quebrado |
| `f46ee66` | `PageTransition` nos três grupos do router | Corte seco parece app de 2015 |
| `d074634` | Bolhas da EVA com reveal; `StaggerGroup`/`StaggerItem` nos grids | Sequência em vez de pop |
| `8fd1dff` | Tela de 404 com ilustração e duas saídas | Redirecionar em silêncio esconde o erro do usuário |
| `13da696` | `utils/error-message` + `ErrorState` + props `error`/`onRetry` no `Page` | Erro com mensagem em pt-BR e botão de tentar de novo em 16 telas |
| `31e05fd` | `meta.sucesso` por hook, lido pelo `MutationCache` | Cada ação confirma o que fez |
| `20e43f8` | Estado vazio olha o estado real (sem dado × busca sem resultado) | Texto que corresponde à situação |
| `4d537b4` | `12 ago 2026` e `14h30` em todo o app; três duplicatas removidas | Um formato só, e o fuso certo em cada caso |
| `3f727ed` | Limite de 6h na listagem de rotas e no dashboard | O detalhe regulatório aparece onde a decisão é tomada |
| `598daa1` | Vocabulário da rBLH; volume da home pelo `formatMl` | Prova de que o domínio é entendido |
| `c54fd9b` | Placeholder com exemplo real em 9 campos | O placeholder some ao digitar — só vale quando mostra formato ou exemplo |

## Decisões que exigiram cuidado

**Transição de página só com opacidade.** A primeira versão tinha `translateY`
de 8px. Um elemento com `transform` vira bloco de contenção para
`position: fixed` nos descendentes, e há dois `fixed` dentro de rota — o
cabeçalho da landing e a barra de CTA do celular em minhas doações. Os dois
passariam a se posicionar pelo wrapper em vez da viewport e rolariam junto com a
página. Opacidade cria contexto de empilhamento, mas não bloco de contenção.

**Dois formatadores de data, de propósito.** `formatDateBR` lê em UTC porque
recebe data pura (`"2026-08-12"`) — sem isso o fuso do Brasil puxa para o dia 11.
Os carimbos de tempo são lidos no fuso local, senão um registro das 23h do dia 11
apareceria como `12 ago 2026 · 23h00`.

**Tom laranja novo (`--orange`).** `warn` precisava ser distinguível de
`pending`, e "warning" já era o amarelo do pending. Medido em oklch → sRGB:
**6,03:1** no tema claro e **7,14:1** no escuro — AA nos dois.

**`key={page}` no stagger da lista de rotas.** Sem isso, o `whileInView` com
`once: true` animaria só a primeira página e as seguintes apareceriam secas.

---

# Tabelas de padronização

## Status — cor, ícone e rótulo

| Status | Cor | Ícone | Rótulo (m / f) |
|---|---|---|---|
| `pending` | amarelo | relógio | Pendente |
| `review` | azul | lupa | Em análise |
| `in_progress` | azul-deep | círculo | Em andamento |
| `done` | verde | check | Concluído / Concluída |
| `warn` | laranja | alerta | Atenção |
| `failed` | vermelho | X | Reprovado / Reprovada |
| `error` | vermelho | alerta | Com erro |
| `canceled` | cinza | bloqueio | Cancelado / Cancelada |

O rótulo com gênero sai do mesmo verbete: quem chama informa se o sujeito é
masculino (agendamento) ou feminino (doação, rota, etapa).

## Botões — uma altura por tamanho, um raio por variante

| Variante | Uso |
|---|---|
| `primary` | ação principal da tela |
| `neutral` | ação secundária |
| `soft` | ação terciária sobre superfície clara |
| `danger` | ação destrutiva confirmada |
| `danger-soft` | ação destrutiva ainda reversível |
| `on-fill` | sobre fundo de marca (azul/rosa fixos) |

| Tamanho | Geometria | Onde |
|---|---|---|
| padrão | `h-11 rounded-full` | toda ação de tela e de sheet |
| `pill-xl` | `h-14 rounded-full` | barra fixa do motorista (alvo maior, uso com uma mão) |
| `icon-pill-sm` | ícone circular | ações de linha |

Os `h-[43px]` e `h-[46px]` eram valores arbitrários sem intenção e viraram
`h-11`. Os 97 `<button>` restantes não são botões de ação — são cartões e linhas
clicáveis, chips de filtro, abas, cabeçalhos de acordeão, controles do mapa e os
botões do widget da EVA, que tem folha de estilo própria.

## Timing e easing

| Duração | Uso |
|---|---|
| 150 ms | hover, foco, toggle, véu de fundo |
| 180 ms | transição de página (`mode="wait"`) |
| 200 ms | transição curta de estado |
| 260 ms | bolha da EVA (scale 0,95 → 1 + opacidade + 6px) |
| 300 ms | hover de imagem, abertura de menu |
| 450–600 ms | revelações ao rolar (`lib/motion.ts`) |
| 1,5 s | contador de estatística (ease-out cúbico) |
| 1,6 s | brilho do esqueleto (varre da esquerda para a direita) |
| 700 ms | quatro casos ambientais deliberados |

Easing único: `cubic-bezier(0.22, 1, 0.36, 1)`. Stagger entre filhos: **60 ms**,
com 12px de subida por item.

Os quatro casos de 700 ms são lentos de propósito e não entram na padronização:
o desfoque do mapa atrás do check-in, a barra do limite de 6h, a barra de
progresso e a virada de cor do botão de check-in ao concluir. São transições
ambientais, não resposta a toque.

## Raio de cartão

`rounded-card` (14 → 18px) e `rounded-card-sm` (12 → 14px) crescem em tela
grande; os genéricos `rounded-2xl` e `rounded-xl` ficam fixos em 14 e 12px. No
celular são idênticos — a diferença só aparece do `sm` para cima, e era ela que
deixava cartão de tela diferente com arredondamento diferente no desktop.
Campo, chip e linha clicável ficaram com o raio de formulário, de propósito.

## Formatos do domínio

| Dado | Formato | Onde vive |
|---|---|---|
| Data pura | `12 ago 2026` (UTC) | `formatDateBR` |
| Carimbo de tempo | `12 ago 2026 · 14h30` (local) | `formatCreatedAt`, `formatDateTimeParts` |
| Hora | `14h30` | `formatTimeBR` |
| Volume | `1.250 ml` (separador de milhar + espaço antes da unidade) | `formatMl` |
| CPF | `123.456.789-00` | `formatCpf` |
| Telefone | `(11) 98765-4321` | `formatPhoneNumber` |
| Data em campo | `DD/MM/AAAA` | `maskDate` |

## Vocabulário do domínio

| Usar | Não usar |
|---|---|
| doação | pedido, solicitação |
| ordenha | extração, retirada |
| frasco | recipiente, embalagem |
| banco de leite | centro de coleta |
| ponto de coleta | posto de coleta |
| nutriz, doadora | usuária, cliente |
| leite humano (produto ordenhado/doado) | leite materno |
| leite materno, aleitamento materno | — (corretos no contexto da amamentação) |

A distinção entre **leite materno** e **leite humano** é da rBLH: o primeiro é o
leite no peito, no contexto da amamentação; o segundo é o produto ordenhado,
doado e pasteurizado — e é por isso que a rede se chama Banco de Leite Humano.

## A regra das 6 horas

| Tela | Como aparece |
|---|---|
| Listagem de rotas | Etiqueta com o tempo restante, enquanto a rota está em andamento |
| Detalhe da rota | `RouteTimeCard` com cronômetro e barra |
| Adicionar parada | Bloqueio com aviso quando a parada estoura o limite |
| Finalizar rota | Aviso quando passou, sem impedir a finalização |
| Dashboard | Duração média comparada ao limite |

Escala de cor, a mesma nos três lugares: **azul** até 5h, **laranja** entre 5h e
6h, **vermelho** depois. Fonte única em `utils/route-time.ts`.

---

# Proposto e não aplicado

| Proposta | Por que ficou fora |
|---|---|
| Trocar o spinner do `RefreshableList` por esqueleto | O conteúdo já está na tela e só está sendo atualizado — esqueleto esconderia dado que a pessoa já podia ler |
| Uniformizar o stagger da lista de agendamentos com `StaggerGroup` | Ela já escalona por CSS, com 55 ms por índice. Mesmo efeito; não vale trocar implementação que funciona só para uniformizar a técnica |
| Migrar os 97 `<button>` restantes para o `Button` | Não são botões de ação — transformá-los descaracterizaria cartão clicável, chip, aba e controle de mapa |
| `translateY` na transição de página | Quebra os dois `position: fixed` que existem dentro de rota (ver acima) |
| Reescrever as 16 telas com skeleton de forma própria | A prop `skeleton` do `Page` deixa cada tela adotar a sua no seu tempo; o padrão genérico já cobre o resto |
| EVA explicando a regra das 6h | É conteúdo do RAG, que vive no `nutriz-ia-service`. Fora do escopo deste passe, que não toca em backend |
| Remover os comentários que explicam decisão | Ponto herdado do passe anterior, ainda sem decisão do time |

---

# Antes e depois

Não há captura de tela nesta rodada. O harness de QA visual (Chrome headless +
CDP) precisa de sessão autenticada semeada e de mock da API para cada papel, e
o "antes" exigiria reconstruir 14 estados anteriores do código. O que existe
como evidência é a descrição medida de cada achado, na Fase 0, com o número
exato que a varredura devolveu — e o commit que o zerou.

---

# Validação final

| # | Item | Estado |
|---|---|---|
| 1 | Hierarquia visual clara em cada tela | ✅ revisado no JSX |
| 2 | Respiro equilibrado | ✅ revisado no JSX |
| 3 | Tipografia consistente | ✅ escala do design system, sem valor novo |
| 4 | Cores semânticas consistentes | ✅ `utils/status.ts` é fonte única |
| 5 | Cards padronizados por tipo | ✅ raio e moldura por token |
| 6 | Botões padronizados por variante | ✅ 47 migrados, 6 variantes, 3 tamanhos |
| 7 | Contraste WCAG AA medido | ✅ incluindo o `--orange` novo (6,03:1 / 7,14:1) |
| 8 | Ícones consistentes | ✅ `size-4`/`size-3.5` com `shrink-0` |
| 9 | Transição de página em toda navegação | ✅ três grupos do router |
| 10 | Stagger de entrada | ✅ 4 telas + a que já escalonava por CSS |
| 11 | Hover/press em todo clicável | ✅ (verificado no passe anterior) |
| 12 | Skeleton com brilho | ✅ gate do `Page` + 7 listas |
| 13 | Contadores animados | ✅ 11 alvos |
| 14 | EVA: spring, bolhas, typing | ✅ bolhas adicionadas; spring e typing já existiam |
| 15 | 60fps no DevTools Performance | ⚠️ **não verificado** |
| 16 | Só `transform`/`opacity` | ✅ por construção |
| 17 | Terminologia do domínio | ✅ 12 ocorrências corrigidas, 0 restantes |
| 18 | Status consistentes | ✅ tabela única |
| 19 | Datas/horas/volumes | ✅ formatadores únicos |
| 20 | Regra das 6h onde relevante | ✅ 5 pontos no front; RAG da EVA fora de escopo |
| 21 | Permissões por papel | ✅ 404 respeita `useEvaAccess`; gates do `Page` intactos |
| 22 | Estados vazios com ilustração e texto contextualizado | ✅ separados por situação real |
| 23 | Loading com esqueleto | ✅ exceto o `RefreshableList`, deliberado |
| 24 | Erro com mensagem amigável + retry | ✅ 16 telas |
| 25 | 404 personalizada | ✅ |
| 26 | Validação inline + feedback de sucesso | ✅ mensagem por ação |
| 27 | Gramática e acentuação | ✅ varredura sem achado |
| 28 | Tom consistente por contexto | ✅ revisado |
| 29 | CTAs imperativos | ✅ zero "Clique aqui" |
| 30 | Zero texto cortado em 390px | ⚠️ **não verificado em aparelho** |
| 31 | Placeholders com exemplo real | ✅ 9 campos |
| 32 | EVA anônima (streaming, RAG, PII, rate limit) | ⚠️ **não verificado** — exige backend |
| 33 | EVA logada (personalização, botões) | ⚠️ **não verificado** — exige backend |
| 34 | Widget conforme permissão de cada papel | ✅ por código (`useEvaAccess`) |
| 35 | Login, cadastro, formulários, navegação | ⚠️ **não verificado** — exige backend |
| 36 | Rota do motorista de ponta a ponta | ⚠️ **não verificado** — exige backend |
| 37 | `pnpm build` + Biome | ✅ build verde; Biome em 3 erros / 19 avisos, todos pré-existentes (linha de base da `develop` era 5 / 19) |

**Nenhuma alteração** em endpoint, contrato de API, autenticação, regra de
negócio, fluxo de dados ou lógica da EVA. **Nenhuma dependência nova** no
`package.json`.
