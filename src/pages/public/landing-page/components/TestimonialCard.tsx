import { Star } from "lucide-react";
import { getInitials } from "@/components/layout/utils";
import type { Testimonial } from "../mock";

const STARS = ["s1", "s2", "s3", "s4", "s5"];

type TestimonialCardProps = {
	testimonial: Testimonial;
};

export function TestimonialCard({ testimonial }: TestimonialCardProps) {
	return (
		<figure className="rounded-card flex h-full w-full flex-col gap-4 border border-line bg-surface-2 p-7 sm:p-8">
			<figcaption className="flex items-center gap-3">
				<span className="flex size-11 items-center justify-center rounded-full bg-blue-bright/15 text-[14px] font-bold text-blue-bright">
					{getInitials(testimonial.name)}
				</span>
				<span className="flex flex-col">
					<span className="font-display text-[15px] font-bold text-ink">
						{testimonial.name}
					</span>
					<span className="text-[12px] text-ink-3">{testimonial.since}</span>
				</span>
			</figcaption>

			<div className="flex gap-0.5" role="img" aria-label="5 de 5 estrelas">
				{STARS.map((star) => (
					<Star key={star} className="size-4 fill-amber text-warning" />
				))}
			</div>

			<blockquote className="text-[15px] leading-relaxed text-ink-2">
				“{testimonial.text}”
			</blockquote>
		</figure>
	);
}
