import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer id="footer" className="bg-gray-800 mt-auto">
			<div className="flex flex-col text-gray-100 items-center pt-8 max-w-screen-xl mx-auto">
				<ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 px-4 lg:px-8 w-full mb-16 gap-8 lg:gap-0">
					<li className="justify-self-start md:col-span-2 lg:col-span-1">
						<h4 className="font-semibold text-lg mb-4">About us</h4>
						<p className="text-gray-400 lg:max-w-[28ch] leading-relaxed">
							We are a trusted source for news, delivering timely updates, insightful
							articles, and in-depth coverage across various topics.
						</p>
					</li>
					<li className="lg:justify-self-center">
						<ul>
							<li>
								<h4 className="font-semibold text-lg mb-4">Quick Links</h4>
							</li>
							<li className="text-gray-400 list-disc ml-7 leading-loose">
								<Link to={'/login'}>Login</Link>
							</li>
							<li className="text-gray-400 list-disc ml-7 leading-loose">
								<Link to={'/register'}>Register</Link>
							</li>
							<li className="text-gray-400 list-disc ml-7 leading-loose">
								<Link to={'/all-articles'}>All Articles</Link>
							</li>
							<li className="text-gray-400 list-disc ml-7 leading-loose">
								<Link to={'/subscription'}>Subscription</Link>
							</li>
						</ul>
					</li>
					<li className="lg:justify-self-end">
						<h4 className="font-semibold text-lg mb-4">Subscribe</h4>
						<p className="text-gray-400 leading-relaxed max-w-[28ch]">
							Subscribe to get the latest news before anyone else.
						</p>
						<form className="mt-5">
							<input
								className="px-4 py-4 text-gray-800 max-w-sm"
								type="email"
								placeholder="Enter your email"
							/>
							<button className="btn text-gray-100 font-semibold px-4 py-4 bg-gray-500 hover:bg-gray-600 transition duration-300">
								Subscribe
							</button>
						</form>
					</li>
				</ul>
				<p className="py-8 border-t border-t-gray-600 w-full text-center">
					Newz @{new Date().getFullYear()} All Rights Reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
