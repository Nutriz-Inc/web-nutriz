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

type ProfileFilter = "all" | EnumUserType;

const PROFILE_FILTER_OPTIONS: FilterChipOption<ProfileFilter>[] = [
	{ key: "all", label: "Todos" },
	{ key: EnumUserType.Admin, label: "Adm" },
	{ key: EnumUserType.Nurse, label: "Enfermeiro" },
	{ key: EnumUserType.Common, label: "Doadora" },
];

const PAGE_SIZE = 50;

export function UsersManagementPage() {
	const { auth } = useAuth();

	const [name, setName] = useState("");
	const [cpf, setCpf] = useState("");
	const [internalIdentifier, setInternalIdentifier] = useState("");
	const [profileFilter, setProfileFilter] = useState<ProfileFilter>("all");

	const { usersQuery } = useUsersList({
		page: 1,
		page_size: PAGE_SIZE,
		name: name || undefined,
		cpf: cpf || undefined,
		internal_identifier: internalIdentifier || undefined,
		type: profileFilter === "all" ? undefined : profileFilter,
	});

	const users = usersQuery.data?.data ?? [];

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
						options={PROFILE_FILTER_OPTIONS}
						value={profileFilter}
						onChange={setProfileFilter}
					/>
				</div>

				<div className="grid gap-3 sm:grid-cols-3">
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
					<SearchBar
						value={internalIdentifier}
						onChange={setInternalIdentifier}
						placeholder="Buscar por identificador interno..."
					/>
				</div>

				<div className="overflow-hidden rounded-2xl border border-[#eef1f5] bg-white">
					<UsersTableHeader />

					{users.length === 0 ? (
						<div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
							<p className="text-[15px] font-semibold text-[#1f2a37]">
								Nenhum usuário encontrado
							</p>
							<p className="text-[13px] text-[#9ca3af]">
								Ajuste a busca ou o filtro selecionado.
							</p>
						</div>
					) : (
						users.map((user) => <UserRow key={user.id_user} user={user} />)
					)}
				</div>
			</div>
		</Page>
	);
}