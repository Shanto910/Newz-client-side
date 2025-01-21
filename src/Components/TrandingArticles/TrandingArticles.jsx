import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Navigation, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Link } from 'react-router-dom';

const trendingArticles = [
	{
		name: 'John Doe',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		title: 'Tech Innovations in 2025: What to Expect',
		description:
			'As we enter 2025, the world is poised for rapid advancements in technology that will not only change how we live and work but will also define the future of multiple industries. The intersection of Artificial Intelligence (AI), machine learning, robotics, and quantum computing promises to shape a new era of innovation. In this year, we can expect AI to become more integrated into daily life, automating tasks across sectors like healthcare, finance, and logistics. The healthcare industry is particularly primed for breakthroughs, with AI enabling better diagnostics, personalized treatments, and faster drug development. Quantum computing, though still in its early stages, holds the potential to revolutionize industries that rely on complex data processing, such as finance, cybersecurity, and pharmaceuticals. Additionally, advancements in robotics are likely to impact manufacturing, agriculture, and even service industries, leading to more efficient processes and a shift in the global workforce. These technological trends in 2025 will not only push boundaries but will also bring about ethical and societal challenges that need careful consideration.',
		views: 13456,
		_id: 1,
	},
	{
		name: 'Jane Smith',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		title: 'Global Economic Forecast: Insights for 2025',
		description:
			'As the world looks to 2025, economists and market experts are predicting significant shifts in the global economic landscape. With geopolitical tensions, evolving trade policies, and the lingering effects of the COVID-19 pandemic, businesses and governments are bracing for an uncertain economic environment. However, there are also signs of recovery and new opportunities, especially in emerging markets. One of the most important trends to watch is the post-pandemic recovery in developed nations, which is expected to be led by advancements in technology, infrastructure projects, and increased consumer demand. Meanwhile, developing countries may face challenges such as inflation, rising debt levels, and political instability, but they will also be key players in global supply chains and innovation. Additionally, environmental concerns and climate change are expected to shape economic policies, with more emphasis on sustainable investments and green technologies. As we look toward 2025, understanding the interplay between these factors will be crucial for businesses, investors, and policymakers in navigating a complex global economy.',
		views: 8942,
		_id: 2,
	},
	{
		name: 'Emma Johnson',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		title: 'Breaking News: Major Policy Shift in US Government',
		description:
			'A major policy shift in the US government has sent shockwaves across the nation, as new legislation promises to reshape the political and economic landscape. This shift, driven by the current administration’s desire to address pressing issues such as healthcare, climate change, and economic inequality, has the potential to change the way Americans live, work, and engage with their government. The policy changes are expected to impact a wide range of sectors, including energy, healthcare, taxation, and social services. One of the most significant aspects of the shift is a focus on environmental sustainability, with the government proposing new regulations aimed at reducing carbon emissions and promoting clean energy. Healthcare reform, which has long been a contentious issue in the US, is also on the table, with proposals to make healthcare more accessible and affordable for all citizens. Additionally, the policy shift includes changes to labor laws and tax regulations, which could have far-reaching effects on both businesses and individuals. While the implications of these changes remain to be fully seen, it is clear that the US government is positioning itself for a bold new direction that could have lasting consequences on the nation’s future.',
		views: 56321,
		_id: 3,
	},
	{
		name: 'Mark Brown',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		title: 'AI in Healthcare: Revolutionizing Patient Care',
		description:
			'The role of Artificial Intelligence (AI) in healthcare is rapidly expanding, with groundbreaking advancements set to transform the way patients are diagnosed, treated, and cared for. In 2025, AI is no longer a concept of the future but an integral part of the healthcare landscape, revolutionizing everything from administrative processes to clinical decision-making. AI-powered tools are already helping doctors make more accurate diagnoses by analyzing medical images, lab results, and patient history more efficiently than ever before. Personalized medicine, enabled by AI, is providing tailored treatment plans for patients based on their unique genetic profiles and health data, leading to more effective and targeted therapies. Moreover, AI is playing a pivotal role in drug discovery, allowing researchers to identify potential treatments faster and at a lower cost. The technology is also streamlining administrative tasks, reducing paperwork, and improving the overall efficiency of healthcare delivery. Despite these advancements, the integration of AI in healthcare raises important ethical and privacy concerns, as patient data is increasingly handled by algorithms. Ensuring that AI is used responsibly and ethically in healthcare will be crucial to its long-term success.',
		views: 22345,
		_id: 4,
	},
	{
		name: 'Sophia Lee',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		title: "The Future of Electric Vehicles: What's Next?",
		description:
			'The electric vehicle (EV) industry is poised for a transformative period in 2025, as new technologies, government policies, and shifting consumer demands drive the future of sustainable transportation. The global push toward reducing carbon emissions and combating climate change has placed EVs at the forefront of the automotive industry. In the coming years, we can expect significant advances in battery technology, which will improve the range, efficiency, and affordability of electric vehicles. This, in turn, will make EVs more accessible to a broader range of consumers, further accelerating their adoption worldwide. Additionally, government incentives and subsidies are likely to continue supporting the growth of the EV market, with many countries setting ambitious targets for EV sales and phasing out internal combustion engine vehicles. The rise of EVs will also lead to new infrastructure developments, including an expansion of charging stations and improvements to the electrical grid. However, challenges remain, including the need to secure sustainable sources of raw materials for battery production and the integration of renewable energy sources into the charging network. The future of electric vehicles is bright, but it will require careful planning and innovation to fully realize their potential.',
		views: 32567,
		_id: 5,
	},
	{
		name: 'Oliver Davis',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		title: 'Climate Change: How It’s Affecting Global Agriculture',
		description:
			'The effects of climate change are becoming increasingly apparent in the world of agriculture, where rising temperatures, shifting precipitation patterns, and extreme weather events are disrupting food production systems around the globe. In 2025, farmers and agricultural experts are grappling with the reality of these changes, which threaten to reduce crop yields, increase food prices, and create instability in food supply chains. Rising temperatures are leading to more frequent and severe droughts, while unpredictable weather patterns are causing flooding and damage to crops. In some regions, these changes are making traditional farming practices less viable, forcing farmers to adopt new methods of crop cultivation, irrigation, and pest control. Additionally, climate change is affecting the types of crops that can be grown in certain areas, with some crops becoming less viable in their traditional growing regions. To address these challenges, there is a growing push for sustainable farming practices, such as the use of precision agriculture, which leverages technology to optimize resources and reduce environmental impact. Furthermore, governments, businesses, and international organizations are working together to develop solutions to support climate-resilient agriculture and ensure food security for future generations. However, the road ahead remains difficult, and the agricultural industry will need to adapt quickly to survive in an increasingly volatile climate.',
		views: 14789,
		_id: 6,
	},
];

const TrandingArticles = () => {
	return (
		<div className="max-w-screen-xl mx-auto relative isolate mb-12 md:mb-24 mt-16">
			<div className="text-lg md:text-xl font-semibold">
				<p className="absolute top-4 left-4 bg-white text-white z-10 p-2 -skew-x-6 border-b-4 border-l-4 border-gray-700">
					Tranding Articles
				</p>
				<p className="absolute top-4 left-5 text-gray-700 z-10 p-2">Tranding Articles</p>
			</div>

			<Swiper
				modules={[Navigation, Pagination, Autoplay]}
				navigation={true}
				pagination={{ clickable: true }}
				autoplay={{ delay: 5000 }}
				speed={700}
				loop={true}>
				{trendingArticles.map((banner, i) => (
					<SwiperSlide key={i}>
						<div className="relative h-80 md:h-96">
							<img
								src={banner.image}
								alt={banner.title}
								className="w-full h-full object-cover opacity-50"
							/>
							<div className="absolute top-1/4 md:top-1/3 left-1/2 transform -translate-x-1/2 text-center lg:w-2/3 md:w-4/5 w-11/12">
								<h2 className="md:text-4xl text-2xl font-bold mb-4 text-gray-700">
									{banner.title}
								</h2>
								<p className="text-lg md:text-xl max-w-[66ch] text-gray-800 mx-auto text-ellipsis-custom">
									{banner.description}
								</p>
								<Link
									to={`/article/${banner._id}`}
									className="mt-6 inline-block text-lg md:text-xl text-white bg-gray-700 hover:bg-gray-800 px-4 py-2">
									More about this article
								</Link>
							</div>
						</div>
					</SwiperSlide>
				))}
			</Swiper>
		</div>
	);
};

export default TrandingArticles;
