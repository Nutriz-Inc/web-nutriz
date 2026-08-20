import { useEffect, useSyncExternalStore } from "react";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";

/**
 * Cor da barra de status do celular (meta[name=theme-color]).
 *
 * No iPhone o Safari nao deixa a pagina desenhar sob a barra de status: aquela
 * faixa e pintada por esta meta. Com uma cor fixa, a faixa virava um degrau
 * escuro acima das telas claras — parecia que o site so comecava depois da
 * ilha dinamica. Aqui ela passa a acompanhar o topo da tela atual, entao a
 * faixa se funde com a pagina e o app ocupa a tela toda visualmente.
 *
 * Sao os mesmos tokens do design system, em hex porque a meta tag nao le
 * variaveis CSS: --blue-deep e --canvas.
 */
const AZUL_PROFUNDO = "#00325c";
const CANVAS = "#eef3fa";

/** Unica tela que abre com o topo escuro (hero da landing). */
function corDaRota(pathname: string, isAuthenticated: boolean): string {
	if (!isAuthenticated && (pathname === "/" || pathname === "")) {
		return AZUL_PROFUNDO;
	}

	return CANVAS;
}

export function useThemeColor(isAuthenticated: boolean): void {
	const pathname = useSyncExternalStore(
		subscribeAppPath,
		getAppPathname,
		getAppPathname,
	);

	const cor = corDaRota(pathname, isAuthenticated);

	useEffect(() => {
		const meta = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"]',
		);

		if (meta && meta.content !== cor) {
			meta.content = cor;
		}
	}, [cor]);
}
