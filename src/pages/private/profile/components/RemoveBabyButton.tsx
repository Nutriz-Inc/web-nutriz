import { Trash2 } from "lucide-react";
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
					className="flex items-center gap-1.5 rounded-full border border-eva/30 bg-eva-tint px-3 py-1.5 text-[12px] font-semibold text-eva-deep disabled:opacity-60"
				>
					Remover
					<Trash2 className="size-3.5" />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex size-12 items-center justify-center rounded-full bg-eva-tint">
						<Trash2 className="size-5 text-eva-deep" />
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
