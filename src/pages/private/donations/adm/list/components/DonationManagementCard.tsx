import { ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import { formatCpf, formatDateBR } from "@/utils/formatter";
import type { AdminDonationRow } from "../hooks";
import { TrilhaDaDoacao } from "./TrilhaDaDoacao";

type DonationManagementCardProps = {
	donation: AdminDonationRow;
};

function situacao(donation: AdminDonationRow) {
	if (donation.hasError) {
		return { rotulo: "Com erro", ponto: "bg-danger", texto: "text-danger" };
	}
	if (!donation.isActive) {
		return { rotulo: "Concluída", ponto: "bg-success", texto: "text-success" };
	}
	return {
		rotulo: "Em andamento",
		ponto: "bg-blue-bright",
		texto: "text-blue-deep",
	};
}

export function DonationManagementCard({
	donation,
}: DonationManagementCardProps) {
	const navigate = useNavigate();
	const estado = situacao(donation);

	return (
		<button
			type="button"
			onClick={() => navigate(`/gestao-doacoes/${donation.id_donation}`)}
			className="group grid w-full grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3.5 gap-y-3 rounded-card-sm border border-line bg-surface px-4 py-4 text-left transition-[border-color,box-shadow] duration-200 hover:border-line-strong hover:shadow-soft lg:grid-cols-[auto_minmax(0,1.2fr)_minmax(0,1fr)_auto] lg:gap-x-6 lg:px-5"
		>
			<span
				className={cn(
					"flex size-10 shrink-0 items-center justify-center rounded-full text-[14px] font-bold",
					donation.isActive
						? "bg-blue-tint text-blue-deep"
						: "bg-surface-3 text-ink-2",
				)}
			>
				{getInitials(donation.userName)}
			</span>

			<div className="flex min-w-0 flex-col gap-1">
				<div className="flex min-w-0 items-center gap-2">
					<p className="truncate text-[16px] font-semibold text-ink">
						{donation.userName}
					</p>
					{donation.isRecurrent ? (
						<span className="shrink-0 rounded-full bg-teal-tint px-2 py-0.5 text-[11px] font-semibold text-teal">
							Recorrente
						</span>
					) : null}
				</div>
				<p className="text-[12px] text-ink-2 lg:truncate">
					<span className={cn("font-semibold", estado.texto)}>
						<span
							className={cn(
								"mr-1.5 inline-block size-1.5 rounded-full align-middle",
								estado.ponto,
							)}
						/>
						{estado.rotulo}
					</span>
					{" · "}
					CPF {donation.userCpf ? formatCpf(donation.userCpf) : "—"}
					{" · "}
					{formatDateBR(donation.createdAt)}
				</p>
			</div>

			<ChevronRight
				className="size-4 text-ink-3 transition-transform duration-200 group-hover:translate-x-0.5 lg:order-last"
				aria-hidden="true"
			/>

			<div className="col-span-3 lg:col-span-1">
				<TrilhaDaDoacao
					etapaAtual={donation.currentStepName}
					ativa={donation.isActive}
					comErro={donation.hasError}
					recorrente={donation.isRecurrent}
				/>
			</div>
		</button>
	);
}
