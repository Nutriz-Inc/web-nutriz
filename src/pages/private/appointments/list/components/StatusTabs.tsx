import { cn } from "@/lib/utils";
import type { AppointmentTab } from "../utils";

type StatusTabsProps = {
	value: AppointmentTab;
	onChange: (value: AppointmentTab) => void;
};

const TABS: { key: AppointmentTab; label: string }[] = [
	{ key: "andamento", label: "Em Andamento" },
	{ key: "concluidas", label: "Concluídas" },
];

export function StatusTabs({ value, onChange }: StatusTabsProps) {
	return (
		<div className="flex w-fit items-center gap-1 rounded-full bg-[#eef2f7] p-1">
			{TABS.map((tab) => {
				const isActive = tab.key === value;
				return (
					<button
						key={tab.key}
						type="button"
						onClick={() => onChange(tab.key)}
						className={cn(
							"rounded-full px-5 py-2 text-[14px] font-semibold transition-colors",
							isActive
								? "bg-[#00458b] text-white shadow-sm"
								: "text-[#6b7280] hover:text-[#374151]",
						)}
					>
						{tab.label}
					</button>
				);
			})}
		</div>
	);
}
