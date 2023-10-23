import React, { useState } from 'react';
import styles from '@pages/UserPage/UserPage.module.scss';
import { filterItems } from '@assets/consts';
import appStyles from '@/App.module.scss';
import useUserFunctions from '@utils/hooks/useUserFunctions';

const SearchWrapper = () => {
	const { searchHandler, search } = useUserFunctions();
	const [activeLink, setActiveLink] = useState('All');
	
	const onActiveLinkClick = (activeName: string): void => setActiveLink(activeName);
	const getActiveLink = (activeName: string): string => activeLink === activeName ? styles.active : '';
	
	return (
		<div className={ styles.searchWrapper }>
			<ul className={ styles.filterList }>
				{ filterItems.map(item => (
					<li
						className={ getActiveLink(item.label) }
						onClick={ () => onActiveLinkClick(item.label) }
						key={ item.label }>{ item.label }</li>
				)) }
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