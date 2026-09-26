import { useEffect } from "react";
import { env, evaApiUrl } from "@/config/env";

const INTERVALO_MS = 10 * 60 * 1000;

function enderecoDeSaude(base: string | undefined, caminho: string) {
	if (!base) {
		return null;
	}

	try {
		return new URL(caminho, base).toString();
	} catch {
		return null;
	}
}

const ENDERECOS = [
	enderecoDeSaude(evaApiUrl, "/health/banco"),
	enderecoDeSaude(env.VITE_API_URL, "/health"),
].filter((endereco): endereco is string => endereco !== null);

let ultimaVez = 0;

function acordar() {
	for (const endereco of ENDERECOS) {
		fetch(endereco, { mode: "no-cors", cache: "no-store" }).catch(() => {});
	}
}

export function useAquecerServicos() {
	useEffect(() => {
		function acordarSeVisivel() {
			if (document.visibilityState !== "visible") {
				return;
			}

			if (Date.now() - ultimaVez < INTERVALO_MS / 2) {
				return;
			}

			ultimaVez = Date.now();
			acordar();
		}

		acordarSeVisivel();
		const intervalo = window.setInterval(acordarSeVisivel, INTERVALO_MS);
		document.addEventListener("visibilitychange", acordarSeVisivel);

		return () => {
			window.clearInterval(intervalo);
			document.removeEventListener("visibilitychange", acordarSeVisivel);
		};
	}, []);
}
