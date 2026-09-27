import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import doacaoVazia from "@/assets/illustrations/doacao-vazia.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { ErrorState } from "@/components/full/ErrorState";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useBarraInferior } from "@/hooks/use-barra-inferior";
import { EnumUserType } from "@/services/types/i-user";
import { ConviteParaDoar } from "./components/ConviteParaDoar";
import { DoacaoEmAndamento } from "./components/DoacaoEmAndamento";
import { EsqueletoDasDoacoes } from "./components/EsqueletoDasDoacoes";
import { HistoricoDeDoacoes } from "./components/HistoricoDeDoacoes";
import { ResumoDaJornada } from "./components/ResumoDaJornada";
import { useDonationsList } from "./hooks";
import type { DoacaoDaLista } from "./types";

export function DonationsPage() {
	const barra = useBarraInferior();
	const navigate = useNavigate();
	const { auth } = useAuth();

	const { data, isLoading, isError, error, refetch } = useDonationsList();

	const donations = data?.data ?? [];

	const doacoes: DoacaoDaLista[] = [...donations]
		.sort((a, b) => a.created_at.localeCompare(b.created_at))
		.map((donation, index) => ({
			id: donation.id_donation,
			numero: index + 1,
			ativa: donation.is_active,
			comErro: donation.has_error,
			criadaEm: donation.created_at,
			etapaAtual: donation.current_step ?? undefined,
			recorrente: donation.is_recurrent,
		}))
		.sort((a, b) => {
			if (a.ativa !== b.ativa) {
				return Number(b.ativa) - Number(a.ativa);
			}
			return b.criadaEm.localeCompare(a.criadaEm);
		});

	const emAndamento = doacoes.find((doacao) => doacao.ativa);
	const historico = doacoes.filter((doacao) => doacao !== emAndamento);

	function goToCreation() {
		navigate("/nova-doacao");
	}

	function goToDetail(idDonation: string) {
		navigate(`/doacao/${idDonation}`);
	}

	return (
		<Page
			title="Minhas doações"
			description="Acompanhe as suas doações"
			hasPermission={auth?.type === EnumUserType.Common}
			titleClassName="lg:mx-auto lg:w-full lg:max-w-[1400px]"
			actionSlot={
				<button
					type="button"
					onClick={goToCreation}
					disabled={false}
					className="hidden items-center gap-2 rounded-full bg-blue-deep-fill px-6 py-3 text-apoio font-semibold text-white transition-[transform,background-color] hover:bg-blue-fill active:scale-[0.98] disabled:opacity-60 lg:flex"
				>
					<Plus className="size-4" />
					Nova doação
				</button>
			}
		>
			<div className="-mx-4 -mt-4 -mb-16 flex min-h-[calc(100vh-69px)] flex-col bg-canvas sm:-mx-6 sm:-mt-6 lg:-mx-10">
				<div className="flex flex-1 flex-col gap-4 px-4 pb-28 pt-6 sm:px-6 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-8 lg:px-10 lg:pb-12 lg:pt-8">
					{isLoading ? (
						<EsqueletoDasDoacoes />
					) : isError ? (
						<ErrorState error={error} onRetry={() => refetch()} />
					) : doacoes.length === 0 ? (
						<div className="rounded-card-sm bg-surface shadow-soft">
							<EmptyState
								illustration={doacaoVazia}
								title="Sua jornada de doação começa aqui"
								description="Cada gota conta. Crie a sua primeira doação e a gente cuida do resto."
								action={
									<Button
										type="button"
										variant="primary"
										size="pill"
										onClick={goToCreation}
									>
										Fazer minha primeira doação
									</Button>
								}
							/>
						</div>
					) : (
						<>
							<div className="cascata grid items-stretch gap-4 lg:grid-cols-[minmax(0,1.65fr)_minmax(0,1fr)] lg:gap-6">
								{emAndamento ? (
									<DoacaoEmAndamento
										doacao={emAndamento}
										onAbrir={
											emAndamento.etapaAtual
												? () => goToDetail(emAndamento.id)
												: undefined
										}
									/>
								) : (
									<ConviteParaDoar onDoar={goToCreation} />
								)}
								<ResumoDaJornada doacoes={doacoes} />
							</div>

							{historico.length > 0 ? (
								<HistoricoDeDoacoes
									doacoes={historico}
									podeAbrir={(doacao) => Boolean(doacao.etapaAtual)}
									onAbrir={(doacao) => goToDetail(doacao.id)}
								/>
							) : null}
						</>
					)}
				</div>

				<div
					ref={barra}
					className="fixed inset-x-0 bottom-0 z-20 border-t border-blue-tint bg-surface-3 px-5 pb-5 pt-3 lg:hidden"
				>
					<Button
						variant="primary"
						size="pill"
						type="button"
						onClick={goToCreation}
						disabled={false}
						className="w-full"
					>
						<Plus className="size-5" />
						Nova doação
					</Button>
				</div>
			</div>
		</Page>
	);
}
