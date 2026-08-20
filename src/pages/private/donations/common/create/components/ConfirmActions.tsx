import { Heart, LoaderCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type ConfirmActionsProps = {
	isPending: boolean;
	onConfirm: () => void;
	onCancel: () => void;
	className?: string;
};

/**
 * Acoes finais da tela. Repetem as do hero de proposito: depois de ler tudo,
 * a pessoa nao precisa voltar ao topo para confirmar.
 */
export function ConfirmActions({
	isPending,
	onConfirm,
	onCancel,
	className,
}: ConfirmActionsProps) {
	return (
		<div
			className={cn(
				"flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-end",
				className,
			)}
		>
			<Button
				type="button"
				size="pill"
				variant="ghost"
				onClick={onCancel}
				disabled={isPending}
				className="w-full border border-line font-semibold text-ink-2 hover:bg-blue-tint hover:text-blue-deep sm:w-auto"
			>
				Cancelar
			</Button>

			<Button
				type="button"
				size="pill"
				onClick={onConfirm}
				disabled={isPending}
				className="w-full bg-blue-deep font-semibold text-white shadow-soft hover:bg-blue sm:w-auto"
			>
				{isPending ? (
					<LoaderCircle className="animate-spin" />
				) : (
					<Heart className="fill-eva text-eva" />
				)}
				{isPending ? "Confirmando..." : "Confirmar doação"}
			</Button>
		</div>
	);
}
