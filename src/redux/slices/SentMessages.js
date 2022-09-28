import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchSentMessages = createAsyncThunk(
	'messages/fetchSentMessages',
	async params => {
		const { data } = await axios.post('/sent-messages', params);
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
		[fetchSentMessages.pending]: state => {
			state.status = 'loading';
			state.messages = null;
		},
		[fetchSentMessages.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.messages = action.payload;
		},
		[fetchSentMessages.rejected]: state => {
			state.status = 'error';
			state.messages = null;
		},
	},
});

export const messagesSentReducer = messagesSlice.reducer;
