import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SubscriptionPage = () => {
	const [subscriptionPeriod, setSubscriptionPeriod] = useState('1 minute');
	const navigate = useNavigate();

	const subscriptionPrices = {
		'1 minute': 1,
		'5 days': 5,
		'10 days': 10,
	};

	const handleSubscription = () => {
		const price = subscriptionPrices[subscriptionPeriod];
		navigate('/payment', { state: { subscriptionPeriod, price } });
	};

	return (
		<div className="w-full px-4 mb-8 lg:mb-12 lg:px-8">
			<div className="relative max-w-screen-xl mx-auto mb-8">
				<img
					src="https://i.ibb.co.com/zchhNTp/photo-1504711434969-e33886168f5c.jpg"
					alt="Premium Subscription"
					className="object-cover w-full h-80 lg:h-96"
				/>
				<div className="absolute inset-0 flex flex-col items-center justify-center bg-black bg-opacity-50">
					<h2 className="mb-4 text-4xl font-bold text-center text-white lg:text-5xl">
						Unlock Premium Features
					</h2>
					<p className="max-w-2xl px-4 text-lg text-center text-gray-200 lg:text-xl">
						Get access to premium articles, unlimited articles publish, and more by
						subscribing to our premium plan.
					</p>
				</div>
			</div>

			<div className="max-w-md p-8 mx-auto bg-white shadow-lg">
				<h3 className="mb-6 text-2xl font-bold text-gray-800">
					Choose Your Subscription Period
				</h3>
				<div className="mb-6">
					<label
						htmlFor="subscriptionPeriod"
						className="block mb-2 text-sm font-medium text-gray-700">
						Subscription Period
					</label>
					<select
						id="subscriptionPeriod"
						value={subscriptionPeriod}
						onChange={e => setSubscriptionPeriod(e.target.value)}
						className="w-full p-3 border border-gray-300">
						<option value="1 minute">1 minute</option>
						<option value="5 days">5 days</option>
						<option value="10 days">10 days</option>
					</select>
				</div>
				<ul>
					<li className="leading-loose text-gray-800 list-disc ml-7">
						Unlimited articles
					</li>
					<li className="leading-loose text-gray-800 list-disc ml-7">Premium articles</li>
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
				<button
					onClick={handleSubscription}
					className="w-full px-4 py-2 mt-5 text-white transition duration-300 bg-gray-700 border border-gray-700 hover:bg-gray-800 hover:border-gray-800">
					Subscribe Now
				</button>
			</div>
		</div>
	);
};

export default SubscriptionPage;
