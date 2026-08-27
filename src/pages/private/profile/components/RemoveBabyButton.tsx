import { LoaderCircle, Trash2 } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type RemoveBabyButtonProps = {
	onConfirm: () => void;
	loading?: boolean;
};

export function RemoveBabyButton({
	onConfirm,
	loading,
}: RemoveBabyButtonProps) {
	return (
		<AlertDialog>
			<AlertDialogTrigger asChild>
				<button
					type="button"
					disabled={loading}
					aria-busy={loading}
					className="inline-flex h-11 shrink-0 items-center gap-1.5 rounded-full border border-danger/30 px-4 text-[13px] font-semibold text-danger outline-none transition-colors hover:bg-danger-tint focus-visible:ring-3 focus-visible:ring-danger/40 disabled:opacity-60 motion-reduce:transition-none"
				>
					{loading ? (
						<LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
					) : (
						<Trash2 className="size-4" aria-hidden="true" />
					)}
					Remover
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex size-12 items-center justify-center rounded-full bg-danger-tint">
						<Trash2 className="size-5 text-danger" aria-hidden="true" />
					</div>
					<AlertDialogTitle>Remover bebê</AlertDialogTitle>
					<AlertDialogDescription>
						Tem certeza que deseja remover? Essa ação não poderá ser desfeita.
					</AlertDialogDescription>
				</AlertDialogHeader>
				<AlertDialogFooter>
					<AlertDialogAction onClick={onConfirm}>Remover</AlertDialogAction>
					<AlertDialogCancel>Cancelar</AlertDialogCancel>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
