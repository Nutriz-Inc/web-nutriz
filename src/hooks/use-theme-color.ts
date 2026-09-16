import { useEffect, useSyncExternalStore } from "react";
import { useAccessibility } from "@/context/accessibility-context";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";
import { pintarFundoDaPagina } from "@/utils/fundo-da-pagina";

const AZUL_PROFUNDO = "#00325c";
const CANVAS_CLARO = "#eef3fa";
const CANVAS_ESCURO = "#111720";

function corDaBarra(
	pathname: string,
	isAuthenticated: boolean,
	corDoFundo: string,
): string {
	if (!isAuthenticated && (pathname === "/" || pathname === "")) {
		return AZUL_PROFUNDO;
	}

	return corDoFundo;
}

export function useThemeColor(isAuthenticated: boolean): void {
	const pathname = useSyncExternalStore(
		subscribeAppPath,
		getAppPathname,
		getAppPathname,
	);

	const { temaEfetivo } = useAccessibility();
	const corDoFundo = temaEfetivo === "escuro" ? CANVAS_ESCURO : CANVAS_CLARO;
	const barra = corDaBarra(pathname, isAuthenticated, corDoFundo);

	useEffect(() => {
		const meta = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"]',
		);

		if (meta && meta.content !== barra) {
			meta.content = barra;
		}
	}, [barra]);

	useEffect(() => {
		const raiz = document.documentElement;
		raiz.dataset.corDaRota = corDoFundo;

		if (raiz.dataset.corNaTroca === undefined) {
			pintarFundoDaPagina(corDoFundo);
		}
	}, [corDoFundo]);
}
