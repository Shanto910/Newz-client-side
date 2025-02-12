import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import usePremium from '../Hooks/usePremium';
import PropTypes from 'prop-types';
import Spinner from '../Components/Spinner/Spinner';

const PremiumRoute = ({ children }) => {
	const { user, loading } = useAuth();
	const [isPremium, isPremiumLoading] = usePremium();
	const location = useLocation();

	if (loading || isPremiumLoading) {
		return <Spinner />;
	}

	if (user && isPremium) {
		return children;
	}

	return <Navigate to="/subscription" state={{ from: location }} replace></Navigate>;
};

PremiumRoute.propTypes = {
	children: PropTypes.node.isRequired,
};

export default PremiumRoute;
