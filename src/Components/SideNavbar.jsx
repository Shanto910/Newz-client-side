import { Link, NavLink } from 'react-router-dom';
import { GiNewspaper } from 'react-icons/gi';
import { FaHome } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa6';
import { MdManageSearch } from 'react-icons/md';
import { FaAddressCard } from 'react-icons/fa6';
import { MdSpaceDashboard } from 'react-icons/md';
import { MdArticle } from 'react-icons/md';
import { CgPlayListAdd } from 'react-icons/cg';
import { LiaBookSolid } from 'react-icons/lia';
import { MdWorkspacePremium } from 'react-icons/md';

const SideNavbar = () => {
	return (
		<nav className="fixed z-30 h-full overflow-hidden overflow-y-auto text-gray-400 transition-all duration-300 ease-in-out bg-gray-800 lg:w-40 w-14 sidebar hover:w-40 isolate">
			<div className="w-40 h-full">
				<Link to={'/'} className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3">
					<GiNewspaper className="w-8 h-8 col-span-2 fill-current" />
					<span className="col-span-5 font-bold">Newz</span>
				</Link>
				<hr className="border-t border-t-gray-500" />
				<NavLink
					to={'/dashboard'}
					end
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<MdSpaceDashboard className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">Dashboard</span>
				</NavLink>
				<NavLink
					to={'/dashboard/users'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<FaUsers className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">All Users</span>
				</NavLink>
				<NavLink
					to={'/dashboard/manageArticles'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<MdManageSearch className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">All Articles</span>
				</NavLink>
				<NavLink
					to={'/dashboard/addPublisher'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<FaAddressCard className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">Add Publisher</span>
				</NavLink>

				<hr className="border-t border-t-gray-500" />
				<NavLink
					to={'/'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<FaHome className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">Home</span>
				</NavLink>
				<NavLink
					to={'/all-articles'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<MdArticle className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">All articles</span>
				</NavLink>
				<NavLink
					to={'/add-articles'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<CgPlayListAdd className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">Add articles</span>
				</NavLink>
				<NavLink
					to={'/my-articles'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<LiaBookSolid className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">My articles</span>
				</NavLink>
				<NavLink
					to={'/subscription'}
					className="grid items-center w-full grid-cols-7 gap-4 px-3 py-3 hover:bg-gray-700 hover:text-gray-100">
					<MdWorkspacePremium className="w-6 h-6 col-span-2 ml-1 fill-current" />
					<span className="col-span-5 text-sm font-medium">Subscription</span>
				</NavLink>
			</div>
		</nav>
	);
};

export default SideNavbar;
