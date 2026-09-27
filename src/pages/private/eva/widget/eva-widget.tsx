import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Dialog } from "radix-ui";
import {
	useCallback,
	useEffect,
	useRef,
	useState,
	useSyncExternalStore,
} from "react";
import { useBackdropTone } from "@/hooks/use-backdrop-tone";
import { getAppPathname, subscribeAppPath } from "@/lib/app-navigation";
import { getAnonymousSession } from "../eva-session-store";
import { jaViuBoasVindas, marcarBoasVindasVistas } from "./eva-boas-vindas";
import { EvaFab } from "./eva-fab";
import { EvaModalConteudo, type EvaVisao } from "./eva-modal-conteudo";
import {
	getAppMenuOpen,
	subscribeAppMenuOpen,
	subscribeEvaOpen,
} from "./eva-widget-bus";
import "./eva-widget.css";
import { EASE_OUT } from "@/lib/easing";
import { useEvaAccess } from "./use-eva-access";

const HIDDEN_ROUTES = new Set(["/login", "/registro"]);

function temConversaAnonima(mode: string) {
	return mode === "anonymous" && getAnonymousSession().messages.length > 0;
}

function focarPrimeiroControle() {
	window.requestAnimationFrame(() => {
		const modal = document.querySelector<HTMLElement>(".eva-widget-modal");

		if (!modal) {
			return;
		}

		const toqueGrosso = window.matchMedia("(pointer: coarse)").matches;
		const seletor = toqueGrosso
			? ".eva-pill, .eva-input:not(:disabled)"
			: ".eva-input:not(:disabled), .eva-pill";
		const alvo = modal.querySelector<HTMLElement>(seletor);

		(alvo ?? modal).focus({ preventScroll: true });
	});
}

export function EvaWidget() {
	const { allowed, mode, userId } = useEvaAccess();
	const lembraDasBoasVindas = mode !== "anonymous";
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

	const fabRef = useRef<HTMLButtonElement>(null);
	const tomDoFundo = useBackdropTone(fabRef, !open);
	const [visaoInicial, setVisaoInicial] = useState<EvaVisao>("welcome");
	const [initialMessage, setInitialMessage] = useState<string | undefined>(
		undefined,
	);
	const [aberturas, setAberturas] = useState(0);

	const handleOpenChange = useCallback(
		(next: boolean) => {
			if (next) {
				const skipWelcome =
					temConversaAnonima(mode) ||
					(lembraDasBoasVindas && jaViuBoasVindas(userId));
				setInitialMessage(undefined);
				setVisaoInicial(skipWelcome ? "chat" : "welcome");
				setAberturas((total) => total + 1);
			}

			setOpen(next);
		},
		[lembraDasBoasVindas, userId, mode],
	);

	useEffect(() => {
		return subscribeEvaOpen((message?: string) => {
			const skipWelcome =
				Boolean(message) ||
				temConversaAnonima(mode) ||
				(lembraDasBoasVindas && jaViuBoasVindas(userId));

			if (skipWelcome && lembraDasBoasVindas) {
				marcarBoasVindasVistas(userId);
			}

			setInitialMessage(message);
			setVisaoInicial(skipWelcome ? "chat" : "welcome");
			setAberturas((total) => total + 1);
			setOpen(true);
		});
	}, [lembraDasBoasVindas, userId, mode]);

	if (!allowed || HIDDEN_ROUTES.has(pathname)) {
		return null;
	}

	const fabObstruido = open || menuOpen;

	const modalMotion = reduce
		? {
				initial: { opacity: 0 },
				animate: { opacity: 1 },
				exit: { opacity: 0 },
				transition: { duration: 0.15 },
			}
		: {
				initial: { opacity: 0, scale: 0.9, y: 12 },
				animate: {
					opacity: 1,
					scale: 1,
					y: 0,
					transition: {
						type: "spring" as const,
						bounce: 0.14,
						visualDuration: 0.42,
						opacity: { duration: 0.2, ease: EASE_OUT },
					},
				},
				exit: {
					opacity: 0,
					scale: 0.95,
					y: 8,
					transition: { duration: 0.16, ease: EASE_OUT },
				},
			};

	return (
		<Dialog.Root open={open} onOpenChange={handleOpenChange}>
			<EvaFab
				botaoRef={fabRef}
				tom={tomDoFundo}
				oculto={fabObstruido}
				aberto={open}
				aoAbrir={() => handleOpenChange(true)}
			/>

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
						<Dialog.Content
							asChild
							forceMount
							aria-describedby={undefined}
							onOpenAutoFocus={(evento) => {
								evento.preventDefault();
								focarPrimeiroControle();
							}}
							onCloseAutoFocus={(evento) => {
								evento.preventDefault();
								fabRef.current?.focus({ preventScroll: true });
							}}
						>
							<motion.div
								className="eva-widget-modal"
								style={{ transformOrigin: "bottom right" }}
								{...modalMotion}
							>
								<EvaModalConteudo
									key={aberturas}
									mode={mode}
									userId={userId}
									visaoInicial={visaoInicial}
									mensagemInicial={initialMessage}
									onFechar={() => setOpen(false)}
								/>
							</motion.div>
						</Dialog.Content>
					</Dialog.Portal>
				) : null}
			</AnimatePresence>
		</Dialog.Root>
	);
}
