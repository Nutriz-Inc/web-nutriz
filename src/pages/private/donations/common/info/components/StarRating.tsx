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
					<Star
						className={cn(
							size === "lg" ? "size-6" : "size-4",
							star <= value
								? "fill-[#f2b705] text-[#f2b705]"
								: "fill-transparent text-[#d7dee8]",
						)}
					/>
				</button>
			))}
		</div>
	);
}
