import React, { ReactNode, useState } from 'react';
import './DashboardOperationCard.css';

interface IProps {
	src: any;
	icon: ReactNode;
	title?: string;
}

const DashboardOperationCard = ({ src, title, icon }: IProps) => {
	const [isHovered, setIsHovered] = useState(false);
	return (
		<div
			className='w-full cursor-pointer max-md:flex md:flex-col max-md:items-center max-md:pr-[16px] md:mt-3 '
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}>
			<div className=' h-[30px] w-[39px] lg:w-full lg:h-[50px] flex justify-center items-center'>
				{src ? <img alt='' className=' h-[30px] w-[40px] lg:h-[50px] lg:w-[60px]' src={src} /> : icon}
			</div>
			<div className=' flex justify-center text-base text-gray-700 m-3'>
				<strong>{title}</strong>
			</div>
		</div>
	);
};

export default DashboardOperationCard;
