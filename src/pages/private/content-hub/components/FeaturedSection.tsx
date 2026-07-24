import { motion } from "framer-motion";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import type { Article } from "@/pages/public/articles/data";
import { FeaturedMainCard } from "./FeaturedMainCard";
import { FeaturedMediumCard } from "./FeaturedMediumCard";

type FeaturedSectionProps = {
	mainArticle: Article;
	mediumArticles: Article[];
};

export function FeaturedSection({
	mainArticle,
	mediumArticles,
}: FeaturedSectionProps) {
	return (
		<motion.div
			initial="hidden"
			whileInView="show"
			viewport={viewportOnce}
			variants={staggerContainer}
			className="grid gap-5 lg:grid-cols-[1fr_360px]"
		>
			<FeaturedMainCard article={mainArticle} />

			<div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-1">
				{mediumArticles.map((article) => (
					<FeaturedMediumCard key={article.id} article={article} />
				))}
			</div>
		</motion.div>
	);
}
