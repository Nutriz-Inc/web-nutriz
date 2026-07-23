import { cn } from "@/lib/utils";

type Props = {
	isActive: boolean;
	hasError: boolean;
};

export function DonationStatusBadge({ isActive, hasError }: Props) {
	const label = hasError ? "Com erro" : isActive ? "Em andamento" : "Concluída";

	return (
		<span
			className={cn(
				"flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[13px] font-semibold",
				hasError
					? "bg-[#fcebeb] text-[#a32d2d]"
					: isActive
						? "bg-[#e8f1fb] text-[#387ccd]"
						: "bg-[#e1f5ee] text-[#0f6e56]",
			)}
		>
			<span
				className={cn(
					"size-2 rounded-full",
					hasError
						? "bg-[#a32d2d]"
						: isActive
							? "bg-[#387ccd]"
							: "bg-[#0f6e56]",
				)}
			/>
			{label}
		</span>
	);
}
