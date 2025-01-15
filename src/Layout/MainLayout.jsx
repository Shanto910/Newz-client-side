import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import MainNavbar from '../Components/MainNavbar/MainNavbar';
import TopNavbar from '../Components/TopNavbar/TopNavbar';

const MainLayout = () => {
	return (
		<>
			<MainNavbar />
			<div className="flex flex-col">
				<TopNavbar />
				<Outlet />
				<Footer />
			</div>
		</>
	);
};

export default MainLayout;
