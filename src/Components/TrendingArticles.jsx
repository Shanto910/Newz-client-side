import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const TrendingArticles = () => {
	const { user } = useAuth();
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const { data: trendingArticles = [] } = useQuery({
		queryKey: ['trendingArticles'],
		queryFn: async () => {
			const { data } = await axiosPublic.get('/trending-articles');
			return data;
		},
	});

	const { data: userInfo } = useQuery({
		queryKey: ['userInfo', user?.email],
		queryFn: async () => {
			if (user?.email) {
				const { data } = await axiosSecure.get(`/users/${user.email}`);
				return data;
			}
			return null;
		},
	});

	return (
		<div className="mb-12 isolate md:mb-24">
			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				navigation={true}
				pagination={{ clickable: true }}
				autoplay={{ delay: 5000 }}
				speed={700}
				loop={true}
				className="relative max-w-screen-xl mx-auto">
				{trendingArticles.map((article, i) => (
					<SwiperSlide key={i}>
						<div className="relative h-80 md:h-96">
							<img
								src={article.image}
								alt={article.title}
								className="object-cover w-full h-full opacity-50"
							/>
							<div className="absolute w-11/12 text-center transform -translate-x-1/2 top-1/4 md:top-1/3 left-1/2 lg:w-2/3 md:w-4/5">
								<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">
									{article.title}
								</h2>
								<p className="text-lg md:text-xl max-w-[66ch] text-gray-800 mx-auto text-ellipsis-custom">
									{article.description}
								</p>
								<Link
									to={`/article-details/${article._id}`}
									className={`py-2 mt-6 text-white text-lg text-center inline-block px-4 ${
										article.articleType === 'premium' &&
										(!userInfo?.premiumTaken ||
											Date.now() > userInfo.premiumTaken)
											? 'bg-gray-400 pointer-events-none'
											: 'bg-gray-700 hover:bg-gray-800'
									}`}>
									More about this article
								</Link>
							</div>
						</div>
					</SwiperSlide>
				))}
				<div className="text-lg font-semibold md:text-xl">
					<p className="absolute z-10 p-2 text-white -skew-x-6 bg-white border-b-4 border-l-4 border-gray-700 top-4 left-4">
						Trending Articles
					</p>
					<p className="absolute z-10 p-2 text-gray-700 top-4 left-5">
						Trending Articles
					</p>
				</div>
			</Swiper>
		</div>
	);
};

export default TrendingArticles;
