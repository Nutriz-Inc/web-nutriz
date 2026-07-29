// Ponte de navegacao para componentes que vivem FORA do RouterProvider
// (o widget global da EVA e montado ao lado do RouterProvider em App.tsx e,
// por isso, nao pode usar hooks do react-router). O App registra o router
// ativo aqui; o widget navega e observa a rota atual atraves desta ponte.

type MinimalRouter = {
	navigate: (to: string) => void | Promise<void>;
	subscribe: (listener: () => void) => () => void;
	state: { location: { pathname: string } };
};

let current: MinimalRouter | null = null;
let unsubscribeRouter: (() => void) | null = null;
const pathListeners = new Set<() => void>();

export function registerAppRouter(router: MinimalRouter): void {
	current = router;
	unsubscribeRouter?.();
	unsubscribeRouter = router.subscribe(() => {
		for (const listener of pathListeners) {
			listener();
		}
	});
	for (const listener of pathListeners) {
		listener();
	}
}

export function navigateApp(to: string): void {
	current?.navigate(to);
}

export function getAppPathname(): string {
	return current?.state.location.pathname ?? window.location.pathname;
}

export function subscribeAppPath(listener: () => void): () => void {
	pathListeners.add(listener);
	return () => {
		pathListeners.delete(listener);
	};
}
