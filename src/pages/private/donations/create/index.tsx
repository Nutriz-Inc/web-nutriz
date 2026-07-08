import { Check, Droplet, Heart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import WhatsAppIcon from "@/assets/whatsapp-icon.svg";
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
				navigate("/home");
			},
		});
	}

	function handleCancel() {
		navigate("/home");
	}

	return (
		<Page hasPermission={auth?.type === EnumUserType.Common}>
			<div className="lg:flex lg:min-h-[calc(100vh-69px)] lg:items-center lg:justify-center">
				<div className="-m-5 flex flex-col bg-white lg:m-0 lg:mx-auto lg:grid lg:w-full lg:max-w-[1100px] lg:grid-cols-[500px_1fr] lg:gap-8 lg:bg-transparent lg:py-8">
					<div className="flex flex-col lg:col-start-1 lg:row-start-1 lg:overflow-hidden lg:rounded-3xl lg:bg-white lg:shadow-[0px_16px_40px_rgba(10,41,87,0.07)]">
						<HeroIllustration />

						<div className="hidden flex-col gap-2.5 px-9 pb-9 lg:flex mt-25">
							<button
								type="button"
								onClick={handleConfirm}
								disabled={createDonationMutation.isPending}
								className="flex h-14 w-full items-center justify-center rounded-2xl bg-[#00458b] text-[16px] font-semibold text-white shadow-[0px_6px_9px_rgba(10,41,87,0.2)] transition-transform active:scale-[0.98] disabled:opacity-60"
							>
								{createDonationMutation.isPending
									? "Confirmando..."
									: "Confirmar"}
							</button>

							<button
								type="button"
								onClick={handleCancel}
								disabled={createDonationMutation.isPending}
								className="flex h-12 w-full items-center justify-center rounded-2xl text-[15px] font-medium text-[#9aa8bc] transition-transform active:scale-[0.98] disabled:opacity-60"
							>
								Cancelar
							</button>
						</div>
					</div>

					<div className="flex flex-col gap-6 bg-[#f6f8fd] px-5 pb-6 pt-6 lg:col-start-2 lg:row-start-1 lg:rounded-3xl lg:bg-white lg:p-8 lg:shadow-[0px_16px_40px_rgba(10,41,87,0.07)]">
						<div className="rounded-2xl bg-white p-5 shadow-[0px_14px_18px_rgba(10,38,77,0.08)] lg:rounded-none lg:bg-transparent lg:p-0 lg:shadow-none">
							<p className="text-[18px] font-bold text-[#0e2a45] lg:text-[26px]">
								O que vai acontecer
							</p>

							<div className="my-4 h-px bg-[#e5ebf3] lg:hidden" />

							<div className="flex flex-col lg:pt-4">
								<StepItem
									title="Confirmação"
									icon={
										<Heart className="size-5 fill-[#f2579f] text-[#f2579f] lg:size-6" />
									}
									iconBg="bg-[#fbeaf0]"
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
									icon={<Check className="size-5 text-[#00458b] lg:size-6" />}
									iconBg="bg-[#dbe7f6]"
								>
									A equipe realiza a triagem inicial e agenda a coleta
								</StepItem>

								<StepItem
									title="Acompanhamento"
									icon={<Droplet className="size-5 text-[#f2579f] lg:size-6" />}
									iconBg="bg-[#fbeaf0]"
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

					<div className="sticky bottom-0 flex flex-col gap-3 border-t border-[#e5ebf3] bg-white px-5 pb-6 pt-4 lg:hidden">
						<button
							type="button"
							onClick={handleConfirm}
							disabled={createDonationMutation.isPending}
							className="flex h-14 w-full items-center justify-center rounded-full bg-[#00458b] text-[16px] font-semibold text-white active:scale-[0.98] transition-transform disabled:opacity-60"
						>
							{createDonationMutation.isPending
								? "Confirmando..."
								: "Confirmar"}
						</button>

						<button
							type="button"
							onClick={handleCancel}
							disabled={createDonationMutation.isPending}
							className="flex h-14 w-full items-center justify-center rounded-full border-[1.5px] border-[#e5ebf3] text-[16px] font-semibold text-[#6b8faa] active:scale-[0.98] transition-transform disabled:opacity-60"
						>
							Cancelar
						</button>
					</div>
				</div>
			</div>
		</Page>
	);
}
