import React, { ReactNode } from 'react';

interface IProps {
	icon: ReactNode;
	title: string;
	children: ReactNode;
}

const Title = ({ icon, title, children }: IProps) => {
	return (
		<div className='mt-[10px]'>
			<div className='flex justify-between mx-1 items-center'>
				<div className='h-4 w-4 text-[#A4A4A4]'>{icon}</div>
				<div className='mx-2 text-[#A4A4A4]'>
					<p>{title}</p>
				</div>
				<div className='border-t !border-[#A4A4A4] flex-grow'></div>
			</div>
			<div className=' flex flex-col md:flex-row md:justify-around md:items-center md:m-[5px]'>{children}</div>
		</div>
	);
};

export default Title;
