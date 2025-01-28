import { createBrowserRouter } from 'react-router-dom';
import MainLayout from '../Layout/MainLayout';
import Home from '../Pages/Home';
import LogIn from '../Pages/LogIn';
import Register from '../Pages/Register';
import PrivateRoute from './PrivateRoute';
import PageNotFound from '../Pages/PageNotFound';
import DashLayout from '../Layout/DashLayout';
import AllUsers from '../Pages/AllUsers';
import AdminRoute from './AdminRoute';
import AddPublisher from '../Pages/AddPublisher';
import AddArticles from '../Pages/AddArticles';
import ManageArticles from '../Pages/ManageArticles';

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
						<AddArticles />
					</PrivateRoute>
				),
			},
		],
	},
	{
		path: 'dashboard',
		element: (
			<AdminRoute>
				<DashLayout />
			</AdminRoute>
		),
		children: [
			{
				path: 'users',
				element: <AllUsers />,
			},
			{
				path: 'addPublisher',
				element: <AddPublisher />,
			},
			{
				path: 'manageArticles',
				element: <ManageArticles />,
			},
		],
	},
	{
		path: '*',
		element: <PageNotFound />,
	},
]);
