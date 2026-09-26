import { Fragment } from "react";
import { interpretar, type LinhaDeTexto } from "../markdown-leve";

function Linha({ linha }: { linha: LinhaDeTexto }) {
	return (
		<>
			{linha.trechos.map((trecho) =>
				trecho.negrito ? (
					<strong key={trecho.chave}>{trecho.texto}</strong>
				) : (
					<Fragment key={trecho.chave}>{trecho.texto}</Fragment>
				),
			)}
		</>
	);
}

export function TextoDaEva({ texto }: { texto: string }) {
	const blocos = interpretar(texto);

	return (
		<div className="eva-texto">
			{blocos.map((bloco) => {
				if (bloco.tipo === "tabela") {
					return (
						<div key={bloco.chave} className="eva-texto-tabela">
							<table>
								<thead>
									<tr>
										{bloco.cabecalho.map((celula) => (
											<th key={celula.chave} scope="col">
												{celula.texto}
											</th>
										))}
									</tr>
								</thead>
								<tbody>
									{bloco.linhas.map((linha) => (
										<tr key={linha.chave}>
											{linha.celulas.map((celula) => (
												<td key={celula.chave}>{celula.texto}</td>
											))}
										</tr>
									))}
								</tbody>
							</table>
						</div>
					);
				}

				if (bloco.tipo === "lista") {
					const Lista = bloco.ordenada ? "ol" : "ul";
					return (
						<Lista key={bloco.chave}>
							{bloco.itens.map((item) => (
								<li key={item.chave}>
									<Linha linha={item} />
								</li>
							))}
						</Lista>
					);
				}

				return (
					<p key={bloco.chave}>
						{bloco.linhas.map((linha, posicao) => (
							<Fragment key={linha.chave}>
								{posicao > 0 ? <br /> : null}
								<Linha linha={linha} />
							</Fragment>
						))}
					</p>
				);
			})}
		</div>
	);
}
