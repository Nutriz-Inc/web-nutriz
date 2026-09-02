import { LoaderCircle } from "lucide-react";
import { useEffect, useState } from "react";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import {
	CLASSE_BOTAO_PRIMARIO,
	CLASSE_BOTAO_SECUNDARIO,
	CLASSE_CAMPO_TEXTO,
	CLASSE_SHEET,
} from "../constants";

type Props = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	nomeAtual: string;
	descricaoAtual: string;
	onSubmit: (dados: { name: string; description: string }) => void;
	salvando: boolean;
	erro?: string;
};

export function EditRouteSheet({
	open,
	onOpenChange,
	nomeAtual,
	descricaoAtual,
	onSubmit,
	salvando,
	erro,
}: Props) {
	const [nome, setNome] = useState(nomeAtual);
	const [descricao, setDescricao] = useState(descricaoAtual);
	const [erroLocal, setErroLocal] = useState<string>();

	useEffect(() => {
		if (open) {
			setNome(nomeAtual);
			setDescricao(descricaoAtual);
			setErroLocal(undefined);
		}
	}, [open, nomeAtual, descricaoAtual]);

	function handleSubmit() {
		const nomeLimpo = nome.trim();
		const descricaoLimpa = descricao.trim();

		if (!nomeLimpo || !descricaoLimpa) {
			setErroLocal("Preencha o nome e a descrição da rota.");
			return;
		}

		setErroLocal(undefined);
		onSubmit({ name: nomeLimpo, description: descricaoLimpa });
	}

	return (
		<Sheet open={open} onOpenChange={salvando ? () => {} : onOpenChange}>
			<SheetContent side="bottom" className={CLASSE_SHEET}>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-[22px] font-bold text-ink">
						Editar rota
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						Ajuste o nome e a descrição desta rota.
					</SheetDescription>
				</SheetHeader>

				<div className="flex min-h-0 flex-1 flex-col gap-4 overflow-y-auto pr-0.5">
					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="rota-nome"
							className="text-[13px] font-semibold text-ink-2"
						>
							Nome da rota
						</label>
						<input
							id="rota-nome"
							value={nome}
							onChange={(event) => setNome(event.target.value)}
							maxLength={150}
							className={CLASSE_CAMPO_TEXTO}
						/>
					</div>

					<div className="flex flex-col gap-1.5">
						<label
							htmlFor="rota-descricao"
							className="text-[13px] font-semibold text-ink-2"
						>
							Descrição
						</label>
						<textarea
							id="rota-descricao"
							value={descricao}
							onChange={(event) => setDescricao(event.target.value)}
							rows={4}
							maxLength={500}
							className={CLASSE_CAMPO_TEXTO}
						/>
					</div>

					{(erroLocal || erro) && (
						<p className="rounded-xl bg-danger-tint px-3.5 py-2.5 text-[13px] font-semibold text-danger">
							{erroLocal ?? erro}
						</p>
					)}
				</div>

				<div className="flex shrink-0 flex-col-reverse gap-2.5 sm:flex-row sm:justify-end">
					<button
						type="button"
						onClick={() => onOpenChange(false)}
						disabled={salvando}
						className={CLASSE_BOTAO_SECUNDARIO}
					>
						Cancelar
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={salvando}
						className={CLASSE_BOTAO_PRIMARIO}
					>
						{salvando && <LoaderCircle className="size-4 animate-spin" />}
						Salvar alterações
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
