import Lottie from 'react-lottie';
import LogInAnimation from '../assets/LogIn-animation.json';
import Swal from 'sweetalert2';
import useAuth from '../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import useAxiosPublic from '../Hooks/useAxiosPublic';

const LogIn = () => {
	const { logIn, googleSignIn } = useAuth();
	const navigate = useNavigate();
	const location = useLocation();
	const axiosPublic = useAxiosPublic();

	const from = location.state?.from?.pathname || '/';

	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: LogInAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	const handleLogIn = async e => {
		e.preventDefault();
		const form = e.target;
		const email = form.email.value;
		const password = form.password.value;

		try {
			await logIn(email, password);
			Swal.fire({
				title: 'User Login Successful!',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
			navigate(from, { replace: true });
		} catch (error) {
			Swal.fire({
				title: 'User Login Failed!',
				text: error.message,
				icon: 'error',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
		}
	};

	const handleGoogleSignIn = async () => {
		try {
			const result = await googleSignIn();
			const userInfo = {
				email: result.user?.email,
				name: result.user?.displayName,
				photo: result.user?.photoURL,
				premiumTaken: null,
			};
			await axiosPublic.post('/users', userInfo);
			Swal.fire({
				title: 'User Login Successful!',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
			navigate(from, { replace: true });
		} catch (error) {
			Swal.fire({
				title: 'User Login Failed!',
				text: error.message,
				icon: 'error',
				showClass: {
					popup: 'animate__animated animate__fadeInDown',
				},
				hideClass: {
					popup: 'animate__animated animate__fadeOutUp',
				},
			});
		}
	};

	return (
		<div className="flex justify-center px-4 my-auto text-gray-800 md:px-8">
			<div className="flex justify-center flex-1 m-0 bg-white shadow-md max-w-fit lg:max-w-screen-lg sm:m-10">
				<div className="p-6 lg:w-1/2 sm:p-12">
					<div className="flex flex-col items-center">
						<h1 className="text-2xl font-extrabold xl:text-3xl">Welcome Back!</h1>
						<div className="flex-1 w-full mt-8">
							<button
								onClick={handleGoogleSignIn}
								className="flex items-center justify-center w-full max-w-xs gap-4 py-3 mx-auto font-bold transition-all duration-300 border border-gray-200 shadow-sm hover:shadow-md">
								<svg className="w-4" viewBox="0 0 533.5 544.3">
									<path
										d="M533.5 278.4c0-18.5-1.5-37.1-4.7-55.3H272.1v104.8h147c-6.1 33.8-25.7 63.7-54.4 82.7v68h87.7c51.5-47.4 81.1-117.4 81.1-200.2z"
										fill="#4285f4"
									/>
									<path
										d="M272.1 544.3c73.4 0 135.3-24.1 180.4-65.7l-87.7-68c-24.4 16.6-55.9 26-92.6 26-71 0-131.2-47.9-152.8-112.3H28.9v70.1c46.2 91.9 140.3 149.9 243.2 149.9z"
										fill="#34a853"
									/>
									<path
										d="M119.3 324.3c-11.4-33.8-11.4-70.4 0-104.2V150H28.9c-38.6 76.9-38.6 167.5 0 244.4l90.4-70.1z"
										fill="#fbbc04"
									/>
									<path
										d="M272.1 107.7c38.8-.6 76.3 14 104.4 40.8l77.7-77.7C405 24.6 339.7-.8 272.1 0 169.2 0 75.1 58 28.9 150l90.4 70.1c21.5-64.5 81.8-112.4 152.8-112.4z"
										fill="#ea4335"
									/>
								</svg>
								<span>Log In with Google</span>
							</button>

							<div className="flex justify-center my-8 text-sm font-medium leading-none tracking-wide text-gray-600">
								Or Log In with E-mail
							</div>

							<form onSubmit={handleLogIn} className="max-w-xs mx-auto">
								<input
									className="w-full px-8 py-4 text-sm font-medium placeholder-gray-500 border border-gray-200"
									type="email"
									name="email"
									placeholder="Email"
								/>
								<input
									className="w-full px-8 py-4 mt-5 text-sm font-medium placeholder-gray-500 border border-gray-200"
									type="password"
									name="password"
									placeholder="Password"
								/>
								<button className="w-full py-4 mt-5 font-semibold tracking-wide text-gray-100 transition-all duration-300 bg-gray-700 hover:bg-gray-800">
									Log In
								</button>
								<span className="inline-block mt-2 text-gray-600">
									New here?{' '}
									<Link to={'/register'} className="text-gray-900">
										Register here.
									</Link>
								</span>
							</form>
						</div>
					</div>
				</div>
				<div className="flex-1 bg-[#DDE3F0] hidden lg:flex justify-center items-center">
					<Lottie options={defaultOptions} loop autoplay height={400} width={400} />
				</div>
			</div>
		</div>
	);
};

export default LogIn;
