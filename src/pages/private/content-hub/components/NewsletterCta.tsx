import { Check } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/components/ui/button";

export function NewsletterCta() {
	const [email, setEmail] = useState("");
	const [subscribed, setSubscribed] = useState(false);

	function handleSubmit(e: FormEvent) {
		e.preventDefault();

		if (!email.trim()) {
			return;
		}

		// TODO: integrar newsletter
		setSubscribed(true);
	}

	return (
		<section className="flex flex-col gap-5 rounded-xl bg-[#0d3b6e] p-6 sm:flex-row sm:items-center sm:justify-between sm:gap-8 lg:p-8">
			<div>
				<h2 className="text-[17px] font-bold text-white">
					Receba novos conteúdos por e-mail
				</h2>
				<p className="mt-1 text-[13.5px] text-white/75">
					Dicas de amamentação, doação e cuidados — uma vez por semana, sem
					spam.
				</p>
			</div>

			{subscribed ? (
				<p className="flex min-h-11 items-center gap-2 rounded-lg bg-white/12 px-4 text-[13.5px] font-medium text-white">
					<Check className="size-4" aria-hidden />
					Inscrição confirmada! Fique de olho no seu e-mail.
				</p>
			) : (
				<form
					onSubmit={handleSubmit}
					className="flex w-full flex-col gap-2.5 sm:w-auto sm:flex-row"
				>
					<label htmlFor="newsletter-email" className="sr-only">
						Seu e-mail
					</label>
					<input
						id="newsletter-email"
						type="email"
						required
						value={email}
						onChange={(e) => setEmail(e.target.value)}
						placeholder="seu@email.com"
						className="h-11 w-full rounded-lg bg-white px-4 text-[14px] text-[#09090b] outline-none placeholder:text-[#a1a1aa] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-[240px]"
					/>
					<Button
						type="submit"
						className="h-11 rounded-lg bg-white px-6 text-[14px] font-semibold text-[#0d3b6e] hover:bg-white/90 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
					>
						Assinar
					</Button>
				</form>
			)}
		</section>
	);
}
