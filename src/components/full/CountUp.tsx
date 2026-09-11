import { useCountUp } from "@/hooks/use-count-up";

type CountUpProps = {
	value: number;
	decimals?: number;
	prefix?: string;
	suffix?: string;
	className?: string;
};

export function CountUp({
	value,
	decimals = 0,
	prefix = "",
	suffix = "",
	className,
}: CountUpProps) {
	const { ref, valor } = useCountUp(value);

	const formatado = valor.toLocaleString("pt-BR", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

	const final = value.toLocaleString("pt-BR", {
		minimumFractionDigits: decimals,
		maximumFractionDigits: decimals,
	});

	return (
		<span ref={ref} className={className}>
			<span aria-hidden="true">
				{prefix}
				{formatado}
				{suffix}
			</span>
			<span className="sr-only">
				{prefix}
				{final}
				{suffix}
			</span>
		</span>
	);
}
