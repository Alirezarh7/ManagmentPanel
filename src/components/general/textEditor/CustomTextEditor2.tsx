import { useState, useEffect, useRef } from 'react';
import { CKEditor } from '@ckeditor/ckeditor5-react';

import {
	ClassicEditor,
	AccessibilityHelp,
	Autoformat,
	Autosave,
	BlockQuote,
	Bold,
	Essentials,
	FullPage,
	GeneralHtmlSupport,
	Heading,
	HtmlComment,
	HtmlEmbed,
	Indent,
	IndentBlock,
	Italic,
	Link,
	Paragraph,
	SelectAll,
	ShowBlocks,
	SourceEditing,
	Table,
	TableCaption,
	TableCellProperties,
	TableColumnResize,
	TableProperties,
	TableToolbar,
	TextTransformation,
	Underline,
	Undo,
	EditorConfig
} from 'ckeditor5';

import 'ckeditor5/ckeditor5.css';
import CustomButton from '../Buttons/CustomButton';

interface IProps {
	showPreview: boolean;
	label?: string;
	value: string;
	onChange: (value: string) => void;
	error?: string;
	disabled?: boolean;
}

const CustomTextEditor2 = ({ showPreview, label, value, onChange, disabled = false, error }: IProps) => {
	const [isLayoutReady, setIsLayoutReady] = useState(false);
	const [showPreviewState, setShowPreviewState] = useState<boolean>(false);
	const editorContainerRef = useRef(null);
	const editorRef = useRef(null);

	useEffect(() => {
		setIsLayoutReady(true);

		return () => setIsLayoutReady(false);
	}, []);

	const editorConfig = {
		width: '100%',
		toolbar: {
			items: [
				'undo',
				'redo',
				'|',
				'sourceEditing',
				'showBlocks',
				'|',
				'heading',
				'|',
				'bold',
				'italic',
				'underline',
				'|',
				'link',
				'insertTable',
				'blockQuote',
				'htmlEmbed',
				'|',
				'outdent',
				'indent'
			],
			shouldNotGroupWhenFull: false
		},
		plugins: [
			AccessibilityHelp,
			Autoformat,
			Autosave,
			BlockQuote,
			Bold,
			Essentials,
			FullPage,
			GeneralHtmlSupport,
			Heading,
			HtmlComment,
			HtmlEmbed,
			Indent,
			IndentBlock,
			Italic,
			Link,
			Paragraph,
			SelectAll,
			ShowBlocks,
			SourceEditing,
			Table,
			TableCaption,
			TableCellProperties,
			TableColumnResize,
			TableProperties,
			TableToolbar,
			TextTransformation,
			Underline,
			Undo
		],
		heading: {
			options: [
				{
					model: 'heading1' as 'heading1',
					view: 'h1',
					title: 'Heading 1',
					class: 'ck-heading_heading1'
				},
				{
					model: 'heading2' as 'heading2',
					view: 'h2',
					title: 'Heading 2',
					class: 'ck-heading_heading2'
				},
				{
					model: 'heading3' as 'heading3',
					view: 'h3',
					title: 'Heading 3',
					class: 'ck-heading_heading3'
				},
				{
					model: 'heading4' as 'heading4',
					view: 'h4',
					title: 'Heading 4',
					class: 'ck-heading_heading4'
				},
				{
					model: 'heading5' as 'heading5',
					view: 'h5',
					title: 'Heading 5',
					class: 'ck-heading_heading5'
				},
				{
					model: 'heading6' as 'heading6',
					view: 'h6',
					title: 'Heading 6',
					class: 'ck-heading_heading6'
				}
			]
		},
		htmlSupport: {
			allow: [
				{
					name: /^.*$/
				}
			]
		},
		initialData: '',
		link: {
			addTargetToExternalLinks: true,
			defaultProtocol: 'https://',
			decorators: {}
		},
		menuBar: {
			isVisible: false
		},
		placeholder: 'شروع به تایپ کنید',
		table: {
			contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells', 'tableProperties', 'tableCellProperties']
		}
	};

	return (
		<div className='space-y-4 border-4'>
			{label ? <h4>{label}</h4> : null}
			<div className='ckeditor5-container'>
				<div
					className='editor-container editor-container_classic-editor editor-container_include-block-toolbar'
					ref={editorContainerRef}>
					<div className='editor-container__editor'>
						<div ref={editorRef} className=''>
							{isLayoutReady ? (
								<CKEditor
									editor={ClassicEditor}
									config={editorConfig}
									data={value}
									onChange={(event, editor) => {
										const data = editor.getData();
										onChange(data);
									}}
								/>
							) : null}
						</div>
					</div>
				</div>
			</div>
			{showPreview ? (
				<CustomButton
					variant={'light'}
					type={'button'}
					label={showPreviewState ? 'عدم مشاهده پیش نمایش متن اطلاعیه' : 'مشاهده پیش نمایش متن اطلاعیه'}
					onClick={() => setShowPreviewState(prev => !prev)}
				/>
			) : null}
			<div
				className={`grid ${showPreview && showPreviewState ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'} transition-all duration-500`}>
				<div
					dangerouslySetInnerHTML={{ __html: value }}
					className={`w-full px-3 py-3 ${showPreview && showPreviewState ? '' : 'hidden'} text-base border !border-dashed !border-blue-300 rounded-md has-table-content overflow-hidden`}></div>
			</div>
		</div>
	);
};

export default CustomTextEditor2;
