import { Search, X } from "lucide-react";
import { type FormEvent, Fragment, useState } from "react";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumDonationStepName } from "@/services/types/i-donation";
import { EnumUserType } from "@/services/types/i-user";
import { formatCpf } from "@/utils/formatter";
import { DonationManagementCard } from "./components/DonationManagementCard";
import { STEP_DISPLAY } from "./components/StatusBadge";
import { useAdminDonationsList } from "./hooks";

type StepFilter = "all" | EnumDonationStepName;
type ActiveFilter = "all" | "active" | "inactive";

const STEP_FILTER_OPTIONS: FilterChipOption<StepFilter>[] = [
	{ key: "all", label: "Todas" },
	{
		key: EnumDonationStepName.BloodTest,
		label: STEP_DISPLAY[EnumDonationStepName.BloodTest].label,
	},
	{
		key: EnumDonationStepName.CollectMilk,
		label: STEP_DISPLAY[EnumDonationStepName.CollectMilk].label,
	},
	{
		key: EnumDonationStepName.DeliverMilkingKit,
		label: STEP_DISPLAY[EnumDonationStepName.DeliverMilkingKit].label,
	},
	{
		key: EnumDonationStepName.MilkAnalysis,
		label: STEP_DISPLAY[EnumDonationStepName.MilkAnalysis].label,
	},
];

const ACTIVE_FILTER_OPTIONS: FilterChipOption<ActiveFilter>[] = [
	{ key: "all", label: "Todas" },
	{ key: "active", label: "Em andamento" },
	{ key: "inactive", label: "Concluídas" },
];

export function DonationsManagementPage() {
	const { auth } = useAuth();

	const [name, setName] = useState("");
	const [appliedName, setAppliedName] = useState("");
	const [cpf, setCpf] = useState("");
	const [appliedCpf, setAppliedCpf] = useState("");
	const [filter, setFilter] = useState<StepFilter>("all");
	const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

	function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setAppliedName(name);
		setAppliedCpf(cpf);
	}

	function handleClearFilters() {
		setName("");
		setAppliedName("");
		setCpf("");
		setAppliedCpf("");
		setFilter("all");
		setActiveFilter("all");
	}

	const { data, isLoading } = useAdminDonationsList({
		user_name: appliedName || undefined,
		user_document: appliedCpf.replace(/\D/g, "") || undefined,
		current_step: filter === "all" ? undefined : filter,
		is_active: activeFilter === "all" ? undefined : activeFilter === "active",
	});

	const donations = data ?? [];

	return (
		<Page
			title="Gestão de Doações"
			description={`${donations.length} doações cadastradas`}
			loading={isLoading}
			hasPermission={auth?.type === EnumUserType.Admin}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col gap-[18px] bg-[#f4f7fb] px-4 pb-32 pt-5 lg:m-0 lg:min-h-0 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-6 lg:bg-transparent lg:px-0 lg:pb-8 lg:pt-0">
				<form
					onSubmit={handleApplyFilters}
					className="flex flex-col gap-2.5 lg:flex-row lg:items-center"
				>
					<div className="lg:flex-1">
						<SearchBar
							value={name}
							onChange={setName}
							placeholder="Buscar por nome..."
						/>
					</div>
					<div className="lg:flex-1">
						<SearchBar
							value={cpf}
							onChange={(value) => setCpf(formatCpf(value))}
							placeholder="Buscar por CPF..."
						/>
					</div>
					<button
						type="submit"
						className="flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-xl bg-[#00458b] px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
					>
						<Search className="size-4" />
						Aplicar filtro
					</button>
					<button
						type="button"
						onClick={handleClearFilters}
						className="flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-xl border border-[#e5e7eb] bg-white px-5 text-[14px] font-semibold text-[#6b7280] transition-transform active:scale-[0.98]"
					>
						<X className="size-4" />
						Limpar filtro
					</button>
				</form>

				<div className="flex items-center gap-2.5 overflow-x-auto pb-1">
					<FilterChips
						options={ACTIVE_FILTER_OPTIONS}
						value={activeFilter}
						onChange={setActiveFilter}
					/>
					<div className="h-6 w-px shrink-0 bg-[#e5e7eb]" />
					<FilterChips
						options={STEP_FILTER_OPTIONS}
						value={filter}
						onChange={setFilter}
					/>
				</div>

				{donations.length === 0 ? (
					<div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center">
						<p className="text-[15px] font-semibold text-[#1f2a37]">
							Nenhuma doação encontrada
						</p>
						<p className="text-[13px] text-[#9ca3af]">
							Ajuste a busca ou o filtro selecionado.
						</p>
					</div>
				) : (
					<div className="overflow-hidden rounded-2xl border border-[#e5e7eb] bg-[#f4f7fb]">
						{donations.map((donation, index) => (
							<Fragment key={donation.id_donation}>
								{index > 0 && <div className="h-2 bg-[#f4f7fb]" />}
								<DonationManagementCard donation={donation} />
							</Fragment>
						))}
					</div>
				)}
			</div>
		</Page>
	);
}
