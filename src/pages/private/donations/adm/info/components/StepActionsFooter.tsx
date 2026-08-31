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
import type { BottleUpdateBase } from "@/services/types/i-donation";
import { bottlesAreValid } from "@/utils/bottle";
import { BottleListEditor } from "./BottleListEditor";

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
	isLastStep?: boolean;
	bottles: BottleUpdateBase[];
	onBottlesChange: (next: BottleUpdateBase[]) => void;
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
	isLastStep,
	bottles,
	onBottlesChange,
}: Props) {
	const bottlesInvalid = Boolean(isLastStep) && !bottlesAreValid(bottles);

	return (
		<div className="flex flex-col gap-3 lg:flex-row">
			<div className="flex flex-1 flex-col gap-3 rounded-xl border border-blue-deep/20 bg-blue-tint p-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex flex-col gap-0.5">
					<p className="text-[13px] font-bold text-blue-deep">
						Finalizar etapa
					</p>
					<p className="text-[12px] text-ink-2">
						A próxima etapa é liberada automaticamente.
					</p>
				</div>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<button
							type="button"
							onClick={() => onFinalizeDescriptionChange(stepDescription)}
							disabled={isPending}
							className="flex shrink-0 items-center justify-center gap-2 rounded-full bg-blue-deep-fill hover:bg-blue-fill px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
						>
							<Check className="size-4" />
							Finalizar etapa
						</button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<div className="flex size-12 items-center justify-center rounded-full bg-blue-tint">
								<Check className="size-5 text-blue-deep" />
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
								className="text-[12px] font-semibold text-ink-2"
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
								className="rounded-card-sm border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-3"
							/>
						</div>

						{isLastStep && (
							<BottleListEditor
								bottles={bottles}
								onChange={onBottlesChange}
								disabled={isPending}
							/>
						)}

						<AlertDialogFooter>
							<AlertDialogAction
								onClick={onFinalize}
								disabled={!finalizeDescription || bottlesInvalid}
								className="bg-blue-deep-fill hover:bg-blue-deep-fill"
							>
								Finalizar etapa
							</AlertDialogAction>
							<AlertDialogCancel>Cancelar</AlertDialogCancel>
						</AlertDialogFooter>
					</AlertDialogContent>
				</AlertDialog>
			</div>

			<div className="flex flex-1 flex-col gap-3 rounded-xl border border-danger-tint bg-danger-tint p-4 lg:flex-row lg:items-center lg:justify-between">
				<div className="flex flex-col gap-0.5">
					<p className="text-[13px] font-bold text-danger">Marcar como erro</p>
					<p className="text-[12px] text-danger">
						Encerra a doação — não pode ser desfeito.
					</p>
				</div>

				<AlertDialog>
					<AlertDialogTrigger asChild>
						<button
							type="button"
							onClick={() => onErrorDescriptionChange(stepDescription)}
							disabled={isPending}
							className="flex shrink-0 items-center justify-center gap-2 rounded-xl bg-danger-fill px-5 py-2.5 text-[14px] font-bold text-white transition-transform active:scale-[0.98] disabled:opacity-60"
						>
							<AlertTriangle className="size-4" />
							Marcar como erro
						</button>
					</AlertDialogTrigger>
					<AlertDialogContent>
						<AlertDialogHeader>
							<div className="flex size-12 items-center justify-center rounded-full bg-danger-tint">
								<AlertTriangle className="size-5 text-danger" />
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
								className="text-[12px] font-semibold text-ink-2"
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
								className="rounded-card-sm border border-line bg-surface px-3 py-2 text-[13px] text-ink outline-none placeholder:text-ink-3"
							/>
						</div>

						<AlertDialogFooter>
							<AlertDialogAction
								onClick={onMarkAsError}
								disabled={!errorDescription}
								className="bg-danger-fill hover:bg-danger-fill"
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
