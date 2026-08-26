import { Search } from "lucide-react";
import { type FormEvent, useState } from "react";
import usuariosVazio from "@/assets/illustrations/usuarios-vazio.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { FilterChips } from "@/components/full/FilterChips";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { formatCpf } from "@/utils/formatter";
import { CreateUserSheet } from "./components/CreateUserSheet";
import { NewUserButton } from "./components/NewUserButton";
import { UserRow } from "./components/UserRow";
import { UserSearchField } from "./components/UserSearchField";
import { UsersTableHeader } from "./components/UsersTableHeader";
import {
	PROFILE_FILTER_OPTIONS,
	type ProfileFilter,
	type UserSearchFieldKey,
} from "./constants";
import { useCreateUser, useUsersList } from "./hooks";
import { buildCreateUserRequest } from "./utils";
import type { CreateUserFormData } from "./validation";

export function UsersManagementPage() {
	const { auth } = useAuth();

	const [searchField, setSearchField] = useState<UserSearchFieldKey>("name");
	const [term, setTerm] = useState("");
	// O termo so vira parametro da consulta quando a busca e disparada.
	const [appliedTerm, setAppliedTerm] = useState("");
	const [appliedField, setAppliedField] = useState<UserSearchFieldKey>("name");
	const [profileFilter, setProfileFilter] = useState<ProfileFilter>("all");
	const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

	function handleApplyFilters(event: FormEvent<HTMLFormElement>) {
		event.preventDefault();

		setAppliedField(searchField);
		setAppliedTerm(term.trim());
	}

	function handleFieldChange(next: UserSearchFieldKey) {
		// Trocar de campo zera o que estava escrito e o que estava valendo: um
		// CPF digitado nao faz sentido como busca por nome, e deixar o filtro
		// antigo ativo com a caixa vazia so confunde.
		setSearchField(next);
		setTerm("");
		setAppliedField(next);
		setAppliedTerm("");
	}

	function handleClearSearch() {
		setTerm("");
		setAppliedTerm("");
	}

	const onlyDigits = appliedTerm.replace(/\D/g, "");

	const { usersQuery } = useUsersList({
		page: 1,
		page_size: DEFAULT_PAGE_SIZE,
		name: appliedField === "name" ? appliedTerm || undefined : undefined,
		cpf: appliedField === "cpf" ? onlyDigits || undefined : undefined,
		internal_identifier:
			appliedField === "internal_identifier"
				? appliedTerm || undefined
				: undefined,
		type: profileFilter === "all" ? undefined : profileFilter,
	});
	const { createUserMutation } = useCreateUser();

	const users = usersQuery.data?.data ?? [];

	function handleCreateUser(form: CreateUserFormData) {
		createUserMutation.mutate(buildCreateUserRequest(form), {
			onSuccess: () => setIsCreateUserOpen(false),
		});
	}

	return (
		<Page
			title="Usuários"
			description="Gerencie os acessos do Nutriz"
			loading={usersQuery.isLoading}
			hasPermission={auth?.type === EnumUserType.Admin}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<NewUserButton
					onClick={() => setIsCreateUserOpen(true)}
					className="lg:hidden"
				/>
			}
		>
			{/* `gap-4` sem prefixo: o `lg:gap-6` de antes so valia no desktop, e no
			    celular os filtros encostavam na lista. */}
			<div className="flex flex-col gap-4 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-6">
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
					<div className="sem-barra -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
						<FilterChips
							options={PROFILE_FILTER_OPTIONS}
							value={profileFilter}
							onChange={setProfileFilter}
						/>
					</div>
					<NewUserButton
						onClick={() => setIsCreateUserOpen(true)}
						className="hidden lg:flex"
					/>
				</div>

				{/*
				 * Uma caixa so no lugar das tres de antes. O "Limpar filtro"
				 * tambem saiu: quem limpa a busca e o "x" dentro da propria
				 * caixa, e o perfil volta ao normal pelo chip "Todos".
				 */}
				<form
					onSubmit={handleApplyFilters}
					className="flex items-center gap-2.5"
				>
					<UserSearchField
						field={searchField}
						onFieldChange={handleFieldChange}
						value={term}
						onValueChange={(value) =>
							setTerm(searchField === "cpf" ? formatCpf(value) : value)
						}
						onClear={handleClearSearch}
						className="flex-1"
					/>
					{/* No celular o botao e so a lupa: com rotulo ele virava mais uma
					    linha de largura cheia. */}
					<button
						type="submit"
						aria-label="Buscar"
						className="flex h-[43px] shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep-fill px-4 text-[14px] font-semibold text-white transition-transform hover:bg-blue-fill active:scale-[0.98] sm:px-5"
					>
						<Search className="size-4" />
						<span className="hidden sm:inline">Buscar</span>
					</button>
				</form>

				<div className="overflow-hidden rounded-2xl border border-surface-3 bg-surface">
					<UsersTableHeader />

					{users.length === 0 ? (
						<EmptyState
							illustration={usuariosVazio}
							title="Nenhum usuário encontrado"
							description="Ajuste a busca ou o filtro selecionado."
						/>
					) : (
						users.map((user) => <UserRow key={user.id_user} user={user} />)
					)}
				</div>
			</div>

			<CreateUserSheet
				open={isCreateUserOpen}
				onOpenChange={setIsCreateUserOpen}
				onSubmit={handleCreateUser}
				isPending={createUserMutation.isPending}
				error={
					createUserMutation.isError
						? "Não foi possível criar o usuário. Tente novamente."
						: undefined
				}
			/>
		</Page>
	);
}
