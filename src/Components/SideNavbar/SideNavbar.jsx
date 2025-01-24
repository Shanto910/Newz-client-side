import { Link, NavLink } from 'react-router-dom';
import { GiNewspaper } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { MdManageSearch } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa6';
import { MdSpaceDashboard } from 'react-icons/md';
import { MdArticle } from 'react-icons/md';

const SideNavbar = () => {
	return (
		<nav className="fixed lg:w-40 w-14 h-full text-gray-400 bg-gray-800 overflow-hidden sidebar hover:w-40 transition-all duration-300 ease-in-out">
			<div className="w-40 h-full">
				<Link to={'/'} className="grid grid-cols-7 items-center gap-4 w-full px-3 py-3">
					<GiNewspaper className="w-8 h-8 fill-current col-span-2" />
					<span className="font-bold col-span-5">Newz</span>
				</Link>
				<hr className="border-t border-t-gray-500" />
				<NavLink
					to={'/dashboard'}
					end
					className="grid grid-cols-7 items-center gap-4 w-full px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<MdSpaceDashboard className="w-6 h-6 fill-current col-span-2 ml-1" />
					<span className="text-sm font-medium col-span-5">Dashboard</span>
				</NavLink>
				<NavLink
					to={'/dashboard/users'}
					className="grid grid-cols-7 items-center gap-4 w-full px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<FaUsers className="w-6 h-6 fill-current col-span-2 ml-1" />
					<span className="text-sm font-medium col-span-5">All Users</span>
				</NavLink>
				<NavLink
					to={'/dashboard/manageArticles'}
					className="grid grid-cols-7 items-center gap-4 w-full px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<MdManageSearch className="w-6 h-6 fill-current col-span-2 ml-1" />
					<span className="text-sm font-medium col-span-5">All Articles</span>
				</NavLink>
				<NavLink
					to={'/dashboard/addPublisher'}
					className="grid grid-cols-7 items-center gap-4 w-full px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<FaAddressCard className="w-6 h-6 fill-current col-span-2 ml-1" />
					<span className="text-sm font-medium col-span-5">Add Publisher</span>
				</NavLink>

				<hr className="border-t border-t-gray-500" />
				<NavLink
					to={'/'}
					className="grid grid-cols-7 items-center gap-4 w-full px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<FaHome className="w-6 h-6 fill-current col-span-2 ml-1" />
					<span className="text-sm font-medium col-span-5">Home</span>
				</NavLink>
				<NavLink
					to={'/all-articles'}
					className="grid grid-cols-7 items-center gap-4 w-full px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<MdArticle className="w-6 h-6 fill-current col-span-2 ml-1" />
					<span className="text-sm font-medium col-span-5">All articles</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default SideNavbar;
