import { useLocation } from 'react-router-dom';

const usePathname = () => {
	const { pathname } = useLocation();
	
	const isUser: boolean = pathname === '/';
	const isContact: boolean = pathname === '/contacts';
	const isAbout: boolean = pathname === '/about';
	
	return { isUser, isContact, isAbout, pathname };
};

export default usePathname;