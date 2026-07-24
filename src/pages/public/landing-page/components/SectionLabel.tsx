type SectionLabelProps = {
	children: string;
	color?: string;
};

export function SectionLabel({
	children,
	color = "#0f9d8c",
}: SectionLabelProps) {
	return (
		<span
			className="text-[12px] font-bold uppercase tracking-[0.14em]"
			style={{ color }}
		>
			{children}
		</span>
	);
}
