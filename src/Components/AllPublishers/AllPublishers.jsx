import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const AllPublishers = () => {
	const axiosSecure = useAxiosSecure();
	const { data: publishers = [] } = useQuery({
		queryKey: ['publishers'],
		queryFn: async () => {
			const res = await axiosSecure.get('/publisher');
			return res.data;
		},
	});
	return (
		<div className="max-w-screen-xl mx-auto mb-12 md:mb-24">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">
					Our Publishers
				</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Explore a diverse range of categories and brands that deliver the latest news
					and stories
				</p>
			</div>

			<Swiper
				spaceBetween={30}
				centeredSlides={true}
				autoplay={{ delay: 2000 }}
				speed={500}
				loop={publishers.length >= 4}
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
				{publishers.map(publisher => (
					<SwiperSlide key={publisher._id} className="min-w-fit">
						<div className="flex gap-4 justify-center items-center py-10">
							<img
								src={publisher.image}
								className="w-10 h-10 rounded-full object-cover"
							/>
							<p className="font-bold text-2xl text-gray-500">{publisher.name}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default AllPublishers;
