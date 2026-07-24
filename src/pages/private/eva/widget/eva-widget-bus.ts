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
