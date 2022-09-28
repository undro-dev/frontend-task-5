import React from 'react';
import socketIO from 'socket.io-client';

import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';

import { useState } from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';

import axios from '../axios.js';
import { fetchAllUsersData } from '../redux/slices/allUserSlice';
import { CustomMenu, CustomToggle } from './DropDown';
import { fetchSentMessages } from '../redux/slices/SentMessages';

import { toast } from 'react-toastify';

export const FormPost = () => {
	const socket = socketIO.connect(process.env.REACT_APP_API_URL);
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const { data, status } = useSelector(state => state.users);
	const currentUserName = useSelector(state => state.login.data.name);

	const [value, setValue] = useState(currentUserName);
	const [textAreaValue, setTextAreaValue] = useState('');
	const [titleValue, setTitleValue] = useState('');
	const [toId, setToID] = useState('');

	const infoUsers = { author: currentUserName, sender: value };

	useEffect(() => {
		dispatch(fetchAllUsersData());
	}, [dispatch]);

	const handleClick = async e => {
		setValue(e.target.innerHTML);
		const { data } = await axios.post('/auth/recipient', {
			name: e.target.innerHTML,
		});
		setToID(data.socketId);
	};

	const isUsersLoading = status === 'loading';

	useEffect(() => {
		socket.on('connect', () => {
			axios.post('/auth/login', { name: value, socketId: socket.id });
		});
	}, []);

	useEffect(() => {
		socket.on('recv_message', data => toast(`${data.author}: ${data.text}`));
	}, [socket]);
	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			title: '',
			text: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async values => {
		try {
			const infoMessage = { ...infoUsers, ...values };

			await axios.post('/posts', infoMessage);

			socket.emit('sent_message', {
				...infoMessage,
				toId,
			});

			setTitleValue('');
			setTextAreaValue('');

			await dispatch(fetchSentMessages({ ...infoUsers }));

			navigate('/sent-messages');
			return toast(`${currentUserName}, message sent to ${value} 😀`);
		} catch (error) {
			console.log(error);
		}
	};

	return (
		<div className='container-md pt-3'>
			<Form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto'>
				<Dropdown className='mb-3' menuvariant='dark'>
					<Dropdown.Toggle as={CustomToggle} id='dropdown-custom-components'>
						{value ? value : currentUserName}
					</Dropdown.Toggle>
					<Dropdown.Menu as={CustomMenu}>
						{isUsersLoading
							? null
							: data.map(user => (
									<Dropdown.Item
										eventKey={user.name}
										key={user._id}
										onClick={e => handleClick(e)}
									>
										{user.name}
									</Dropdown.Item>
							  ))}
					</Dropdown.Menu>
				</Dropdown>
				<Form.Group className='mb-3' controlId='exampleForm.ControlInput1'>
					<Form.Label>Title</Form.Label>
					<Form.Control
						className='mb-2'
						type='text'
						placeholder='Barbecue'
						{...register('title', { required: 'Enter your title' })}
						onChange={e => setTitleValue(e.target.value)}
						value={titleValue}
					/>
					{errors.title ? (
						<span className='text-danger'>{errors.title.message}</span>
					) : null}
				</Form.Group>
				<Form.Group className='mb-3' controlId='exampleForm.ControlTextarea1'>
					<Form.Label>Text</Form.Label>
					<Form.Control
						className='mb-2'
						as='textarea'
						rows={3}
						{...register('text', { required: 'Enter your text' })}
						onChange={e => setTextAreaValue(e.target.value)}
						value={textAreaValue}
					/>
					{errors.text ? (
						<span className='text-danger'>{errors.text.message}</span>
					) : null}
				</Form.Group>
				<Button variant='dark' type='submit'>
					Send
				</Button>
			</Form>
		</div>
	);
};
