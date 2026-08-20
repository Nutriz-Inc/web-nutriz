import { Segmented, type SegmentedOption } from "@/components/ui/segmented";
import { EnumJobStatus } from "@/services/types/i-job";

type StatusTabsProps = {
	value: EnumJobStatus;
	onChange: (value: EnumJobStatus) => void;
};

const TABS: SegmentedOption<EnumJobStatus>[] = [
	{ key: EnumJobStatus.Pending, label: "Em Andamento" },
	{ key: EnumJobStatus.Done, label: "Concluído" },
	{ key: EnumJobStatus.Failed, label: "Com Erro" },
];

export function StatusTabs({ value, onChange }: StatusTabsProps) {
	return (
		<div className="overflow-x-auto">
			<Segmented
				options={TABS}
				value={value}
				onChange={onChange}
				aria-label="Filtrar agendamentos por status"
			/>
		</div>
	);
}
