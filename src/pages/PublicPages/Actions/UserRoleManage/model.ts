import { Action } from 'redux';
import { UserRoleManageActionTypes } from './actionType';

export interface IUserRoleManageState {
	userRolesList: {
		loading: boolean;
		data: string[];
	};
	roleList: {
		loading: boolean;
		data: { value: string; label: string }[];
	};
	userRoleCreate: {
		loading: boolean;
		Visible: boolean;
	};
	delete: {
		loading: boolean;
		Visible: boolean;
		userId: string;
		id: string;
	};
	alerts: any[];
	crumbs: { title: string; link: string }[];
}

interface ISetCrumbs extends Action<string> {
	type: UserRoleManageActionTypes.SetCrumbs;
	crumbs: any[];
}

interface IUserRolesFetch extends Action<string> {
	type: UserRoleManageActionTypes.UserRolesFetch;
}
interface IUserRolesFetchSuccess extends Action<string> {
	type: UserRoleManageActionTypes.UserRolesFetchSuccess;
	data: any;
}
interface IUserRolesFetchFailed extends Action<string> {
	type: UserRoleManageActionTypes.UserRolesFetchFailed;
}

interface IRoleFetch extends Action<string> {
	type: UserRoleManageActionTypes.RoleFetch;
}
interface IRoleFetchSuccess extends Action<string> {
	type: UserRoleManageActionTypes.RoleFetchSuccess;
	data: any;
}
interface IRoleFetchFailed extends Action<string> {
	type: UserRoleManageActionTypes.RoleFetchFailed;
}

interface IUserRoleCreate extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleCreate;
}
interface IUserRoleCreateSuccess extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleCreateSuccess;
}
interface IUserRoleCreateFailed extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleCreateFailed;
}
interface IUserRoleCreateModal extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleCreateModal;
	Visible: boolean;
}
interface IUserRoleDelete extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleDelete;
}
interface IUserRoleDeleteSuccess extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleDeleteSuccess;
}
interface IUserRoleDeleteFailed extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleDeleteFailed;
}
interface IUserRoleDeleteModal extends Action<string> {
	type: UserRoleManageActionTypes.UserRoleDeleteModal;
	userId: string;
	id: string;
	Visible: boolean;
}

interface IPushAlert extends Action<string> {
	type: UserRoleManageActionTypes.PushAlert;
	alert: any;
}
interface IClearAlerts extends Action<string> {
	type: UserRoleManageActionTypes.ClearAlerts;
}

export type KnownAction =
	| IUserRolesFetch
	| IUserRolesFetchSuccess
	| IUserRolesFetchFailed
	| IRoleFetch
	| IRoleFetchSuccess
	| IRoleFetchFailed
	| IUserRoleCreate
	| IUserRoleCreateSuccess
	| IUserRoleCreateFailed
	| IUserRoleCreateModal
	| IUserRoleDelete
	| IUserRoleDeleteSuccess
	| IUserRoleDeleteFailed
	| IUserRoleDeleteModal
	| ISetCrumbs
	| IPushAlert
	| IClearAlerts;
