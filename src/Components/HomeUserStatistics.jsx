import { FaUsers } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import { FaUserPlus } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';
import { motion } from 'framer-motion';

const StatCard = ({ Icon, count, label }) => (
	<div className="flex flex-col items-center max-w-sm p-6 transition-shadow bg-white shadow-md hover:shadow-lg min-w-48">
		<div className="flex items-center justify-center w-20 h-20 p-1 mb-6 rounded-full bg-gradient-to-r from-gray-500 to-gray-300">
			<div className="flex items-center justify-center w-full h-full bg-white rounded-full">
				<Icon className="w-10 h-10 text-gray-900" />
			</div>
		</div>
		<div className="text-3xl font-extrabold text-gray-800">
			<CountUp end={count} duration={3} />
		</div>
		<div className="text-gray-500">{label}</div>
	</div>
);

const HomeUserStatistics = () => {
	return (
		<motion.div
			initial={{ opacity: 0, y: 30 }}
			whileInView={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.6 }}
			viewport={{ once: true, amount: 0.2 }}
			className="max-w-screen-xl px-4 mx-auto mb-12 md:mb-24 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">Our Users</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Join thousands of readers who stay informed with the latest news and insights
					from around the world
				</p>
			</div>
			<div className="grid grid-cols-1 gap-12 mx-auto md:grid-cols-3 place-items-center">
				<StatCard Icon={FaUsers} count={11} label="All Users" />
				<StatCard Icon={HiUsers} count={9} label="Free Users" />
				<StatCard Icon={FaUserPlus} count={2} label="Premium Users" />
			</div>
		</motion.div>
	);
};

StatCard.propTypes = {
	Icon: PropTypes.elementType.isRequired,
	count: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
};

export default HomeUserStatistics;
