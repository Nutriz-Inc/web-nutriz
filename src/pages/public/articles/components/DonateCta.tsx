import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function DonateCta() {
	const navigate = useNavigate();

	return (
		<section className="relative isolate flex flex-col gap-6 overflow-hidden rounded-card gradient-blue p-7 text-white sm:p-10 lg:flex-row lg:items-center lg:justify-between lg:p-12">
			<span
				aria-hidden="true"
				className="pointer-events-none absolute -top-24 -right-16 -z-10 size-80 rounded-full bg-white/[0.06] blur-2xl"
			/>
			<div className="flex max-w-[36rem] flex-col gap-2">
				<h2 className="font-display text-titulo font-bold leading-tight tracking-tight lg:text-pagina">
					Seu leite pode ser o primeiro alimento de um prematuro.
				</h2>
				<p className="text-apoio text-white/75 lg:text-corpo">
					Crie sua conta e a equipe do banco de leite agenda cada etapa com
					você.
				</p>
			</div>
			<button
				type="button"
				onClick={() => navigate("/registro")}
				className="group inline-flex h-12 w-fit shrink-0 items-center gap-2 rounded-full bg-white px-6 text-apoio font-semibold text-blue-deep-fill shadow-soft transition-transform duration-150 ease-out active:scale-[0.97]"
			>
				Quero doar
				<ArrowRight
					className="size-4 transition-transform duration-200 ease-out group-hover:translate-x-0.5"
					aria-hidden="true"
				/>
			</button>
		</section>
	);
}
