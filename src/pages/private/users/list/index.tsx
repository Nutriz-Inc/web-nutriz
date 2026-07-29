import { useState } from "react";
import {
	type FilterChipOption,
	FilterChips,
} from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { UserRow } from "./components/UserRow";
import { UsersTableHeader } from "./components/UsersTableHeader";
import { useUsersList } from "./hooks";

type ActiveFilter = "all" | "active" | "inactive";

const ACTIVE_FILTER_OPTIONS: FilterChipOption<ActiveFilter>[] = [
	{ key: "all", label: "Todas" },
	{ key: "active", label: "Ativos" },
	{ key: "inactive", label: "Inativos" },
];

const PAGE_SIZE = 50;

export function UsersManagementPage() {
	const { auth } = useAuth();

	const [search, setSearch] = useState("");
	const [activeFilter, setActiveFilter] = useState<ActiveFilter>("all");

	const { usersQuery } = useUsersList({
		page: 1,
		page_size: PAGE_SIZE,
		name: search || undefined,
	});

	const users = usersQuery.data?.data ?? [];

	const filteredUsers = users.filter((user) => {
		if (activeFilter === "active") return !user.removed_at;
		if (activeFilter === "inactive") return Boolean(user.removed_at);
		return true;
	});

	return (
		<Page
			title="Usuários da Plataforma"
			description="Gerencie os acessos da equipe Lactare"
			loading={usersQuery.isLoading}
			hasPermission={auth?.type === EnumUserType.Admin}
			backTo="/gestao-doacoes"
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
		>
			<div className="lg:mx-auto lg:flex lg:w-full lg:max-w-[1400px] lg:flex-col lg:gap-6">
				<div className="flex items-center gap-2.5">
					<FilterChips
						options={ACTIVE_FILTER_OPTIONS}
						value={activeFilter}
						onChange={setActiveFilter}
					/>
				</div>

				<SearchBar
					value={search}
					onChange={setSearch}
					placeholder="Buscar por nome ou email..."
				/>

				<div className="overflow-hidden rounded-2xl border border-[#eef1f5] bg-white">
					<UsersTableHeader />

					{filteredUsers.length === 0 ? (
						<div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
							<p className="text-[15px] font-semibold text-[#1f2a37]">
								Nenhum usuário encontrado
							</p>
							<p className="text-[13px] text-[#9ca3af]">
								Ajuste a busca ou o filtro selecionado.
							</p>
						</div>
					) : (
						filteredUsers.map((user) => (
							<UserRow key={user.id_user} user={user} />
						))
					)}
				</div>
			</div>
		</Page>
	);
}
