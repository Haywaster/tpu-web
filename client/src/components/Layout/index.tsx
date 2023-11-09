import { ComponentType, ReactNode, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import usePathname from '@utils/hooks/usePathname';
import useLogData from '@utils/hooks/useLogData';
import { getLogData } from '@utils/libs/getLogData';

import { ILinkConfig, ILogData } from '@types';
import styles from './Layout.module.scss';
import useActions from '@utils/hooks/useActions';

interface IProps {
	children: ReactNode;
}

const Layout: ComponentType<IProps> = ({ children }) => {
	const { currentLinks, pathname, isLending, isRegistration, isAuthorization } = usePathname();
	const [filteredLinks, setFilteredLinks] = useState<ILinkConfig[]>([]);
	const { downloadLogs } = useLogData();
	const { addLog } = useActions();
	
	useEffect(() => {
		setFilteredLinks(currentLinks);
	}, []);
	
	const projectStyles =
		isLending ? styles.lending :
			isRegistration || isAuthorization ? styles.registration :
				styles.mainLayout;
	
	const handleLinkClick = (path: string) => {
		const action: string = `Clicked on link with URL: ${ path }`;
		const logData: ILogData = getLogData(action);
		addLog(logData);
	};
	
	const getLinkText = (el: ILinkConfig) => typeof el.label === 'string' ? el.label : <el.label/>;
	const getActiveLink = (path: string): string => pathname === path ? styles.active : '';
	
	return (
		<div className={ projectStyles }>
			{ !isLending &&
				<header>
					<nav className={ styles.navPanel }>
						{ filteredLinks.map(el =>
							<Link
								className={ getActiveLink(el.path) }
								key={ el.path }
								to={ el.path }
								onClick={ () => handleLinkClick(el.path) }>
								{ getLinkText(el) }
							</Link>
						) }
						<button className={ styles.btn } onClick={ downloadLogs }>Download Logs</button>
					</nav>
				</header>
			}
			<main>{ children }</main>
		</div>
	);
};

export default Layout;