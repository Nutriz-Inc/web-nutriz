import { type ClassValue, clsx } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
	extend: {
		theme: {
			text: [
				"rotulo",
				"apoio",
				"corpo",
				"destaque",
				"secao",
				"titulo",
				"pagina",
				"numero",
			],
		},
	},
});

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}
