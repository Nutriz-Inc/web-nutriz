import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { staggerContainer, viewportOnce } from "@/lib/motion";
import type { Article } from "@/pages/public/articles/data";
import { VideoPreviewCard } from "./VideoPreviewCard";

type FeaturedVideosSectionProps = {
	videos: Article[];
};

export function FeaturedVideosSection({ videos }: FeaturedVideosSectionProps) {
	return (
		<section className="flex flex-col gap-4">
			<div className="flex items-center gap-2">
				<Play className="size-4 fill-[#0d3b6e] text-[#0d3b6e]" aria-hidden />
				<h2 className="text-[15px] font-bold text-[#09090b]">
					Vídeos em destaque
				</h2>
				<span className="hidden text-[13px] text-[#71717a] sm:inline">
					Demonstrações práticas passo a passo
				</span>
			</div>

			<motion.div
				initial="hidden"
				whileInView="show"
				viewport={viewportOnce}
				variants={staggerContainer}
				className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
			>
				{videos.map((article) => (
					<VideoPreviewCard key={article.id} article={article} />
				))}
			</motion.div>
		</section>
	);
}
