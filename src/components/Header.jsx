import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import { logout } from '../redux/slices/userSlice.js';

const Header = () => {
	const dispatch = useDispatch();
	const { data } = useSelector(state => state.login);

	return (
		<Navbar bg='dark' expand='lg' variant='dark'>
			<Container>
				<Navbar.Brand>Task 5</Navbar.Brand>
				<Navbar.Toggle aria-controls='basic-navbar-nav' />
				<Navbar.Collapse id='basic-navbar-nav'>
					{data ? (
						<Nav className='me-auto'>
							<Nav.Link as={Link} to='/posts'>
								New message
							</Nav.Link>
							<Nav.Link as={Link} to='/incoming-messages'>
								Incoming messages
							</Nav.Link>
							<Nav.Link as={Link} to='/' onClick={dispatch(logout)}>
								Logout
							</Nav.Link>
						</Nav>
					) : null}
				</Navbar.Collapse>
			</Container>
		</Navbar>
	);
};

export default Header;
