import wordmarkColor from "@/assets/images/nutriz-logo.svg";
import wordmarkWhite from "@/assets/images/nutriz-logo-branco.svg";
import { cn } from "@/lib/utils";

type WordmarkProps = {
	className?: string;
	variant?: "white" | "color";
};

export function Wordmark({ className, variant = "white" }: WordmarkProps) {
	return (
		<img
			src={variant === "color" ? wordmarkColor : wordmarkWhite}
			alt="Nutriz"
			className={cn("h-7 w-auto select-none", className)}
		/>
	);
}
