import { Check } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

export function SuccessCard() {
	const navigate = useNavigate();

	return (
		<div className="mx-auto flex w-full max-w-[440px] flex-col items-center gap-4 rounded-card-sm border border-line bg-white p-8 text-center shadow-soft">
			<span className="grid size-16 place-items-center rounded-full bg-blue-tint">
				<Check className="size-8 text-blue-deep" aria-hidden />
			</span>
			<h2 className="text-xl font-bold text-blue-deep">
				Conta criada com sucesso!
			</h2>
			<p className="text-sm leading-relaxed text-ink-2">
				Seu cadastro foi concluído. Faça login para acessar a sua conta e
				começar a doar.
			</p>
			<Button
				onClick={() => navigate("/login")}
				className="mt-2 h-11 w-full rounded-md bg-blue-deep text-sm font-semibold text-white hover:bg-blue"
			>
				Voltar ao início
			</Button>
		</div>
	);
}
