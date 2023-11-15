import { configureStore } from '@reduxjs/toolkit';
import logReducer from '@redux/slices/logSlice';
import postReducer from '@redux/slices/postsSlice';
import workspaceReducer from '@redux/slices/workspaceSlice';

export const store = configureStore({
	reducer: { log: logReducer, post: postReducer, workspace: workspaceReducer }
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch