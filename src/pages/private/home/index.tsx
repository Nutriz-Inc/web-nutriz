import { useState } from "react";
import {
	Gift,
	Droplet,
	Menu,
} from "lucide-react";
import { AppDrawer } from "@/components/layout/AppDrawer";
import { useAuth } from "@/hooks/use-auth";
import { MetricCard } from "./components/MetricCard";
import NutrizLogo from "@/assets/nutriz-logo.svg";
import { NextDonationStep } from "./components/NextDonationStep";
import { EnumDonationStepName, EnumDonationStepStatus } from "@/services/types/i-donation-step";

const DONATED_LITERS = 9.6;
const GOAL_LITERS = 10;
const PROGRESS_PERCENT = (DONATED_LITERS / GOAL_LITERS) * 100;

export function HomePage() {
	const [drawerOpen, setDrawerOpen] = useState(false);
	const { auth } = useAuth();

	const firstName = auth?.name?.split(" ")[0];

	return (
		<div className="bg-[#f6f8fd] flex flex-col min-h-screen">
			<div className="bg-[#00458b] flex items-center justify-between pl-5 pr-4 py-[18px] sticky top-0 z-10">
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

			<div className="bg-[#00458b] flex flex-col gap-[18px] items-start pb-10 pt-7 px-5">
				<p className="font-extrabold leading-[44px] text-[40px] text-white">
					Olá, {firstName}!
				</p>

				<div className="flex flex-col gap-3 pt-2 w-full">
					<button
						type="button"
						className="bg-[#72f2eb] flex items-center justify-center py-4 rounded-full w-full active:scale-[0.98] transition-transform"
					>
						<p className="font-semibold text-[#00458b] text-[16px]">Nova Doação</p>
						{/* To do: Implementar redirect */}
					</button>
					<button
						type="button"
						className="border-[1.5px] border-white flex items-center justify-center py-4 rounded-full w-full active:scale-[0.98] transition-transform"
					>
						<p className="font-semibold text-white text-[16px]">Falar com a EVA</p>
						{/* To do:Implementar redirect */}
					</button>
				</div>

				<NextDonationStep
  datetime={new Date("2026-06-26T15:04:05-03:00")}
  status={EnumDonationStepStatus.Pending}
  onConsult={() => {}}
  stepName={EnumDonationStepName.BloodTest}
/>
			</div>

			{/* Resumo de Impacto */}
			<div className="bg-[#f6f8fd] flex flex-col gap-6 items-start pb-10 pt-9 px-5">
				<div className="flex flex-col gap-2 w-full">
					<p className="font-semibold text-[#0e9e94] text-[13px] tracking-[1.12px] uppercase">
						Seu Impacto
					</p>
					<p className="font-extrabold leading-[34px] text-[#0e2a45] text-[22px]">
						O que você já realizou
					</p>
					<p className="font-normal leading-6 text-gray-800 text-[16px]">
					Veja o impacto da sua generosidade. Cada doação sua transforma a vida de um bebê prematuro.
				</p>
				</div>

				<div className="flex flex-col gap-4 w-full">
					<MetricCard
						iconBg="bg-[#e6f1fb]"
						icon={<Gift className="size-6 text-[#00458b]" />}
						value="12"
						valueColor="text-[#00458b]"
						label="Doações realizadas"
						sublabel="Desde nov/2025"
					/>
					<MetricCard
						iconBg="bg-[#e1f5ee]"
						icon={<Droplet className="size-6 text-[#0e9e94]" />}
						value="9,6 L"
						valueColor="text-[#0e9e94]"
						label="Leite doado"
						sublabel="9.600 ml no total"
					/>
					<MetricCard
						iconBg="bg-[#fbeaf0]"
						icon={<span className="font-bold text-[#f2579f] text-[26px] leading-none">♥</span>}
						value="48"
						valueColor="text-[#f2579f]"
						label="Bebês alimentados"
						sublabel="Estimativa rBLH (~200 ml/bebê·dia)"
					/>
				</div>

				<p className="font-extrabold leading-[30px] text-[#0e2a45] text-[22px] w-full">
					Quantos bebês você já ajudou a alimentar
				</p>

				{/* Progress Card */}
				<div className="bg-[#00458b] flex flex-col gap-4 items-start overflow-hidden p-6 rounded-[20px] w-full">
					<div className="flex gap-3.5 items-start w-full">
						<div className="bg-[#0e5fa8] flex items-center justify-center rounded-[14px] size-11 shrink-0">
							<span className="font-bold text-white text-[20px] leading-none">♥</span>
						</div>
						<div className="flex flex-1 flex-col gap-1 min-w-0">
							<p className="font-semibold leading-[22px] text-white text-[16px]">
								Você já ajudou a alimentar 48 bebês prematuros
							</p>
							<p className="font-normal leading-[18px] text-[#c9dcef] text-[13px]">
								Faltam apenas 0,4 L para você atingir a marca de 10 litros doados.
							</p>
						</div>
					</div>
					<div className="flex flex-col gap-2 w-full">
						<p className="font-bold text-[#72f2eb] text-[16px] text-right">
							{DONATED_LITERS} / {GOAL_LITERS} L
						</p>
						<div className="bg-[#013a74] h-3 overflow-hidden rounded-full w-full">
							<div
								className="bg-[#72f2eb] h-3 rounded-full"
								style={{ width: `${PROGRESS_PERCENT}%` }}
							/>
						</div>
					</div>
				</div>
			</div>

			<AppDrawer open={drawerOpen} onOpenChange={setDrawerOpen} />
		</div>
	);
}
