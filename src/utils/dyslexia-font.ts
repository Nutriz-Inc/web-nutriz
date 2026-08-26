/**
 * Fonte de leitura facilitada, carregada so quando alguem liga a opcao.
 *
 * Fica fora do bundle principal de proposito: sao ~34KB de woff2 que a
 * imensa maioria das pessoas nunca vai baixar. O `import()` dinamico faz o
 * Vite emitir um chunk separado, buscado na hora em que a preferencia e
 * ativada.
 *
 * A promessa fica guardada para o caso de a opcao ser ligada e desligada
 * varias vezes: o download acontece uma vez so por sessao.
 */
let carregamento: Promise<unknown> | null = null;

export function carregarFonteLeituraFacil(): Promise<unknown> {
	if (!carregamento) {
		carregamento = Promise.all([
			import("@fontsource/atkinson-hyperlegible/latin-400.css"),
			import("@fontsource/atkinson-hyperlegible/latin-700.css"),
		]);
	}

	return carregamento;
}
