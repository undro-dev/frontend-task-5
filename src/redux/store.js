import { configureStore } from '@reduxjs/toolkit';
import { loginReducer } from './slices/userSlice';
import { usersReducer } from './slices/allUserSlice';
import { messagesReducer } from './slices/IncomMessSlice';
import { messagesSentReducer } from './slices/SentMessages';

const store = configureStore({
	reducer: {
		login: loginReducer,
		users: usersReducer,
		messages: messagesReducer,
		sentMessages: messagesSentReducer,
	},
});

export default store;
