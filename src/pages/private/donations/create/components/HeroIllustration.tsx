import { Heart } from "lucide-react";

export function HeroIllustration() {
	return (
		<div className="relative flex flex-col items-center overflow-hidden pt-6 pb-10 lg:pt-14 lg:pb-14">
			<div className="pointer-events-none absolute inset-0">
				<div className="absolute -left-16 top-6 size-52 rounded-full bg-[#dbe7f6] lg:-left-10 lg:top-0 lg:size-44" />
				<div className="absolute left-8 -top-2 size-28 rounded-full bg-[#a9c8ec] lg:hidden" />
				<div className="absolute -right-20 top-16 size-56 rounded-full bg-[#c4dbf5] lg:-right-10 lg:top-0 lg:size-44" />
				<div className="absolute right-10 top-40 size-20 rounded-full bg-[#fbe0ec] lg:hidden" />

				<div className="hidden lg:block lg:absolute lg:bottom-0 lg:left-10 lg:size-28 lg:rounded-full lg:bg-[#ece3f2]" />
				<div className="hidden lg:block lg:absolute lg:bottom-0 lg:right-10 lg:size-28 lg:rounded-full lg:bg-[#ece3f2]" />
			</div>

			<div className="relative flex items-center justify-center">
				<Heart className="absolute -right-9 -top-3 size-6 text-[#00458b] lg:-right-14 lg:top-0" />
				<Heart className="absolute -left-11 top-9 size-5 text-[#f2579f] lg:-left-16 lg:top-1" />
				<Heart className="absolute -right-11 top-24 size-6 text-[#387ccd] lg:hidden" />

				<div className="flex size-40 items-center justify-center rounded-full bg-[#fbeaf0] lg:size-32">
					<Heart className="size-16 fill-[#f2579f] text-[#f2579f] lg:size-14" />
				</div>
			</div>

			<h1 className="relative mt-6 text-center text-[26px] font-extrabold text-[#0e2a45] lg:mt-8 lg:text-[32px]">
				Iniciar nova doação
			</h1>
			<p className="relative mt-2 max-w-[280px] text-center text-[15px] text-[#6b8faa] lg:max-w-[320px] lg:text-[16px]">
				Você está a um passo de ajudar um bebê que precisa de você.
			</p>
		</div>
	);
}
