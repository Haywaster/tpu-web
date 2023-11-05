import axios from 'axios';
import { ICardData } from '@types';

export const url = 'http://localhost:3001/';
axios.defaults.baseURL = url;

export const CartService = {
	async getAll() {
		const { data } = await axios<ICardData[]>('api/cart');
		return { data };
	},
	
	async addToCart(id: string) {
		const { data } = await axios.post<ICardData>(`/api/cart`, { id }, {
			headers: {
				'Content-type': 'application/json; charset=UTF-8'
			}
		});
		return data;
	},
	
	async delete(id: string) {
		const { data } = await axios.delete<ICardData>(`/api/cart/${ id }`);
		return data;
	}
};