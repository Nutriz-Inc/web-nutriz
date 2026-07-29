import { Search, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { FilterChips } from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { formatCpf } from "@/utils/formatter";
import { UserRow } from "./components/UserRow";
import { UsersTableHeader } from "./components/UsersTableHeader";
import { PROFILE_FILTER_OPTIONS, type ProfileFilter } from "./constants";
import { useUsersList } from "./hooks";

export function UsersManagementPage() {
	const { auth } = useAuth();

	const [name, setName] = useState("");
	const [appliedName, setAppliedName] = useState("");
	const [cpf, setCpf] = useState("");
	const [appliedCpf, setAppliedCpf] = useState("");
	const [internalIdentifier, setInternalIdentifier] = useState("");
	const [appliedInternalIdentifier, setAppliedInternalIdentifier] =
		useState("");
	const [profileFilter, setProfileFilter] = useState<ProfileFilter>("all");

	function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setAppliedName(name);
		setAppliedCpf(cpf.replace(/\D/g, ""));
		setAppliedInternalIdentifier(internalIdentifier);
	}

	function handleClearFilters() {
		setName("");
		setAppliedName("");
		setCpf("");
		setAppliedCpf("");
		setInternalIdentifier("");
		setAppliedInternalIdentifier("");
		setProfileFilter("all");
	}

	const { usersQuery } = useUsersList({
		page: 1,
		page_size: DEFAULT_PAGE_SIZE,
		name: appliedName || undefined,
		cpf: appliedCpf || undefined,
		internal_identifier: appliedInternalIdentifier || undefined,
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

				<form
					onSubmit={handleApplyFilters}
					className="flex flex-col gap-2.5 lg:flex-row lg:items-center"
				>
					<div className="grid gap-3 sm:grid-cols-3 lg:flex-1">
						<SearchBar
							value={name}
							onChange={setName}
							placeholder="Buscar por nome..."
						/>
						<SearchBar
							value={cpf}
							onChange={(value) => setCpf(formatCpf(value))}
							placeholder="Buscar por CPF..."
						/>
						<SearchBar
							value={internalIdentifier}
							onChange={setInternalIdentifier}
							placeholder="Buscar por identificador interno..."
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
