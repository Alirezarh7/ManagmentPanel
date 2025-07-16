import React, { ReactNode } from 'react';

interface IProps {
	children: ReactNode;
	key?: number | string;
	className?: string;
	title: string;
}
const CustomCard = ({ children, key, title, className = 'w-full mx-2 p-2' }: IProps) => {
	return (
		<div className='w-full flex flex-col items-center my-4 mt-5 px-1'>
			<div className='!bg-gradient-to-r !from-customBlue !to-gridColor p-1.5 rounded-tl-lg rounded-tr-lg'>
				<p className={'text-white'}>
					{title}
				</p>
			</div>
			<div key={key} className={`flex flex-col border !border-sliderColor rounded-lg  ${className}`}>
				{children}
			</div>
		</div>
	);
};

export default CustomCard;
