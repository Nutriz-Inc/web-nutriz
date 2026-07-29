import { LoaderCircle } from "lucide-react";
import { Fragment } from "react";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import type { IDonationResponse } from "@/services/types/i-donation";
import { DONATIONS_GRID_COLS } from "../constants";
import { InfoCard } from "./InfoCard";
import { UserDonationRow } from "./UserDonationRow";

export type DonationFilter = "all" | "active" | "inactive";

const FILTER_OPTIONS: FilterChipOption<DonationFilter>[] = [
	{ key: "all", label: "Todas" },
	{ key: "active", label: "Em andamento" },
	{ key: "inactive", label: "Concluídas" },
];

const COLUMN_LABELS = ["Doação", "Etapa atual", "Data", "Volume", "Status", ""];

type UserDonationsCardProps = {
	donations: IDonationResponse[];
	filter: DonationFilter;
	onFilterChange: (filter: DonationFilter) => void;
	loading?: boolean;
};

export function UserDonationsCard({
	donations,
	filter,
	onFilterChange,
	loading,
}: UserDonationsCardProps) {
	const sorted = [...donations].sort((a, b) =>
		b.created_at.localeCompare(a.created_at),
	);

	return (
		<InfoCard
			title="Doações"
			actionSlot={
				<div className="flex items-center gap-2 overflow-x-auto pb-1">
					<FilterChips
						options={FILTER_OPTIONS}
						value={filter}
						onChange={onFilterChange}
					/>
				</div>
			}
		>
			{loading ? (
				<div className="flex w-full justify-center py-6">
					<LoaderCircle className="animate-spin text-[#9ca3af]" />
				</div>
			) : sorted.length === 0 ? (
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
					{sorted.map((donation, index) => (
						<Fragment key={donation.id_donation}>
							{index > 0 && <div className="h-px bg-[#eef1f5]" />}
							<UserDonationRow
								donation={donation}
							/>
						</Fragment>
					))}
				</div>
			)}
		</InfoCard>
	);
}
