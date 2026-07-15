import { Plus, X } from "lucide-react";
import { maskDate } from "@/lib/masks";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../types";
import { RoundCheckbox } from "./RoundCheckbox";
import { WizardField } from "./WizardField";

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
			<legend className="mb-6 text-[13px] font-bold uppercase tracking-wide text-[#0d3b6e]">
				Bebê e consentimento
			</legend>

			<div className="flex flex-col gap-1.5">
				<RoundCheckbox
					id="register-has-baby"
					checked={form.hasBaby}
					onChange={(checked) => onToggle("hasBaby", checked)}
					accent="pink"
				>
					<span className="text-sm font-semibold text-[#09090b]">
						♥ Já quero cadastrar meu bebê
					</span>
				</RoundCheckbox>
				<p className="pl-[30px] text-[13px] text-[#71717a]">
					Você pode adicionar os dados do seu bebê agora ou depois no seu
					perfil.
				</p>
			</div>

			{form.hasBaby && (
				<div className="flex flex-col gap-4">
					{form.babies.map((baby, index) => (
						<div
							key={baby.id}
							className="rounded-[10px] border border-[#fadbe7] bg-[#fdf1f5] p-[18px]"
						>
							<div className="mb-4 flex items-center justify-between">
								<p className="text-xs font-bold uppercase tracking-[0.08em] text-[#e0457a]">
									Bebê {index + 1}
								</p>
								{form.babies.length > 1 && (
									<button
										type="button"
										onClick={() => onRemoveBaby(index)}
										className="flex min-h-11 items-center gap-1 rounded-md px-2 text-[13px] font-semibold text-[#e0457a] transition-colors hover:text-[#c2325f] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0457a]"
									>
										<X className="size-3.5" aria-hidden />
										Remover
									</button>
								)}
							</div>
							<div className="grid gap-4 sm:grid-cols-2">
								<WizardField
									id={`register-baby-${index}-name`}
									label="Nome do bebê"
									value={baby.name}
									onChange={(value) => onBabyChange(index, "name", value)}
									placeholder="Nome do bebê"
									error={errors[`baby-${index}-name`]}
									optional
								/>
								<WizardField
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
						className="flex min-h-11 w-fit items-center gap-2 rounded-md border border-dashed border-[#e0457a] px-4 text-sm font-semibold text-[#e0457a] transition-colors hover:bg-[#fdf1f5] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#e0457a]"
					>
						<Plus className="size-4" aria-hidden />
						Adicionar outro bebê
					</button>
				</div>
			)}

			<hr className="border-[#e4e4e7]" />

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
					<span className="text-sm leading-relaxed text-[#09090b]">
						Li e aceito os{" "}
						<a
							href="/termos-de-uso"
							target="_blank"
							rel="noreferrer"
							className="font-semibold text-[#0d3b6e] underline underline-offset-2"
						>
							Termos de Uso
						</a>{" "}
						e a{" "}
						<a
							href="/politica-de-privacidade"
							target="_blank"
							rel="noreferrer"
							className="font-semibold text-[#0d3b6e] underline underline-offset-2"
						>
							Política de Privacidade
						</a>
						, incluindo o uso dos meus dados para fins de doação e triagem.
					</span>
				</RoundCheckbox>
				{errors.acceptedTerms && (
					<p
						id="register-consent-error"
						className="pl-[30px] text-xs text-[#dc2626]"
					>
						{errors.acceptedTerms}
					</p>
				)}
			</div>
		</fieldset>
	);
}
