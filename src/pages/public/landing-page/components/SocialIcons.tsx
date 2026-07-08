type IconProps = {
	className?: string;
};

const base = {
	viewBox: "0 0 24 24",
	fill: "none",
	stroke: "currentColor",
	strokeWidth: 2,
	strokeLinecap: "round" as const,
	strokeLinejoin: "round" as const,
};

export function InstagramIcon({ className }: IconProps) {
	return (
		<svg {...base} aria-hidden="true" className={className}>
			<rect x="2" y="2" width="20" height="20" rx="5" />
			<circle cx="12" cy="12" r="4" />
			<circle cx="17.5" cy="6.5" r="1.1" fill="currentColor" stroke="none" />
		</svg>
	);
}

export function FacebookIcon({ className }: IconProps) {
	return (
		<svg {...base} aria-hidden="true" className={className}>
			<path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
		</svg>
	);
}

export function YoutubeIcon({ className }: IconProps) {
	return (
		<svg {...base} aria-hidden="true" className={className}>
			<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.42 8.59.42 8.59.42s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
			<polygon
				points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
				fill="currentColor"
				stroke="none"
			/>
		</svg>
	);
}

export function LinkedinIcon({ className }: IconProps) {
	return (
		<svg {...base} aria-hidden="true" className={className}>
			<path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-4 0v7h-4v-7a6 6 0 0 1 6-6z" />
			<rect x="2" y="9" width="4" height="12" />
			<circle cx="4" cy="4" r="2" />
		</svg>
	);
}
