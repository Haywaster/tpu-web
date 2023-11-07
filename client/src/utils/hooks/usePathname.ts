import { useLocation } from 'react-router-dom';
import useFindRole from '@utils/hooks/useFindRole';
import { linksConfig } from '@assets/consts';
import { AppRouteNames, CART_ICON as Cart } from '@assets/enums';
import { ILinkConfig } from '@/@types';

const usePathname = () => {
	const { pathname } = useLocation();
	const { role } = useFindRole();
	
	const isMain: boolean = pathname === '/';
	const isLending: boolean = pathname === '/lending';
	const isContact: boolean = pathname === '/contacts';
	const isAbout: boolean = pathname === '/about';
	const isCart: boolean = pathname === '/cart';
	const isRegistration: boolean = pathname === '/registration';
	const isAuthorization: boolean = pathname === '/authorization';
	// const isAdmin: boolean = pathname === '/admin';
	
	const getVarMatchLinks = (): ILinkConfig[] => {
		if (role === '') return [];
		else if (role == 'user') {
			return linksConfig.filter(item =>
				item.label === AppRouteNames.MAIN ||
				item.label === AppRouteNames.CONTACTS ||
				item.label === AppRouteNames.ABOUT ||
				item.label === Cart)
		}
		else if (role === 'admin') {
			return linksConfig.filter(item =>
				item.label === AppRouteNames.MAIN ||
				item.label === AppRouteNames.ADMIN ||
				item.label === Cart)
		}
		return linksConfig
	};
	
	const currentLinks: ILinkConfig[] = getVarMatchLinks();
	
	return { currentLinks, pathname, isLending, isRegistration, isAuthorization };
};

export default usePathname;