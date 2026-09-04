import { ChevronRight, IdCard, Mail } from "lucide-react";
import { Link } from "react-router-dom";
import { getInitials } from "@/components/layout/utils";
import { Badge } from "@/components/ui/badge";
import { EnumUserType, type User } from "@/services/types/i-user";
import {
	RECURRENT_DONOR_LABEL,
	USER_TYPE_LABEL,
	USER_TYPE_TONE,
} from "@/utils/constants";
import { isRecurrentDonor } from "@/utils/donor";
import { formatCpf } from "@/utils/formatter";

type Props = {
	user: User;
};

export function UserRow({ user }: Props) {
	const typeLabel =
		user.type === EnumUserType.Common && isRecurrentDonor(user)
			? RECURRENT_DONOR_LABEL
			: USER_TYPE_LABEL[user.type];

	return (
		<Link
			to={`/usuarios/${user.id_user}`}
			className="flex flex-col gap-2.5 border-b border-surface-3 px-4 py-4 transition-colors last:border-b-0 hover:bg-surface-2 lg:grid lg:grid-cols-[1.6fr_1.6fr_1.2fr_1fr] lg:items-center lg:gap-4 lg:px-6"
		>
			<div className="flex items-center gap-3">
				<div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-success-tint text-[13px] font-bold text-blue-deep">
					{getInitials(user.name)}
				</div>
				<p className="truncate text-[15px] font-semibold text-ink">
					{user.name}
				</p>
				<ChevronRight className="ml-auto size-5 shrink-0 text-ink-3 lg:hidden" />
			</div>

			<div className="flex items-center justify-between gap-2 lg:order-last">
				<Badge tone={USER_TYPE_TONE[user.type]}>{typeLabel}</Badge>
				<ChevronRight className="hidden size-5 shrink-0 text-ink-3 lg:block" />
			</div>

			<div className="flex min-w-0 items-center gap-2 text-[14px] text-ink-2">
				<Mail className="size-4 shrink-0 text-ink-3" />
				<span className="truncate">{user.email}</span>
			</div>

			<div className="flex items-center gap-2 text-[14px] text-ink-2">
				<IdCard className="size-4 shrink-0 text-ink-3" />
				<span className="truncate">{formatCpf(user.cpf)}</span>
			</div>
		</Link>
	);
}
