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
		? "bg-success-tint text-success"
		: "bg-canvas text-blue-bright";

	if (variant === "detail") {
		const borderClassName = hasHome ? "border-teal-tint" : "border-blue-tint-2";
		const dotClassName = hasHome ? "bg-success" : "bg-blue-bright";

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
