import heroPequena from "@/assets/images/hero/hero-nenem-640.webp";
import heroMedia from "@/assets/images/hero/hero-nenem-1024.webp";
import heroGrande from "@/assets/images/hero/hero-nenem-1600.webp";
import heroMaxima from "@/assets/images/hero/hero-nenem-2400.webp";

const SRCSET = [
	`${heroPequena} 640w`,
	`${heroMedia} 1024w`,
	`${heroGrande} 1600w`,
	`${heroMaxima} 2400w`,
].join(", ");

const MASCARA_DO_FOCO =
	"linear-gradient(to right, transparent 34%, rgba(0,0,0,0.35) 48%, #000 62%)";

const ALT = "Bebê recebendo leite humano em mamadeira, segurada por um adulto";

export function HeroPhoto() {
	return (
		<div className="absolute inset-0 -z-10 overflow-hidden">
			<img
				src={heroGrande}
				srcSet={SRCSET}
				sizes="100vw"
				width={2400}
				height={1792}
				decoding="async"
				fetchPriority="high"
				alt={ALT}
				className="absolute inset-0 size-full scale-105 select-none object-cover object-[68%_center] blur-[7px] lg:object-center"
			/>
			<img
				src={heroGrande}
				srcSet={SRCSET}
				sizes="100vw"
				width={2400}
				height={1792}
				decoding="async"
				alt=""
				style={{
					maskImage: MASCARA_DO_FOCO,
					WebkitMaskImage: MASCARA_DO_FOCO,
				}}
				className="absolute inset-0 size-full select-none object-cover object-[68%_center] lg:object-center"
			/>
		</div>
	);
}
