import { FC } from 'react';

export interface ICardData {
	_id: string,
	image: string,
	name: string,
	description: string
	price: number,
	category: string
}

export interface IMessagePost extends Omit<ICardData, '_id' | 'image'> {
	image: FileList;
}

export interface IMessagePostForBack extends Omit<IMessagePost, 'image'> {
	image: File;
}

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
	label: string | FC;
	path: string;
}

export interface IFilterData {
	filterData: string;
	key: string;
}

export interface IQueryParams {
	category: string;
	search: string;
	
	[key: string]: string | undefined;
}