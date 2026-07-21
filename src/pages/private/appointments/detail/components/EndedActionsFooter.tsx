import { Download } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function EndedActionsFooter() {
	const navigate = useNavigate();

	function handleExport() {
		// NOTE: mock — usa a impressão do navegador como exportação de PDF.
		// Substituir por geração/download real do relatório quando disponível.
		window.print();
	}

	return (
		<div className="flex flex-col-reverse gap-3 pt-1 sm:flex-row sm:justify-center">
			<button
				type="button"
				onClick={() => navigate("/agendamentos")}
				className="flex h-[46px] items-center justify-center gap-2 rounded-xl border border-[#e2e8f0] bg-white px-6 text-[14px] font-semibold text-[#6b7280] transition-colors hover:bg-[#f4f7fb]"
			>
				Voltar à lista
			</button>
			<button
				type="button"
				onClick={handleExport}
				className="flex h-[46px] items-center justify-center gap-2 rounded-xl bg-[#00458b] px-6 text-[14px] font-semibold text-white transition-transform active:scale-[0.98]"
			>
				<Download className="size-4" />
				Exportar relatório (PDF)
			</button>
		</div>
	);
}
