import { getInitials } from "@/components/layout/utils";
import type { UserBaby } from "@/services/types/i-user";
import { formatDateBR } from "@/utils/formatter";
import { formatBabyAge } from "../utils";

type BabyRowProps = {
	baby: UserBaby;
};

export function BabyRow({ baby }: BabyRowProps) {
	return (
		<div className="flex items-center gap-3 rounded-xl bg-[#f4f7fb] p-4">
			<div className="flex size-11 shrink-0 items-center justify-center rounded-full bg-[#e1f1fb]">
				<span className="text-[14px] font-bold text-[#00458b]">
					{getInitials(baby.name)}
				</span>
			</div>
			<div className="flex min-w-0 flex-col gap-0.5">
				<p className="truncate text-[14px] font-bold text-[#1f2a37]">
					{baby.name || "Bebê"}
				</p>
				<p className="text-[12px] text-[#6b7280]">
					Nascimento: {formatDateBR(baby.birth_date)} ·{" "}
					{formatBabyAge(baby.birth_date)}
				</p>
			</div>
		</div>
	);
}
