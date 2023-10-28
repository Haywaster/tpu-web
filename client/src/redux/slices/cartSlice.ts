import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ICardData } from '@/@types';

export interface CounterState {
	items: ICardData[];
}

const initialState: CounterState = {
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
			state.items = state.items.filter(item => item.id !== action.payload);
		}
	}
});

export const { addItem, removeItem } = cartSlice.actions;

export default cartSlice.reducer;

