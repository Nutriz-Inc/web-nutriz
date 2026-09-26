import {
	type MotionValue,
	motion,
	useReducedMotion,
	useTransform,
} from "framer-motion";

const ONDA =
	"M0 18 C100 6 200 6 300 18 S500 30 600 18 S800 6 900 18 S1100 30 1200 18 L1200 60 L0 60 Z";

const NIVEL_FINAL = 58;

const CAMADAS = [
	{
		chave: "fundo",
		classe: "leite-superficie--fundo",
		pintura: "fill-white/10 stroke-none",
	},
	{ chave: "frente", classe: "", pintura: "fill-white/15 stroke-white/75" },
];

type LeiteSubindoProps = {
	progresso: MotionValue<number>;
};

export function LeiteSubindo({ progresso }: LeiteSubindoProps) {
	const reduzirMovimento = useReducedMotion();
	const nivel = useTransform(
		progresso,
		[0, 1],
		[`translateY(100%)`, `translateY(${NIVEL_FINAL}%)`],
	);

	return (
		<motion.div
			aria-hidden="true"
			className="pointer-events-none absolute inset-0 z-[1]"
			style={{
				transform: reduzirMovimento ? `translateY(${NIVEL_FINAL}%)` : nivel,
			}}
		>
			<div className="absolute inset-x-0 top-0 h-7 -translate-y-[calc(100%-1px)] overflow-hidden">
				{CAMADAS.map((camada) => (
					<div
						key={camada.chave}
						className={`leite-superficie absolute inset-y-0 left-0 w-[200%] ${camada.classe}`}
					>
						{[0, 1].map((copia) => (
							<svg
								key={copia}
								aria-hidden="true"
								viewBox="0 0 1200 60"
								preserveAspectRatio="none"
								className={`float-left h-full w-1/2 ${camada.pintura}`}
								strokeWidth="2"
							>
								<path d={ONDA} vectorEffect="non-scaling-stroke" />
							</svg>
						))}
					</div>
				))}
			</div>

			<div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.15)_0%,rgba(255,255,255,0.1)_100%)]">
				<span className="leite-bolha left-[18%] [--duracao:7s] [--atraso:0s]" />
				<span className="leite-bolha left-[46%] [--duracao:9s] [--atraso:2.5s]" />
				<span className="leite-bolha left-[71%] [--duracao:8s] [--atraso:1.2s]" />
				<span className="leite-bolha left-[88%] [--duracao:10s] [--atraso:4s]" />
			</div>
		</motion.div>
	);
}
