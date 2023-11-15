import { LoginService } from '@services/LoginService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const useUserInfo = () => {
	const { userData } = useSelector((state: RootState) => state.workspace);
	const token = localStorage.getItem('token');
	
	const { data: userInfo, isLoading, isError } = useQuery(
		['getUserInfo'],
		() => LoginService.getUserInfo(),
		{
			enabled: !!token && (
				!userData || Object.keys(userData).length === 0),
			cacheTime: 0
		}
	);
	
	return { userInfo, isLoading, isError };
};

export default useUserInfo;