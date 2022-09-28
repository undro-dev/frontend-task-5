import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchUserData = createAsyncThunk(
	'auth/fetchUserData',
	async params => {
		const { data } = await axios.post('/auth/login', params);
		return data;
	}
);

const initialState = {
	data: null,
	status: 'loading',
	message: '',
};

const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {
		logout: state => {
			state.data = null;
		},
	},
	extraReducers: {
		[fetchUserData.pending]: state => {
			state.status = 'loading';
			state.data = null;
			state.message = '';
		},
		[fetchUserData.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload.data;
			state.message = action.payload.message;
		},
		[fetchUserData.rejected]: (state, action) => {
			state.status = 'error';
			state.data = null;
			state.message = '';
		},
	},
});

export const loginReducer = userSlice.reducer;
export const { logout } = userSlice.actions;
