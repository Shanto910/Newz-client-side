import Swal from 'sweetalert2';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import useAxiosSecure from '../Hooks/useAxiosSecure';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const AddPublisher = () => {
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const onSubmit = async e => {
		e.preventDefault();

		const form = e.target;
		const name = form.name.value;
		const imageFile = form.photo.files[0];

		if (!imageFile) {
			Swal.fire({
				icon: 'error',
				title: 'No file selected',
				text: 'Please select an image file to upload.',
			});
			return;
		}

		const formData = new FormData();
		formData.append('image', imageFile);

		try {
			const res = await axiosPublic.post(image_hosting_api, formData, {
				headers: {
					'Content-Type': 'multipart/form-data',
				},
			});

			if (res.data.success) {
				const publisherInfo = {
					name: name,
					image: res.data.data.display_url,
				};

				const publisherRes = await axiosSecure.post('/publisher', publisherInfo);

				if (publisherRes.data.insertedId) {
					Swal.fire({
						icon: 'success',
						title: `${name} is added to the menu.`,
						showConfirmButton: false,
						timer: 1500,
					});
					form.reset();
				}
			} else {
				throw new Error('Image upload failed');
			}
		} catch (error) {
			console.error(error);
			Swal.fire({
				icon: 'error',
				title: 'Submission failed',
				text: 'Something went wrong. Please try again.',
			});
		}
	};

	return (
		<div className="w-full px-4 mt-8 lg:mt-12 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">Add Publisher</h2>
				<p className="text-xl max-w-[48ch] mx-auto text-gray-500">
					Add renowned publishers to better group news articles
				</p>
			</div>

			<form
				onSubmit={onSubmit}
				className="flex flex-col items-center justify-center w-full max-w-2xl gap-6 mx-auto mt-12">
				<label className="block w-full text-sm font-medium text-gray-900" htmlFor="name">
					Publisher Name
					<input
						type="text"
						id="name"
						name="name"
						className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
						placeholder="Publisher name"
						required
					/>
				</label>

				<label className="block w-full text-sm font-medium text-gray-900" htmlFor="photo">
					Publisher Image
					<input
						name="photo"
						className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 p-2.5"
						id="photo"
						type="file"
					/>
				</label>
				<button className="w-full px-4 py-2 text-white transition duration-300 bg-gray-700 border border-gray-700 hover:bg-gray-800 hover:border-gray-800">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddPublisher;
