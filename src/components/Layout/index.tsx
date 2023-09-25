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

const Layout: ComponentType<{
	children: ReactNode
}> = ({ children }) => {
	const { isUser, isContact, isAbout, pathname } = usePathname();
	const { isToken } = useToken();
	const dispatch = useDispatch();
	const { downloadLogs } = useLogData();
	const projectStyles = isUser || isContact || isAbout ? styles.columnWrapper : styles.rowWrapper;
	
	const handleLinkClick = (path: string) => {
		const action: string = `Clicked on link with URL: ${ path }`;
		const logData: ILogData = getLogData(action);
		dispatch(addLog(logData));
	};
	
	const getActiveLinkStyles = (path: string): { color: string } => (
		{ 'color': pathname === path ? '#fffffffa' : '#eeeaea8a' }
	);
	
	return (
		<div className={ styles.layout }>
			<header>
				<nav className={ styles.navPanel }>
					{ isToken && <Link style={ getActiveLinkStyles('/admin') }
						key='admin'
						to='/admin'
						onClick={ () => handleLinkClick('/admin') }>Admin</Link> }
					{ linksConfig.map(el => (
						<Link style={ getActiveLinkStyles(el.path) }
							key={ el.path }
							to={ el.path }
							onClick={ () => handleLinkClick(el.path) }>{ el.label }</Link>
					)) }
					<button className={ styles.btn } onClick={ downloadLogs }>Download Logs</button>
				</nav>
			</header>
			<main className={ projectStyles }>
				{ children }
			</main>
		</div>
	);
};

export default Layout;