import { FC } from 'react';

export interface ICardData {
	id: string,
	image: string,
	name: string,
	description: string
	price: number,
	category: string
}

export interface IMessageSend extends Omit<ICardData, 'keywords' | 'id'> {
	keywords: string;
}

export interface IMessagePost extends Omit<ICardData, 'id'> {}

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

export interface ILinkConfig {
	label: string | FC
	path: string;
	whereIsVisible: string;
}