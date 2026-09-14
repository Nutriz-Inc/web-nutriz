import { cn } from "@/lib/utils";
import { SectionWave } from "./SectionWave";

type SectionRibbonProps = {
	nome: string;
	corDeBaixoClassName: string;
	fundoClassName: string;
	className?: string;
};

export function SectionRibbon({
	nome,
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
				corDeBaixoClassName="text-blue-tint-2/70"
				velocidade={0.4}
				className="absolute inset-x-0 bottom-[52%] h-full"
			/>
			<SectionWave
				nome={`${nome}-fita`}
				corDeBaixoClassName="text-blue-tint"
				velocidade={0.62}
				className="absolute inset-x-0 bottom-[26%] h-full"
			/>
			<SectionWave
				nome={nome}
				corDeBaixoClassName={corDeBaixoClassName}
				className="absolute inset-0"
			/>
		</div>
	);
}
