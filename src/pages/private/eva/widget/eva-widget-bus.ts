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

// ---------------------------------------------------------------------------
// Obstrucao do FAB
//
// O botao flutuante da EVA mora no canto inferior direito e fica acima de todo
// o resto. Sempre que abre alguma coisa por cima dele — menu lateral, bottom
// sheet de um mapa, dialogo de confirmacao — ele cobria a informacao e, pior,
// parava de responder: Radix prende a interacao dentro do dialogo, entao mudar
// o FAB de lugar nao resolveria (ele continuaria morto, so que em cima de
// outro conteudo). Enquanto houver um dialogo aberto o FAB sai de cena e
// volta sozinho quando ele fecha.
//
// Duas fontes alimentam esse estado:
//  - `setAppMenuOpen`, declarado pelos cabecalhos que abrem o menu lateral;
//  - um observador do DOM, que pega qualquer dialogo do Radix aberto no app,
//    inclusive telas que ainda nem existem. O modal da propria EVA fica de
//    fora, senao ele se esconderia ao abrir.
// ---------------------------------------------------------------------------

const SELETOR_DIALOGO =
	'[data-slot="sheet-content"][data-state="open"]:not(.eva-widget-modal),[role="dialog"][data-state="open"]:not(.eva-widget-modal),[role="alertdialog"][data-state="open"]:not(.eva-widget-modal)';

let menuOpen = false;
let dialogoAberto = false;
const menuListeners = new Set<() => void>();

function avisarObstrucao() {
	for (const listener of menuListeners) {
		listener();
	}
}

export function setAppMenuOpen(open: boolean) {
	if (menuOpen === open) {
		return;
	}

	menuOpen = open;

	avisarObstrucao();
}

/** `true` enquanto algo estiver cobrindo o canto do FAB. */
export function getAppMenuOpen() {
	return menuOpen || dialogoAberto;
}

export function subscribeAppMenuOpen(listener: () => void) {
	menuListeners.add(listener);

	if (menuListeners.size === 1) {
		iniciarObservador();
	}

	return () => {
		menuListeners.delete(listener);
	};
}

let observador: MutationObserver | null = null;

function conferirDialogos() {
	const achou = !!document.querySelector(SELETOR_DIALOGO);

	if (achou === dialogoAberto) {
		return;
	}

	dialogoAberto = achou;

	avisarObstrucao();
}

function iniciarObservador() {
	if (observador || typeof MutationObserver === "undefined") {
		return;
	}

	// Os dialogos entram e saem por portal direto no body, e o Radix so troca
	// `data-state` ao fechar — por isso o observador olha subarvore e atributos.
	observador = new MutationObserver(conferirDialogos);
	observador.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["data-state"],
	});

	conferirDialogos();
}
