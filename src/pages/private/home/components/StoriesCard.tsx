import { ChevronRight, MessageCircleHeart } from "lucide-react";
import { TESTIMONIALS } from "../mock";
import { TestimonialEntry } from "./TestimonialEntry";

export function StoriesCard() {
	return (
		<div className="bg-white flex flex-col gap-5 p-5 rounded-[20px] w-full shadow-[0px_10px_14px_rgba(10,38,77,0.05)] border border-[#e5ebf3] lg:gap-6 lg:rounded-3xl lg:p-7">
			<div className="flex items-center gap-3 lg:gap-4">
				<div className="flex items-center justify-center rounded-2xl size-12 bg-[#fbeaf0] shrink-0 lg:size-14">
					<MessageCircleHeart className="size-5 text-[#f2579f] lg:size-6" />
				</div>
				<div className="flex flex-col">
					<p className="font-semibold text-[#0e2a45] text-[16px] lg:text-[18px]">
						Mural de histórias
					</p>
					<p className="text-[#33536f] text-[13px] lg:text-[14px]">
						Relatos verdadeiros pela equipe Lactário
					</p>
				</div>
			</div>

			<div className="flex flex-col gap-4 lg:gap-5">
				{TESTIMONIALS.map((testimonial) => (
					<TestimonialEntry key={testimonial.author} {...testimonial} />
				))}
			</div>

			<div className="flex flex-col gap-1">
				<button
					type="button"
					className="flex items-center gap-1 text-[13px] font-semibold text-[#00458b] w-fit lg:text-[14px]"
				>
					Ver mais histórias
					<ChevronRight className="size-4" />
				</button>
				<p className="text-[12px] text-[#6b8faa] lg:text-[13px]">
					128 histórias compartilhadas
				</p>
			</div>
		</div>
	);
}
