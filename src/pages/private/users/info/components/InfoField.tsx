type InfoFieldProps = {
	label: string;
	value: string;
};

export function InfoField({ label, value }: InfoFieldProps) {
	return (
		<div className="flex flex-col gap-1">
			<p className="text-rotulo font-semibold uppercase tracking-wide text-ink-3">
				{label}
			</p>
			<p className="text-apoio font-medium text-ink">{value || "—"}</p>
		</div>
	);
}
