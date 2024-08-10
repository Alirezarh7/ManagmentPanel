import * as React from 'react';
import { ComponentType, ReactNode, useEffect } from 'react';
import { User, UserManager } from 'oidc-client';
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
		userManager.removeUser();
		userManager.clearStaleState();
		props.clearUserClaims();
		localStorage.clear();
		window.location.reload();
		window.location.replace('/');
	};

	const successCallback = (user: User) => {
		props.setUserClaims(user.access_token);
		props.setCreateToken(true, automaticlyLogout, user.access_token);
		let redirectPath = user.state.path as string;
		history(redirectPath);
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
