import { ComponentType, useEffect } from 'react';
import { IDashboardState } from './PublicPages/Actions/Dashboard/model';
import { dashboardActions } from './PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../store/state';
import { connect } from 'react-redux';
import useTitle from '../hooks/useTitle';

type IProps = typeof dashboardActions & IDashboardState;

const DashboardPage = (props: IProps) => {
	useTitle('mainSettings');

	useEffect(() => {
		props.setCrumbs([]);
	}, []);

	return (
		<div className='w-full max-w-screen-xl mx-auto flex flex-col gap-16 '>
			<h1>داشبورد</h1>
		</div>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(DashboardPage as ComponentType<any>);
