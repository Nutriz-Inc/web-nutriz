import { Link } from "react-router-dom";
import amamentacao from "@/assets/illustrations/amamentacao.svg";
import cenarioCidade from "@/assets/illustrations/cenario-cidade.svg";
import Wordmark from "@/assets/images/nutriz-wordmark-white.png";
import { WIZARD_STEPS } from "../constants";
import { WizardProgress } from "./WizardProgress";

type RegisterBrandPanelProps = {
	step: number;
	maxVisited: number;
	success: boolean;
	onStepClick: (step: number) => void;
};

/**
 * Coluna da marca do cadastro, irma da tela de login: mesmo `gradient-blue`,
 * mesmos blobs e o mesmo cenario de cidade apagado ao fundo.
 *
 * A diferenca e que aqui ela tambem trabalha — carrega a trilha vertical das
 * etapas, entao a pessoa ve onde esta e o que falta sem que isso ocupe a
 * coluna do formulario. No mobile ela encolhe para uma faixa de topo e quem
 * mostra o progresso e o `Stepper` horizontal, dentro do formulario.
 *
 * A ilustracao fica solta sobre o azul, sem cartao: `amamentacao` foi
 * escolhida entre as opcoes justamente por ler bem em fundo escuro (roupa
 * clara e pele clara ocupam a maior parte do desenho).
 */
export function RegisterBrandPanel({
	step,
	maxVisited,
	success,
	onStepClick,
}: RegisterBrandPanelProps) {
	return (
		<aside className="gradient-blue relative isolate flex flex-col overflow-hidden px-6 pb-8 pt-[calc(2rem+env(safe-area-inset-top))] text-white lg:sticky lg:top-0 lg:h-dvh lg:w-[46%] lg:shrink-0 lg:justify-between lg:px-12 lg:py-12">
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

			<div className="relative mt-6 flex items-end gap-4 lg:mt-8 lg:block">
				<div className="min-w-0 flex-1">
					<h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-tight sm:text-[32px] lg:text-[40px]">
						{success ? (
							<>
								Conta criada.
								<br />
								<span className="text-blue-tint-2">Bem-vinda à Nutriz.</span>
							</>
						) : (
							<>
								Doar leite
								<br />
								<span className="text-blue-tint-2">começa aqui.</span>
							</>
						)}
					</h1>

					<p className="mt-3 max-w-md text-[14px] leading-relaxed text-blue-tint-2 lg:mt-4 lg:text-[16px]">
						{success
							? "Já pode entrar e acompanhar sua primeira doação por aqui."
							: "São quatro etapas rápidas. A equipe Lactare cuida do resto — exames, kit de ordenha e coleta, tudo no seu endereço."}
					</p>
				</div>

				<img
					src={amamentacao}
					alt=""
					aria-hidden="true"
					className="h-20 w-auto shrink-0 select-none drop-shadow-2xl sm:h-24 lg:hidden"
				/>
			</div>

			{/* Desktop: a trilha ocupa o meio da coluna e a ilustracao fecha embaixo. */}
			<div className="relative mt-10 hidden lg:block">
				{success ? (
					<img
						src={amamentacao}
						alt="Ilustração de uma mãe amamentando seu bebê"
						width={402}
						height={607}
						className="mx-auto h-60 w-auto select-none drop-shadow-2xl"
					/>
				) : (
					<WizardProgress
						steps={WIZARD_STEPS}
						current={step}
						maxVisited={maxVisited}
						onStepClick={onStepClick}
					/>
				)}
			</div>

			<div className="relative hidden items-end justify-between gap-6 lg:flex">
				<p className="text-[12px] text-blue-tint-2/80">
					© 2026 Nutriz · Lactare
				</p>

				{!success && (
					<img
						src={amamentacao}
						alt="Ilustração de uma mãe amamentando seu bebê"
						width={402}
						height={607}
						className="h-40 w-auto shrink-0 select-none drop-shadow-2xl xl:h-48"
					/>
				)}
			</div>
		</aside>
	);
}
