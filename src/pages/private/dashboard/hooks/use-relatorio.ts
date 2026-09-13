import { useCallback, useEffect, useRef, useState } from "react";

export function useRelatorio() {
	const [emitidoEm, setEmitidoEm] = useState<Date | null>(null);
	const aguardando = useRef(false);

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

		const quadro = requestAnimationFrame(() => {
			requestAnimationFrame(() => window.print());
		});

		return () => cancelAnimationFrame(quadro);
	}, [emitidoEm]);

	const gerarRelatorio = useCallback(() => {
		aguardando.current = true;
		setEmitidoEm(new Date());
	}, []);

	return { emitidoEm, gerarRelatorio };
}
