import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { ImNewspaper } from 'react-icons/im';
import { MdOutlineClose, MdMenu } from 'react-icons/md';
import useAuth from '../../Hooks/useAuth';
import useAdmin from '../../Hooks/useAdmin';
import usePremium from '../../Hooks/usePremium';

const TopNavbar = () => {
	const { user, logOut } = useAuth();
	const [isAdmin] = useAdmin();
	const [isPremium] = usePremium();
	const [menuOpen, setMenuOpen] = useState(false);

	const toggleMenu = () => setMenuOpen(!menuOpen);

	const AuthButtons = () => (
		<div className="flex items-center gap-4">
			{user?.email ? (
				<>
					<Link to="/my-profile">
						<img
							className="object-cover w-10 h-10 rounded-full"
							referrerPolicy="no-referrer"
							src={user.photoURL}
							alt="Profile"
						/>
					</Link>
					<button
						onClick={logOut}
						className="font-medium text-gray-700 underline hover:text-gray-800">
						Log Out
					</button>
				</>
			) : (
				<>
					<Link
						to="/login"
						className="px-4 py-2 text-white bg-gray-700 border border-gray-700 hover:bg-gray-800 hover:border-gray-800">
						Login
					</Link>
					<Link
						to="/register"
						className="px-4 py-2 text-gray-800 bg-white border border-gray-800 hover:bg-gray-800 hover:text-white">
						Register
					</Link>
				</>
			)}
		</div>
	);

	return (
		<nav className="fixed top-0 left-0 right-0 z-10 flex items-center justify-between h-16 gap-6 px-4 bg-white shadow-sm md:px-8 backdrop-blur-md bg-opacity-20">
			<div className="flex items-center gap-4 mr-auto">
				<button onClick={toggleMenu} className="text-3xl text-gray-700 lg:hidden">
					{menuOpen ? <MdOutlineClose /> : <MdMenu />}
				</button>

				<Link
					to="/"
					className="flex items-center gap-1 text-2xl font-semibold text-gray-700 hover:text-gray-800">
					<ImNewspaper className="text-3xl" />
					<span>Newz</span>
				</Link>
			</div>

			<div className="items-center hidden h-full gap-6 lg:flex topbar">
				<NavLink
					to="/"
					className="flex items-center h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800">
					Home
				</NavLink>
				<NavLink
					to="/all-articles"
					className="flex items-center h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800">
					All Articles
				</NavLink>
				{user?.email && (
					<>
						<NavLink
							to="/add-articles"
							className="flex items-center h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800">
							Add article
						</NavLink>
						<NavLink
							to="/my-articles"
							className="flex items-center h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800">
							My article
						</NavLink>
						<NavLink
							to="/subscription"
							className="flex items-center h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800">
							Subscription
						</NavLink>
					</>
				)}
				{user?.email && isPremium && (
					<NavLink
						to="/premium-articles"
						className="flex items-center h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800">
						Premium Articles
					</NavLink>
				)}
				{user?.email && isAdmin && (
					<NavLink
						to="/dashboard"
						className="flex items-center h-full font-semibold text-gray-600 transition duration-300 hover:text-gray-800">
						Dashboard
					</NavLink>
				)}
			</div>

			<AuthButtons />

			{menuOpen && (
				<div className="absolute left-0 flex flex-col w-[200px] py-4 space-y-2 bg-white shadow-md lg:hidden top-16 menubar">
					<NavLink
						to="/"
						className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100">
						Home
					</NavLink>
					<NavLink
						to="/all-articles"
						className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100">
						All Articles
					</NavLink>
					{user?.email && (
						<>
							<NavLink
								to="/add-articles"
								className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100">
								Add article
							</NavLink>
							<NavLink
								to="/my-articles"
								className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100">
								My article
							</NavLink>
							<NavLink
								to="/subscription"
								className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100">
								Subscription
							</NavLink>
						</>
					)}
					{user?.email && isPremium && (
						<NavLink
							to="/premium-articles"
							className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100">
							Premium Articles
						</NavLink>
					)}
					{user?.email && isAdmin && (
						<NavLink
							to="/dashboard"
							className="px-4 py-2 font-semibold text-gray-600 hover:text-gray-800 hover:bg-gray-100">
							Dashboard
						</NavLink>
					)}
				</div>
			)}
		</nav>
	);
};

export default TopNavbar;
