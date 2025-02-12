import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { useLocation } from 'react-router-dom';

const CheckoutForm = () => {
	const stripe = useStripe();
	const elements = useElements();
	const [clientSecret, setClientSecret] = useState('');
	const [error, setError] = useState('');
	const navigate = useNavigate();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();
	const location = useLocation();
	const { subscriptionPeriod, price } = location.state || {};

	useEffect(() => {
		if (price) {
			axiosSecure.post('/create-payment-intent', { price }).then(res => {
				setClientSecret(res.data.clientSecret);
			});
		}
	}, [axiosSecure, price]);

	const handleSubmit = async e => {
		e.preventDefault();
		if (!stripe || !elements) return;

		const card = elements.getElement(CardElement);
		if (!card) return;

		const { paymentIntent, error } = await stripe.confirmCardPayment(clientSecret, {
			payment_method: { card },
		});

		if (error) {
			setError(error.message);
		} else if (paymentIntent.status === 'succeeded') {
			await handlePaymentSuccess();
		}
	};

	const handlePaymentSuccess = async () => {
		const res = await axiosSecure.patch('/users/subscribe', {
			email: user.email,
			period: subscriptionPeriod,
		});

		if (res.data.modifiedCount > 0) {
			Swal.fire(
				'Success!',
				`You're now a premium user for ${subscriptionPeriod}.`,
				'success'
			);
			navigate('/');
		}
	};

	return (
		<form onSubmit={handleSubmit} className="flex flex-col max-w-screen-sm gap-4 mx-auto mt-12">
			<CardElement
				className="px-8 py-4 border border-gray-200"
				options={{
					style: {
						base: {
							fontSize: '16px',
							color: '#424770',
							'::placeholder': {
								color: '#aab7c4',
							},
						},
						invalid: {
							color: '#9e2146',
						},
					},
				}}
			/>
			<button
				className="w-full px-4 py-2 text-white transition duration-300 bg-gray-700 border border-gray-700 hover:bg-gray-800 hover:border-gray-800"
				type="submit"
				disabled={!stripe || !clientSecret}>
				Make Payment
			</button>
			<p className="text-red-600">{error}</p>
		</form>
	);
};

export default CheckoutForm;
