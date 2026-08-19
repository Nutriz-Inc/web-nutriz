import { MessageCircle, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";

type GreetingHeroProps = {
	firstName?: string;
	/** Mes/ano em que a doadora entrou (ja formatado) ou `null` se indisponivel. */
	donorSince: string | null;
	/** Volume doado ja formatado, ex.: "1,5 L". */
	milkDonatedLabel: string;
	onNewDonation: () => void;
	onOpenEva: () => void;
};

export function GreetingHero({
	firstName,
	donorSince,
	milkDonatedLabel,
	onNewDonation,
	onOpenEva,
}: GreetingHeroProps) {
	return (
		<section
			aria-labelledby="home-greeting"
			className="rounded-organic gradient-blue relative overflow-hidden p-7 shadow-lift sm:p-11"
		>
			<span
				aria-hidden="true"
				className="ink-blob -right-16 -top-20 h-64 w-64 bg-blue-bright/40 blur-2xl"
			/>
			<span
				aria-hidden="true"
				className="ink-blob -bottom-24 -left-10 h-56 w-72 bg-eva/25 blur-3xl"
			/>

			<div className="relative">
				<p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.22em] text-blue-tint">
					Painel da doadora
				</p>

				<h1
					id="home-greeting"
					className="mt-5 font-display text-[2rem] font-extrabold leading-[1.05] tracking-tight text-white sm:text-5xl"
				>
					Olá{firstName ? `, ${firstName}` : ""}.
					<br />
					<span className="text-blue-tint-2">
						Pronta para a próxima coleta?
					</span>
				</h1>

				<div className="mt-8 flex flex-wrap gap-3">
					<Button
						type="button"
						size="pill"
						onClick={onNewDonation}
						className="bg-surface font-semibold text-blue-deep shadow-soft hover:bg-blue-tint"
					>
						Nova doação
						<Plus />
					</Button>
					<Button
						type="button"
						size="pill"
						variant="ghost"
						onClick={onOpenEva}
						className="border border-blue-tint-2/50 font-semibold text-white hover:bg-white/10 hover:text-white"
					>
						<MessageCircle />
						Falar com a EVA
					</Button>
				</div>

				<hr className="mt-9 border-0 border-t border-blue-tint-2/25" />

				<dl className="mt-5 flex flex-wrap gap-x-10 gap-y-3 text-white">
					<div>
						<dt className="text-[0.7rem] uppercase tracking-[0.16em] text-blue-tint">
							Doadora desde
						</dt>
						{/* TODO: API — sem `created_at` nao ha como datar a entrada da doadora. */}
						<dd className="mt-1 font-display text-base font-bold">
							{donorSince ?? "—"}
						</dd>
					</div>
					<div>
						<dt className="text-[0.7rem] uppercase tracking-[0.16em] text-blue-tint">
							Leite doado
						</dt>
						<dd className="mt-1 font-display text-base font-bold tabular-nums">
							{milkDonatedLabel}
						</dd>
					</div>
				</dl>
			</div>
		</section>
	);
}
