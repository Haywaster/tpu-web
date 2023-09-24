export interface IMessage {
	id: string,
	title: string,
	keywords: string[],
	desc: string
}

export interface IMessageSend extends Omit<IMessage, 'keywords' | 'id'> {
	keywords: string;
}

export interface IMessagePost extends Omit<IMessage, 'id'> {}

export interface IAdminFormData {
	login: string;
	password: string;
}

export interface ILinks {
	name: string;
	imageSrc: string;
	href: string;
}

export interface ILogData {
	date: string;
	time: string;
	action: string;
}