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
				aria-label={`Ver vídeo no artigo: ${article.videoTitle}`}
				className="group relative flex h-[160px] cursor-pointer items-center justify-center"
			>
				<img
					src={article.coverImage}
					alt=""
					aria-hidden
					className="absolute inset-0 h-full w-full object-cover brightness-[0.6] transition-transform duration-150 group-hover:scale-105"
				/>

				<span className="absolute left-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/50 px-2 py-1 text-[11px] font-medium text-white">
					<Play className="size-3 fill-white" aria-hidden />
					Vídeo no artigo
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
			</div>
		</motion.div>
	);
}
