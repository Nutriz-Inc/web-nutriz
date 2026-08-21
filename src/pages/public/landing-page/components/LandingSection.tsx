import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { SectionHeading } from "@/components/full/SectionHeading";
import { cn } from "@/lib/utils";
import { useReveal } from "../hooks/use-reveal";

type LandingSectionProps = {
	id?: string;
	/** Rotulo em caixa alta acima do titulo. */
	label: string;
	title: string;
	/** Cor do rotulo. `mint` e a que le sobre o fundo escuro. */
	tone?: "blue" | "eva" | "teal" | "mint";
	/** Texto de apoio, a direita do titulo (ou abaixo, quando centrado). */
	description?: string;
	align?: "left" | "center";
	/** Secao sobre fundo escuro: titulo e apoio em branco. */
	onDark?: boolean;
	/** Fundo da faixa. Sem valor, herda o da pagina. */
	surfaceClassName?: string;
	className?: string;
	children: ReactNode;
};

/**
 * Faixa de secao da landing.
 *
 * Existe para o ritmo ser o mesmo em todas: antes cada secao trazia o proprio
 * cabecalho, o proprio espacamento (`py-20`, `pt-12 pb-6`, `pt-4 pb-12`...) e
 * nenhuma divisoria. Aqui o padrao e um so e vem da home — rotulo + titulo,
 * regua de 1px e o conteudo a 24px dela.
 */
export function LandingSection({
	id,
	label,
	title,
	tone = "teal",
	description,
	align = "left",
	onDark = false,
	surfaceClassName,
	className,
	children,
}: LandingSectionProps) {
	const headerReveal = useReveal();

	return (
		<section
			id={id}
			aria-labelledby={id ? `${id}-titulo` : undefined}
			className={cn(
				"scroll-mt-20 py-16 sm:py-20 lg:py-24",
				surfaceClassName,
				className,
			)}
		>
			<div className="mx-auto w-full max-w-[1200px] px-5 sm:px-6 lg:px-8">
				<motion.div {...headerReveal}>
					<SectionHeading
						id={id ? `${id}-titulo` : undefined}
						label={label}
						title={title}
						tone={tone}
						align={align}
						onDark={onDark}
						actionSlot={
							description && align === "left" ? (
								<p className="max-w-sm text-[15px] leading-relaxed text-ink-2 md:text-right">
									{description}
								</p>
							) : undefined
						}
					/>

					{description && align === "center" && (
						<p
							className={cn(
								"mx-auto mt-3 max-w-xl text-center text-[15px] leading-relaxed",
								onDark ? "text-blue-tint-2" : "text-ink-2",
							)}
						>
							{description}
						</p>
					)}
				</motion.div>

				{/* Mesma regua da home: separa o cabecalho do conteudo. */}
				<hr
					className={cn(
						"mt-6 border-0 border-t",
						onDark ? "border-white/15" : "border-blue-tint-2/60",
					)}
				/>

				<div className="mt-8 lg:mt-10">{children}</div>
			</div>
		</section>
	);
}
