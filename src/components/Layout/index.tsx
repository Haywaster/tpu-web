import { ComponentType, ReactNode } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLog } from '@redux/slices/logSlice';

import usePathname from '@utils/hooks/usePathname';
import useLogData from '@utils/hooks/useLogData';
import { getLogData } from '@utils/libs/getLogData';

import { linksConfig } from '@assets/consts';
import { ILogData } from '@types';
import styles from './Layout.module.scss';
import useToken from '@utils/hooks/useToken';
import { BsCart2 } from 'react-icons/bs';

const Layout: ComponentType<{
	children: ReactNode
}> = ({ children }) => {
	const { isUser, isContact, isAbout, isCart, pathname } = usePathname();
	const { isToken } = useToken();
	const dispatch = useDispatch();
	const { downloadLogs } = useLogData();
	const projectStyles = isUser || isContact || isAbout ||isCart ? styles.columnWrapper : styles.rowWrapper;
	
	const handleLinkClick = (path: string) => {
		const action: string = `Clicked on link with URL: ${ path }`;
		const logData: ILogData = getLogData(action);
		dispatch(addLog(logData));
	};
	
	const getActiveLink = (path: string): string => pathname === path ? styles.active : '';
	
	return (
		<div className={ styles.layout }>
			<header>
				<nav className={ styles.navPanel }>
					{ isToken &&
						<Link
							className={ getActiveLink('/admin') }
							key='admin'
							to='/admin'
							onClick={ () => handleLinkClick('/admin') }>Admin</Link> }
					{ linksConfig.map(el => (
						<Link
							className={ getActiveLink(el.path) }
							key={ el.path }
							to={ el.path }
							onClick={ () => handleLinkClick(el.path) }>{ el.label }</Link>
					)) }
					<button className={ styles.btn } onClick={ downloadLogs }>Download Logs</button>
					<Link
						className={ getActiveLink('/cart') }
						key={ 'cart' }
						to={ '/cart' }
						onClick={ () => handleLinkClick('/cart') }><BsCart2/></Link>
				</nav>
			</header>
			<main className={ projectStyles }>
				{ children }
			</main>
		</div>
	);
};

export default Layout;