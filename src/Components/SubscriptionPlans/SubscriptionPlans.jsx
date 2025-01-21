import { Link } from 'react-router-dom';

const SubscriptionPlans = () => {
	return (
		<div className="max-w-screen-xl mx-auto mb-12 md:mb-24">
			<div className="text-center mb-16">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">
					Subscription Plans
				</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Choose the plan that best fits your needs and enjoy all the benefits
				</p>
			</div>
			<div className="flex flex-col md:flex-row justify-center items-center isolate px-4 lg:px-8 gap-6 md:gap-0">
				<div className="md:relative z-10 flex-1 md:max-w-80 py-4 px-8 bg-gray-50 shadow-md hover:shadow-lg w-full">
					<h3 className="font-semibold text-gray-700">Free</h3>
					<div className="text-3xl font-bold text-gray-800 mb-3">$0</div>
					<p className="text-gray-900 font-medium">Free Plan benefits</p>
					<ul>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							Can publish 1 article
						</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							No access to premium article
						</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">No storage</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">No support</li>
					</ul>
					<Link className="w-full py-4 bg-gray-600 hover:bg-gray-800 text-gray-100 font-semibold mt-5 inline-block text-center">
						Try free for 1 month
					</Link>
				</div>

				<div className="md:relative z-20 md:max-w-96 py-4 px-8 bg-gray-50 shadow-md hover:shadow-lg md:-my-8 md:-mx-4 flex-1 w-full">
					<h3 className="font-semibold text-gray-700">Pro</h3>
					<div className="text-3xl font-bold text-gray-800 mb-3">$5</div>
					<p className="text-gray-900 font-medium">Premium Plan benefits</p>
					<ul>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							Unlimited articles
						</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							Premium articles
						</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">5GB storage</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							Email customer support
						</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							24/7 Call customer support
						</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							Can download articles
						</li>
					</ul>
					<Link className="w-full py-4 bg-gray-800 hover:bg-gray-900 text-gray-100 font-semibold mt-5 inline-block text-center">
						Get premium
					</Link>
				</div>

				<div className="md:relative z-10 flex-1 md:max-w-80 py-4 px-8 bg-gray-50 shadow-md hover:shadow-lg w-full">
					<h3 className="font-semibold text-gray-700">Family</h3>
					<div className="text-3xl font-bold text-gray-800 mb-3">$10</div>
					<p className="text-gray-900 font-medium">Family pack</p>
					<ul>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							Includes all benefits from pro plan
						</li>
						<li className="text-gray-800 list-disc ml-7 leading-loose">
							Can share with up to 4 people
						</li>
					</ul>
					<Link className="w-full py-4 bg-gray-600 hover:bg-gray-800 text-gray-100 font-semibold mt-5 inline-block text-center">
						Get family pack
					</Link>
				</div>
			</div>
		</div>
	);
};

export default SubscriptionPlans;
