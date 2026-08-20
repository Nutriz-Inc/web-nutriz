import {
	Fingerprint,
	IdCard,
	LoaderCircle,
	Lock,
	Mail,
	Phone,
	Plus,
	ShieldCheck,
	User as UserIcon,
} from "lucide-react";
import { useState } from "react";
import { PasswordToggle } from "@/components/full/PasswordToggle";
import {
	Sheet,
	SheetContent,
	SheetDescription,
	SheetHeader,
	SheetTitle,
} from "@/components/ui/sheet";
import { cn } from "@/lib/utils";
import { USER_TYPE_LABEL } from "@/utils/constants";
import { formatCpf, formatPhoneNumber } from "@/utils/formatter";
import { EMPTY_FORM, PROFILE_TYPE_OPTIONS } from "../constants";
import {
	type CreateUserFormData,
	type CreateUserFormErrors,
	validateCreateUserForm,
} from "../validation";
import { CreateUserField } from "./CreateUserField";

type CreateUserSheetProps = {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	onSubmit: (form: CreateUserFormData) => void;
	isPending: boolean;
	error?: string;
};

export function CreateUserSheet({
	open,
	onOpenChange,
	onSubmit,
	isPending,
	error,
}: CreateUserSheetProps) {
	const [form, setForm] = useState<CreateUserFormData>(EMPTY_FORM);
	const [errors, setErrors] = useState<CreateUserFormErrors>({});
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);

	function handleChange<K extends keyof CreateUserFormData>(
		field: K,
		value: CreateUserFormData[K],
	) {
		setForm((current) => ({ ...current, [field]: value }));
	}

	function handleOpenChange(next: boolean) {
		if (isPending) return;

		if (!next) {
			setForm(EMPTY_FORM);
			setErrors({});
			setShowPassword(false);
			setShowConfirmPassword(false);
		}

		onOpenChange(next);
	}

	function handleSubmit() {
		const validationErrors = validateCreateUserForm(form);
		setErrors(validationErrors);

		if (Object.keys(validationErrors).length > 0) return;

		onSubmit(form);
	}

	return (
		<Sheet open={open} onOpenChange={handleOpenChange}>
			<SheetContent
				side="bottom"
				className="flex max-h-[92vh] flex-col gap-5 rounded-t-2xl border-none p-5 lg:data-[side=bottom]:inset-x-0 lg:data-[side=bottom]:top-1/2 lg:data-[side=bottom]:bottom-auto lg:data-[side=bottom]:left-1/2 lg:data-[side=bottom]:h-auto lg:data-[side=bottom]:max-h-[min(88vh,46rem)] lg:data-[side=bottom]:w-[680px] lg:data-[side=bottom]:-translate-x-1/2 lg:data-[side=bottom]:-translate-y-1/2 lg:data-[side=bottom]:rounded-card lg:data-[side=bottom]:border lg:data-[side=bottom]:border-line lg:data-[side=bottom]:p-8 lg:data-[side=bottom]:shadow-lift"
			>
				<div className="mx-auto -mt-1 h-1 w-9 shrink-0 rounded-full bg-blue-tint-2 lg:hidden" />

				<SheetHeader className="gap-1 p-0 text-left">
					<SheetTitle className="text-[24px] font-bold text-ink">
						Cadastrar novo usuário
					</SheetTitle>
					<SheetDescription className="text-[13px] text-ink-2">
						Crie um novo acesso para a equipe Lactare
					</SheetDescription>
				</SheetHeader>

				<div className="grid min-h-0 flex-1 gap-x-4 gap-y-5 overflow-y-auto pr-0.5 sm:grid-cols-2">
					<CreateUserField
						id="create-user-name"
						className="sm:col-span-2"
						label="Nome completo"
						icon={UserIcon}
						value={form.name}
						onChange={(value) => handleChange("name", value)}
						placeholder="Digite o nome do usuário"
						error={errors.name}
					/>

					<CreateUserField
						id="create-user-cpf"
						label="CPF"
						icon={IdCard}
						value={form.cpf}
						onChange={(value) => handleChange("cpf", formatCpf(value))}
						placeholder="000.000.000-00"
						inputMode="numeric"
						maxLength={14}
						error={errors.cpf}
					/>

					<CreateUserField
						id="create-user-phone"
						label="Telefone"
						icon={Phone}
						value={form.phone_number}
						onChange={(value) =>
							handleChange("phone_number", formatPhoneNumber(value))
						}
						placeholder="(11) 90000-0000"
						inputMode="tel"
						maxLength={15}
						error={errors.phone_number}
					/>

					<CreateUserField
						id="create-user-email"
						className="sm:col-span-2"
						label="E-mail corporativo"
						icon={Mail}
						value={form.email}
						onChange={(value) => handleChange("email", value)}
						placeholder="nome@lactare.org.br"
						type="email"
						inputMode="email"
						autoComplete="email"
						error={errors.email}
					/>

					<CreateUserField
						id="create-user-password"
						label="Senha"
						icon={Lock}
						value={form.password}
						onChange={(value) => handleChange("password", value)}
						placeholder="Crie uma senha"
						type={showPassword ? "text" : "password"}
						autoComplete="new-password"
						error={errors.password}
						trailing={
							<PasswordToggle
								visible={showPassword}
								onToggle={() => setShowPassword((value) => !value)}
							/>
						}
					/>

					<CreateUserField
						id="create-user-confirm-password"
						label="Confirmar senha"
						icon={Lock}
						value={form.confirmPassword}
						onChange={(value) => handleChange("confirmPassword", value)}
						placeholder="Repita a senha"
						type={showConfirmPassword ? "text" : "password"}
						autoComplete="new-password"
						error={errors.confirmPassword}
						trailing={
							<PasswordToggle
								visible={showConfirmPassword}
								onToggle={() => setShowConfirmPassword((value) => !value)}
							/>
						}
					/>

					<CreateUserField
						id="create-user-identifier"
						className="sm:col-span-2"
						label="Identificador interno"
						icon={Fingerprint}
						value={form.identifier}
						onChange={(value) => handleChange("identifier", value)}
						placeholder="Ex.: matrícula ou crachá"
						optional
						error={errors.identifier}
					/>

					<div className="flex flex-col gap-3 sm:col-span-2">
						<div className="flex items-center gap-1.5">
							<ShieldCheck className="size-3.5 text-ink" />
							<p className="text-[13px] font-semibold text-ink">
								Perfil de acesso
							</p>
						</div>
						<div className="flex items-center gap-2">
							{PROFILE_TYPE_OPTIONS.map((type) => {
								const active = form.type === type;

								return (
									<button
										key={type}
										type="button"
										onClick={() => handleChange("type", type)}
										className={cn(
											"rounded-full px-5 py-2 text-[13px] font-semibold transition-colors",
											active
												? "bg-blue-deep text-white"
												: "border border-line bg-white text-ink",
										)}
									>
										{USER_TYPE_LABEL[type]}
									</button>
								);
							})}
						</div>
					</div>
				</div>

				{error && <p className="text-[12px] text-danger">{error}</p>}

				<div className="flex shrink-0 items-center justify-between gap-3">
					<button
						type="button"
						onClick={() => handleOpenChange(false)}
						disabled={isPending}
						className="flex h-11 w-full items-center justify-center rounded-full border border-line bg-white text-[14px] font-semibold text-ink transition-colors hover:bg-surface-3 disabled:opacity-60"
					>
						Cancelar
					</button>
					<button
						type="button"
						onClick={handleSubmit}
						disabled={isPending}
						className="flex h-11 w-full items-center justify-center gap-2 rounded-full bg-blue-deep text-[14px] font-semibold text-white transition-colors hover:bg-blue disabled:opacity-60"
					>
						{isPending ? (
							<LoaderCircle className="size-[18px] animate-spin" />
						) : (
							<Plus className="size-[18px]" />
						)}
						{isPending ? "Criando..." : "Criar usuário"}
					</button>
				</div>
			</SheetContent>
		</Sheet>
	);
}
