import { MapPin, User } from "lucide-react";
import { formatCep, formatPhoneNumber } from "@/utils/formatter";
import { EditableField } from "./EditableField";
import { LockedField } from "./LockedField";
import { SectionCard } from "./SectionCard";

export type MyDataFormValues = {
	name: string;
	phone_number: string;
	zip_code: string;
	number: string;
	complement: string;
};

type MyDataSectionProps = {
	values: MyDataFormValues;
	onChange: (values: MyDataFormValues) => void;
	birthDate: string;
	email: string;
	street: string;
};

export function MyDataSection({
	values,
	onChange,
	birthDate,
	email,
	street,
}: MyDataSectionProps) {
	function setField<K extends keyof MyDataFormValues>(
		key: K,
		value: MyDataFormValues[K],
	) {
		onChange({ ...values, [key]: value });
	}

	return (
		<div className="flex flex-col gap-4">
			<SectionCard icon={<User className="size-[18px]" />} title="Perfil">
				<EditableField
					label="Nome Completo"
					value={values.name}
					onChange={(value) => setField("name", value)}
				/>
				<LockedField label="Data de Nascimento" value={birthDate} />
				<EditableField
					label="Telefone"
					value={values.phone_number}
					inputMode="tel"
					onChange={(value) =>
						setField("phone_number", formatPhoneNumber(value))
					}
				/>
				<LockedField label="Email" value={email} />
			</SectionCard>

			<SectionCard icon={<MapPin className="size-[18px]" />} title="Endereço">
				<EditableField
					label="CEP"
					value={values.zip_code}
					inputMode="numeric"
					onChange={(value) => setField("zip_code", formatCep(value))}
				/>
				<LockedField label="Endereço" value={street} />
				<div className="flex">
					<div className="flex-1 border-r border-[#387ccd]/10">
						<EditableField
							label="Número"
							value={values.number}
							onChange={(value) => setField("number", value)}
						/>
					</div>
					<div className="flex-1">
						<EditableField
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
