import { useReducedMotion } from "@/hooks/use-reduced-motion";
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
			className="rounded-card-sm border border-line bg-surface p-5 shadow-soft"
		>
			<h2 className="text-[15px] font-bold text-ink">Neste artigo</h2>
			<ul className="mt-2 divide-y divide-canvas">
				{headings.map((heading, index) => (
					<li key={heading}>
						<button
							type="button"
							onClick={() => handleClick(heading)}
							className="flex min-h-11 w-full items-center gap-3 py-2.5 text-left transition-colors duration-150 hover:text-blue-deep focus-visible:outline-2 focus-visible:-outline-offset-2 focus-visible:outline-blue-deep"
						>
							<span aria-hidden className="text-[11px] font-bold text-ink-3">
								{String(index + 1).padStart(2, "0")}
							</span>
							<span className="text-[13px] text-ink-2">{heading}</span>
						</button>
					</li>
				))}
			</ul>
		</nav>
	);
}
