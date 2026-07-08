import { MapPin, User } from "lucide-react";
import { formatCep, formatPhoneNumber } from "@/utils/formatter";
import { Field } from "../../../../components/full/Field";
import { PasswordField } from "./PasswordField";
import { SectionCard } from "./SectionCard";

export type MyDataFormValues = {
	name: string;
	phone_number: string;
	email: string;
	password: string;
	zip_code: string;
	number: string;
	complement: string;
};

type MyDataSectionProps = {
	values: MyDataFormValues;
	onChange: (values: MyDataFormValues) => void;
	birthDate: string;
	street: string;
};

export function MyDataSection({
	values,
	onChange,
	birthDate,
	street,
}: MyDataSectionProps) {
	function setField<K extends keyof MyDataFormValues>(
		key: K,
		value: MyDataFormValues[K],
	) {
		onChange({ ...values, [key]: value });
	}

	return (
		<div className="flex flex-col gap-4 lg:grid lg:grid-cols-2 lg:items-start lg:gap-5">
			<SectionCard icon={<User className="size-[18px]" />} title="Perfil">
				<Field
					label="Nome Completo"
					value={values.name}
					onChange={(value) => setField("name", value)}
				/>
				<Field
					label="Data de Nascimento"
					value={birthDate}
					editable={false}
					onChange={() => {}}
				/>
				<Field
					label="Telefone"
					value={values.phone_number}
					inputMode="tel"
					onChange={(value) =>
						setField("phone_number", formatPhoneNumber(value))
					}
				/>
				<Field
					label="Email"
					value={values.email}
					inputMode="email"
					onChange={(value) => setField("email", value)}
				/>
				<PasswordField
					value={values.password}
					onChange={(value) => setField("password", value)}
				/>
			</SectionCard>

			<SectionCard icon={<MapPin className="size-[18px]" />} title="Endereço">
				<Field
					label="CEP"
					value={values.zip_code}
					inputMode="numeric"
					onChange={(value) => setField("zip_code", formatCep(value))}
				/>
				<Field
					label="Endereço"
					value={street}
					editable={false}
					onChange={() => {}}
				/>
				<div className="flex">
					<div className="flex-1 border-r border-[#387ccd]/10">
						<Field
							label="Número"
							value={values.number}
							onChange={(value) => setField("number", value)}
						/>
					</div>
					<div className="flex-1">
						<Field
							label="Complemento"
							value={values.complement}
							onChange={(value) => setField("complement", value)}
						/>
					</div>
				</div>
			</SectionCard>
		</div>
	);
}
