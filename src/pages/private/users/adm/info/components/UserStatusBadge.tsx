import { cn } from "@/lib/utils";

type UserStatusBadgeProps = {
	active: boolean;
	feminine?: boolean;
};

export function UserStatusBadge({ active, feminine }: UserStatusBadgeProps) {
	const label = active
		? feminine
			? "Ativa"
			: "Ativo"
		: feminine
			? "Inativa"
			: "Inativo";

	return (
		<span
			className={cn(
				"flex w-fit items-center gap-1.5 rounded-full px-3 py-1 text-[12px] font-semibold",
				active ? "bg-[#e1f5ee] text-[#0f6e56]" : "bg-[#fdecec] text-[#cf3030]",
			)}
		>
			<span
				className={cn(
					"size-2 shrink-0 rounded-full",
					active ? "bg-[#12a877]" : "bg-[#e5484d]",
				)}
			/>
			{label}
		</span>
	);
}
