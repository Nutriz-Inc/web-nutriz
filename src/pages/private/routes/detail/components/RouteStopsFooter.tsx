import { CircleCheckBig } from "lucide-react";

type Props = {
	pendentes: number;
	podeFinalizar: boolean;
	onFinalizar: () => void;
};

export function RouteStopsFooter({
	pendentes,
	podeFinalizar,
	onFinalizar,
}: Props) {
	if (pendentes > 0) {
		return (
			<p className="border-t border-line px-5 py-4 text-[12px] text-ink-2">
				{pendentes === 1
					? "Falta marcar 1 parada para poder finalizar a rota."
					: `Faltam marcar ${pendentes} paradas para poder finalizar a rota.`}
			</p>
		);
	}

	if (!podeFinalizar) {
		return null;
	}

	return (
		<div className="mt-auto border-t border-line p-5">
			<button
				type="button"
				onClick={onFinalizar}
				className="flex h-14 w-full items-center justify-center gap-2.5 rounded-full bg-blue-deep-fill text-[17px] font-bold text-white outline-none transition-[transform,background-color] hover:bg-blue-fill focus-visible:ring-4 focus-visible:ring-blue-bright/60 active:scale-[0.98]"
			>
				<CircleCheckBig className="size-6" strokeWidth={2.2} />
				Finalizar rota
			</button>

			<p className="mt-2.5 text-center text-[12px] text-ink-2">
				Todas as paradas foram marcadas.
			</p>
		</div>
	);
}
