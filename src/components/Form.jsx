import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';
import { fetchUserData } from '../redux/slices/userSlice';

const FormForLogin = () => {
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm({
		defaultValues: {
			name: '',
		},
		mode: 'onChange',
	});

	const onSubmit = async values => {
		const user = await dispatch(fetchUserData(values));
		if (user.payload) {
			window.localStorage.setItem('currentUser', user.payload.data.name);
		}
		navigate('/posts');
	};

	return (
		<div className='container-md pt-3'>
			<Form onSubmit={handleSubmit(onSubmit)} className='w-50 mx-auto'>
				<Form.Group className='mb-3' controlId='formBasicPassword'>
					<Form.Label>Name</Form.Label>
					<Form.Control
						className='mb-2'
						type='text'
						placeholder='Name'
						{...register('name', { required: 'Enter your name' })}
					/>
					{errors.name ? (
						<span className='text-danger'>{errors.name.message}</span>
					) : null}
				</Form.Group>
				<Button variant='primary' type='submit'>
					Submit
				</Button>
			</Form>
		</div>
	);
};

export default FormForLogin;
