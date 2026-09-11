import { Ban, CircleAlert } from "lucide-react";

type Props = {
	podeCancelar: boolean;
	podeReportar: boolean;
	onCancelar: () => void;
	onReportar: () => void;
};

const PERIGO =
	"flex h-8 shrink-0 items-center justify-center gap-1.5 rounded-full px-2 text-[13px] font-semibold text-danger outline-none transition-colors hover:bg-danger-tint focus-visible:ring-4 focus-visible:ring-danger/40 sm:h-11 sm:gap-2 sm:border-[1.5px] sm:border-danger/35 sm:bg-surface sm:px-5 sm:text-[14px] sm:hover:border-danger";

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
		<div className="ml-auto flex shrink-0 flex-wrap items-center justify-end gap-1 sm:gap-2.5">
			{podeReportar && (
				<button type="button" onClick={onReportar} className={PERIGO}>
					<CircleAlert className="size-4 sm:size-[18px]" />
					Reportar problema
				</button>
			)}

			{podeCancelar && (
				<button type="button" onClick={onCancelar} className={PERIGO}>
					<Ban className="size-4 sm:size-[18px]" />
					Cancelar rota
				</button>
			)}
		</div>
	);
}
