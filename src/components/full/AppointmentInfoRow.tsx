import type { ReactNode } from "react";

type AppointmentInfoRowProps = {
	icon: ReactNode;
	label: string;
	value: string;
};

export function AppointmentInfoRow({
	icon,
	label,
	value,
}: AppointmentInfoRowProps) {
	return (
		<div className="flex items-start gap-2.5">
			<span className="mt-0.5">{icon}</span>
			<div className="flex min-w-0 flex-col">
				<span className="text-[12px] text-ink-3">{label}</span>
				<span className="text-[14px] font-semibold text-ink-2">{value}</span>
			</div>
		</div>
	);
}
