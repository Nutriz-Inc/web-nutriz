import { Eye, EyeOff, LoaderCircle, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import LoginBg from "@/assets/login-bg.svg";
import NutrizLogo from "@/assets/nutriz-logo.svg";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/hooks/use-auth";
import { useLogin } from "./hooks";

export type FormErrors = {
	email?: string;
	password?: string;
	general?: string;
};

export function LoginScreen() {
	const { updateAuth } = useAuth();
	const navigate = useNavigate();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});

	const { loginMutation } = useLogin({
		updateAuth,
		setErrors,
		onSuccess: () => navigate("/home"),
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
		<div className="relative min-h-screen w-full overflow-hidden bg-white">
			<img
				src={LoginBg}
				alt=""
				aria-hidden
				className="pointer-events-none absolute inset-x-0 bottom-0 z-0 w-full select-none"
			/>

			<div
				aria-hidden
				className="pointer-events-none absolute inset-x-0 top-0 z-0 h-64 overflow-hidden"
			>
				<div className="absolute -left-16 -top-12 h-44 w-44 rounded-full bg-[#cfe0f8]" />
				<div className="absolute left-7 top-16 h-16 w-16 rounded-full bg-[#f6d4dc]" />
				<div className="absolute -right-12 -top-14 h-52 w-52 rounded-full bg-[#dbe7fb]" />
				<div className="absolute right-5 top-24 h-20 w-20 rounded-full bg-[#f6d4dc]" />
				<div className="absolute right-24 top-4 h-12 w-12 rounded-full bg-[#cfe0f8]" />
			</div>

			<div className="relative z-10 mx-auto flex min-h-screen w-full max-w-sm flex-col px-6 pb-52 pt-24">
				<div className="mb-5 flex justify-center">
					<img
						src={NutrizLogo}
						alt="Nutriz"
						className="h-14 w-auto select-none"
					/>
				</div>

				<h1 className="text-center text-2xl font-bold text-[#16224a]">
					Bem-vinda(o) de volta!
				</h1>
				<p className="mt-1 text-center text-sm text-[#54648a]">
					Faça login para acessar sua conta
				</p>

				<div className="mt-6 border-t border-[#e2e7f1]" />

				<div className="mt-6 rounded-2xl border border-white/60 bg-white/60 backdrop-blur-md shadow-lg shadow-[#0B57B8]/8 px-5 py-6">
					<form
						className="flex flex-col gap-5"
						onSubmit={handleSubmit}
						noValidate
					>
						<div className="flex flex-col gap-2">
							<Label
								htmlFor="email"
								className="text-xs font-semibold text-[#2e3c5e]"
							>
								E-mail
							</Label>
							<div className="relative">
								<input
									id="email"
									type="email"
									autoComplete="email"
									value={email}
									onChange={(e) => setEmail(e.target.value)}
									placeholder="Digite seu e-mail"
									aria-invalid={!!errors.email}
									aria-describedby={errors.email ? "email-error" : undefined}
									className="w-full h-11 rounded-full border border-[#e2e7f1] bg-white pl-4 pr-11 text-sm text-[#16224a] placeholder:text-[#9aa3b8] outline-none transition-all focus:border-[#0B57B8] focus:ring-2 focus:ring-[#0B57B8]/15 aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-200"
								/>
								<Mail
									className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9aa3b8]"
									aria-hidden
								/>
							</div>
							{errors.email && (
								<p id="email-error" className="text-xs text-red-500 pl-1">
									{errors.email}
								</p>
							)}
						</div>

						<div className="flex flex-col gap-2">
							<Label
								htmlFor="password"
								className="text-xs font-semibold text-[#2e3c5e]"
							>
								Senha
							</Label>
							<div className="relative">
								<input
									id="password"
									type={showPassword ? "text" : "password"}
									autoComplete="current-password"
									value={password}
									onChange={(e) => setPassword(e.target.value)}
									placeholder="Digite sua senha"
									aria-invalid={!!errors.password}
									aria-describedby={
										errors.password ? "password-error" : undefined
									}
									className="w-full h-11 rounded-full border border-[#e2e7f1] bg-white pl-4 pr-11 text-sm text-[#16224a] placeholder:text-[#9aa3b8] outline-none transition-all focus:border-[#0B57B8] focus:ring-2 focus:ring-[#0B57B8]/15 aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-200"
								/>
								<button
									type="button"
									onClick={() => setShowPassword((v) => !v)}
									aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
									className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9aa3b8] transition-colors hover:text-[#54648a]"
								>
									{showPassword ? (
										<EyeOff className="h-5 w-5" />
									) : (
										<Eye className="h-5 w-5" />
									)}
								</button>
							</div>
							{errors.password && (
								<p id="password-error" className="text-xs text-red-500 pl-1">
									{errors.password}
								</p>
							)}
						</div>

						{/* <div className="flex justify-center">
						<Link
							to="/forgot-password"
							className="text-xs font-semibold text-[#1c5fd0] hover:underline underline-offset-2"
						>
							Esqueci minha senha
						</Link>
					</div> */}

						{errors.general && (
							<p
								role="alert"
								className="text-sm text-red-500 text-center bg-red-50 border border-red-200 rounded-xl py-2 px-4"
							>
								{errors.general}
							</p>
						)}

						<Button
							type="submit"
							disabled={isPending}
							className="h-12 w-full rounded-full bg-[#0B57B8] text-sm font-medium text-white shadow-[0px_8px_18px_0px_rgba(11,87,184,0.3)] hover:bg-[#0a4ea4] active:scale-[0.98] disabled:opacity-60 transition-all"
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

				<div className="mt-6 border-t border-[#e2e7f1]" />

				<p className="mt-5 text-center text-sm text-[#54648a]">
					Ainda não tem uma conta?{" "}
					<Link
						to="/register"
						className="font-semibold text-[#1c5fd0] hover:underline underline-offset-2"
					>
						Criar conta
					</Link>
				</p>
			</div>
		</div>
	);
}
