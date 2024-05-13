import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

interface IProps {
	showPreview: boolean;
	label: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	disabled?: boolean;
}

const CustomTextEditor = ({ showPreview, label, value, onChange, disabled = false, error }: IProps) => {
	const toolbarOptions = [
		['strike', 'underline', 'italic', 'bold'], // toggled buttons
		['blockquote', 'code-block'],
		['link'],
		[{ header: 1 }], // custom button values
		// [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
		[{ script: 'sub' }, { script: 'super' }], // superscript/subscript
		[{ indent: '-1' }, { indent: '+1' }], // outdent/indent
		[{ direction: 'rtl' }], // text direction
		[{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
		[{ header: [1, 2, 3, 4, 5, 6, false] }],
		[{ color: [] }, { background: [] }], // dropdown with defaults from theme
		// [{ font: [] }],
		[{ align: [] }],
		['clean'] // remove formatting button
	];

	return (
		<div>
			<label className='form-label'>{label}</label>
			<ReactQuill
				modules={{
					toolbar: toolbarOptions
				}}
				className={`bg-white ${error ? 'border !border-danger' : ''}`}
				theme='snow'
				value={value}
				onChange={onChange}
			/>
			{error ? <span className='text-danger'>{error}</span> : null}
		</div>
	);
};

export default CustomTextEditor;
