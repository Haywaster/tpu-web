import { IQueryParams } from '@types';

// export const buildQueryString = (params: IQueryParams): string => {
// 	return Object.keys(params)
// 	.map((key) => `${key}=${params[key]}`)
// 	.join('&');
// };

export const buildQueryString = (category: string, search: string): string => {
	const newCategory = category !== 'All' ? category : '';
	const params: IQueryParams = { category: newCategory, search };
	return Object.keys(params)
	.map((key) => `${ key }=${ params[key] }`)
	.join('&');
	// return `category=${category}&search=${search}`;
};