import { ILogData } from '@/@types';

export const getLogData = (action: string): ILogData => {
	const now = new Date();
	const date = now.toLocaleDateString();
	const time = now.toLocaleTimeString();
	
	return { date, time, action };
};