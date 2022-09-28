import React from 'react';
import Accordion from 'react-bootstrap/Accordion';
import Moment from 'react-moment';

export const MessageItem = ({ author, createdAt, title, text }) => {
	return (
		<Accordion defaultActiveKey='1' flush>
			<Accordion.Item eventKey='0'>
				<Accordion.Header>
					Author: {author} / Title: {title}/ Date:
					<Moment format='YYYY-MM-DD HH:mm'>{createdAt}</Moment>
				</Accordion.Header>
				<Accordion.Body>{text}</Accordion.Body>
			</Accordion.Item>
		</Accordion>
	);
};
