type ProgressBarProps = {
	current: number;
	total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
	const progress = Math.min(100, Math.max(0, (current / total) * 100));

	return (
		<div className="h-[6px] w-full overflow-hidden rounded-full bg-[#e3e9f2] lg:h-2">
			<div
				className="h-full rounded-full bg-[#00458b] transition-all"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
