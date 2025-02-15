import { Outlet } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import Spinner from '../Components/Spinner';
import TopNavbar from '../Components/TopNavbar';
import Footer from '../Components/Footer';

const MainLayout = () => {
	const { loading } = useAuth();

	if (loading) {
		return <Spinner />;
	}
	return (
		<div className="flex flex-col h-full">
			<TopNavbar />
			<div className="mt-16"></div>
			<Outlet />
			<Footer />
		</div>
	);
};

export default MainLayout;
