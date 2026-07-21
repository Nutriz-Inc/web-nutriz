import { AlertTriangle, Check } from "lucide-react";
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

type Props = {
	definitionLabel: string;
	isPending: boolean;
	stepDescription: string;
	finalizeDescription: string;
	onFinalizeDescriptionChange: (value: string) => void;
	onFinalize: () => void;
	errorDescription: string;
	onErrorDescriptionChange: (value: string) => void;
	onMarkAsError: () => void;
};

export function StepActionsFooter({
	definitionLabel,
	isPending,
	stepDescription,
	finalizeDescription,
	onFinalizeDescriptionChange,
	onFinalize,
	errorDescription,
	onErrorDescriptionChange,
	onMarkAsError,
}: Props) {
	return (
		<div className="flex flex-col gap-3 lg:flex-row">
			<div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#00458b]/20 bg-[#eef3f8] p-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex flex-col gap-0.5">
					<p className="text-[13px] font-bold text-[#00458b]">
						Finalizar etapa
					</p>
					<p className="text-[12px] text-[#6b7280]">
						A próxima etapa é liberada automaticamente.
					</p>
				</div>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<button
							type="button"
							onClick={() => onFinalizeDescriptionChange(stepDescription)}
							disabled={isPending}
							className="flex shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#00458b] px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
						>
							<Check className="size-4" />
							Finalizar etapa
						</button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<div className="flex size-12 items-center justify-center rounded-full bg-[#e1f1fb]">
								<Check className="size-5 text-[#00458b]" />
							</div>
							<AlertDialogTitle>Finalizar {definitionLabel}?</AlertDialogTitle>
							<AlertDialogDescription>
								A etapa será marcada como concluída e a próxima etapa será
								liberada automaticamente. Essa ação não pode ser desfeita.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<div className="flex flex-col gap-1.5 text-left">
							<label
								htmlFor="finalize-description"
								className="text-[12px] font-semibold text-[#6b7280]"
							>
								Descrição a ser registrada
							</label>
							<textarea
								id="finalize-description"
								value={finalizeDescription}
								onChange={(event) =>
									onFinalizeDescriptionChange(event.target.value)
								}
								rows={3}
								placeholder="Descreva o resultado desta etapa"
								className="rounded-[10px] border border-[#e1e7ee] bg-white px-3 py-2 text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#9ca3af]"
							/>
						</div>

						<AlertDialogFooter>
							<AlertDialogAction
								onClick={onFinalize}
								disabled={!finalizeDescription}
								className="bg-[#00458b] hover:bg-[#00335f]"
							>
								Finalizar etapa
							</AlertDialogAction>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<div className="flex flex-1 flex-col gap-3 rounded-xl border border-[#f3caca] bg-[#fcebeb] p-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex flex-col gap-0.5">
					<p className="text-[13px] font-bold text-[#a32d2d]">
						Marcar como erro
					</p>
					<p className="text-[12px] text-[#a32d2d]">
						Encerra a doação — não pode ser desfeito.
					</p>
				</div>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<button
							type="button"
							onClick={() => onErrorDescriptionChange(stepDescription)}
							disabled={isPending}
							className="flex shrink-0 items-center justify-center gap-2 rounded-[10px] bg-[#a32d2d] px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
						>
							<AlertTriangle className="size-4" />
							Marcar como erro
						</button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<div className="flex size-12 items-center justify-center rounded-full bg-[#fcebeb]">
								<AlertTriangle className="size-5 text-[#a32d2d]" />
							</div>
							<AlertDialogTitle>
								Marcar {definitionLabel} como erro?
							</AlertDialogTitle>
							<AlertDialogDescription>
								A doação será encerrada e nenhuma etapa seguinte poderá ser
								iniciada. Essa ação não pode ser desfeita.
							</AlertDialogDescription>
						</AlertDialogHeader>

						<div className="flex flex-col gap-1.5 text-left">
							<label
								htmlFor="error-description"
								className="text-[12px] font-semibold text-[#6b7280]"
							>
								Descreva o erro ocorrido
							</label>
							<textarea
								id="error-description"
								value={errorDescription}
								onChange={(event) =>
									onErrorDescriptionChange(event.target.value)
								}
								rows={3}
								placeholder="Explique o motivo do encerramento"
								className="rounded-[10px] border border-[#e1e7ee] bg-white px-3 py-2 text-[13px] text-[#1a1a1a] outline-none placeholder:text-[#9ca3af]"
							/>
						</div>

						<AlertDialogFooter>
							<AlertDialogAction
								onClick={onMarkAsError}
								disabled={!errorDescription}
								className="bg-[#a32d2d] hover:bg-[#8a2424]"
							>
								Marcar como erro
							</AlertDialogAction>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>
		</div>
	);
}
