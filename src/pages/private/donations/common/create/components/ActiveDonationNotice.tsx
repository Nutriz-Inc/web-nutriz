import { Heart } from "lucide-react";

/**
 * Aviso de que ja existe uma doacao em andamento.
 *
 * Nao e erro: e o estado normal de quem doou ha pouco. Antes isso chegava como
 * um cartao vermelho de "nao foi possivel" mais um toast de erro, o que soava
 * como falha da pessoa ou do sistema. Aqui vira o rosa da EVA.
 *
 * Sem botao proprio: quem leva para a doacao que ja existe e o botao principal
 * da tela, logo abaixo — dois caminhos para o mesmo lugar so poluiriam.
 */
export function ActiveDonationNotice() {
	return (
		<div className="rounded-card-sm flex gap-3 border border-eva/25 bg-eva-tint p-4">
			<span
				aria-hidden="true"
				className="flex size-8 shrink-0 items-center justify-center rounded-full bg-white text-eva shadow-soft"
			>
				<Heart className="size-4 fill-eva" />
			</span>

			<p className="min-w-0 text-[13px] leading-[19px] text-ink">
				<strong className="font-bold">
					Você já tem uma doação em andamento.
				</strong>{" "}
				Assim que ela for concluída, você pode iniciar outra por aqui.
			</p>
		</div>
	);
}
