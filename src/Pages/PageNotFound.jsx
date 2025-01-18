import { Link } from 'react-router-dom';

const PageNotFound = () => {
	return (
		<div className="bg-gray-100 flex flex-col items-center justify-center h-screen gap-4 px-8 text-center">
			<h1 className="font-semibold text-3xl">Oops! You&lsquo;re lost.</h1>
			<p>The page you are looking for does not exist.</p>
			<Link
				to={'/'}
				className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 border border-gray-700 hover:border-gray-800 transition duration-300">
				Go Back Home
			</Link>
		</div>
	);
};

export default PageNotFound;
