import axios from 'axios';
import { ICardData, IMessagePost } from '@/@types';

axios.defaults.baseURL = 'https://run.mocky.io/v3/';

export const PostService = {
	async getAll() {
		const { data } = await axios<ICardData[]>('a4051620-f04a-4301-bad8-c7ad33b0dc5d');
		return { data };
	},
	
	async search(inputValue: string) {
		if (inputValue) {
			const { data } = await axios.get<ICardData[]>(`/messages?search=${ inputValue }`);
			return { data };
		}
	},
	
	async post(body: IMessagePost) {
		const { data } = await axios.post<ICardData>('/messages', body, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await axios.delete<ICardData>(`/messages/${ id }`);
		return data;
	}
};