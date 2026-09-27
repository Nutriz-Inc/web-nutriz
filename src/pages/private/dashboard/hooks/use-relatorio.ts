import { useCallback, useEffect, useRef, useState } from "react";
import { fundoBrancoNaImpressao } from "@/utils/fundo-branco-na-impressao";
import {
	consumirPedidoDeRelatorio,
	subscribePedidoDeRelatorio,
} from "../relatorio-bus";

export function useRelatorio(pronto: boolean) {
	const [emitidoEm, setEmitidoEm] = useState<Date | null>(null);
	const [pedido, setPedido] = useState(false);
	const aguardando = useRef(false);

	const gerarRelatorio = useCallback(() => {
		aguardando.current = true;
		setEmitidoEm(new Date());
	}, []);

	useEffect(() => {
		if (consumirPedidoDeRelatorio()) {
			setPedido(true);
		}

		return subscribePedidoDeRelatorio(() => {
			if (consumirPedidoDeRelatorio()) {
				setPedido(true);
			}
		});
	}, []);

	useEffect(() => {
		if (!pedido || !pronto) {
			return;
		}

		setPedido(false);
		gerarRelatorio();
	}, [pedido, pronto, gerarRelatorio]);

	useEffect(() => {
		function encerrar() {
			setEmitidoEm(null);
		}

		window.addEventListener("afterprint", encerrar);

		return () => window.removeEventListener("afterprint", encerrar);
	}, []);

	useEffect(() => {
		if (!emitidoEm || !aguardando.current) {
			return;
		}

		aguardando.current = false;
		const restaurarFundo = fundoBrancoNaImpressao();
		window.addEventListener("afterprint", restaurarFundo, { once: true });

		const quadro = requestAnimationFrame(() => {
			requestAnimationFrame(() => window.print());
		});

		return () => cancelAnimationFrame(quadro);
	}, [emitidoEm]);

	return { emitidoEm, gerarRelatorio };
}
