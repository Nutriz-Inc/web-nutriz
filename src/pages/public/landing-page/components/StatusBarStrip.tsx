export function StatusBarStrip() {
	return (
		<div
			aria-hidden="true"
			className="pointer-events-none fixed inset-x-0 top-0 z-50 h-[max(1px,env(safe-area-inset-top))] bg-blue-deep-fill"
		/>
	);
}
