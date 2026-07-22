import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import type { Article } from "@/pages/public/articles/data";
import { ArticleCover } from "./ArticleCover";

type FeaturedMediumCardProps = {
	article: Article;
};

export function FeaturedMediumCard({ article }: FeaturedMediumCardProps) {
	const navigate = useNavigate();

	return (
		<motion.article
			whileHover={{ y: -4 }}
			transition={{ type: "spring", stiffness: 300, damping: 22 }}
			onClick={() => navigate(`/artigos?a=${article.id}`)}
			className="flex cursor-pointer flex-col overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
		>
			<ArticleCover article={article} className="h-[100px]" />

			<div className="flex flex-col gap-2 p-4">
				<span
					className="w-fit rounded-full border px-2 py-0.5 text-[10.5px] font-semibold"
					style={{
						backgroundColor: article.soft,
						borderColor: article.softBorder,
						color: article.accent,
					}}
				>
					{article.category}
				</span>

				<h3 className="text-[14.5px] font-bold leading-snug text-[#09090b]">
					{article.title}
				</h3>

				<span className="text-[11.5px] text-[#71717a]">
					{article.readTimeMinutes} min de leitura
				</span>
			</div>
		</motion.article>
	);
}
