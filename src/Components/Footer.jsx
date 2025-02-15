import { Link } from 'react-router-dom';

const Footer = () => {
	return (
		<footer id="footer" className="mt-auto bg-gray-800">
			<div className="flex flex-col items-center max-w-screen-xl pt-8 mx-auto text-gray-100">
				<ul className="grid w-full grid-cols-1 gap-8 px-4 mb-16 md:grid-cols-2 lg:grid-cols-3 lg:px-8 lg:gap-0">
					<li className="justify-self-start md:col-span-2 lg:col-span-1">
						<h4 className="mb-4 text-lg font-semibold">About us</h4>
						<p className="text-gray-400 lg:max-w-[28ch] leading-relaxed">
							We are a trusted source for news, delivering timely updates, insightful
							articles, and in-depth coverage across various topics.
						</p>
					</li>
					<li className="lg:justify-self-center">
						<ul>
							<li>
								<h4 className="mb-4 text-lg font-semibold">Quick Links</h4>
							</li>
							<li className="leading-loose text-gray-400 list-disc ml-7">
								<Link to={'/login'}>Login</Link>
							</li>
							<li className="leading-loose text-gray-400 list-disc ml-7">
								<Link to={'/register'}>Register</Link>
							</li>
							<li className="leading-loose text-gray-400 list-disc ml-7">
								<Link to={'/all-articles'}>All Articles</Link>
							</li>
							<li className="leading-loose text-gray-400 list-disc ml-7">
								<Link to={'/subscription'}>Subscription</Link>
							</li>
						</ul>
					</li>
					<li className="lg:justify-self-end">
						<h4 className="mb-4 text-lg font-semibold">Subscribe</h4>
						<p className="text-gray-400 leading-relaxed max-w-[28ch]">
							Subscribe to get the latest news before anyone else.
						</p>
						<form className="mt-5">
							<input
								className="max-w-sm px-4 py-4 text-gray-800"
								type="email"
								placeholder="Enter your email"
							/>
							<Link
								to={'/'}
								className="inline-block px-4 py-4 font-semibold text-gray-100 transition duration-300 bg-gray-500 hover:bg-gray-600 text-inherit">
								Subscribe
							</Link>
						</form>
					</li>
				</ul>
				<p className="w-full py-8 text-center border-t border-t-gray-600">
					Newz @{new Date().getFullYear()} All Rights Reserved
				</p>
			</div>
		</footer>
	);
};

export default Footer;
