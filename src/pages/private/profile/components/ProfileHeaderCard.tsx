import type { ReactNode } from "react";
import { AvatarColorPicker } from "@/components/full/AvatarColorPicker";
import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import { useAvatarColor } from "@/hooks/use-avatar-color";
import { cn } from "@/lib/utils";
import type { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_LABEL, USER_TYPE_TONE } from "@/utils/constants";

type ProfileHeaderCardProps = {
	name: string;
	email: string;
	userType?: EnumUserType;
	idUser?: string;
	tabsSlot?: ReactNode;
};

export function ProfileHeaderCard({
	name,
	email,
	userType,
	idUser,
	tabsSlot,
}: ProfileHeaderCardProps) {
	const { cor } = useAvatarColor(idUser);

	return (
		<div className="flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-5 shadow-soft sm:p-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8">
			<div className="flex min-w-0 items-center gap-4">
				<AvatarColorPicker idUser={idUser} className="shrink-0">
					<span
						className={cn(
							"flex size-16 items-center justify-center rounded-full text-[20px] font-bold",
							cor.bg,
							cor.text,
						)}
					>
						{getInitials(name)}
					</span>
				</AvatarColorPicker>

				<div className="flex min-w-0 flex-col gap-1.5">
					<div className="flex min-w-0 flex-wrap items-center gap-2">
						<p className="min-w-0 break-words text-[18px] font-extrabold leading-tight text-ink lg:truncate lg:text-[22px]">
							{name}
						</p>
						{userType && (
							<Badge tone={USER_TYPE_TONE[userType]} size="sm">
								{USER_TYPE_LABEL[userType]}
							</Badge>
						)}
					</div>
					<p className="truncate text-[13px] text-ink-2">{email}</p>
				</div>
			</div>

			{tabsSlot && <div className="lg:shrink-0">{tabsSlot}</div>}
		</div>
	);
}
