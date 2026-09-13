type RelatorioRoscaProps = {
	percentual: number;
	corDoArco: string;
	corDoTrilho: string;
};

const RAIO = 40;
const PERIMETRO = 2 * Math.PI * RAIO;

export function RelatorioRosca({
	percentual,
	corDoArco,
	corDoTrilho,
}: RelatorioRoscaProps) {
	const preenchido = (Math.min(Math.max(percentual, 0), 100) / 100) * PERIMETRO;

	return (
		<div className="relatorio-rosca">
			<svg viewBox="0 0 100 100" role="img" aria-label={`${percentual}%`}>
				<circle
					cx="50"
					cy="50"
					r={RAIO}
					fill="none"
					stroke={corDoTrilho}
					strokeWidth="12"
				/>
				<circle
					cx="50"
					cy="50"
					r={RAIO}
					fill="none"
					stroke={corDoArco}
					strokeWidth="12"
					strokeLinecap="round"
					strokeDasharray={`${preenchido} ${PERIMETRO - preenchido}`}
				/>
			</svg>
			<span className="relatorio-rosca-centro">{percentual}%</span>
		</div>
	);
}
