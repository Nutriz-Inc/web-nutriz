import { Star } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	value: number;
	onChange?: (value: number) => void;
	size?: "sm" | "lg";
};

export function StarRating({ value, onChange, size = "lg" }: Props) {
	const isInteractive = Boolean(onChange);

	return (
		<div className="flex items-center gap-1">
			{[1, 2, 3, 4, 5].map((star) => (
				<button
					key={star}
					type="button"
					disabled={!isInteractive}
					onClick={() => onChange?.(star)}
					aria-label={`${star} estrela${star > 1 ? "s" : ""}`}
					className={cn(
						"disabled:cursor-default",
						isInteractive && "transition-transform active:scale-90",
					)}
				>
					{/*
					 * O contorno e que garante o contraste, nao o preenchimento.
					 * Amarelo claro sobre branco nao chega a 3:1 por natureza — o
					 * `--amber` cheio da 1,82:1. Mantendo o amarelo vivo por dentro e
					 * pondo `--warning` (ambar escuro, 6:1 sobre branco) no traco, a
					 * estrela continua brilhante e passa a ter borda legivel.
					 *
					 * A estrela vazia troca `--blue-tint-2` (1,4:1) por `--ink-3`: ela
					 * e o alvo de clique da avaliacao, entao precisa ser percebida.
					 */}
					<Star
						className={cn(
							size === "lg" ? "size-6" : "size-4",
							star <= value
								? "fill-amber text-warning"
								: "fill-transparent text-ink-3",
						)}
					/>
				</button>
			))}
		</div>
	);
}
