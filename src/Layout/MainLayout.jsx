import { Outlet } from 'react-router-dom';
import Footer from '../Components/Footer/Footer';
import TopNavbar from '../Components/TopNavbar/TopNavbar';
import Spinner from '../Components/Spinner/Spinner';
import useAuth from '../Hooks/useAuth';

const MainLayout = () => {
	const { loading } = useAuth();

	if (loading) {
		return <Spinner />;
	}
	return (
		<>
			<TopNavbar />
			<div className="mt-16"></div>
			<Outlet />
			<Footer />
		</>
	);
};

export default MainLayout;
