type IconProps = {
	className?: string;
};

export function YoutubeIcon({ className }: IconProps) {
	return (
		<svg
			viewBox="0 0 24 24"
			fill="none"
			stroke="currentColor"
			strokeWidth={2}
			strokeLinecap="round"
			strokeLinejoin="round"
			aria-hidden="true"
			className={className}
		>
			<path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-2C18.88 4 12 4 12 4s-6.88 0-8.59.42a2.78 2.78 0 0 0-1.95 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.41 19c1.71.42 8.59.42 8.59.42s6.88 0 8.59-.42a2.78 2.78 0 0 0 1.95-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
			<polygon
				points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02"
				fill="currentColor"
				stroke="none"
			/>
		</svg>
	);
}
