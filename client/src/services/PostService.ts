import { ICardData, IMessagePostForBack } from '@types';
import $api from '@services/http';

export const PostService = {
	async getAll(queryString?: string) {
		const url = `api/posts${ queryString ? `?${ queryString }` : '' }`;
		const { data } = await $api<ICardData[]>(url);
		return data;
	},
	
	async post(body: IMessagePostForBack) {
		const { data } = await $api.post<ICardData>('api/posts', body, {
			headers: { 'Content-type': 'multipart/form-data' }
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await $api.delete<ICardData>(`/api/posts/${ id }`);
		return data;
	}
};