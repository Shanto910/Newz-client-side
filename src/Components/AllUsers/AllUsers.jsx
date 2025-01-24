import { RiAdminFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';

const AllUsers = () => {
	const axiosSecure = useAxiosSecure();
	const { data: users = [], refetch } = useQuery({
		queryKey: ['users'],
		queryFn: async () => {
			const res = await axiosSecure.get('/users');
			return res.data;
		},
	});

	const handleMakeAdmin = user => {
		axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
			if (res.data.modifiedCount > 0) {
				refetch();
				Swal.fire({
					icon: 'success',
					title: `${user.name} Login Successful!`,
					showConfirmButton: false,
					showClass: {
						popup: 'animate__animated animate__fadeInDown',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutUp',
					},
				});
			}
		});
	};

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
							<th scope="col" className="py-3 px-6 text-center">
								Role
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr
								key={user._id}
								className="bg-white border-b hover:bg-gray-50 text-lg font-medium">
								<td className="px-6 py-4 flex justify-center">
									<img
										className="w-10 h-10 rounded-full object-cover"
										src={user.photo}
										alt=""
									/>
								</td>
								<td className="px-6 py-4">{user.name}</td>
								<td className="px-6 py-4">{user.email}</td>
								<td
									onClick={() => handleMakeAdmin(user)}
									className="px-6 py-4 flex justify-center">
									{user.role === 'admin' ? (
										<RiAdminFill className="text-2xl text-red-400" />
									) : (
										<FaUser className="text-2xl text-blue-400" />
									)}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default AllUsers;
