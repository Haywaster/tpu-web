import { ComponentType, ReactNode } from 'react';

import styles from './Layout.module.scss';
import { Link } from 'react-router-dom';
import usePathname from '@utils/hooks/usePathname';
import useLogData from '@utils/hooks/useLogData';

const Layout: ComponentType<{
	children: ReactNode
}> = ({ children }) => {
	const { isUser, isContact, isAbout } = usePathname();
	const projectStyles = isUser || isContact || isAbout ? styles.columnWrapper : styles.rowWrapper;
	const { downloadLogs } = useLogData();
	
	return (
		<div className={ styles.layout }>
			<header>
				<nav className={ styles.navPanel }>
					<Link to='/'>Main</Link>
					<Link to='/about'>About website</Link>
					<Link to='/contacts'>Contacts</Link>
				</nav>
			</header>
			
			<main className={ projectStyles }>
				{ children }
			</main>
		</div>
	);
};

export default Layout;