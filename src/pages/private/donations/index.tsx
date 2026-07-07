import { LoaderCircle, Plus } from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
	EnumDonationStepName,
	NUMBER_OF_DONATION_STEPS,
} from "@/services/types/i-donation";
import { DonationCard } from "./components/DonationCard";
import {
	useActiveDonationSteps,
	useCreateDonation,
	useDonationsList,
} from "./hooks";

const STEP_NUMBER: Record<EnumDonationStepName, number> = {
	[EnumDonationStepName.BloodTest]: 1,
	[EnumDonationStepName.DeliverMilkingKit]: 2,
	[EnumDonationStepName.CollectMilk]: 3,
	[EnumDonationStepName.MilkAnalysis]: 4,
};

export function DonationsPage() {
	const navigate = useNavigate();

	const { data, isLoading, isError, refetch } = useDonationsList();
	const createDonation = useCreateDonation();

	const donations = data?.data ?? [];

	// Numera as doações pela ordem de criação (mais antiga = 1), independente
	// da ordem em que a API retorna, e ordena a exibição com a doação em
	// andamento no topo, seguida das concluídas da mais antiga para a mais nova.
	const orderedDonations = [...donations]
		.sort((a, b) => a.created_at.localeCompare(b.created_at))
		.map((donation, index) => ({ donation, number: index + 1 }))
		.sort((a, b) => {
			if (a.donation.is_active !== b.donation.is_active) {
				return Number(b.donation.is_active) - Number(a.donation.is_active);
			}
			return a.donation.created_at.localeCompare(b.donation.created_at);
		});

	const activeDonation = donations.find((donation) => donation.is_active);
	const { data: activeDetail } = useActiveDonationSteps(
		activeDonation?.id_donation,
	);

	const activeStep = activeDetail?.steps?.at(-1);
	const activeStepNumber = activeStep ? STEP_NUMBER[activeStep.name] : 0;
	const activeStepLabel = activeStep?.name;

	function goToDetail(idDonation: string) {
		navigate(`/minha-doacao/${idDonation}`);
	}

	function handleCreateDonation() {
		createDonation.mutate(undefined, {
			onSuccess: (donation) => goToDetail(donation.id_donation),
		});
	}

	return (
		<div className="-m-5 flex min-h-[calc(100vh-69px)] flex-col bg-[#f4f7fb]">
			<div className="flex flex-1 flex-col gap-4 px-5 pb-4 pt-6">
				<div className="flex flex-col gap-0.5">
					<h1 className="text-[26px] font-extrabold text-[#0e2a45]">Doações</h1>
					<p className="text-[14px] text-[#6b8faa]">
						Acompanhe as suas doações
					</p>
				</div>

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
							className="rounded-full border-[1.5px] border-[#00458b] px-5 py-2 text-[13px] font-semibold text-[#00458b] active:scale-[0.98] transition-transform"
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
					<div className="flex flex-col gap-3">
						{orderedDonations.map(({ donation, number }) => {
							const isInProgress = donation.is_active;

							return (
								<DonationCard
									key={donation.id_donation}
									number={number}
									status={isInProgress ? "in_progress" : "completed"}
									createdAt={donation.created_at}
									currentStep={
										isInProgress ? activeStepNumber : NUMBER_OF_DONATION_STEPS
									}
									totalSteps={NUMBER_OF_DONATION_STEPS}
									stepLabel={isInProgress ? activeStepLabel : undefined}
									onClick={() => goToDetail(donation.id_donation)}
								/>
							);
						})}
					</div>
				)}
			</div>

			<div className="sticky bottom-0 border-t border-[#e3e9f2] bg-[#f4f7fb] px-5 pb-5 pt-3">
				<button
					type="button"
					onClick={handleCreateDonation}
					disabled={createDonation.isPending}
					className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[#00458b] text-[15px] font-semibold text-white active:scale-[0.98] transition-transform disabled:opacity-60"
				>
					{createDonation.isPending ? (
						<LoaderCircle className="size-5 animate-spin" />
					) : (
						<Plus className="size-5" />
					)}
					Nova Doação
				</button>
			</div>
		</div>
	);
}
