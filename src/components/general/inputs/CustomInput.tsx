import React from 'react';

interface IProps {
	type: 'text' | 'number';
	value: string;
	onChange: (value: string) => void;
	className?: string;
	label?: string;
	error?: string;
	disabled?: boolean;
}

const CustomInput = ({ type, value, onChange, className, label, disabled = false, error }: IProps) => {
	return (
		<div className={`${className ? className : ''}`}>
			{label ? <label className='form-label'>{label}</label> : null}
			<input
				type={type}
				autoComplete='off'
				value={value}
				onChange={event => onChange(event.target.value)}
				disabled={disabled}
				className={`${error ? 'border-danger' : ''}`}
			/>
			{error ? <span className='text-danger'>{error}</span> : null}
		</div>
	);
};

export default CustomInput;
