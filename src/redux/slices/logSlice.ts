import type { PayloadAction } from '@reduxjs/toolkit';
import { createSlice } from '@reduxjs/toolkit';
import { ILogData } from '@types';

export interface CounterState {
	actions: ILogData[];
}

const initialState: CounterState = {
	actions: []
};

export const logSlice = createSlice({
	name: 'log',
	initialState,
	reducers: {
		addLog: (state, action: PayloadAction<ILogData>) => {
			state.actions.push(action.payload);
		}
	}
});

export const { addLog } = logSlice.actions;

export default logSlice.reducer;

