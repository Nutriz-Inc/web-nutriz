import { LoaderCircle } from "lucide-react";
import type { ReactNode } from "react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {} from "../constants";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	titulo: string;
	descricao: string;
	rotuloConfirmar: string;
	tom?: "primario" | "perigo";
	carregando: boolean;
	erro?: string;
	extra?: ReactNode;
	onConfirmar: () => void;
};

export function ConfirmActionDialog({
	open,
	onOpenChange,
	titulo,
	descricao,
	rotuloConfirmar,
	tom = "primario",
	carregando,
	erro,
	extra,
	onConfirmar,
}: Props) {
	return (
		<AlertDialog
			open={open}
			onOpenChange={carregando ? () => {} : onOpenChange}
		>
			<AlertDialogContent className="rounded-card border-line bg-surface">
				<AlertDialogHeader>
					<AlertDialogTitle className="text-[18px] font-bold text-ink">
						{titulo}
					</AlertDialogTitle>
					<AlertDialogDescription className="text-[14px] leading-relaxed text-ink-2">
						{descricao}
					</AlertDialogDescription>
				</AlertDialogHeader>

				{extra}

				{erro && (
					<p className="rounded-xl bg-danger-tint px-3.5 py-2.5 text-[13px] font-semibold text-danger">
						{erro}
					</p>
				)}

				<AlertDialogFooter className="gap-2.5">
					<AlertDialogCancel
						disabled={carregando}
						className={cn(
							buttonVariants({ variant: "neutral", size: "pill" }),
							"mt-0",
						)}
					>
						Voltar
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={carregando}
						onClick={(event) => {
							event.preventDefault();
							onConfirmar();
						}}
						className={buttonVariants({
							variant: tom === "perigo" ? "danger" : "primary",
							size: "pill",
						})}
					>
						{carregando && <LoaderCircle className="size-4 animate-spin" />}
						{rotuloConfirmar}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
