import { useState, useEffect } from 'react';
import useAuth from '../Hooks/useAuth';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';
import { BsPencil } from 'react-icons/bs';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const MyProfile = () => {
	const { user, updateUserProfile, setUser, setLoading } = useAuth();
	const axiosSecure = useAxiosSecure();

	const [name, setName] = useState(user?.displayName || '');
	const [photo, setPhoto] = useState(null);
	const [isChanged, setIsChanged] = useState(false);

	useEffect(() => {
		setIsChanged(name !== user?.displayName || photo !== null);
	}, [name, photo, user]);

	const handleFileChange = e => setPhoto(e.target.files[0]);

	const handleUpdate = async e => {
		e.preventDefault();
		setLoading(true);

		try {
			let photoURL = user?.photoURL;
			if (photo) {
				const formData = new FormData();
				formData.append('image', photo);

				const res = await fetch(image_hosting_api, {
					method: 'POST',
					body: formData,
				});
				const data = await res.json();
				if (data.success) {
					photoURL = data.data.url;
				} else {
					throw new Error('Image upload failed');
				}
			}

			await updateUserProfile(name, photoURL);
			setUser({ ...user, displayName: name, photoURL });

			await axiosSecure.patch(`/users/${user.email}`, { name, photo: photoURL });

			Swal.fire('Profile Updated!', '', 'success');
		} catch (error) {
			Swal.fire('Error', error.message, 'error');
		} finally {
			setLoading(false);
			setIsChanged(false);
		}
	};

	return (
		<div className="px-4 my-6 lg:my-12 lg:px-8">
			<div className="mb-12 text-center">
				<h2 className="text-3xl font-bold text-gray-800">Welcome, {user?.displayName}!</h2>
			</div>
			<div className="max-w-screen-sm p-6 mx-auto bg-white shadow-md">
				<div className="text-center">
					<div className="relative w-32 h-32 mx-auto mb-4">
						<img
							src={user?.photoURL}
							referrerPolicy="no-referrer"
							alt="Profile"
							className="object-cover w-full h-full border-4 border-white rounded-full shadow-lg"
						/>
						<label
							htmlFor="profile-photo"
							className="absolute p-2 text-white transition-colors bg-gray-500 rounded-full cursor-pointer bottom-1 right-1 hover:bg-gray-700">
							<BsPencil className="text-xl" />
							<input
								id="profile-photo"
								type="file"
								onChange={handleFileChange}
								className="hidden"
							/>
						</label>
					</div>
					<h2 className="text-2xl font-bold text-gray-800">{user?.displayName}</h2>
					<p className="text-gray-600">{user?.email}</p>
				</div>

				<form onSubmit={handleUpdate} className="mt-8 space-y-6">
					<div>
						<label htmlFor="name" className="block text-sm font-medium text-gray-700">
							Display Name
						</label>
						<input
							id="name"
							type="text"
							value={name}
							onChange={e => setName(e.target.value)}
							className="block w-full px-4 py-2 mt-1 border border-gray-300"
							placeholder="Enter your name"
							required
						/>
					</div>

					<button
						type="submit"
						className="w-full px-4 py-2 font-medium text-white transition duration-300 bg-gray-700 hover:bg-gray-800 disabled:bg-gray-400 disabled:cursor-not-allowed"
						disabled={!isChanged}>
						Update Profile
					</button>
				</form>
			</div>
		</div>
	);
};

export default MyProfile;
