import { useEffect } from "react";
import { useAuth } from "@/hooks/use-auth";
import { fundoBrancoNaImpressao } from "@/utils/fundo-branco-na-impressao";
import { RelatorioDeTabela } from "../../dashboard/components/report/RelatorioDeTabela";
import { descreverEmissao } from "../../dashboard/utils";
import { formatarCelula } from "../relatorio/formatar-celula";
import type { RelatorioDaEva } from "../types";

type ImpressaoDoRelatorioProps = {
	relatorio: RelatorioDaEva;
	onFim: () => void;
};

export function ImpressaoDoRelatorio({
	relatorio,
	onFim,
}: ImpressaoDoRelatorioProps) {
	const { auth } = useAuth();

	useEffect(() => {
		const restaurarFundo = fundoBrancoNaImpressao();
		window.addEventListener("afterprint", onFim, { once: true });

		const quadro = requestAnimationFrame(() => {
			requestAnimationFrame(() => window.print());
		});

		return () => {
			restaurarFundo();
			cancelAnimationFrame(quadro);
			window.removeEventListener("afterprint", onFim);
		};
	}, [onFim]);

	return (
		<RelatorioDeTabela
			titulo={relatorio.titulo}
			subtitulo="Relatório gerado pela EVA · Banco de leite humano"
			periodo={relatorio.periodo}
			emissao={descreverEmissao(new Date())}
			emitidoPor={auth?.name ?? "—"}
			resumo={relatorio.resumo.map((item) => ({
				rotulo: item.rotulo,
				valor: formatarCelula(item.valor),
			}))}
			colunas={relatorio.colunas}
			linhas={relatorio.linhas.map((linha, posicao) => ({
				chave: `linha-${posicao}`,
				celulas: relatorio.colunas.map((coluna) =>
					formatarCelula(linha[coluna.chave]),
				),
			}))}
		/>
	);
}
