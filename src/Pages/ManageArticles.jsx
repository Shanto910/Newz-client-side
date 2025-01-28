import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { FiTrash, FiCheck, FiX, FiStar } from 'react-icons/fi';

const ManageArticles = () => {
	const axiosSecure = useAxiosSecure();
	const { data: articles = [], refetch } = useQuery({
		queryKey: ['articles'],
		queryFn: async () => {
			const res = await axiosSecure.get('/articles');
			return res.data;
		},
	});

	const handleApprove = async id => {
		try {
			const res = await axiosSecure.patch(`/articles/${id}`, { status: 'approved' });
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
			const res = await axiosSecure.patch(`/articles/${id}`, {
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
			const res = await axiosSecure.delete(`/articles/${id}`);
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
			cancelButtonColor: '#3085d6',
		});

		if (result.isConfirmed) {
			handleDelete(id);
		} else {
			Swal.fire('Cancelled', 'Article was not deleted', 'info');
		}
	};

	const handleMakePremium = async id => {
		try {
			const res = await axiosSecure.patch(`/articles/${id}`, { articleType: 'premium' });
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
		<div className="max-w-screen-xl mx-auto mt-8 md:mt-12 mb-12 md:mb-24 w-full text-nowrap">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">All Articles</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Manage all submitted articles
				</p>
			</div>

			<div className=" bg-white shadow p-6 w-full overflow-x-auto">
				<table className="table-auto w-full text-left border-collapse">
					<thead>
						<tr>
							<th className="px-4 py-2">Author Photo</th>
							<th className="px-4 py-2">Author Name</th>
							<th className="px-4 py-2">Author Email</th>
							<th className="px-4 py-2">Title</th>
							<th className="px-4 py-2">Posted Date</th>
							<th className="px-4 py-2">Status</th>
							<th className="px-4 py-2">Publisher</th>
							<th className="px-4 py-2">Actions</th>
						</tr>
					</thead>
					<tbody>
						{articles.map(article => (
							<tr key={article._id}>
								<td className="px-4 py-2 flex justify-center">
									<img
										className="w-10 h-10 rounded-full"
										src={article.author_photo}
										alt=""
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
										className="text-green-600 hover:text-green-800 mr-4"
										onClick={() => handleApprove(article._id)}>
										<FiCheck />
									</button>
									<button
										className="text-red-600 hover:text-red-800  mr-4"
										onClick={() => showDeclineModal(article._id)}>
										<FiX />
									</button>

									<button
										className="text-yellow-600 hover:text-yellow-800  mr-4"
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
		</div>
	);
};

export default ManageArticles;
