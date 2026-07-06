type CollectionTypeProps = {
	hasHome: boolean;
	variant?: "compact" | "detail";
};

export function CollectionType({
	hasHome,
	variant = "compact",
}: CollectionTypeProps) {
	const label = hasHome ? "Coleta domiciliar" : "Coleta no ponto";
	const colorClassName = hasHome
		? "bg-[#e8fcf9] text-[#0f6e56]"
		: "bg-[#edf3ff] text-[#387ccd]";

	if (variant === "detail") {
		const borderClassName = hasHome ? "border-[#a8e6da]" : "border-[#c7def5]";
		const dotClassName = hasHome ? "bg-[#0f6e56]" : "bg-[#387ccd]";

		return (
			<span
				className={`inline-flex w-fit shrink-0 items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[11px] font-bold uppercase ${colorClassName} ${borderClassName}`}
			>
				<span className={`size-[8px] rounded-sm ${dotClassName}`} />
				{label}
			</span>
		);
	}

	return (
		<span
			className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[12px] font-semibold shrink-0 ${colorClassName}`}
		>
			{label}
		</span>
	);
}
