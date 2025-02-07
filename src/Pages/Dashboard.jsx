import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { Chart } from 'react-google-charts';
import PropTypes from 'prop-types';

const Dashboard = () => {
	const axiosSecure = useAxiosSecure();
	const { data: publication = [] } = useQuery({
		queryKey: ['publication'],
		queryFn: async () => {
			const res = await axiosSecure.get('/articles/publication');
			return res.data || [];
		},
	});

	const pieChart = [
		['Publisher', 'Number of Articles'],
		...publication.map(item => [item.publisher, item.count]),
	];

	const ArticlesPerMonth = [
		['Month', 'Articles Published'],
		['Jan', 15],
		['Feb', 12],
		['Mar', 20],
		['Apr', 18],
		['May', 25],
	];

	const ViewsPerDay = [
		['Day', 'Views'],
		['1', 150],
		['2', 200],
		['3', 120],
		['4', 90],
		['5', 280],
	];

	const ChartCard = ({ title, chartType, data, options }) => (
		<div className="p-6 transition-shadow duration-300 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md">
			<h2 className="mb-4 text-xl font-semibold text-gray-800">{title}</h2>
			<Chart
				width={'100%'}
				height={'350px'}
				chartType={chartType}
				data={data}
				options={{
					legend: { position: 'bottom' },
					colors: ['#364153', '#4a5565', '#6a7282', '#99a1af', '#d1d5dc'],
					...options,
				}}
			/>
		</div>
	);

	ChartCard.propTypes = {
		title: PropTypes.string.isRequired,
		chartType: PropTypes.string.isRequired,
		data: PropTypes.arrayOf(PropTypes.array).isRequired,
		options: PropTypes.object,
	};

	return (
		<div className="w-full px-4 my-8 lg:my-12 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">Dashboard</h2>
				<p className="text-xl max-w-[48ch] mx-auto text-gray-500">
					Insights and analytics for your articles and users
				</p>
			</div>

			<div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
				<ChartCard title="Articles by Publisher" chartType="PieChart" data={pieChart} />
				<ChartCard
					title="Articles Published Per Month"
					chartType="ColumnChart"
					data={ArticlesPerMonth}
					options={{
						hAxis: { title: 'Month' },
						vAxis: { title: 'Articles Published' },
					}}
				/>
				<ChartCard
					title="Article Views Over Time"
					chartType="SteppedAreaChart"
					data={ViewsPerDay}
					options={{
						hAxis: { title: 'Day' },
						vAxis: { title: 'Views' },
					}}
				/>
			</div>
		</div>
	);
};

export default Dashboard;
