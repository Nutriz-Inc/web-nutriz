import { Mail, MessageCircle, X } from "lucide-react";
import { LinkedinIcon } from "@/assets/icons/LinkedinIcon";

const SHARE_OPTIONS = [
	{ label: "Compartilhar no LinkedIn", Icon: LinkedinIcon },
	{ label: "Compartilhar no X", Icon: X },
	{ label: "Compartilhar no WhatsApp", Icon: MessageCircle },
	{ label: "Compartilhar por e-mail", Icon: Mail },
];

export function ShareCard() {
	return (
		<section className="rounded-xl border border-[#e4e4e7] bg-white p-5 shadow-[0_1px_2px_rgba(0,0,0,0.05)]">
			<h2 className="text-[15px] font-bold text-[#09090b]">Compartilhar</h2>
			<div className="mt-3 flex items-center gap-2.5">
				{SHARE_OPTIONS.map(({ label, Icon }) => (
					<button
						key={label}
						type="button"
						aria-label={label}
						// To do: share links
						className="flex size-9 items-center justify-center rounded-full border border-[#e4e4e7] text-[#3f3f46] transition-colors duration-150 hover:bg-[#eef2f7] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3b6e]"
					>
						<Icon className="size-4" />
					</button>
				))}
			</div>
		</section>
	);
}
