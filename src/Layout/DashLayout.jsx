import { Outlet } from 'react-router-dom';
import SideNavbar from '../Components/SideNavbar/SideNavbar';
import Spinner from '../Components/Spinner/Spinner';
import useAuth from '../Hooks/useAuth';

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
