import { postActions } from '@redux/slices/postsSlice';
import { logActions } from '@redux/slices/logSlice';

import { bindActionCreators } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';
import { useMemo } from 'react';

const allActions = {
	...postActions,
	...logActions
};

const useActions = () => {
	const dispatch = useDispatch();
	return useMemo(() => bindActionCreators(allActions, dispatch), [dispatch]);
};

export default useActions;