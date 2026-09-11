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
import { Button } from "@/components/ui/button";

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
				<Button
					variant="danger-soft"
					size="pill"
					type="button"
					disabled={loading}
					aria-busy={loading}
					className="shrink-0"
				>
					{loading ? (
						<LoaderCircle className="size-4 animate-spin" aria-hidden="true" />
					) : (
						<Trash2 className="size-4" aria-hidden="true" />
					)}
					Remover
				</Button>
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
