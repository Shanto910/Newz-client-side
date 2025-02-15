import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import 'swiper/css';
import useAxiosSecure from '../Hooks/useAxiosSecure';
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
		<div className="mb-12 md:mb-24">
			<div className="px-4 mb-8 text-center lg:px-8">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">
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
				className="max-w-screen-xl mx-auto bg-gray-100 mySwiper">
				{publishers.map(publisher => (
					<SwiperSlide key={publisher._id} className="min-w-fit">
						<div className="flex items-center justify-center gap-4 py-10">
							<img
								src={publisher.image}
								className="object-cover w-10 h-10 rounded-full"
							/>
							<p className="text-2xl font-bold text-gray-500">{publisher.name}</p>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default AllPublishers;
