import { Play } from "lucide-react";
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

			{/* To do: substituir o player mockado pelo vídeo real */}
			<div className="relative mt-3 flex h-[280px] items-center justify-center overflow-hidden rounded-[10px] bg-[#0d3b6e]">
				<button
					type="button"
					aria-label={`Reproduzir vídeo: ${article.videoTitle}`}
					className="flex size-16 items-center justify-center rounded-full bg-[rgba(13,59,110,0.9)] ring-1 ring-white/40 transition-transform duration-150 hover:scale-105 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<Play className="ml-1 size-6 fill-white text-white" aria-hidden />
				</button>

				<div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent px-4 pb-3 pt-10">
					<p className="text-[13.5px] font-semibold text-white">
						{article.videoTitle}
					</p>
					<p className="text-[11.5px] text-white/80">
						{article.videoDuration} · Canal rBLH Brasil
					</p>
				</div>
			</div>
		</section>
	);
}
