import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import PropTypes from 'prop-types';
import Spinner from '../Components/Spinner/Spinner';

const PrivateRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const location = useLocation();

	if (loading) {
		return <Spinner />;
	}

	if (user) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PrivateRoute;
