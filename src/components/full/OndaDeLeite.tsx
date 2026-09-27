import { useId } from "react";
import { cn } from "@/lib/utils";
import { SectionWave } from "./SectionWave";

type OndaDeLeiteProps = {
	className?: string;
	corClassName?: string;
	velocidade?: number;
};

export function OndaDeLeite({
	className,
	corClassName = "text-white",
	velocidade = 0.8,
}: OndaDeLeiteProps) {
	const nome = useId().replace(/:/g, "");

	return (
		<SectionWave
			nome={`leite-${nome}`}
			corDeBaixoClassName={corClassName}
			velocidade={velocidade}
			className={cn("absolute inset-x-0 bottom-0 -z-10", className)}
		/>
	);
}
