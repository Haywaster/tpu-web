import { useQuery } from '@tanstack/react-query';
import { PostService } from '@service/PostService';
import { buildQueryString } from '@utils/libs/buildQuetyString';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const useAllPosts = () => {
	const { activeCategory, searchValue } = useSelector((state: RootState) => state.post);
	const queryString = buildQueryString(activeCategory, searchValue);
	
	const { isFetching, isError, data: cards, isPreviousData } = useQuery(
		['getAllPosts', queryString],
		() => PostService.getAll(queryString),
		{
			refetchOnWindowFocus: false,
			select: ({ data }) => data,
			keepPreviousData: true
		}
	);
	
	return { isFetching, isError, cards, isPreviousData };
};

export default useAllPosts;