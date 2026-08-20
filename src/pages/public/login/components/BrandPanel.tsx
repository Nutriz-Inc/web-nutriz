import { HeartHandshake, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import Wordmark from "@/assets/images/nutriz-wordmark-white.png";

const DESTAQUES = [
	{
		icon: HeartHandshake,
		title: "Acompanhe cada etapa",
		description:
			"Do exame à análise do leite, tudo registrado no seu histórico.",
	},
	{
		icon: MessageCircle,
		title: "A EVA tira suas dúvidas",
		description: "Assistente da Nutriz, disponível a qualquer hora.",
	},
	{
		icon: ShieldCheck,
		title: "Conteúdo confiável",
		description: "Validado pela Rede Brasileira de Bancos de Leite Humano.",
	},
];

/**
 * Coluna da marca na tela de login. No desktop ocupa a metade esquerda e
 * carrega o discurso; no mobile encolhe para uma faixa de topo com a marca e
 * uma linha so — a pessoa veio para entrar, nao para ler.
 *
 * Usa o mesmo `gradient-blue` e os mesmos ink-blobs do hero da home, para o
 * login parecer a porta de entrada do app e nao uma tela avulsa.
 */
export function BrandPanel() {
	return (
		<aside className="gradient-blue relative isolate overflow-hidden px-6 pb-9 pt-[calc(2rem+env(safe-area-inset-top))] text-white lg:flex lg:w-[52%] lg:shrink-0 lg:flex-col lg:justify-between lg:px-14 lg:py-14">
			<span
				aria-hidden="true"
				className="ink-blob -right-20 -top-24 h-72 w-72 bg-blue-bright/40 blur-3xl"
			/>
			<span
				aria-hidden="true"
				className="ink-blob -bottom-28 -left-16 h-72 w-80 bg-eva/25 blur-3xl"
			/>

			<Link
				to="/"
				className="relative inline-flex w-fit rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-white/50"
				aria-label="Ir para a página inicial"
			>
				<img
					src={Wordmark}
					alt="Nutriz"
					className="h-7 w-auto select-none lg:h-8"
				/>
			</Link>

			<div className="relative mt-7 lg:mt-0">
				<h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-tight sm:text-[32px] lg:text-[44px]">
					Cada gota conta.
					<br />
					<span className="text-blue-tint-2">Continue de onde parou.</span>
				</h1>

				<p className="mt-3 max-w-md text-[14px] leading-relaxed text-blue-tint-2 lg:mt-5 lg:text-[16px]">
					Entre para acompanhar suas doações, agendar a próxima coleta e falar
					com a equipe Lactare.
				</p>

				{/* Só no desktop: no celular isso empurraria o formulário para fora. */}
				<ul className="mt-10 hidden flex-col gap-5 lg:flex">
					{DESTAQUES.map((item) => {
						const Icon = item.icon;

						return (
							<li key={item.title} className="flex gap-4">
								<span
									aria-hidden="true"
									className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white/15"
								>
									<Icon className="size-5" />
								</span>

								<div className="min-w-0">
									<p className="text-[15px] font-bold">{item.title}</p>
									<p className="mt-0.5 text-[14px] leading-[20px] text-blue-tint-2">
										{item.description}
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<p className="relative hidden text-[12px] text-blue-tint-2/80 lg:block">
				© 2026 Nutriz · Lactare
			</p>
		</aside>
	);
}
