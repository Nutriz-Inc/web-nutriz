import { CircleAlert, LoaderCircle } from "lucide-react";
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
	endereco: string;
	salvando: boolean;
	erro?: string;
	onConfirmar: (relato: string) => void;
};

export function StopIssueSheet({
	open,
	onOpenChange,
	endereco,
	salvando,
	erro,
	onConfirmar,
}: Props) {
	const [relato, setRelato] = useState("");
	const [erroLocal, setErroLocal] = useState<string>();

	useEffect(() => {
		if (open) {
			setRelato("");
			setErroLocal(undefined);
		}
	}, [open]);

	function handleConfirmar() {
		const limpo = relato.trim();

		if (!limpo) {
			setErroLocal("Conte o que aconteceu nesta parada.");
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
						Registrar imprevisto
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						{endereco}
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
					{/* O texto vai dentro de um bloco proprio: num container flex, cada
					    trecho solto vira um item e o paragrafo quebra em pedacos. */}
					<div className="flex items-start gap-2.5 rounded-xl bg-danger-tint px-3.5 py-3">
						<CircleAlert className="mt-0.5 size-4 shrink-0 text-danger" />

						<div className="flex min-w-0 flex-col gap-1">
							<p className="text-[13px] font-bold leading-snug text-danger">
								Não dá para voltar atrás
							</p>
							<p className="text-[13px] leading-relaxed text-danger/85">
								A parada fica marcada como não realizada até o fim da rota e
								você segue para a próxima.
							</p>
						</div>
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="parada-imprevisto"
							className="text-[13px] font-semibold text-ink-2"
						>
							O que aconteceu
						</label>
						<textarea
							id="parada-imprevisto"
							value={relato}
							onChange={(event) => setRelato(event.target.value)}
							rows={4}
							maxLength={300}
							placeholder="Ex.: doadora não estava em casa, portão fechado, endereço não encontrado..."
							className={CLASSE_CAMPO_TEXTO}
						/>
						<span className="text-[11px] text-ink-2">
							Vai para o relatório da rota, que o administrador acompanha.
						</span>
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
						Registrar imprevisto
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
