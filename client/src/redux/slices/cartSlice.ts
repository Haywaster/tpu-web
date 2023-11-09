import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ICardData } from '@types';

export interface ICartState {
	items: ICardData[];
}

const initialState: ICartState = {
	items: []
};

export const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		addItem: (state, action: PayloadAction<ICardData>) => {
			state.items.push(action.payload);
		},
		removeItem: (state, action: PayloadAction<string>) => {
			state.items = state.items.filter(item => item._id !== action.payload);
		}
	}
});

export const cartActions = cartSlice.actions;

export default cartSlice.reducer;

