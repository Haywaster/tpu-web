import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';

interface IPostState {
	activeCategory: string;
	searchValue: string
}

const initialState: IPostState = {
	activeCategory: 'All',
	searchValue: ''
};

export const postSlice = createSlice({
	name: 'post',
	initialState,
	reducers: {
		setActiveCategory: (state, action: PayloadAction<string>) => {
			state.activeCategory = action.payload;
		},
		setSearchValue: (state, action: PayloadAction<string>) => {
			state.searchValue = action.payload;
		}
	}
});

export const postActions = postSlice.actions;

export default postSlice.reducer;

