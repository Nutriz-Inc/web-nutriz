import { motion, useReducedMotion } from "framer-motion";
import { Heart, MessageCircle, Sparkles } from "lucide-react";
import novaDoacao from "@/assets/illustrations/nova-doacao.svg";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

type NewDonationHeroProps = {
	firstName?: string;
	isPending: boolean;
	onConfirm: () => void;
	onCancel: () => void;
};

/**
 * Abertura da tela de nova doacao, no mesmo molde do hero da home
 * (`gradient-blue` + blobs + acoes em pilula): a pessoa entende de cara o que
 * o botao faz e ja pode confirmar sem rolar a pagina.
 */
export function NewDonationHero({
	firstName,
	isPending,
	onConfirm,
	onCancel,
}: NewDonationHeroProps) {
	const reduzirMovimento = useReducedMotion();

	const flutuar = reduzirMovimento
		? {}
		: {
				animate: { y: [0, -10, 0] },
				transition: {
					duration: 5,
					repeat: Number.POSITIVE_INFINITY,
					ease: "easeInOut" as const,
				},
			};

	return (
		<section
			aria-labelledby="nova-doacao-titulo"
			className="rounded-card gradient-blue relative overflow-hidden p-6 shadow-lift sm:p-9 lg:p-11"
		>
			<span
				aria-hidden="true"
				className="ink-blob -right-16 -top-20 h-64 w-64 bg-blue-bright/40 blur-2xl"
			/>
			<span
				aria-hidden="true"
				className="ink-blob -bottom-24 -left-10 h-56 w-72 bg-eva/25 blur-3xl"
			/>

			<div className="relative flex flex-col gap-8 lg:flex-row lg:items-center lg:gap-12">
				<div className="min-w-0 flex-1">
					<p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.06em] text-blue-tint">
						Nova doação
					</p>

					<h1
						id="nova-doacao-titulo"
						className="mt-4 font-display text-[1.75rem] font-extrabold leading-[1.08] tracking-tight text-white sm:text-4xl lg:text-[2.75rem]"
					>
						{firstName ? `${firstName}, você está` : "Você está"} a um passo
						<br />
						<span className="text-blue-tint-2">de alimentar um bebê.</span>
					</h1>

					<p className="mt-4 max-w-lg text-[15px] leading-relaxed text-blue-tint-2 sm:text-[16px]">
						Ao confirmar, a equipe Lactare recebe seu contato pelo WhatsApp, faz
						a triagem e combina com você a data da primeira visita. Sua doação
						já fica registrada aqui para você acompanhar cada etapa.
					</p>

					<div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
						<Button
							type="button"
							size="pill"
							onClick={onConfirm}
							disabled={isPending}
							className="w-full bg-surface font-semibold text-blue-deep shadow-soft hover:bg-blue-tint sm:w-auto"
						>
							{isPending ? "Confirmando..." : "Quero doar agora"}
							<Heart className="fill-eva text-eva" />
						</Button>

						<Button
							type="button"
							size="pill"
							variant="ghost"
							onClick={onCancel}
							disabled={isPending}
							className="w-full border border-blue-tint-2/50 font-semibold text-white hover:bg-white/10 hover:text-white sm:w-auto"
						>
							Agora não
						</Button>
					</div>

					<div className="mt-7 flex flex-wrap gap-2">
						<Badge size="md" className="bg-white/15 text-white">
							<MessageCircle className="size-3.5" aria-hidden="true" />
							Leva menos de 1 minuto
						</Badge>
						<Badge size="md" className="bg-white/15 text-white">
							<Sparkles className="size-3.5" aria-hidden="true" />
							Sem compromisso: dá para desistir depois
						</Badge>
					</div>
				</div>

				<motion.img
					{...flutuar}
					src={novaDoacao}
					alt=""
					aria-hidden="true"
					width={320}
					height={280}
					className="mx-auto hidden h-52 w-auto shrink-0 select-none drop-shadow-2xl sm:block lg:h-64"
				/>
			</div>
		</section>
	);
}
