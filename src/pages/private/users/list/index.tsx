import { useState } from "react";
import { useNavigate } from "react-router-dom";
import usuariosVazio from "@/assets/illustrations/usuarios-vazio.svg";
import {
	BuscaPorCampo,
	type CampoDeBusca,
} from "@/components/full/BuscaPorCampo";
import { EmptyState } from "@/components/full/EmptyState";
import { FilterChips } from "@/components/full/FilterChips";
import { GrupoDeFiltro } from "@/components/full/GrupoDeFiltro";
import { ListaDeDados } from "@/components/full/ListaDeDados";
import { ListaDeDadosEsqueleto } from "@/components/full/ListaDeDadosEsqueleto";
import { PainelDeFiltros } from "@/components/full/PainelDeFiltros";
import { RefreshableList } from "@/components/full/RefreshableList";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { useDebouncedValue } from "@/hooks/use-debounced-value";
import { EnumUserType } from "@/services/types/i-user";
import { DEFAULT_PAGE_SIZE } from "@/utils/constants";
import { formatCpf } from "@/utils/formatter";
import { COLUNAS_DO_USUARIO } from "./colunas";
import { CreateUserSheet } from "./components/CreateUserSheet";
import { NewUserButton } from "./components/NewUserButton";
import {
	PROFILE_FILTER_OPTIONS,
	type ProfileFilter,
	RECURRENT_FILTER_OPTIONS,
	type RecurrentFilter,
	USER_SEARCH_FIELDS,
	type UserSearchFieldKey,
} from "./constants";
import { useCreateUser, useUsersList } from "./hooks";
import { buildCreateUserRequest } from "./utils";
import type { CreateUserFormData } from "./validation";

const CAMPOS_DO_USUARIO: CampoDeBusca<UserSearchFieldKey>[] =
	USER_SEARCH_FIELDS.map((campo) => ({
		chave: campo.key,
		rotulo: campo.label,
		placeholder: campo.placeholder,
	}));

export function UsersManagementPage() {
	const { auth } = useAuth();
	const navigate = useNavigate();

	const [searchField, setSearchField] = useState<UserSearchFieldKey>("name");
	const [term, setTerm] = useState("");
	const [profileFilter, setProfileFilter] = useState<ProfileFilter>("all");
	const [recurrentFilter, setRecurrentFilter] =
		useState<RecurrentFilter>("all");
	const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

	const showRecurrentFilter =
		profileFilter === "all" || profileFilter === EnumUserType.Common;

	function handleProfileFilterChange(value: ProfileFilter) {
		setProfileFilter(value);

		if (value !== "all" && value !== EnumUserType.Common) {
			setRecurrentFilter("all");
		}
	}

	const appliedTerm = useDebouncedValue(term.trim(), 400);

	function handleFieldChange(next: UserSearchFieldKey) {
		setSearchField(next);
		setTerm("");
	}

	const onlyDigits = appliedTerm.replace(/\D/g, "");

	const { usersQuery } = useUsersList({
		page: 1,
		page_size: DEFAULT_PAGE_SIZE,
		name: searchField === "name" ? appliedTerm || undefined : undefined,
		cpf: searchField === "cpf" ? onlyDigits || undefined : undefined,
		internal_identifier:
			searchField === "internal_identifier"
				? appliedTerm || undefined
				: undefined,
		type: profileFilter === "all" ? undefined : profileFilter,
		is_recurrent:
			!showRecurrentFilter || recurrentFilter === "all"
				? undefined
				: recurrentFilter === "recurrent",
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
			skeleton={<ListaDeDadosEsqueleto rotulo="Carregando os usuários" />}
			error={usersQuery.isError ? usersQuery.error : undefined}
			onRetry={() => usersQuery.refetch()}
			hasPermission={auth?.type === EnumUserType.Admin}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<NewUserButton
					onClick={() => setIsCreateUserOpen(true)}
					className="lg:hidden"
				/>
			}
		>
			<div className="flex flex-col gap-4 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-6">
				<div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
					<PainelDeFiltros className="lg:flex-1">
						<GrupoDeFiltro rotulo="Perfil">
							<FilterChips
								options={PROFILE_FILTER_OPTIONS}
								value={profileFilter}
								onChange={handleProfileFilterChange}
							/>
						</GrupoDeFiltro>

						{showRecurrentFilter && (
							<GrupoDeFiltro rotulo="Recorrência">
								<FilterChips
									options={RECURRENT_FILTER_OPTIONS}
									value={recurrentFilter}
									onChange={setRecurrentFilter}
								/>
							</GrupoDeFiltro>
						)}
					</PainelDeFiltros>
					<NewUserButton
						onClick={() => setIsCreateUserOpen(true)}
						className="hidden lg:flex"
					/>
				</div>

				<BuscaPorCampo
					campos={CAMPOS_DO_USUARIO}
					campo={searchField}
					aoTrocarCampo={handleFieldChange}
					valor={term}
					aoMudar={(value) =>
						setTerm(searchField === "cpf" ? formatCpf(value) : value)
					}
				/>

				<RefreshableList updating={usersQuery.isPlaceholderData}>
					<ListaDeDados
						itens={users}
						colunas={COLUNAS_DO_USUARIO}
						chaveDoItem={(user) => user.id_user}
						rotuloDoItem={(user) => `Abrir o cadastro de ${user.name}`}
						aoAbrir={(user) => navigate(`/usuarios/${user.id_user}`)}
						vazio={
							<EmptyState
								illustration={usuariosVazio}
								title={
									appliedTerm
										? `Nenhum resultado para "${appliedTerm}"`
										: "Nenhum usuário encontrado"
								}
								description={
									appliedTerm
										? "Confira a grafia ou troque o campo da busca."
										: "Ajuste o filtro selecionado."
								}
							/>
						}
					/>
				</RefreshableList>
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
