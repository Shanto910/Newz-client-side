import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import { useParams } from 'react-router-dom';
import { useEffect } from 'react';
import useAuth from '../Hooks/useAuth';

const ArticleDetails = () => {
	const { id } = useParams();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const { data: article = {}, refetch } = useQuery({
		queryKey: ['singleArticle', id],
		queryFn: async () => {
			const res = await axiosSecure.get(`/article/${id}`);
			return res.data;
		},
	});

	useEffect(() => {
		if (user && id) {
			axiosSecure.patch(`/article-details/${id}/views`).then(() => {
				refetch();
			});
		}
	}, [id, user]);

	return (
		<div className="max-w-screen-md px-4 mx-auto mt-8 mb-12 md:mt-12 md:mb-24 lg:px-8">
			<h3 className="mb-6 text-2xl font-bold text-gray-700 md:text-4xl">{article?.title}</h3>
			<div className="flex items-center gap-2">
				<img
					src={article?.author_photo}
					alt={article?.author_name}
					className="object-cover w-12 h-12 rounded-full"
				/>
				<div className="flex flex-col">
					<p className="font-medium text-gray-700">{`By ${article?.author_name}, ${article?.publisher}`}</p>

					<p className="text-sm text-gray-600">
						{`${article?.views} views  \u00b7  Updated
					${new Date(article?.postedDate).toLocaleDateString('en-US', {
						weekday: 'short',
						month: 'short',
						day: 'numeric',
						year: 'numeric',
					})}`}
					</p>
				</div>
			</div>
			<div className="my-8">
				<img
					src={article?.image}
					alt={article?.title}
					className="object-cover w-full shadow-xl h-80"
				/>
			</div>
			<p className="mb-6 text-lg leading-relaxed text-gray-800">{article?.description}</p>{' '}
			{article?.tags && (
				<div className="flex flex-wrap gap-3">
					{article.tags.map((tag, index) => (
						<span
							key={index}
							className="px-4 py-2 text-sm font-medium text-gray-800 transition duration-300 ease-in-out transform bg-gray-100 rounded-full shadow-md hover:scale-105 hover:bg-gray-200">
							{tag}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default ArticleDetails;
