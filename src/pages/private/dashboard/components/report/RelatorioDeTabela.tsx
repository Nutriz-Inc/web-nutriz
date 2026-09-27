import { createPortal } from "react-dom";
import { RelatorioFaixaDeDados } from "./RelatorioFaixaDeDados";
import { RelatorioFaixaTopo } from "./RelatorioFaixaTopo";
import { RelatorioSecao } from "./RelatorioSecao";
import "./relatorio.css";

export type ColunaDoRelatorioDeTabela = {
	chave: string;
	rotulo: string;
};

type RelatorioDeTabelaProps = {
	titulo: string;
	subtitulo: string;
	periodo?: string | null;
	emissao: string;
	emitidoPor: string;
	resumo: { rotulo: string; valor: string }[];
	colunas: ColunaDoRelatorioDeTabela[];
	linhas: { chave: string; celulas: string[] }[];
};

export function RelatorioDeTabela({
	titulo,
	subtitulo,
	periodo,
	emissao,
	emitidoPor,
	resumo,
	colunas,
	linhas,
}: RelatorioDeTabelaProps) {
	return createPortal(
		<article className="relatorio relatorio--continua">
			<RelatorioFaixaTopo
				titulo={titulo}
				subtitulo={subtitulo}
				periodo={periodo}
				emissao={emissao}
				emitidoPor={emitidoPor}
			/>

			{resumo.length > 0 ? (
				<RelatorioFaixaDeDados
					colunas={resumo.map((item) => ({
						rotulo: item.rotulo,
						valor: item.valor,
					}))}
				/>
			) : null}

			<RelatorioSecao titulo="Registros" nota={`${linhas.length} registro(s)`}>
				{linhas.length > 0 ? (
					<table className="relatorio-tabela relatorio-tabela--lista">
						<thead>
							<tr>
								{colunas.map((coluna) => (
									<th key={coluna.chave} scope="col">
										{coluna.rotulo}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{linhas.map((linha) => (
								<tr key={linha.chave}>
									{linha.celulas.map((celula, posicao) => (
										<td key={colunas[posicao]?.chave ?? posicao}>{celula}</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
				) : (
					<p className="relatorio-vazio">Nenhum registro no período.</p>
				)}
			</RelatorioSecao>

			<p className="relatorio-rodape">
				Documento gerado pela EVA na plataforma Nutriz em {emissao}. Dados
				operacionais, sem informação clínica. Uso interno da Lactare.
			</p>
		</article>,
		document.body,
	);
}
