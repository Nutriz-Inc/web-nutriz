/**
 * Preferencias de acessibilidade: forma, leitura e escrita.
 *
 * Vive em `utils` — e nao junto do contexto — porque duas partes que nao se
 * conhecem precisam da mesma chave: o contexto, que le e grava, e o
 * interceptor do axios, que limpa a sessao e precisa saber o que NAO limpar.
 */

export const CHAVE_ACESSIBILIDADE = "nutriz:acessibilidade";

/** "sistema" segue o `prefers-color-scheme`; as outras duas mandam nele. */
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

/**
 * Le o que estiver salvo, campo a campo.
 *
 * Valida cada um em vez de confiar no JSON inteiro: o que esta no
 * localStorage pode ter sido gravado por uma versao anterior do app ou
 * editado a mao, e um campo estranho nao pode derrubar os outros.
 */
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
		// localStorage bloqueado ou JSON quebrado: o app abre no padrao.
		return PREFERENCIAS_PADRAO;
	}
}

export function gravarPreferencias(preferencias: Preferencias) {
	try {
		localStorage.setItem(CHAVE_ACESSIBILIDADE, JSON.stringify(preferencias));
	} catch {
		// Modo privado pode recusar a escrita. A preferencia vale nesta sessao.
	}
}

/**
 * Aplica as preferencias como atributos em `<html>`.
 *
 * Atributo, e nao classe, para o script inline do index.html poder escrever a
 * mesma coisa antes da primeira pintura sem depender de nada do bundle. Aqui
 * os valores ja chegam resolvidos — "sistema" nunca aparece no DOM, so
 * "claro"/"escuro" e "normal"/"reduzido".
 */
export function aplicarNoDocumento(estado: {
	tema: "claro" | "escuro";
	fonteDislexia: boolean;
}) {
	const raiz = document.documentElement;
	raiz.dataset.tema = estado.tema;
	raiz.dataset.fonte = estado.fonteDislexia ? "dislexia" : "padrao";
	// `color-scheme` faz o navegador pintar barra de rolagem, campo de
	// formulario e autofill no tom certo — coisas que o CSS do app nao alcanca.
	raiz.style.colorScheme = estado.tema === "escuro" ? "dark" : "light";
}
