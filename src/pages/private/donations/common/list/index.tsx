import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import doacaoVazia from "@/assets/illustrations/doacao-vazia.svg";
import { EmptyState } from "@/components/full/EmptyState";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { getStepNumber } from "@/utils/constants";
import { getNumberOfDonationSteps } from "@/utils/donation";
import { DonationCard } from "./components/DonationCard";
import { useDonationsList } from "./hooks";

export function DonationsPage() {
	const navigate = useNavigate();
	const { auth } = useAuth();

	const { data, isLoading, isError, refetch } = useDonationsList();

	const donations = data?.data ?? [];

	const orderedDonations = [...donations]
		.sort((a, b) => a.created_at.localeCompare(b.created_at))
		.map((donation, index) => ({ donation, number: index + 1 }))
		.sort((a, b) => {
			if (a.donation.is_active !== b.donation.is_active) {
				return Number(b.donation.is_active) - Number(a.donation.is_active);
			}
			return a.donation.created_at.localeCompare(b.donation.created_at);
		});

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
					className="hidden items-center gap-2 rounded-full bg-blue-deep-fill px-6 py-3 text-[14px] font-semibold text-white transition-[transform,background-color] hover:bg-blue-fill active:scale-[0.98] disabled:opacity-60 lg:flex"
				>
					<Plus className="size-4" />
					Nova Doação
				</button>
			}
		>
			<div className="-mx-4 -mt-4 -mb-16 flex min-h-[calc(100vh-69px)] flex-col bg-canvas sm:-mx-6 sm:-mt-6 lg:-mx-10">
				<div className="flex flex-1 flex-col gap-4 px-4 pb-28 pt-6 sm:px-6 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-6 lg:px-10 lg:pb-4 lg:pt-8">
					{isLoading ? (
						<div className="flex flex-col gap-3">
							{[0, 1, 2].map((index) => (
								<div
									key={index}
									className="h-24 w-full animate-pulse rounded-2xl bg-surface/70"
								/>
							))}
						</div>
					) : isError ? (
						<div className="flex flex-col items-center gap-3 rounded-card bg-surface p-6 text-center shadow-soft">
							<p className="text-[14px] text-ink-2">
								Não foi possível carregar as suas doações.
							</p>
							<button
								type="button"
								onClick={() => refetch()}
								className="rounded-full border-[1.5px] border-blue-deep px-5 py-2 text-[13px] font-semibold text-blue-deep transition-[transform,background-color] hover:bg-blue-tint active:scale-[0.98]"
							>
								Tentar novamente
							</button>
						</div>
					) : donations.length === 0 ? (
						<div className="rounded-card-sm bg-surface shadow-soft">
							<EmptyState
								illustration={doacaoVazia}
								title="Você ainda não tem doações"
								description="Comece a sua jornada criando a sua primeira doação."
							/>
						</div>
					) : (
						<div className="flex flex-col gap-3 lg:gap-4">
							{orderedDonations.map(({ donation, number }) => {
								const isInProgress = donation.is_active;
								const hasCurrentStep = Boolean(donation.current_step);
								const totalSteps = getNumberOfDonationSteps(
									donation.is_recurrent,
								);
								const currentStepNumber = donation.current_step
									? getStepNumber(donation.current_step, donation.is_recurrent)
									: 0;

								return (
									<DonationCard
										key={donation.id_donation}
										number={number}
										isInProgress={isInProgress}
										hasError={donation.has_error}
										createdAt={donation.created_at}
										currentStep={isInProgress ? currentStepNumber : totalSteps}
										totalSteps={totalSteps}
										isRecurrent={donation.is_recurrent}
										stepLabel={isInProgress ? donation.current_step : undefined}
										isClickable={hasCurrentStep}
										onClick={
											hasCurrentStep
												? () => goToDetail(donation.id_donation)
												: undefined
										}
									/>
								);
							})}
						</div>
					)}
				</div>

				<div className="fixed inset-x-0 bottom-0 z-20 border-t border-blue-tint bg-surface-3 px-5 pb-5 pt-3 lg:hidden">
					<button
						type="button"
						onClick={goToCreation}
						disabled={false}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-deep-fill text-[15px] font-semibold text-white transition-[transform,background-color] hover:bg-blue-fill active:scale-[0.98] disabled:opacity-60"
					>
						<Plus className="size-5" />
						Nova Doação
					</button>
				</div>
			</div>
		</Page>
	);
}
