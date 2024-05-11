import React, { useState } from 'react';
import CustomModal from '../CustomModal';
import CustomButton from '../../Buttons/CustomButton';

interface IProps {
	isOpen: boolean;
	onAccept: () => void;
	onCancel: () => void;
	title?: string;
	acceptLabel?: string;
	cancelLabel?: string;
}

const ConfirmationModal = ({
	isOpen,
	onAccept,
	onCancel,
	title = 'تایید',
	acceptLabel = 'بله میخواهم انصراف بدهم',
	cancelLabel = 'خیر'
}: IProps) => {
	return (
		<CustomModal isOpen={isOpen} title={title} onDismiss={onCancel}>
			<div className='mt-2 mb-5 text-black text-lg '>
				<p>آیا از انصراف اطمینان دارید؟</p>
			</div>
			<div className='flex flex-col md:flex-row gap-4'>
				<CustomButton variant={'primary'} type={'button'} label={acceptLabel} onClick={onAccept} />
				<CustomButton variant={'danger'} type={'button'} label={cancelLabel} onClick={onCancel} />
			</div>
		</CustomModal>
	);
};

export default ConfirmationModal;
