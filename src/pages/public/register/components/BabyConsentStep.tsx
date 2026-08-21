import { Plus, X } from "lucide-react";
import { FormField } from "@/components/full/FormField";
import { maskDate } from "@/utils/formatter";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../validation";
import { RoundCheckbox } from "./RoundCheckbox";

type BabyConsentStepProps = {
	form: RegisterFormData;
	errors: RegisterFormErrors;
	onChange: (field: RegisterFieldName, value: string) => void;
	onToggle: (field: "hasBaby" | "acceptedTerms", value: boolean) => void;
	onBabyChange: (
		index: number,
		field: "name" | "birthDate",
		value: string,
	) => void;
	onAddBaby: () => void;
	onRemoveBaby: (index: number) => void;
};

export function BabyConsentStep({
	form,
	errors,
	onToggle,
	onBabyChange,
	onAddBaby,
	onRemoveBaby,
}: BabyConsentStepProps) {
	return (
		<fieldset className="flex flex-col gap-6">
			<legend className="sr-only">Bebê e consentimento</legend>

			<div className="flex flex-col gap-1.5">
				<RoundCheckbox
					id="register-has-baby"
					checked={form.hasBaby}
					onChange={(checked) => onToggle("hasBaby", checked)}
					accent="pink"
				>
					<span className="text-sm font-semibold text-ink">
						Já quero cadastrar meu bebê
					</span>
				</RoundCheckbox>
				<p className="pl-[30px] text-[13px] text-ink-2">
					Você pode adicionar os dados do seu bebê agora ou depois no seu
					perfil.
				</p>
			</div>

			{form.hasBaby && (
				<div className="flex flex-col gap-4">
					{form.babies.map((baby, index) => (
						<div
							key={baby.id}
							className="rounded-xl border border-danger-tint bg-eva-tint p-[18px]"
						>
							<div className="mb-4 flex items-center justify-between">
								<p className="text-xs font-bold uppercase tracking-[0.08em] text-eva">
									Bebê {index + 1}
								</p>
								{form.babies.length > 1 && (
									<button
										type="button"
										onClick={() => onRemoveBaby(index)}
										className="flex min-h-11 items-center gap-1 rounded-md px-2 text-[13px] font-semibold text-eva transition-colors hover:text-eva focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eva"
									>
										<X className="size-3.5" aria-hidden />
										Remover
									</button>
								)}
							</div>
							<div className="grid gap-4 sm:grid-cols-2">
								<FormField
									id={`register-baby-${index}-name`}
									label="Nome do bebê"
									value={baby.name}
									onChange={(value) => onBabyChange(index, "name", value)}
									placeholder="Nome do bebê"
									error={errors[`baby-${index}-name`]}
									optional
								/>
								<FormField
									id={`register-baby-${index}-birth-date`}
									label="Data de nascimento do bebê"
									value={baby.birthDate}
									onChange={(value) =>
										onBabyChange(index, "birthDate", maskDate(value))
									}
									placeholder="DD/MM/AAAA"
									error={errors[`baby-${index}-birthDate`]}
									inputMode="numeric"
									maxLength={10}
								/>
							</div>
						</div>
					))}

					<button
						type="button"
						onClick={onAddBaby}
						className="flex min-h-11 w-fit items-center gap-2 rounded-md border border-dashed border-eva px-4 text-sm font-semibold text-eva transition-colors hover:bg-eva-tint focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-eva"
					>
						<Plus className="size-4" aria-hidden />
						Adicionar outro bebê
					</button>
				</div>
			)}

			<hr className="border-line" />

			<div className="flex flex-col gap-1.5">
				{/* To do: criar as paginas de termos de uso e politica de privacidade */}
				<RoundCheckbox
					id="register-consent"
					checked={form.acceptedTerms}
					onChange={(checked) => onToggle("acceptedTerms", checked)}
					accent="navy"
					describedBy={
						errors.acceptedTerms ? "register-consent-error" : undefined
					}
					invalid={!!errors.acceptedTerms}
				>
					<span className="text-sm leading-relaxed text-ink">
						Li e aceito os{" "}
						<a
							href="/termos-de-uso"
							target="_blank"
							rel="noreferrer"
							className="font-semibold text-blue-deep underline underline-offset-2"
						>
							Termos de Uso
						</a>{" "}
						e a{" "}
						<a
							href="/politica-de-privacidade"
							target="_blank"
							rel="noreferrer"
							className="font-semibold text-blue-deep underline underline-offset-2"
						>
							Política de Privacidade
						</a>
						, incluindo o uso dos meus dados para fins de doação e triagem.
					</span>
				</RoundCheckbox>
				{errors.acceptedTerms && (
					<p
						id="register-consent-error"
						className="pl-[30px] text-xs text-danger"
					>
						{errors.acceptedTerms}
					</p>
				)}
			</div>
		</fieldset>
	);
}
