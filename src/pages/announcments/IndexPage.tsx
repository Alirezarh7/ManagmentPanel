import React from 'react';
import Breadcrumb from '../../components/Layout/Breadcrumb';
import CustomButton from '../../components/general/Buttons/CustomButton';
import { useNavigate } from 'react-router-dom';
import { PATHS } from '../../router/paths';

const AnnouncementsIndexPage = () => {
	const navigate = useNavigate();
	const redirectToCreatePage = () => {
		navigate(PATHS.announcements.create);
	};

	return (
		<>
			<Breadcrumb items={[{ label: 'اطلاعیه ها' }]} />
			<div className='flex justify-between items-center'>
				<h1 className='text-xl'>مدیریت اطلاعیه ها</h1>
				<CustomButton variant={'primary'} type={'button'} label={'ایجاد'} onClick={redirectToCreatePage} />
			</div>
		</>
	);
};

export default AnnouncementsIndexPage;
