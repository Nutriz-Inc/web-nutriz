import { motion, useReducedMotion } from "framer-motion";
import { env } from "@/config/env";
import { navigateApp } from "@/lib/app-navigation";
import type { EvaMessageAction } from "../types";

type EvaActionButtonProps = {
	action: EvaMessageAction;
	isAnonymous: boolean;
	onNavigate: () => void;
};

type Target =
	| { kind: "route"; to: string; scrollTo?: string }
	| { kind: "external"; href: string };

function resolveTarget(slug: string, isAnonymous: boolean): Target | null {
	switch (slug) {
		case "signup":
			return { kind: "route", to: "/registro" };
		case "login":
			return { kind: "route", to: "/login" };
		case "articles":
			return { kind: "route", to: "/artigos" };
		case "home":
			return isAnonymous ? null : { kind: "route", to: "/home" };
		case "my_donations":
			return isAnonymous ? null : { kind: "route", to: "/minhas-doacoes" };
		case "new_donation":
			return isAnonymous ? null : { kind: "route", to: "/nova-doacao" };
		case "content_hub":
			return isAnonymous ? null : { kind: "route", to: "/conteudo-educativo" };
		case "profile":
			return isAnonymous ? null : { kind: "route", to: "/perfil" };
		case "collection_points":
			return isAnonymous
				? { kind: "route", to: "/", scrollTo: "pontos-de-coleta" }
				: { kind: "route", to: "/pontos-de-coleta" };
		case "whatsapp": {
			const href = buildWhatsappHref();
			return href ? { kind: "external", href } : null;
		}
		default:
			return null;
	}
}

function buildWhatsappHref(): string | null {
	const number = env.VITE_LACTARE_WHATSAPP_NUMBER?.trim();
	if (!number) {
		return null;
	}
	const text = encodeURIComponent(
		"Olá! Vim pela EVA e gostaria de falar com a equipe da Nutriz.",
	);
	return `https://wa.me/${number}?text=${text}`;
}

function scrollToSection(id: string) {
	window.setTimeout(() => {
		document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
	}, 120);
}

export function EvaActionButton({
	action,
	isAnonymous,
	onNavigate,
}: EvaActionButtonProps) {
	const reduce = useReducedMotion();
	const target = resolveTarget(action.slug, isAnonymous);

	if (!target) {
		return null;
	}

	const enter = reduce
		? {}
		: {
				initial: { opacity: 0, y: 6 },
				animate: { opacity: 1, y: 0 },
				transition: { duration: 0.28, ease: [0.22, 1, 0.36, 1] as const },
			};

	const label = (
		<>
			{action.label}
			<span aria-hidden className="eva-action-btn-arrow">
				→
			</span>
		</>
	);

	if (target.kind === "external") {
		return (
			<motion.a
				{...enter}
				href={target.href}
				target="_blank"
				rel="noopener noreferrer"
				className="eva-action-btn"
			>
				{label}
			</motion.a>
		);
	}

	return (
		<motion.button
			{...enter}
			type="button"
			className="eva-action-btn"
			onClick={() => {
				onNavigate();
				navigateApp(target.to);
				if (target.scrollTo) {
					scrollToSection(target.scrollTo);
				}
			}}
		>
			{label}
		</motion.button>
	);
}
