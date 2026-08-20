import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { useId } from "react";
import type { FaqItem as FaqItemData } from "../constants";

type FaqItemProps = {
	item: FaqItemData;
	open: boolean;
	onToggle: () => void;
};

export function FaqItem({ item, open, onToggle }: FaqItemProps) {
	const shouldReduceMotion = useReducedMotion();
	const panelId = useId();

	return (
		<div className="border-b border-canvas last:border-b-0">
			<h3>
				<button
					type="button"
					onClick={onToggle}
					aria-expanded={open}
					aria-controls={panelId}
					className="flex min-h-11 w-full items-center justify-between gap-3 py-3 text-left text-[13px] font-medium text-ink transition-colors duration-150 hover:text-blue-deep focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-deep"
				>
					{item.question}
					<ChevronDown
						aria-hidden
						className={`size-4 shrink-0 text-ink-2 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
					/>
				</button>
			</h3>

			<AnimatePresence initial={false}>
				{open && (
					<motion.div
						id={panelId}
						key="content"
						initial={shouldReduceMotion ? false : { height: 0, opacity: 0 }}
						animate={{ height: "auto", opacity: 1 }}
						exit={shouldReduceMotion ? undefined : { height: 0, opacity: 0 }}
						transition={{ duration: 0.2, ease: "easeOut" }}
						className="overflow-hidden"
					>
						<p className="pb-3 text-[13px] leading-relaxed text-ink-2">
							{item.answer}
						</p>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
