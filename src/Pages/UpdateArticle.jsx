import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from '../Hooks/useAxiosSecure';
import Select from 'react-select';
import useAxiosPublic from '../Hooks/useAxiosPublic';
import Swal from 'sweetalert2';
import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

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

const UpdateArticle = () => {
	const [selectedTags, setSelectedTags] = useState([]);
	const [selectedPublisher, setSelectedPublisher] = useState('');
	const axiosPublic = useAxiosPublic();
	const axiosSecure = useAxiosSecure();
	const { id } = useParams();
	const navigate = useNavigate();

	const { data: article = {} } = useQuery({
		queryKey: ['singleArticle', id],
		queryFn: async () => {
			const res = await axiosSecure.get(`/article/${id}`);
			return res.data;
		},
	});

	const { data: publishers = [] } = useQuery({
		queryKey: ['publishers'],
		queryFn: async () => {
			const res = await axiosSecure.get('/publisher');
			return res.data;
		},
	});

	useEffect(() => {
		if (article.tags) {
			setSelectedTags(article.tags.map(tag => ({ value: tag, label: tag })));
		}
		if (article.publisher) {
			setSelectedPublisher(article.publisher);
		}
	}, [article]);

	const handleTagChange = selectedOptions => {
		setSelectedTags(selectedOptions || []);
	};

	const handlePublisherChange = e => {
		setSelectedPublisher(e.target.value);
	};

	const onSubmit = async e => {
		e.preventDefault();

		const form = e.target;
		const title = form.title.value;
		const description = form.description.value;
		const imageFile = form.image.files[0];
		const tags = selectedTags.map(tag => tag.value);
		const postedDate = new Date().toISOString();

		let imageUrl = article.image;

		if (imageFile) {
			const formData = new FormData();
			formData.append('image', imageFile);

			try {
				const res = await axiosPublic.post(image_hosting_api, formData, {
					headers: {
						'Content-Type': 'multipart/form-data',
					},
				});

				if (res.data.success) {
					imageUrl = res.data.data.display_url;
				} else {
					throw new Error('Image upload failed');
				}
			} catch (error) {
				Swal.fire({
					icon: 'error',
					title: 'Image upload failed',
					text: error.response?.data?.message || 'Please try again.',
				});
				return;
			}
		}

		const articleInfo = {
			title,
			publisher: selectedPublisher,
			description,
			tags,
			image: imageUrl,
			postedDate,
		};

		try {
			const articleRes = await axiosSecure.patch(`/articles/${id}`, articleInfo);

			if (articleRes.data.modifiedCount > 0) {
				Swal.fire({
					icon: 'success',
					title: 'Article updated successfully!',
					showConfirmButton: false,
					timer: 1500,
				});
				navigate('/my-articles');
			}
		} catch (error) {
			Swal.fire({
				icon: 'error',
				title: 'Update failed',
				text: error.response?.data?.message || 'Something went wrong.',
			});
		}
	};

	return (
		<div className="max-w-screen-xl px-4 mx-auto mt-8 mb-12 md:mt-12 md:mb-24 lg:px-8">
			<div className="mb-8 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">
					Update Article
				</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Update Your Story: Share the Latest News with Our Community
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
								defaultValue={article.title}
							/>
						</div>

						<div className="flex flex-col gap-4 md:flex-row">
							<div className="w-full">
								<label className="block mb-2 text-sm font-medium text-gray-900">
									Tags
								</label>
								<Select
									isMulti
									name="tags"
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
									value={selectedPublisher}
									onChange={handlePublisherChange}
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
								defaultValue={article.description}
							/>
						</div>

						<button
							type="submit"
							className="w-full text-white bg-gray-700 hover:bg-gray-800 font-medium text-sm px-5 py-2.5 text-center">
							Update Article
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default UpdateArticle;
