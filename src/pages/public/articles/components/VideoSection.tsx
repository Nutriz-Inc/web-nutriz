import { Play } from "lucide-react";
import type { Article } from "../data";

type VideoSectionProps = {
	article: Article;
};

export function VideoSection({ article }: VideoSectionProps) {
	return (
		<section aria-labelledby="video-do-artigo" className="flex flex-col gap-4">
			<div className="flex items-baseline justify-between gap-4">
				<h2
					id="video-do-artigo"
					className="text-rotulo font-semibold uppercase tracking-[0.14em] text-ink-3"
				>
					Em vídeo
				</h2>
				<span className="text-rotulo tabular-nums text-ink-3">
					{article.videoDuration}
				</span>
			</div>

			{article.videoUrl ? (
				<div className="aspect-video overflow-hidden rounded-card bg-surface-3">
					<iframe
						src={article.videoUrl}
						title={article.videoTitle}
						className="h-full w-full"
						loading="lazy"
						allowFullScreen
					/>
				</div>
			) : (
				<div className="group relative isolate flex aspect-video items-end overflow-hidden rounded-card bg-blue-deep-fill">
					<img
						src={article.coverImage}
						alt=""
						aria-hidden="true"
						className="absolute inset-0 -z-10 h-full w-full object-cover opacity-45 mix-blend-luminosity transition-transform duration-700 ease-out group-hover:scale-[1.03]"
					/>
					<div className="absolute inset-0 -z-10 bg-gradient-to-t from-blue-deep-fill via-blue-deep-fill/40 to-transparent" />
					<div className="flex w-full items-end justify-between gap-4 p-5 sm:p-7">
						<div className="flex flex-col gap-1">
							<p className="text-rotulo font-semibold uppercase tracking-[0.14em] text-white/65">
								Em breve
							</p>
							<p className="max-w-[28ch] font-display text-destaque font-bold leading-snug text-white sm:text-secao">
								{article.videoTitle}
							</p>
						</div>
						<span
							aria-hidden="true"
							className="flex size-14 shrink-0 items-center justify-center rounded-full bg-white/15 text-white ring-1 ring-white/25 backdrop-blur-sm"
						>
							<Play className="size-5 translate-x-px fill-current" />
						</span>
					</div>
				</div>
			)}
		</section>
	);
}
