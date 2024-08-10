import React, { ComponentType, useEffect } from 'react';
import { IDashboardState } from './PublicPages/Actions/Dashboard/model';
import { dashboardActions } from './PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../store/state';
import { connect } from 'react-redux';
import useTitle from '../hooks/useTitle';
import AnnouncementsPieChartAll from '../components/dashbord/AnnouncementsPieChartAll';
import { useGetAnnouncementsStatistics } from '../services/announcement.service';
import CustomLineSpinner from '../components/general/spinners/CustomLineSpinner';
import { DateObject } from 'react-multi-date-picker';
import persian from 'react-date-object/calendars/persian';
import persian_fa from 'react-date-object/locales/persian_fa';
import AnnouncementsPieChartActive from '../components/dashbord/AnnouncementsPieChartActive';

type IProps = typeof dashboardActions & IDashboardState;

const DashboardPage = (props: IProps) => {
	useTitle('mainTitle');

	const { data, isLoading, isFetching, isError } = useGetAnnouncementsStatistics();

	useEffect(() => {
		props.setCrumbs([]);
	}, []);

	return (
		<div className='space-y-4'>
			<div className='flex justify-between items-center'>
				<h1 className='max-sm:hidden sm:text-lg'>به داشبورد مدیریتی سامانه حج و زیارت خوش آمدید</h1>
				<h1 className=' sm:hidden text-lg '>داشبورد مدیریتی سامانه حج و زیارت</h1>
				<span className=' max-sm:hidden py-2 px-3 bg-yellow-500 rounded-3xl'>
					{new DateObject(new Date()).convert(persian, persian_fa).format('DD MMMM سال YYYY')}
				</span>
			</div>

			{isLoading || isFetching ? <CustomLineSpinner /> : null}
			<div className='p-2 grid sm:grid-cols-2 md:grid-cols-3 md:gap-4'>
				<AnnouncementsPieChartAll statistics={data} />
				<AnnouncementsPieChartActive statistics={data} />
			</div>
		</div>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(DashboardPage as ComponentType<any>);
