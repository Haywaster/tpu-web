import { ICardData } from '@types';
import $api from '@services/http';

export const CartService = {
	async getAll() {
		const { data } = await $api<ICardData[]>('api/cart');
		return { data };
	},
	
	async addToCart(id: string) {
		const { data } = await $api.post<ICardData>(`/api/cart`, { id }, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await $api.delete<ICardData>(`/api/cart/${ id }`);
		return data;
	}
};