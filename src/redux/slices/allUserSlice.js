import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../../axios';

export const fetchAllUsersData = createAsyncThunk(
	'users/fetchAllUsersData',
	async () => {
		const { data } = await axios.get('/users');
		return data;
	}
);

const initialState = {
	data: null,
	status: 'loading',
};

const usersSlice = createSlice({
	name: 'user',
	initialState,
	reducers: {},
	extraReducers: {
		[fetchAllUsersData.pending]: state => {
			state.status = 'loading';
			state.data = null;
		},
		[fetchAllUsersData.fulfilled]: (state, action) => {
			state.status = 'loaded';
			state.data = action.payload;
		},
		[fetchAllUsersData.rejected]: state => {
			state.status = 'error';
			state.data = null;
		},
	},
});

export const usersReducer = usersSlice.reducer;
