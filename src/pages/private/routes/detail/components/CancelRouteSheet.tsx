import { AlertTriangle, LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	CLASSE_BOTAO_PERIGO,
	CLASSE_BOTAO_SECUNDARIO,
	CLASSE_CAMPO_TEXTO,
	CLASSE_SHEET,
} from "../constants";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onConfirmar: (motivo: string) => void;
	salvando: boolean;
	erro?: string;
};

export function CancelRouteSheet({
	open,
	onOpenChange,
	onConfirmar,
	salvando,
	erro,
}: Props) {
	const [motivo, setMotivo] = useState("");
	const [erroLocal, setErroLocal] = useState<string>();

	useEffect(() => {
		if (open) {
			setMotivo("");
			setErroLocal(undefined);
		}
	}, [open]);

	function handleConfirmar() {
		const limpo = motivo.trim();

		if (!limpo) {
			setErroLocal("Descreva o motivo do cancelamento.");
			return;
		}

		setErroLocal(undefined);
		onConfirmar(limpo);
	}

	return (
		<Sheet open={open} onOpenChange={salvando ? () => {} : onOpenChange}>
			<SheetContent side="bottom" className={CLASSE_SHEET}>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-[22px] font-bold text-ink">
						Cancelar esta rota?
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						A rota fica encerrada e não pode mais ser alterada. Esta ação não
						tem volta.
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
					<p className="flex items-start gap-2 rounded-xl bg-danger-tint px-3.5 py-3 text-[13px] font-semibold text-danger">
						<AlertTriangle className="mt-px size-4 shrink-0" />
						As paradas desta rota deixam de ser atendidas.
					</p>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="rota-motivo"
							className="text-[13px] font-semibold text-ink-2"
						>
							Motivo do cancelamento
						</label>
						<textarea
							id="rota-motivo"
							value={motivo}
							onChange={(event) => setMotivo(event.target.value)}
							rows={4}
							maxLength={500}
							placeholder="Explique por que a rota está sendo cancelada..."
							className={CLASSE_CAMPO_TEXTO}
						/>
					</div>

					{(erroLocal || erro) && (
						<p className="rounded-xl bg-danger-tint px-3.5 py-2.5 text-[13px] font-semibold text-danger">
							{erroLocal ?? erro}
						</p>
					)}
				</div>

				<div className="flex shrink-0 flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						disabled={salvando}
						className={CLASSE_BOTAO_SECUNDARIO}
					>
						Voltar
					</button>
					<button
						type="button"
						onClick={handleConfirmar}
						disabled={salvando}
						className={CLASSE_BOTAO_PERIGO}
					>
						{salvando && <LoaderCircle className="size-4 animate-spin" />}
						Confirmar cancelamento
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
