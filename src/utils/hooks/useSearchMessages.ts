import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MessageService } from '@service/MessageService';
import debounce from 'lodash.debounce';

const useSearchMessages = () => {
	const [visibleSearch, setVisibleSearch] = useState<string>('');
	const [debounceSearch, setDebounceSearch] = useState<string>('');
	const queryClient = useQueryClient();
	
	const { isLoading, isError, data: messages, isSuccess } = useQuery(
		['getAllMessages'],
		() => MessageService.getAll(),
		{ select: ({ data }) => data, enabled: !debounceSearch }
	);
	
	const { mutate } = useMutation(
		['searchMessage'],
		() => MessageService.search(debounceSearch),
		{
			onSuccess(newData) {
				queryClient.setQueryData(['getAllMessages'], newData);
			}
		}
	);
	
	const updateValueDebounce = useCallback(
		debounce(str => setDebounceSearch(str), 300), []
	);
	
	const searchHandler = async (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value;
		
		setVisibleSearch(value);
		updateValueDebounce(value);
	};
	
	useEffect(() => {
		if (debounceSearch) {
			mutate();
		}
	}, [debounceSearch, mutate]);
	
	return { search: visibleSearch, searchHandler, isLoading, isError, messages, isSuccess };
};

export default useSearchMessages;