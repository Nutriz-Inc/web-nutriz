import { BadgeCheck, Check, Sparkles } from "lucide-react";
import type { Article } from "@/data/articles";
import { ArticleBlocks } from "./ArticleBlocks";
import { VideoSection } from "./VideoSection";

type ArticleCardProps = {
	article: Article;
};

export function ArticleCard({ article }: ArticleCardProps) {
	return (
		<div className="rounded-xl border border-[#e4e4e7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)] sm:p-7">
			<span
				className="inline-flex rounded-full border px-3 py-1 text-[12px] font-semibold"
				style={{
					backgroundColor: article.soft,
					borderColor: article.softBorder,
					color: article.accent,
				}}
			>
				{article.category}
			</span>

			<h1 className="mt-3 text-[26px] font-bold leading-[1.25] text-[#09090b]">
				{article.title}
			</h1>

			<div className="mt-3 flex flex-wrap items-center gap-x-2 gap-y-2 text-[13px] text-[#71717a]">
				<span className="flex items-center gap-2 whitespace-nowrap">
					<span
						aria-hidden
						className="flex size-[26px] items-center justify-center rounded-full text-[10px] font-bold"
						style={{ backgroundColor: article.soft, color: article.accent }}
					>
						{article.authorInitials}
					</span>
					<span className="font-semibold text-[#3f3f46]">{article.author}</span>
				</span>
				<span className="whitespace-nowrap">· {article.date}</span>
				<span className="whitespace-nowrap">
					· {article.readTimeMinutes} min de leitura
				</span>
				<span className="inline-flex items-center gap-1 whitespace-nowrap rounded-full border border-[#a7f3d0] bg-[#ecfdf5] px-2.5 py-0.5 text-[11.5px] font-semibold text-[#059669]">
					<BadgeCheck className="size-3.5" aria-hidden />
					Validado por rBLH e Fiocruz
				</span>
			</div>

			{/* To do: substituir o placeholder pela imagem de capa real do artigo */}
			<div
				className="mt-5 flex h-[260px] items-center justify-center rounded-[10px] border"
				style={{
					backgroundColor: article.soft,
					borderColor: article.softBorder,
				}}
				role="img"
				aria-label={`Imagem de capa do artigo ${article.title}`}
			>
				<span className="text-[13px]" style={{ color: article.accent }}>
					Imagem de capa do artigo
				</span>
			</div>

			<section
				aria-label="O que você vai aprender"
				className="mt-5 rounded-[10px] border p-5"
				style={{
					backgroundColor: article.soft,
					borderColor: article.softBorder,
				}}
			>
				<h2
					className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide"
					style={{ color: article.accent }}
				>
					<Sparkles className="size-3.5" aria-hidden />O que você vai aprender
				</h2>
				<ul className="mt-3 grid gap-x-6 gap-y-2 sm:grid-cols-2">
					{article.takeaways.map((takeaway) => (
						<li
							key={takeaway}
							className="flex items-start gap-2 text-[13.5px] leading-snug text-[#3f3f46]"
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

			<div className="mt-8 flex items-start gap-3 rounded-[10px] border border-[#e4e4e7] bg-[#fafafa] p-4">
				<span
					aria-hidden
					className="flex size-11 shrink-0 items-center justify-center rounded-full text-[13px] font-bold"
					style={{ backgroundColor: article.soft, color: article.accent }}
				>
					{article.authorInitials}
				</span>
				<div>
					<p className="text-[14px] font-bold text-[#09090b]">
						{article.author}
					</p>
					<p className="mt-0.5 text-[12.5px] leading-relaxed text-[#71717a]">
						{article.authorBio}
					</p>
				</div>
			</div>
		</div>
	);
}
