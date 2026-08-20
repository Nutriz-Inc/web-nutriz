import { Check, Droplet, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@/assets/images/whatsapp-icon.svg";
import { Page } from "@/components/layout/Page";
import { useAuth } from "@/hooks/use-auth";
import { EnumUserType } from "@/services/types/i-user";
import {
	buildLactareWhatsAppLink,
	EnumWhatsAppLinkContext,
} from "@/utils/whatsapp-link";
import { AttentionNotice } from "./components/AttentionNotice";
import { HeroIllustration } from "./components/HeroIllustration";
import { StepItem } from "./components/StepItem";
import { useCreateDonation } from "./hooks/use-create-donation";

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

	return (
		<Page hasPermission={auth?.type === EnumUserType.Common}>
			<div className="lg:flex lg:min-h-[calc(100vh-69px)] lg:items-center lg:justify-center">
				<div className="-mx-4 -mt-4 -mb-16 sm:-mx-6 sm:-mt-6 flex flex-col bg-white lg:m-0 lg:mx-auto lg:grid lg:w-full lg:max-w-[1100px] lg:grid-cols-[500px_1fr] lg:gap-8 lg:bg-transparent lg:py-8">
					<div className="flex flex-col lg:col-start-1 lg:row-start-1 lg:overflow-hidden lg:rounded-3xl lg:bg-white lg:shadow-lift">
						<HeroIllustration />

						<div className="hidden flex-col gap-2.5 px-9 pb-9 lg:flex mt-25">
							<button
								type="button"
								onClick={handleConfirm}
								disabled={createDonationMutation.isPending}
								className="flex h-11 w-full items-center justify-center rounded-full bg-blue-deep hover:bg-blue text-[16px] font-semibold text-white shadow-soft transition-transform active:scale-[0.98] disabled:opacity-60"
							>
								{createDonationMutation.isPending
									? "Confirmando..."
									: "Confirmar"}
							</button>

							<button
								type="button"
								onClick={handleCancel}
								disabled={createDonationMutation.isPending}
								className="flex h-12 w-full items-center justify-center rounded-2xl text-[15px] font-medium text-ink-3 transition-transform active:scale-[0.98] disabled:opacity-60"
							>
								Cancelar
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-6 bg-surface-2 px-5 pb-6 pt-6 lg:col-start-2 lg:row-start-1 lg:rounded-3xl lg:bg-white lg:p-8 lg:shadow-lift">
						<div className="rounded-2xl bg-white p-5 shadow-soft lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none">
							<p className="text-[18px] font-bold text-ink lg:text-[26px]">
								O que vai acontecer
							</p>

							<div className="my-4 h-px bg-blue-tint lg:hidden" />

							<div className="flex flex-col lg:pt-4">
								<StepItem
									title="Confirmação"
									icon={
										<Heart className="size-5 fill-eva text-eva lg:size-6" />
									}
									iconBg="bg-eva-tint"
								>
									Você confirma o interesse em fazer uma nova doação
								</StepItem>

								<StepItem
									title="Redirecionamento"
									icon={
										<img
											src={WhatsAppIcon}
											alt="WhatsApp"
											className="size-5 lg:size-6"
										/>
									}
									iconBg="bg-[#25d366]"
								>
									Você é redirecionada para o WhatsApp da equipe Lactare
								</StepItem>

								<StepItem
									title="Triagem e agendamento"
									icon={<Check className="size-5 text-blue-deep lg:size-6" />}
									iconBg="bg-blue-tint"
								>
									A equipe realiza a triagem inicial e agenda a coleta
								</StepItem>

								<StepItem
									title="Acompanhamento"
									icon={<Droplet className="size-5 text-eva lg:size-6" />}
									iconBg="bg-eva-tint"
									isLast
								>
									Sua doação é registrada e acompanhada aqui no sistema
								</StepItem>
							</div>
						</div>

						<AttentionNotice />

						{createDonationMutation.isError && (
							<p className="text-center text-[13px] font-medium text-destructive">
								Não foi possível iniciar a doação. Tente novamente.
							</p>
						)}
					</div>

					<div className="sticky bottom-0 flex flex-col gap-3 border-t border-line bg-white px-5 pb-6 pt-4 lg:hidden">
						<button
							type="button"
							onClick={handleConfirm}
							disabled={createDonationMutation.isPending}
							className="flex h-11 w-full items-center justify-center rounded-full bg-blue-deep hover:bg-blue text-[16px] font-semibold text-white active:scale-[0.98] transition-transform disabled:opacity-60"
						>
							{createDonationMutation.isPending
								? "Confirmando..."
								: "Confirmar"}
						</button>

						<button
							type="button"
							onClick={handleCancel}
							disabled={createDonationMutation.isPending}
							className="flex h-14 w-full items-center justify-center rounded-full border-[1.5px] border-line text-[16px] font-semibold text-ink-2 active:scale-[0.98] transition-transform disabled:opacity-60"
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</Page>
	);
}
