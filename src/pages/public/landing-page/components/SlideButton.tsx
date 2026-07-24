import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type SlideButtonProps = {
	label: string;
	onClick?: () => void;
	className?: string;
	pillClassName?: string;
	circleClassName?: string;
};

export function SlideButton({
	label,
	onClick,
	className,
	pillClassName = "bg-white text-[#0a3a87] shadow-lg shadow-[#061f4a]/30",
	circleClassName = "bg-[#0a3a87] text-white",
}: SlideButtonProps) {
	return (
		<button
			type="button"
			onClick={onClick}
			className={cn(
				"group inline-flex h-12 cursor-pointer items-center justify-between gap-3 whitespace-nowrap rounded-full py-1.5 pr-1.5 pl-6 text-[15px] font-semibold transition-colors",
				pillClassName,
				className,
			)}
		>
			{label}
			<span
				className={cn(
					"relative grid size-9 shrink-0 place-items-center overflow-hidden rounded-full",
					circleClassName,
				)}
			>
				<ArrowRight className="size-4 transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-[170%]" />
				<ArrowRight className="absolute size-4 -translate-x-[170%] transition-transform duration-300 ease-out motion-safe:group-hover:translate-x-0" />
			</span>
		</button>
	);
}
