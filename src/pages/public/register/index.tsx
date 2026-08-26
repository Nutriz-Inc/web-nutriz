import { Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import amamentacao from "@/assets/illustrations/amamentacao.svg";
import Wordmark from "@/assets/images/nutriz-logo-branco.svg";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { AddressStep } from "./components/AddressStep";
import { BabyConsentStep } from "./components/BabyConsentStep";
import { PasswordStep } from "./components/PasswordStep";
import { PersonalDataStep } from "./components/PersonalDataStep";
import { ReviewSummary } from "./components/ReviewSummary";
import { StepHeader } from "./components/StepHeader";
import { Stepper } from "./components/Stepper";
import { SuccessCard } from "./components/SuccessCard";
import { WIZARD_STEP_META, WIZARD_STEPS } from "./constants";
import { useRegister } from "./hooks";
import { EMPTY_REGISTER_FORM, makeEmptyBaby } from "./utils";
import {
	type RegisterFieldName,
	type RegisterFormData,
	type RegisterFormErrors,
	STEP_VALIDATORS,
} from "./validation";

export function RegisterScreen() {
	const navigate = useNavigate();

	const [form, setForm] = useState<RegisterFormData>(EMPTY_REGISTER_FORM);
	const [errors, setErrors] = useState<RegisterFormErrors>({});
	const [step, setStep] = useState(0);
	const [maxStep, setMaxStep] = useState(0);
	const [success, setSuccess] = useState(false);
	const [alreadyRegistered, setAlreadyRegistered] = useState(false);

	const { registerMutation } = useRegister({
		setErrors,
		onError: (info) => setAlreadyRegistered(info.alreadyRegistered),
		onSuccess: () => setSuccess(true),
	});

	const isPending = registerMutation.isPending;
	const isLastStep = step === WIZARD_STEPS.length - 1;

	function handleChange(field: RegisterFieldName, value: string) {
		setForm((current) => ({ ...current, [field]: value }));
		setErrors((current) => ({ ...current, [field]: undefined }));
	}

	function handleToggle(field: "hasBaby" | "acceptedTerms", value: boolean) {
		setForm((current) => ({ ...current, [field]: value }));
		setErrors((current) => ({ ...current, [field]: undefined }));
	}

	function handleBabyChange(
		index: number,
		field: "name" | "birthDate",
		value: string,
	) {
		setForm((current) => ({
			...current,
			babies: current.babies.map((baby, babyIndex) =>
				babyIndex === index ? { ...baby, [field]: value } : baby,
			),
		}));
		setErrors((current) => ({
			...current,
			[`baby-${index}-${field}`]: undefined,
		}));
	}

	function handleAddBaby() {
		setForm((current) => ({
			...current,
			babies: [...current.babies, makeEmptyBaby()],
		}));
	}

	function handleRemoveBaby(index: number) {
		setForm((current) => ({
			...current,
			babies: current.babies.filter((_, babyIndex) => babyIndex !== index),
		}));
		setErrors({});
	}

	function goToStep(target: number) {
		setStep(target);
		setMaxStep((current) => Math.max(current, target));
		setErrors({});
		setAlreadyRegistered(false);
	}

	function handleStepClick(target: number) {
		if (target <= step) {
			goToStep(target);
			return;
		}

		const stepErrors = STEP_VALIDATORS[step](form);
		if (Object.keys(stepErrors).length > 0) {
			setErrors(stepErrors);
			return;
		}

		goToStep(target);
	}

	function handleContinue(event: { preventDefault(): void }) {
		event.preventDefault();
		if (isPending) return;

		const stepErrors = STEP_VALIDATORS[step](form);
		if (Object.keys(stepErrors).length > 0) {
			setErrors(stepErrors);
			return;
		}

		if (isLastStep) {
			for (let index = 0; index < STEP_VALIDATORS.length; index++) {
				const previousErrors = STEP_VALIDATORS[index](form);
				if (Object.keys(previousErrors).length > 0) {
					setStep(index);
					setErrors(previousErrors);
					return;
				}
			}

			setErrors({});
			registerMutation.mutate(form);
			return;
		}

		goToStep(step + 1);
	}

	return (
		/*
		 * Coluna unica centrada — a divisao em duas e so do login. A cor vem de
		 * uma faixa azul de largura total no topo, com o cartao do formulario
		 * subindo por cima dela. Assim o cadastro tem o mesmo peso visual do
		 * login sem partir a tela ao meio.
		 */
		<div className="relative isolate flex min-h-dvh flex-col overflow-hidden bg-canvas font-body">
			<header className="gradient-blue relative isolate overflow-hidden pb-20 pt-[calc(1.25rem+env(safe-area-inset-top))] text-white sm:pb-24">
				<span
					aria-hidden="true"
					className="ink-blob -right-24 -top-28 h-72 w-72 bg-blue-bright/40 blur-3xl"
				/>
				<span
					aria-hidden="true"
					className="ink-blob -bottom-24 -left-20 h-64 w-80 bg-eva/25 blur-3xl"
				/>

				<div className="relative mx-auto w-full max-w-[680px] px-4 sm:px-6">
					<div className="flex items-center justify-between gap-4">
						<Link
							to="/"
							className="inline-flex rounded-lg outline-none focus-visible:ring-3 focus-visible:ring-white/50"
							aria-label="Ir para a página inicial"
						>
							<img
								src={Wordmark}
								alt="Nutriz"
								className="h-7 w-auto select-none"
							/>
						</Link>

						<Link
							to="/"
							className="inline-flex h-10 shrink-0 items-center gap-1.5 rounded-full border border-white/20 bg-white/10 px-4 text-[13px] font-semibold text-white outline-none transition-colors hover:bg-white/20 focus-visible:ring-3 focus-visible:ring-white/50"
						>
							<ChevronLeft className="size-4" aria-hidden="true" />
							Voltar
						</Link>
					</div>

					<div className="mt-5 flex items-center gap-5">
						<div className="min-w-0 flex-1">
							<h1 className="font-display text-[26px] font-extrabold leading-[1.1] tracking-tight sm:text-[34px]">
								{success ? (
									<>
										Conta criada.
										<br />
										<span className="text-blue-tint-2">
											Bem-vinda à Nutriz.
										</span>
									</>
								) : (
									<>
										Doar leite
										<br />
										<span className="text-blue-tint-2">começa aqui.</span>
									</>
								)}
							</h1>
							<p className="mt-3 max-w-sm text-[14px] leading-relaxed text-blue-tint-2 sm:text-[15px]">
								{success
									? "Já pode entrar e acompanhar sua primeira doação por aqui."
									: "São quatro etapas rápidas. A equipe Lactare cuida do resto — exames, kit de ordenha e coleta, tudo no seu endereço."}
							</p>
						</div>

						<img
							src={amamentacao}
							alt="Ilustração de uma mãe amamentando seu bebê"
							width={402}
							height={607}
							className="h-24 w-auto shrink-0 select-none drop-shadow-2xl sm:h-32"
						/>
					</div>
				</div>
			</header>

			{/* O cartao sobe por cima da faixa azul: -mt cria a sobreposicao. */}
			<main className="relative -mt-16 mx-auto w-full max-w-[680px] flex-1 px-4 pb-[calc(3rem+env(safe-area-inset-bottom))] sm:-mt-20 sm:px-6">
				<Page>
					{success ? (
						<SuccessCard />
					) : (
						<>
							<form
								noValidate
								onSubmit={handleContinue}
								className="rounded-card overflow-hidden border border-line bg-surface shadow-lift"
							>
								<div className="border-b border-line px-5 pb-4 pt-5 sm:px-7">
									<Stepper
										steps={WIZARD_STEPS}
										current={step}
										maxVisited={maxStep}
										onStepClick={handleStepClick}
									/>
								</div>

								<StepHeader
									icon={WIZARD_STEP_META[step].icon}
									title={WIZARD_STEP_META[step].title}
									description={WIZARD_STEP_META[step].description}
									order={step + 1}
									total={WIZARD_STEPS.length}
								/>

								<div className="p-5 sm:p-7">
									{step === 0 && (
										<PersonalDataStep
											form={form}
											errors={errors}
											onChange={handleChange}
										/>
									)}
									{step === 1 && (
										<AddressStep
											form={form}
											errors={errors}
											onChange={handleChange}
										/>
									)}
									{step === 2 && (
										<PasswordStep
											form={form}
											errors={errors}
											onChange={handleChange}
										/>
									)}
									{step === 3 && (
										<>
											<ReviewSummary form={form} onEdit={goToStep} />
											<BabyConsentStep
												form={form}
												errors={errors}
												onChange={handleChange}
												onToggle={handleToggle}
												onBabyChange={handleBabyChange}
												onAddBaby={handleAddBaby}
												onRemoveBaby={handleRemoveBaby}
											/>
										</>
									)}

									{errors.general && (
										<div
											role="alert"
											className="rounded-card-sm mt-5 flex flex-col items-center gap-3 border border-danger/20 bg-danger-tint px-4 py-3 text-center"
										>
											<p className="text-sm text-danger">{errors.general}</p>
											{alreadyRegistered && (
												<Button
													type="button"
													onClick={() => navigate("/login")}
													className="h-11 rounded-full bg-blue-deep px-6 text-[14px] font-semibold text-white shadow-soft hover:bg-blue"
												>
													Fazer login
												</Button>
											)}
										</div>
									)}
								</div>

								<div className="flex items-center justify-between gap-3 border-t border-line bg-surface-2 px-5 py-4 sm:px-7 sm:py-5">
									{step === 0 ? (
										<button
											type="button"
											onClick={() => navigate("/")}
											className="min-h-11 rounded-full px-4 text-[14px] font-semibold text-ink-2 transition-colors hover:bg-blue-tint hover:text-blue-deep focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
										>
											Cancelar
										</button>
									) : (
										<Button
											type="button"
											onClick={() => goToStep(step - 1)}
											disabled={isPending}
											className="h-11 rounded-full border border-line bg-surface px-5 text-[14px] font-semibold text-ink-2 hover:bg-blue-tint hover:text-blue-deep"
										>
											<ChevronLeft className="size-4" aria-hidden />
											Voltar
										</Button>
									)}

									<Button
										type="submit"
										disabled={isPending}
										className="h-11 rounded-full bg-blue-deep px-6 text-[14px] font-semibold text-white shadow-soft hover:bg-blue disabled:opacity-60"
									>
										{isPending ? (
											<span className="flex items-center gap-2">
												<LoaderCircle className="size-4 animate-spin" />
												Criando conta...
											</span>
										) : isLastStep ? (
											<span className="flex items-center gap-2">
												<Check className="size-4" aria-hidden />
												Criar conta
											</span>
										) : (
											<span className="flex items-center gap-2">
												Continuar
												<ChevronRight className="size-4" aria-hidden />
											</span>
										)}
									</Button>
								</div>
							</form>
						</>
					)}

					<p className="mt-4 text-center text-[14px] text-ink-2">
						Já tem uma conta?{" "}
						<Link
							to="/login"
							className="font-semibold text-blue-deep underline-offset-2 hover:underline"
						>
							Entrar
						</Link>
					</p>
				</Page>
			</main>
		</div>
	);
}
