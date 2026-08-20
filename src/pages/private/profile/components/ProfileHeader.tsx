import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import type { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_LABEL, USER_TYPE_TONE } from "@/utils/constants";

type ProfileHeaderProps = {
	name: string;
	email: string;
	userType?: EnumUserType;
};

export function ProfileHeader({ name, email, userType }: ProfileHeaderProps) {
	return (
		<div className="flex items-center gap-3 bg-surface-2 px-4 py-3 lg:bg-transparent lg:px-0 lg:py-0">
			<div className="relative shrink-0">
				<div className="flex size-[73px] items-center justify-center rounded-full bg-blue-bright/18 text-[22px] font-bold text-blue-deep">
					{getInitials(name)}
				</div>
			</div>

			<div className="flex min-w-0 flex-col gap-1">
				<div className="flex items-center gap-2">
					<p className="truncate text-[16px] font-semibold text-ink">{name}</p>
					{userType && (
						<Badge tone={USER_TYPE_TONE[userType]} size="sm">
							{USER_TYPE_LABEL[userType]}
						</Badge>
					)}
				</div>
				<p className="truncate text-[12px] text-ink-3">{email}</p>
			</div>
		</div>
	);
}
