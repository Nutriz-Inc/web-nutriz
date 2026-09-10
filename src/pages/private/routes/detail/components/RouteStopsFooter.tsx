import { CircleCheckBig } from "lucide-react";
import { Button } from "@/components/ui/button";

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
			<Button
				variant="primary"
				size="pill-xl"
				type="button"
				onClick={onFinalizar}
				className="w-full"
			>
				<CircleCheckBig className="size-6" strokeWidth={2.2} />
				Finalizar rota
			</Button>

			<p className="mt-2.5 text-center text-[12px] text-ink-2">
				Todas as paradas foram marcadas.
			</p>
		</div>
	);
}
