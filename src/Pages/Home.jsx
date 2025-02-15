import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import FAQ from '../Components/FAQ';
import usePremium from '../Hooks/usePremium';
import Feature from '../Components/Feature';
import TrendingArticles from '../Components/TrendingArticles';
import AllPublishers from '../Components/AllPublishers';
import HomeUserStatistics from '../Components/HomeUserStatistics';
import SubscriptionPlans from '../Components/SubscriptionPlans';

const Home = () => {
	const [showModal, setShowModal] = useState(false);
	const navigate = useNavigate();
	const [isPremium] = usePremium();

	useEffect(() => {
		if (!isPremium) {
			const timer = setTimeout(() => {
				setShowModal(true);
			}, 10000);

			return () => clearTimeout(timer);
		}
	}, [isPremium]);

	useEffect(() => {
		if (!isPremium && showModal) {
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
	}, [showModal, navigate, isPremium]);

	return (
		<>
			<TrendingArticles />
			<AllPublishers />
			<HomeUserStatistics />
			<Feature />
			<SubscriptionPlans />
			<FAQ />
		</>
	);
};

export default Home;
