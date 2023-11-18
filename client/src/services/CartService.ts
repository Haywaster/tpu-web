import { ICardData, ICartData } from '@types';
import $api from '@services/http';

export const CartService = {
	async getAll() {
		const { data } = await $api<ICartData>('api/cart', {
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		});
		return { data };
	},
	
	async addToCart(id: string) {
		const { data } = await $api.post<{ id: string }>(`/api/cart`, { id }, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await $api.delete<{ id: string }>(`/api/cart/${ id }`, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
		});
		return data;
	},
	
	async deleteAll() {
		const { data } = await $api.delete<ICardData>(`/api/cart`, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			},
		});
		return data;
	}
};