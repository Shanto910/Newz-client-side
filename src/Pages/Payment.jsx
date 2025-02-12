import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import CheckoutForm from '../Components/CheckoutForm';

const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);
const PaymentPage = () => {
	return (
		<div className="w-full px-4 my-8 text-center lg:my-12 lg:px-8">
			<div className="text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">Payment</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Buy Premium Package to Unlock all the Benefits
				</p>
			</div>
			<div>
				<Elements stripe={stripePromise}>
					<CheckoutForm></CheckoutForm>
				</Elements>
			</div>
		</div>
	);
};

export default PaymentPage;
