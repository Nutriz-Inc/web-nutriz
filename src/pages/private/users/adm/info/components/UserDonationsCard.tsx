import { Fragment, useState } from "react";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import type { IDonationResponse } from "@/services/types/i-donation";
import { DONATIONS_GRID_COLS } from "../constants";
import { InfoCard } from "./InfoCard";
import { UserDonationRow } from "./UserDonationRow";

type DonationFilter = "all" | "open" | "done" | "ended";

const FILTER_OPTIONS: FilterChipOption<DonationFilter>[] = [
	{ key: "all", label: "Todas" },
	{ key: "open", label: "Em aberto" },
	{ key: "done", label: "Concluídas" },
	{ key: "ended", label: "Encerradas" },
];

const COLUMN_LABELS = ["Doação", "Etapa atual", "Data", "Volume", "Status", ""];

type UserDonationsCardProps = {
	donations: IDonationResponse[];
};

export function UserDonationsCard({ donations }: UserDonationsCardProps) {
	const [filter, setFilter] = useState<DonationFilter>("all");

	const numbered = [...donations]
		.sort((a, b) => a.created_at.localeCompare(b.created_at))
		.map((donation, index) => ({ donation, number: index + 1 }))
		.reverse();

	const filtered = numbered.filter(({ donation }) => {
		if (filter === "open") return donation.is_active && !donation.has_error;
		if (filter === "done") return !donation.is_active && !donation.has_error;
		if (filter === "ended") return donation.has_error;
		return true;
	});

	return (
		<InfoCard
			title="Doações"
			actionSlot={
				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					<FilterChips
						options={FILTER_OPTIONS}
						value={filter}
						onChange={setFilter}
					/>
				</div>
			}
		>
			{filtered.length === 0 ? (
				<p className="text-[13px] text-[#9ca3af]">
					Nenhuma doação encontrada para o filtro selecionado.
				</p>
			) : (
				<div className="overflow-hidden rounded-xl border border-[#eef1f5]">
					<div
						className={`hidden bg-[#f8fafc] px-4 py-3 lg:grid ${DONATIONS_GRID_COLS} lg:gap-3`}
					>
						{COLUMN_LABELS.map((label) => (
							<span
								key={label || "actions"}
								className="text-[11px] font-semibold uppercase tracking-wide text-[#9ca3af]"
							>
								{label}
							</span>
						))}
					</div>
					{filtered.map(({ donation, number }, index) => (
						<Fragment key={donation.id_donation}>
							{index > 0 && <div className="h-px bg-[#eef1f5]" />}
							<UserDonationRow donation={donation} number={number} />
						</Fragment>
					))}
				</div>
			)}
		</InfoCard>
	);
}
