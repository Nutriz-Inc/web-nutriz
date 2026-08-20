type ProgressBarProps = {
	current: number;
	total: number;
};

export function ProgressBar({ current, total }: ProgressBarProps) {
	const progress = Math.min(100, Math.max(0, (current / total) * 100));

	return (
		<div className="h-[6px] w-full overflow-hidden rounded-full bg-blue-tint lg:h-2">
			<div
				className="h-full rounded-full bg-blue-deep transition-all"
				style={{ width: `${progress}%` }}
			/>
		</div>
	);
}
