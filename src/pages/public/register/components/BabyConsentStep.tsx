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
};

export function BabyConsentStep({
	form,
	errors,
	onChange,
	onToggle,
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
				<div className="rounded-[10px] border border-[#fadbe7] bg-[#fdf1f5] p-[18px]">
					<p className="mb-4 text-xs font-bold uppercase tracking-[0.08em] text-[#e0457a]">
						Bebê
					</p>
					<div className="grid gap-4 sm:grid-cols-2">
						<WizardField
							id="register-baby-name"
							label="Nome do bebê"
							value={form.babyName}
							onChange={(value) => onChange("babyName", value)}
							placeholder="Nome do bebê"
							error={errors.babyName}
							optional
						/>
						<WizardField
							id="register-baby-birth-date"
							label="Data de nascimento do bebê"
							value={form.babyBirthDate}
							onChange={(value) => onChange("babyBirthDate", maskDate(value))}
							placeholder="DD/MM/AAAA"
							error={errors.babyBirthDate}
							inputMode="numeric"
							maxLength={10}
						/>
					</div>
				</div>
			)}

			<hr className="border-[#e4e4e7]" />

			<div className="flex flex-col gap-1.5">
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
