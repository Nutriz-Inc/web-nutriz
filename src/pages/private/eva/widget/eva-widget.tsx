import { AnimatePresence, motion } from "framer-motion";
import { Dialog } from "radix-ui";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import { useBackdropTone } from "@/hooks/use-backdrop-tone";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";
import { EvaChatPanel } from "./eva-chat-panel";
import { EvaWelcomePanel } from "./eva-welcome-panel";
import {
	getAppMenuOpen,
	subscribeAppMenuOpen,
	subscribeEvaOpen,
} from "./eva-widget-bus";
import "./eva-widget.css";
import { useEvaAccess } from "./use-eva-access";

// Rotas onde o widget da EVA nao deve aparecer (foco no formulario).
const HIDDEN_ROUTES = new Set(["/login", "/registro"]);

type WidgetView = "welcome" | "chat";

function CloseButton() {
	return (
		<Dialog.Close asChild>
			<button
				type="button"
				className="eva-widget-close"
				aria-label="Fechar chat"
			>
				<svg
					width="18"
					height="18"
					viewBox="0 0 20 20"
					fill="none"
					role="img"
					aria-hidden="true"
				>
					<title>Fechar</title>
					<path
						d="M5 5l10 10M15 5L5 15"
						stroke="currentColor"
						strokeWidth="1.8"
						strokeLinecap="round"
					/>
				</svg>
			</button>
		</Dialog.Close>
	);
}

function welcomeSeenKey(userId: string) {
	return `eva:welcome-seen:${userId}`;
}

function hasSeenWelcome(userId: string | null) {
	if (!userId) {
		return false;
	}

	try {
		return localStorage.getItem(welcomeSeenKey(userId)) === "1";
	} catch {
		return false;
	}
}

function markWelcomeSeen(userId: string | null) {
	if (!userId) {
		return;
	}

	try {
		localStorage.setItem(welcomeSeenKey(userId), "1");
	} catch {
		// localStorage indisponivel: sem persistir a flag, a nutriz apenas
		// vera a boas-vindas de novo. Nao e critico.
	}
}

export function EvaWidget() {
	const { allowed, mode, userId } = useEvaAccess();
	const pathname = useSyncExternalStore(
		subscribeAppPath,
		getAppPathname,
		getAppPathname,
	);
	const menuOpen = useSyncExternalStore(
		subscribeAppMenuOpen,
		getAppMenuOpen,
		getAppMenuOpen,
	);
	const reduce = useReducedMotion();

	const [open, setOpen] = useState(false);

	/*
	 * O botao le a cor por tras dele e troca de pele. Com o chat aberto a
	 * leitura para: o que estaria sob o ponto e a cortina do modal, nao a
	 * pagina.
	 */
	const fabRef = useRef<HTMLButtonElement>(null);
	const tomDoFundo = useBackdropTone(fabRef, !open);
	const [view, setView] = useState<WidgetView>("welcome");
	const [initialMessage, setInitialMessage] = useState<string | undefined>(
		undefined,
	);

	const startChat = useCallback(
		(message?: string) => {
			if (mode === "nutriz") {
				markWelcomeSeen(userId);
			}

			// Sem mensagem nova, preserva a que veio de um CTA (openEva) e ficou
			// aguardando a ciencia do aviso LGPD na tela de boas-vindas.
			setInitialMessage((previous) => message ?? previous);
			setView("chat");
		},
		[mode, userId],
	);

	const handleOpenChange = useCallback(
		(next: boolean) => {
			if (next) {
				// Ao abrir: anonimo ve boas-vindas toda vez (cada visita e uma nova
				// sessao); nutriz so na primeira vez (flag por id_user).
				const skipWelcome = mode === "nutriz" && hasSeenWelcome(userId);
				setInitialMessage(undefined);
				setView(skipWelcome ? "chat" : "welcome");
			}

			setOpen(next);
		},
		[mode, userId],
	);

	// CTAs "Falar com a EVA" (landing/home) abrem o widget via bus, ja que
	// vivem dentro do RouterProvider e o widget fora dele.
	useEffect(() => {
		return subscribeEvaOpen((message?: string) => {
			// Anonimo SEMPRE passa pela boas-vindas (e o aviso LGPD e bloqueante);
			// nutriz pula direto para o chat se ja viu a boas-vindas ou se o CTA
			// trouxe uma mensagem para enviar.
			const skipWelcome =
				mode === "nutriz" && (hasSeenWelcome(userId) || Boolean(message));

			if (skipWelcome && mode === "nutriz") {
				markWelcomeSeen(userId);
			}

			setInitialMessage(message);
			setView(skipWelcome ? "chat" : "welcome");
			setOpen(true);
		});
	}, [mode, userId]);

	if (!allowed || HIDDEN_ROUTES.has(pathname)) {
		return null;
	}

	// Algo aberto por cima do canto do FAB (menu lateral, bottom sheet,
	// dialogo). Ele some enquanto durar — ver eva-widget-bus.ts. So vale com a
	// EVA fechada: com ela aberta, quem esta por cima e o proprio modal.
	const fabObstruido = !open && menuOpen;

	// Animacao de abrir/fechar tipo "balao inflando": escala com mola na
	// entrada, deflada rapida na saida, com origem no canto do FAB.
	const modalMotion = reduce
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 0.15 },
			}
		: {
				initial: { opacity: 0, scale: 0.8 },
				animate: {
					opacity: 1,
					scale: 1,
					transition: { type: "spring" as const, stiffness: 260, damping: 18 },
				},
				exit: {
					opacity: 0,
					scale: 0.85,
					transition: { duration: 0.18, ease: "easeIn" as const },
				},
			};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<Dialog.Trigger asChild>
				<button
					ref={fabRef}
					type="button"
					className={fabObstruido ? "eva-fab eva-fab--oculto" : "eva-fab"}
					data-fundo={tomDoFundo}
					aria-label="Abrir chat com a EVA"
				>
					{/*
					 * A silhueta da flor e mascara (ver eva-widget.css); estas duas
					 * camadas sao o degrade que aparece por dentro dela.
					 */}
					<span className="eva-fab-mark" aria-hidden="true">
						<span className="eva-fab-mark-cor eva-fab-mark-cor--forte" />
						<span className="eva-fab-mark-cor eva-fab-mark-cor--clara" />
					</span>
				</button>
			</Dialog.Trigger>

			<AnimatePresence>
				{open ? (
					<Dialog.Portal forceMount key="eva-portal">
						<Dialog.Overlay asChild forceMount>
							<motion.div
								className="eva-widget-overlay"
								initial={{ opacity: 0 }}
								animate={{ opacity: 1 }}
								exit={{ opacity: 0 }}
								transition={{ duration: 0.2 }}
							/>
						</Dialog.Overlay>
						<Dialog.Content asChild forceMount aria-describedby={undefined}>
							<motion.div
								className="eva-widget-modal"
								style={{ transformOrigin: "bottom right" }}
								{...modalMotion}
							>
								{view === "welcome" ? (
									// So o X. O nome aparece ao lado do quadrado da marca,
									// dentro do painel; aqui ele fica apenas para leitores de
									// tela, porque o Radix exige um titulo no dialogo.
									<div className="eva-widget-header eva-widget-header--bare">
										<CloseButton />
										<Dialog.Title className="sr-only">
											Assistente EVA
										</Dialog.Title>
									</div>
								) : (
									// Nome ao centro e fechar a direita, como na abertura. O
									// selo de "online" saiu — ele prometia presenca humana que
									// a EVA nao tem.
									<div className="eva-widget-header eva-widget-header--chat">
										<span className="eva-widget-header-spacer" aria-hidden />
										<Dialog.Title className="eva-widget-header-title">
											EVA
										</Dialog.Title>
										<CloseButton />
									</div>
								)}

								{view === "welcome" ? (
									<EvaWelcomePanel mode={mode} onStart={startChat} />
								) : (
									<EvaChatPanel
										initialMessage={initialMessage}
										onClose={() => setOpen(false)}
									/>
								)}
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				) : null}
			</AnimatePresence>
		</Dialog.Root>
	);
}
