import { HeartHandshake, MessageCircle, ShieldCheck } from "lucide-react";
import { Link } from "react-router-dom";
import cenarioCidade from "@/assets/illustrations/cenario-cidade.svg";
import maternidade from "@/assets/illustrations/maternidade.svg";
import Wordmark from "@/assets/images/nutriz-logo-branco.svg";
import { AccessibilityControls } from "@/components/full/AccessibilityControls";

const SELOS = [
	{ icon: HeartHandshake, label: "Doação acompanhada" },
	{ icon: MessageCircle, label: "EVA a qualquer hora" },
	{ icon: ShieldCheck, label: "Conteúdo da rBLH" },
];

/**
 * Coluna da marca na tela de login. No desktop ocupa a metade esquerda e
 * carrega o discurso; no mobile encolhe para uma faixa de topo — a pessoa veio
 * para entrar, nao para ler.
 *
 * Mesmo `gradient-blue` e mesmos ink-blobs do hero da home, para o login
 * parecer a porta de entrada do app e nao uma tela avulsa. As ilustracoes sao
 * unDraw, como o resto do app; elas tem tracos escuros (#2f2e41), entao a
 * principal fica dentro de um cartao claro e o cenario da cidade entra so como
 * textura de fundo, bem apagado.
 */
export function BrandPanel() {
	return (
		<aside className="gradient-blue relative isolate flex flex-col overflow-hidden px-6 pb-9 pt-[calc(2rem+env(safe-area-inset-top))] text-white lg:w-[52%] lg:shrink-0 lg:justify-between lg:px-14 lg:py-12">
			<span
				aria-hidden="true"
				className="ink-blob -right-20 -top-24 h-72 w-72 bg-blue-bright/40 blur-3xl"
			/>
			<span
				aria-hidden="true"
				className="ink-blob -bottom-28 -left-16 h-72 w-80 bg-eva/25 blur-3xl"
			/>

			<img
				src={cenarioCidade}
				alt=""
				aria-hidden="true"
				className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 w-full select-none opacity-[0.14]"
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

			{/* Login e cadastro nao tem cabecalho: sem isto os controles de tema e
			    fonte ficariam fora do alcance justamente nas duas primeiras telas. */}
			<AccessibilityControls
				tom="escuro"
				className="absolute right-6 top-6 z-10"
			/>

			{/*
			 * Texto e ilustracao lado a lado, alinhados pelo centro — no desktop e
			 * no mobile. Antes a imagem ficava embaixo do titulo no desktop, o que
			 * deixava a coluna comprida e vazia no meio.
			 */}
			<div className="relative mt-6 flex items-center gap-5 lg:mt-8 lg:gap-10">
				<div className="min-w-0 flex-1">
					<h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-tight sm:text-[32px] lg:text-[40px]">
						Cada gota conta.
						<br />
						<span className="text-blue-tint-2">Continue de onde parou.</span>
					</h1>

					<p className="mt-3 max-w-md text-[14px] leading-relaxed text-blue-tint-2 lg:mt-4 lg:text-[16px]">
						Entre para acompanhar suas doações, agendar a próxima coleta e falar
						com a equipe Lactare.
					</p>
				</div>

				<img
					src={maternidade}
					alt="Ilustração de uma mãe com seu bebê"
					width={668}
					height={538}
					className="h-24 w-auto shrink-0 select-none drop-shadow-2xl sm:h-32 lg:h-56 xl:h-64"
				/>
			</div>

			<div className="relative mt-8 hidden flex-wrap justify-center gap-2 lg:flex">
				{SELOS.map((selo) => {
					const Icon = selo.icon;

					return (
						<span
							key={selo.label}
							className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3.5 py-1.5 text-[13px] font-semibold text-white"
						>
							<Icon className="size-4 shrink-0" aria-hidden="true" />
							{selo.label}
						</span>
					);
				})}
			</div>

			<p className="relative mt-8 hidden text-[12px] text-blue-tint-2/80 lg:block">
				© 2026 Nutriz · Lactare
			</p>
		</aside>
	);
}
