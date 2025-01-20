import { Link, NavLink } from 'react-router-dom';
import { GiNewspaper } from 'react-icons/gi';
import useAuth from '../../Hooks/useAuth';

const TopNavbar = () => {
	const { user, logOut } = useAuth();
	return (
		<nav className="sticky top-0 left-0 h-14 px-4 md:px-8 flex items-center gap-4 bg-white backdrop-blur-md bg-opacity-20 shadow-sm z-10">
			<Link
				to={'/'}
				className="text-2xl font-semibold text-gray-700 hover:text-gray-800 flex gap-1 items-center mr-auto">
				<GiNewspaper className="text-5xl" />
				<span>Newz</span>
			</Link>

			<NavLink
				to={'/'}
				className="text-gray-600 hover:text-gray-800 font-semibold transition duration-300 h-full md:flex items-center hidden">
				Home
			</NavLink>
			<NavLink
				to={'/all-articles'}
				className="text-gray-600 hover:text-gray-800 font-semibold transition duration-300 h-full md:flex items-center hidden">
				All Articles
			</NavLink>

			{user?.email ? (
				<>
					<img
						className="w-10 h-10 rounded-full"
						referrerPolicy="no-referrer"
						src={user.photoURL}
					/>
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
						className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 border border-gray-700 hover:border-gray-800 transition duration-300">
						Login
					</Link>
					<Link
						to={'/register'}
						className="text-gray-800 bg-white hover:bg-gray-800 hover:text-white px-4 py-2 border border-gray-800 box-border transition duration-300">
						Register
					</Link>
				</>
			)}
		</nav>
	);
};

export default TopNavbar;
