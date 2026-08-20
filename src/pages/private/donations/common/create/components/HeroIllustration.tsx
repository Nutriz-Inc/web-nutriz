import { Heart } from "lucide-react";

export function HeroIllustration() {
	return (
		<div className="relative flex flex-col items-center justify-center overflow-hidden pt-6 pb-10 lg:flex-1 lg:pt-12 lg:pb-12">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-16 top-6 size-52 rounded-full bg-blue-tint lg:-left-10 lg:top-0 lg:size-44" />
				<div className="absolute left-8 -top-2 size-28 rounded-full bg-blue-tint-2 lg:hidden" />
				<div className="absolute -right-20 top-16 size-56 rounded-full bg-blue-tint-2 lg:-right-10 lg:top-0 lg:size-44" />
				<div className="absolute right-10 top-40 size-20 rounded-full bg-danger-tint lg:hidden" />

				<div className="hidden lg:block lg:absolute lg:bottom-0 lg:left-10 lg:size-28 lg:rounded-full lg:bg-purple-tint" />
				<div className="hidden lg:block lg:absolute lg:bottom-0 lg:right-10 lg:size-28 lg:rounded-full lg:bg-purple-tint" />
			</div>

			<div className="relative flex items-center justify-center">
				<Heart className="absolute -right-9 -top-3 size-6 text-blue-deep lg:-right-14 lg:top-0" />
				<Heart className="absolute -left-11 top-9 size-5 text-eva lg:-left-16 lg:top-1" />
				<Heart className="absolute -right-11 top-24 size-6 text-blue-bright lg:hidden" />

				<div className="flex size-40 items-center justify-center rounded-full bg-eva-tint lg:size-32">
					<Heart className="size-16 fill-eva text-eva lg:size-14" />
				</div>
			</div>

			<h1 className="relative mt-6 text-center text-[26px] font-extrabold text-ink lg:mt-8 lg:text-[32px]">
				Iniciar nova doação
			</h1>
			<p className="relative mt-2 max-w-[280px] text-center text-[15px] text-ink-2 lg:max-w-[320px] lg:text-[16px]">
				Você está a um passo de ajudar um bebê que precisa de você.
			</p>
		</div>
	);
}
