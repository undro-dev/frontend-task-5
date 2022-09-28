import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { IncomingMessages } from './pages/IncomingMessages.jsx';
import { Login } from './pages/Login.jsx';
import { Posts } from './pages/Posts.jsx';
import { SentMessages } from './pages/SentMessages.jsx';

const App = () => {
	return (
		<>
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/posts' element={<Posts />} />
				<Route path='/incoming-messages' element={<IncomingMessages />} />
				<Route path='/sent-messages' element={<SentMessages />} />
			</Routes>
			<ToastContainer position='top-right' />
		</>
	);
};

export default App;
