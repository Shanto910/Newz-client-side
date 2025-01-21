import { FaUsers } from 'react-icons/fa6';
import { HiUsers } from 'react-icons/hi';
import { FaUserPlus } from 'react-icons/fa6';
import PropTypes from 'prop-types';
import CountUp from 'react-countup';

const StatCard = ({ Icon, count, label }) => (
	<div className="flex flex-col items-center p-6 bg-white shadow-md hover:shadow-lg transition-shadow max-w-sm">
		<div className="mb-6 flex items-center justify-center w-20 h-20 rounded-full bg-gradient-to-r from-gray-500 to-gray-300 p-1">
			<div className="w-full h-full rounded-full bg-white flex items-center justify-center">
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
		<div className="max-w-screen-xl mx-auto mb-12 md:mb-24 px-4 md:px-8">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">Our Users</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Join thousands of readers who stay informed with the latest news and insights
					from around the world
				</p>
			</div>
			<div className="grid grid-cols-1 md:grid-cols-3 gap-12 mx-auto">
				<StatCard Icon={FaUsers} count={11} label="All Users" />
				<StatCard Icon={HiUsers} count={9} label="Free Users" />
				<StatCard Icon={FaUserPlus} count={2} label="Premium Users" />
			</div>
		</div>
	);
};

StatCard.propTypes = {
	Icon: PropTypes.elementType.isRequired,
	count: PropTypes.number.isRequired,
	label: PropTypes.string.isRequired,
};

export default HomeUserStatistics;
