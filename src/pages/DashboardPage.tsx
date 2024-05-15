import React, { ComponentType, useEffect } from 'react';
import { IDashboardState } from './PublicPages/Actions/Dashboard/model';
import { dashboardActions } from './PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../store/state';
import { connect } from 'react-redux';
import useTitle from '../hooks/useTitle';
import AnnouncementsPieChart from '../components/dashbord/AnnouncementsPieChart';
import { useGetAnnouncementsStatistics } from '../services/announcement.service';
import CustomLineSpinner from '../components/general/spinners/CustomLineSpinner';
import { DateObject } from 'react-multi-date-picker';
import { Calendar } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';

type IProps = typeof dashboardActions & IDashboardState;

const DashboardPage = (props: IProps) => {
	useTitle('mainTitle');

	const { data, isLoading, isFetching, isError } = useGetAnnouncementsStatistics();

	useEffect(() => {
		props.setCrumbs([]);
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-10 '>
			<h1 className='sm:text-lg'>به داشبورد مدیریتی سامانه حج و زیارت ناوشگران خوش آمدید</h1>
			{isLoading || isFetching ? <CustomLineSpinner /> : null}
			<div className='p-2 grid sm:grid-cols-2 md:grid-cols-3'>
				<div>
					<AnnouncementsPieChart statistics={data} />
				</div>
				<div></div>
				<div className='flex justify-center items-start'>
					<Calendar value={new DateObject()} calendar={persian} locale={persian_fa} />
				</div>
			</div>
		</div>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(DashboardPage as ComponentType<any>);
