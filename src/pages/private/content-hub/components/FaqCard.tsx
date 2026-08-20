import { HelpCircle } from "lucide-react";
import { useState } from "react";
import { FAQ_ITEMS } from "../constants";
import { FaqItem } from "./FaqItem";

export function FaqCard() {
	const [openIndex, setOpenIndex] = useState<number | null>(0);

	return (
		<section className="rounded-card-sm border border-line bg-white p-5 shadow-soft">
			<h2 className="flex items-center gap-2 text-[15px] font-bold text-ink">
				<HelpCircle className="size-4 text-blue-deep" aria-hidden />
				Dúvidas frequentes
			</h2>

			<div className="mt-2">
				{FAQ_ITEMS.map((item, index) => (
					<FaqItem
						key={item.question}
						item={item}
						open={openIndex === index}
						onToggle={() =>
							setOpenIndex((current) => (current === index ? null : index))
						}
					/>
				))}
			</div>
		</section>
	);
}
