import React, { ReactNode } from 'react';

interface IProps {
	onClick: () => void;
	children: ReactNode;
	className?: string;
	isDisabled?: boolean;
}

const PaginationButton = ({ onClick, children, className, isDisabled }: IProps) => {
	let baseClass: string =
		'text-black bg-[#E4CA6F] border-white rounded-lg hover:bg-[#E4CA6F] hover:shadow-[0_0_5px_5px_#E4CA6F65] px-3';
	baseClass += ' outline-none duration-300 h-9 se:text-lg text-sm font-semibold border disabled:shadow-none disabled:opacity-50';
	if (className) baseClass += className;

	return (
		<button type='button' className={baseClass} onClick={onClick} disabled={isDisabled}>
			{children}
		</button>
	);
};

export default PaginationButton;
