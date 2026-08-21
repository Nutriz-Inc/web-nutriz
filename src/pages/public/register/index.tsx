import { Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { AddressStep } from "./components/AddressStep";
import { BabyConsentStep } from "./components/BabyConsentStep";
import { PasswordStep } from "./components/PasswordStep";
import { PersonalDataStep } from "./components/PersonalDataStep";
import { RegisterBrandPanel } from "./components/RegisterBrandPanel";
import { ReviewSummary } from "./components/ReviewSummary";
import { Stepper } from "./components/Stepper";
import { SuccessCard } from "./components/SuccessCard";
import { WIZARD_STEPS } from "./constants";
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
		 * Mesmo molde da tela de login: marca a esquerda, conteudo a direita,
		 * pilha no mobile. No desktop o painel fica fixo (`lg:sticky`) enquanto
		 * o formulario rola, para a trilha de etapas estar sempre a vista.
		 */
		<div className="flex min-h-dvh flex-col bg-canvas font-body lg:flex-row lg:items-start">
			<RegisterBrandPanel
				step={step}
				maxVisited={maxStep}
				success={success}
				onStepClick={handleStepClick}
			/>

			{/*
			 * `m-auto` no filho, e nao `items-center` no pai: centraliza na vertical
			 * sem cortar o topo quando a etapa e alta (a de revisao, com bebes e
			 * termos, passa da altura da tela).
			 */}
			<main className="flex w-full flex-1 px-4 pb-[calc(3rem+env(safe-area-inset-bottom))] pt-7 sm:px-6 lg:min-h-dvh lg:px-10 lg:py-12">
				<div className="m-auto w-full max-w-[620px]">
					<Page>
						{success ? (
							<SuccessCard />
						) : (
							<>
								<div>
									<h2 className="font-display text-[24px] font-extrabold tracking-tight text-ink lg:text-[28px]">
										Criar sua conta
									</h2>
									<p className="mt-1.5 text-[14px] text-ink-2">
										Preencha seus dados para começar a doar. Leva menos de 2
										minutos.
									</p>
								</div>

								{/* Progresso do mobile: no desktop quem mostra e o painel. */}
								<div className="mt-6 lg:hidden">
									<Stepper
										steps={WIZARD_STEPS}
										current={step}
										maxVisited={maxStep}
										onStepClick={handleStepClick}
									/>
								</div>

								<form
									noValidate
									onSubmit={handleContinue}
									className="rounded-card mt-6 overflow-hidden border border-line bg-surface shadow-soft"
								>
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
					</Page>
				</div>
			</main>
		</div>
	);
}
