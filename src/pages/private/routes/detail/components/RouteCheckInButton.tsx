import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Check, LoaderCircle, Play } from "lucide-react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type EstadoCheckIn = "pronto" | "enviando" | "concluido" | "oculto";

const DURACAO_COMEMORACAO_MS = 1700;
const ONDAS = [0, 1300, 2600];

function horaAgora(): string {
	return new Date().toLocaleTimeString("pt-BR", {
		hour: "2-digit",
		minute: "2-digit",
	});
}

type Props = {
	onIniciar: () => Promise<unknown>;
	onEstadoChange: (estado: EstadoCheckIn) => void;
	erro?: string;
};

export function RouteCheckInButton({ onIniciar, onEstadoChange, erro }: Props) {
	const reduzirMovimento = useReducedMotion();

	const [estado, setEstado] = useState<EstadoCheckIn>("pronto");
	const [hora, setHora] = useState(horaAgora);
	const [horaRegistrada, setHoraRegistrada] = useState<string>();

	useEffect(() => {
		onEstadoChange(estado);
	}, [estado, onEstadoChange]);

	useEffect(() => {
		if (estado !== "pronto") {
			return;
		}

		const relogio = window.setInterval(() => setHora(horaAgora()), 15000);

		return () => window.clearInterval(relogio);
	}, [estado]);

	useEffect(() => {
		if (estado !== "concluido") {
			return;
		}

		const relogio = window.setTimeout(
			() => setEstado("oculto"),
			DURACAO_COMEMORACAO_MS,
		);

		return () => window.clearTimeout(relogio);
	}, [estado]);

	async function handleClick() {
		if (estado !== "pronto") {
			return;
		}

		setEstado("enviando");

		try {
			await onIniciar();
			setHoraRegistrada(horaAgora());
			setEstado("concluido");
		} catch {
			setEstado("pronto");
		}
	}

	const concluido = estado === "concluido";
	const enviando = estado === "enviando";

	return (
		<AnimatePresence>
			{estado !== "oculto" && (
				<motion.div
					key="check-in"
					initial={reduzirMovimento ? false : { opacity: 0, scale: 0.94 }}
					animate={{ opacity: 1, scale: 1 }}
					exit={
						reduzirMovimento
							? { opacity: 0 }
							: { opacity: 0, scale: 1.14, filter: "blur(6px)" }
					}
					transition={{
						duration: concluido ? 1.1 : 0.5,
						ease: [0.16, 1, 0.3, 1],
					}}
					className="pointer-events-none absolute inset-0 z-[500] flex flex-col items-center justify-center gap-4"
				>
					<div className="relative flex items-center justify-center">
						{!reduzirMovimento &&
							!enviando &&
							ONDAS.map((atraso) => (
								<span
									key={atraso}
									aria-hidden="true"
									style={{ animationDelay: `${atraso}ms` }}
									className={cn(
										"absolute size-[132px] rounded-full motion-safe:onda-checkin sm:size-[156px]",
										concluido ? "bg-success" : "bg-blue-bright",
									)}
								/>
							))}

						<motion.button
							type="button"
							onClick={handleClick}
							disabled={estado !== "pronto"}
							aria-label={
								concluido
									? `Rota iniciada às ${horaRegistrada ?? hora}`
									: `Iniciar rota agora, ${hora}`
							}
							animate={
								concluido && !reduzirMovimento
									? { scale: [1, 1.07, 1] }
									: { scale: 1 }
							}
							transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
							className={cn(
								"pointer-events-auto relative flex size-[132px] flex-col items-center justify-center gap-1 rounded-full sm:size-[156px] text-white outline-none transition-colors duration-700 focus-visible:ring-4 focus-visible:ring-offset-2 focus-visible:ring-offset-surface disabled:cursor-default",
								concluido
									? "bg-success-fill focus-visible:ring-success/60"
									: "bg-blue-deep-fill hover:bg-blue-fill focus-visible:ring-blue-bright/60 active:scale-[0.97]",
							)}
						>
							<span className="font-sans text-[24px] font-extrabold leading-none tabular-nums sm:text-[26px]">
								{concluido ? (horaRegistrada ?? hora) : hora}
							</span>

							<span className="text-[13px] font-bold sm:text-[14px]">
								{concluido ? "Rota iniciada" : "Iniciar rota"}
							</span>

							<span className="mt-0.5 flex size-8 items-center justify-center rounded-full bg-white/15 sm:mt-1 sm:size-9">
								{enviando ? (
									<LoaderCircle className="size-5 animate-spin" />
								) : concluido ? (
									<Check className="size-5" strokeWidth={3} />
								) : (
									<Play
										className="size-5"
										strokeWidth={2.4}
										fill="currentColor"
									/>
								)}
							</span>
						</motion.button>
					</div>

					{erro && !concluido && (
						<p className="pointer-events-auto max-w-[280px] rounded-xl bg-danger-tint px-3.5 py-2.5 text-center text-[12px] font-semibold text-danger shadow-soft">
							{erro}
						</p>
					)}
				</motion.div>
			)}
		</AnimatePresence>
	);
}
