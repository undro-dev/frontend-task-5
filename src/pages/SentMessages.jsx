import React from 'react';

import Header from '../components/Header';
import { Footer } from '../components/Footer';
import { useSelector } from 'react-redux';

import { MessageItem } from '../components/MessageItem';

export const SentMessages = () => {
	const { messages, status } = useSelector(state => state.sentMessages);

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
