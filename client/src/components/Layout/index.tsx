import { ComponentType, ReactNode, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import usePathname from '@utils/hooks/usePathname';

import { ILinkConfig } from '@types';
import styles from './Layout.module.scss';
import useActions from '@utils/hooks/useActions';
import useUserInfo from '@utils/hooks/useUserInfo';
import { AppRouteNames, AppRoutes } from '@assets/enums';
import { toast } from 'react-hot-toast';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';

interface IProps {
	children: ReactNode;
}

const Layout: ComponentType<IProps> = ({ children }) => {
	const token = localStorage.getItem('token');
	const {
		userData,
		isFirstSuccessNotice,
		isFirstLoginNotice,
		cartItemCounter
	} = useSelector((state: RootState) => state.workspace);
	const { currentLinks, pathname, isRegistration, isAuthorization } = usePathname();
	const { setUserData, removeUserData, setIsLending, setFirstLoginNotice, setFirstSuccessNotice } = useActions();
	const { userInfo } = useUserInfo();
	const navigate = useNavigate();
	
	useEffect(() => {
		if (!token && isFirstLoginNotice) {
			setTimeout(() => {
				toast('Please log in to shop.', {
					icon: 'ℹ️',
					style: {
						background: '#308be5',
						color: '#ffffff'
					}
				});
			}, 2000);
			setFirstLoginNotice(false);
		}
		if (userData && token && isFirstSuccessNotice) {
			toast.success('You have successfully logged in. You can start shopping!', {
				duration: 3000
			});
			setFirstSuccessNotice(false);
		}
	}, []);
	
	useEffect(() => {
		if (userInfo) {
			setUserData(userInfo);
		}
	}, [userInfo]);
	
	const projectStyles =
		isRegistration || isAuthorization ? styles.registration :
			styles.mainLayout;
	
	const getLinkText = (el: ILinkConfig) => typeof el.label === 'string' ? el.label : <el.label/>;
	const getActiveLink = (path: string): string => pathname === path ? styles.active : '';
	
	const onLogout = () => {
		localStorage.removeItem('token');
		removeUserData();
		setIsLending(true);
		navigate('/');
	};
	
	return (
		<div className={ projectStyles }>
			<header>
				<nav className={ styles.navPanel }>
					{ currentLinks.map(el =>
						<Link
							className={ getActiveLink(el.path) }
							style={ { color: el.path === AppRoutes.CART && cartItemCounter > 0 ? '#51D751' : '' } }
							key={ el.path }
							to={ el.path }>
							{ getLinkText(el) }
						</Link>
					) }
					{ token && <button onClick={ onLogout } className={ styles.button }>
						{ AppRouteNames.LOGOUT }
					</button> }
				</nav>
			</header>
			<main>{ children }</main>
		</div>
	);
};

export default Layout;