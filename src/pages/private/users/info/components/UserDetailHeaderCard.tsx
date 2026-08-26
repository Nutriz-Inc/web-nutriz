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
		<div className="flex flex-col gap-5 rounded-card-sm border border-line bg-surface p-6 lg:flex-row lg:items-center lg:justify-between">
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
							isDonor ? "text-eva-deep" : "text-blue-deep",
						)}
					>
						{getInitials(user.name)}
					</span>
				</div>
				<div className="flex min-w-0 flex-col gap-1.5">
					{/* No celular o nome quebra em duas linhas em vez de ser
					    cortado: com 22px e o avatar ao lado sobravam ~270px, e quase
					    todo nome completo virava reticencias. */}
					<p className="text-[18px] font-extrabold leading-tight text-ink lg:truncate lg:text-[22px] lg:leading-normal">
						{user.name}
					</p>
					<div className="flex flex-wrap items-center gap-2">
						<UserTypeBadge type={user.type} />
					</div>
					<CopyableId id={user.id_user} />
				</div>
			</div>

			{/*
			 * No celular os numeros viram tres colunas iguais abaixo de uma regua.
			 * Com `flex-wrap` + `divide-x` o terceiro caia para a linha de baixo
			 * levando junto a borda da esquerda e o `px-5`, e o bloco ficava torto.
			 */}
			{stats && (
				<div className="grid grid-cols-3 gap-2 border-t border-surface-3 pt-4 lg:flex lg:flex-wrap lg:items-center lg:divide-x lg:divide-surface-3 lg:border-t-0 lg:pt-0">
					{stats}
				</div>
			)}
		</div>
	);
}
