import { Info } from "lucide-react";
import type { Article } from "../data";
import { blockKey, headingId } from "../utils";

type ArticleBlocksProps = {
	article: Article;
};

export function ArticleBlocks({ article }: ArticleBlocksProps) {
	return (
		<div className="flex flex-col">
			{article.blocks.map((block) => {
				if ("h" in block) {
					return (
						<h2
							key={blockKey(block)}
							id={headingId(block.h)}
							tabIndex={-1}
							className="mb-2 mt-[22px] scroll-mt-20 text-[17px] font-bold text-[#09090b] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#0d3b6e]"
						>
							{block.h}
						</h2>
					);
				}

				if ("p" in block) {
					return (
						<p
							key={blockKey(block)}
							className="mt-2 text-[14.5px] leading-[1.7] text-[#3f3f46]"
						>
							{block.p}
						</p>
					);
				}

				if ("list" in block) {
					return (
						<ul
							key={blockKey(block)}
							className="mt-3 flex list-disc flex-col gap-1.5 pl-5 text-[14.5px] leading-[1.7] text-[#3f3f46]"
						>
							{block.list.map((item) => (
								<li key={item}>{item}</li>
							))}
						</ul>
					);
				}

				return (
					<div
						key={blockKey(block)}
						className="mt-4 flex items-start gap-2.5 rounded-[10px] border p-4"
						style={{
							backgroundColor: article.soft,
							borderColor: article.softBorder,
						}}
					>
						<Info
							className="mt-0.5 size-4 shrink-0"
							style={{ color: article.accent }}
							aria-hidden
						/>
						<p className="text-[13.5px] leading-[1.6] text-[#3f3f46]">
							{block.callout}
						</p>
					</div>
				);
			})}
		</div>
	);
}
