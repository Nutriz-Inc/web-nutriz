import { Badge } from "@/components/ui/badge";
import {
	getStatusLabel,
	STATUS_VOCABULARY,
	type StatusGender,
	type StatusToken,
} from "@/utils/status";

type StatusBadgeProps = {
	token: StatusToken;
	gender?: StatusGender;
	size?: "sm" | "md" | "lg";
	caps?: boolean;
	className?: string;
};

export function StatusBadge({
	token,
	gender = "m",
	size = "md",
	caps = false,
	className,
}: StatusBadgeProps) {
	const { tone, icon: Icon } = STATUS_VOCABULARY[token];

	return (
		<Badge tone={tone} size={size} caps={caps} className={className}>
			<Icon
				aria-hidden="true"
				className={size === "sm" ? "size-3" : "size-3.5"}
			/>
			{getStatusLabel(token, gender)}
		</Badge>
	);
}
