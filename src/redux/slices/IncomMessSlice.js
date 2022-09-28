import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchIncomingMessages = createAsyncThunk(
	'messages/fetchIncomingMessages',
	async params => {
		const { data } = await axios.post('/incoming-messages', params);
		return data;
	}
);

const initialState = {
	messages: null,
	status: 'loading',
};

const messagesSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchIncomingMessages.pending]: state => {
			state.status = 'loading';
			state.messages = null;
		},
		[fetchIncomingMessages.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.messages = action.payload;
		},
		[fetchIncomingMessages.rejected]: state => {
			state.status = 'error';
			state.messages = null;
		},
	},
});

export const messagesReducer = messagesSlice.reducer;
