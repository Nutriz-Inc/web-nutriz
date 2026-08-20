import { ArrowLeft, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import cenarioLogin from "@/assets/illustrations/cenario-login.svg";
import NutrizLogo from "@/assets/images/nutriz-logo.svg";
import { FormField } from "@/components/full/FormField";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { useLogin } from "./hooks";

export type FormErrors = {
	email?: string;
	password?: string;
	general?: string;
};

export function LoginScreen() {
	const { updateAuth } = useAuth();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});

	const { loginMutation } = useLogin({
		updateAuth,
		setErrors,
	});

	function validate(): boolean {
		const next: FormErrors = {};

		if (!email.trim()) {
			next.email = "E-mail é obrigatório.";
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			next.email = "Informe um e-mail válido.";
		}

		if (!password.trim()) {
			next.password = "Senha é obrigatória.";
		} else if (password.length < 6) {
			next.password = "A senha deve ter no mínimo 6 caracteres.";
		}

		setErrors(next);
		return Object.keys(next).length === 0;
	}

	function handleSubmit(e: { preventDefault(): void }) {
		e.preventDefault();
		if (!validate()) return;
		setErrors({});
		loginMutation.mutate({ email, password });
	}

	const isPending = loginMutation.isPending;

	return (
		<div className="relative min-h-screen w-full overflow-hidden bg-gradient-to-b from-white via-canvas to-blue-tint font-body">
			<img
				src={cenarioLogin}
				alt=""
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 mx-auto w-[170%] max-w-none -translate-x-[20%] select-none opacity-50 sm:w-full sm:max-w-[1100px] sm:translate-x-0"
			/>

			<div
				aria-hidden
				className="pointer-events-none absolute inset-0 z-0 overflow-hidden"
			>
				<div className="absolute top-[18%] -left-12 h-64 w-64 rounded-full bg-blue-tint-2" />
				<div className="absolute top-[34%] left-[22%] h-32 w-32 rounded-full bg-eva-tint" />
				<div className="absolute top-[12%] -right-10 h-72 w-72 rounded-full bg-blue-tint" />
				<div className="absolute top-[42%] right-[20%] h-40 w-40 rounded-full bg-eva-tint" />
				<div className="absolute top-[8%] right-[32%] h-24 w-24 rounded-full bg-blue-tint-2" />
			</div>

			<main className="relative z-10 mx-auto flex min-h-screen w-full max-w-sm flex-col px-6 pb-52 pt-24">
				<div className="mb-5 flex justify-center">
					<img
						src={NutrizLogo}
						alt="Nutriz"
						className="h-14 w-auto select-none"
					/>
				</div>

				<h1 className="text-center font-display text-[26px] font-bold text-blue-deep">
					Bem-vinda(o) de volta!
				</h1>
				<p className="mt-1 text-center text-[14px] text-ink-2">
					Faça login para acessar sua conta
				</p>

				<div className="mt-6 border-t border-line" />

				<div className="mt-6 rounded-card border border-white/60 bg-white/60 p-6 shadow-soft backdrop-blur-md">
					<form
						className="flex flex-col gap-5"
						onSubmit={handleSubmit}
						noValidate
					>
						<FormField
							id="email"
							label="E-mail"
							type="email"
							inputMode="email"
							autoComplete="email"
							value={email}
							onChange={setEmail}
							placeholder="Digite seu e-mail"
							error={errors.email}
						/>

						<FormField
							id="password"
							label="Senha"
							type={showPassword ? "text" : "password"}
							autoComplete="current-password"
							value={password}
							onChange={setPassword}
							placeholder="Digite sua senha"
							error={errors.password}
							trailing={
								<button
									type="button"
									onClick={() => setShowPassword((v) => !v)}
									aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
									className="text-ink-3 transition-colors hover:text-ink-2"
								>
									{showPassword ? (
										<EyeOff className="size-5" />
									) : (
										<Eye className="size-5" />
									)}
								</button>
							}
						/>

						{errors.general && (
							<p
								role="alert"
								className="rounded-xl border border-danger/20 bg-danger-tint px-4 py-2 text-center text-[13px] text-danger"
							>
								{errors.general}
							</p>
						)}

						<Button
							type="submit"
							size="pill"
							disabled={isPending}
							className="w-full bg-blue-deep text-white hover:bg-blue disabled:opacity-60"
						>
							{isPending ? (
								<span className="flex items-center gap-2">
									<LoaderCircle className="size-4 animate-spin" />
									Entrando...
								</span>
							) : (
								"Entrar"
							)}
						</Button>
					</form>
				</div>

				<div className="mt-6 border-t border-line" />

				<p className="mt-5 text-center text-[14px] text-ink-2">
					<Link
						to="/"
						className="inline-flex items-center gap-1 font-semibold text-blue underline-offset-2 hover:underline"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						Voltar para a página inicial
					</Link>
				</p>

				<p className="mt-2 text-center text-[14px] text-ink-2">
					Ainda não tem uma conta?{" "}
					<Link
						to="/registro"
						className="font-semibold text-blue underline-offset-2 hover:underline"
					>
						Criar conta
					</Link>
				</p>
			</main>
		</div>
	);
}
