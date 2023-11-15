import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { IUserData } from '@types';

interface IWorkspaceState {
	userData: IUserData;
	isLending: boolean;
	isFirstLoginNotice: boolean;
	isFirstSuccessNotice: boolean;
	isFirstItemInCartNotice: boolean;
	cartItemCounter: number;
}

const initialState: IWorkspaceState = {
	userData: {} as IUserData,
	isLending: true,
	isFirstLoginNotice: true,
	isFirstSuccessNotice: true,
	isFirstItemInCartNotice: true,
	cartItemCounter: 0
};

export const workspaceSlice = createSlice({
	name: 'workspace',
	initialState,
	reducers: {
		setUserData: (state, action: PayloadAction<IUserData>) => {
			state.userData = action.payload;
		},
		removeUserData: (state) => {
			state.userData = {} as IUserData;
		},
		setIsLending: (state, action: PayloadAction<boolean>) => {
			state.isLending = action.payload;
		},
		setFirstLoginNotice: (state, action: PayloadAction<boolean>) => {
			state.isFirstLoginNotice = action.payload;
		},
		setFirstSuccessNotice: (state, action: PayloadAction<boolean>) => {
			state.isFirstSuccessNotice = action.payload;
		},
		setFirstItemInCartNotice: (state, action: PayloadAction<boolean>) => {
			state.isFirstItemInCartNotice = action.payload;
		},
		addCartItemCounter: (state) => {
			state.cartItemCounter += 1;
		},
		removeCartItemCounter: (state) => {
			state.cartItemCounter -= 1;
		},
		setCartItemCounter: (state, action: PayloadAction<number>) => {
			state.cartItemCounter = action.payload;
		}
	}
});

export const workspaceActions = workspaceSlice.actions;

export default workspaceSlice.reducer;

