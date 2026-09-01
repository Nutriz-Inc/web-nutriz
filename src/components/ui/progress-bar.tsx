import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type ProgressBarProps = {
	current: number;
	total: number;
	label?: string;
	size?: "sm" | "md";
	className?: string;
};

const DURACAO_BRILHO_MS = 1500;

export function ProgressBar({
	current,
	total,
	label = "Progresso da doação",
	size = "md",
	className,
}: ProgressBarProps) {
	const totalSeguro = total > 0 ? total : 1;
	const preenchido = Math.min(100, Math.max(0, (current / totalSeguro) * 100));

	const anterior = useRef(current);
	const [avancou, setAvancou] = useState(false);

	useEffect(() => {
		if (anterior.current === current) {
			return;
		}

		const cresceu = current > anterior.current;
		anterior.current = current;

		if (!cresceu) {
			return;
		}

		setAvancou(true);
		const relogio = window.setTimeout(
			() => setAvancou(false),
			DURACAO_BRILHO_MS,
		);

		return () => window.clearTimeout(relogio);
	}, [current]);

	return (
		<div
			role="progressbar"
			aria-label={label}
			aria-valuenow={current}
			aria-valuemin={0}
			aria-valuemax={totalSeguro}
			className={cn(
				"relative w-full overflow-hidden rounded-full bg-ink/10",
				size === "sm" ? "h-1.5" : "h-2",
				className,
			)}
		>
			<div
				className="relative h-full overflow-hidden rounded-full bg-gradient-to-r from-blue-bright to-mint transition-[width] duration-700 ease-out"
				style={{ width: `${preenchido}%` }}
			>
				{avancou && (
					<span
						aria-hidden="true"
						className="absolute inset-y-0 -left-1/2 w-1/2 bg-gradient-to-r from-transparent via-white/70 to-transparent motion-safe:brilho-barra"
					/>
				)}
			</div>
		</div>
	);
}
