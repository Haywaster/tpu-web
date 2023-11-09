import { ChangeEvent, useCallback, useState } from 'react';
import debounce from 'lodash.debounce';
import { useSelector } from 'react-redux';
import { RootState } from '@redux/store';
import useActions from '@utils/hooks/useActions';

const useActiveSearch = () => {
	const [visibleSearch, setVisibleSearch] = useState<string>('');
	const { setSearchValue, setActiveCategory } = useActions();
	const { activeCategory } = useSelector((state: RootState) => state.post);
	
	const updateValueDebounce = useCallback(debounce(str => setSearchValue(str), 300), []);
	
	const searchHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
		const value: string = e.target.value;
		
		setVisibleSearch(value);
		updateValueDebounce(value);
	}, [updateValueDebounce]);
	
	const chooseActiveCategory = (activeName: string) => {
		setActiveCategory(activeName);
	};
	
	return { search: visibleSearch, searchHandler, activeCategory, chooseActiveCategory };
};

export default useActiveSearch;