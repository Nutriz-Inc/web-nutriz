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
