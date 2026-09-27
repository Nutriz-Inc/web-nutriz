import { Download, FileText } from "lucide-react";
import { useCallback, useState } from "react";
import { baixarCsv } from "../relatorio/baixar-csv";
import { formatarCelula } from "../relatorio/formatar-celula";
import type { RelatorioDaEva } from "../types";
import { ImpressaoDoRelatorio } from "./impressao-do-relatorio";

const COLUNAS_NA_PREVIA = 3;
const LINHAS_NA_PREVIA = 4;

export function RelatorioNoChat({ relatorio }: { relatorio: RelatorioDaEva }) {
	const colunas = relatorio.colunas.slice(0, COLUNAS_NA_PREVIA);
	const linhas = relatorio.linhas.slice(0, LINHAS_NA_PREVIA);
	const restantes = relatorio.linhas.length - linhas.length;
	const [imprimindo, setImprimindo] = useState(false);
	const encerrarImpressao = useCallback(() => setImprimindo(false), []);

	return (
		<section
			className="eva-relatorio"
			aria-label={`Relatório: ${relatorio.titulo}`}
		>
			<header className="eva-relatorio-topo">
				<span className="eva-relatorio-icone" aria-hidden="true">
					<FileText size={16} strokeWidth={2} />
				</span>
				<div>
					<p className="eva-relatorio-titulo">{relatorio.titulo}</p>
					<p className="eva-relatorio-sub">
						{relatorio.periodo ? `${relatorio.periodo} · ` : ""}
						{relatorio.linhas.length} registro(s)
					</p>
				</div>
			</header>

			{linhas.length > 0 ? (
				<div className="eva-relatorio-previa">
					<table>
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
								<tr key={JSON.stringify(linha)}>
									{colunas.map((coluna) => (
										<td key={coluna.chave}>
											{formatarCelula(linha[coluna.chave])}
										</td>
									))}
								</tr>
							))}
						</tbody>
					</table>
					{restantes > 0 || relatorio.colunas.length > COLUNAS_NA_PREVIA ? (
						<p className="eva-relatorio-mais">
							Arquivo completo com {relatorio.linhas.length} linha(s) e{" "}
							{relatorio.colunas.length} coluna(s).
						</p>
					) : null}
				</div>
			) : (
				<p className="eva-relatorio-mais">Nenhum registro no período.</p>
			)}

			<div className="eva-relatorio-acoes">
				<button
					type="button"
					className="eva-relatorio-botao"
					onClick={() => baixarCsv(relatorio)}
				>
					<Download size={15} aria-hidden="true" />
					Baixar CSV
				</button>
				<button
					type="button"
					className="eva-relatorio-botao eva-relatorio-botao--forte"
					onClick={() => setImprimindo(true)}
				>
					<Download size={15} aria-hidden="true" />
					Baixar PDF
				</button>
			</div>
			{imprimindo ? (
				<ImpressaoDoRelatorio relatorio={relatorio} onFim={encerrarImpressao} />
			) : null}
		</section>
	);
}
