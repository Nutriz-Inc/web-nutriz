import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../types";
import { WizardField } from "./WizardField";

type PasswordStepProps = {
	form: RegisterFormData;
	errors: RegisterFormErrors;
	onChange: (field: RegisterFieldName, value: string) => void;
};

type PasswordToggleProps = {
	visible: boolean;
	onToggle: () => void;
};

function PasswordToggle({ visible, onToggle }: PasswordToggleProps) {
	return (
		<button
			type="button"
			onClick={onToggle}
			aria-label={visible ? "Ocultar senha" : "Mostrar senha"}
			className="text-[#a1a1aa] transition-colors hover:text-[#71717a]"
		>
			{visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
		</button>
	);
}

export function PasswordStep({ form, errors, onChange }: PasswordStepProps) {
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirm, setShowConfirm] = useState(false);

	return (
		<fieldset className="flex max-w-[340px] flex-col gap-5">
			<legend className="mb-5 text-[13px] font-bold uppercase tracking-wide text-[#0d3b6e]">
				Senha de acesso
			</legend>

			<WizardField
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

			<WizardField
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
