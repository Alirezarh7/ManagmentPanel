import React from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { IFaqContentResponse } from '../../typs/faqContent.types';
import { useDeleteFaqContent } from '../../services/faqContent.service';

interface IProps {
	data: IFaqContentResponse;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
	acceptLabel?: string;
	cancelLabel?: string;
}

const DeleteFaqContentModal = ({ data, isOpen, onSuccess, onCancel }: IProps) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useDeleteFaqContent();

	const deleteFaqContentHandler = () => {
		mutate(data.id, {
			onSuccess: () => {
				enqueueSnackbar('ُسوال انتخاب شده با موفقیت حذف شد', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getFaqContents']
				});
				onSuccess();
			},
			onError: error => {
				enqueueSnackbar('خطا در حذف سوال انتخاب شده ', { variant: 'error' });
			}
		});
	};

	return (
		<CustomModal isOpen={isOpen} title='تایید حذف سوال انتخاب شده' onDismiss={onCancel}>
			<div className='m-3 flex flex-col gap-4'>
				<p className='text-lg'>آیا از حذف این سوال اطمینان دارید؟</p>
				<div className='flex items-center gap-4'>
					<p>{data.question}</p>
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-4 mt-10'>
				<CustomButton
					variant={'primary'}
					type={'button'}
					label='بله حذف کن'
					onClick={deleteFaqContentHandler}
					loading={isPending}
				/>
				<CustomButton variant={'Cancel'} type={'button'} label='خیر' onClick={onCancel} disabled={isPending} />
			</div>
		</CustomModal>
	);
};

export default DeleteFaqContentModal;
