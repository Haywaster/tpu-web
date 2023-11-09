import { configureStore } from '@reduxjs/toolkit';
import logReducer from '@redux/slices/logSlice';
import cartReducer from '@redux/slices/cartSlice';
import postReducer from '@redux/slices/postsSlice';

export const store = configureStore({
	reducer: { log: logReducer, cart: cartReducer, post: postReducer },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch