import axios from 'axios';
import { IPost, IMessagePost } from '@/@types';

axios.defaults.baseURL = 'https://run.mocky.io/v3/';

export const PostService = {
	async getAll() {
		const { data } = await axios<IPost[]>('a4051620-f04a-4301-bad8-c7ad33b0dc5d');
		return { data };
	},
	
	async search(inputValue: string) {
		if (inputValue) {
			const { data } = await axios.get<IPost[]>(`/messages?search=${ inputValue }`);
			return { data };
		}
	},
	
	async post(body: IMessagePost) {
		const { data } = await axios.post<IPost>('/messages', body, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await axios.delete<IPost>(`/messages/${ id }`);
		return data;
	}
};