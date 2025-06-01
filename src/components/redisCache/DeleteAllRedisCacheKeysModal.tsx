import React from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteAllRedisCacheKeys } from '../../services/redis.service';

interface IProps {
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}

const DeleteAllRedisCacheKeysModal = ({ isOpen, onSuccess, onCancel }: IProps) => {
	const { mutate, isPending } = useDeleteAllRedisCacheKeys();
	const queryClient = useQueryClient();

	const deleteCacheHandler = () => {
		mutate(undefined, {
			onSuccess: () => {
				enqueueSnackbar('کلیه کلیدهای دیتابیس ردیس با موفقیت حذف شدند', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getRedisCacheKeys']
				});
				onSuccess();
			},
			onError: error => {
				enqueueSnackbar('خطا در حذف کلیدهای دیتابیس ردیس', { variant: 'error' });
			}
		});
	};

	return (
		<CustomModal isOpen={isOpen} title='حذف کلیدهای کش ردیس' onDismiss={onCancel}>
			<div className='m-3 flex flex-col gap-4 '>
				<p className='text-lg'>آیا از حذف کلیه کلیدهای دیتابیس ردیس اطمینان دارید؟</p>
				<div className='flex flex-col md:flex-row gap-4 mt-10'>
					<CustomButton
						variant={'primary'}
						type={'button'}
						label={'بله، حذف کن'}
						onClick={() => deleteCacheHandler()}
						loading={isPending}
					/>
					<CustomButton variant={'Cancel'} type={'button'} label='انصراف' onClick={onCancel} disabled={isPending} />
				</div>
			</div>
		</CustomModal>
	);
};

export default DeleteAllRedisCacheKeysModal;
