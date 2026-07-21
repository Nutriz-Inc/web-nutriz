import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import type { Article } from "@/pages/public/articles/data";
import { ArticleGridCard } from "./ArticleGridCard";
import { MoreContentBar } from "./MoreContentBar";

type ArticlesGridProps = {
	articles: Article[];
};

export function ArticlesGrid({ articles }: ArticlesGridProps) {
	return (
		<section className="flex flex-col gap-4">
			<MoreContentBar />

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
		</section>
	);
}
