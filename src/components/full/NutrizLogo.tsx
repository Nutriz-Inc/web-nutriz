import logoCor from "@/assets/images/nutriz-logo.svg";
import logoBranco from "@/assets/images/nutriz-logo-branco.svg";
import { useAccessibility } from "@/context/accessibility-context";
import { cn } from "@/lib/utils";

type NutrizLogoProps = {
	className?: string;
};

export function NutrizLogo({ className }: NutrizLogoProps) {
	const { temaEfetivo } = useAccessibility();

	return (
		<img
			src={temaEfetivo === "escuro" ? logoBranco : logoCor}
			alt="Nutriz"
			className={cn("w-auto select-none", className)}
		/>
	);
}
