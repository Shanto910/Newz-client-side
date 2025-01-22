import { Outlet } from 'react-router-dom';
import SideNavbar from '../Components/SideNavbar/SideNavbar';

const DashLayout = () => {
	return (
		<div>
			<SideNavbar />
			<Outlet />
		</div>
	);
};

export default DashLayout;
