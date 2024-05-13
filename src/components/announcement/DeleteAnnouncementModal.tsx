import React from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { IAnnouncementResponse } from '../../typs/announcement.types';
import { useDeleteAnnouncement } from '../../services/announcement.service';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';

interface IProps {
	data: IAnnouncementResponse;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
	acceptLabel?: string;
	cancelLabel?: string;
}

const DeleteAnnouncementModal = ({ data, isOpen, onSuccess, onCancel }: IProps) => {
	const queryClient = useQueryClient();
	const { mutate, isPending } = useDeleteAnnouncement();

	const deleteAnnouncementHandler = () => {
		mutate(data.id, {
			onSuccess: () => {
				enqueueSnackbar('اطلاعیه با موفقیت حذف شد', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getAnnouncements']
				});
				onSuccess();
			},
			onError: error => {
				enqueueSnackbar('خطا در حذف اطلاعیه ', { variant: 'error' });
			}
		});
	};

	return (
		<CustomModal isOpen={isOpen} title='تایید حذف آگهی' onDismiss={onCancel}>
			<div className='mt-2 mb-5 text-black text-lg '>
				<p>آیا از حذف این آیتم اطمینان دارید؟</p>
			</div>
			<div className='flex flex-col md:flex-row gap-4'>
				<CustomButton
					variant={'primary'}
					type={'button'}
					label='بله حذف کن'
					onClick={deleteAnnouncementHandler}
					loading={isPending}
				/>
				<CustomButton variant={'danger'} type={'button'} label='خیر' onClick={onCancel} disabled={isPending} />
			</div>
		</CustomModal>
	);
};

export default DeleteAnnouncementModal;
