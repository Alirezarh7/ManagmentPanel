import React, { useEffect } from 'react';
import useTitle from '../hooks/useTitle';
import Breadcrumb from '../components/Layout/Breadcrumb';
import { enqueueSnackbar } from 'notistack';
import CustomLineSpinner from '../components/general/spinners/CustomLineSpinner';
import ConfigsTable from '../components/configs/ConfigsTable';
import { useGetConfigs } from '../services/configs.service';

const CalenderPage = () => {
	useTitle('settings', 'ناوشگران');

	const { data: configs, isLoading, isFetching, isError } = useGetConfigs();

	const isPageLoading: boolean = isLoading || isFetching;

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('مشکل در بروزرسانی لیست تنظیمات وبسایت', { variant: 'error' });
		}
	}, [isError]);

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'تنظیمات' }]} />
			<div className='flex justify-between items-center'>
				<h1 className='text-xl'>تنظیمات</h1>
			</div>
			{isPageLoading ? <CustomLineSpinner /> : null}
			<ConfigsTable configs={configs} />
		</div>
	);
};

export default CalenderPage;
