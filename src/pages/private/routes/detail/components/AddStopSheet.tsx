import { LoaderCircle, MapPin } from "lucide-react";
import { useEffect, useState } from "react";
import buscaSemResultado from "@/assets/illustrations/busca-sem-resultado.svg";
import { EmptyState } from "@/components/full/EmptyState";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import type { IDonationStepResponse } from "@/services/types/i-donation";
import { formatCreatedAt } from "@/utils/formatter";
import {
	CLASSE_BOTAO_PRIMARIO,
	CLASSE_BOTAO_SECUNDARIO,
	CLASSE_SHEET,
} from "../constants";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	opcoes: IDonationStepResponse[];
	carregando: boolean;
	salvando: boolean;
	erro?: string;
	onConfirmar: (id_donation_step: string) => void;
};

function enderecoDaEtapa(step: IDonationStepResponse): string {
	if (!step.address) {
		return "Endereço não informado";
	}

	const logradouro = [step.address.street, step.address.number ?? "s/n"]
		.filter(Boolean)
		.join(", ");

	return [logradouro, step.address.neighborhood, step.address.city]
		.filter(Boolean)
		.join(" · ");
}

export function AddStopSheet({
	open,
	onOpenChange,
	opcoes,
	carregando,
	salvando,
	erro,
	onConfirmar,
}: Props) {
	const [selecionada, setSelecionada] = useState<string>();

	useEffect(() => {
		if (open) {
			setSelecionada(undefined);
		}
	}, [open]);

	return (
		<Sheet open={open} onOpenChange={salvando ? () => {} : onOpenChange}>
			<SheetContent side="bottom" className={CLASSE_SHEET}>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-[22px] font-bold text-ink">
						Adicionar parada
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						Escolha a etapa de doação que entra no trajeto. A ordem das paradas
						é recalculada automaticamente.
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-2.5 overflow-y-auto pr-0.5">
					{carregando ? (
						<div className="flex justify-center py-8">
							<LoaderCircle className="size-5 animate-spin text-blue-bright" />
						</div>
					) : opcoes.length === 0 ? (
						<EmptyState
							size="sm"
							illustration={buscaSemResultado}
							title="Nenhuma etapa disponível"
							description="Não há etapas de doação na região desta rota."
						/>
					) : (
						opcoes.map((step) => {
							const ativa = selecionada === step.id_donation_step;

							return (
								<button
									key={step.id_donation_step}
									type="button"
									onClick={() => setSelecionada(step.id_donation_step)}
									aria-pressed={ativa}
									className={cn(
										"flex flex-col gap-1.5 rounded-xl border p-3.5 text-left outline-none transition-colors focus-visible:ring-3 focus-visible:ring-blue-bright/50",
										ativa
											? "border-blue-bright bg-blue-tint"
											: "border-line bg-surface hover:bg-surface-2",
									)}
								>
									<span className="text-[14px] font-bold text-ink">
										{step.name}
									</span>
									<span className="flex items-start gap-2 text-[13px] text-ink-2">
										<MapPin className="mt-px size-4 shrink-0" />
										{enderecoDaEtapa(step)}
									</span>
									{step.set_date && (
										<span className="text-[12px] text-ink-2">
											Agendada para {formatCreatedAt(step.set_date)}
										</span>
									)}
								</button>
							);
						})
					)}

					{erro && (
						<p className="rounded-xl bg-danger-tint px-3.5 py-2.5 text-[13px] font-semibold text-danger">
							{erro}
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
						Cancelar
					</button>
					<button
						type="button"
						disabled={!selecionada || salvando}
						onClick={() => selecionada && onConfirmar(selecionada)}
						className={CLASSE_BOTAO_PRIMARIO}
					>
						{salvando && <LoaderCircle className="size-4 animate-spin" />}
						Adicionar parada
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
