import { ReactNode } from 'react';

interface IProps {
	variant: 'primary' | 'secondary' | 'danger' | 'light' | 'select' | 'fullscreen';
	type: 'submit' | 'button';
	label: string;
	icon?: any;
	onClick: () => void;
	loading?: boolean;
	disabled?: boolean;
}

const CustomButton = ({ variant, type, label, icon, onClick, loading, disabled }: IProps) => {
	const primaryClasses =
		'text-black bg-[#C1A821]  border-white rounded-2xl  hover:bg-[#C1A821] hover:shadow-[0_0_5px_5px_#C1A8214c] px-6 mx-1';

	const secondaryClasses =
		'text-black bg-[#E4CA6F] border-white rounded-2xl hover:bg-[#E4CA6F] hover:shadow-[0_0_5px_5px_#E4CA6F65] px-6 mx-1';

	const lightClasses =
		'text-black bg-[#F1F3D0] border-white rounded-2xl  hover:bg-[#F1F3D0] hover:shadow-[0_0_5px_5px_#F1F3D042] px-6 mx-1';

	const dangerClasses =
		'text-white bg-red-600 border-white rounded-2xl  hover:bg-red-600 hover:shadow-[0_0_5px_5px_#dc262670] px-6 mx-1';

	const SelectClasses =
		'text-black bg-white border !border-black rounded-sm  hover:!bg-[#F1F3D0]  hover:shadow-[0_0_5px_5px_#d1d5db] w-full md:min-w-[170px] mx-2';

	const SelectFullScreen =
		'text-black bg-white border !border-black rounded-sm  hover:!bg-[#F1F3D0]  hover:shadow-[0_0_5px_5px_#d1d5db w-full md:min-w-[170px] mx-2';
	const classNameCreator = (): string => {
		let finalClassName = ' outline-none duration-300 h-10  se:text-lg text-sm font-semibold border-2';
		if (variant === 'primary') {
			finalClassName += primaryClasses;
		} else if (variant === 'secondary') {
			finalClassName += secondaryClasses;
		} else if (variant === 'danger') {
			finalClassName += dangerClasses;
		} else if (variant === 'light') {
			finalClassName += lightClasses;
		} else if (variant === 'select') {
			finalClassName += SelectClasses;
		} else if (variant === 'fullscreen') {
			finalClassName += SelectFullScreen;
		}
		// finalClassName += ' disabled:shadow-none disabled:bg-gray-300 disabled:border-gray-300';
		finalClassName += ' disabled:shadow-none';
		return finalClassName;
	};

	const loadingIconCreator = () => {
		return <div className='w-6 h-6 rounded-xl animate-spin border-4 !border-gray-300 !border-t-gray-500 '></div>;
	};

	return (
		<button type={type} onClick={onClick} className={classNameCreator()} disabled={disabled || loading}>
			{loading ? (
				loadingIconCreator()
			) : icon ? (
				<div className='flex justify-center items-center mx-[10px] '>
					<div className='mx-1'>{icon}</div>
					<div>{label}</div>
				</div>
			) : (
				label
			)}
		</button>
	);
};

export default CustomButton;
