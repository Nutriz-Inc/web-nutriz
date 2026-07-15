import { maskCep } from "@/lib/masks";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../types";
import { WizardField } from "./WizardField";

type AddressStepProps = {
	form: RegisterFormData;
	errors: RegisterFormErrors;
	onChange: (field: RegisterFieldName, value: string) => void;
};

export function AddressStep({ form, errors, onChange }: AddressStepProps) {
	return (
		<fieldset className="flex flex-col gap-5">
			<legend className="mb-5 text-[13px] font-bold uppercase tracking-wide text-[#0d3b6e]">
				Endereço
			</legend>

			<div className="grid gap-5 sm:grid-cols-2">
				<WizardField
					id="register-cep"
					label="CEP"
					value={form.cep}
					onChange={(value) => onChange("cep", maskCep(value))}
					placeholder="00000-000"
					error={errors.cep}
					inputMode="numeric"
					maxLength={9}
					autoComplete="postal-code"
				/>
				<WizardField
					id="register-number"
					label="Número"
					value={form.number}
					onChange={(value) => onChange("number", value)}
					placeholder="1543"
					error={errors.number}
					inputMode="numeric"
					maxLength={10}
				/>
				<WizardField
					id="register-complement"
					label="Complemento"
					value={form.complement}
					onChange={(value) => onChange("complement", value)}
					placeholder="Apto, bloco..."
					error={errors.complement}
					maxLength={150}
					optional
					className="sm:col-span-2"
				/>
			</div>

			<p className="text-xs text-[#71717a]">
				Rua, bairro e cidade são preenchidos automaticamente pelo CEP.
			</p>
		</fieldset>
	);
}
