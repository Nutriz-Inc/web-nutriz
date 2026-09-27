import type { CapacidadeDaAgenda as Capacidade } from "@/hooks/use-capacidade-da-agenda";
import { cn } from "@/lib/utils";

type CapacidadeDaAgendaProps = {
	capacidade: Capacidade;
	onEscolherHora: (hora: string) => void;
};

function paraHora(hora: number) {
	return `${String(hora).padStart(2, "0")}:00`;
}

export function CapacidadeDaAgenda({
	capacidade,
	onEscolherHora,
}: CapacidadeDaAgendaProps) {
	const { agenda, carregando, indisponivel, horaEscolhida } = capacidade;

	if (carregando) {
		return <div className="esqueleto h-[74px] w-full rounded-card-sm" />;
	}

	if (indisponivel || !agenda) {
		return (
			<p className="text-rotulo text-ink-3">
				Não foi possível ler a ocupação da agenda agora. Confira antes de
				marcar.
			</p>
		);
	}

	const ocupacaoDoDia = Math.min(
		(agenda.agendados_no_dia / agenda.capacidade_por_dia) * 100,
		100,
	);

	let aviso: string | null = null;
	if (capacidade.diaLotado) {
		aviso = `Dia lotado: o limite é de ${agenda.capacidade_por_dia} visitas. Escolha outra data.`;
	} else if (capacidade.foraDoExpediente) {
		aviso = `Fora do horário de coleta. Escolha entre ${paraHora(agenda.horarios[0].hora)} e ${paraHora(agenda.horarios[agenda.horarios.length - 1].hora)}.`;
	} else if (capacidade.horaLotada && horaEscolhida !== null) {
		aviso = `As ${String(horaEscolhida).padStart(2, "0")}h já têm ${agenda.capacidade_por_horario} visitas marcadas. Escolha um horário livre.`;
	}

	return (
		<div className="flex flex-col gap-2.5">
			<div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
				<p className="text-rotulo font-semibold text-ink-2">Ocupação do dia</p>
				<p className="text-rotulo tabular-nums text-ink-2">
					<span
						className={cn(
							"font-semibold",
							agenda.dia_lotado ? "text-danger" : "text-ink",
						)}
					>
						{agenda.agendados_no_dia} de {agenda.capacidade_por_dia}
					</span>{" "}
					visitas · até {agenda.capacidade_por_horario} por horário
				</p>
			</div>

			<div className="h-1 w-full overflow-hidden rounded-full bg-surface-3">
				<div
					className={cn(
						"h-full rounded-full",
						agenda.dia_lotado
							? "bg-danger"
							: ocupacaoDoDia >= 75
								? "bg-orange"
								: "bg-blue-deep",
					)}
					style={{ width: `${ocupacaoDoDia}%` }}
				/>
			</div>

			<fieldset className="m-0 flex flex-wrap gap-1.5 border-0 p-0">
				<legend className="sr-only">Horários do dia</legend>
				{agenda.horarios.map((horario) => {
					const escolhido = horaEscolhida === horario.hora;
					const quase =
						!horario.lotado &&
						horario.vagas === 1 &&
						agenda.capacidade_por_horario > 1;

					return (
						<button
							key={horario.hora}
							type="button"
							disabled={horario.lotado || agenda.dia_lotado}
							aria-pressed={escolhido}
							onClick={() => onEscolherHora(paraHora(horario.hora))}
							title={
								horario.lotado
									? "Horário lotado"
									: `${horario.vagas} vaga(s) livre(s)`
							}
							className={cn(
								"flex h-8 min-w-[64px] items-center justify-center gap-1 rounded-full border px-2.5 text-[12.5px] tabular-nums transition-colors duration-150",
								escolhido
									? "border-blue-deep bg-blue-deep-fill text-white"
									: horario.lotado
										? "cursor-not-allowed border-line bg-surface-3 text-ink-3 line-through"
										: "border-line bg-surface text-ink hover:border-blue-tint-2 hover:bg-blue-tint",
							)}
						>
							<span className="font-semibold">
								{String(horario.hora).padStart(2, "0")}h
							</span>
							<span
								className={cn(
									escolhido
										? "text-white/80"
										: quase
											? "font-semibold text-orange"
											: "text-ink-3",
								)}
							>
								{horario.agendados}/{agenda.capacidade_por_horario}
							</span>
						</button>
					);
				})}
			</fieldset>

			{aviso ? (
				<p className="text-rotulo font-medium text-danger" role="alert">
					{aviso}
				</p>
			) : null}
		</div>
	);
}
