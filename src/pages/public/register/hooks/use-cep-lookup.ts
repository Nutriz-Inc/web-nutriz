/* eslint-disable react-hooks/set-state-in-effect */
import { useEffect, useState } from "react";
import { onlyDigits } from "@/utils/formatter";

export type CepAddress = {
	street: string;
	neighborhood: string;
	city: string;
	state: string;
};

export type CepLookupStatus = "idle" | "loading" | "found" | "not_found";

type BrasilApiCep = {
	street?: string;
	neighborhood?: string;
	city?: string;
	state?: string;
};

type ViaCepCep = {
	erro?: boolean | string;
	logradouro?: string;
	bairro?: string;
	localidade?: string;
	uf?: string;
};

async function buscaCep(
	digits: string,
	signal: AbortSignal,
): Promise<CepAddress | null> {
	try {
		const response = await fetch(
			`https://brasilapi.com.br/api/cep/v2/${digits}`,
			{ signal },
		);

		if (response.ok) {
			const data = (await response.json()) as BrasilApiCep;

			return {
				street: data.street ?? "",
				neighborhood: data.neighborhood ?? "",
				city: data.city ?? "",
				state: data.state ?? "",
			};
		}
	} catch (error) {
		if (signal.aborted) throw error;
	}

	try {
		const response = await fetch(`https://viacep.com.br/ws/${digits}/json/`, {
			signal,
		});

		if (!response.ok) return null;

		const data = (await response.json()) as ViaCepCep;

		if (data.erro) return null;

		return {
			street: data.logradouro ?? "",
			neighborhood: data.bairro ?? "",
			city: data.localidade ?? "",
			state: data.uf ?? "",
		};
	} catch (error) {
		if (signal.aborted) throw error;
	}

	return null;
}

export function useCepLookup(cep: string) {
	const [status, setStatus] = useState<CepLookupStatus>("idle");
	const [address, setAddress] = useState<CepAddress | null>(null);

	useEffect(() => {
		const digits = onlyDigits(cep);

		if (digits.length !== 8) {
			setStatus("idle");
			setAddress(null);
			return;
		}

		const controller = new AbortController();
		setStatus("loading");

		buscaCep(digits, controller.signal)
			.then((found) => {
				if (controller.signal.aborted) return;

				if (!found) {
					setStatus("not_found");
					setAddress(null);
					return;
				}

				setAddress(found);
				setStatus("found");
			})
			.catch(() => {
				if (controller.signal.aborted) return;
				setStatus("not_found");
				setAddress(null);
			});

		return () => controller.abort();
	}, [cep]);

	return { status, address };
}
