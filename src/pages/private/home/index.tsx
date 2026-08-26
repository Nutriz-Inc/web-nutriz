import { Droplet, Gift, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LiveBadge } from "@/components/full/LiveBadge";
import { Reveal } from "@/components/full/Reveal";
import { SectionHeading } from "@/components/full/SectionHeading";
import { AppHeader } from "@/components/layout/AppHeader";
import { Footer } from "@/components/layout/Footer";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { useStepAlerts } from "@/hooks/use-step-alerts";
import { openEva } from "@/pages/private/eva/widget/eva-widget-bus";
import { EnumUserType } from "@/services/types/i-user";
import { BABY_ML_PER_DAY } from "@/utils/constants";
import { DonationStatusCard } from "./components/DonationStatusCard";
import { GreetingHero } from "./components/GreetingHero";
import { ImpactCard } from "./components/ImpactCard";
import { NextDonationStep } from "./components/NextDonationStep";
import { StoriesBoard } from "./components/StoriesBoard";
import { useQueryUserInfo } from "./hooks";

const monthYearFormatter = new Intl.DateTimeFormat("pt-BR", {
	month: "long",
	year: "numeric",
});

const EMPTY = "—";

export function HomePage() {
	const navigate = useNavigate();
	const { auth } = useAuth();

	const { isLoading: loading, data } = useQueryUserInfo(auth?.id_user);

	const firstName = auth?.name?.split(" ")[0];
	const currentStepDonation = data?.current_donation?.steps?.at(-1);

	useStepAlerts(data?.current_donation?.steps);

	const donorSince = data?.created_at
		? monthYearFormatter.format(new Date(data.created_at))
		: null;

	const donationsCompleted = data?.donations_completed ?? null;
	const milkDonatedMl = data?.milk_donated ?? null;
	const liters =
		milkDonatedMl === null
			? null
			: (milkDonatedMl / 1000).toLocaleString("pt-BR", {
					maximumFractionDigits: 1,
				});
	const babiesFed =
		milkDonatedMl === null ? null : Math.floor(milkDonatedMl / BABY_ML_PER_DAY);

	function goToCreation() {
		navigate("/nova-doacao");
	}

	function goToDonationDetails() {
		navigate(`/doacao/${currentStepDonation?.id_donation}`);
	}

	const impactMetrics = [
		{
			icon: Gift,
			tone: "blue" as const,
			featured: true,
			value: donationsCompleted === null ? EMPTY : String(donationsCompleted),
			label: "Doações realizadas",
			hint: donorSince ? `Desde ${donorSince}` : "Sem doações ainda",
		},
		{
			icon: Droplet,
			tone: "bright" as const,
			featured: false,
			value: liters === null ? EMPTY : `${liters} L`,
			label: "Leite doado",
			hint:
				milkDonatedMl === null
					? "Sem registro"
					: `${milkDonatedMl} ml no total`,
		},
		{
			icon: Heart,
			tone: "eva" as const,
			featured: false,
			value: babiesFed === null ? EMPTY : String(babiesFed),
			label: "Bebês alimentados",
			hint: "Estimativa rBLH (~200 ml/bebê·dia)",
		},
	];

	const donationSteps = data?.current_donation?.steps;
	const hasDonationInProgress = !!donationSteps && donationSteps.length > 0;

	return (
		<Page loading={loading} hasPermission={auth?.type === EnumUserType.Common}>
			<div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-canvas font-body">
				<AppHeader />

				<div className="relative mx-auto w-full max-w-[1400px] grow px-4 pb-16 sm:px-6 sm:pb-20 lg:px-10">
					<main>
						<div className="mt-4 sm:mt-6">
							<GreetingHero
								firstName={firstName}
								donorSince={donorSince}
								milkDonatedLabel={liters === null ? EMPTY : `${liters} L`}
								onNewDonation={goToCreation}
								onOpenEva={() => openEva()}
								asideSlot={
									currentStepDonation && (
										<NextDonationStep
											datetime={currentStepDonation.set_date}
											status={currentStepDonation.status}
											onConsult={goToDonationDetails}
											stepName={currentStepDonation.name}
											className="shadow-lift"
										/>
									)
								}
							/>
						</div>

						{hasDonationInProgress && (
							<section aria-labelledby="home-status" className="mt-10 sm:mt-14">
								<SectionHeading
									id="home-status"
									label="Status"
									title="Acompanhe sua doação"
									actionSlot={<LiveBadge />}
								/>
								<hr className="mt-6 border-0 border-t border-blue-tint-2/60" />

								<Reveal className="mt-6 block">
									<DonationStatusCard steps={donationSteps} />
								</Reveal>
							</section>
						)}

						<section aria-labelledby="home-impact" className="mt-10 sm:mt-14">
							<SectionHeading
								id="home-impact"
								label="Seu impacto"
								title="O que você já realizou"
							/>
							<hr className="mt-6 border-0 border-t border-blue-tint-2/60" />

							<div className="mt-6 grid gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-4">
								{impactMetrics.map((metric, index) => (
									<Reveal
										key={metric.label}
										delay={index * 0.06}
										className={metric.featured ? "lg:col-span-2" : undefined}
									>
										<ImpactCard {...metric} />
									</Reveal>
								))}
							</div>
						</section>

						<Reveal className="mt-10 block sm:mt-14">
							<StoriesBoard />
						</Reveal>
					</main>
				</div>

				<Footer />
			</div>
		</Page>
	);
}
