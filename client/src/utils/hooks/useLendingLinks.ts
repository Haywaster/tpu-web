import { useLocation } from 'react-router-dom';
import { linksConfig } from '@assets/consts';
import { AppRouteNames, AppRoutes, CART_ICON as Cart } from '@assets/enums';
import { ILinkConfig } from '@types';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

const useLendingLinks = () => {
	const { userData, isLending: isLendingValue } = useSelector((state: RootState) => state.workspace);
	const { pathname } = useLocation();
	
	const token = localStorage.getItem('token');
	
	const isLending: boolean = !token && isLendingValue && pathname  === AppRoutes.MAIN;
	const isRegistration: boolean = !token && pathname === AppRoutes.REGISTRATION;
	const isAuthorization: boolean = !token && pathname === AppRoutes.AUTHORIZATION;
	
	const getVarMatchLinks = (): ILinkConfig[] => {
		if (!userData.roles && !token)
			return linksConfig.filter(item =>
				item.label === AppRouteNames.MAIN ||
				item.label === AppRouteNames.REGISTRATION ||
				item.label === AppRouteNames.AUTHORIZATION);
		else if (token && userData.roles?.[0] === 'USER') {
			return linksConfig.filter(item =>
				item.label === AppRouteNames.MAIN ||
				item.label === AppRouteNames.CONTACTS ||
				item.label === AppRouteNames.ABOUT ||
				item.label === Cart);
		} else if (token && userData.roles?.[0] === 'ADMIN') {
			return linksConfig.filter(item =>
				item.label === AppRouteNames.ADMIN);
		}
		return linksConfig.filter(item =>
			item.label === AppRouteNames.MAIN);
	};
	
	const currentLinks = getVarMatchLinks();
	return { currentLinks, pathname, isLending, isRegistration, isAuthorization };
};

export default useLendingLinks