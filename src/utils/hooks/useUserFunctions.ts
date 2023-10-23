import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { PostService } from '@service/PostService';
import debounce from 'lodash.debounce';

const useUserFunctions = () => {
	const [visibleSearch, setVisibleSearch] = useState<string>('');
	const [debounceSearch, setDebounceSearch] = useState<string>('');
	const queryClient = useQueryClient();
	
	const { isLoading, isError, data: messages, isSuccess } = useQuery(
		['get all messages'],
		() => PostService.getAll(),
		{ select: ({ data }) => data, enabled: !debounceSearch }
	);
	
	const { mutate } = useMutation(
		['search message'],
		() => PostService.search(debounceSearch),
		{
			onSuccess(newData) {
				queryClient.setQueryData(['get all messages'], newData);
			}
		}
	);
	
	const updateValueDebounce = useCallback(
		debounce(str => {
			setDebounceSearch(str);
		}, 300), []
	);
	
	const searchHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		const value: string = e.target.value;
		
		setVisibleSearch(value);
		updateValueDebounce(value);
	};
	
	useEffect(() => {
		if (debounceSearch) {
			mutate();
		}
	}, [debounceSearch, mutate]);
	
	return { search: visibleSearch, searchHandler, isLoading, isError, messages, isSuccess, debounceSearch };
};

export default useUserFunctions;