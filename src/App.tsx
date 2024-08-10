import React, { ComponentType, useEffect, useState } from 'react';
import './App.css';
import { useNavigate } from 'react-router-dom';
import MainLayout from './components/Layout/MainLayout';
import userManager from './store/userManager';
import { useTranslation } from 'react-i18next';
import NapLoading from './components/general/NapLoading/NapLoading';
import 'ag-grid-community';

import { dashboardActions } from './pages/PublicPages/Actions/Dashboard/action';
import { IApplicationState } from './store/state';
import { connect } from 'react-redux';
import { LicenseManager } from 'ag-grid-enterprise';
import { callCompleteInformationActions } from './pages/Tamato/Actions/CallCompleteInformations/action';
import { bindActionCreators } from 'redux';
import { shareData } from './shareData';

LicenseManager.setLicenseKey('[enterprise][v22.1.1]_MjU3NjA1OTQ4NDg4MQ==6f80fdbb7e9fee2fc012e9dabb28db2c');

type IProps = typeof dashboardActions & typeof callCompleteInformationActions & IApplicationState;

const App = (props: IProps) => {
	const [t] = useTranslation();
	const history = useNavigate();
	const [isLogin, setIsLogin] = useState<boolean>(false);
	const isConnected: boolean = props.oidc.user && !props.oidc.user.expired;
	const automaticlyLogout = (): void => {
		// history && history('/');
		userManager.removeUser();
		userManager.clearStaleState();
		props.clearUserClaims();
		localStorage.clear();
		window.location.reload();
		window.location.replace('/');
	};

	useEffect(() => {
		/*		if (localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'mygov') {
			if (
				window.location.pathname !== '/Pilgrom/DowlatAuthLand' &&
				Date.now() > JSON.parse(localStorage.getItem(shareData.CONSTANT.UPDATE_SSO_EXPIRE_TIME) as string)
			) {
				if (localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)) {
					const access = JSON.parse(localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY) as any);
					fetch(shareData.CONSTANT.SSO_USERINFO_URL, {
						headers: { Authorization: 'Bearer ' + access.access_token }
					})
						.then(user => user.json())
						.then(user => {
							// const validPersonData = shareData.validDataForCreatePerson(user);
							props.setUserClaims(access.access_token);
							if (!isLogin) setIsLogin(true);
						})
						.catch(error => automaticlyLogout());
				} else {
					history && history('/');
					userManager.getUser().then(user => {
						userManager.signinRedirect({ data: { path: window.location.pathname } });
					});
				}
			} else if (!isLogin) {
				setIsLogin(true);
			}
		} else */
		if (localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'organization') {
			if (
				window.location.pathname !== '/SignInCallback' &&
				Date.now() > JSON.parse(localStorage.getItem(shareData.CONSTANT.UPDATE_SSO_EXPIRE_TIME) as string)
			) {
				userManager.getUser().then(user => {
					if (!user || user.expired) {
						userManager.signinRedirect({ data: { path: window.location.pathname } });
						if (isLogin) setIsLogin(false);
					} else {
						props.setUserClaims(user.access_token);
						props.setCreateToken(false, automaticlyLogout, user.access_token);
						if (!isLogin) {
							setIsLogin(true);
						}
					}
				});
			} else if (!isLogin) {
				setIsLogin(true);
			}
		}
	}, []);
	useEffect(() => {
		if (!isConnected && isLogin && !props.dashboard.userClaims.isLogOut) {
			history('/');
			userManager.removeUser();
			localStorage.clear();
			userManager.clearStaleState();
			props.clearUserClaims();
			userManager.signinRedirect({ data: { path: window.location.pathname } });
		}
	}, [isConnected]);

	if (isLogin)
		return (
			<>
				{props.dashboard.createToken.loading ? (
					<NapLoading loading={props.oidc.isLoadingUser || props.dashboard.createToken.loading} />
				) : (
					<>
						<MainLayout isConnected={isConnected} />
					</>
				)}
			</>
		);
	else return <NapLoading loading={true} description={t('pleaseWait')} />;
};

export default connect(
	(state: IApplicationState) => state,
	(dispatch: any) => bindActionCreators({ ...dashboardActions, ...callCompleteInformationActions }, dispatch)
)(App as ComponentType);
