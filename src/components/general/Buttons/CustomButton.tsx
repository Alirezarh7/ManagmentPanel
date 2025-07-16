import {ReactNode} from "react";

interface IProps {
	variant?:
		| "primary"
		| "Cancel"
		| "select"
		| 'InputClass'
	type?: "submit" | "button";
	label?: any;
	labelClassName?: string;
	icon?: ReactNode;
	onClick?: () => void;
	className?: string;
	loading?: boolean;
	disabled?: boolean;
}

const CustomButton = ({
												variant,
												type,
												label,
												icon,
												onClick,
												loading,
												disabled,
												labelClassName,
												className
											}: IProps) => {
	const primaryClasses =
		" w-fit text-white text-sm !bg-gradient-to-r !from-customBlue !to-gridColor hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gridColor font-medium rounded-lg  p-2.5 text-center  m-2  ";
	const CancelClasses =
		" w-fit text-white text-sm !bg-gradient-to-r !from-ColorFullRead !to-ColorLessRead hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gridColor font-medium rounded-lg  p-2.5 text-center  m-2  ";
	const InputClass =
		'!bg-gradient-to-r !from-customBlue !to-gridColor hover:bg-gradient-to-bl border !border-gray-900 !rounded-tl-lg !rounded-bl-lg outline-0  !text-black px-2 ';
	const SelectClasses =
		` ${className ? className : 'w-fit m-2'} text-white text-sm !bg-gradient-to-r !from-sliderColor !to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-gridColor font-medium rounded-lg  p-2.5 text-center  `;

	const classNameCreator = (): string => {
		let finalClassName = `${disabled ? "disabled" : "enable"} outline-none duration-300 py-2  text-black text-[13px] md:text-[14px] font-semibold `;
		if (variant === "primary") {
			finalClassName += primaryClasses;
		} else if (variant === "Cancel") {
			finalClassName += CancelClasses;
		} else if (variant === "select") {
			finalClassName += SelectClasses;
		}else if (variant === 'InputClass') {
			finalClassName += InputClass;
		}
		finalClassName +=
			"  !disabled:bg-gray-300 !disabled:border-gray-300";
		return finalClassName;
	};

	const loadingIconCreator = () => {
		return (
			<div className="w-6 h-6 rounded-xl animate-spin border-2 border-gray-400 border-t-gray-800"></div>
		);
	};

	return (
		<button type={type} disabled={disabled} onClick={onClick} className={classNameCreator()}>
			{loading ? (
				loadingIconCreator()
			) : icon ? (
				<div className="flex justify-center items-center mx-[10px] ">
					<div className="mx-1">{icon}</div>
					<div className={labelClassName}>{label}</div>
				</div>
			) : (
				label
			)}
		</button>
	);
};

export default CustomButton;
