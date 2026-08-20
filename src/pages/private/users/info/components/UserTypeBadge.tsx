import { Badge } from "@/components/ui/badge";
import type { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_DISPLAY } from "../constants";

type UserTypeBadgeProps = {
	type: EnumUserType;
};

export function UserTypeBadge({ type }: UserTypeBadgeProps) {
	const display = USER_TYPE_DISPLAY[type];

	return <Badge tone={display.tone}>{display.label}</Badge>;
}
