import { Badge } from "@/components/ui/badge";
import { EnumUserType } from "@/services/types/i-user";
import { RECURRENT_DONOR_LABEL } from "@/utils/constants";
import { USER_TYPE_DISPLAY } from "../constants";

type UserTypeBadgeProps = {
	type: EnumUserType;
	isRecurrentDonor?: boolean;
};

export function UserTypeBadge({
	type,
	isRecurrentDonor = false,
}: UserTypeBadgeProps) {
	const display = USER_TYPE_DISPLAY[type];

	const label =
		isRecurrentDonor && type === EnumUserType.Common
			? RECURRENT_DONOR_LABEL
			: display.label;

	return <Badge tone={display.tone}>{label}</Badge>;
}
