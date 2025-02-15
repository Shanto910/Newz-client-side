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
			<div className="relative max-w-screen-xl mx-auto">
				<Swiper
					spaceBetween={30}
					centeredSlides={true}
					autoplay={{
						delay: 1500,
						disableOnInteraction: false,
						pauseOnMouseEnter: true,
					}}
					speed={700}
					loop={true}
					modules={[Autoplay]}
					breakpoints={{
						425: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 30,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 40,
						},
					}}
					className="pb-12 mySwiper">
					{publishers.map(publisher => (
						<SwiperSlide key={publisher._id} className="!w-auto">
							<div>
								<div className="flex flex-col items-center justify-center p-6">
									<img
										src={publisher.image}
										alt={publisher.name}
										className="object-contain h-12 w-fit"
									/>
								</div>
							</div>
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};

export default AllPublishers;
