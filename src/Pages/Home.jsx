import AllPublishers from '../Components/AllPublishers/AllPublishers';
import HomeUserStatistics from '../Components/HomeUserStatistics/HomeUserStatistics';
import SubscriptionPlans from '../Components/SubscriptionPlans/SubscriptionPlans';
import TrandingArticles from '../Components/TrandingArticles/TrandingArticles';

const Home = () => {
	return (
		<div>
			<TrandingArticles />
			<AllPublishers />
			<HomeUserStatistics />
			<SubscriptionPlans />
		</div>
	);
};

export default Home;
