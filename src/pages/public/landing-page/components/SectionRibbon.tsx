import { cn } from "@/lib/utils";
import { SectionWave } from "./SectionWave";

type SectionRibbonProps = {
	nome: string;
	corDeCimaClassName: string;
	corDeBaixoClassName: string;
	fundoClassName: string;
	className?: string;
};

export function SectionRibbon({
	nome,
	corDeCimaClassName,
	corDeBaixoClassName,
	fundoClassName,
	className,
}: SectionRibbonProps) {
	return (
		<div
			aria-hidden="true"
			className={cn(
				"pointer-events-none relative overflow-hidden",
				fundoClassName,
				className,
			)}
		>
			<SectionWave
				nome={`${nome}-fita-funda`}
				corDeBaixoClassName="text-onda-funda"
				velocidade={0.4}
				className="absolute inset-x-0 bottom-[52%] h-full"
			/>
			<SectionWave
				nome={`${nome}-fita`}
				corDeBaixoClassName="text-onda-rasa"
				velocidade={0.62}
				className="absolute inset-x-0 bottom-[26%] h-full"
			/>
			<SectionWave
				nome={nome}
				corDeBaixoClassName={corDeBaixoClassName}
				className="absolute inset-0"
			/>
			<SectionWave
				nome={`${nome}-topo`}
				corDeBaixoClassName={corDeCimaClassName}
				velocidade={0.8}
				className="absolute inset-x-0 top-0 h-[38%] rotate-180"
			/>
		</div>
	);
}
