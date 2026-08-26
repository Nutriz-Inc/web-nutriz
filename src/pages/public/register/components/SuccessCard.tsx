import { useNavigate } from "react-router-dom";
import cadastroConcluido from "@/assets/illustrations/cadastro-concluido.svg";
import { Button } from "@/components/ui/button";

export function SuccessCard() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-4 rounded-card-sm border border-line bg-surface p-8 text-center shadow-soft">
			<img
				src={cadastroConcluido}
				alt=""
				aria-hidden="true"
				width={320}
				height={200}
				className="h-32 w-auto max-w-full select-none sm:h-40"
			/>
			<h2 className="text-xl font-bold text-blue-deep">
				Conta criada com sucesso!
			</h2>
			<p className="text-sm leading-relaxed text-ink-2">
				Seu cadastro foi concluído. Faça login para acessar a sua conta e
				começar a doar.
			</p>
			<Button
				onClick={() => navigate("/login")}
				className="mt-2 h-11 w-full rounded-md bg-blue-deep-fill text-sm font-semibold text-white hover:bg-blue-fill"
			>
				Voltar ao início
			</Button>
		</div>
	);
}
