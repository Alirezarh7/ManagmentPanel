import { AppAction } from '../../../../store/state';
import { DashboardActionTypes } from './actionType';
import { KnownAction } from './model';
import API from '../../../../components/general/baseURL';
import { jwtDecode } from 'jwt-decode';
import NDate from '@nepo/ndate';
import { shareData } from '../../../../shareData';
import axios from 'axios';
import {
	getManagementTokenUrl,
} from '../../../../shareData/baseUrls';

export const dashboardActions = {
	setCrumbs:
		(crumbs: { title: string; link: string }[]): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: DashboardActionTypes.SetCrumbs, crumbs });
		},

	updateUserPass:
		(data: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: DashboardActionTypes.UserPassUpdate });
			try {
				const result = await API.post('/Accounts/Users/ChangePasswordWithCheck', data);
				if (result.status == 200) {
					dispatch({ type: DashboardActionTypes.UserPassUpdateSuccess });
					dashboardActions.pushCommonAlert('201')(dispatch, getState);
				}
			} catch (error) {
				dispatch({ type: DashboardActionTypes.UserPassUpdateFailed });
				dashboardActions.showRequestErrors(error)(dispatch, getState);
			}
		},
	toggleUpdateUserPassModal:
		(Visible: boolean): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({
				type: DashboardActionTypes.UserPassUpdateModal,
				Visible: Visible
			});
		},

	toggleLogoutConfirm:
		(visible: boolean): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({
				type: DashboardActionTypes.LogoutConfirm,
				visible: visible
			});
		},


	setCreateManagementToken:
		(callInSuccessCallback: boolean, automaticlyLogout: any, accessToken: string,nationalCode:string): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({ type: DashboardActionTypes.CreateToken });

			try {
				const resultToken = await axios.post(
					`${getManagementTokenUrl}`,
					{nationalCode},
					{
						headers: { Authorization: accessToken }
					}
				);

				if (resultToken.status === 200) {
					dispatch({ type: DashboardActionTypes.CreateTokenSuccess });
					localStorage.setItem('tokenMangement', JSON.stringify((resultToken?.data).tokenMangement));
					localStorage.setItem('tokenBasic', JSON.stringify((resultToken?.data).tokenBasic));

					/*		if (localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY)) {
						const updatedTime = new NDate().subDays(-1);
						updatedTime.date.setHours(new Date().getHours() + 4);
						const updateExpiredGovSsoTime = new Date(updatedTime.date).getTime();

						const access = JSON.parse(localStorage.getItem(shareData.CONSTANT.GOV_STORAGE_KEY) as any);

						if (callInSuccessCallback) {
							delete access.expires_at;
							localStorage.setItem(shareData.CONSTANT.UPDATE_SSO_EXPIRE_TIME, JSON.stringify(updateExpiredGovSsoTime));
							access.expires_at = updateExpiredGovSsoTime;
						} else {
							delete access.expires_at;
							access.expires_at = JSON.parse(localStorage.getItem(shareData.CONSTANT.UPDATE_SSO_EXPIRE_TIME) as string);
						}
						localStorage.setItem(shareData.CONSTANT.GOV_STORAGE_KEY, JSON.stringify(access));
						callInSuccessCallback && window.location.reload();
					} else */
					if (localStorage.getItem(shareData.ORGANIZATION_STORAGE_KEY)) {
						const updatedTime = new NDate().subDays(-1);
						updatedTime.date.setHours(new Date().getHours() + 4);
						const updateExpiredGovSsoTime = new Date(updatedTime.date).getTime();

						const access = JSON.parse(localStorage.getItem(shareData.ORGANIZATION_STORAGE_KEY) as any);
						if (callInSuccessCallback) {
							delete access.expires_at;
							localStorage.setItem(shareData.CONSTANT.UPDATE_SSO_EXPIRE_TIME, JSON.stringify(updateExpiredGovSsoTime));
							access.expires_at = updateExpiredGovSsoTime;
						} else {
							delete access.expires_at;
							access.expires_at = JSON.parse(localStorage.getItem(shareData.CONSTANT.UPDATE_SSO_EXPIRE_TIME) as string);
						}
						localStorage.setItem(shareData.ORGANIZATION_STORAGE_KEY, JSON.stringify(access));
						callInSuccessCallback && window.location.reload();
					}
				} else {
					automaticlyLogout();
				}
			} catch (error) {
				automaticlyLogout();
				dispatch({ type: DashboardActionTypes.CreateTokenFaild });
				dashboardActions.showRequestErrors(error)(dispatch, getState);
			}
		},

	setUserClaims:
		(token: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			let tokenData: any = jwtDecode(token);
			let roles = [];
			let services = [];
			let controllers = [];
			let actions = [];
			if (tokenData.role) {
				if (Array.isArray(tokenData.role)) roles = tokenData.role;
				else roles.push(tokenData.role);
			}
			if (tokenData.service) {
				if (Array.isArray(tokenData.service)) services = tokenData.service;
				else services.push(tokenData.service);
			}
			if (tokenData.controller) {
				if (Array.isArray(tokenData.controller)) controllers = tokenData.controller;
				else controllers.push(tokenData.controller);
			}
			if (tokenData.action) {
				if (Array.isArray(tokenData.action)) actions = tokenData.action;
				else actions.push(tokenData.action);
			}
			dispatch({ type: DashboardActionTypes.UserClaimsSet, roles, services, controllers, actions });
		},
	clearUserClaims: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: DashboardActionTypes.UserClaimsClear });
	},

	pushAlert:
		(alert: {
			title: string;
			description: string;
			variant: 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark';
			dismissTime?: number;
		}): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			dispatch({
				type: DashboardActionTypes.PushAlert,
				alert
			});
		},
	clearAlerts: (): AppAction<KnownAction> => async (dispatch, getState) => {
		dispatch({ type: DashboardActionTypes.ClearAlerts });
	},
	showRequestErrors:
		(error: any): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			if (error.response && error.response.status) {
				if (error.response.status == 401) dashboardActions.pushCommonAlert('401')(dispatch, getState);
				else if (error.response.status == 403) dashboardActions.pushCommonAlert('403')(dispatch, getState);
				else if (error.response.status == 400 && error.response && error.response.data && error.response.data.length > 0) {
					let errors = '';
					for (var i = 0; i < error.response.data.length; i++) errors += (errors == '' ? '' : '\n') + error.response.data[i];
					dashboardActions.pushAlert({
						title: 'information',
						description: errors,
						variant: 'danger'
					})(dispatch, getState);
				} else
					dashboardActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfulOperation',
						variant: 'danger'
					})(dispatch, getState);
			} else {
				dashboardActions.pushAlert({
					title: 'error',
					description: 'UnSuccessfulOperation',
					variant: 'danger'
				})(dispatch, getState);
			}
		},
	pushCommonAlert:
		(type: '201' | '204' | '401' | '403' | 'errorFetch'): AppAction<KnownAction> =>
		async (dispatch, getState) => {
			switch (type) {
				case '201':
					dashboardActions.pushAlert({
						title: 'information',
						description: 'SuccessfulOperation',
						variant: 'success'
					})(dispatch, getState);
					break;
				case '204':
					dashboardActions.pushAlert({
						title: 'error',
						description: 'DataInNotFound',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '401':
					dashboardActions.pushAlert({
						title: 'error',
						description: 'UnauthorizedError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case '403':
					dashboardActions.pushAlert({
						title: 'error',
						description: 'ForbiddenError',
						variant: 'warning'
					})(dispatch, getState);
					break;
				case 'errorFetch':
					dashboardActions.pushAlert({
						title: 'error',
						description: 'UnSuccessfetchData',
						variant: 'warning'
					})(dispatch, getState);
					break;
			}
		}
};
