export const CHAVE_ACESSIBILIDADE = "nutriz:acessibilidade";

export type PreferenciaTema = "sistema" | "claro" | "escuro";

export type Preferencias = {
	tema: PreferenciaTema;
	fonteDislexia: boolean;
};

export const PREFERENCIAS_PADRAO: Preferencias = {
	tema: "sistema",
	fonteDislexia: false,
};

const TEMAS: PreferenciaTema[] = ["sistema", "claro", "escuro"];

export function lerPreferencias(): Preferencias {
	try {
		const salvo = localStorage.getItem(CHAVE_ACESSIBILIDADE);
		if (!salvo) {
			return PREFERENCIAS_PADRAO;
		}

		const bruto = JSON.parse(salvo) as Partial<Preferencias>;

		return {
			tema: TEMAS.includes(bruto?.tema as PreferenciaTema)
				? (bruto.tema as PreferenciaTema)
				: PREFERENCIAS_PADRAO.tema,
			fonteDislexia:
				typeof bruto?.fonteDislexia === "boolean"
					? bruto.fonteDislexia
					: PREFERENCIAS_PADRAO.fonteDislexia,
		};
	} catch {
		return PREFERENCIAS_PADRAO;
	}
}

export function gravarPreferencias(preferencias: Preferencias) {
	try {
		localStorage.setItem(CHAVE_ACESSIBILIDADE, JSON.stringify(preferencias));
	} catch {}
}

export function aplicarNoDocumento(estado: {
	tema: "claro" | "escuro";
	fonteDislexia: boolean;
}) {
	const raiz = document.documentElement;
	raiz.dataset.tema = estado.tema;
	raiz.dataset.fonte = estado.fonteDislexia ? "dislexia" : "padrao";
	raiz.style.colorScheme = estado.tema === "escuro" ? "dark" : "light";
}
