import { Badge } from "@/components/ui/badge";

type Props = {
	isActive: boolean;
	hasError: boolean;
};

export function DonationStatusBadge({ isActive, hasError }: Props) {
	const label = hasError ? "Com erro" : isActive ? "Em andamento" : "Concluída";
	const tone = hasError ? "error" : isActive ? "info" : "success";

	return (
		<Badge tone={tone} dot size="lg">
			{label}
		</Badge>
	);
}
