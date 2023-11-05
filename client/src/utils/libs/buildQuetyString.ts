import { IQueryParams } from '@types';

export const buildQueryString = (params: IQueryParams): string => {
	return Object.keys(params)
	.map((key) => `${key}=${params[key]}`)
	.join('&');
};