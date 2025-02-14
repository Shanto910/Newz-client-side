import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiTrash, FiCheck, FiX, FiStar } from 'react-icons/fi';
import { useState } from 'react';

const ManageArticles = () => {
	const axiosSecure = useAxiosSecure();
	const [currentPage, setCurrentPage] = useState(1);
	const articlesPerPage = 5;

	const { data, refetch } = useQuery({
		queryKey: ['articles', currentPage],
		queryFn: async () => {
			const res = await axiosSecure.get(
				`/admin/articles?page=${currentPage}&limit=${articlesPerPage}`
			);
			return res.data;
		},
	});

	const articles = data?.articles || [];
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

	const handleApprove = async id => {
		try {
			const res = await axiosSecure.patch(`/admin/articles/${id}`, { status: 'approved' });
			if (res.data.modifiedCount > 0) {
				Swal.fire('Success', 'Article approved successfully', 'success');
				refetch();
			}
		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Could not approve the article', 'error');
		}
	};

	const handleDecline = async (id, reason) => {
		try {
			const res = await axiosSecure.patch(`/admin/articles/${id}`, {
				status: 'declined',
				feedback: reason,
			});
			if (res.data.modifiedCount > 0) {
				Swal.fire('Success', 'Article declined successfully', 'success');
				refetch();
			}
		} catch (error) {
			console.error(error);
			Swal.fire('Error', 'Could not decline the article', 'error');
		}
	};

	const showDeclineModal = async articleId => {
		const result = await Swal.fire({
			title: 'Reason for Decline',
			input: 'textarea',
			inputPlaceholder: 'Enter reason here...',
			showCancelButton: true,
			confirmButtonText: 'Submit',
			cancelButtonText: 'Cancel',
			showCloseButton: true,
		});

		if (result.value === '') {
			Swal.fire('Error', 'Please provide a reason first!', 'error');
			return;
		}
		if (result.isConfirmed) {
			const reason = result.value;
			handleDecline(articleId, reason);
		} else {
			Swal.fire('Cancelled', 'Action was not performed', 'info');
		}
	};

	const handleDelete = async id => {
		try {
			const res = await axiosSecure.delete(`/admin/articles/${id}`);
			if (res.data.deletedCount > 0) {
				Swal.fire('Success', 'Article deleted successfully', 'success');
				refetch();
			}
		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Could not delete the article', 'error');
		}
	};

	const confirmAndDelete = async id => {
		const result = await Swal.fire({
			title: 'Are you sure?',
			text: 'Do you want to delete this article? This action cannot be undone.',
			icon: 'warning',
			showCancelButton: true,
			confirmButtonText: 'Yes, delete it!',
			cancelButtonText: 'Cancel',
			confirmButtonColor: '#d33',
		});

		if (result.isConfirmed) {
			handleDelete(id);
		} else {
			Swal.fire('Cancelled', 'Article was not deleted', 'info');
		}
	};

	const handleMakePremium = async id => {
		try {
			const res = await axiosSecure.patch(`/admin/articles/${id}`, {
				articleType: 'premium',
			});
			if (res.data.modifiedCount > 0) {
				Swal.fire('Success', 'Article marked as premium', 'success');
				refetch();
			}
		} catch (error) {
			console.log(error);
			Swal.fire('Error', 'Could not mark the article as premium', 'error');
		}
	};

	return (
		<div className="w-full px-4 my-8 lg:my-12 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">All Articles</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Manage all submitted articles
				</p>
			</div>

			<div className="max-w-xs mx-auto overflow-x-auto bg-white shadow md:max-w-2xl lg:max-w-3xl xl:max-w-[1220px] text-nowrap">
				<table className="w-full text-left border-collapse table-auto">
					<thead>
						<tr>
							<th className="px-4 py-2">Author Photo</th>
							<th className="px-4 py-2">Author Name</th>
							<th className="px-4 py-2">Author Email</th>
							<th className="px-4 py-2">Title</th>
							<th className="px-4 py-2">Posted Date</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Publisher</th>
							<th className="px-4 py-2 text-center">Actions</th>
						</tr>
					</thead>
					<tbody>
						{articles.map(article => (
							<tr key={article._id}>
								<td className="flex justify-center px-4 py-2">
									<img
										className="object-cover w-10 h-10 rounded-full"
										src={article.author_photo}
										alt=""
										referrerPolicy="no-referrer"
									/>
								</td>
								<td className="px-4 py-2">{article.author_name}</td>
								<td className="px-4 py-2">{article.author_email}</td>
								<td className="px-4 py-2">{article.title}</td>
								<td className="px-4 py-2">
									{new Date(article.postedDate).toLocaleDateString()}
								</td>
								<td className="px-4 py-2">{article.status}</td>
								<td className="px-4 py-2">{article.publisher}</td>
								<td className="px-4 py-2">
									<button
										className="mr-4 text-green-600 hover:text-green-800"
										onClick={() => handleApprove(article._id)}>
										<FiCheck />
									</button>
									<button
										className="mr-4 text-red-600 hover:text-red-800"
										onClick={() => showDeclineModal(article._id)}>
										<FiX />
									</button>

									<button
										className="mr-4 text-yellow-600 hover:text-yellow-800"
										onClick={() => handleMakePremium(article._id)}>
										<FiStar />
									</button>
									<button
										className="text-red-600 hover:text-red-800"
										onClick={() => confirmAndDelete(article._id)}>
										<FiTrash />
									</button>
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

export default ManageArticles;
