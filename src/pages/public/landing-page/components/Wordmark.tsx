import wordmarkColor from "@/assets/images/nutriz-wordmark-blue.png";
import wordmarkWhite from "@/assets/images/nutriz-wordmark-white.png";
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
