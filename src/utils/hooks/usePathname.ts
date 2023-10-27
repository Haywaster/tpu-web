import { useLocation } from 'react-router-dom';

const usePathname = () => {
	const { pathname } = useLocation();
	
	const isMain: boolean = pathname === '/';
	const isLending: boolean = pathname === '/lending';
	const isContact: boolean = pathname === '/contacts';
	const isAbout: boolean = pathname === '/about';
	const isCart: boolean = pathname === '/cart';
	const isRegistration: boolean = pathname === '/registration';
	const isAuthorization: boolean = pathname === '/authorization';
	// const isAdmin: boolean = pathname === '/admin';
	
	const getVarMatchLinks = (): string => {
		if (isLending || isRegistration || isAuthorization) return 'lending';
		else if (isMain || isContact || isAbout || isCart) return 'mainContent';
		else return ''
		// else if (isAdmin) return 'admin'
	};
	
	const matchLinkStr: string = getVarMatchLinks()
	
	return { matchLinkStr, pathname };
};

export default usePathname;