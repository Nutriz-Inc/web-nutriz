import { useEffect, useState } from "react";

export function useSecaoAtiva(ids: string[]) {
	const [ativa, setAtiva] = useState<string | null>(null);
	const chave = ids.join("|");

	useEffect(() => {
		const secoes = ["topo", ...chave.split("|")]
			.map((id) => document.getElementById(id))
			.filter((secao): secao is HTMLElement => secao !== null);

		if (secoes.length === 0) {
			return;
		}

		const observador = new IntersectionObserver(
			(entradas) => {
				for (const entrada of entradas) {
					if (entrada.isIntersecting) {
						setAtiva(entrada.target.id === "topo" ? null : entrada.target.id);
					}
				}
			},
			{ rootMargin: "-45% 0px -50% 0px" },
		);

		for (const secao of secoes) {
			observador.observe(secao);
		}

		return () => observador.disconnect();
	}, [chave]);

	return ativa;
}
