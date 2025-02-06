import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Select from 'react-select';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useState } from 'react';
import useAuth from '../Hooks/useAuth';

const image_hosting_key = import.meta.env.VITE_IMAGE_HOSTING_KEY;
const image_hosting_api = `https://api.imgbb.com/1/upload?key=${image_hosting_key}`;

const options = [
	{ value: 'breaking_news', label: 'Breaking News' },
	{ value: 'economy', label: 'Economy' },
	{ value: 'viral', label: 'Viral' },
	{ value: 'food', label: 'Food' },
	{ value: 'trending', label: 'Trending' },
	{ value: 'technology', label: 'Technology' },
	{ value: 'cybersecurity', label: 'Cybersecurity' },
	{ value: 'exclusive', label: 'Exclusive' },
	{ value: 'report', label: 'Report' },
	{ value: 'interview', label: 'Interview' },
];

const customStyles = {
	control: provided => ({
		...provided,
		height: '2.6rem',
		backgroundColor: '#f9fafb',
		borderColor: 'rgb(209 213 219)',
		borderRadius: 'none',
		overflowY: 'auto',
		scrollbarWidth: 'none',
		'&::-webkit-scrollbar': {
			display: 'none',
		},
		'&:hover': {
			borderColor: 'rgb(209 213 219)',
		},
	}),
};

const AddArticles = () => {
	const [selectedTags, setSelectedTags] = useState([]);
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const { user } = useAuth();

	const { data: publishers = [] } = useQuery({
		queryKey: ['publishers'],
		queryFn: async () => {
			const res = await axiosSecure.get('/publisher');
			return res.data;
		},
	});

	const handleTagChange = selectedOptions => {
		setSelectedTags(selectedOptions || []);
	};

	const onSubmit = async e => {
		e.preventDefault();

		const form = e.target;
		const title = form.title.value;
		const publisher = form.publisher.value;
		const description = form.description.value;
		const imageFile = form.image.files[0];
		const tags = selectedTags.map(tag => tag.value);
		const postedDate = new Date().toISOString();

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
				const articleInfo = {
					title,
					publisher,
					description,
					tags,
					postedDate,
					feedback: '',
					articleType: 'normal',
					status: 'pending',
					image: res.data.data.display_url,
					author_name: user?.displayName,
					author_email: user?.email,
					author_photo: user?.photoURL,
				};

				const articleRes = await axiosSecure.post('/articles/pending', articleInfo);

				if (articleRes.data.insertedId) {
					Swal.fire({
						icon: 'success',
						title: 'Article is added to the menu.',
						showConfirmButton: false,
						timer: 1500,
					});
					form.reset();
					setSelectedTags([]);
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
		<div className="max-w-screen-xl mx-auto mt-8 md:mt-12 mb-12 md:mb-24">
			<div className="text-center mb-8">
				<h2 className="md:text-4xl text-2xl font-bold text-gray-700 mb-4">Add Article</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Submit Your Story: Share the Latest News with Our Community
				</p>
			</div>

			<div className="w-full bg-white shadow sm:max-w-2xl">
				<div className="p-6 sm:p-8">
					<form onSubmit={onSubmit} className="space-y-3 md:space-y-5">
						<div className="w-full">
							<label
								htmlFor="title"
								className="block mb-2 text-sm font-medium text-gray-900">
								Article Title
							</label>
							<input
								type="text"
								name="title"
								id="title"
								placeholder="Article Title"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
							/>
						</div>

						<div className="flex flex-col md:flex-row gap-4">
							<div className="w-full">
								<label className="block mb-2 text-sm font-medium text-gray-900">
									Tags
								</label>
								<Select
									isMulti
									name="colors"
									options={options}
									className="basic-multi-select"
									classNamePrefix="select"
									styles={customStyles}
									onChange={handleTagChange}
									value={selectedTags}
								/>
							</div>
							<div className="w-full">
								<label
									htmlFor="publisher"
									className="block mb-2 text-sm font-medium text-gray-900">
									Publisher
								</label>
								<select
									id="publisher"
									name="publisher"
									className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5">
									{publishers.map(publisher => (
										<option key={publisher._id} value={publisher.name}>
											{publisher.name}
										</option>
									))}
								</select>
							</div>
						</div>

						<div className="w-full">
							<label
								htmlFor="image"
								className="block mb-2 text-sm font-medium text-gray-900">
								Article Image/Thumbnail
							</label>
							<input
								type="file"
								name="image"
								id="image"
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
							/>
						</div>
						<div className="w-full">
							<label
								htmlFor="description"
								className="block mb-2 text-sm font-medium text-gray-900">
								Description
							</label>
							<textarea
								id="description"
								name="description"
								rows={4}
								className="bg-gray-50 border border-gray-300 text-gray-900 text-sm block w-full p-2.5"
								placeholder="Article Description"
							/>
						</div>

						<button
							type="submit"
							className="w-full text-white bg-gray-700 hover:bg-gray-800 font-medium text-sm px-5 py-2.5 text-center">
							Submit
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default AddArticles;
