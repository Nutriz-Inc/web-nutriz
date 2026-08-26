import { useEffect, useSyncExternalStore } from "react";
import { useAccessibility } from "@/context/accessibility-context";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";

const AZUL_PROFUNDO = "#00325c";
const CANVAS_CLARO = "#eef3fa";

const CANVAS_ESCURO = "#111720";

function corDaRota(
	pathname: string,
	isAuthenticated: boolean,
	temaEscuro: boolean,
): string {
	if (!isAuthenticated && (pathname === "/" || pathname === "")) {
		return AZUL_PROFUNDO;
	}

	return temaEscuro ? CANVAS_ESCURO : CANVAS_CLARO;
}

export function useThemeColor(isAuthenticated: boolean): void {
	const pathname = useSyncExternalStore(
		subscribeAppPath,
		getAppPathname,
		getAppPathname,
	);

	const { temaEfetivo } = useAccessibility();
	const cor = corDaRota(pathname, isAuthenticated, temaEfetivo === "escuro");

	useEffect(() => {
		const meta = document.querySelector<HTMLMetaElement>(
			'meta[name="theme-color"]',
		);

		if (meta && meta.content !== cor) {
			meta.content = cor;
		}

		document.documentElement.style.backgroundColor = cor;
		document.body.style.backgroundColor = cor;
	}, [cor]);
}
