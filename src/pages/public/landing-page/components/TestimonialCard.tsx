import { Star } from "lucide-react";
import { getInitials } from "@/components/layout/utils";
import type { Testimonial } from "../mock";

const STARS = ["s1", "s2", "s3", "s4", "s5"];

type TestimonialCardProps = {
	testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
	return (
		<figure className="flex h-full w-full flex-col gap-4 rounded-2xl border border-[#e6ecf5] bg-[#f8fafc] p-7 sm:p-8">
			<figcaption className="flex items-center gap-3">
				<span className="flex size-11 items-center justify-center rounded-full bg-[#387ccd]/15 text-[14px] font-bold text-[#387ccd]">
					{getInitials(testimonial.name)}
				</span>
				<span className="flex flex-col">
					<span className="text-[15px] font-bold text-[#12294d]">
						{testimonial.name}
					</span>
					<span className="text-[12px] text-[#94a3b8]">
						{testimonial.since}
					</span>
				</span>
			</figcaption>

			<div className="flex gap-0.5" role="img" aria-label="5 de 5 estrelas">
				{STARS.map((star) => (
					<Star key={star} className="size-4 fill-[#f5b642] text-[#f5b642]" />
				))}
			</div>

			<blockquote className="text-[15px] leading-relaxed text-[#475569]">
				“{testimonial.text}”
			</blockquote>
		</figure>
	);
}
