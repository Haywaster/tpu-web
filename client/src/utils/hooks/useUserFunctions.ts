import { ChangeEvent, useCallback, useRef, useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { PostService } from '@service/PostService';
import debounce from 'lodash.debounce';
import { IFilterData, IQueryParams } from '@types';
import { buildQueryString } from '@utils/libs/buildQuetyString';

const useUserFunctions = () => {
	const queryParams = useRef<IQueryParams>({} as IQueryParams);
	const [activeCategory, setActiveCategory] = useState('All');
	const [visibleSearch, setVisibleSearch] = useState<string>('');
	const [debounceSearch, setDebounceSearch] = useState<string>('');
	
	const { isFetching, isError, data: cards, refetch } = useQuery(
		['getAllPosts'],
		() => {
			const queryString = buildQueryString(queryParams.current);
			return PostService.getAll(queryString);
		},
		{ select: ({ data }) => data }
	);
	
	const { mutate } = useMutation(
		['filterPosts'],
		(dataForFilter: IFilterData) => {
			const { filterData, key } = dataForFilter;
			
			if (key === 'category') {
				const category = filterData !== 'All' ? filterData : '';
				queryParams.current = { ...queryParams.current, category };
			}
			
			if (key === 'search') {
				queryParams.current = { ...queryParams.current, search: filterData };
			}
			
			const queryString = buildQueryString(queryParams.current);
			return PostService.getAll(queryString);
		},
		{
			onSuccess(newData) {
				refetch()
			}
		}
	);
	
	const updateValueDebounce = useCallback(
		debounce(str => {
			setDebounceSearch(str);
			mutate({ filterData: str, key: 'search' });
		}, 300), []
	);
	
	const searchHandler = (e: ChangeEvent<HTMLInputElement>) => {
		const value: string = e.target.value;
		
		setVisibleSearch(value);
		updateValueDebounce(value);
	};
	
	return {
		search: visibleSearch,
		searchHandler,
		isFetching,
		isError,
		cards,
		debounceSearch,
		mutate,
		activeCategory,
		setActiveCategory
	};
};

export default useUserFunctions;