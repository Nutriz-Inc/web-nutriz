import { cn } from "@/lib/utils";

type ActiveBadgeProps = {
	isActive: boolean;
};

export function ActiveBadge({ isActive }: ActiveBadgeProps) {
	return (
		<span
			className={cn(
				"flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold",
				isActive
					? "bg-[#e8f1fb] text-[#387ccd]"
					: "bg-[#fce4f0] text-[#f2579f]",
			)}
		>
			<span
				className={cn(
					"size-2 rounded-full",
					isActive ? "bg-[#387ccd]" : "bg-[#f2579f]",
				)}
			/>
			{isActive ? "Em andamento" : "Concluída"}
		</span>
	);
}
