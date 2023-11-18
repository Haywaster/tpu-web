import { ILoginFormData, IUserData } from '@types';
import $api from '@services/http';

export const LoginService = {
	async registration(body: ILoginFormData) {
		await $api.post<{ message: string }>('auth/registration', body, {
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		});
		return await LoginService.authorization(body);
	},
	
	async authorization(body: ILoginFormData) {
		const { data } = await $api.post<{ token: string }>('auth/login', body, {
			headers: { 'Content-type': 'application/json; charset=UTF-8' }
		});
		return data.token;
	},
	
	async getUserInfo() {
		const { data } = await $api<IUserData>('auth/user', {
			headers: {
				'Content-type': 'application/json; charset=UTF-8',
				Authorization: `Bearer ${ localStorage.getItem('token') }`
			}
		});
		return data;
	}
};