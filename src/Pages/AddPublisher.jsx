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
			console.log(error);
			Swal.fire({
				icon: 'error',
				title: 'Submission failed',
				text: 'Something went wrong. Please try again.',
			});
		}
	};

	return (
		<div className="mt-8 lg:mt-12 w-full px-4 lg:px-8">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">Add Publisher</h2>
				<p className="text-xl max-w-[48ch] mx-auto text-gray-500">
					Add renowned publishers to better group news articles
				</p>
			</div>

			<form
				onSubmit={onSubmit}
				className="max-w-2xl mx-auto mt-12 flex flex-col items-center justify-center w-full gap-6">
				<label className="block text-sm font-medium text-gray-900 w-full" htmlFor="name">
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

				<label className="block text-sm font-medium text-gray-900 w-full" htmlFor="photo">
					Publisher Image
					<input
						name="photo"
						className="block w-full text-sm text-gray-900 border border-gray-300 cursor-pointer bg-gray-50 p-2.5"
						id="photo"
						type="file"
					/>
				</label>
				<button className="text-white bg-gray-700 hover:bg-gray-800 px-4 py-2 border border-gray-700 hover:border-gray-800 transition duration-300 w-full">
					Submit
				</button>
			</form>
		</div>
	);
};

export default AddPublisher;
