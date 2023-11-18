import { LoginService } from '@services/LoginService';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import { useEffect } from 'react';
import useActions from '@utils/hooks/useActions';

const useUserInfo = () => {
	const { userData } = useSelector((state: RootState) => state.workspace);
	const { setUserData } = useActions();
	const token = localStorage.getItem('token');
	
	const { data: userInfo} = useQuery(
		['getUserInfo'],
		() => LoginService.getUserInfo(),
		{
			enabled: !!token && (
				!userData || Object.keys(userData).length === 0),
			cacheTime: 0
		}
	);
	
	useEffect(() => {
		if (userInfo) {
			setUserData(userInfo);
		}
	}, [userInfo]);
};

export default useUserInfo;