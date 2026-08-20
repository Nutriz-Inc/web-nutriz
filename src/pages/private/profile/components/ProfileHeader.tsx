import { AvatarColorPicker } from "@/components/full/AvatarColorPicker";
import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import { useAvatarColor } from "@/hooks/use-avatar-color";
import { cn } from "@/lib/utils";
import type { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_LABEL, USER_TYPE_TONE } from "@/utils/constants";

type ProfileHeaderProps = {
	name: string;
	email: string;
	userType?: EnumUserType;
	idUser?: string;
};

export function ProfileHeader({
	name,
	email,
	userType,
	idUser,
}: ProfileHeaderProps) {
	const { cor } = useAvatarColor(idUser);

	return (
		<div className="flex items-center gap-3 bg-surface-2 px-4 py-3 lg:bg-transparent lg:px-0 lg:py-0">
			<div className="relative shrink-0">
				<div
					className={cn(
						"flex size-[73px] items-center justify-center rounded-full text-[22px] font-bold",
						cor.bg,
						cor.text,
					)}
				>
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

				<AvatarColorPicker idUser={idUser} className="mt-1" />
			</div>
		</div>
	);
}
