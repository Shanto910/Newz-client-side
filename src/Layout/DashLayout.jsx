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
		<div className="flex gap-6 h-full">
			<SideNavbar />
			<div className="w-14"></div>
			<Outlet />
		</div>
	);
};

export default DashLayout;
