import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import { Link } from 'react-router-dom';

const AllArticles = () => {
	const axiosSecure = useAxiosSecure();
	const axiosPublic = useAxiosPublic();
	const [title, setTitle] = useState('');
	const [publisher, setPublisher] = useState('');
	const [tags, setTags] = useState('');

	const { data: publishers = [] } = useQuery({
		queryKey: ['publishers'],
		queryFn: async () => {
			const { data } = await axiosSecure.get('/publisher');
			return data;
		},
	});

	const { data: articles = [] } = useQuery({
		queryKey: ['articles', title, publisher, tags],
		queryFn: async () => {
			const params = {};
			if (title) params.title = title;
			if (publisher) params.publisher = publisher;
			if (tags) params.tags = tags;

			const { data } = await axiosPublic.get('/articles', { params });
			return data;
		},
	});

	return (
		<div className="mt-8 md:mt-12 mb-12 md:mb-24 px-4 lg:px-8">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">All Articles</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					All the articles available to read
				</p>
			</div>

			<div className="max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-4 justify-between">
				<input
					type="text"
					placeholder="Search by title"
					className="border p-2 w-full md:w-1/3"
					value={title}
					onChange={e => setTitle(e.target.value)}
				/>

				<select
					className="border p-2 w-full md:w-1/4"
					value={publisher}
					onChange={e => setPublisher(e.target.value)}>
					<option value="">All Publishers</option>
					{publishers.map(pub => (
						<option key={pub._id} value={pub.name}>
							{pub.name}
						</option>
					))}
				</select>

				<input
					type="text"
					placeholder="Filter by tags (comma-separated)"
					className="border p-2 w-full md:w-1/3"
					value={tags}
					onChange={e => setTags(e.target.value)}
				/>
			</div>

			<div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
				{articles.map(article => (
					<div
						key={article._id}
						className={`p-4 shadow-md flex flex-col ${
							article.articleType === 'premium'
								? 'bg-yellow-100'
								: 'bg-white hover:shadow-lg'
						}`}>
						<img
							src={article.image}
							alt={article.title}
							className="w-full h-48 object-cover mb-4"
						/>
						<h3 className="text-xl font-semibold mb-2">{article.title}</h3>
						<p className="text-gray-500 mb-4 text-ellipsis-custom">
							{article.description}
						</p>
						<p className="text-sm text-gray-400">Publisher: {article.publisher}</p>
						{article.tags && (
							<div className="mt-2 flex flex-wrap gap-2">
								{article.tags.map((tag, index) => (
									<span
										key={index}
										className="px-2 py-1 bg-gray-100 text-gray-600 text-sm mb-5">
										{tag}
									</span>
								))}
							</div>
						)}
						<Link
							to={`/article/details/${article._id}`}
							className="inline-block text-center font-semibold bg-gray-700 text-gray-100 w-full py-4 hover:bg-gray-800 transition-all duration-300 mt-auto">
							Read more
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default AllArticles;
