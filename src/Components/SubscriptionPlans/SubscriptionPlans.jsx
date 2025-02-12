import { Link } from 'react-router-dom';

const SubscriptionPlans = () => {
	return (
		<div className="max-w-screen-xl px-4 mx-auto mb-12 md:mb-24 lg:px-8">
			<div className="mb-16 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">
					Subscription Plans
				</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Choose the plan that best fits your needs and enjoy all the benefits
				</p>
			</div>
			<div className="flex flex-col items-center justify-center gap-6 md:flex-row isolate md:gap-0">
				<div className="z-10 flex-1 w-full px-8 py-4 shadow-md md:relative md:max-w-80 bg-gray-50 hover:shadow-lg">
					<h3 className="font-semibold text-gray-700">Free</h3>
					<div className="mb-3 text-3xl font-bold text-gray-800">$0</div>
					<p className="font-medium text-gray-900">Free Plan benefits</p>
					<ul>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Can publish 1 article
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							No access to premium article
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">No storage</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">No support</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							No protection
						</li>
					</ul>
					<button className="inline-block w-full py-4 mt-5 font-semibold text-center text-gray-100 bg-gray-600 hover:bg-gray-800">
						Free by default
					</button>
				</div>

				<div className="z-20 flex-1 w-full px-8 py-4 shadow-md md:relative md:max-w-96 bg-gray-50 hover:shadow-lg md:-my-8 md:-mx-4">
					<h3 className="font-semibold text-gray-700">Pro</h3>
					<div className="mb-3 text-3xl font-bold text-gray-800">$5</div>
					<p className="font-medium text-gray-900">Premium Plan benefits</p>
					<ul>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Unlimited articles
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Premium articles
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">5GB storage</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Email customer support
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							24/7 Call customer support
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Can download articles
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Top level protection
						</li>
					</ul>
					<Link
						to={'/subscription'}
						className="inline-block w-full py-4 mt-5 font-semibold text-center text-gray-100 bg-gray-800 hover:bg-gray-900">
						Get premium
					</Link>
				</div>

				<div className="z-10 flex-1 w-full px-8 py-4 shadow-md md:relative md:max-w-80 bg-gray-50 hover:shadow-lg">
					<h3 className="font-semibold text-gray-700">Family</h3>
					<div className="mb-3 text-3xl font-bold text-gray-800">$10</div>
					<p className="font-medium text-gray-900">Family pack</p>
					<ul>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Includes all benefits from pro plan
						</li>
						<li className="leading-loose text-gray-800 list-disc ml-7">
							Can share with up to 4 people
						</li>
					</ul>
					<button className="inline-block w-full py-4 mt-5 font-semibold text-center text-gray-100 bg-gray-600 hover:bg-gray-800">
						Coming Soon
					</button>
				</div>
			</div>
		</div>
	);
};

export default SubscriptionPlans;
