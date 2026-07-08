import { Droplet, Gift, Menu } from "lucide-react";
import { useState } from "react";
import NutrizLogo from "@/assets/nutriz-log-alternative.svg";
import { AppDrawer } from "@/components/layout/AppDrawer";
import { Footer } from "@/components/layout/Footer";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { MetricCard } from "./components/MetricCard";
import { NextDonationStep } from "./components/NextDonationStep";
import { useQueryUserInfo } from "./hooks";
import { BABY_ML_PER_DAY } from "@/utils/constants";

export function HomePage() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { auth } = useAuth();

	const { isLoading: loading, data } = useQueryUserInfo(auth?.id_user);

	const firstName = auth?.name?.split(" ")[0];
	const currentStepDonation = data?.current_donation?.steps?.at(-1);
	const dateForSubLabel = new Intl.DateTimeFormat("pt-BR", {
		month: "long",
		year: "numeric",
	}).format(new Date(data?.created_at || new Date()));

	const metrics = [
		{
			iconBg: "bg-[#e6f1fb]",
			icon: <Gift className="size-6 text-[#00458b]" />,
			value: String(data?.donations_completed || 0),
			valueColor: "text-[#00458b]",
			label: "Doações realizadas",
			sublabel: `Desde ${dateForSubLabel}`,
		},
		{
			iconBg: "bg-[#e1f5ee]",
			icon: <Droplet className="size-6 text-[#0e9e94]" />,
			value: `${data?.milk_donated || 0} L`,
			valueColor: "text-[#0e9e94]",
			label: "Leite doado",
			sublabel: `${(data?.milk_donated || 0) * 1000} ml no total`,
		},
		{
			iconBg: "bg-[#fbeaf0]",
			icon: (
				<span className="font-bold text-[#f2579f] text-[26px] leading-none">
					♥
				</span>
			),
			value: String(
				data?.milk_donated
					? Math.floor(((data?.milk_donated || 0) * 1000) / BABY_ML_PER_DAY)
					: 0,
			),
			valueColor: "text-[#f2579f]",
			label: "Bebês alimentados",
			sublabel: "Estimativa rBLH (~200 ml/bebê·dia)",
		},
	];

	return (
		<Page loading={loading} hasPermission={auth?.type === EnumUserType.Common}>
			<div className="bg-[#f6f8fd] flex flex-col min-h-screen">
				<div className="bg-[#00458b] sticky top-0 z-10">
					<div className="flex items-center justify-between max-w-[1440px] mx-auto pl-5 pr-4 py-[18px] lg:pl-20 lg:pr-9">
						<img
							src={NutrizLogo}
							alt="Nutriz"
							className="h-14 w-auto select-none"
						/>
						<button
							type="button"
							onClick={() => setDrawerOpen(true)}
							aria-label="Abrir menu"
							className="text-white hover:text-white/80 transition-colors"
						>
							<Menu className="size-6" />
						</button>
					</div>
				</div>

				<div className="bg-[#00458b]">
					<div className="flex flex-col gap-[18px] items-start max-w-[1440px] mx-auto pb-10 pt-7 px-5 lg:flex-row lg:items-center lg:justify-between lg:gap-10 lg:pb-16 lg:pt-14 lg:px-20">
						<div className="flex flex-col gap-[18px] items-start w-full lg:w-[620px] lg:shrink-0">
							<p className="font-extrabold leading-[44px] text-[40px] text-white lg:text-[52px] lg:leading-[56px]">
								Olá, {firstName}!
							</p>

							<div className="flex flex-col gap-3 pt-2 w-full lg:flex-row lg:w-auto lg:gap-4">
								<button
									type="button"
									className="bg-[#72f2eb] flex items-center justify-center py-4 rounded-full w-full active:scale-[0.98] transition-transform lg:w-auto lg:px-7"
								>
									<p className="font-semibold text-[#00458b] text-[16px]">
										Nova Doação
									</p>
									{/* To do: Implementar redirect */}
								</button>
								<button
									type="button"
									className="border-[1.5px] border-white flex items-center justify-center py-4 rounded-full w-full active:scale-[0.98] transition-transform lg:w-auto lg:px-7"
								>
									<p className="font-semibold text-white text-[16px]">
										Falar com a EVA
									</p>
									{/* To do:Implementar redirect */}
								</button>
							</div>
						</div>

						{currentStepDonation && (
							<NextDonationStep
								datetime={currentStepDonation.set_date!}
								status={currentStepDonation.status}
								onConsult={() => {}}
								stepName={currentStepDonation.name}
								className="lg:w-[360px] lg:shrink-0"
							/>
						)}
					</div>
				</div>

				<div className="bg-[#f6f8fd]">
					<div className="flex flex-col gap-6 items-start max-w-[1440px] mx-auto pb-10 pt-9 px-5 lg:gap-8 lg:pb-[106px] lg:pt-14 lg:px-20">
						<div className="flex flex-col gap-2 w-full lg:max-w-[620px]">
							<p className="font-semibold text-[#0e9e94] text-[13px] tracking-[1.12px] uppercase">
								Seu Impacto
							</p>
							<p className="font-extrabold leading-[34px] text-[#0e2a45] text-[22px] lg:text-[34px] lg:leading-[40px]">
								O que você já realizou
							</p>
							<p className="font-normal leading-6 text-gray-800 text-[16px]">
								Veja o impacto da sua generosidade. Cada doação sua transforma a
								vida de um bebê prematuro.
							</p>
						</div>

						<div className="flex flex-col gap-4 w-full lg:flex-row lg:gap-6">
							{metrics.map((metric, index) => (
								<MetricCard
									key={index}
									iconBg={metric.iconBg}
									icon={metric.icon}
									value={metric.value}
									valueColor={metric.valueColor}
									label={metric.label}
									sublabel={metric.sublabel}
								/>
							))}
						</div>
					</div>
				</div>

				<Footer />

				<AppDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
			</div>
		</Page>
	);
}
