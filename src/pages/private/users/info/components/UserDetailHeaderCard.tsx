import type { ReactNode } from "react";
import { CopyableId } from "@/components/full/CopyableId";
import { getInitials } from "@/components/layout/utils";
import { cn } from "@/lib/utils";
import type { IGetUserResponse } from "@/services/types/i-user";
import { EnumUserType } from "@/services/types/i-user";
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
		<div className="flex flex-col gap-5 rounded-card-sm border border-line bg-white p-6 lg:flex-row lg:items-center lg:justify-between">
			<div className="flex items-center gap-4">
				<div
					className={cn(
						"flex size-[56px] shrink-0 items-center justify-center rounded-full",
						isDonor ? "bg-eva-tint" : "bg-blue-tint",
					)}
				>
					<span
						className={cn(
							"text-[18px] font-bold",
							isDonor ? "text-eva" : "text-blue-deep",
						)}
					>
						{getInitials(user.name)}
					</span>
				</div>
				<div className="flex min-w-0 flex-col gap-1.5">
					<p className="truncate text-[22px] font-extrabold text-ink">
						{user.name}
					</p>
					<div className="flex flex-wrap items-center gap-2">
						<UserTypeBadge type={user.type} />
					</div>
					<CopyableId id={user.id_user} />
				</div>
			</div>

			{stats && (
				<div className="flex flex-wrap items-center divide-x divide-surface-3">
					{stats}
				</div>
			)}
		</div>
	);
}
