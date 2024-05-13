import React from 'react';

const CustomPingSpinner = () => {
	return (
		<div className='w-full flex justify-center items-center mx-auto'>
			<div className='animate-ping w-16 h-16 m-8 rounded-full bg-sky-600'></div>
		</div>
	);
};

export default CustomPingSpinner;
