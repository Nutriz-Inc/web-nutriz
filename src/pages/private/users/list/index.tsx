import { Plus, Search, X } from "lucide-react";
import { type FormEvent, useState } from "react";
import { FilterChips } from "@/components/full/FilterChips";
import { SearchBar } from "@/components/full/SearchBar";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { formatCpf } from "@/utils/formatter";
import { CreateUserSheet } from "./components/CreateUserSheet";
import { UserRow } from "./components/UserRow";
import { UsersTableHeader } from "./components/UsersTableHeader";
import { PROFILE_FILTER_OPTIONS, type ProfileFilter } from "./constants";
import { useCreateUser, useUsersList } from "./hooks";
import { buildCreateUserRequest } from "./utils";
import type { CreateUserFormData } from "./validation";

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
	const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

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
		>
			<div className="lg:mx-auto lg:flex lg:w-full lg:max-w-[1400px] lg:flex-col lg:gap-6">
				<div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
					<div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 sm:mx-0 sm:px-0 sm:pb-0">
						<FilterChips
							options={PROFILE_FILTER_OPTIONS}
							value={profileFilter}
							onChange={setProfileFilter}
						/>
					</div>
					<button
						type="button"
						onClick={() => setIsCreateUserOpen(true)}
						className="flex h-[43px] w-full shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep hover:bg-blue px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.98] sm:w-auto"
					>
						<Plus className="size-4" />
						Novo usuário
					</button>
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
					<div className="grid grid-cols-2 gap-2.5 lg:flex lg:shrink-0">
						<button
							type="submit"
							className="flex h-[43px] items-center justify-center gap-2 rounded-full bg-blue-deep hover:bg-blue px-5 text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
						>
							<Search className="size-4" />
							Aplicar filtro
						</button>
						<button
							type="button"
							onClick={handleClearFilters}
							className="flex h-[43px] items-center justify-center gap-2 rounded-card-sm border border-line bg-white px-5 text-[14px] font-semibold text-ink-2 transition-transform active:scale-[0.98]"
						>
							<X className="size-4" />
							Limpar filtro
						</button>
					</div>
				</form>

				<div className="overflow-hidden rounded-2xl border border-surface-3 bg-white">
					<UsersTableHeader />

					{users.length === 0 ? (
						<div className="flex flex-col items-center gap-2 px-6 py-12 text-center">
							<p className="text-[15px] font-semibold text-ink">
								Nenhum usuário encontrado
							</p>
							<p className="text-[13px] text-ink-3">
								Ajuste a busca ou o filtro selecionado.
							</p>
						</div>
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
