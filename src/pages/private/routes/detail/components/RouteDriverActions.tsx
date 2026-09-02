import { CircleAlert, CircleCheckBig, CirclePlay } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
	variante: "topo" | "rodape";
	podeIniciar: boolean;
	podeFinalizar: boolean;
	podeReportar: boolean;
	onIniciar: () => void;
	onFinalizar: () => void;
	onReportar: () => void;
};

export function RouteDriverActions({
	variante,
	podeIniciar,
	podeFinalizar,
	podeReportar,
	onIniciar,
	onFinalizar,
	onReportar,
}: Props) {
	if (!podeIniciar && !podeFinalizar && !podeReportar) {
		return null;
	}

	const noRodape = variante === "rodape";

	const principal = cn(
		"gradient-blue flex items-center justify-center gap-2.5 rounded-full font-bold text-white shadow-lift outline-none transition-[transform,filter] hover:brightness-110 focus-visible:ring-4 focus-visible:ring-blue-bright/60 active:scale-[0.98]",
		noRodape ? "h-14 flex-1 text-[17px]" : "h-14 px-8 text-[16px]",
	);

	const secundario = cn(
		"flex shrink-0 items-center justify-center gap-2 rounded-full border-[1.5px] border-danger-tint bg-surface font-semibold text-danger outline-none transition-colors hover:bg-danger-tint focus-visible:ring-4 focus-visible:ring-danger/40",
		noRodape ? "size-14 sm:h-14 sm:w-auto sm:px-6" : "h-14 px-6 text-[15px]",
	);

	return (
		<div className={cn("flex items-center gap-3", noRodape && "w-full")}>
			{podeIniciar && (
				<button type="button" onClick={onIniciar} className={principal}>
					<CirclePlay className="size-6" strokeWidth={2.2} />
					Iniciar rota
				</button>
			)}

			{podeFinalizar && (
				<button type="button" onClick={onFinalizar} className={principal}>
					<CircleCheckBig className="size-6" strokeWidth={2.2} />
					Finalizar rota
				</button>
			)}

			{podeReportar && (
				<button
					type="button"
					onClick={onReportar}
					aria-label="Reportar problema na rota"
					className={secundario}
				>
					<CircleAlert className="size-6" strokeWidth={2.2} />
					<span className={noRodape ? "hidden sm:inline" : undefined}>
						Reportar problema
					</span>
				</button>
			)}
		</div>
	);
}
