import useUserFunctions from '@utils/hooks/useUserFunctions';
import styles from '@pages/UserPage/UserPage.module.scss';
import appStyles from '@/App.module.scss';
import { filterItems } from '@assets/consts';

const SearchWrapper = () => {
	const { searchHandler, search, mutate, activeCategory, setActiveCategory } = useUserFunctions();
	
	const activeCategoryStyles = (activeName: string): string => activeCategory === activeName ? styles.active : '';
	const chooseActiveCategory = (activeName: string) => {
		setActiveCategory(activeName);
		mutate({ filterData: activeName, key:'category' })
	};
	
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