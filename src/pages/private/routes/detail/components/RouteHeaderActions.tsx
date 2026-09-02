import { Ban, CircleAlert } from "lucide-react";

type Props = {
	podeCancelar: boolean;
	podeReportar: boolean;
	onCancelar: () => void;
	onReportar: () => void;
};

const PERIGO =
	"flex h-11 items-center justify-center gap-2 rounded-full border-[1.5px] border-danger/35 bg-surface px-5 text-[14px] font-semibold text-danger outline-none transition-colors hover:border-danger hover:bg-danger-tint focus-visible:ring-4 focus-visible:ring-danger/40";

export function RouteHeaderActions({
	podeCancelar,
	podeReportar,
	onCancelar,
	onReportar,
}: Props) {
	if (!podeCancelar && !podeReportar) {
		return null;
	}

	return (
		<div className="flex w-full flex-wrap items-center gap-2.5 sm:w-auto">
			{podeReportar && (
				<button type="button" onClick={onReportar} className={PERIGO}>
					<CircleAlert className="size-[18px]" />
					Reportar problema
				</button>
			)}

			{podeCancelar && (
				<button type="button" onClick={onCancelar} className={PERIGO}>
					<Ban className="size-[18px]" />
					Cancelar rota
				</button>
			)}
		</div>
	);
}
