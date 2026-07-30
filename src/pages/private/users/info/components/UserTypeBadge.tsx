import { cn } from "@/lib/utils";
import type { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_DISPLAY } from "../constants";

type UserTypeBadgeProps = {
	type: EnumUserType;
};

export function UserTypeBadge({ type }: UserTypeBadgeProps) {
	const display = USER_TYPE_DISPLAY[type];

	return (
		<span
			className={cn(
				"w-fit rounded-full px-3 py-1 text-[12px] font-semibold",
				display.bg,
				display.text,
			)}
		>
			{display.label}
		</span>
	);
}
