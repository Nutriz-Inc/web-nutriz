import type { RelatorioDaEva } from "../types";
import { formatarCelula } from "./formatar-celula";

function escapar(valor: string): string {
	if (/[";\n]/.test(valor)) {
		return `"${valor.replace(/"/g, '""')}"`;
	}

	return valor;
}

export function nomeDoArquivo(relatorio: RelatorioDaEva, extensao: string) {
	const base = relatorio.titulo
		.normalize("NFD")
		.replace(/[̀-ͯ]/g, "")
		.toLowerCase()
		.replace(/[^a-z0-9]+/g, "-")
		.replace(/^-|-$/g, "");
	const dia = new Date().toISOString().slice(0, 10);

	return `nutriz-${base}-${dia}.${extensao}`;
}

export function baixarCsv(relatorio: RelatorioDaEva) {
	const cabecalho = relatorio.colunas.map((coluna) => escapar(coluna.rotulo));
	const linhas = relatorio.linhas.map((linha) =>
		relatorio.colunas
			.map((coluna) => escapar(formatarCelula(linha[coluna.chave])))
			.join(";"),
	);
	const conteudo = [cabecalho.join(";"), ...linhas].join("\r\n");
	const arquivo = new Blob([`﻿${conteudo}`], {
		type: "text/csv;charset=utf-8",
	});
	const endereco = URL.createObjectURL(arquivo);
	const link = document.createElement("a");

	link.href = endereco;
	link.download = nomeDoArquivo(relatorio, "csv");
	document.body.appendChild(link);
	link.click();
	link.remove();
	window.setTimeout(() => URL.revokeObjectURL(endereco), 1000);
}
