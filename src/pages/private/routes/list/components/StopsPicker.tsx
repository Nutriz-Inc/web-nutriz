import { Check, Plus, Search, X } from "lucide-react";
import { useMemo, useState } from "react";
import { SectionLabel } from "@/components/full/SectionLabel";
import { cn } from "@/lib/utils";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import { formatDateBR } from "@/utils/formatter";
import { useDonationStepsList } from "../hooks";

type StopsPickerProps = {
	value: string[];
	onChange: (ids: string[]) => void;
	city?: string;
	neighborhood?: string;
};

// Busca sem acento: "sao paulo" acha "São Paulo".
function normalizar(texto: string): string {
	return texto
		.normalize("NFD")
		.replace(/\p{Diacritic}/gu, "")
		.toLowerCase();
}

export function StopsPicker({
	value,
	onChange,
	city,
	neighborhood,
}: StopsPickerProps) {
	const [busca, setBusca] = useState("");

	const { data, isLoading } = useDonationStepsList({
		page: 1,
		page_size: 50,
		status: EnumDonationStepStatus.Pending,
		has_address: true,
		available_for_route: true,
		city: city || undefined,
		neighborhood: neighborhood || undefined,
	});
	const steps = data?.data ?? [];

	const selected = new Set(value);

	const dadosPorId = useMemo(() => {
		const mapa = new Map<string, { nome: string; local: string }>();

		for (const step of steps) {
			mapa.set(step.id_donation_step, {
				nome: step.name,
				local: [step.address?.neighborhood, step.address?.city]
					.filter(Boolean)
					.join(" · "),
			});
		}

		return mapa;
	}, [steps]);

	// A busca so filtra o que ja veio: nao muda a consulta nem os filtros que o
	// backend espera.
	const visiveis = useMemo(() => {
		const termo = normalizar(busca.trim());

		if (!termo) return steps;

		return steps.filter((step) =>
			normalizar(
				[
					step.name,
					step.address?.neighborhood,
					step.address?.city,
					step.id_donation,
				]
					.filter(Boolean)
					.join(" "),
			).includes(termo),
		);
	}, [steps, busca]);

	function alternar(id: string) {
		if (selected.has(id)) {
			onChange(value.filter((atual) => atual !== id));
			return;
		}

		onChange([...value, id]);
	}

	return (
		<section className="flex flex-col gap-3 text-left">
			<SectionLabel
				trailing={
					<span
						className={cn(
							"text-[12px] font-semibold",
							value.length > 0 ? "text-blue-deep" : "text-ink-2",
						)}
					>
						{value.length} selecionada{value.length === 1 ? "" : "s"}
					</span>
				}
			>
				Paradas
			</SectionLabel>

			{value.length > 0 ? (
				<ol className="flex flex-col gap-1.5 rounded-xl border border-blue-tint bg-blue-tint/40 p-2.5">
					{value.map((id, index) => {
						const dados = dadosPorId.get(id);

						return (
							<li
								key={id}
								className="flex items-center gap-2.5 rounded-lg bg-surface px-2.5 py-2"
							>
								<span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-blue-deep-fill text-[11px] font-bold tabular-nums text-white">
									{index + 1}
								</span>

								<span className="flex min-w-0 flex-1 flex-col">
									<span className="truncate text-[13px] font-semibold text-ink">
										{dados?.nome ?? `${id.slice(0, 12)}…`}
									</span>
									{dados?.local && (
										<span className="truncate text-[11px] text-ink-2">
											{dados.local}
										</span>
									)}
								</span>

								<button
									type="button"
									onClick={() => alternar(id)}
									aria-label={`Remover ${dados?.nome ?? "parada"} da rota`}
									className="flex size-7 shrink-0 items-center justify-center rounded-full text-ink-2 outline-none transition-colors hover:bg-danger-tint hover:text-danger focus-visible:ring-4 focus-visible:ring-danger/40"
								>
									<X className="size-3.5" />
								</button>
							</li>
						);
					})}
				</ol>
			) : (
				<p className="rounded-xl border border-dashed border-blue-tint-2 px-3.5 py-3 text-[12px] leading-relaxed text-ink-2">
					Nenhuma parada escolhida ainda. Toque nas etapas abaixo para montar o
					trajeto — a ordem de visita é otimizada depois.
				</p>
			)}

			<div className="flex flex-col gap-2 rounded-xl border border-line bg-surface-2 p-2.5">
				<div className="relative">
					<Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-ink-3" />
					<input
						value={busca}
						onChange={(evento) => setBusca(evento.target.value)}
						placeholder="Buscar etapa por nome, bairro ou cidade"
						aria-label="Buscar etapa disponível"
						className="w-full rounded-lg border border-line bg-surface py-2 pl-9 pr-3 text-[13px] text-ink outline-none transition-colors placeholder:text-ink-3 focus:border-blue-bright"
					/>
				</div>

				<div className="flex max-h-[240px] flex-col gap-1.5 overflow-y-auto">
					{isLoading ? (
						<p className="px-1 py-3 text-center text-[13px] text-ink-2">
							Carregando etapas disponíveis…
						</p>
					) : visiveis.length === 0 ? (
						<p className="px-3 py-3 text-center text-[13px] leading-relaxed text-ink-2">
							{busca.trim()
								? "Nenhuma etapa encontrada para essa busca."
								: city || neighborhood
									? "Nenhuma etapa disponível nessa região. Limpe a cidade e o bairro para ver todas."
									: "Nenhuma etapa disponível para montar rota no momento."}
						</p>
					) : (
						visiveis.map((step) => {
							const escolhida = selected.has(step.id_donation_step);
							const local = [step.address?.neighborhood, step.address?.city]
								.filter(Boolean)
								.join(" · ");

							return (
								<button
									key={step.id_donation_step}
									type="button"
									aria-pressed={escolhida}
									onClick={() => alternar(step.id_donation_step)}
									className={cn(
										"flex items-center gap-2.5 rounded-lg border px-2.5 py-2 text-left outline-none transition-colors focus-visible:ring-4 focus-visible:ring-blue-bright/40",
										escolhida
											? "border-blue-deep bg-blue-tint"
											: "border-line bg-surface hover:border-blue-tint-2 hover:bg-blue-tint/40",
									)}
								>
									<span
										className={cn(
											"flex size-5 shrink-0 items-center justify-center rounded-md border transition-colors",
											escolhida
												? "border-blue-deep bg-blue-deep-fill text-white"
												: "border-blue-tint-2 bg-surface text-transparent",
										)}
									>
										{escolhida ? (
											<Check className="size-3.5" strokeWidth={3} />
										) : (
											<Plus className="size-3.5 text-ink-3" />
										)}
									</span>

									<span className="flex min-w-0 flex-1 flex-col">
										<span
											className={cn(
												"truncate text-[13px] font-semibold",
												escolhida ? "text-blue-deep" : "text-ink",
											)}
										>
											{step.name}
										</span>
										<span className="truncate text-[11px] text-ink-2">
											{step.set_date
												? formatDateBR(step.set_date)
												: "sem data prevista"}
											{local && ` · ${local}`}
										</span>
									</span>
								</button>
							);
						})
					)}
				</div>
			</div>
		</section>
	);
}
