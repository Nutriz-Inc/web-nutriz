type Props = {
	tag: string;
	tagClassName: string;
	quote: string;
	author: string;
};

export function TestimonialEntry({ tag, tagClassName, quote, author }: Props) {
	return (
		<div className="flex flex-col gap-2 border-b border-[#e5ebf3] pb-4 last:border-b-0 last:pb-0 lg:gap-2.5">
			<span
				className={`w-fit rounded-full px-2.5 py-0.5 text-[11px] font-bold lg:px-3 lg:py-1 lg:text-[12px] ${tagClassName}`}
			>
				{tag}
			</span>
			<p className="text-[14px] text-[#33536f] leading-6 lg:text-[15px]">
				“{quote}”
			</p>
			<p className="text-[13px] font-semibold text-[#0e2a45] lg:text-[14px]">
				{author}
			</p>
		</div>
	);
}
