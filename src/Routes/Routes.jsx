import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import LogIn from '../Pages/LogIn';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';
import PageNotFound from '../Pages/PageNotFound';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <MainLayout />,
		children: [
			{
				path: '/',
				element: <Home />,
			},
			{
				path: '/login',
				element: <LogIn />,
			},
			{
				path: '/register',
				element: <Register />,
			},
			{
				path: '/add-articles',
				element: (
					<PrivateRoute>
						<h1>add articles</h1>
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]);
