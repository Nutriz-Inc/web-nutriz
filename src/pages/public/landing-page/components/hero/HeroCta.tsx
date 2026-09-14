import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type HeroCtaProps = {
	label: string;
	onClick: () => void;
	variante?: "solido" | "contorno";
};

export function HeroCta({ label, onClick, variante = "solido" }: HeroCtaProps) {
	const solido = variante === "solido";

	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group relative inline-flex h-12 items-center gap-3 overflow-hidden rounded-full px-7 text-[15px] font-semibold outline-none transition-transform duration-300 ease-out focus-visible:ring-3 focus-visible:ring-mint/60 motion-safe:hover:-translate-y-0.5",
				solido
					? "bg-surface-on-fill text-ink-on-fill shadow-lift"
					: "border border-white/70 text-white",
			)}
		>
			<span
				aria-hidden="true"
				className={cn(
					"absolute inset-0 origin-left scale-x-0 transition-transform duration-500 ease-out group-hover:scale-x-100",
					solido ? "bg-blue-deep-fill" : "bg-surface-on-fill",
				)}
			/>

			<span
				className={cn(
					"relative z-10 transition-colors duration-300 ease-out",
					solido ? "group-hover:text-white" : "group-hover:text-ink-on-fill",
				)}
			>
				{label}
			</span>

			<ArrowRight
				aria-hidden="true"
				className={cn(
					"relative z-10 size-4 shrink-0 transition-[transform,color] duration-300 ease-out motion-safe:group-hover:translate-x-1",
					solido ? "group-hover:text-white" : "group-hover:text-ink-on-fill",
				)}
			/>
		</button>
	);
}
