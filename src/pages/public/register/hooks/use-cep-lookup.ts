import { useEffect, useState } from "react";
import { onlyDigits } from "@/utils/formatter";

export type CepAddress = {
	street: string;
	neighborhood: string;
	city: string;
	state: string;
};

export type CepLookupStatus = "idle" | "loading" | "found" | "not_found";

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

		fetch(`https://brasilapi.com.br/api/cep/v2/${digits}`, {
			signal: controller.signal,
		})
			.then((response) => {
				if (!response.ok) throw new Error("cep_not_found");
				return response.json();
			})
			.then((data) => {
				setAddress({
					street: data.street ?? "",
					neighborhood: data.neighborhood ?? "",
					city: data.city ?? "",
					state: data.state ?? "",
				});
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
