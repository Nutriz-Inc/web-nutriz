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
					className="flex items-center gap-1.5 rounded-full border border-[#df5a7a]/30 bg-[#fbe8ec] px-3 py-1.5 text-[12px] font-semibold text-[#df5a7a] disabled:opacity-60"
				>
					Remover
					<Trash2 className="size-3.5" />
				</button>
			</AlertDialogTrigger>
			<AlertDialogContent>
				<AlertDialogHeader>
					<div className="flex size-12 items-center justify-center rounded-full bg-[#fbe8ec]">
						<Trash2 className="size-5 text-[#df5a7a]" />
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
