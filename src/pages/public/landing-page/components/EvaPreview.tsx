import { motion, useInView, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { EASE_OUT } from "@/lib/easing";
import { AvatarEva } from "@/pages/private/eva/components/avatar-eva";
import "@/pages/private/eva/eva.css";
import { EvaPreviewDigitando } from "./EvaPreviewDigitando";

const ROTEIRO = [
	{ fase: 1, aos: 250 },
	{ fase: 2, aos: 900 },
	{ fase: 3, aos: 2300 },
	{ fase: 4, aos: 3000 },
] as const;

const FASE_FINAL = 4;

function surgir(visivel: boolean, origem: "left" | "right") {
	return {
		initial: false,
		animate: visivel
			? { opacity: 1, y: 0, scale: 1 }
			: { opacity: 0, y: 8, scale: 0.96 },
		transition: { duration: 0.35, ease: EASE_OUT },
		style: { transformOrigin: `bottom ${origem}` },
	} as const;
}

export function EvaPreview() {
	const reduzirMovimento = useReducedMotion();
	const ref = useRef<HTMLDivElement>(null);
	const visto = useInView(ref, { once: true, amount: 0.6 });
	const [fase, setFase] = useState(0);

	useEffect(() => {
		if (!visto) {
			return;
		}
		if (reduzirMovimento) {
			setFase(FASE_FINAL);
			return;
		}

		const relogios = ROTEIRO.map(({ fase: proxima, aos }) =>
			window.setTimeout(() => setFase(proxima), aos),
		);

		return () => relogios.forEach(window.clearTimeout);
	}, [visto, reduzirMovimento]);

	const faseVisivel = reduzirMovimento ? FASE_FINAL : fase;

	return (
		<div
			ref={ref}
			aria-hidden="true"
			className="eva-scope rounded-card w-full max-w-[380px] flex-none border border-line bg-surface p-5 shadow-lift lg:w-[380px]"
		>
			<div className="flex items-center gap-3">
				<AvatarEva size={44} squircle />
				<div className="min-w-0">
					<p className="eva-welcome-name text-[17px]">Assistente EVA</p>
					<p className="mt-0.5 text-[12px] text-ink-3">
						Responde na hora, a qualquer hora
					</p>
				</div>
			</div>

			<motion.div
				{...surgir(faseVisivel >= 1, "right")}
				className="mt-5 flex flex-col items-end gap-1"
			>
				<p className="max-w-[84%] rounded-[18px_18px_6px_18px] bg-eva-tint px-3.5 py-2.5 text-[14px] leading-snug text-ink">
					Meu bebê tem 4 meses, ainda posso doar?
				</p>
				<span className="eva-msg-time pr-1.5">21:04</span>
			</motion.div>

			<div className="relative mt-3">
				<motion.div
					{...surgir(faseVisivel === 2, "left")}
					className="absolute top-0 left-0 flex items-end gap-2"
				>
					<AvatarEva size={28} pulse />
					<EvaPreviewDigitando />
				</motion.div>

				<motion.div
					{...surgir(faseVisivel >= 3, "left")}
					className="flex items-end gap-2"
				>
					<AvatarEva size={28} />
					<div className="flex min-w-0 flex-col gap-1">
						<p className="rounded-[18px_18px_18px_6px] bg-surface-3 px-3.5 py-2.5 text-[14px] leading-snug text-ink">
							Pode sim! Enquanto você amamenta e tem leite de sobra, sua doação
							é muito bem-vinda.
						</p>
						<span className="eva-msg-time pl-1.5">21:04</span>
					</div>
				</motion.div>
			</div>

			<motion.div
				{...surgir(faseVisivel >= 4, "left")}
				className="mt-3 flex items-end gap-2"
			>
				<AvatarEva size={28} pulse />
				<EvaPreviewDigitando />
			</motion.div>
		</div>
	);
}
