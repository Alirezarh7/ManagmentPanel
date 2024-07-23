import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';
import { enqueueSnackbar } from 'notistack';
import useTitle from '../../hooks/useTitle';
import { useGetFaqContents } from '../../services/faqContent.service';
import FaqContentsTable from '../../components/faqContent/FaqContentsTable';

const FaqContentsIndexPage = () => {
	const navigate = useNavigate();
	useTitle('faqContents', 'ناوشگران');

	const { data: faqContents, isLoading, isFetching, isError } = useGetFaqContents();

	const isPageLoading: boolean = isLoading || isFetching;

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('مشکل در بروزرسانی لیست سوالات پرتکرار', { variant: 'error' });
		}
	}, [isError]);

	const redirectToCreatePage = () => {
		navigate(PATHS.faqContents.create);
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'سوالات پرتکرار' }]} />
			<div className='flex justify-between items-center'>
				<h1 className='text-xl'>سوالات پرتکرار</h1>
				<CustomButton variant={'primary'} type={'button'} label={'ایجاد'} onClick={redirectToCreatePage} />
			</div>
			{isPageLoading ? <CustomLineSpinner /> : null}
			<FaqContentsTable faqContents={faqContents} />
		</div>
	);
};

export default FaqContentsIndexPage;
