import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { Outlet, useLocation } from "react-router-dom";

export function PageTransition() {
	const { pathname } = useLocation();
	const semMovimento = useReducedMotion();

	if (semMovimento) {
		return <Outlet />;
	}

	return (
		<AnimatePresence mode="wait" initial={false}>
			<motion.div
				key={pathname}
				initial={{ opacity: 0 }}
				animate={{ opacity: 1 }}
				exit={{ opacity: 0 }}
				transition={{ duration: 0.18, ease: "easeOut" }}
			>
				<Outlet />
			</motion.div>
		</AnimatePresence>
	);
}
