import React, { ComponentType, useState } from 'react';

import WebRoute from '../../router/WebRoute';
import { IDashboardState } from '../../pages/PublicPages/Actions/Dashboard/model';
import { dashboardActions } from '../../pages/PublicPages/Actions/Dashboard/action';
import { IApplicationState } from '../../store/state';
import { connect } from 'react-redux';
import NapAlerts from '../general/NapAlerts/NapAlerts';
import Sidebar from './SideBar';
import Header from './Header';

type IProps = typeof dashboardActions & IDashboardState & { isConnected: boolean };

const MainLayout = (props: IProps) => {
	const [isOpenSidebar, setIsOpenSidebar] = useState(false);

	return (
		<div className='dark:bg-boxdark-2 text-black dark:text-bodydark'>
			<div className='flex h-screen overflow-hidden'>
				<Sidebar sidebarOpen={isOpenSidebar} setSidebarOpen={setIsOpenSidebar} />
				<div className='relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden'>
					<Header sidebarOpen={isOpenSidebar} setSidebarOpen={setIsOpenSidebar} isConnected={props.isConnected} />
					<main>
						<div className='mx-auto max-w-screen-2xl px-1 max-md:p-4  2xl:p-10'>
							<WebRoute />
							<NapAlerts alerts={props.alerts} clearAlerts={() => props.clearAlerts()} />
						</div>
					</main>
				</div>
			</div>
		</div>
	);
};

export default connect((state: IApplicationState) => state.dashboard, dashboardActions)(MainLayout as ComponentType<any>);
