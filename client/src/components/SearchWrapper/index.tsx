import { useState } from 'react';
import useUserFunctions from '@utils/hooks/useUserFunctions';
import styles from '@pages/UserPage/UserPage.module.scss';
import appStyles from '@/App.module.scss';
import { filterItems } from '@assets/consts';

const SearchWrapper = () => {
	const { searchHandler, search } = useUserFunctions();
	const [activeLink, setActiveLink] = useState('All');
	
	const onActiveLinkClick = (activeName: string): void => setActiveLink(activeName);
	const getActiveLink = (activeName: string): string => activeLink === activeName ? styles.active : '';
	
	return (
		<div className={ styles.searchWrapper }>
			<ul className={ styles.filterList }>
				{ filterItems.map(label =>
					<li
						className={ getActiveLink(label) }
						onClick={ () => onActiveLinkClick(label) }
						key={ label }>
						{ label }
					</li>
				) }
			</ul>
			<input className={ appStyles.input }
				placeholder='Search...'
				type='search'
				value={ search }
				onChange={ searchHandler }/>
		</div>
	);
};

export default SearchWrapper;