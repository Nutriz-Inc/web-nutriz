import { useState } from "react";
import { FormField } from "@/components/full/FormField";
import { PasswordToggle } from "@/components/full/PasswordToggle";

type PasswordFieldProps = {
	value: string;
	onChange: (value: string) => void;
	className?: string;
};

export function PasswordField({
	value,
	onChange,
	className,
}: PasswordFieldProps) {
	const [visible, setVisible] = useState(false);

	return (
		<FormField
			id="perfil-senha"
			label="Nova senha"
			optional
			type={visible ? "text" : "password"}
			autoComplete="new-password"
			placeholder="Deixe em branco para manter a atual"
			value={value}
			onChange={onChange}
			className={className}
			trailing={
				<PasswordToggle
					visible={visible}
					onToggle={() => setVisible((prev) => !prev)}
					className="flex size-11 items-center justify-center rounded-full"
				/>
			}
		/>
	);
}
