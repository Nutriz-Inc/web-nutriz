import { ArrowRight, HeartHandshake } from "lucide-react";

type ConviteParaDoarProps = {
	onDoar: () => void;
};

export function ConviteParaDoar({ onDoar }: ConviteParaDoarProps) {
	return (
		<button
			type="button"
			onClick={onDoar}
			className="group relative isolate flex w-full flex-col justify-between gap-8 overflow-hidden rounded-card gradient-blue p-6 text-left text-white shadow-lift transition-transform duration-200 ease-out hover:-translate-y-0.5 active:scale-[0.99] sm:p-8 lg:p-10"
		>
			<HeartHandshake
				aria-hidden="true"
				strokeWidth={1.1}
				className="pointer-events-none absolute -right-8 -bottom-12 -z-10 size-60 text-white/[0.07] transition-transform duration-500 ease-out group-hover:-rotate-6 lg:size-72"
			/>
			<div className="flex max-w-[30rem] flex-col gap-2">
				<p className="text-rotulo font-semibold uppercase tracking-[0.12em] text-white/65">
					Nenhuma doação em andamento
				</p>
				<p className="font-display text-titulo font-bold leading-tight tracking-tight lg:text-pagina">
					Pronta para doar de novo?
				</p>
				<p className="text-apoio text-white/75 lg:text-corpo">
					Abra uma nova doação e a equipe agenda cada etapa com você.
				</p>
			</div>
			<span className="inline-flex w-fit items-center gap-2 rounded-full bg-white px-4 py-2 text-apoio font-semibold text-blue-deep-fill shadow-soft">
				Nova doação
				<ArrowRight
					className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
					aria-hidden="true"
				/>
			</span>
		</button>
	);
}
