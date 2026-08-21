import { CalendarDays, IdCard, Mail, Phone, User } from "lucide-react";
import { FormField } from "@/components/full/FormField";
import { formatCpf, formatPhoneNumber, maskDate } from "@/utils/formatter";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../validation";

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
			<legend className="sr-only">Dados pessoais</legend>

			<FormField
				id="register-name"
				leading={<User />}
				label="Nome completo"
				value={form.name}
				onChange={(value) => onChange("name", value)}
				placeholder="Digite seu nome completo"
				error={errors.name}
				autoComplete="name"
			/>

			<div className="grid gap-5 sm:grid-cols-2">
				<FormField
					id="register-cpf"
					leading={<IdCard />}
					label="CPF"
					value={form.cpf}
					onChange={(value) => onChange("cpf", formatCpf(value))}
					placeholder="000.000.000-00"
					error={errors.cpf}
					inputMode="numeric"
					maxLength={14}
				/>
				<FormField
					id="register-birth-date"
					leading={<CalendarDays />}
					label="Data de nascimento"
					value={form.birthDate}
					onChange={(value) => onChange("birthDate", maskDate(value))}
					placeholder="DD/MM/AAAA"
					error={errors.birthDate}
					inputMode="numeric"
					maxLength={10}
					autoComplete="bday"
				/>
				<FormField
					id="register-phone"
					leading={<Phone />}
					label="Telefone"
					value={form.phone}
					onChange={(value) => onChange("phone", formatPhoneNumber(value))}
					placeholder="(11) 98765-4321"
					error={errors.phone}
					inputMode="tel"
					maxLength={15}
					autoComplete="tel-national"
				/>
				<FormField
					id="register-email"
					leading={<Mail />}
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
