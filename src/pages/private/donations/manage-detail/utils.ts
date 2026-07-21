export function toDateInputValue(iso?: string) {
	if (!iso) return "";
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export function toTimeInputValue(iso?: string) {
	if (!iso) return "";
	const date = new Date(iso);
	if (Number.isNaN(date.getTime())) return "";
	return `${String(date.getHours()).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
}

export function combineDateTime(date: string, time: string) {
	if (!date) return undefined;
	const [hours, minutes] = (time || "00:00").split(":").map(Number);
	const combined = new Date(`${date}T00:00:00`);
	combined.setHours(hours, minutes, 0, 0);
	return combined.toISOString();
}
