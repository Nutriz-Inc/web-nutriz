import { cn } from "@/lib/utils";
import { SectionWave } from "./SectionWave";

type SectionRibbonProps = {
	nome: string;
	corDeBaixoClassName: string;
	fundoClassName: string;
	fitaClassName?: string;
	className?: string;
};

export function SectionRibbon({
	nome,
	corDeBaixoClassName,
	fundoClassName,
	fitaClassName = "text-blue-tint",
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
				nome={`${nome}-fita`}
				corDeBaixoClassName={fitaClassName}
				velocidade={0.55}
				className="absolute inset-x-0 bottom-[34%] h-full"
			/>
			<SectionWave
				nome={nome}
				corDeBaixoClassName={corDeBaixoClassName}
				className="absolute inset-0"
			/>
		</div>
	);
}
