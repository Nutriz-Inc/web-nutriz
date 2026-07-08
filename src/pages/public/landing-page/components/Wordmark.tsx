import { cn } from "@/lib/utils";
import wordmarkColor from "../assets/nutriz-wordmark-blue.png";
import wordmarkWhite from "../assets/nutriz-wordmark-white.png";

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
