import { cn } from "@/lib/utils";

const LARGURA = 1440;
const ALTURA = 260;

const cristaDaOnda = (
	altura: number,
	amplitude: number,
	deslocamento: number,
) =>
	[
		`${deslocamento},${altura}`,
		`C${deslocamento + 180},${altura - amplitude}`,
		`${deslocamento + 360},${altura + amplitude}`,
		`${deslocamento + 540},${altura}`,
		`C${deslocamento + 720},${altura - amplitude}`,
		`${deslocamento + 900},${altura + amplitude}`,
		`${deslocamento + 1080},${altura}`,
		`C${deslocamento + 1200},${altura - amplitude * 0.7}`,
		`${deslocamento + 1320},${altura + amplitude * 0.7}`,
		`${deslocamento + LARGURA},${altura}`,
	].join(" ");

const linhaDaOnda = (altura: number, amplitude: number) =>
	`M${cristaDaOnda(altura, amplitude, 0)} L${cristaDaOnda(altura, amplitude, LARGURA)}`;

const faixaDaOnda = (altura: number, amplitude: number) =>
	`${linhaDaOnda(altura, amplitude)} L${LARGURA * 2},${ALTURA} L0,${ALTURA} Z`;

type CamadaProps = {
	id: string;
	altura: number;
	amplitude: number;
	duracao: number;
	opacidadeDaCrista: number;
	traco?: boolean;
	espessura?: number;
};

function Camada({
	id,
	altura,
	amplitude,
	duracao,
	opacidadeDaCrista,
	traco = false,
	espessura = 2,
}: CamadaProps) {
	return (
		<div
			className="onda-camada absolute bottom-0 left-0 h-full w-[200%]"
			style={{ animationDuration: `${duracao}s` }}
		>
			<svg
				viewBox={`0 0 ${LARGURA * 2} ${ALTURA}`}
				preserveAspectRatio="none"
				className="h-full w-full"
			>
				<title>Transição em ondas</title>
				<defs>
					<linearGradient id={id} x1="0" y1="0" x2="0" y2="1">
						<stop
							offset="0%"
							stopColor="currentColor"
							stopOpacity={opacidadeDaCrista}
						/>
						<stop
							offset="45%"
							stopColor="currentColor"
							stopOpacity={Math.min(1, opacidadeDaCrista + 0.35)}
						/>
						<stop offset="100%" stopColor="currentColor" stopOpacity="1" />
					</linearGradient>
				</defs>
				{traco ? (
					<path
						d={linhaDaOnda(altura, amplitude)}
						fill="none"
						stroke="currentColor"
						strokeWidth={espessura}
						strokeLinecap="round"
						opacity={opacidadeDaCrista}
						vectorEffect="non-scaling-stroke"
					/>
				) : (
					<path d={faixaDaOnda(altura, amplitude)} fill={`url(#${id})`} />
				)}
			</svg>
		</div>
	);
}

type SectionWaveProps = {
	nome: string;
	corDeBaixoClassName: string;
	fundoClassName?: string;
	className?: string;
	modo?: "preenchido" | "traco";
	velocidade?: number;
};

export function SectionWave({
	nome,
	corDeBaixoClassName,
	fundoClassName,
	className,
	modo = "preenchido",
	velocidade = 1,
}: SectionWaveProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"pointer-events-none relative overflow-hidden",
				corDeBaixoClassName,
				fundoClassName,
				className,
			)}
		>
			{modo === "traco" ? (
				<>
					<Camada
						id={`${nome}-traco-fundo`}
						altura={150}
						amplitude={44}
						duracao={30 / velocidade}
						opacidadeDaCrista={0.3}
						espessura={1}
						traco
					/>
					<Camada
						id={`${nome}-traco-meio`}
						altura={128}
						amplitude={32}
						duracao={20 / velocidade}
						opacidadeDaCrista={0.55}
						espessura={1.5}
						traco
					/>
					<Camada
						id={`${nome}-traco-frente`}
						altura={110}
						amplitude={22}
						duracao={13 / velocidade}
						opacidadeDaCrista={0.9}
						espessura={2}
						traco
					/>
				</>
			) : (
				<>
					<Camada
						id={`${nome}-fundo`}
						altura={150}
						amplitude={62}
						duracao={26 / velocidade}
						opacidadeDaCrista={0.12}
					/>
					<Camada
						id={`${nome}-meio`}
						altura={118}
						amplitude={48}
						duracao={18 / velocidade}
						opacidadeDaCrista={0.22}
					/>
					<Camada
						id={`${nome}-frente`}
						altura={86}
						amplitude={34}
						duracao={12 / velocidade}
						opacidadeDaCrista={0.4}
					/>
				</>
			)}
		</div>
	);
}
