import { Clock, Play } from "lucide-react";
import type { Article } from "../data";

type VideoSectionProps = {
	article: Article;
};

export function VideoSection({ article }: VideoSectionProps) {
	return (
		<section className="mt-8">
			<h2 className="flex items-center gap-1.5 text-[12px] font-bold uppercase tracking-wide text-[#0d3b6e]">
				<Play className="size-3.5 fill-[#0d3b6e]" aria-hidden />
				Assista e aprenda
			</h2>

			{article.videoUrl ? (
				<div className="mt-3 aspect-video overflow-hidden rounded-[10px]">
					<iframe
						src={article.videoUrl}
						title={article.videoTitle}
						className="h-full w-full"
						loading="lazy"
						allowFullScreen
					/>
				</div>
			) : (
				<div className="relative mt-3 flex h-[280px] items-center justify-center overflow-hidden rounded-[10px]">
					<img
						src={article.coverImage}
						alt=""
						aria-hidden
						className="absolute inset-0 h-full w-full object-cover brightness-[0.45]"
					/>

					<span className="relative inline-flex items-center gap-1.5 rounded-full bg-black/50 px-3 py-1.5 text-[12px] font-semibold text-white">
						<Clock className="size-3.5" aria-hidden />
						Vídeo em breve
					</span>

					<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/70 to-transparent px-4 pb-3 pt-10">
						<p className="text-[13.5px] font-semibold text-white">
							{article.videoTitle}
						</p>
						<p className="text-[11.5px] text-white/80">
							{article.videoDuration}
						</p>
					</div>
				</div>
			)}
		</section>
	);
}
