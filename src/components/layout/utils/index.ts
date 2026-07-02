export function getInitials(name: string | undefined): string {
	if (!name) return "U";
	return name
		.split(" ")
		.slice(0, 2)
		.map((n) => n[0])
		.join("")
		.toUpperCase();
}
