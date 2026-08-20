import { ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

import { cn } from "@/lib/utils";
import type { BreadcrumbItem } from "@/utils/breadcrumb";

type BreadcrumbProps = {
	items: BreadcrumbItem[];
	className?: string;
};

/**
 * Trilha da tela atual, acima do titulo. O ultimo item nunca e link e leva
 * `aria-current="page"`. Ver docs/design-system.md.
 */
export function Breadcrumb({ items, className }: BreadcrumbProps) {
	if (items.length < 2) {
		return null;
	}

	return (
		<nav aria-label="Você está aqui" className={cn("mb-3", className)}>
			<ol className="flex flex-wrap items-center gap-1 text-[12px]">
				{items.map((item, indice) => {
					const ultimo = indice === items.length - 1;

					return (
						<li key={item.label} className="flex items-center gap-1">
							{indice > 0 && (
								<ChevronRight
									className="size-3.5 shrink-0 text-ink-3"
									aria-hidden="true"
								/>
							)}

							{ultimo || !item.to ? (
								<span
									aria-current={ultimo ? "page" : undefined}
									className="font-semibold text-ink-2"
								>
									{item.label}
								</span>
							) : (
								<Link
									to={item.to}
									className="rounded text-ink-3 underline-offset-2 outline-none transition-colors hover:text-blue-deep hover:underline focus-visible:ring-3 focus-visible:ring-blue-bright/50"
								>
									{item.label}
								</Link>
							)}
						</li>
					);
				})}
			</ol>
		</nav>
	);
}
