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
import AllArticles from '../Pages/AllArticles';
import MyProfile from '../Pages/MyProfile';
import MyArticles from '../Pages/MyArticles';
import Dashboard from '../Pages/Dashboard';
import UpdateArticle from '../Pages/UpdateArticle';
import ArticleDetails from '../Pages/ArticleDetails';
import SubscriptionPage from '../Pages/SubscriptionPage';
import Payment from '../Pages/Payment';
import PremiumArticles from '../Pages/PremiumArticles';
import PremiumRoute from './PremiumRoute';

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
				path: '/all-articles',
				element: <AllArticles />,
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
				path: '/my-profile',
				element: (
					<PrivateRoute>
						<MyProfile />
					</PrivateRoute>
				),
			},
			{
				path: '/my-articles',
				element: (
					<PrivateRoute>
						<MyArticles />
					</PrivateRoute>
				),
			},
			{
				path: '/add-articles',
				element: (
					<PrivateRoute>
						<AddArticles />
					</PrivateRoute>
				),
			},
			{
				path: `/update-article/:id`,
				element: (
					<PrivateRoute>
						<UpdateArticle />
					</PrivateRoute>
				),
			},
			{
				path: `/article-details/:id`,
				element: (
					<PrivateRoute>
						<ArticleDetails />
					</PrivateRoute>
				),
			},
			{
				path: '/subscription',
				element: (
					<PrivateRoute>
						<SubscriptionPage />
					</PrivateRoute>
				),
			},
			{
				path: '/payment',
				element: (
					<PrivateRoute>
						<Payment />
					</PrivateRoute>
				),
			},
			{
				path: '/premium-articles',
				element: (
					<PremiumRoute>
						<PremiumArticles />
					</PremiumRoute>
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
				path: '',
				element: <Dashboard />,
			},
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
