// Canal minimo entre paginas e o widget global da EVA. O EvaWidget vive fora
// da arvore do RouterProvider (montado em App.tsx), entao CTAs como "Falar com
// a EVA" (landing e home) nao conseguem alcanca-lo por props/contexto de rota.

type OpenEvaListener = (initialMessage?: string) => void;

const listeners = new Set<OpenEvaListener>();

export function openEva(initialMessage?: string) {
	for (const listener of listeners) {
		listener(initialMessage);
	}
}

export function subscribeEvaOpen(listener: OpenEvaListener) {
	listeners.add(listener);
	return () => {
		listeners.delete(listener);
	};
}

// Menu lateral do app (AppDrawer). Enquanto ele esta aberto o FAB da EVA nao
// pode aparecer: o Sheet do Radix bloqueia os cliques fora do drawer, entao o
// botao continuava visivel por cima do menu, sem responder ao toque. Mesmo
// motivo do bus acima - o widget vive fora da arvore do RouterProvider e nao
// alcanca o estado do header por props.

let menuOpen = false;
const menuListeners = new Set<() => void>();

export function setAppMenuOpen(open: boolean) {
	if (menuOpen === open) {
		return;
	}

	menuOpen = open;

	for (const listener of menuListeners) {
		listener();
	}
}

export function getAppMenuOpen() {
	return menuOpen;
}

export function subscribeAppMenuOpen(listener: () => void) {
	menuListeners.add(listener);
	return () => {
		menuListeners.delete(listener);
	};
}
