import { motion } from 'framer-motion';

const testimonials = [
	{
		name: 'Jane Doe',
		role: 'Journalist',
		image: 'https://randomuser.me/api/portraits/women/68.jpg',
		quote: 'This platform has completely changed how I reach readers. Publishing is easy, and the audience is engaged.',
	},
	{
		name: 'Mark Robinson',
		role: 'Writer',
		image: 'https://randomuser.me/api/portraits/men/45.jpg',
		quote: 'I love the instant updates and trusted sources. It’s my go-to for news every morning.',
	},
	{
		name: 'Sarah Lee',
		role: 'Writer',
		image: 'https://randomuser.me/api/portraits/women/12.jpg',
		quote: 'Being able to share my articles and get feedback has been a game changer for my writing career.',
	},
];

const Testimonials = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true, amount: 0.2 }}
			className="max-w-screen-xl px-4 mx-auto mb-16 md:mb-32 lg:px-8">
			<div className="mb-12 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">
					What Our Users Say
				</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Hear from the people who trust and use our platform daily.
				</p>
			</div>
			<div className="grid gap-10 md:grid-cols-3">
				{testimonials.map((testimonial, i) => (
					<motion.div
						key={i}
						className="p-6 bg-white rounded-lg shadow-md"
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.5, delay: i * 0.2 }}
						viewport={{ once: true, amount: 0.2 }}>
						<div className="flex flex-col items-center gap-4">
							<img
								src={testimonial.image}
								alt={testimonial.name}
								className="object-cover w-20 h-20 border-4 border-gray-200 rounded-full"
							/>
							<p className="text-center text-gray-600">"{testimonial.quote}"</p>
							<div className="mt-4 text-center">
								<div className="text-sm font-bold text-gray-900">
									{testimonial.name}
								</div>
								<div className="text-sm text-gray-500">{testimonial.role}</div>
							</div>
						</div>
					</motion.div>
				))}
			</div>
		</motion.div>
	);
};

export default Testimonials;
