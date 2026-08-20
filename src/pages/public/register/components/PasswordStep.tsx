import { useState } from "react";
import { FormField } from "@/components/full/FormField";
import { PasswordToggle } from "@/components/full/PasswordToggle";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../validation";

type PasswordStepProps = {
	form: RegisterFormData;
	errors: RegisterFormErrors;
	onChange: (field: RegisterFieldName, value: string) => void;
};

export function PasswordStep({ form, errors, onChange }: PasswordStepProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<fieldset className="flex max-w-[340px] flex-col gap-5">
			<legend className="mb-5 text-[13px] font-bold uppercase tracking-wide text-blue-deep">
				Senha de acesso
			</legend>

			<FormField
				id="register-password"
				label="Senha"
				value={form.password}
				onChange={(value) => onChange("password", value)}
				placeholder="Crie uma senha"
				error={errors.password}
				type={showPassword ? "text" : "password"}
				autoComplete="new-password"
				trailing={
					<PasswordToggle
						visible={showPassword}
						onToggle={() => setShowPassword((value) => !value)}
					/>
				}
			/>

			<FormField
				id="register-confirm-password"
				label="Confirmar senha"
				value={form.confirmPassword}
				onChange={(value) => onChange("confirmPassword", value)}
				placeholder="Repita a senha"
				error={errors.confirmPassword}
				type={showConfirm ? "text" : "password"}
				autoComplete="new-password"
				trailing={
					<PasswordToggle
						visible={showConfirm}
						onToggle={() => setShowConfirm((value) => !value)}
					/>
				}
			/>
		</fieldset>
	);
}
