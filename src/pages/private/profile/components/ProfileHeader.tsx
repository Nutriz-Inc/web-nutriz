import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import { EnumUserType } from "@/services/types/i-user";
import { USER_TYPE_BADGE_CLASSNAME, USER_TYPE_LABEL } from "../utils";

type ProfileHeaderProps = {
	name: string;
	email: string;
	userType?: EnumUserType;
};

export function ProfileHeader({ name, email, userType }: ProfileHeaderProps) {
	return (
		<div className="flex items-center gap-3 bg-[#f7f9fb] px-4 py-3 lg:bg-transparent lg:px-0 lg:py-0">
			<div className="relative shrink-0">
				<div className="flex size-[73px] items-center justify-center rounded-full bg-[#387ccd]/18 text-[22px] font-bold text-[#00458b]">
					{getInitials(name)}
				</div>
			</div>

			<div className="flex min-w-0 flex-col gap-1">
				<div className="flex items-center gap-2">
					<p className="truncate text-[16px] font-semibold text-[#1a1d23]">
						{name}
					</p>
					{userType && (
						<span
							className={cn(
								"w-fit shrink-0 rounded-full px-2.5 py-0.5 text-[11px] font-bold",
								USER_TYPE_BADGE_CLASSNAME[userType],
							)}
						>
							{USER_TYPE_LABEL[userType]}
						</span>
					)}
				</div>
				<p className="truncate text-[12px] text-[#888]">{email}</p>
			</div>
		</div>
	);
}
