import { Droplet, Heart, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import novaDoacao from "@/assets/illustrations/nova-doacao.svg";
import WhatsAppIcon from "@/assets/images/whatsapp-icon.svg";
import { Reveal } from "@/components/full/Reveal";
import { Footer } from "@/components/layout/Footer";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import {
	buildLactareWhatsAppLink,
	EnumWhatsAppLinkContext,
} from "@/utils/whatsapp-link";
import { AttentionNotice } from "./components/AttentionNotice";
import { StepRow } from "./components/StepRow";
import { useCreateDonation } from "./hooks/use-create-donation";

const ETAPAS = [
	{
		title: "Confirmação",
		description: "Você confirma o interesse em fazer uma nova doação.",
		icon: <Heart className="size-5 fill-eva text-eva" />,
		iconBg: "bg-eva-tint",
	},
	{
		title: "Redirecionamento",
		description: "Você é levada ao WhatsApp da equipe Lactare.",
		icon: (
			<img src={WhatsAppIcon} alt="" aria-hidden="true" className="size-5" />
		),
		iconBg: "bg-[#25d366]",
	},
	{
		title: "Triagem e agendamento",
		description: "A equipe faz a triagem inicial e agenda a coleta.",
		icon: <MessageCircle className="size-5 text-blue-deep" />,
		iconBg: "bg-blue-tint",
	},
	{
		title: "Acompanhamento",
		description: "A doação fica registrada aqui para você acompanhar.",
		icon: <Droplet className="size-5 text-eva" />,
		iconBg: "bg-eva-tint",
	},
];

export function NewDonationPage() {
	const navigate = useNavigate();
	const { auth } = useAuth();
	const { createDonationMutation } = useCreateDonation();

	function handleConfirm() {
		createDonationMutation.mutate(undefined, {
			onSuccess: () => {
				window.open(
					buildLactareWhatsAppLink(EnumWhatsAppLinkContext.NewDonation),
					"_blank",
					"noopener",
				);
				navigate("/minhas-doacoes");
			},
		});
	}

	function handleCancel() {
		navigate("/minhas-doacoes");
	}

	const isPending = createDonationMutation.isPending;

	return (
		<Page hasPermission={auth?.type === EnumUserType.Common}>
			{/*
			 * Ponto de confirmacao, nao tela de conteudo: um bloco so, deitado em
			 * duas colunas no desktop (ilustracao a esquerda, fluxo e acoes a
			 * direita). No mobile as duas colunas viram uma pilha.
			 */}
			<Reveal className="mx-auto w-full max-w-[1000px]">
				<section className="rounded-card overflow-hidden border border-line bg-surface shadow-soft lg:grid lg:grid-cols-[minmax(0,42%)_1fr] lg:items-stretch">
					{/*
					 * Painel claro (gradient-milk) e nao o gradiente azul: a
					 * ilustracao da unDraw e escura (#0f1f3d) e sumia sobre o azul.
					 */}
					<div className="gradient-milk relative flex flex-col items-center justify-center overflow-hidden border-b border-line px-6 py-8 text-center lg:border-b-0 lg:border-r lg:px-8 lg:py-12">
						<span
							aria-hidden="true"
							className="ink-blob -right-12 -top-14 h-40 w-40 bg-blue-tint-2/60 blur-2xl"
						/>
						<span
							aria-hidden="true"
							className="ink-blob -bottom-16 -left-8 h-36 w-44 bg-eva-tint/70 blur-3xl"
						/>

						<img
							src={novaDoacao}
							alt=""
							aria-hidden="true"
							width={304}
							height={525}
							className="relative h-32 w-auto select-none sm:h-40 lg:h-56"
						/>

						<h1 className="relative mt-5 font-display text-[22px] font-extrabold tracking-tight text-ink sm:text-[26px] lg:mt-7 lg:text-[28px]">
							Iniciar nova doação
						</h1>
						<p className="relative mx-auto mt-2 max-w-[340px] text-[14px] leading-[20px] text-ink-2 lg:text-[15px] lg:leading-[21px]">
							Você está a um passo de ajudar um bebê que precisa de você.
						</p>
					</div>

					<div className="flex flex-col gap-5 px-5 py-6 sm:px-7 lg:justify-center lg:px-9 lg:py-10">
						<div>
							<p className="font-display text-[0.7rem] font-bold uppercase tracking-[0.06em] text-blue-bright">
								Como funciona
							</p>

							<ol className="mt-4 flex flex-col">
								{ETAPAS.map((etapa, indice) => (
									<StepRow
										key={etapa.title}
										{...etapa}
										isLast={indice === ETAPAS.length - 1}
									/>
								))}
							</ol>
						</div>

						<AttentionNotice />

						{createDonationMutation.isError && (
							<p
								role="alert"
								className="rounded-card-sm bg-danger-tint px-4 py-3 text-center text-[13px] font-medium text-danger"
							>
								Não foi possível iniciar a doação. Tente novamente.
							</p>
						)}

						<div className="pb-safe flex flex-col gap-2.5 sm:flex-row-reverse">
							<Button
								type="button"
								size="pill"
								onClick={handleConfirm}
								disabled={isPending}
								className="w-full bg-blue-deep font-semibold text-white shadow-soft hover:bg-blue sm:flex-1"
							>
								{isPending ? "Confirmando..." : "Confirmar"}
							</Button>

							<Button
								type="button"
								size="pill"
								variant="ghost"
								onClick={handleCancel}
								disabled={isPending}
								className="w-full border border-line font-semibold text-ink-2 hover:bg-blue-tint hover:text-blue-deep sm:flex-1"
							>
								Cancelar
							</Button>
						</div>
					</div>
				</section>
			</Reveal>

			{/* mesmo rodape das outras telas; sangra as gutters do Layout */}
			<div className="-mx-4 -mb-16 mt-12 sm:-mx-6 lg:-mx-10">
				<Footer />
			</div>
		</Page>
	);
}
