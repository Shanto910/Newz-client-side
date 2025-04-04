import { FaNewspaper, FaClock, FaShieldAlt, FaUsers } from 'react-icons/fa';
import { motion } from 'framer-motion';

const features = [
	{
		id: 1,
		icon: <FaNewspaper className="text-3xl text-gray-500" />,
		title: 'Breaking News 24/7',
		description: 'Stay updated with real-time, fact-checked breaking news.',
	},
	{
		id: 2,
		icon: <FaClock className="text-3xl text-gray-500" />,
		title: 'Instant Updates',
		description: 'Get live coverage and news alerts as events unfold.',
	},
	{
		id: 3,
		icon: <FaShieldAlt className="text-3xl text-gray-500" />,
		title: 'Trusted Journalism',
		description: 'Our team follows strict ethics and sources credible news.',
	},
	{
		id: 4,
		icon: <FaUsers className="text-3xl text-gray-500" />,
		title: 'Community Driven',
		description: 'Engage with journalists, share opinions, and shape stories.',
	},
];

const Feature = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true, amount: 0.2 }}
			className="max-w-screen-lg px-4 mx-auto mb-12 text-center md:mb-24 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">
					Why Choose Us?
				</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Discover the key features that make us the best news platform.
				</p>
			</div>
			<div className="grid grid-cols-1 gap-8 md:grid-cols-4">
				{features.map(({ id, icon, title, description }) => (
					<div key={id} className="flex flex-col items-center">
						<div className="flex items-center justify-center w-16 h-16 mb-4 bg-gray-100 rounded-full">
							{icon}
						</div>
						<h3 className="text-xl font-bold">{title}</h3>
						<p className="mt-2 text-gray-600">{description}</p>
					</div>
				))}
			</div>
		</motion.div>
	);
};

export default Feature;
