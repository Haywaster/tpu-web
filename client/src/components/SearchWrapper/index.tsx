import styles from '@pages/MainPage/UserPage.module.scss';
import appStyles from '@/App.module.scss';
import { filterItems } from '@assets/consts';
import { ComponentType } from 'react';
import useActiveSearch from '@utils/hooks/useActiveSearch';

const SearchWrapper: ComponentType = () => {
	const { search, searchHandler, activeCategory, chooseActiveCategory } = useActiveSearch();
	const activeCategoryStyles = (activeName: string): string => activeCategory === activeName ? styles.active : '';
	
	return (
		<div className={ styles.searchWrapper }>
			<ul className={ styles.filterList }>
				{ filterItems.map(label =>
					<li
						className={ activeCategoryStyles(label) }
						onClick={ () => chooseActiveCategory(label) }
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