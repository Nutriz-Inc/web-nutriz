import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function DonateCta() {
	const navigate = useNavigate();

	return (
		<section className="rounded-xl bg-blue-deep p-5 shadow-soft">
			<h2 className="text-[15px] font-bold text-white">Pronta para doar?</h2>
			<p className="mt-1.5 text-[13px] leading-relaxed text-white/75">
				Crie sua conta e comece a ajudar bebês que precisam de leite materno.
			</p>
			<Button
				onClick={() => navigate("/registro")}
				className="mt-4 h-11 w-full rounded-lg bg-white text-[14px] font-semibold text-blue-deep hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
			>
				Quero doar
				<ArrowRight className="size-4" aria-hidden />
			</Button>
		</section>
	);
}
