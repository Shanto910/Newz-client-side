import { useState } from 'react';
import { FaAngleDown } from 'react-icons/fa6';

const FAQ = () => {
	const [openIndex, setOpenIndex] = useState(null);

	const toggleOpen = index => {
		setOpenIndex(openIndex === index ? null : index);
	};

	const faqs = [
		{
			question: 'How do I subscribe to premium article content?',
			answer: "You can subscribe by clicking the 'get premium' in the subscription section in the homepage or by going to the subscription page. Then after you go to the subscription page, select a subscription period and then click 'Subscribe now' go to the payment page and pay for the subscription period",
		},
		{
			question: 'Is the news on this website verified?',
			answer: 'Yes, we follow strict journalistic standards and verify all news from reliable sources before publishing. Our goal is to provide accurate and unbiased news.',
		},
		{
			question: 'How often is the news updated?',
			answer: 'We update our news feed in real-time, ensuring you get the latest headlines as they happen.',
		},
		{
			question: 'Can I submit multiple articles?',
			answer: 'Absolutely! If you have taken the subscription plan, you can submit unlimited articles. For free users it is only limited to one article',
		},
		{
			question: 'Is it secure to publish articles here?',
			answer: 'Of course! Our premium users get private guards to protect themselves.',
		},
	];

	return (
		<div className="max-w-screen-lg px-4 mx-auto mb-12 md:mb-24 lg:px-8">
			<div className="mb-16 text-center">
				<h2 className="mb-4 text-2xl font-bold text-gray-700 md:text-4xl">FAQ</h2>
				<p className="text-xl max-w-[62ch] mx-auto text-gray-500">
					Answers to Your Most Common Question
				</p>
			</div>
			<div className="p-6 space-y-6 bg-white shadow-lg">
				{faqs.map((faq, index) => (
					<div key={index} className="border-b border-gray-300">
						<button
							className="flex items-center justify-between w-full py-4 text-left cursor-pointer focus:outline-none"
							onClick={() => toggleOpen(index)}>
							<h3 className="text-xl font-semibold text-gray-900">{faq.question}</h3>
							<FaAngleDown
								className={`w-6 h-6 transform transition-transform duration-300 ${
									openIndex === index ? 'rotate-180' : ''
								}`}
							/>
						</button>
						<div
							className={`overflow-hidden transition-all duration-300 ease-in-out ${
								openIndex === index ? 'max-h-40' : 'max-h-0'
							}`}>
							<p className="pb-4 text-lg text-gray-700">{faq.answer}</p>
						</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default FAQ;
