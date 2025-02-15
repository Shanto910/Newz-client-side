import { Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Spinner from '../Components/Spinner';
import SideNavbar from '../Components/SideNavbar';

const DashLayout = () => {
	const { loading } = useAuth();

	if (loading) {
		return <Spinner />;
	}

	return (
		<div className="flex min-h-full overflow-x-hidden">
			<SideNavbar />
			<div className="min-w-14 lg:min-w-40"></div>
			<Outlet />
		</div>
	);
};

export default DashLayout;
