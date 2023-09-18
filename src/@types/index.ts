export interface IMessage {
	id: string,
	title: string,
	keywords: string[],
	desc: string
}

export interface IMessageSend extends Omit<IMessage, "keywords" | "id">{
	keywords: string
}

export interface IMessagePost extends Omit<IMessage, "id">{}