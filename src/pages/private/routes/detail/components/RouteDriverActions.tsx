import { CircleAlert, Flag, Play } from "lucide-react";
import { cn } from "@/lib/utils";
import { CLASSE_BOTAO_PRIMARIO, CLASSE_BOTAO_SECUNDARIO } from "../constants";

type Props = {
	podeIniciar: boolean;
	podeFinalizar: boolean;
	podeReportar: boolean;
	onIniciar: () => void;
	onFinalizar: () => void;
	onReportar: () => void;
};

export function RouteDriverActions({
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

	return (
		<div className="sticky bottom-0 z-20 -mx-4 border-t border-line bg-surface px-4 py-3.5 shadow-lift sm:-mx-6 sm:px-6 lg:static lg:mx-0 lg:rounded-3xl lg:border lg:p-6 lg:shadow-soft">
			<div className="mx-auto flex w-full max-w-[1400px] flex-col gap-2.5 sm:flex-row sm:items-center lg:flex-col lg:items-stretch">
				{podeIniciar && (
					<button
						type="button"
						onClick={onIniciar}
						className={cn(CLASSE_BOTAO_PRIMARIO, "flex-1 text-[16px]")}
					>
						<Play className="size-[18px]" />
						Iniciar rota
					</button>
				)}

				{podeFinalizar && (
					<button
						type="button"
						onClick={onFinalizar}
						className={cn(CLASSE_BOTAO_PRIMARIO, "flex-1 text-[16px]")}
					>
						<Flag className="size-[18px]" />
						Finalizar rota
					</button>
				)}

				{podeReportar && (
					<button
						type="button"
						onClick={onReportar}
						className={cn(
							CLASSE_BOTAO_SECUNDARIO,
							"border-danger-tint text-danger hover:bg-danger-tint sm:flex-none lg:flex-1",
						)}
					>
						<CircleAlert className="size-[18px]" />
						Reportar problema
					</button>
				)}
			</div>
		</div>
	);
}
