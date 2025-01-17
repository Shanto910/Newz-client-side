import Lottie from 'react-lottie';
import LogInAnimation from '../assets/LogIn-animation.json';

const LogIn = () => {
	const defaultOptions = {
		loop: true,
		autoplay: true,
		animationData: LogInAnimation,
		rendererSettings: {
			preserveAspectRatio: 'xMidYMid slice',
		},
	};

	return (
		<div className="text-gray-800 flex justify-center my-auto px-4 md:px-8">
			<div className="max-w-fit lg:max-w-screen-lg m-0 sm:m-10 shadow-md flex justify-center flex-1">
				<div className="lg:w-1/2 xl:w-5/12 p-6 sm:p-12">
					<div className="flex flex-col items-center">
						<h1 className="text-2xl xl:text-3xl font-extrabold">Welcome Back!</h1>
						<div className="w-full flex-1 mt-8">
							<button className="w-full max-w-xs font-bold mx-auto shadow-sm border border-gray-200 py-3 flex gap-4 items-center justify-center hover:shadow-md transition-all duration-300">
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

							<div className="leading-none flex justify-center text-sm text-gray-600 tracking-wide font-medium my-8">
								Or Log In with E-mail
							</div>

							<div className="mx-auto max-w-xs">
								<input
									className="w-full px-8 py-4 font-medium border border-gray-200 placeholder-gray-500 text-sm"
									type="email"
									placeholder="Email"
								/>
								<input
									className="w-full px-8 py-4 font-medium border border-gray-200 placeholder-gray-500 text-sm mt-5"
									type="password"
									placeholder="Password"
								/>
								<button className="tracking-wide font-semibold bg-gray-700 text-gray-100 w-full py-4 hover:bg-gray-800 transition-all duration-300 mt-5">
									Log In
								</button>
							</div>
						</div>
					</div>
				</div>
				<div className="flex-1 bg-[#DDE3F0] hidden lg:flex">
					<Lottie options={defaultOptions} loop autoplay height={400} width={400} />
				</div>
			</div>
		</div>
	);
};

export default LogIn;
