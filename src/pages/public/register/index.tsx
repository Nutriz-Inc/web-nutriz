import { Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AppHeader } from "@/components/layout/AppHeader";
import { Page } from "@/components/layout/Page";
import { Button } from "@/components/ui/button";
import { AddressStep } from "./components/AddressStep";
import { BabyConsentStep } from "./components/BabyConsentStep";
import { PasswordStep } from "./components/PasswordStep";
import { PersonalDataStep } from "./components/PersonalDataStep";
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
		<div className="relative isolate flex min-h-screen flex-col overflow-hidden bg-canvas font-body">
			<span
				aria-hidden="true"
				className="ink-blob -left-40 -top-48 h-[30rem] w-[30rem] bg-blue-tint-2/50 blur-3xl"
			/>
			<span
				aria-hidden="true"
				className="ink-blob -right-40 top-[30rem] h-[26rem] w-[26rem] bg-eva-tint/80 blur-3xl"
			/>

			<AppHeader showMenu={false} />

			<main className="relative mx-auto w-full max-w-[640px] flex-1 px-4 pb-16 pt-4 sm:px-6 sm:pt-6">
				<Page
					backTo="/"
					title={success ? undefined : "Criação de usuário"}
					description={
						success
							? undefined
							: "Preencha seus dados para começar a doar. Leva menos de 2 minutos."
					}
				>
					{success ? (
						<SuccessCard />
					) : (
						<>
							<div className="mt-6">
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
								className="mt-6 overflow-hidden rounded-card-sm border border-line bg-white shadow-soft"
							>
								<div className="p-7">
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
											className="mt-5 flex flex-col items-center gap-3 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-center"
										>
											<p className="text-sm text-danger">{errors.general}</p>
											{alreadyRegistered && (
												<Button
													type="button"
													onClick={() => navigate("/login")}
													className="h-11 rounded-md bg-blue-deep px-5 text-sm font-semibold text-white hover:bg-blue"
												>
													Fazer login
												</Button>
											)}
										</div>
									)}
								</div>

								<div className="flex items-center justify-between border-t border-line bg-surface-2 px-7 py-5">
									{step === 0 ? (
										<button
											type="button"
											onClick={() => navigate("/")}
											className="min-h-11 rounded-md px-2 text-sm font-medium text-ink-2 transition-colors hover:text-ink focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-deep"
										>
											Cancelar
										</button>
									) : (
										<Button
											type="button"
											onClick={() => goToStep(step - 1)}
											disabled={isPending}
											className="h-11 rounded-md border border-line bg-white px-4 text-sm font-medium text-ink hover:bg-surface-2"
										>
											<ChevronLeft className="size-4" aria-hidden />
											Voltar
										</Button>
									)}

									<Button
										type="submit"
										disabled={isPending}
										className="h-11 rounded-md bg-blue-deep px-5 text-sm font-semibold text-white hover:bg-blue disabled:opacity-60"
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
			</main>
		</div>
	);
}
