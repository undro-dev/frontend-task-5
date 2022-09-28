import React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Header from '../components/Header';
import { fetchIncomingMessages } from '../redux/slices/IncomMessSlice';

import { MessageItem } from '../components/MessageItem';
import { Footer } from '../components/Footer';

export const IncomingMessages = () => {
	const dispatch = useDispatch();
	const { name } = useSelector(state => state.login.data);
	const { messages, status } = useSelector(state => state.messages);

	useEffect(() => {
		dispatch(fetchIncomingMessages({ name }));
	}, []);

	return (
		<>
			<Header />
			<div className='container-md pt-3'>
				{status === 'loaded'
					? messages.map(mess => <MessageItem key={mess._id} {...mess} />)
					: null}
			</div>
			<Footer />
		</>
	);
};
