import { SectionHeading } from "@/components/full/SectionHeading";
import { INSTITUTIONAL_STORIES, STORIES_TOTAL } from "../content";

export function StoriesBoard() {
	return (
		<section
			aria-labelledby="home-stories"
			className="rounded-card relative overflow-hidden bg-card p-6 shadow-soft sm:p-8 lg:p-10"
		>
			<span
				aria-hidden="true"
				className="ink-blob -left-20 bottom-[-6rem] h-64 w-80 bg-blue-tint blur-3xl"
			/>

			<SectionHeading
				id="home-stories"
				className="relative"
				tone="eva"
				label="Rede de apoio"
				title="Histórias que o seu leite escreve"
			/>

			<hr className="relative mt-7 border-0 border-t border-blue-tint-2/60" />

			<div className="relative divide-y divide-blue-tint-2/60">
				{INSTITUTIONAL_STORIES.map((story) => (
					<blockquote
						key={story.author}
						className="grid gap-3 py-6 sm:grid-cols-[5rem_1fr] sm:gap-4 sm:py-7 lg:grid-cols-[6rem_1fr]"
					>
						<span className="inline-flex h-fit w-fit items-center rounded-full bg-blue-tint px-3 py-1 font-display text-xs font-bold tracking-wider text-blue-deep">
							{story.tag}
						</span>
						<div>
							<p className="font-display text-base leading-relaxed text-blue-deep sm:text-lg">
								“{story.quote}”
							</p>
							<footer className="mt-3 text-xs uppercase tracking-[0.08em] text-ink-2">
								{story.author}
							</footer>
						</div>
					</blockquote>
				))}
			</div>

			<p className="relative text-xs leading-relaxed text-ink-2">
				{STORIES_TOTAL === null ? (
					// Conteudo institucional ilustrativo — ver src/pages/private/home/content.ts
					<>Relatos compartilhados pela rede de bancos de leite humano.</>
				) : (
					<>
						<span className="font-display font-bold text-blue">
							{STORIES_TOTAL}
						</span>{" "}
						histórias compartilhadas pela rede de bancos de leite.
					</>
				)}
			</p>
		</section>
	);
}
