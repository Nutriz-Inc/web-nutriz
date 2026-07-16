import { Check, ChevronLeft, ChevronRight, LoaderCircle } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { AddressStep } from "./components/AddressStep";
import { BabyConsentStep } from "./components/BabyConsentStep";
import { WIZARD_STEPS } from "./components/constants";
import { PasswordStep } from "./components/PasswordStep";
import { PersonalDataStep } from "./components/PersonalDataStep";
import { ReviewSummary } from "./components/ReviewSummary";
import { Stepper } from "./components/Stepper";
import { SuccessCard } from "./components/SuccessCard";
import { useRegister } from "./hooks";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "./types";
import { EMPTY_REGISTER_FORM, makeEmptyBaby } from "./utils";
import { STEP_VALIDATORS } from "./validation";

export function RegisterScreen() {
	const navigate = useNavigate();

	const [form, setForm] = useState<RegisterFormData>(EMPTY_REGISTER_FORM);
	const [errors, setErrors] = useState<RegisterFormErrors>({});
	const [step, setStep] = useState(0);
	const [maxStep, setMaxStep] = useState(0);
	const [success, setSuccess] = useState<{ babiesPending: boolean } | null>(
		null,
	);
	const [alreadyRegistered, setAlreadyRegistered] = useState(false);

	const { registerMutation } = useRegister({
		setErrors,
		onError: (info) => setAlreadyRegistered(info.alreadyRegistered),
		onSuccess: (babiesPending) => setSuccess({ babiesPending }),
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
		<div className="flex min-h-screen flex-col bg-[#eef2f7]">
			<header className="flex h-14 items-center bg-[#0d3b6e] px-4 text-white">
				<button
					type="button"
					onClick={() => navigate("/")}
					className="flex min-h-11 items-center gap-2 rounded-md pr-3 text-[15px] font-semibold focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white"
				>
					<ChevronLeft className="size-5" aria-hidden />
					Criar conta
				</button>
			</header>

			<main className="mx-auto w-full max-w-[640px] flex-1 px-4 pt-8 pb-12">
				{success ? (
					<SuccessCard babiesPending={success.babiesPending} />
				) : (
					<>
						<h1 className="text-[22px] font-bold text-[#09090b]">
							Criação de usuário
						</h1>
						<p className="mt-1 text-sm text-[#71717a]">
							Preencha seus dados para começar a doar. Leva menos de 2 minutos.
						</p>

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
							className="mt-6 overflow-hidden rounded-xl border border-[#e4e4e7] bg-white shadow-sm"
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
										<p className="text-sm text-[#dc2626]">{errors.general}</p>
										{alreadyRegistered && (
											<Button
												type="button"
												onClick={() => navigate("/login")}
												className="h-10 rounded-md bg-[#0d3b6e] px-5 text-sm font-semibold text-white hover:bg-[#0a2e56]"
											>
												Fazer login
											</Button>
										)}
									</div>
								)}
							</div>

							<div className="flex items-center justify-between border-t border-[#e4e4e7] bg-[#fafafa] px-7 py-5">
								{step === 0 ? (
									<button
										type="button"
										onClick={() => navigate("/")}
										className="min-h-11 rounded-md px-2 text-sm font-medium text-[#71717a] transition-colors hover:text-[#09090b] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3b6e]"
									>
										Cancelar
									</button>
								) : (
									<Button
										type="button"
										onClick={() => goToStep(step - 1)}
										disabled={isPending}
										className="h-11 rounded-md border border-[#e4e4e7] bg-white px-4 text-sm font-medium text-[#09090b] hover:bg-[#f4f4f5]"
									>
										<ChevronLeft className="size-4" aria-hidden />
										Voltar
									</Button>
								)}

								<Button
									type="submit"
									disabled={isPending}
									className="h-11 rounded-md bg-[#0d3b6e] px-5 text-sm font-semibold text-white hover:bg-[#0a2e56] disabled:opacity-60"
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
			</main>
		</div>
	);
}
