import { formatCreatedAt } from "@/utils/formatter";
import type { RelatorioDaEva } from "../types";
import { formatarCelula } from "./formatar-celula";

function html(texto: string): string {
	return texto
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;");
}

const ESTILO = `
@page { size: A4 __ORIENTACAO__; margin: 12mm; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
	font-family: "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
	color: #0f1f3d;
	font-size: 9.5pt;
	-webkit-print-color-adjust: exact;
	print-color-adjust: exact;
}
.topo {
	background: linear-gradient(135deg, #00325c 0%, #00549e 60%, #246cb9 100%);
	color: #ffffff;
	border-radius: 14px;
	padding: 7mm 8mm;
	display: flex;
	justify-content: space-between;
	align-items: flex-end;
	gap: 6mm;
}
.marca { font-size: 8pt; letter-spacing: 0.14em; text-transform: uppercase; opacity: 0.8; margin: 0 0 2mm; }
.titulo { font-size: 17pt; font-weight: 700; margin: 0; line-height: 1.15; }
.periodo { margin: 1.5mm 0 0; font-size: 9.5pt; opacity: 0.9; }
.emissao { text-align: right; font-size: 8pt; opacity: 0.85; line-height: 1.5; white-space: nowrap; }
.resumo { display: flex; flex-wrap: wrap; gap: 3mm; margin: 5mm 0 0; }
.cartao {
	flex: 1 1 32mm;
	background: #e8f0f9;
	border: 1px solid #cfe0f5;
	border-radius: 12px;
	padding: 3.5mm 4mm;
}
.cartao span { display: block; font-size: 7.5pt; color: #42506b; text-transform: uppercase; letter-spacing: 0.06em; }
.cartao strong { display: block; font-size: 14pt; color: #00325c; margin-top: 1mm; font-variant-numeric: tabular-nums; }
.tabela { margin-top: 5mm; border: 1px solid #cfe0f5; border-radius: 12px; overflow: hidden; }
table { width: 100%; border-collapse: collapse; }
thead { display: table-header-group; }
th {
	background: #e8f0f9;
	color: #00325c;
	text-align: left;
	font-size: 8pt;
	font-weight: 700;
	text-transform: uppercase;
	letter-spacing: 0.04em;
	padding: 2.6mm 3mm;
}
td { padding: 2.3mm 3mm; border-top: 1px solid #e3eaf4; font-variant-numeric: tabular-nums; vertical-align: top; }
tr { break-inside: avoid; }
tbody tr:nth-child(even) td { background: #f6f9fd; }
.vazio { padding: 8mm; text-align: center; color: #626e82; }
.rodape { margin-top: 4mm; display: flex; justify-content: space-between; font-size: 7.5pt; color: #626e82; }
`;

export function montarDocumento(relatorio: RelatorioDaEva): string {
	const deitado = relatorio.colunas.length > 6;
	const emitidoEm = formatCreatedAt(new Date().toISOString());
	const resumo = relatorio.resumo
		.map(
			(item) =>
				`<div class="cartao"><span>${html(item.rotulo)}</span><strong>${html(
					formatarCelula(item.valor),
				)}</strong></div>`,
		)
		.join("");
	const cabecalho = relatorio.colunas
		.map((coluna) => `<th>${html(coluna.rotulo)}</th>`)
		.join("");
	const corpo = relatorio.linhas.length
		? relatorio.linhas
				.map(
					(linha) =>
						`<tr>${relatorio.colunas
							.map(
								(coluna) =>
									`<td>${html(formatarCelula(linha[coluna.chave]))}</td>`,
							)
							.join("")}</tr>`,
				)
				.join("")
		: `<tr><td class="vazio" colspan="${relatorio.colunas.length}">Nenhum registro no período.</td></tr>`;

	return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8" />
<title>${html(relatorio.titulo)}</title>
<style>${ESTILO.replace("__ORIENTACAO__", deitado ? "landscape" : "portrait")}</style>
</head>
<body>
<header class="topo">
	<div>
		<p class="marca">Nutriz · Lactare</p>
		<h1 class="titulo">${html(relatorio.titulo)}</h1>
		${relatorio.periodo ? `<p class="periodo">${html(relatorio.periodo)}</p>` : ""}
	</div>
	<div class="emissao">Emitido em ${html(emitidoEm)}<br />Gerado pela EVA</div>
</header>
${resumo ? `<section class="resumo">${resumo}</section>` : ""}
<section class="tabela">
	<table>
		<thead><tr>${cabecalho}</tr></thead>
		<tbody>${corpo}</tbody>
	</table>
</section>
<footer class="rodape">
	<span>${relatorio.linhas.length} registro(s)</span>
	<span>Dados operacionais, sem informação clínica. Uso interno da Lactare.</span>
</footer>
</body>
</html>`;
}
