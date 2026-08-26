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

	observador = new MutationObserver(conferirDialogos);
	observador.observe(document.body, {
		childList: true,
		subtree: true,
		attributes: true,
		attributeFilter: ["data-state"],
	});

	conferirDialogos();
}
