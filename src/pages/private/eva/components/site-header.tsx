import { Link } from "react-router-dom";
import { AvatarEva } from "./avatar-eva";

export function SiteHeader() {
	return (
		<div
			style={{
				height: 76,
				flexShrink: 0,
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				padding: "0 40px",
			}}
		>
			<div style={{ display: "flex", alignItems: "center", gap: 10 }}>
				<AvatarEva size={32} petal={11} />
				<span
					style={{ fontSize: 19, fontWeight: 800, letterSpacing: "-0.01em" }}
				>
					Nutriz
				</span>
			</div>
			<nav style={{ display: "flex", alignItems: "center", gap: 8 }}>
				<Link className="eva-nav-link eva-nav-link--active" to="/eva">
					Início
				</Link>
				<Link className="eva-nav-link" to="/home">
					Minhas doações
				</Link>
				<Link className="eva-nav-link" to="/home">
					Perfil
				</Link>
			</nav>
		</div>
	);
}
