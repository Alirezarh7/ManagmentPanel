import React from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { IContentResponse } from '../../typs/content.types';
import { useDeleteContent } from '../../services/content.service';

interface IProps {
	data: IContentResponse;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
	acceptLabel?: string;
	cancelLabel?: string;
}

const DeleteContentModal = ({ data, isOpen, onSuccess, onCancel }: IProps) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useDeleteContent();

	const deleteContentHandler = () => {
		mutate(data.id, {
			onSuccess: () => {
				enqueueSnackbar('محتوا با موفقیت حذف شد', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getContents']
				});
				onSuccess();
			},
			onError: error => {
				enqueueSnackbar('خطا در حذف محتوا ', { variant: 'error' });
			}
		});
	};

	return (
		<CustomModal isOpen={isOpen} title='تایید حذف محتوا' onDismiss={onCancel}>
			<div className='m-3 flex flex-col gap-4'>
				<p className='text-lg'>آیا از حذف این محتوا اطمینان دارید؟</p>
				<div className='flex items-center gap-4'>
					<p>{data.subject}</p>
				</div>
			</div>
			<div className='flex flex-col md:flex-row gap-4 mt-10'>
				<CustomButton variant={'primary'} type={'button'} label='بله حذف کن' onClick={deleteContentHandler} loading={isPending} />
				<CustomButton variant={'Cancel'} type={'button'} label='خیر' onClick={onCancel} disabled={isPending} />
			</div>
		</CustomModal>
	);
};

export default DeleteContentModal;
