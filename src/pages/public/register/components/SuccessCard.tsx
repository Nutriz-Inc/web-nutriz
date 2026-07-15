import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

type SuccessCardProps = {
	babiesPending?: boolean;
};

export function SuccessCard({ babiesPending = false }: SuccessCardProps) {
	const navigate = useNavigate();

	return (
		<div className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-4 rounded-xl border border-[#e4e4e7] bg-white p-8 text-center shadow-sm">
			<span className="grid size-16 place-items-center rounded-full bg-[#e8f0fb]">
				<Check className="size-8 text-[#0d3b6e]" aria-hidden />
			</span>
			<h2 className="text-xl font-bold text-[#0d3b6e]">
				Conta criada com sucesso!
			</h2>
			<p className="text-sm leading-relaxed text-[#71717a]">
				Seu cadastro foi concluído. Faça login para acessar a sua conta e
				começar a doar.
			</p>
			{babiesPending && (
				<p className="rounded-md border border-[#fadbe7] bg-[#fdf1f5] px-4 py-2 text-[13px] leading-relaxed text-[#c2325f]">
					Não conseguimos salvar todos os bebês agora. Você pode adicioná-los
					depois no seu perfil.
				</p>
			)}
			<Button
				onClick={() => navigate("/login")}
				className="mt-2 h-11 w-full rounded-md bg-[#0d3b6e] text-sm font-semibold text-white hover:bg-[#0a2e56]"
			>
				Voltar ao início
			</Button>
		</div>
	);
}
