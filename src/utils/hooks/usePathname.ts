import { useLocation } from 'react-router-dom';

const usePathname = () => {
	const { pathname } = useLocation();
	
	const isUser = pathname === '/';
	const isContact = pathname === '/contacts';
	const isAbout = pathname === '/about'
	
	return {isUser, isContact, isAbout};
};

export default usePathname;