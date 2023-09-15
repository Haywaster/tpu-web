import axios from 'axios';
import { IMessage } from '@/@types';

axios.defaults.baseURL = 'https://6502ff5ea0f2c1f3faeb4292.mockapi.io';

export const MessageService = {
	async getAll() {
		const response = await axios.get<IMessage[]>('/messages');
		return { data: response.data };
	},
	
	async search(inputValue: string) {
		if (inputValue) {
			const response = await axios.get<IMessage[]>(`/messages?search=${ inputValue }`);
			return { data: response.data };
		}
	}
};