import React, { ComponentType } from 'react';
import Header from './Header/Header';
import WebRoute from '../../router/WebRoute';
import { IDashboardState } from '../../pages/PublicPages/Actions/Dashboard/model';
import { dashboardActions } from '../../pages/PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../../store/state';
import { connect } from 'react-redux';
import NapAlerts from '../general/NapAlerts/NapAlerts';
import Footer from './Footer';

type IProps = typeof dashboardActions & IDashboardState & { isConnected: boolean };

const MainLayout = (props: IProps) => {
	return (
		<main className='flex flex-col grow'>
			<Header isConnected={props.isConnected} />
			<WebRoute />
			<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
			<Footer />
		</main>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(MainLayout as ComponentType<any>);
