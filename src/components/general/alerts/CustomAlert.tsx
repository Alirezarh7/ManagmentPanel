import React from 'react';
import { CiWarning } from 'react-icons/ci';

interface IProps {
	variant: 'danger' | 'success' | 'alert';
	shouldHaveIcon: boolean;
	message: string;
	title?: string;
}

const CustomAlert = ({ variant, shouldHaveIcon, message, title = 'هشدار' }: IProps) => {
	let divClasses = '';
	let pClasses = '';
	let icon;

	switch (variant) {
		case 'alert':
			divClasses =
				'px-3 py-3 flex w-full gap-4 border-r-8 !border-amber-500 bg-amber-100 shadow-md dark:bg-[#1B1B24] dark:bg-opacity-30 ';
			icon = <CiWarning className='w-20 h-20 text-amber-500' />;
			pClasses = 'leading-relaxed text-amber-600';
			break;
	}

	return (
		<div className={divClasses}>
			{shouldHaveIcon ? <div className='mr-3 flex h-9 w-9 items-center justify-center rounded-lg'>{icon}</div> : null}
			<div className='w-full'>
				<h5 className='mb-3 text-lg font-semibold text-[#9D5425]'>{title}</h5>
				<p className={pClasses}>{message}</p>
			</div>
		</div>
	);
};

export default CustomAlert;
