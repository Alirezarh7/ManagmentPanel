import React, { useEffect } from 'react';
import { mainFaqData } from '../constants/faq.const';
import FaqAccordion from '../components/faq/FaqAccordion';

const FaqPage = () => {
	useEffect(() => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto px-3 py-4 '>
			<h1 className='mb-4 font-bold text-xl'>سوالات متداول</h1>
			{mainFaqData.map((item, index) => (
				<div key={index} className='my-4 flex flex-col gap-4'>
					<h4 className='font-semibold text-base text-red-800'>{item.category}</h4>
					<FaqAccordion questions={item.questions} />
				</div>
			))}
		</div>
	);
};

export default FaqPage;
