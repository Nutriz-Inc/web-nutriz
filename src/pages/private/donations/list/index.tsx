import { Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { NUMBER_OF_DONATION_STEPS } from "@/services/types/i-donation";
import { EnumUserType } from "@/services/types/i-user";
import { STEP_NUMBER } from "@/utils/constants";
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
			actionSlot={
				<button
					type="button"
					onClick={goToCreation}
					disabled={false}
					className="hidden items-center gap-2 rounded-full bg-[#00458b] px-6 py-3 text-[14px] font-semibold text-white transition-[transform,background-color] hover:bg-[#00366e] active:scale-[0.98] disabled:opacity-60 lg:flex"
				>
					<Plus className="size-4" />
					Nova Doação
				</button>
			}
		>
			<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col bg-[#f4f7fb]">
				<div className="flex flex-1 flex-col gap-4 px-5 pb-28 pt-6 lg:mx-auto lg:w-full lg:max-w-[1400px] lg:gap-6 lg:px-8 lg:pb-4 lg:pt-8">
					{isLoading ? (
						<div className="flex flex-col gap-3">
							{[0, 1, 2].map((index) => (
								<div
									key={index}
									className="h-24 w-full animate-pulse rounded-2xl bg-white/70"
								/>
							))}
						</div>
					) : isError ? (
						<div className="flex flex-col items-center gap-3 rounded-2xl bg-white p-6 text-center shadow-[0px_8px_16px_rgba(10,38,77,0.06)]">
							<p className="text-[14px] text-[#6b8faa]">
								Não foi possível carregar as suas doações.
							</p>
							<button
								type="button"
								onClick={() => refetch()}
								className="rounded-full border-[1.5px] border-[#00458b] px-5 py-2 text-[13px] font-semibold text-[#00458b] transition-[transform,background-color] hover:bg-[#eef3f8] active:scale-[0.98]"
							>
								Tentar novamente
							</button>
						</div>
					) : donations.length === 0 ? (
						<div className="flex flex-col items-center gap-2 rounded-2xl bg-white p-8 text-center shadow-[0px_8px_16px_rgba(10,38,77,0.06)]">
							<p className="text-[15px] font-semibold text-[#0e2a45]">
								Você ainda não tem doações
							</p>
							<p className="text-[13px] text-[#6b8faa]">
								Comece a sua jornada criando a sua primeira doação.
							</p>
						</div>
					) : (
						<div className="flex flex-col gap-3 lg:gap-4">
							{orderedDonations.map(({ donation, number }) => {
								const isInProgress = donation.is_active;
								const hasCurrentStep = Boolean(donation.current_step);
								const currentStepNumber = donation.current_step
									? STEP_NUMBER[donation.current_step]
									: 0;

								return (
									<DonationCard
										key={donation.id_donation}
										number={number}
										isInProgress={isInProgress}
										createdAt={donation.created_at}
										currentStep={
											isInProgress
												? currentStepNumber
												: NUMBER_OF_DONATION_STEPS
										}
										totalSteps={NUMBER_OF_DONATION_STEPS}
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

				<div className="fixed inset-x-0 bottom-0 z-20 border-t border-[#e3e9f2] bg-[#f4f7fb] px-5 pb-5 pt-3 lg:hidden">
					<button
						type="button"
						onClick={goToCreation}
						disabled={false}
						className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#00458b] text-[15px] font-semibold text-white transition-[transform,background-color] hover:bg-[#00366e] active:scale-[0.98] disabled:opacity-60"
					>
						<Plus className="size-5" />
						Nova Doação
					</button>
				</div>
			</div>
		</Page>
	);
}
