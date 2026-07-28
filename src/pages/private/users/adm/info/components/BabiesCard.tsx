import type { UserBaby } from "@/services/types/i-user";
import { BabyRow } from "./BabyRow";
import { InfoCard } from "./InfoCard";

type BabiesCardProps = {
	babies: UserBaby[];
};

export function BabiesCard({ babies }: BabiesCardProps) {
	return (
		<InfoCard
			title="Bebê(s) Cadastrado(s)"
			actionSlot={
				<span className="rounded-full bg-[#fce4f0] px-3 py-1 text-[12px] font-semibold text-[#f2579f]">
					{babies.length} {babies.length === 1 ? "bebê" : "bebês"}
				</span>
			}
		>
			{babies.length === 0 ? (
				<p className="text-[13px] text-[#9ca3af]">Nenhum bebê cadastrado.</p>
			) : (
				<div className="flex flex-col gap-3">
					{babies.map((baby) => (
						<BabyRow key={baby.id_user_baby} baby={baby} />
					))}
				</div>
			)}
		</InfoCard>
	);
}
