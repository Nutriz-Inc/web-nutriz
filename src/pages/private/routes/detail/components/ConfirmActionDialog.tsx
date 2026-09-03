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
import { cn } from "@/lib/utils";
import {
	CLASSE_BOTAO_PERIGO,
	CLASSE_BOTAO_PRIMARIO,
	CLASSE_BOTAO_SECUNDARIO,
} from "../constants";

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
						className={cn(CLASSE_BOTAO_SECUNDARIO, "mt-0")}
					>
						Voltar
					</AlertDialogCancel>
					<AlertDialogAction
						disabled={carregando}
						onClick={(event) => {
							event.preventDefault();
							onConfirmar();
						}}
						className={
							tom === "perigo" ? CLASSE_BOTAO_PERIGO : CLASSE_BOTAO_PRIMARIO
						}
					>
						{carregando && <LoaderCircle className="size-4 animate-spin" />}
						{rotuloConfirmar}
					</AlertDialogAction>
				</AlertDialogFooter>
			</AlertDialogContent>
		</AlertDialog>
	);
}
