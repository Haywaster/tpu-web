import axios from 'axios';
import { ICardData, IMessagePostForBack } from '@types';

export const url = 'http://localhost:3001/';
axios.defaults.baseURL = url;

export const PostService = {
	async getAll(queryString?: string) {
		const url = `api/posts${ queryString ? `?${ queryString }` : '' }`;
		const { data } = await axios<ICardData[]>(url);
		return { data };
	},
	
	async post(body: IMessagePostForBack) {
		const { data } = await axios.post<ICardData>('api/posts', body, {
			headers: { 'Content-type': 'multipart/form-data' }
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await axios.delete<ICardData>(`/api/posts/${ id }`);
		return data;
	}
};