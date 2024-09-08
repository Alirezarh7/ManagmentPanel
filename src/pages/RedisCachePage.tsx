import React, { useEffect, useState } from 'react';
import useTitle from '../hooks/useTitle';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { enqueueSnackbar } from 'notistack';
import CustomLineSpinner from '../components/general/spinners/CustomLineSpinner';
import { useGetRedisCacheKeys } from '../services/redis.service';
import RedisCachesTable from '../components/redisCache/RedisCachesTable';
import DeleteAllRedisCacheKeysModal from '../components/redisCache/DeleteAllRedisCacheKeysModal';
import CustomButton from '../components/general/Buttons/CustomButton';

const RedisCachePage = () => {
	useTitle('کش ردیس', 'ناوشگران');
	const [showDeleteAllModal, setShowDeleteAllModal] = useState(false);

	const { data: keys, isLoading, isFetching, isError } = useGetRedisCacheKeys();

	const isPageLoading: boolean = isLoading || isFetching;

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('مشکل در بروزرسانی لیست کلیدهای کش ردیس', { variant: 'error' });
		}
	}, [isError]);

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'کش ردیس' }]} />
			<div className='flex justify-between items-center'>
				<h1 className='text-xl'>کش ردیس</h1>
				<CustomButton
					variant={'danger'}
					type={'button'}
					label='حذف کلیه کلیدهای ردیس'
					onClick={() => setShowDeleteAllModal(true)}
					disabled={isPageLoading}
				/>
			</div>
			{isPageLoading ? <CustomLineSpinner /> : null}
			<RedisCachesTable keys={keys} />
			{showDeleteAllModal && (
				<DeleteAllRedisCacheKeysModal
					isOpen={true}
					onSuccess={() => setShowDeleteAllModal(false)}
					onCancel={() => setShowDeleteAllModal(false)}
				/>
			)}
		</div>
	);
};

export default RedisCachePage;
