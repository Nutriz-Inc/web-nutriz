import type { RelatorioDaEva } from "../types";
import { montarDocumento } from "./documento-pdf";

export function baixarPdf(relatorio: RelatorioDaEva) {
	const moldura = document.createElement("iframe");

	moldura.setAttribute("aria-hidden", "true");
	moldura.style.position = "fixed";
	moldura.style.right = "0";
	moldura.style.bottom = "0";
	moldura.style.width = "0";
	moldura.style.height = "0";
	moldura.style.border = "0";
	document.body.appendChild(moldura);

	const janela = moldura.contentWindow;
	const documento = moldura.contentDocument;

	if (!janela || !documento) {
		moldura.remove();
		return;
	}

	documento.open();
	documento.write(montarDocumento(relatorio));
	documento.close();

	const remover = () => window.setTimeout(() => moldura.remove(), 500);
	janela.addEventListener("afterprint", remover, { once: true });

	window.setTimeout(() => {
		janela.focus();
		janela.print();
	}, 150);
}
