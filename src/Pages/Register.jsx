import Lottie from 'react-lottie';
import RegisterAnimation from '../assets/Register-animation.json';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import { Link, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const Register = () => {
	const { createUser, updateUserProfile, setUser } = useAuth();
	const axiosPublic = useAxiosPublic();
	const navigate = useNavigate();

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: RegisterAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const showAlert = (title, text = '', icon = 'error') => {
		Swal.fire({
			title,
			text,
			icon,
			showClass: {
				popup: 'animate__animated animate__fadeInDown',
			},
			hideClass: {
				popup: 'animate__animated animate__fadeOutUp',
			},
		});
	};

	const validatePassword = password => {
		if (password.length < 6) {
			showAlert('User Register Failed!', 'Password must be at least 6 characters long.');
			return false;
		}
		if (!/[A-Z]/.test(password)) {
			showAlert(
				'User Register Failed!',
				'Password must contain at least one uppercase letter.'
			);
			return false;
		}
		if (!/[a-z]/.test(password)) {
			showAlert(
				'User Register Failed!',
				'Password must contain at least one lowercase letter.'
			);
			return false;
		}
		if (!/\d/.test(password)) {
			showAlert(
				'User Register Failed!',
				'Password must contain at least one numeric character.'
			);
			return false;
		}
		return true;
	};

	const handleRegister = async e => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;
		const name = form.name.value;
		const photo = form.photo.value;

		if (!validatePassword(password)) return;

		try {
			const result = await createUser(email, password);
			await updateUserProfile(name, photo);

			setUser({ ...result.user, photoURL: photo, displayName: name });

			const userInfo = {
				name: name,
				email: email,
				isadmin: false,
				isSubscribed: false,
			};

			const dbResponse = await axiosPublic.post('/users', userInfo);

			if (dbResponse.data.insertedId) {
				Swal.fire({
					title: 'Yay! Register was successful!',
					showClass: {
						popup: 'animate__animated animate__fadeInDown',
					},
					hideClass: {
						popup: 'animate__animated animate__fadeOutUp',
					},
				});
				navigate('/');
			}
		} catch (err) {
			showAlert('User Register Failed!', err?.message);
		}
	};

	return (
		<div className="text-gray-800 flex justify-center my-auto px-4 md:px-8">
			<div className="max-w-fit lg:max-w-screen-lg m-0 sm:m-10 shadow-md flex justify-center flex-1 bg-white">
				<div className="flex-1 bg-[#DDE3F0] hidden lg:flex justify-center items-center">
					<Lottie options={defaultOptions} loop autoplay height={400} width={400} />
				</div>
				<div className="lg:w-1/2 p-6 sm:p-12">
					<div className="flex flex-col items-center">
						<h1 className="text-2xl xl:text-3xl font-extrabold">Hello, there!</h1>
						<div className="w-full flex-1 mt-8">
							<form onSubmit={handleRegister} className="mx-auto max-w-xs">
								<input
									className="w-full px-8 py-4 font-medium border border-gray-200 placeholder-gray-500 text-sm"
									type="text"
									name="name"
									placeholder="Name"
								/>
								<input
									className="w-full px-8 py-4 font-medium border border-gray-200 placeholder-gray-500 text-sm mt-5"
									type="email"
									name="email"
									placeholder="Email"
								/>
								<input
									className="w-full px-8 py-4 font-medium border border-gray-200 placeholder-gray-500 text-sm mt-5"
									type="password"
									name="password"
									placeholder="Password"
								/>
								<input
									className="w-full px-8 py-4 font-medium border border-gray-200 placeholder-gray-500 text-sm mt-5"
									type="text"
									name="photo"
									placeholder="Photo URL"
								/>
								<button className="tracking-wide font-semibold bg-gray-700 text-gray-100 w-full py-4 hover:bg-gray-800 transition-all duration-300 mt-5">
									Register
								</button>
								<span className="text-gray-600 mt-2 inline-block">
									Already have an account?{' '}
									<Link to={'/login'} className="text-gray-900">
										Login here.
									</Link>
								</span>
							</form>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Register;
