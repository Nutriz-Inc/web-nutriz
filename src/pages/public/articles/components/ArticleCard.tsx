import { BadgeCheck, Check, Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import type { Article } from "../data";
import { ArticleBlocks } from "./ArticleBlocks";
import { VideoSection } from "./VideoSection";

type ArticleCardProps = {
	article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<div className="rounded-card-sm border border-line bg-surface p-5 shadow-soft sm:p-7">
			<Badge
				bordered
				style={{
					backgroundColor: article.soft,
					borderColor: article.softBorder,
					color: article.accent,
				}}
			>
				{article.category}
			</Badge>

			<h1 className="mt-3 text-secao font-bold leading-[1.25] text-ink">
				{article.title}
			</h1>

			<div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-apoio text-ink-2">
				<span className="flex items-center gap-2 whitespace-nowrap">
					<span
						aria-hidden
						className="flex size-[26px] items-center justify-center rounded-full text-rotulo font-bold"
						style={{ backgroundColor: article.soft, color: article.accent }}
					>
						{article.authorInitials}
					</span>
					<span className="font-semibold text-ink-2">{article.author}</span>
				</span>
				<span className="whitespace-nowrap">· {article.date}</span>
				<span className="whitespace-nowrap">
					· {article.readTimeMinutes} min de leitura
				</span>
				<Badge
					size="sm"
					bordered
					className="border-success-tint bg-success-tint text-teal"
				>
					<BadgeCheck className="size-3.5" aria-hidden />
					Validado por rBLH e Fiocruz
				</Badge>
			</div>

			<img
				src={article.coverImage}
				alt={article.coverAlt}
				width={article.coverWidth}
				height={article.coverHeight}
				className="mt-5 h-[260px] w-full rounded-xl border object-cover"
				style={{ borderColor: article.softBorder }}
			/>

			<section
				aria-label="O que você vai aprender"
				className="mt-5 rounded-xl border p-5"
				style={{
					backgroundColor: article.soft,
					borderColor: article.softBorder,
				}}
			>
				<h2
					className="flex items-center gap-1.5 text-rotulo font-bold uppercase tracking-wide"
					style={{ color: article.accent }}
				>
					<Sparkles className="size-3.5" aria-hidden />O que você vai aprender
				</h2>
				<ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
					{article.takeaways.map((takeaway) => (
						<li
							key={takeaway}
							className="flex items-start gap-2 text-apoio leading-snug text-ink-2"
						>
							<Check
								className="mt-0.5 size-4 shrink-0"
								style={{ color: article.accent }}
								aria-hidden
							/>
							{takeaway}
						</li>
					))}
				</ul>
			</section>

			<ArticleBlocks article={article} />

			<VideoSection article={article} />

			<div className="mt-8 flex items-start gap-3 rounded-xl border border-line bg-surface-2 p-4">
				<span
					aria-hidden
					className="flex size-11 shrink-0 items-center justify-center rounded-full text-apoio font-bold"
					style={{ backgroundColor: article.soft, color: article.accent }}
				>
					{article.authorInitials}
				</span>
				<div>
					<p className="text-apoio font-bold text-ink">{article.author}</p>
					<p className="mt-0.5 text-rotulo leading-relaxed text-ink-2">
						{article.authorBio}
					</p>
				</div>
			</div>
		</div>
	);
}
