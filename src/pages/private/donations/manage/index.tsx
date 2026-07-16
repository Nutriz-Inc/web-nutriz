import { Plus } from "lucide-react";
import { Fragment, useEffect, useState } from "react";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import {
	type ActiveFilter,
	ActiveFilterChips,
} from "./components/ActiveFilterChips";
import { DonationManagementCard } from "./components/DonationManagementCard";
import { FilterChips, type StepFilter } from "./components/FilterChips";
import { SearchBar } from "./components/SearchBar";
import { useAdminDonationsList } from "./hooks";

export function DonationsManagementPage() {
	const { auth } = useAuth();

	const [name, setName] = useState("");
	const [debouncedName, setDebouncedName] = useState("");
	const [cpf, setCpf] = useState("");
	const [debouncedCpf, setDebouncedCpf] = useState("");
	const [filter, setFilter] = useState<StepFilter>("all");
	const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedName(name), 400);

		return () => clearTimeout(timeout);
	}, [name]);

	useEffect(() => {
		const timeout = setTimeout(() => setDebouncedCpf(cpf), 400);

		return () => clearTimeout(timeout);
	}, [cpf]);

	const { data, isLoading } = useAdminDonationsList({
		user_name: debouncedName || undefined,
		user_document: debouncedCpf.replace(/\D/g, "") || undefined,
		current_step: filter === "all" ? undefined : filter,
		is_active: activeFilter === "all" ? undefined : activeFilter === "active",
	});

	const donations = data ?? [];

	function handleNewDonation() {
		// To do: Implementar fluxo de nova doação pelo administrador
	}

	return (
		<Page
			title="Gestão de Doações"
			description={`${donations.length} doações cadastradas`}
			loading={isLoading}
			hasPermission={auth?.type === EnumUserType.Admin}
		>
			<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col gap-[18px] bg-[#f4f7fb] px-4 pb-32 pt-5 lg:m-0 lg:min-h-0 lg:mx-auto lg:w-full lg:max-w-[900px] lg:gap-6 lg:bg-transparent lg:px-0 lg:pb-8 lg:pt-0">
				<div className="flex flex-col gap-2.5 lg:flex-row">
					<SearchBar
						value={name}
						onChange={setName}
						placeholder="Buscar por nome..."
					/>
					<SearchBar
						value={cpf}
						onChange={setCpf}
						placeholder="Buscar por CPF..."
					/>
				</div>

				<div className="flex items-center gap-2.5 overflow-x-auto pb-1">
					<ActiveFilterChips value={activeFilter} onChange={setActiveFilter} />
					<div className="h-6 w-px shrink-0 bg-[#e5e7eb]" />
					<FilterChips value={filter} onChange={setFilter} />
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

			<button
				type="button"
				onClick={handleNewDonation}
				className="fixed bottom-7 right-5 flex items-center gap-2 rounded-full bg-[#00458b] px-[22px] py-4 text-[16px] font-bold text-white shadow-[0px_6px_16px_rgba(0,0,0,0.18)] transition-transform active:scale-[0.97] lg:bottom-8 lg:right-8"
			>
				<Plus className="size-[22px]" />
				Nova doação
			</button>
		</Page>
	);
}
