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
	CLASSE_BOTAO_PRIMARIO,
	CLASSE_BOTAO_SECUNDARIO,
	CLASSE_CAMPO_TEXTO,
	CLASSE_SHEET,
	LIMITE_ROTA_MS,
} from "../constants";
import { formatarDuracaoCurta } from "../utils";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	duracaoMs: number;
	totalParadas: number;
	paradasVisitadas: number;
	salvando: boolean;
	erro?: string;
	onConfirmar: (dados: { mileage: number; user_feedback: string }) => void;
};

export function FinishRouteSheet({
	open,
	onOpenChange,
	duracaoMs,
	totalParadas,
	paradasVisitadas,
	salvando,
	erro,
	onConfirmar,
}: Props) {
	const [km, setKm] = useState("");
	const [relato, setRelato] = useState("");
	const [erroLocal, setErroLocal] = useState<string>();

	useEffect(() => {
		if (open) {
			setKm("");
			setRelato("");
			setErroLocal(undefined);
		}
	}, [open]);

	const excedeu = duracaoMs >= LIMITE_ROTA_MS;

	const mediaPorParada =
		paradasVisitadas > 0 ? duracaoMs / paradasVisitadas : null;

	const resumo = [
		{ rotulo: "Duração total", valor: formatarDuracaoCurta(duracaoMs) },
		{
			rotulo: "Paradas visitadas",
			valor: `${paradasVisitadas} de ${totalParadas}`,
		},
		{
			rotulo: "Média por parada",
			valor: mediaPorParada ? formatarDuracaoCurta(mediaPorParada) : "—",
		},
	];

	function handleConfirmar() {
		const valor = Number(km.replace(",", "."));
		const relatoLimpo = relato.trim();

		if (!km.trim() || Number.isNaN(valor) || valor <= 0) {
			setErroLocal("Informe a quilometragem percorrida.");
			return;
		}
		if (!relatoLimpo) {
			setErroLocal("Descreva como foi a rota para finalizar.");
			return;
		}

		setErroLocal(undefined);
		onConfirmar({ mileage: valor, user_feedback: relatoLimpo });
	}

	return (
		<Sheet open={open} onOpenChange={salvando ? () => {} : onOpenChange}>
			<SheetContent side="bottom" className={CLASSE_SHEET}>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-[22px] font-bold text-ink">
						Finalizar rota
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						Registre a quilometragem e como foi o trajeto. A rota é encerrada em
						seguida.
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
					{excedeu && (
						<p className="flex items-start gap-2 rounded-xl bg-danger-tint px-3.5 py-3 text-[13px] font-semibold text-danger">
							<AlertTriangle className="mt-px size-4 shrink-0" />
							Esta rota passou do limite de 6 horas. Você ainda pode finalizar.
						</p>
					)}

					<div className="grid grid-cols-3 gap-2.5">
						{resumo.map((item) => (
							<div
								key={item.rotulo}
								className="flex flex-col items-center gap-1 rounded-xl bg-surface-2 px-2 py-3 text-center"
							>
								<span className="font-sans text-[15px] font-extrabold leading-none tabular-nums text-blue-deep">
									{item.valor}
								</span>
								<span className="text-[10px] font-bold uppercase leading-tight tracking-[0.06em] text-ink-2">
									{item.rotulo}
								</span>
							</div>
						))}
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="rota-km"
							className="text-[13px] font-semibold text-ink-2"
						>
							Quilometragem percorrida (km)
						</label>
						<input
							id="rota-km"
							value={km}
							onChange={(event) => setKm(event.target.value)}
							inputMode="decimal"
							placeholder="Ex.: 42,5"
							className={CLASSE_CAMPO_TEXTO}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="rota-relato"
							className="text-[13px] font-semibold text-ink-2"
						>
							Como foi a rota
						</label>
						<textarea
							id="rota-relato"
							value={relato}
							onChange={(event) => setRelato(event.target.value)}
							rows={4}
							maxLength={500}
							placeholder="Conte como foi o trajeto, intercorrências, observações..."
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
						className={CLASSE_BOTAO_PRIMARIO}
					>
						{salvando && <LoaderCircle className="size-4 animate-spin" />}
						Confirmar e finalizar
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
