import type { ReactNode } from "react";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import type { IGetUserResponse } from "@/services/types/i-user";
import { EnumUserType } from "@/services/types/i-user";
import { UserStatusBadge } from "./UserStatusBadge";
import { UserTypeBadge } from "./UserTypeBadge";

type UserDetailHeaderCardProps = {
	user: IGetUserResponse;
	stats?: ReactNode;
};

export function UserDetailHeaderCard({
	user,
	stats,
}: UserDetailHeaderCardProps) {
	const isDonor = user.type === EnumUserType.Common;

	return (
		<div className="flex flex-col gap-5 rounded-2xl border border-[#e7eaef] bg-white p-6 lg:flex-row lg:items-center lg:justify-between">
			<div className="flex items-center gap-4">
				<div
					className={cn(
						"flex size-[56px] shrink-0 items-center justify-center rounded-full",
						isDonor ? "bg-[#fce4f0]" : "bg-[#e1f1fb]",
					)}
				>
					<span
						className={cn(
							"text-[18px] font-bold",
							isDonor ? "text-[#f2579f]" : "text-[#00458b]",
						)}
					>
						{getInitials(user.name)}
					</span>
				</div>
				<div className="flex min-w-0 flex-col gap-1.5">
					<p className="truncate text-[22px] font-extrabold text-[#1f2a37]">
						{user.name}
					</p>
					<div className="flex flex-wrap items-center gap-2">
						<UserTypeBadge type={user.type} />
						<UserStatusBadge active={!user.removed_at} feminine={isDonor} />
					</div>
				</div>
			</div>

			{stats && (
				<div className="flex flex-wrap items-center divide-x divide-[#eef1f5]">
					{stats}
				</div>
			)}
		</div>
	);
}
