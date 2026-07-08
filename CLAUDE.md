# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev        # Start dev server (Vite)
pnpm build      # tsc -b && vite build
pnpm lint       # Check lint (Biome) — this is the linter that actually runs, see note below
pnpm lint:fix   # Biome check --write . (also organizes imports)
pnpm format     # Biome format --write .
```

There is no test suite in this repo.

Full run/setup instructions (env var, contribution flow) are in `README.md` — don't duplicate them here, read that file when relevant.

**Note on linting**: `eslint`, `typescript-eslint`, and `eslint-plugin-react-hooks` are installed as devDependencies but are **not** wired into any `package.json` script — Biome (`biome.json`) is the linter actually enforced (via `pnpm lint`, `lint:fix`, and the husky/lint-staged pre-commit hook). Don't rely on running `eslint` directly.

## Architecture

### Auth gates the entire router, not individual routes

`App.tsx` picks between two completely separate `createBrowserRouter` instances defined in `src/router/index.tsx` — `publicRouter` or `routerPrivate` — based on `useAuth().isAuthenticated`. There's no per-route guard/`ProtectedRoute` wrapper; the whole router tree swaps when auth state changes. `isAuthenticated` is derived from `!!auth?.id_user` in `src/hooks/use-auth.tsx`.

Auth state itself lives in `src/context/auth-context.tsx` (`AuthProvider`, wraps `App` in `main.tsx`), persisted to `localStorage` under the key `CONTEXT_KEY = "data"`. `updateAuth()`/`handleLogout()` are the only mutators. On login/refresh, the stored token is pushed into the axios client via `setApiToken()` — see below.

### Services layer

`src/services/index.ts` builds a single axios instance (`baseURL` from `VITE_API_URL`) and exports a default object of service class instances: `{ auth, donation, job, user }`. Each domain has its own file (`auth.ts`, `donation.ts`, `job.ts`, `user.ts`) implementing an interface declared in `services/types/i-<domain>.ts` (e.g. `IDonation`, `IListDonationPointsRequest`). A request interceptor attaches `Authorization: Bearer <token>` from `localStorage.getItem("token")` on every request; a response interceptor clears `localStorage` and force-reloads on `403`.

Pages never call axios directly — they call `services.<domain>.<method>()` through a page-local `@tanstack/react-query` hook (see below).

### Page structure: one page = one folder

Every route's screen lives at `pages/<private|public>/<page-name>/`:

```
pages/private/donation-points/
├── index.tsx              # the page component, default export target for the route
├── components/            # subcomponents used only by this page (one component per file)
└── hooks/index.ts          # react-query hooks scoped to this page, wrapping services.*
```

See `pages/private/donation-points` and `pages/private/home` as the two fullest examples. `pages/public/login` follows the same shape (`index.tsx` + `hooks/index.ts`). Route registration + per-route `handle: { title }` (read by `Header.tsx` to set the top bar title) happens in `router/index.tsx`, not in the page file.

**Every page's root component MUST return its content wrapped in `<Page>` (`@/components/layout/Page`)** — never return a bare top-level `<div>`/fragment from a page component. `Page` centralizes the `hasPermission` gate (renders a permission-denied `Alert` instead of children) and the `loading` gate (renders a centered spinner instead of children), so pages get these behaviors for free instead of hand-rolling them. Pass `hasPermission`/`loading` when the page needs them (see `pages/private/home/index.tsx`); when a page doesn't need either, still wrap children in `<Page>` with no props (see `pages/private/donation-points/index.tsx`) — `Page` renders children transparently with no extra DOM when `title`/`loading` are omitted, so it never interferes with a page's own layout (including tricks like the `-m-5` full-bleed override in `donation-points/index.tsx`).

Shared, cross-page components go in `src/components/` instead, split by intent:
- `components/ui/` — low-level primitives (shadcn/radix-based: `button.tsx`, `sheet.tsx`, `input.tsx`, `label.tsx`, `alert.tsx`)
- `components/layout/` — app chrome (`Layout.tsx`, `Header.tsx`, `Footer.tsx`, `AppDrawer.tsx`, `Page.tsx`)
- `components/full/` — composed, ready-to-use widgets shared across pages (e.g. `Status.tsx`, a donation-step status badge)

**One component per file** is a hard convention across the whole codebase — don't merge multiple exported components into a single file, even small ones (see `DetailRow.tsx`, `CollectionType.tsx`, `LocateButton.tsx` as examples of single-purpose files).

### Code style specifics

- Biome enforces tabs and double quotes and auto-organizes imports on save/`lint:fix` — don't hand-order imports, let Biome do it.
- `tsconfig.app.json` sets `verbatimModuleSyntax: true` — always use `import type { X }` (or `type` in a mixed import) for type-only imports, plain `import` will fail the build otherwise.
- Path alias `@/*` → `src/*` is configured in both `tsconfig.app.json` and `vite.config.ts` — prefer it over relative `../../..` paths in new code (existing files mix both; new code should use `@/`).
- Hook files: kebab-case with a `use-` prefix (`use-auth.tsx`, `use-geolocation.ts`). Component files: PascalCase (`DonationPointCard.tsx`).

### Styling: Tailwind v4, inline, hardcoded hex

This is a Tailwind v4 project (`@theme inline` + CSS variables in `src/index.css`, shadcn-flavored `components/ui`). In practice, almost none of the app code uses the theme's semantic color tokens (`bg-primary`, `text-muted-foreground`, etc.) — components hardcode arbitrary hex values inline instead, e.g. `bg-[#387ccd]`, `text-[#00458b]`, `text-[13px]`. This is the actual, consistent pattern throughout the app (brand blue `#387ccd`/`#00458b`, teal `#0e9e94`, pink `#f2579f` for "selected" states) — match it in new UI rather than introducing theme-token usage that the rest of the app doesn't follow.

Use `cn()` from `@/lib/utils` (clsx + tailwind-merge) when a className has conditional branches; plain template-literal className strings are also used for simple two-state badges (see `Status.tsx`, `CollectionType.tsx`) — either is fine, `cn()` is preferred once there's more than one condition.

### Responsiveness is mobile-first — base classes are always the mobile layout

Every unprefixed Tailwind class is the mobile layout. Desktop is *layered on top* via `lg:` (or `md:`/`sm:` where relevant) — never the other way around. Concretely: never write a desktop-first class and override it for mobile; write mobile plain, then add `lg:` for anything that should change on larger screens.

The reference implementation for this is `src/pages/private/donation-points/index.tsx`: the page is a single `flex flex-col` column on mobile (search → filters → map → scrollable list, in that DOM order), and at `lg:` it becomes a 2-column CSS grid (fixed-width list sidebar + a big pinned map) purely by adding `lg:grid lg:grid-cols-[420px_1fr] lg:grid-rows-[auto_1fr]` plus explicit `lg:col-start-*`/`lg:row-start-*` placement on the same three children — **no mobile class is touched or removed** to achieve the desktop layout. When you need to reorder/regroup elements for desktop without disturbing mobile DOM order or classes, prefer this "same flat children, explicit `lg:` grid placement" technique over restructuring the JSX.

Also from that same file: `Layout.tsx`'s outer container uses `min-h-screen` (not `h-screen`), so `h-full`/percentage heights inside `<main>` silently resolve to `auto` once page content is taller than the viewport (the whole page scrolls instead of an inner panel). Don't fight this by editing `Layout.tsx` (shared by every page, including mobile) — instead, on the specific page, size the desktop container with a viewport-relative `calc(100vh - Npx)` (see the comment in `donation-points/index.tsx` for the exact header-height math), which doesn't depend on any ancestor having a definite height.

### Adapting bottom sheets for desktop without touching mobile

Modals use the shared `Sheet` (Radix Dialog wrapper, `src/components/ui/sheet.tsx`), always `side="bottom"` on mobile (full-width bottom sheet). `SheetContent`'s base styles position it via `data-[side=bottom]:inset-x-0 data-[side=bottom]:bottom-0` etc., which are **not** breakpoint-gated — to give a sheet a different desktop treatment (e.g. a smaller floating card docked to a corner) without breaking mobile or fighting cascade-order guesswork, chain the responsive prefix in front of the data-attribute variant on the same utility, e.g. `lg:data-[side=bottom]:right-8 lg:data-[side=bottom]:w-[420px] lg:data-[side=bottom]:rounded-2xl`. See `ChangeLocationSheet.tsx` and `DonationPointDetailSheet.tsx` for the full pattern (including hiding the mobile drag-handle bar via `lg:hidden`).

### Folder reference

```
src/
├── assets/                  # static images/svgs
├── components/
│   ├── full/                 # composed widgets shared across pages
│   ├── layout/                # app chrome: Layout, Header, Footer, AppDrawer, Page
│   └── ui/                   # shadcn/radix primitives
├── config/env.ts             # re-exports import.meta.env
├── context/auth-context.tsx  # AuthProvider, persists to localStorage
├── hooks/                    # app-wide hooks (use-auth, use-geolocation)
├── lib/utils.ts              # cn() helper
├── pages/
│   ├── private/<page>/       # authenticated screens (index.tsx + components/ + hooks/)
│   └── public/<page>/        # unauthenticated screens (landing page, login)
├── router/index.tsx          # publicRouter + routerPrivate, route handles (page titles)
├── services/                 # one file per backend domain + services/types/i-*.ts
└── utils/formatter.ts        # formatZipCode / formatPhoneNumber / formatCep
```