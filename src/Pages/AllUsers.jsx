import { RiAdminFill } from 'react-icons/ri';
import { FaUser } from 'react-icons/fa';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import Swal from 'sweetalert2';
import { useState } from 'react';

const AllUsers = () => {
	const axiosSecure = useAxiosSecure();
	const [currentPage, setCurrentPage] = useState(1);
	const userPerPage = 5;

	const { data, refetch } = useQuery({
		queryKey: ['users', currentPage],
		queryFn: async () => {
			const res = await axiosSecure.get(`/users?page=${currentPage}&limit=${userPerPage}`);
			return res.data;
		},
	});

	const users = data?.users || [];
	const totalPages = data?.totalPages || 1;

	const handlePageChange = newPage => {
		if (newPage > 0 && newPage <= totalPages) {
			setCurrentPage(newPage);
		}
	};

	const renderPagination = () => {
		const buttons = [];
		for (let i = 1; i <= totalPages; i++) {
			buttons.push(
				<button
					key={i}
					onClick={() => handlePageChange(i)}
					className={`px-3 py-1 ${
						currentPage === i ? 'bg-gray-500 text-white' : 'bg-gray-200'
					}`}>
					{i}
				</button>
			);
		}
		return buttons;
	};

	const handleMakeAdmin = user => {
		axiosSecure.patch(`/users/admin/${user._id}`).then(res => {
			if (res.data.modifiedCount > 0) {
				refetch();
				Swal.fire({
					icon: 'success',
					title: `${user.name} is now an Admin!`,
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
		<div className="w-full px-4 my-8 lg:my-12 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">All Users</h2>
				<p className="text-xl max-w-[48ch] mx-auto text-gray-500">
					Manage and view all registered users, and promote them to admin status if needed
				</p>
			</div>
			<div className="mx-auto overflow-x-auto shadow-md max-w-[340px] sm:max-w-screen-xl">
				<table className="min-w-full">
					<thead className="text-gray-700 uppercase bg-gray-100">
						<tr>
							<th scope="col" className="px-6 py-3 text-left">
								Profile Picture
							</th>
							<th scope="col" className="px-6 py-3 text-left">
								Name
							</th>
							<th scope="col" className="px-6 py-3 text-left">
								Email
							</th>
							<th scope="col" className="px-6 py-3 text-center">
								Role
							</th>
						</tr>
					</thead>
					<tbody>
						{users.map(user => (
							<tr
								key={user._id}
								className="text-lg font-medium text-gray-700 bg-white border-b hover:bg-gray-50">
								<td className="flex justify-center px-6 py-4">
									<img
										className="object-cover w-10 h-10 rounded-full"
										src={user.photo}
										referrerPolicy="no-referrer"
									/>
								</td>
								<td className="px-6 py-4">{user.name}</td>
								<td className="px-6 py-4">{user.email}</td>
								<td
									onClick={() => handleMakeAdmin(user)}
									className="flex justify-center px-6 py-4 cursor-pointer">
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
			<div className="flex items-center justify-center gap-4 mt-6">
				<button
					onClick={() => handlePageChange(currentPage - 1)}
					disabled={currentPage === 1}
					className="px-3 py-1 bg-gray-200 disabled:opacity-50">
					Prev
				</button>
				<div className="flex gap-2">{renderPagination()}</div>
				<button
					onClick={() => handlePageChange(currentPage + 1)}
					disabled={currentPage === totalPages}
					className="px-3 py-1 bg-gray-200 disabled:opacity-50">
					Next
				</button>
			</div>
		</div>
	);
};

export default AllUsers;
