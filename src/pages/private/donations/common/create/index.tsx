import { Baby, Droplets, HeartHandshake, MessageCircle } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@/assets/images/whatsapp-icon.svg";
import { Reveal } from "@/components/full/Reveal";
import { SectionHeading } from "@/components/full/SectionHeading";
import { Footer } from "@/components/layout/Footer";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import { BABY_ML_PER_DAY } from "@/utils/constants";
import {
	buildLactareWhatsAppLink,
	EnumWhatsAppLinkContext,
} from "@/utils/whatsapp-link";
import { STEP_DEFINITIONS } from "../info/constants";
import { AttentionNotice } from "./components/AttentionNotice";
import { ChecklistItem } from "./components/ChecklistItem";
import { ConfirmActions } from "./components/ConfirmActions";
import { DonationStageCard } from "./components/DonationStageCard";
import { FlowStepCard } from "./components/FlowStepCard";
import { ImpactFact } from "./components/ImpactFact";
import { NewDonationHero } from "./components/NewDonationHero";
import { useCreateDonation } from "./hooks/use-create-donation";

/** Bebes alimentados por um dia com 1 litro, na mesma conta que a home usa. */
const BEBES_POR_LITRO = Math.floor(1000 / BABY_ML_PER_DAY);

const FLUXO = [
	{
		title: "Você confirma",
		description:
			"A doação entra no seu histórico com o status inicial, pronta para ser acompanhada aqui.",
		icon: <HeartHandshake className="size-5 text-eva" />,
		iconClassName: "bg-eva-tint",
	},
	{
		title: "Conversa no WhatsApp",
		description:
			"Abrimos o WhatsApp da equipe Lactare com a mensagem já escrita — é só enviar.",
		icon: (
			<img src={WhatsAppIcon} alt="" aria-hidden="true" className="size-5" />
		),
		iconClassName: "bg-[#25d366]",
	},
	{
		title: "Triagem e agendamento",
		description:
			"A equipe confirma alguns dados de saúde e combina com você a data da primeira visita.",
		icon: <MessageCircle className="size-5 text-blue-deep" />,
		iconClassName: "bg-blue-tint",
	},
];

const CHECKLIST = [
	{
		title: "Documento e cartão do pré-natal por perto",
		description:
			"A equipe pode pedir esses dados durante a triagem pelo WhatsApp.",
	},
	{
		title: "Você não usa medicamento incompatível",
		description:
			"Alguns remédios impedem a doação. Na dúvida, a triagem esclarece — e a EVA também.",
	},
	{
		title: "Um lugar limpo para a ordenha",
		description:
			"O kit de ordenha esterilizado é entregue por nós; você só precisa de uma bancada limpa.",
	},
	{
		title: "Endereço atualizado no perfil",
		description:
			"As visitas de coleta são feitas no endereço cadastrado na sua conta.",
	},
];

const IMPACTO = [
	{
		icon: Baby,
		value: `${BEBES_POR_LITRO} bebês`,
		label: `Alimentados por um dia com 1 litro de leite (${BABY_ML_PER_DAY} ml por bebê).`,
		toneClassName: "bg-eva-tint text-eva",
	},
	{
		icon: Droplets,
		value: "1 ml conta",
		label:
			"Prematuros mamam pouquíssimo por vez: cada mililitro doado vira uma refeição.",
		toneClassName: "bg-blue-tint text-blue-deep",
	},
	{
		icon: HeartHandshake,
		value: "Em casa",
		label:
			"Exames, entrega do kit e coleta acontecem no seu endereço, sem fila e sem custo.",
		toneClassName: "bg-teal-tint text-teal",
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
			<div className="flex flex-col gap-10 sm:gap-14">
				<NewDonationHero
					firstName={auth?.name?.split(" ")[0]}
					isPending={isPending}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
				/>

				<section aria-labelledby="nova-doacao-fluxo">
					<SectionHeading
						id="nova-doacao-fluxo"
						label="Passo a passo"
						title="O que acontece quando você confirma"
					/>
					<hr className="mt-6 border-0 border-t border-blue-tint-2/60" />

					<div className="mt-6 grid gap-4 lg:grid-cols-3">
						{FLUXO.map((passo, indice) => (
							<Reveal
								key={passo.title}
								delay={indice * 0.06}
								className="h-full"
							>
								<FlowStepCard order={indice + 1} {...passo} />
							</Reveal>
						))}
					</div>
				</section>

				<section aria-labelledby="nova-doacao-etapas">
					<SectionHeading
						id="nova-doacao-etapas"
						label="Sua doação"
						title="As quatro etapas que você vai acompanhar"
					/>
					<hr className="mt-6 border-0 border-t border-blue-tint-2/60" />

					<div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
						{STEP_DEFINITIONS.map((etapa, indice) => (
							<Reveal key={etapa.name} delay={indice * 0.06} className="h-full">
								<DonationStageCard step={etapa} />
							</Reveal>
						))}
					</div>
				</section>

				<section aria-labelledby="nova-doacao-impacto">
					<SectionHeading
						id="nova-doacao-impacto"
						label="Por que importa"
						tone="eva"
						title="O tamanho de uma doação"
					/>
					<hr className="mt-6 border-0 border-t border-blue-tint-2/60" />

					<div className="mt-6 grid gap-4 lg:grid-cols-3">
						{IMPACTO.map((fato, indice) => (
							<Reveal key={fato.value} delay={indice * 0.06} className="h-full">
								<ImpactFact {...fato} />
							</Reveal>
						))}
					</div>
				</section>

				<section aria-labelledby="nova-doacao-checklist">
					<SectionHeading
						id="nova-doacao-checklist"
						label="Antes de começar"
						title="Uma conferida rápida"
					/>
					<hr className="mt-6 border-0 border-t border-blue-tint-2/60" />

					<div className="mt-6 grid gap-4 lg:grid-cols-[1fr_auto] lg:items-start lg:gap-6">
						<Reveal>
							<ul className="rounded-card flex flex-col gap-4 border border-line bg-surface p-5 shadow-soft sm:p-6">
								{CHECKLIST.map((item) => (
									<ChecklistItem key={item.title} {...item} />
								))}
							</ul>
						</Reveal>

						<Reveal delay={0.06} className="lg:w-[360px]">
							<AttentionNotice />
						</Reveal>
					</div>
				</section>

				{createDonationMutation.isError && (
					<p
						role="alert"
						className="rounded-card border border-danger/20 bg-danger-tint px-4 py-3 text-center text-[14px] font-medium text-danger"
					>
						Não foi possível iniciar a doação. Tente novamente.
					</p>
				)}

				<ConfirmActions
					isPending={isPending}
					onConfirm={handleConfirm}
					onCancel={handleCancel}
					className="pb-safe"
				/>
			</div>

			{/* mesmo rodape da home; sangra as gutters do Layout como o resto da tela */}
			<div className="-mx-4 -mb-16 mt-12 sm:-mx-6 lg:-mx-10">
				<Footer />
			</div>
		</Page>
	);
}
