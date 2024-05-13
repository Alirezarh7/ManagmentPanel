import React from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';
import AnnouncementsTable from '../../components/announcement/AnnouncementsTable';
import { useGetAnnouncements } from '../../services/announcement.service';
import CustomPingSpinner from '../../components/general/spinners/CustomPingSpinner';

const AnnouncementsIndexPage = () => {
	const navigate = useNavigate();

	const { data, isLoading, isFetching } = useGetAnnouncements();

	const redirectToCreatePage = () => {
		navigate(PATHS.announcements.create);
	};

	return (
		<div className='space-y-4'>
			<Breadcrumb items={[{ label: 'اطلاعیه ها' }]} />
			<h1>
				load
				{JSON.stringify(isLoading)}
			</h1>
			<h1>
				isFetching
				{JSON.stringify(isFetching)}
			</h1>
			<div className='flex justify-between items-center'>
				<h1 className='text-xl'>مدیریت اطلاعیه ها</h1>
				<CustomButton variant={'primary'} type={'button'} label={'ایجاد'} onClick={redirectToCreatePage} />
			</div>
			{isLoading || isFetching ? <CustomPingSpinner /> : null}
			<AnnouncementsTable data={data} />
		</div>
	);
};

export default AnnouncementsIndexPage;
