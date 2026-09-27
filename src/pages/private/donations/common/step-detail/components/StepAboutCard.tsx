type Props = {
	text: string;
};

export function StepAboutCard({ text }: Props) {
	return (
		<section className="flex flex-col gap-3 border-l-2 border-blue-bright py-1 pl-5">
			<p className="text-rotulo font-semibold uppercase tracking-[0.1em] text-ink-3">
				Sobre esta etapa
			</p>
			<p className="text-corpo leading-relaxed text-ink">{text}</p>
		</section>
	);
}
