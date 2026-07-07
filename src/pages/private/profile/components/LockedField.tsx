import { Lock } from "lucide-react";

type LockedFieldProps = {
	label: string;
	value: string;
};

export function LockedField({ label, value }: LockedFieldProps) {
	return (
		<div className="flex items-center justify-between gap-3 px-3 py-3">
			<div className="flex flex-col gap-1">
				<p className="text-[12px] font-bold text-[#1e4976]">{label}</p>
				<p className="text-[12px] text-[#5a7a9a]">{value || "—"}</p>
			</div>
			<div className="flex size-4 shrink-0 items-center justify-center rounded-[4px] bg-[#387ccd]/15">
				<Lock className="size-[9px] text-[#387ccd]" />
			</div>
		</div>
	);
}
