import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const PremiumArticles = () => {
	const axiosSecure = useAxiosSecure();
	const { data: articles = [] } = useQuery({
		queryKey: ['premiumArticles'],
		queryFn: async () => {
			const { data } = await axiosSecure.get('/premium-articles');
			return data;
		},
	});

	return (
		<div className="px-4 mt-8 mb-12 md:mt-12 md:mb-24 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">
					Premium Articles
				</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					All the premium articles available to read
				</p>
			</div>
			<div className="grid grid-cols-1 gap-6 mx-auto max-w-7xl md:grid-cols-2 lg:grid-cols-3">
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
							className="object-cover w-full h-48 mb-4"
						/>
						<h3 className="mb-2 text-xl font-semibold">{article.title}</h3>
						<p className="mb-4 text-gray-500 text-ellipsis-custom">
							{article.description}
						</p>
						<p className="mb-2 text-sm text-gray-400">Publisher: {article.publisher}</p>
						{article.tags && (
							<div className="flex flex-wrap gap-3">
								{article.tags.map((tag, index) => (
									<span
										key={index}
										className="px-4 py-2 mb-5 text-sm font-medium text-gray-800 transition duration-300 ease-in-out transform bg-gray-100 rounded-full shadow-md hover:scale-105 hover:bg-gray-200">
										{tag}
									</span>
								))}
							</div>
						)}
						<Link
							to={`/article-details/${article._id}`}
							className="py-3 mt-auto text-center text-white bg-gray-700 hover:bg-gray-800">
							Read more
						</Link>
					</div>
				))}
			</div>
		</div>
	);
};

export default PremiumArticles;
