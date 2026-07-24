import { formatCpf, maskDate, formatPhoneNumber } from "@/utils/formatter";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../validation";
import { WizardField } from "./WizardField";

type PersonalDataStepProps = {
	form: RegisterFormData;
	errors: RegisterFormErrors;
	onChange: (field: RegisterFieldName, value: string) => void;
};

export function PersonalDataStep({
	form,
	errors,
	onChange,
}: PersonalDataStepProps) {
	return (
		<fieldset className="flex flex-col gap-5">
			<legend className="mb-5 text-[13px] font-bold uppercase tracking-wide text-[#0d3b6e]">
				Dados pessoais
			</legend>

			<WizardField
				id="register-name"
				label="Nome completo"
				value={form.name}
				onChange={(value) => onChange("name", value)}
				placeholder="Digite seu nome completo"
				error={errors.name}
				autoComplete="name"
			/>

			<div className="grid gap-5 sm:grid-cols-2">
				<WizardField
					id="register-cpf"
					label="CPF"
					value={form.cpf}
					onChange={(value) => onChange("cpf", formatCpf(value))}
					placeholder="000.000.000-00"
					error={errors.cpf}
					inputMode="numeric"
					maxLength={14}
				/>
				<WizardField
					id="register-birth-date"
					label="Data de nascimento"
					value={form.birthDate}
					onChange={(value) => onChange("birthDate", maskDate(value))}
					placeholder="DD/MM/AAAA"
					error={errors.birthDate}
					inputMode="numeric"
					maxLength={10}
					autoComplete="bday"
				/>
				<WizardField
					id="register-phone"
					label="Telefone"
					value={form.phone}
					onChange={(value) => onChange("phone", formatPhoneNumber(value))}
					placeholder="(11) 98765-4321"
					error={errors.phone}
					inputMode="tel"
					maxLength={15}
					autoComplete="tel-national"
				/>
				<WizardField
					id="register-email"
					label="Email"
					value={form.email}
					onChange={(value) => onChange("email", value)}
					placeholder="voce@email.com"
					error={errors.email}
					type="email"
					inputMode="email"
					autoComplete="email"
				/>
			</div>
		</fieldset>
	);
}
