import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";

const DESTAQUE_MS = 2600;

const AVISO: Partial<
	Record<
		EnumDonationStepStatus,
		{ texto: (nome: string) => string; tipo: "success" | "error" | "info" }
	>
> = {
	[EnumDonationStepStatus.Done]: {
		texto: (nome) => `Etapa concluída: ${nome}`,
		tipo: "success",
	},
	[EnumDonationStepStatus.Failed]: {
		texto: (nome) => `Etapa reprovada: ${nome}`,
		tipo: "error",
	},
	[EnumDonationStepStatus.Review]: {
		texto: (nome) => `Etapa em análise: ${nome}`,
		tipo: "info",
	},
	[EnumDonationStepStatus.Warn]: {
		texto: (nome) => `Etapa precisa de atenção: ${nome}`,
		tipo: "info",
	},
};

export function useStepAlerts(steps: DonationStep[] | undefined) {
	const anterior = useRef<Map<string, EnumDonationStepStatus> | null>(null);
	const [destacadas, setDestacadas] = useState<ReadonlySet<string>>(
		() => new Set(),
	);

	useEffect(() => {
		if (!steps) {
			return;
		}

		const atual = new Map(
			steps.map((step) => [step.id_donation_step, step.status]),
		);
		const primeiraLeitura = anterior.current === null;
		const antes = anterior.current;
		anterior.current = atual;

		if (primeiraLeitura || !antes) {
			return;
		}

		const mudancas = steps.filter((step) => {
			const estadoAnterior = antes.get(step.id_donation_step);
			return estadoAnterior === undefined || estadoAnterior !== step.status;
		});

		if (mudancas.length === 0) {
			return;
		}

		const emOrdem = [...mudancas].sort(
			(a, b) => Number(ehManchete(a.status)) - Number(ehManchete(b.status)),
		);

		for (const step of emOrdem) {
			if (!antes.has(step.id_donation_step)) {
				toast.info(`Nova etapa liberada: ${step.name}`);
				continue;
			}

			const aviso = AVISO[step.status];
			if (aviso) {
				toast[aviso.tipo](aviso.texto(step.name));
			}
		}

		setDestacadas(new Set(mudancas.map((step) => step.id_donation_step)));
	}, [steps]);

	useEffect(() => {
		if (destacadas.size === 0) {
			return;
		}

		const relogio = window.setTimeout(
			() => setDestacadas(new Set()),
			DESTAQUE_MS,
		);
		return () => window.clearTimeout(relogio);
	}, [destacadas]);

	return { etapasDestacadas: destacadas };
}

function ehManchete(status: EnumDonationStepStatus) {
	return (
		status === EnumDonationStepStatus.Done ||
		status === EnumDonationStepStatus.Failed
	);
}
