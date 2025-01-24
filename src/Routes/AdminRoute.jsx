import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAdmin from '../Hooks/useAdmin';
import PropTypes from 'prop-types';
import Spinner from '../Components/Spinner/Spinner';

const AdminRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const [isAdmin, isAdminLoading] = useAdmin();
	const location = useLocation();

	if (loading || isAdminLoading) {
		return <Spinner />;
	}

	if (user && isAdmin) {
		return children;
	}

	return <Navigate to="/" state={{ from: location }} replace></Navigate>;
};

AdminRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default AdminRoute;
