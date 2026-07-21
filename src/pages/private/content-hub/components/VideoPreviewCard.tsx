import { motion } from "framer-motion";
import { Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Article } from "@/pages/public/articles/data";

type VideoPreviewCardProps = {
	article: Article;
};

export function VideoPreviewCard({ article }: VideoPreviewCardProps) {
	const navigate = useNavigate();

	function goToArticle() {
		navigate(`/artigos?a=${article.id}`);
	}

	return (
		<motion.div
			whileHover={{ y: -3 }}
			transition={{ type: "spring", stiffness: 300, damping: 22 }}
			className="flex flex-col overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-[0_1px_2px_rgba(0,0,0,0.05)]"
		>
			<button
				type="button"
				onClick={goToArticle}
				aria-label={`Assistir: ${article.videoTitle}`}
				className="group relative flex h-[160px] cursor-pointer items-center justify-center bg-[#0d3b6e]"
			>
				<span className="flex size-12 items-center justify-center rounded-full bg-[rgba(13,59,110,0.9)] ring-1 ring-white/40 transition-transform duration-150 group-hover:scale-105">
					<Play className="ml-0.5 size-5 fill-white text-white" aria-hidden />
				</span>

				<span className="absolute right-3 top-3 rounded bg-black/50 px-1.5 py-0.5 text-[11px] font-medium text-white">
					{article.videoDuration}
				</span>
			</button>

			<div className="flex flex-col gap-1 p-4">
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
				<button
					type="button"
					onClick={goToArticle}
					className="text-left text-[14px] font-bold leading-snug text-[#09090b]"
				>
					{article.videoTitle}
				</button>
				<span className="text-[11.5px] text-[#71717a]">
					Canal rBLH Brasil · dentro do artigo
				</span>
			</div>
		</motion.div>
	);
}
