import { cn } from "@/lib/utils";
import { EnumJobStatus } from "@/services/types/i-job";

type StatusTabsProps = {
	value: EnumJobStatus;
	onChange: (value: EnumJobStatus) => void;
};

const TABS: { key: EnumJobStatus; label: string }[] = [
	{ key: EnumJobStatus.Pending, label: "Em Andamento" },
	{ key: EnumJobStatus.Done, label: "Concluído" },
	{ key: EnumJobStatus.Failed, label: "Com Erro" },
];

export function StatusTabs({ value, onChange }: StatusTabsProps) {
	return (
		<div className="overflow-x-auto">
			<div className="flex w-fit items-center gap-1 rounded-full bg-[#eef2f7] p-1">
				{TABS.map((tab) => {
					const isActive = tab.key === value;
					return (
						<button
							key={tab.key}
							type="button"
							onClick={() => onChange(tab.key)}
							className={cn(
								"shrink-0 rounded-full px-5 py-2 text-[14px] font-semibold transition-colors",
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
		</div>
	);
}
