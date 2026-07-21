import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnumDonationStepStatus } from "@/services/types/i-donation";
import type { AppointmentStatus } from "../../types";

type EndedNoticeProps = {
	status: AppointmentStatus;
};

export function EndedNotice({ status }: EndedNoticeProps) {
	const isFailed = status === EnumDonationStepStatus.Failed;

	return (
		<div
			className={cn(
				"flex items-start gap-3 rounded-2xl border px-4 py-3.5",
				isFailed
					? "border-[#f5c9c9] bg-[#fdecec]"
					: "border-[#c7e9db] bg-[#e9f6f0]",
			)}
		>
			<Lock
				className={cn(
					"mt-0.5 size-[18px] shrink-0",
					isFailed ? "text-[#cf3030]" : "text-[#0f6e56]",
				)}
			/>
			<div className="flex flex-col gap-0.5">
				<p
					className={cn(
						"text-[14px] font-bold",
						isFailed ? "text-[#cf3030]" : "text-[#0f6e56]",
					)}
				>
					Doação encerrada
				</p>
				<p className="text-[13px] text-[#6b7280]">
					Esta doação foi finalizada e o status não pode mais ser alterado.
				</p>
			</div>
		</div>
	);
}
