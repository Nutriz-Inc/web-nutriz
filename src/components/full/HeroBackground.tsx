import { motion, useReducedMotion } from "framer-motion";
import heroLoop from "@/assets/videos/hero-loop.mp4";
import { cn } from "@/lib/utils";

const GRAIN =
	"data:image/svg+xml,%3Csvg%20xmlns='http://www.w3.org/2000/svg'%20width='180'%20height='180'%3E%3Cfilter%20id='n'%3E%3CfeTurbulence%20type='fractalNoise'%20baseFrequency='0.85'%20numOctaves='3'%20stitchTiles='stitch'/%3E%3C/filter%3E%3Crect%20width='100%25'%20height='100%25'%20filter='url(%23n)'/%3E%3C/svg%3E";

const MESH = [
	"radial-gradient(120% 120% at 88% 6%, rgba(126,196,244,0.55) 0%, rgba(126,196,244,0) 46%)",
	"radial-gradient(90% 90% at 72% 30%, rgba(47,217,197,0.26) 0%, rgba(47,217,197,0) 50%)",
	"radial-gradient(130% 130% at 58% 108%, rgba(150,160,240,0.4) 0%, rgba(150,160,240,0) 55%)",
	"radial-gradient(80% 80% at 92% 88%, rgba(249,166,32,0.14) 0%, rgba(249,166,32,0) 55%)",
	"radial-gradient(110% 110% at 22% 18%, rgba(30,92,176,0.55) 0%, rgba(30,92,176,0) 52%)",
	"radial-gradient(130% 150% at 6% 94%, rgba(6,32,80,0.92) 0%, rgba(6,32,80,0) 60%)",
	"linear-gradient(120deg, #072a63 0%, #0a3a87 46%, #14509e 100%)",
].join(", ");

type Props = {
	comVideo?: boolean;
};

export function HeroBackground({ comVideo = false }: Props) {
	const shouldReduceMotion = useReducedMotion();

	const mostrarVideo = comVideo && !shouldReduceMotion;

	const drift = (x: number, y: number, scale = 1.1, duration = 20) =>
		shouldReduceMotion
			? {}
			: {
					animate: { x: [0, x, 0], y: [0, y, 0], scale: [1, scale, 1] },
					transition: {
						duration,
						repeat: Number.POSITIVE_INFINITY,
						ease: "easeInOut" as const,
					},
				};

	return (
		<div
			aria-hidden
			className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
		>
			<div className="absolute inset-0" style={{ background: MESH }} />

			{mostrarVideo && (
				<>
					<video
						src={heroLoop}
						autoPlay
						loop
						muted
						playsInline
						preload="auto"
						tabIndex={-1}
						className="absolute inset-0 size-full object-cover"
					/>

					<div className="absolute inset-0 bg-[#062247]/35" />
					<div className="absolute inset-0 bg-gradient-to-r from-[#04193a]/80 via-[#062247]/35 to-transparent" />
				</>
			)}

			{!mostrarVideo && (
				<>
					<motion.div
						{...drift(-38, 28, 1.1, 22)}
						className="absolute top-[-22%] right-[-8%] h-[140%] w-[62%] rounded-full bg-[radial-gradient(closest-side,rgba(182,224,255,0.5),transparent)] blur-[80px]"
					/>
					<motion.div
						{...drift(32, -22, 1.12, 16)}
						className="absolute top-[34%] right-[26%] h-[46%] w-[40%] rounded-full bg-[radial-gradient(closest-side,rgba(47,217,197,0.3),transparent)] blur-[80px]"
					/>
					<motion.div
						{...drift(-26, -22, 1.1, 24)}
						className="absolute bottom-[-24%] left-[6%] h-[72%] w-[56%] rounded-full bg-[radial-gradient(closest-side,rgba(150,160,240,0.32),transparent)] blur-[90px]"
					/>
					<motion.div
						{...drift(22, 20, 1.15, 26)}
						className="absolute right-[4%] bottom-[0%] h-[42%] w-[36%] rounded-full bg-[radial-gradient(closest-side,rgba(249,166,32,0.16),transparent)] blur-[90px]"
					/>
				</>
			)}

			<div
				className={cn(
					"absolute inset-0 mix-blend-overlay",
					mostrarVideo ? "opacity-[0.08]" : "opacity-[0.14]",
				)}
				style={{
					backgroundImage: `url("${GRAIN}")`,
					backgroundSize: "180px 180px",
				}}
			/>
		</div>
	);
}
