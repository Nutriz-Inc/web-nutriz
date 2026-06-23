import { useState } from "react";

import { Link } from "react-router-dom";
import { Eye, EyeOff, Mail, LoaderCircle } from "lucide-react";
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

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [errors, setErrors] = useState<FormErrors>({});

    const { loginMutation } = useLogin({ updateAuth, setErrors });

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
		loginMutation.mutate({ document: email, password });
	}

	const isPending = loginMutation.isPending;

	return (
		<div className="min-h-screen bg-[#eef3ff] relative overflow-hidden flex justify-center">
			{/* Decorative circles */}
			{/* Top-left: pink */}
			<div className="absolute -top-12 -left-12 w-36 h-36 rounded-full bg-[#f4a8be] opacity-80 pointer-events-none" />
			{/* Top-right: blue */}
			<div className="absolute -top-4 -right-10 w-32 h-32 rounded-full bg-[#a4c4e8] opacity-70 pointer-events-none" />
			{/* Right upper-middle: peach */}
			<div
				className="absolute -right-12 w-44 h-44 rounded-full bg-[#f4c4a0] opacity-65 pointer-events-none"
				style={{ top: "32%" }}
			/>
			{/* Left middle: lavender */}
			<div
				className="absolute -left-14 w-40 h-40 rounded-full bg-[#c8b0f0] opacity-45 pointer-events-none"
				style={{ top: "50%" }}
			/>
			{/* Bottom-left: teal */}
			<div className="absolute -bottom-10 -left-10 w-36 h-36 rounded-full bg-[#9cd4e0] opacity-55 pointer-events-none" />
			{/* Bottom-right: yellow-soft */}
			<div className="absolute -bottom-8 -right-8 w-28 h-28 rounded-full bg-[#f8e0a0] opacity-60 pointer-events-none" />
			{/* Top-center small: soft-green */}
			<div className="absolute top-[8%] left-[42%] w-14 h-14 rounded-full bg-[#b0e8cc] opacity-50 pointer-events-none" />

			{/* Main column */}
			<div className="relative z-10 w-full max-w-[460px] min-h-screen flex flex-col">
				{/* Content area */}
				<div className="flex-1 flex flex-col items-center px-6 pt-10 pb-4">
					{/* Logo – centered and larger */}
					<div className="mb-7 flex justify-center">
						<img src={NutrizLogo} alt="Nutriz" className="h-14 w-auto" />
					</div>

					{/* Heading – centered */}
					<h1 className="text-[1.65rem] font-bold text-[#1b2e6e] mb-1.5 leading-tight text-center">
						Bem-vinda(o) de volta!
					</h1>
					<p className="text-sm text-[#5a6e8c] mb-8 text-center">
						Faça login para acessar sua conta
					</p>

					{/* Login card / divider */}
					<div className="w-full bg-white/75 backdrop-blur-md rounded-3xl border border-white shadow-xl shadow-[#1b2e6e]/10 px-6 py-7">
						<form
							onSubmit={handleSubmit}
							noValidate
							className="flex flex-col gap-4"
						>
							{/* Email field */}
							<div className="flex flex-col gap-1.5">
								<Label
									htmlFor="email"
									className="text-[#3a4a62] font-semibold text-sm"
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
										aria-describedby={
											errors.email ? "email-error" : undefined
										}
										className="w-full h-12 rounded-full border bg-white pl-4 pr-11 text-sm text-[#1b2e6e] placeholder:text-[#a0aec0] outline-none transition-all border-[#c8d8f0] focus:border-[#1b2e6e] focus:ring-2 focus:ring-[#1b2e6e]/15 aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-200"
									/>
									<Mail
										className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#a0b4cc] pointer-events-none"
										aria-hidden
									/>
								</div>
								{errors.email && (
									<p
										id="email-error"
										className="text-xs text-red-500 pl-1"
									>
										{errors.email}
									</p>
								)}
							</div>

							{/* Password field */}
							<div className="flex flex-col gap-1.5">
								<Label
									htmlFor="password"
									className="text-[#3a4a62] font-semibold text-sm"
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
										className="w-full h-12 rounded-full border bg-white pl-4 pr-11 text-sm text-[#1b2e6e] placeholder:text-[#a0aec0] outline-none transition-all border-[#c8d8f0] focus:border-[#1b2e6e] focus:ring-2 focus:ring-[#1b2e6e]/15 aria-invalid:border-red-400 aria-invalid:ring-2 aria-invalid:ring-red-200"
									/>
									<button
										type="button"
										onClick={() => setShowPassword((v) => !v)}
										aria-label={
											showPassword ? "Ocultar senha" : "Mostrar senha"
										}
										className="absolute right-4 top-1/2 -translate-y-1/2 text-[#a0b4cc] hover:text-[#1b2e6e] transition-colors"
									>
										{showPassword ? (
											<EyeOff className="size-4" />
										) : (
											<Eye className="size-4" />
										)}
									</button>
								</div>
								{errors.password && (
									<p
										id="password-error"
										className="text-xs text-red-500 pl-1"
									>
										{errors.password}
									</p>
								)}
							</div>

							{/* Forgot password */}
							<div className="flex justify-center">
								<Link
									to="/forgot-password"
									className="text-sm text-[#2b5fd4] font-semibold hover:underline underline-offset-2"
								>
									Esqueci minha senha
								</Link>
							</div>

							{/* General error */}
							{errors.general && (
								<p
									role="alert"
									className="text-sm text-red-500 text-center bg-red-50 border border-red-200 rounded-xl py-2 px-4"
								>
									{errors.general}
								</p>
							)}

							{/* Submit */}
							<Button
								type="submit"
								disabled={isPending}
								className="w-full h-12 rounded-full bg-[#1b2e6e] hover:bg-[#152558] active:bg-[#0f1c42] text-white text-base font-semibold transition-all active:scale-[0.98] disabled:opacity-60 mt-1"
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

					{/* Sign-up link */}
					<p className="text-sm text-center text-[#5a6e8c] mt-6">
						Ainda não tem uma conta?{" "}
						<Link
							to="/register"
							className="text-[#2b5fd4] font-bold hover:underline underline-offset-2"
						>
							Criar conta
						</Link>
					</p>
				</div>
			</div>
		</div>
	);
}