import { Lock } from "lucide-react";
import { cn } from "@/lib/utils";
import { EnumJobStatus } from "@/services/types/i-job";
import type { AppointmentStatus } from "../../types";

type EndedNoticeProps = {
	status: AppointmentStatus;
};

export function EndedNotice({ status }: EndedNoticeProps) {
	const isFailed = status === EnumJobStatus.Failed;

	return (
		<div
			className={cn(
				"flex items-start gap-3 rounded-2xl border px-4 py-3.5",
				isFailed
					? "border-danger-tint bg-danger-tint"
					: "border-teal-tint bg-success-tint",
			)}
		>
			<Lock
				className={cn(
					"mt-0.5 size-[18px] shrink-0",
					isFailed ? "text-danger" : "text-success",
				)}
			/>
			<div className="flex flex-col gap-0.5">
				<p
					className={cn(
						"text-[14px] font-bold",
						isFailed ? "text-danger" : "text-success",
					)}
				>
					Tarefa encerrada
				</p>
				<p className="text-[13px] text-ink-2">
					Esta tarefa foi finalizada e o status não pode mais ser alterado.
				</p>
			</div>
		</div>
	);
}
