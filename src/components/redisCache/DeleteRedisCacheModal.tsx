import React, { useEffect } from 'react';
import CustomModal from '../general/Modal/CustomModal';
import CustomButton from '../general/Buttons/CustomButton';
import { enqueueSnackbar } from 'notistack';
import { useQueryClient } from '@tanstack/react-query';
import { useDeleteRedisCacheKey } from '../../services/redis.service';
import { IDeleteRedisCacheDto } from '../../typs/redisCache.types';

interface IProps {
	cacheKey: string;
	isOpen: boolean;
	onSuccess: () => void;
	onCancel: () => void;
}

const DeleteRedisCacheModal = ({ cacheKey, isOpen, onSuccess, onCancel }: IProps) => {
	const { mutate, isPending } = useDeleteRedisCacheKey();
	const queryClient = useQueryClient();

	const deleteCacheHandler = () => {
		const data: IDeleteRedisCacheDto = {
			key: cacheKey
		};
		mutate(data, {
			onSuccess: () => {
				enqueueSnackbar('کلید انتخاب شده با موفقیت حذف شد', { variant: 'success' });
				queryClient.invalidateQueries({
					queryKey: ['getRedisCacheKeys']
				});
				onSuccess();
			},
			onError: error => {
				enqueueSnackbar('خطا در حذف کلید انتخاب شده', { variant: 'error' });
			}
		});
	};

	return (
		<CustomModal isOpen={isOpen} title='حذف کلید کش ردیس' onDismiss={onCancel}>
			<div className='m-3 flex flex-col gap-4 '>
				<p className='text-lg'>آیا از حذف کلید زیر اطمینان دارید؟</p>
				<p>{cacheKey}</p>
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

export default DeleteRedisCacheModal;
