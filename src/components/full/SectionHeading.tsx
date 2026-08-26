import { cn } from "@/lib/utils";

type SectionHeadingProps = {
	label: string;
	title: string;
	tone?: "blue" | "eva" | "teal" | "mint";
	align?: "left" | "center";
	onDark?: boolean;
	as?: "h2" | "h3";
	actionSlot?: React.ReactNode;
	className?: string;
	id?: string;
};

const LABEL_TONE = {
	blue: "text-blue-bright",
	eva: "text-eva-deep",
	teal: "text-teal",
	mint: "text-mint",
} as const;

export function SectionHeading({
	label,
	title,
	tone = "blue",
	align = "left",
	onDark = false,
	as: Heading = "h2",
	actionSlot,
	className,
	id,
}: SectionHeadingProps) {
	return (
		<div
			className={cn(
				"flex flex-wrap items-end gap-x-4 gap-y-2",
				align === "center"
					? "flex-col items-center text-center"
					: "justify-between",
				className,
			)}
		>
			<div
				className={cn(
					"min-w-0",
					align === "center" && "flex flex-col items-center",
				)}
			>
				<p
					className={cn(
						"font-display text-[0.7rem] font-bold uppercase tracking-[0.06em]",
						LABEL_TONE[tone],
					)}
				>
					{label}
				</p>
				<Heading
					id={id}
					className={cn(
						"mt-2 font-display text-[1.375rem] font-extrabold tracking-tight sm:text-2xl lg:text-3xl",
						onDark ? "text-white" : "text-blue-deep",
					)}
				>
					{title}
				</Heading>
			</div>
			{actionSlot}
		</div>
	);
}
