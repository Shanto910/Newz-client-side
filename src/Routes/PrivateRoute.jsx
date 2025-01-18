import { Navigate, useLocation } from 'react-router';
import useAuth from '../Hooks/useAuth';
import PropTypes from 'prop-types';

const PrivateRoute = ({ children }) => {
	const { user } = useAuth();
	const location = useLocation();

	if (user) {
		return children;
	}
	return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

PrivateRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PrivateRoute;
