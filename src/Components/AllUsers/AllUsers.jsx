const trendingArticles = [
	{
		name: 'John Doe',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		email: 'newz@gmail.com',
		_id: 1,
	},
	{
		name: 'Jane Smith',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		email: 'newz@gmail.com',
		_id: 2,
	},
	{
		name: 'Emma Johnson',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		email: 'newz@gmail.com',
		_id: 3,
	},
	{
		name: 'Mark Brown',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		email: 'newz@gmail.com',
		_id: 4,
	},
	{
		name: 'Sophia Lee',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		email: 'newz@gmail.com',
		_id: 5,
	},
	{
		name: 'Oliver Davis',
		image: 'https://i.ibb.co.com/5kk9L0K/buddy.jpg',
		email: 'newz@gmail.com',
		_id: 6,
	},
];

const AllUsers = () => {
	return (
		<div className="mt-8 lg:mt-12 w-full px-4 lg:px-8">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">All Users</h2>
				<p className="text-xl max-w-[48ch] mx-auto text-gray-500">
					Manage and view all registered users, and promote them to admin status if needed
				</p>
			</div>

			<div className="shadow-md max-w-2xl mx-auto mt-12 overflow-x-auto">
				<table className="w-full text-sm text-gray-500">
					<thead className="text-xs text-gray-700 uppercase bg-gray-200 tracking-wider">
						<tr>
							<th scope="col" className="py-3 px-6 text-left">
								Profile Picture
							</th>
							<th scope="col" className="py-3 px-6 text-left">
								Name
							</th>
							<th scope="col" className="py-3 px-6 text-left">
								Email
							</th>
							<th scope="col" className="py-3 px-6 text-left">
								Make Adimin
							</th>
						</tr>
					</thead>
					<tbody>
						{trendingArticles.map(submission => (
							<tr
								key={submission._id}
								className="bg-white border-b hover:bg-gray-50 text-lg font-medium">
								<td className="px-6 py-4 flex justify-center">
									<img
										className="w-10 h-10 rounded-full object-cover"
										src={submission.image}
										alt=""
									/>
								</td>
								<td className="px-6 py-4">{submission.name}</td>
								<td className="px-6 py-4">{submission.email}</td>
								<td className="px-6 py-4">Admin</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;
