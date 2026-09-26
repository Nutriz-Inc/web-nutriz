export type TrechoDeTexto = { chave: string; texto: string; negrito: boolean };

export type LinhaDeTexto = { chave: string; trechos: TrechoDeTexto[] };

export type CelulaDeTabela = { chave: string; texto: string };

export type LinhaDeTabela = { chave: string; celulas: CelulaDeTabela[] };

export type BlocoDeTexto =
	| { chave: string; tipo: "paragrafo"; linhas: LinhaDeTexto[] }
	| { chave: string; tipo: "lista"; ordenada: boolean; itens: LinhaDeTexto[] }
	| {
			chave: string;
			tipo: "tabela";
			cabecalho: CelulaDeTabela[];
			linhas: LinhaDeTabela[];
	  };

const ITEM_DE_LISTA = /^\s*[-*•]\s+(.*)$/;
const ITEM_NUMERADO = /^\s*\d+[.)]\s+(.*)$/;
const LINHA_DE_TABELA = /^\s*\|.*\|\s*$/;
const SEPARADOR_DE_TABELA = /^\s*\|?\s*:?-{2,}:?\s*(\|\s*:?-{2,}:?\s*)*\|?\s*$/;

function linhaDeTexto(chave: string, linha: string): LinhaDeTexto {
	const partes = linha
		.split(/(\*\*[^*]+\*\*)/g)
		.filter((parte) => parte !== "");

	return {
		chave,
		trechos: partes.map((parte, posicao) =>
			parte.startsWith("**") && parte.endsWith("**") && parte.length > 4
				? {
						chave: `${chave}.${posicao}`,
						texto: parte.slice(2, -2),
						negrito: true,
					}
				: {
						chave: `${chave}.${posicao}`,
						texto: parte.replace(/\*\*/g, ""),
						negrito: false,
					},
		),
	};
}

function celulas(chave: string, linha: string): CelulaDeTabela[] {
	return linha
		.trim()
		.replace(/^\|/, "")
		.replace(/\|$/, "")
		.split("|")
		.map((celula, posicao) => ({
			chave: `${chave}.${posicao}`,
			texto: celula.trim().replace(/\*\*/g, ""),
		}));
}

export function interpretar(texto: string): BlocoDeTexto[] {
	const linhas = texto.replace(/\r/g, "").split("\n");
	const blocos: BlocoDeTexto[] = [];
	let indice = 0;

	while (indice < linhas.length) {
		const linha = linhas[indice];
		const chave = `b${blocos.length}`;

		if (linha.trim() === "") {
			indice += 1;
			continue;
		}

		if (
			LINHA_DE_TABELA.test(linha) &&
			indice + 1 < linhas.length &&
			SEPARADOR_DE_TABELA.test(linhas[indice + 1])
		) {
			const cabecalho = celulas(`${chave}.h`, linha);
			const corpo: LinhaDeTabela[] = [];
			indice += 2;
			while (indice < linhas.length && LINHA_DE_TABELA.test(linhas[indice])) {
				const chaveDaLinha = `${chave}.l${corpo.length}`;
				corpo.push({
					chave: chaveDaLinha,
					celulas: celulas(chaveDaLinha, linhas[indice]),
				});
				indice += 1;
			}
			blocos.push({ chave, tipo: "tabela", cabecalho, linhas: corpo });
			continue;
		}

		const lista = ITEM_DE_LISTA.exec(linha);
		const numerada = ITEM_NUMERADO.exec(linha);
		if (lista || numerada) {
			const ordenada = !lista;
			const padrao = ordenada ? ITEM_NUMERADO : ITEM_DE_LISTA;
			const itens: LinhaDeTexto[] = [];
			while (indice < linhas.length) {
				const item = padrao.exec(linhas[indice]);
				if (!item) break;
				itens.push(linhaDeTexto(`${chave}.i${itens.length}`, item[1].trim()));
				indice += 1;
			}
			blocos.push({ chave, tipo: "lista", ordenada, itens });
			continue;
		}

		const paragrafo: LinhaDeTexto[] = [];
		while (
			indice < linhas.length &&
			linhas[indice].trim() !== "" &&
			(paragrafo.length === 0 ||
				(!ITEM_DE_LISTA.test(linhas[indice]) &&
					!ITEM_NUMERADO.test(linhas[indice]) &&
					!LINHA_DE_TABELA.test(linhas[indice])))
		) {
			paragrafo.push(
				linhaDeTexto(`${chave}.p${paragrafo.length}`, linhas[indice].trim()),
			);
			indice += 1;
		}
		blocos.push({ chave, tipo: "paragrafo", linhas: paragrafo });
	}

	return blocos;
}
