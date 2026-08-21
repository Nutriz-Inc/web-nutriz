import { motion } from "framer-motion";
import { useCountUp } from "@/hooks/use-count-up";
import { fadeUp, staggerContainer } from "../animations/variants";
import { METRICS } from "../constants";
import { useReveal } from "../hooks/use-reveal";

/**
 * Numeros do hero, em linha.
 *
 * Foram, em ordem: tres cartoes brancos subindo por cima do hero, depois uma
 * caixa de vidro. As duas viravam um bloco pesado logo abaixo do CTA e
 * competiam com ele. Agora e so tipografia — numero, rotulo e um fio vertical
 * separando — apoiada numa regua fina. O peso volta para o titulo e o botao,
 * que e o que a pessoa precisa ver primeiro.
 */
export function StatsBar() {
	const reveal = useReveal(staggerContainer);

	return (
		<motion.dl
			{...reveal}
			className="mt-12 flex flex-col gap-6 border-t border-white/15 pt-7 sm:flex-row sm:gap-0 lg:mt-16"
		>
			{METRICS.map((metric, indice) => (
				<Estatistica
					key={metric.label}
					value={metric.value}
					label={metric.label}
					primeira={indice === 0}
				/>
			))}
		</motion.dl>
	);
}

function Estatistica({
	value,
	label,
	primeira,
}: {
	value: string;
	label: string;
	primeira: boolean;
}) {
	const { alvoRef, texto } = useCountUp(value);

	return (
		<motion.div
			variants={fadeUp}
			className={
				primeira ? "sm:pr-8" : "sm:border-l sm:border-white/15 sm:pl-8 sm:pr-8"
			}
		>
			<dt className="sr-only">{label}</dt>
			<dd className="m-0">
				<span
					ref={alvoRef as React.Ref<HTMLSpanElement>}
					className="block whitespace-nowrap font-display text-[30px] font-extrabold leading-none tabular-nums text-white lg:text-[34px]"
				>
					{texto}
				</span>
				<span className="mt-2 block text-[13px] font-medium text-blue-tint-2">
					{label}
				</span>
			</dd>
		</motion.div>
	);
}
