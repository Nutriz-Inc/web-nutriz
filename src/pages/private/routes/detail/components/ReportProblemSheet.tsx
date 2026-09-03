import { LoaderCircle, TriangleAlert } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import {
	CLASSE_BOTAO_PERIGO,
	CLASSE_BOTAO_SECUNDARIO,
	CLASSE_CAMPO_TEXTO,
	CLASSE_SHEET,
	TIPOS_DE_PROBLEMA,
	type TipoDeProblema,
} from "../constants";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	salvando: boolean;
	erro?: string;
	onConfirmar: (relato: string) => void;
};

export function ReportProblemSheet({
	open,
	onOpenChange,
	salvando,
	erro,
	onConfirmar,
}: Props) {
	const [tipo, setTipo] = useState<TipoDeProblema>();
	const [descricao, setDescricao] = useState("");
	const [erroLocal, setErroLocal] = useState<string>();

	useEffect(() => {
		if (open) {
			setTipo(undefined);
			setDescricao("");
			setErroLocal(undefined);
		}
	}, [open]);

	function handleConfirmar() {
		const descricaoLimpa = descricao.trim();

		if (!tipo) {
			setErroLocal("Escolha o tipo do problema.");
			return;
		}
		if (!descricaoLimpa) {
			setErroLocal("Descreva o que aconteceu.");
			return;
		}

		const rotulo = TIPOS_DE_PROBLEMA.find(
			(item) => item.valor === tipo,
		)?.rotulo;

		setErroLocal(undefined);
		onConfirmar(`[${rotulo}] ${descricaoLimpa}`.slice(0, 500));
	}

	return (
		<Sheet open={open} onOpenChange={salvando ? () => {} : onOpenChange}>
			<SheetContent side="bottom" className={CLASSE_SHEET}>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-[22px] font-bold text-ink">
						Reportar problema
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						A rota é marcada com erro e a equipe é avisada. Esta ação encerra a
						rota.
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
					<fieldset className="flex flex-col gap-2">
						<legend className="mb-2 text-[13px] font-semibold text-ink-2">
							Tipo do problema
						</legend>

						<div className="flex flex-wrap gap-2">
							{TIPOS_DE_PROBLEMA.map((item) => (
								<button
									key={item.valor}
									type="button"
									aria-pressed={tipo === item.valor}
									onClick={() => setTipo(item.valor)}
									className={cn(
										"flex h-11 items-center rounded-full border px-4 text-[13px] font-semibold outline-none transition-colors focus-visible:ring-3 focus-visible:ring-blue-bright/50",
										tipo === item.valor
											? "border-blue-bright bg-blue-tint text-blue-deep"
											: "border-line bg-surface text-ink-2 hover:bg-surface-2",
									)}
								>
									{item.rotulo}
								</button>
							))}
						</div>
					</fieldset>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="rota-problema"
							className="text-[13px] font-semibold text-ink-2"
						>
							O que aconteceu
						</label>
						<textarea
							id="rota-problema"
							value={descricao}
							onChange={(event) => setDescricao(event.target.value)}
							rows={4}
							maxLength={440}
							placeholder="Descreva o problema com o máximo de detalhe possível..."
							className={CLASSE_CAMPO_TEXTO}
						/>
					</div>

					{(erroLocal || erro) && (
						<p className="flex items-start gap-2 rounded-xl bg-danger-tint px-3.5 py-2.5 text-[13px] font-semibold text-danger">
							<TriangleAlert className="mt-px size-4 shrink-0" />
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
						Reportar e encerrar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
