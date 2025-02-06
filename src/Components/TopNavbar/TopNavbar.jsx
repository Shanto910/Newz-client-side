import { Link, NavLink } from 'react-router-dom';
import { GiNewspaper } from 'react-icons/gi';
import useAuth from '../../Hooks/useAuth';
import useAdmin from '../../Hooks/useAdmin';

const TopNavbar = () => {
	const { user, logOut } = useAuth();
	const [isAdmin] = useAdmin();

	return (
		<nav className="fixed top-0 left-0 right-0 z-10 flex items-center h-16 gap-4 px-4 bg-white shadow-sm md:px-8 backdrop-blur-md bg-opacity-20 topbar">
			<Link
				to={'/'}
				className="flex items-center gap-1 mr-auto text-2xl font-semibold text-gray-700 hover:text-gray-800">
				<GiNewspaper className="text-5xl" />
				<span>Newz</span>
			</Link>

			<NavLink
				to={'/'}
				className="items-center hidden h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800 md:flex">
				Home
			</NavLink>
			<NavLink
				to={'/all-articles'}
				className="items-center hidden h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800 md:flex">
				All Articles
			</NavLink>

			{user?.email ? (
				<>
					<NavLink
						to={'/add-articles'}
						className="items-center hidden h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800 md:flex">
						Add article
					</NavLink>
					<NavLink
						to={'/my-articles'}
						className="items-center hidden h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800 md:flex">
						My article
					</NavLink>
				</>
			) : (
				''
			)}

			{user?.email && isAdmin ? (
				<NavLink
					to={'dashboard'}
					className="items-center hidden h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800 md:flex">
					Dashboard
				</NavLink>
			) : (
				''
			)}

			{user?.email ? (
				<>
					<Link to={'/my-profile'}>
						<img
							className="object-cover w-10 h-10 rounded-full"
							referrerPolicy="no-referrer"
							src={user.photoURL}
						/>
					</Link>

					<button
						onClick={logOut}
						className="font-medium text-gray-700 underline hover:text-gray-800 hover:no-underline">
						Log Out
					</button>
				</>
			) : (
				<>
					<Link
						to={'/login'}
						className="px-4 py-2 text-white transition duration-300 bg-gray-700 border border-gray-700 hover:bg-gray-800 hover:border-gray-800">
						Login
					</Link>
					<Link
						to={'/register'}
						className="box-border px-4 py-2 text-gray-800 transition duration-300 bg-white border border-gray-800 hover:bg-gray-800 hover:text-white">
						Register
					</Link>
				</>
			)}
		</nav>
	);
};

export default TopNavbar;
