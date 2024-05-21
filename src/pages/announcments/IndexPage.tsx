import React, { useEffect } from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import AnnouncementsTable from '../../components/announcement/AnnouncementsTable';
import { useGetAnnouncements, useGetAnnouncementsByMainPage } from '../../services/announcement.service';
import CustomLineSpinner from '../../components/general/spinners/CustomLineSpinner';
import { enqueueSnackbar } from 'notistack';
import useTitle from '../../hooks/useTitle';

const AnnouncementsIndexPage = () => {
	const navigate = useNavigate();
	useTitle('announcements', 'ناوشگران');

	const { data: announcements, isLoading, isFetching, isError } = useGetAnnouncements();
	const {
		data: announcementsByMainPage,
		isLoading: isByMainPageLoading,
		isFetching: isByMainPageFetching,
		isError: byMainPageError
	} = useGetAnnouncementsByMainPage();

	const isPageLoading: boolean = isLoading || isFetching || isByMainPageLoading || isByMainPageFetching;

	useEffect(() => {
		if (isError || byMainPageError) {
			enqueueSnackbar('مشکل در بروزرسانی لیست اطلاعیه ها', { variant: 'error' });
		}
	}, [isError, byMainPageError]);

	const redirectToCreatePage = () => {
		navigate(PATHS.announcements.create);
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'اطلاعیه ها' }]} />
			{/*<h1>
				load
				{JSON.stringify(isLoading)}
			</h1>
			<h1>
				isFetching
				{JSON.stringify(isFetching)}
			</h1>*/}
			<div className='flex justify-between items-center'>
				<h1 className='text-xl'>مدیریت اطلاعیه ها</h1>
				<CustomButton variant={'primary'} type={'button'} label={'ایجاد'} onClick={redirectToCreatePage} />
			</div>
			{isPageLoading ? <CustomLineSpinner /> : null}
			<AnnouncementsTable announcements={announcements} announcementsByMainPage={announcementsByMainPage} />
		</div>
	);
};

export default AnnouncementsIndexPage;
