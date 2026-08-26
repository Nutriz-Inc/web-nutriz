import logoCor from "@/assets/images/nutriz-logo.svg";
import logoBranco from "@/assets/images/nutriz-logo-branco.svg";
import { useAccessibility } from "@/context/accessibility-context";
import { cn } from "@/lib/utils";

type NutrizLogoProps = {
	className?: string;
};

/**
 * Marca do app, na variante certa para o tema.
 *
 * A arte colorida tem o "nu...z" em `#343434`, quase invisivel sobre o
 * cabecalho escuro. Como o SVG e um arquivo, e nao tinta de CSS, ele nao
 * acompanha token nenhum — a troca precisa ser de arquivo mesmo.
 *
 * Isto NAO cobre a landing e o login: la o fundo e azul escuro nos dois temas
 * e o `Wordmark` ja escolhe a variante branca por conta propria.
 */
export function NutrizLogo({ className }: NutrizLogoProps) {
	const { temaEfetivo } = useAccessibility();

	return (
		<img
			src={temaEfetivo === "escuro" ? logoBranco : logoCor}
			alt="Nutriz"
			className={cn("w-auto select-none", className)}
		/>
	);
}
