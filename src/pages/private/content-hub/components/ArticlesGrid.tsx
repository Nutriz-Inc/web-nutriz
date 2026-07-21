import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import type { Article } from "@/pages/public/articles/data";
import { ArticleGridCard } from "./ArticleGridCard";
import { MoreContentBar } from "./MoreContentBar";

type ArticlesGridProps = {
	articles: Article[];
	onShowAll: () => void;
};

export function ArticlesGrid({ articles, onShowAll }: ArticlesGridProps) {
	return (
		<section className="flex flex-col gap-4">
			<MoreContentBar onShowAll={onShowAll} />

			{articles.length > 0 ? (
				<motion.div
					initial="hidden"
					whileInView="show"
					viewport={viewportOnce}
					variants={staggerContainer}
					className="grid grid-cols-1 gap-4 sm:grid-cols-2"
				>
					{articles.map((article) => (
						<ArticleGridCard key={article.id} article={article} />
					))}
				</motion.div>
			) : (
				<p className="rounded-xl border border-dashed border-[#e4e4e7] bg-white px-4 py-8 text-center text-[13.5px] text-[#71717a]">
					Nenhum conteúdo encontrado para essa busca.
				</p>
			)}
		</section>
	);
}
