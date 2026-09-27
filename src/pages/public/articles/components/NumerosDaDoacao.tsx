import { DONATION_STATS } from "../constants";

export function NumerosDaDoacao() {
	return (
		<section
			aria-labelledby="numeros-da-doacao"
			className="flex flex-col gap-6"
		>
			<h2
				id="numeros-da-doacao"
				className="text-rotulo font-semibold uppercase tracking-[0.14em] text-ink-3"
			>
				A doação em números
			</h2>
			<dl className="grid grid-cols-2 gap-y-8 lg:grid-cols-4">
				{DONATION_STATS.map((numero, indice) => (
					<div
						key={numero.value}
						className={
							indice % 2 === 1
								? "border-l border-line pl-6 lg:pl-8"
								: indice > 0
									? "lg:border-l lg:border-line lg:pl-8"
									: ""
						}
					>
						<dt className="sr-only">{numero.label}</dt>
						<dd className="flex flex-col gap-2">
							<span className="font-display text-titulo font-bold leading-none tracking-tight text-blue-deep lg:text-pagina">
								{numero.value}
							</span>
							<span className="max-w-[22ch] text-apoio leading-snug text-ink-2">
								{numero.label}
							</span>
						</dd>
					</div>
				))}
			</dl>
		</section>
	);
}
