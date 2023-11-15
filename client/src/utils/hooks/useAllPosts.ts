import { useQuery } from '@tanstack/react-query';
import { PostService } from '@/services/PostService';
import { buildQueryString } from '@utils/libs/buildQuetyString';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useLocation } from 'react-router-dom';
import { AppRoutes } from '@assets/enums';

const useAllPosts = () => {
	const { activeCategory, searchValue } = useSelector((state: RootState) => state.post);
	const queryString = buildQueryString(activeCategory, searchValue);
	const location = useLocation();
	
	const isAdmin = location.pathname === AppRoutes.ADMIN;
	
	const { isLoading, isError, data: cards } = useQuery(
		['getAllPosts', queryString],
		() => isAdmin ? PostService.getAll() : PostService.getAll(queryString),
		{ refetchOnWindowFocus: false }
	);
	
	return { isLoading, isError, cards };
};

export default useAllPosts;