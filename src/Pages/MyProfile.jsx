import { Link } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';

const MyProfile = () => {
	const { user } = useAuth();

	return (
		<div className="mt-6 lg:mt-12 px-4 lg:px-8">
			<div className="text-center">
				<h2 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName}!</h2>
			</div>
			<div className="flex items-center justify-center mt-8 mb-24 px-4 lg:px-8">
				<div className="w-full max-w-sm bg-white shadow-md p-6">
					<div className="flex flex-col items-center gap-4">
						<img
							src={user?.photoURL}
							alt="User Profile"
							className="w-24 h-24 rounded-full object-cover"
						/>

						<p className="text-lg font-semibold text-gray-800">{user?.displayName}</p>
						<p className="text-lg text-gray-600">{user?.email}</p>
						<Link
							to="/updateProfile"
							className="mt-4 inline-block w-full text-center text-white bg-gray-700 hover:bg-gray-800 font-medium py-2 px-4 transition duration-300">
							Update Profile
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
};

export default MyProfile;
