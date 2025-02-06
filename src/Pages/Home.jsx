import { useNavigate } from 'react-router-dom';
import AllPublishers from '../Components/AllPublishers/AllPublishers';
import HomeUserStatistics from '../Components/HomeUserStatistics/HomeUserStatistics';
import SubscriptionPlans from '../Components/SubscriptionPlans/SubscriptionPlans';
import TrandingArticles from '../Components/TrandingArticles/TrandingArticles';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';

const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();

	useEffect(() => {
		const timer = setTimeout(() => {
			setShowModal(true);
		}, 10000);

		return () => clearTimeout(timer);
	}, []);

	useEffect(() => {
		if (showModal) {
			Swal.fire({
				title: 'Subscribe to Premium!',
				text: 'Get exclusive features and content. Click below to explore subscription plans.',
				icon: 'info',
				confirmButtonText: 'Go to Subscription',
				showCancelButton: true,
				cancelButtonText: 'Maybe Later',
				focusCancel: true,
				customClass: {
					popup: 'rounded-none',
					confirmButton:
						'text-white transition duration-300 bg-gray-700 hover:bg-gray-800 rounded-none',
					cancelButton:
						'text-gray-700 transition duration-300 bg-transparent hover:text-gray-800 rounded-none',
				},
			}).then(result => {
				if (result.isConfirmed) {
					navigate('/subscription');
				}
			});
		}
	}, [showModal, navigate]);

	return (
		<>
			<TrandingArticles />
			<AllPublishers />
			<HomeUserStatistics />
			<SubscriptionPlans />
		</>
	);
};

export default Home;
