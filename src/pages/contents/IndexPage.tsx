import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';
import { enqueueSnackbar } from 'notistack';
import useTitle from '../../hooks/useTitle';
import ContentsTable from '../../components/content/ContentsTable';
import { useGetContents } from '../../services/content.service';

const ContentsIndexPage = () => {
	const navigate = useNavigate();
	useTitle('contents', 'ناوشگران');

	const { data: contents, isLoading, isFetching, isError } = useGetContents();

	const isPageLoading: boolean = isLoading || isFetching;

	useEffect(() => {
		if (isError) {
			enqueueSnackbar('مشکل در بروزرسانی لیست محتویات', { variant: 'error' });
		}
	}, [isError]);

	const redirectToCreatePage = () => {
		navigate(PATHS.contents.create);
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'محتویات' }]} />
			<div className='flex justify-between items-center'>
				<h1 className='text-xl'>مدیریت محتویات</h1>
				<CustomButton variant={'primary'} type={'button'} label={'ایجاد'} onClick={redirectToCreatePage} />
			</div>
			{isPageLoading ? <CustomLineSpinner /> : null}
			<ContentsTable contents={contents} />
		</div>
	);
};

export default ContentsIndexPage;
