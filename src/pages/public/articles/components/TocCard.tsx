import { useReducedMotion } from "framer-motion";
import type { Article } from "../data";
import { getHeadings, headingId } from "../utils";

type TocCardProps = {
	article: Article;
};

export function TocCard({ article }: TocCardProps) {
	const shouldReduceMotion = useReducedMotion();
	const headings = getHeadings(article);

	function handleClick(heading: string) {
		const element = document.getElementById(headingId(heading));

		if (!element) {
			return;
		}

		element.scrollIntoView({
			behavior: shouldReduceMotion ? "auto" : "smooth",
			block: "start",
		});
		element.focus({ preventScroll: true });
	}

	return (
		<nav
			aria-label="Neste artigo"
			className="rounded-xl border border-[#e4e4e7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
		>
			<h2 className="text-[15px] font-bold text-[#09090b]">Neste artigo</h2>
			<ul className="mt-2 divide-y divide-[#f4f4f5]">
				{headings.map((heading, index) => (
					<li key={heading}>
						<button
							type="button"
							onClick={() => handleClick(heading)}
							className="flex min-h-11 w-full items-center gap-3 py-2.5 text-left transition-colors duration-150 hover:text-[#0d3b6e] focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-[#0d3b6e]"
						>
							<span
								aria-hidden
								className="text-[11px] font-bold text-[#a1a1aa]"
							>
								{String(index + 1).padStart(2, "0")}
							</span>
							<span className="text-[13px] text-[#3f3f46]">{heading}</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
