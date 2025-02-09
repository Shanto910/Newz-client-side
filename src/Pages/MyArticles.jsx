import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAuth from '../Hooks/useAuth';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const MyArticles = () => {
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const { data: articles = [], refetch } = useQuery({
		queryKey: ['myArticles', user?.email],
		queryFn: async () => {
			const res = await axiosSecure.get(`/articles/user/${user?.email}`);
			return res.data;
		},
	});

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
		});

		if (result.isConfirmed) {
			handleDelete(id);
		} else {
			Swal.fire('Cancelled', 'Article was not deleted', 'info');
		}
	};

	const handleFeedback = feedback => {
		Swal.fire({
			title: 'Feedback',
			text: feedback,
		});
	};

	return (
		<div className="w-full px-4 my-8 lg:my-12 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">My Articles</h2>
				<p className="text-xl max-w-[48ch] mx-auto text-gray-500">
					Manage your submitted articles
				</p>
			</div>

			<div className="mx-auto overflow-x-auto bg-white shadow-md max-w-7xl text-nowrap">
				<table className="min-w-full">
					<thead className="text-sm font-semibold text-gray-700 uppercase bg-gray-100">
						<tr>
							<th className="px-6 py-3 text-left">#</th>
							<th className="px-6 py-3 text-left">Title</th>
							<th className="px-6 py-3 text-left">Status</th>
							<th className="px-6 py-3 text-left">Feedback</th>
							<th className="px-6 py-3 text-center">Premium</th>
							<th className="px-6 py-3 text-center">Actions</th>
							<th className="px-6 py-3 text-left">Details</th>
						</tr>
					</thead>
					<tbody className="text-sm text-gray-700 divide-y divide-gray-200">
						{articles.map((article, index) => (
							<tr key={article._id}>
								<td className="px-6 py-4">{index + 1}</td>
								<td className="px-6 py-4">{article.title}</td>
								<td className="px-6 py-4">
									{article.status === 'approved' && (
										<span className="px-2 py-1 text-green-700 bg-green-100 rounded-full">
											Approved
										</span>
									)}
									{article.status === 'declined' && (
										<div className="flex items-center gap-2">
											<span className="px-2 py-1 text-red-700 bg-red-100 rounded-full">
												Declined
											</span>
										</div>
									)}
									{article.status === 'pending' && (
										<span className="px-2 py-1 text-yellow-700 bg-yellow-100 rounded-full">
											Pending
										</span>
									)}
								</td>
								<td className="px-6 py-4">
									{article.status === 'declined' && (
										<button
											onClick={() => handleFeedback(article.feedback)}
											className="px-3 py-1 text-gray-800 transition duration-300 bg-white border border-gray-800 hover:bg-gray-800 hover:text-white">
											Feedback
										</button>
									)}
								</td>
								<td className="px-6 py-4 text-center">
									{article.articleType === 'premium' ? 'Yes' : 'No'}
								</td>
								<td className="px-6 py-4">
									<div className="flex items-center gap-4">
										<Link
											to={`/update-article/${article._id}`}
											className="px-3 py-1 text-gray-800 transition duration-300 bg-white border border-gray-800 hover:bg-gray-800 hover:text-white">
											Update
										</Link>
										<button
											onClick={() => confirmAndDelete(article._id)}
											className="px-3 py-1 text-red-600 hover:text-red-700">
											Delete
										</button>
									</div>
								</td>
								<td className="px-6 py-4">
									<Link
										to={`/article-details/${article._id}`}
										className="px-3 py-1 text-white transition duration-300 bg-gray-700 border border-gray-700 hover:bg-gray-800 hover:border-gray-800">
										Details
									</Link>
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
};

export default MyArticles;
