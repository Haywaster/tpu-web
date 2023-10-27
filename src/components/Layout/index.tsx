import { ComponentType, ReactNode, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { addLog } from '@redux/slices/logSlice';

import usePathname from '@utils/hooks/usePathname';
import useLogData from '@utils/hooks/useLogData';
import { getLogData } from '@utils/libs/getLogData';

import { linksConfig } from '@assets/consts';
import { ILinkConfig, ILogData } from '@types';
import styles from './Layout.module.scss';

interface IProps {
	children: ReactNode;
}

const Layout: ComponentType<IProps> = ({ children}) => {
	const { matchLinkStr, pathname } = usePathname();
	const [filteredLinks, setFilteredLinks] = useState<ILinkConfig[]>([]);
	const dispatch = useDispatch();
	const { downloadLogs } = useLogData();
	
	useEffect(() => {
		const filteredLinks = linksConfig.filter(item => (
			item.whereIsVisible === 'always' || item.whereIsVisible === matchLinkStr));
		
		setFilteredLinks(filteredLinks);
	}, []);
	
	const projectStyles = matchLinkStr === 'lending' ? styles.lending : styles.mainLayout ;
	
	
	const handleLinkClick = (path: string) => {
		const action: string = `Clicked on link with URL: ${ path }`;
		const logData: ILogData = getLogData(action);
		dispatch(addLog(logData));
	};
	
	const getLinkText = (el: ILinkConfig) => typeof el.label === 'string' ? el.label : <el.label/>;
	const getActiveLink = (path: string): string => pathname === path ? styles.active : '';
	
	return (
		<div className={ projectStyles }>
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
			<main>{ children }</main>
		</div>
	);
};

export default Layout;