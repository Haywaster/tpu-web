import axios from 'axios';
import { IMessage, IMessagePost } from '@/@types';

axios.defaults.baseURL = 'https://6502ff5ea0f2c1f3faeb4292.mockapi.io';

export const MessageService = {
	async getAll() {
		const { data } = await axios<IMessage[]>('/messages');
		return { data };
	},
	
	async search(inputValue: string) {
		if (inputValue) {
			const { data } = await axios.get<IMessage[]>(`/messages?search=${ inputValue }`);
			return { data };
		}
	},
	
	async post(body: IMessagePost) {
		const { data } = await axios.post<IMessage>('/messages', body, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await axios.delete<IMessage>(`/messages/${ id }`);
		return data;
	}
};