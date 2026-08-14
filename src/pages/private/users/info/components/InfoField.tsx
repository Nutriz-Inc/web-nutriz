type InfoFieldProps = {
	label: string;
	value: string;
};

export function InfoField({ label, value }: InfoFieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-[11px] font-semibold uppercase tracking-wide text-[#9ca3af]">
				{label}
			</p>
			<p className="text-[14px] font-medium text-[#1f2a37]">{value || "—"}</p>
		</div>
	);
}
