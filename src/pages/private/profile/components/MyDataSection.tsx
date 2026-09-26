import { FormField } from "@/components/full/FormField";
import { Reveal } from "@/components/full/Reveal";
import { EnumUserType } from "@/services/types/i-user";
import {
	formatCep,
	formatCpf,
	formatDateBR,
	maskPhoneNumber,
} from "@/utils/formatter";
import { PasswordField } from "./PasswordField";
import { ProfileSectionCard } from "./ProfileSectionCard";
import { ReadOnlyField } from "./ReadOnlyField";

export type MyDataFormValues = {
	name: string;
	phone_number: string;
	email: string;
	password: string;
	zip_code: string;
	number: string;
	complement: string;
	cpf: string;
	birth_date?: string;
};

type MyDataSectionProps = {
	values: MyDataFormValues;
	onChange: (values: MyDataFormValues) => void;
	identifier: string;
	street: string;
	showAddress?: boolean;
	userType?: EnumUserType;
};

export function MyDataSection({
	values,
	onChange,
	identifier,
	street,
	showAddress = true,
	userType = EnumUserType.Common,
}: MyDataSectionProps) {
	function setField<K extends keyof MyDataFormValues>(
		key: K,
		value: MyDataFormValues[K],
	) {
		onChange({ ...values, [key]: value });
	}

	const campoEmail = (
		<FormField
			id="perfil-email"
			label="E-mail"
			value={values.email}
			type="email"
			inputMode="email"
			autoComplete="email"
			onChange={(value) => setField("email", value)}
		/>
	);

	const campoSenha = (
		<PasswordField
			value={values.password}
			onChange={(value) => setField("password", value)}
			className="sm:col-span-2"
		/>
	);

	return (
		<div className="grid gap-5 lg:grid-cols-2 lg:items-start">
			<Reveal>
				<ProfileSectionCard label="Conta" title="Dados pessoais">
					<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
						<FormField
							id="perfil-nome"
							label="Nome completo"
							value={values.name}
							autoComplete="name"
							onChange={(value) => setField("name", value)}
							className="sm:col-span-2"
						/>

						{userType !== EnumUserType.Common && (
							<ReadOnlyField
								label="Identificador"
								value={identifier}
								className="sm:col-span-2"
							/>
						)}

						<ReadOnlyField label="CPF" value={formatCpf(values.cpf)} />

						<ReadOnlyField
							label="Data de nascimento"
							value={values.birth_date ? formatDateBR(values.birth_date) : ""}
						/>

						<p className="-mt-1 text-rotulo text-ink-3 sm:col-span-2">
							Os campos com cadeado não mudam por aqui. Para corrigir, fale com
							a equipe Lactare.
						</p>

						<FormField
							id="perfil-telefone"
							label="Telefone"
							value={values.phone_number}
							inputMode="tel"
							autoComplete="tel"
							maxLength={15}
							placeholder="(00) 00000-0000"
							onChange={(value) =>
								setField("phone_number", maskPhoneNumber(value))
							}
						/>

						{showAddress && campoEmail}
						{showAddress && campoSenha}
					</div>
				</ProfileSectionCard>
			</Reveal>

			{!showAddress && (
				<Reveal delay={0.06}>
					<ProfileSectionCard label="Acesso" title="E-mail e senha">
						<div className="grid grid-cols-1 gap-4">
							{campoEmail}
							{campoSenha}
						</div>
					</ProfileSectionCard>
				</Reveal>
			)}

			{showAddress && (
				<Reveal delay={0.06}>
					<ProfileSectionCard label="Coleta" title="Endereço de coleta">
						<div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
							<FormField
								id="perfil-cep"
								label="CEP"
								value={values.zip_code}
								inputMode="numeric"
								autoComplete="postal-code"
								maxLength={9}
								placeholder="00000-000"
								onChange={(value) => setField("zip_code", formatCep(value))}
								className="sm:col-span-2"
							/>

							<ReadOnlyField
								label="Endereço"
								value={street}
								className="sm:col-span-2"
							/>

							<FormField
								id="perfil-numero"
								label="Número"
								value={values.number}
								inputMode="numeric"
								onChange={(value) => setField("number", value)}
							/>

							<FormField
								id="perfil-complemento"
								label="Complemento"
								value={values.complement}
								optional
								onChange={(value) => setField("complement", value)}
							/>
						</div>
					</ProfileSectionCard>
				</Reveal>
			)}
		</div>
	);
}
