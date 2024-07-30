import * as React from 'react';
import { ComponentType } from 'react';
import { User } from 'oidc-client';
import userManager from '../../../../store/userManager';
import { useNavigate } from 'react-router-dom';
import { CallbackComponent } from 'redux-oidc';
import { useTranslation } from 'react-i18next';
import NapLoading from '../../../../components/general/NapLoading/NapLoading';

import { IApplicationState } from '../../../../store/state';
import { dashboardActions } from '../../Actions/Dashboard/action';
import { connect } from 'react-redux';
import { IDashboardState } from '../../Actions/Dashboard/model';
import { callCompleteInformationActions } from '../../../Tamato/Actions/CallCompleteInformations/action';
import { bindActionCreators } from 'redux';
import { shareData } from '../../../../shareData';

type IProps = typeof dashboardActions & IDashboardState & typeof callCompleteInformationActions;

const SignInCallbackPage = (props: IProps) => {
	const [t] = useTranslation();
	const history = useNavigate();

	const automaticlyLogout = (): void => {
		// history && history('/');
		userManager.removeUser();
		userManager.clearStaleState();
		props.clearUserClaims();
		localStorage.clear();
		window.location.reload();
		window.location.replace('/admin');
	};

	const successCallback = (cuser: User) => {
		if (
			localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY) &&
			localStorage.getItem(shareData.CONSTANT.SSO_APPROACH) === 'mygov'
		) {
			fetch(shareData.CONSTANT.SSO_USERINFO_URL, {
				headers: { Authorization: 'Bearer ' + cuser.access_token }
			})
				.then(user => user.json())
				.then(user => {
					const validPersonData = shareData.validDataForCreatePerson(user);
					props.setUserClaims(cuser.access_token);
					props.setCreateToken(validPersonData, true, automaticlyLogout, cuser.access_token);
					var redirectPath = cuser.state.path as string;
					history(redirectPath);
					console.log(user.nationalId);
				})
				.catch(error => automaticlyLogout());
		}
	};

	const errorCallback = (error: Error) => {
		console.log(error);
		automaticlyLogout();
	};
	return (
		// @ts-ignore
		<CallbackComponent userManager={userManager} successCallback={successCallback} errorCallback={errorCallback}>
			<NapLoading loading={true} description={t('welcome')} />
		</CallbackComponent>
	);
};

export default connect(
	(state: IApplicationState) => state.dashboard,
	(dispatch: any) => bindActionCreators({ ...dashboardActions, ...callCompleteInformationActions }, dispatch)
)(SignInCallbackPage as ComponentType);
