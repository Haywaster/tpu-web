import { configureStore } from '@reduxjs/toolkit';
import logReducer from '@redux/slices/logSlice';
import cartReducer from '@redux/slices/cartSlice';

export const store = configureStore({
	reducer: { log: logReducer, cart: cartReducer }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch