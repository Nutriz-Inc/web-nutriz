import { MapPin } from "lucide-react";
import { getInitials } from "@/components/layout/utils";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useAvatarColor } from "@/hooks/use-avatar-color";
import { cn } from "@/lib/utils";
import { EnumUserType } from "@/services/types/i-user";
import {
	formatCep,
	formatCpf,
	formatDateBR,
	formatPhoneNumber,
} from "@/utils/formatter";
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
	const { auth } = useAuth();
	const { cor } = useAvatarColor(auth?.id_user);

	function setField<K extends keyof MyDataFormValues>(
		key: K,
		value: MyDataFormValues[K],
	) {
		onChange({ ...values, [key]: value });
	}

	return (
		<div
			className={cn(
				"flex flex-col gap-4 lg:gap-5",
				showAddress ? "lg:grid lg:grid-cols-2 lg:items-start" : "lg:max-w-xl",
			)}
		>
			<SectionCard
				iconVariant="bare"
				icon={
					<Avatar className="size-[34px] border border-line">
						<AvatarFallback className={cn("text-[12px]", cor.bg, cor.text)}>
							{getInitials(values.name || auth?.name)}
						</AvatarFallback>
					</Avatar>
				}
				title="Perfil"
			>
				<Field
					label="Nome Completo"
					value={values.name}
					onChange={(value) => setField("name", value)}
				/>
				{userType !== EnumUserType.Common && (
					<Field
						label="Identificador"
						value={identifier}
						editable={false}
						onChange={() => {}}
					/>
				)}
				<Field
					label="CPF"
					value={formatCpf(values.cpf)}
					editable={false}
					onChange={() => {}}
				/>
				<Field
					label="Data de Nascimento"
					value={values.birth_date ? formatDateBR(values.birth_date) : ""}
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

			{showAddress && (
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
						<div className="flex-1 border-r border-blue-bright/10">
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
			)}
		</div>
	);
}
