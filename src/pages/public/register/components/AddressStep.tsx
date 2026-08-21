import { Hash, LoaderCircle, MapPin, Signpost } from "lucide-react";
import { FormField } from "@/components/full/FormField";
import { formatZipCode } from "@/utils/formatter";
import { useCepLookup } from "../hooks/use-cep-lookup";
import type {
	RegisterFieldName,
	RegisterFormData,
	RegisterFormErrors,
} from "../validation";

type AddressStepProps = {
	form: RegisterFormData;
	errors: RegisterFormErrors;
	onChange: (field: RegisterFieldName, value: string) => void;
};

export function AddressStep({ form, errors, onChange }: AddressStepProps) {
	const { status, address } = useCepLookup(form.cep);

	return (
		<fieldset className="flex flex-col gap-5">
			<legend className="sr-only">Endereço</legend>

			<div className="grid gap-5 sm:grid-cols-2">
				<FormField
					id="register-cep"
					leading={<MapPin />}
					label="CEP"
					value={form.cep}
					onChange={(value) => onChange("cep", formatZipCode(value))}
					placeholder="00000-000"
					error={errors.cep}
					inputMode="numeric"
					maxLength={9}
					autoComplete="postal-code"
				/>
				<FormField
					id="register-number"
					leading={<Hash />}
					label="Número"
					value={form.number}
					onChange={(value) => onChange("number", value)}
					placeholder="1543"
					error={errors.number}
					inputMode="numeric"
					maxLength={10}
				/>
			</div>

			{status === "loading" && (
				<p className="flex items-center gap-2 text-sm text-ink-2">
					<LoaderCircle className="size-4 animate-spin" aria-hidden />
					Buscando endereço...
				</p>
			)}

			{status === "found" && address && (
				<div className="flex items-start gap-3 rounded-md border border-blue-tint-2 bg-canvas px-4 py-3">
					<MapPin
						className="mt-0.5 size-4 shrink-0 text-blue-deep"
						aria-hidden
					/>
					<p className="text-sm leading-relaxed text-blue-deep">
						<span className="font-semibold">
							{[address.street, address.neighborhood]
								.filter(Boolean)
								.join(", ")}
						</span>
						{(address.street || address.neighborhood) && <br />}
						{address.city}/{address.state}
					</p>
				</div>
			)}

			{status === "not_found" && (
				<p className="text-sm text-danger">
					CEP não encontrado. Confira o número digitado.
				</p>
			)}

			<FormField
				id="register-complement"
				leading={<Signpost />}
				label="Complemento"
				value={form.complement}
				onChange={(value) => onChange("complement", value)}
				placeholder="Apto, bloco..."
				error={errors.complement}
				maxLength={150}
				optional
			/>

			<p className="text-xs text-ink-2">
				Rua, bairro e cidade são preenchidos automaticamente pelo CEP.
			</p>
		</fieldset>
	);
}
