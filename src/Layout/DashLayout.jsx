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
		<div className="flex gap-16 h-full">
			<SideNavbar />
			<div className="basis-14 lg:basis-48"></div>
			<Outlet />
		</div>
	);
};

export default DashLayout;
