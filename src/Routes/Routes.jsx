import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import LogIn from '../Pages/LogIn';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';
import PageNotFound from '../Pages/PageNotFound';
import DashLayout from '../Layout/DashLayout';

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
		path: 'dashboard',
		element: (
			<PrivateRoute>
				<DashLayout />
			</PrivateRoute>
		),
		children: [
			{
				path: 'users',
				element: <h2>all users here</h2>,
			},
		],
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]);
