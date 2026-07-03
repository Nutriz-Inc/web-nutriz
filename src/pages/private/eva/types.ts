export type ChatMessage = {
	id: string;
	role: "eva" | "nutriz";
	paragraphs: string[];
	time?: string;
};

export type Conversation = {
	id: string;
	title: string;
	timeLabel: string;
	active: boolean;
};
