import AllPublishers from '../Components/AllPublishers/AllPublishers';
import HomeUserStatistics from '../Components/HomeUserStatistics/HomeUserStatistics';
import TrandingArticles from '../Components/TrandingArticles/TrandingArticles';

const Home = () => {
	return (
		<div>
			<TrandingArticles />
			<AllPublishers />
			<HomeUserStatistics />
			<h1>main</h1>
		</div>
	);
};

export default Home;
