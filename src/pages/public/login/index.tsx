import { ArrowLeft, Eye, EyeOff, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

import { FormField } from "@/components/full/FormField";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/use-auth";
import { BrandPanel } from "./components/BrandPanel";
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
		/*
		 * Duas colunas deitadas no desktop (marca a esquerda, formulario a
		 * direita) e uma pilha no mobile: faixa da marca em cima, formulario
		 * embaixo. O formulario nunca divide espaco com ilustracao no celular,
		 * entao o teclado nao empurra nada para fora da tela.
		 */
		<div className="flex min-h-dvh flex-col bg-canvas font-body lg:flex-row">
			<BrandPanel />

			<main className="flex flex-1 items-center justify-center px-5 pb-[calc(2rem+env(safe-area-inset-bottom))] pt-9 sm:px-8 lg:px-10 lg:py-12">
				<div className="w-full max-w-[400px]">
					<h2 className="font-display text-[24px] font-extrabold tracking-tight text-ink lg:text-[28px]">
						Bem-vinda(o) de volta
					</h2>
					<p className="mt-1.5 text-[14px] text-ink-2">
						Use o e-mail e a senha do seu cadastro.
					</p>

					<form
						className="mt-7 flex flex-col gap-5"
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
								className="rounded-card-sm border border-danger/20 bg-danger-tint px-4 py-2.5 text-center text-[13px] text-danger"
							>
								{errors.general}
							</p>
						)}

						<Button
							type="submit"
							size="pill"
							disabled={isPending}
							className="mt-1 w-full bg-blue-deep font-semibold text-white shadow-soft hover:bg-blue disabled:opacity-60"
						>
							{isPending ? (
								<>
									<LoaderCircle className="animate-spin" />
									Entrando...
								</>
							) : (
								"Entrar"
							)}
						</Button>
					</form>

					<div className="mt-8 rounded-card border border-line bg-surface p-4 text-center shadow-soft">
						<p className="text-[14px] text-ink-2">Ainda não tem uma conta?</p>
						<Link
							to="/registro"
							className="mt-2 inline-flex h-11 w-full items-center justify-center rounded-full border border-line bg-blue-tint text-[15px] font-semibold text-blue-deep outline-none transition-colors hover:bg-blue-tint-2/60 focus-visible:ring-3 focus-visible:ring-blue-bright/50"
						>
							Criar conta
						</Link>
					</div>

					<Link
						to="/"
						className="mx-auto mt-6 flex w-fit items-center gap-1.5 rounded-full px-3 py-1.5 text-[14px] font-semibold text-ink-3 outline-none transition-colors hover:bg-blue-tint hover:text-blue-deep focus-visible:ring-3 focus-visible:ring-blue-bright/50"
					>
						<ArrowLeft className="size-4" aria-hidden="true" />
						Voltar para a página inicial
					</Link>
				</div>
			</main>
		</div>
	);
}
