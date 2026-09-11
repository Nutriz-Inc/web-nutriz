import { Home, MessageCircleHeart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import naoEncontrado from "@/assets/illustrations/nada-por-aqui.svg";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { openEva } from "@/pages/private/eva/widget/eva-widget-bus";
import { useEvaAccess } from "@/pages/private/eva/widget/use-eva-access";

export function NotFoundScreen() {
	const navigate = useNavigate();
	const { allowed: temEva } = useEvaAccess();

	return (
		<Page>
			<div className="mx-auto flex min-h-[60vh] w-full max-w-[520px] flex-col items-center justify-center gap-6 px-4 text-center">
				<img
					src={naoEncontrado}
					alt=""
					aria-hidden="true"
					width={320}
					height={200}
					className="h-40 w-auto max-w-full select-none object-contain sm:h-48"
				/>

				<div className="flex flex-col gap-2">
					<h1 className="font-display text-[26px] font-extrabold leading-tight tracking-tight text-blue-deep sm:text-[32px]">
						Não encontramos esta página
					</h1>
					<p className="text-[15px] leading-relaxed text-ink-2">
						O endereço pode ter mudado de lugar ou nunca ter existido. Nada de
						errado com você — vamos te levar de volta.
					</p>
				</div>

				<div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
					<Button
						type="button"
						variant="primary"
						size="pill"
						onClick={() => navigate("/")}
						className="w-full sm:w-auto"
					>
						<Home aria-hidden="true" />
						Voltar ao início
					</Button>

					{temEva && (
						<Button
							type="button"
							variant="neutral"
							size="pill"
							onClick={() => openEva()}
							className="w-full sm:w-auto"
						>
							<MessageCircleHeart aria-hidden="true" />
							Falar com a EVA
						</Button>
					)}
				</div>
			</div>
		</Page>
	);
}
