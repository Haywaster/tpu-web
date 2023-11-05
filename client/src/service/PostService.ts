import axios from 'axios';
import { ICardData, IMessagePost } from '@types';

export const url = 'http://localhost:3001/';
axios.defaults.baseURL = url;

export const PostService = {
	async getAll(queryString?: string) {
		const url = `api/posts${ queryString ? `?${ queryString }` : '' }`;
		const { data } = await axios<ICardData[]>(url);
		return { data };
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