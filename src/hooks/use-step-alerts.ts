import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
	type DonationStep,
	EnumDonationStepStatus,
} from "@/services/types/i-donation";

/** Quanto tempo o cartao fica destacado depois de mudar. */
const DESTAQUE_MS = 6000;

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

/**
 * Compara as etapas entre duas leituras e avisa o que mudou.
 *
 * Roda junto com a recarga periodica (`INTERVALO_AO_VIVO_MS`): quando o admin
 * aprova uma etapa do outro lado, a leitura seguinte traz o novo estado, e dai
 * sai o toast e o destaque no cartao — sem a nutriz recarregar nada.
 *
 * A primeira leitura nunca avisa: abrir a tela e ver o estado atual nao e
 * novidade. So a partir da segunda e que uma diferenca vira aviso.
 *
 * Devolve os ids das etapas que acabaram de mudar, para os cartoes se
 * destacarem por alguns segundos.
 *
 * Vive em `src/hooks` porque duas telas da nutriz usam: a home (pela doacao em
 * andamento) e o detalhe da doacao.
 */
export function useStepAlerts(steps: DonationStep[] | undefined) {
	const anterior = useRef<Map<string, EnumDonationStepStatus> | null>(null);
	// Conjunto, e nao um id so: aprovar uma etapa costuma abrir a seguinte, e as
	// duas mudam na mesma leitura. Com um id so, a segunda apagava a primeira.
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

		/*
		 * Conclusao e reprovacao sao a manchete: elas saem por ultimo para
		 * ficarem no topo da pilha de toasts, acima do "a proxima etapa abriu".
		 */
		const emOrdem = [...mudancas].sort(
			(a, b) => Number(ehManchete(a.status)) - Number(ehManchete(b.status)),
		);

		for (const step of emOrdem) {
			// Etapa que acabou de existir entra como "liberada", nao como
			// mudanca de estado: para a nutriz, ela apareceu agora.
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
