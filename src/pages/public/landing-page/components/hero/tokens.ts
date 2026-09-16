const navy = (porcentagem: number) =>
	`color-mix(in srgb, var(--ink-on-fill) ${Number(porcentagem.toFixed(1))}%, transparent)`;

const suave = (t: number) => t * t * (3 - 2 * t);

const rampa = (
	alfa: number,
	de: number,
	ate: number,
	unidade: "%" | "px",
	subindo = false,
	passos = 14,
) =>
	Array.from({ length: passos + 1 }, (_, i) => {
		const t = i / passos;
		const fator = subindo ? suave(t) : 1 - suave(t);
		const posicao = Number((de + (ate - de) * t).toFixed(1));
		return `${navy(alfa * fator)} ${posicao}${unidade}`;
	}).join(", ");

const rampaEntre = (
	alfaInicial: number,
	alfaFinal: number,
	de: number,
	ate: number,
	passos = 10,
) =>
	Array.from({ length: passos + 1 }, (_, i) => {
		const t = i / passos;
		const alfa = alfaInicial + (alfaFinal - alfaInicial) * suave(t);
		const posicao = Number((de + (ate - de) * t).toFixed(1));
		return `${navy(alfa)} ${posicao}%`;
	}).join(", ");

export const HERO_DESTAQUE =
	"color-mix(in srgb, var(--blue-bright-fill) 20%, white)";

export const HERO_GLASS = navy(58);

export const HERO_OVERLAY_DESKTOP = [
	`linear-gradient(180deg, ${rampa(26, 48, 100, "%", true)})`,
	`linear-gradient(to right, ${navy(85)} 0%, ${rampa(85, 46, 88, "%")})`,
].join(", ");

export const HERO_OVERLAY_MOBILE = `linear-gradient(180deg, ${navy(88)} 0%, ${navy(82)} 32%, ${rampaEntre(82, 44, 32, 58)}, ${rampaEntre(44, 74, 58, 100)})`;

export const HERO_OVERLAY_TOPO = `linear-gradient(180deg, ${navy(42)} 0%, ${rampa(42, 6, 100, "%")})`;
