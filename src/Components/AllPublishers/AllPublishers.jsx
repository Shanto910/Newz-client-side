import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';

const trendingArticles = [
	{
		name: 'John Doe',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		_id: 1,
	},
	{
		name: 'Jane Smith',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		_id: 2,
	},
	{
		name: 'Emma Johnson',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		_id: 3,
	},
	{
		name: 'Mark Brown',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		_id: 4,
	},
	{
		name: 'Sophia Lee',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		_id: 5,
	},
	{
		name: 'Oliver Davis',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		_id: 6,
	},
];

const AllPublishers = () => {
	return (
		<div className="max-w-screen-xl mx-auto mb-12 md:mb-24">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700">Our Publishers</h2>
			</div>

			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{ delay: 2000 }}
				speed={500}
				loop={true}
				modules={[Autoplay]}
				breakpoints={{
					425: {
						slidesPerView: 2,
					},
					768: {
						slidesPerView: 3,
					},
					1024: {
						slidesPerView: 4,
					},
				}}
				className="mySwiper bg-gray-100">
				{trendingArticles.map(banner => (
					<SwiperSlide key={banner._id} className="min-w-fit">
						<div className="flex gap-4 justify-center items-center py-10">
							<img
								src={banner.image}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<p className="font-bold text-2xl text-gray-500">{banner.name}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default AllPublishers;
