import { Action } from 'redux';
import { DashboardActionTypes } from './actionType';

export interface IDashboardState {
	userPassUpdate: {
		loading: boolean;
		Visible: boolean;
	};
	logoutConfirm: {
		visible: boolean;
	};
	userClaims: {
		roles: string[];
		services: string[];
		controllers: string[];
		actions: string[];
		isLogOut: boolean;
	};
	personCreate: {
		loading: boolean;
	};
	createToken: {
		loading: boolean;
	};
	alerts: any[];
	crumbs: { title: string; link: string }[];
}

interface ISetCrumbs extends Action<string> {
	type: DashboardActionTypes.SetCrumbs;
	crumbs: any[];
}

interface IUserPassUpdate extends Action<string> {
	type: DashboardActionTypes.UserPassUpdate;
}
interface IUserPassUpdateSuccess extends Action<string> {
	type: DashboardActionTypes.UserPassUpdateSuccess;
}
interface IUserPassUpdateFailed extends Action<string> {
	type: DashboardActionTypes.UserPassUpdateFailed;
}
interface IUserPassUpdateModal extends Action<string> {
	type: DashboardActionTypes.UserPassUpdateModal;
	Visible: boolean;
}
interface IUserClaimsSet extends Action<string> {
	type: DashboardActionTypes.UserClaimsSet;
	roles: string[];
	services: string[];
	controllers: string[];
	actions: string[];
}
interface IUserClaimsClear extends Action<string> {
	type: DashboardActionTypes.UserClaimsClear;
}

interface IPushAlert extends Action<string> {
	type: DashboardActionTypes.PushAlert;
	alert: any;
}
interface IClearAlerts extends Action<string> {
	type: DashboardActionTypes.ClearAlerts;
}

interface ILogoutConfirm extends Action<string> {
	type: DashboardActionTypes.LogoutConfirm;
	visible: boolean;
}
interface ICreateTokenFailed extends Action<string> {
	type: DashboardActionTypes.CreateTokenFaild;
}
interface ICreateTokenSuccess extends Action<string> {
	type: DashboardActionTypes.CreateTokenSuccess;
}
interface ICreateToken extends Action<string> {
	type: DashboardActionTypes.CreateToken;
}
interface ICreatePerson extends Action<string> {
	type: DashboardActionTypes.CreatePerson;
}

interface ICreatePersonSuccess extends Action<string> {
	type: DashboardActionTypes.CreatePersonSuccess;
}
interface ICreatePersonFailed extends Action<string> {
	type: DashboardActionTypes.CreatePersonFailed;
}

export type KnownAction =
	| IUserPassUpdate
	| IUserPassUpdateSuccess
	| IUserPassUpdateFailed
	| IUserPassUpdateModal
	| IUserClaimsSet
	| IUserClaimsClear
	| ISetCrumbs
	| IPushAlert
	| ILogoutConfirm
	| ICreatePerson
	| ICreatePersonSuccess
	| ICreatePersonFailed
	| ICreateToken
	| ICreateTokenSuccess
	| ICreateTokenFailed
	| IClearAlerts;
