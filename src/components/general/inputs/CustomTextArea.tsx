import React from 'react';

interface IProps {
	value: string;
	onChange: (value: string) => void;
	rows?: number;
	className?: string;
	inputClassName?: string;
	label?: string;
	error?: string;
	disabled?: boolean;
}

const CustomTextArea = ({ value, onChange, rows = 5, className, inputClassName, label, disabled = false, error }: IProps) => {
	return (
		<div className={`${className ? className : ''}`}>
			{label ? <label className='form-label'>{label}</label> : null}
			<textarea
				autoComplete='off'
				value={value}
				rows={rows}
				onChange={event => onChange(event.target.value)}
				disabled={disabled}
				className={`${error ? 'border-danger' : ''} ${inputClassName ? inputClassName : ''}`}></textarea>
			{error ? <span className='text-danger'>{error}</span> : null}
		</div>
	);
};

export default CustomTextArea;
