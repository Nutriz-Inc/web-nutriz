import { Pencil } from "lucide-react";
import type { RegisterFormData } from "../validation";

type ReviewSummaryProps = {
	form: RegisterFormData;
	onEdit: (step: number) => void;
};

export function ReviewSummary({ form, onEdit }: ReviewSummaryProps) {
	const sections = [
		{
			step: 0,
			title: "Dados pessoais",
			lines: [
				form.name,
				`CPF ${form.cpf} · ${form.birthDate}`,
				`${form.phone} · ${form.email}`,
			],
		},
		{
			step: 1,
			title: "Endereço",
			lines: [
				`CEP ${form.cep}, nº ${form.number}${
					form.complement ? ` · ${form.complement}` : ""
				}`,
			],
		},
		{
			step: 2,
			title: "Senha",
			lines: ["••••••••"],
		},
	];

	return (
		<section
			aria-label="Confira seus dados"
			className="mb-6 overflow-hidden rounded-[10px] border border-[#e4e4e7] bg-[#fafafa]"
		>
			<h3 className="border-b border-[#e4e4e7] px-4 py-3 text-[13px] font-bold uppercase tracking-wide text-[#0d3b6e]">
				Confira seus dados
			</h3>
			<ul className="divide-y divide-[#e4e4e7]">
				{sections.map((section) => (
					<li
						key={section.title}
						className="flex items-start justify-between gap-3 px-4 py-3"
					>
						<div className="min-w-0">
							<p className="text-[13px] font-semibold text-[#09090b]">
								{section.title}
							</p>
							{section.lines.map((line) => (
								<p
									key={line}
									className="truncate text-[13px] leading-relaxed text-[#71717a]"
								>
									{line}
								</p>
							))}
						</div>
						<button
							type="button"
							onClick={() => onEdit(section.step)}
							aria-label={`Editar ${section.title.toLowerCase()}`}
							className="flex min-h-11 shrink-0 items-center gap-1.5 rounded-md px-2 text-[13px] font-semibold text-[#0d3b6e] transition-colors hover:text-[#0a2e56] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#0d3b6e]"
						>
							<Pencil className="size-3.5" aria-hidden />
							Editar
						</button>
					</li>
				))}
			</ul>
		</section>
	);
}
