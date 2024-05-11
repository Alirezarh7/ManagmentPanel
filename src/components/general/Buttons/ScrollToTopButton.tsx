import React from 'react';
import { FaChevronUp } from 'react-icons/fa';

const ScrollToTopButton = () => {
	const clickHandler = () => {
		window.scrollTo({
			top: 0,
			left: 0,
			behavior: 'smooth'
		});
	};

	return (
		<div
			className='fixed bottom-16 right-4 p-2 flex items-center bg-[#061C3B] text-white rounded-full cursor-pointer'
			onClick={clickHandler}>
			<FaChevronUp className='text-white w-8 h-8' />
		</div>
	);
};

export default ScrollToTopButton;
