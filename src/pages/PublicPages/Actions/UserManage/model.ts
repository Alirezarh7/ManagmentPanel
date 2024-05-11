import { Action } from 'redux';
import { UserManageActionTypes } from './actionType';

export interface IUserManageState {
	usersList: {
		loading: boolean;
		data: string[];
	};
	userView: {
		loading: boolean;
		item: any;
		Visible: false;
	};
	userCreate: {
		loading: boolean;
		Visible: boolean;
	};
	genderAuthorization: {
		loading: boolean;
		Visible: boolean;
		item: any;
	};
	userUpdate: {
		loading: boolean;
		item: any;
		Visible: boolean;
	};
	userClaimsList: {
		loading: boolean;
	};
	accessList: {
		loading: boolean;
		data: any[];
	};
	userClaimsCreate: {
		loading: boolean;
	};
	userPassUpdate: {
		loading: boolean;
		userId: any;
		Visible: boolean;
	};
	delete: {
		loading: boolean;
		Visible: boolean;
		id: string;
	};
	alerts: any[];
	crumbs: { title: string; link: string }[];
}

interface ISetCrumbs extends Action<string> {
	type: UserManageActionTypes.SetCrumbs;
	crumbs: any[];
}

interface IUsersFetch extends Action<string> {
	type: UserManageActionTypes.UsersFetch;
}
interface IUsersFetchSuccess extends Action<string> {
	type: UserManageActionTypes.UsersFetchSuccess;
	data: any;
}
interface IUsersFetchFailed extends Action<string> {
	type: UserManageActionTypes.UsersFetchFailed;
}

interface IUserViewModal extends Action<string> {
	type: UserManageActionTypes.UserViewModal;
	item: object;
	Visible: boolean;
}

interface IUserCreate extends Action<string> {
	type: UserManageActionTypes.UserCreate;
}
interface IUserCreateSuccess extends Action<string> {
	type: UserManageActionTypes.UserCreateSuccess;
}
interface IUserCreateFailed extends Action<string> {
	type: UserManageActionTypes.UserCreateFailed;
}
interface IUserCreateModal extends Action<string> {
	type: UserManageActionTypes.UserCreateModal;
	Visible: boolean;
}
interface IGenderAuthorizationModal extends Action<string> {
	type: UserManageActionTypes.GenderAuthorizationModal;
	Visible: boolean;
	item: any;
}
interface IUserUpdate extends Action<string> {
	type: UserManageActionTypes.UserUpdate;
}
interface IUserUpdateSuccess extends Action<string> {
	type: UserManageActionTypes.UserUpdateSuccess;
}
interface IUserUpdateFailed extends Action<string> {
	type: UserManageActionTypes.UserUpdateFailed;
}
interface IUserUpdateModal extends Action<string> {
	type: UserManageActionTypes.UserUpdateModal;
	item: object;
	Visible: boolean;
}

interface IUserClaimsFetch extends Action<string> {
	type: UserManageActionTypes.UserClaimsFetch;
}
interface IUserClaimsFetchSuccess extends Action<string> {
	type: UserManageActionTypes.UserClaimsFetchSuccess;
}
interface IUserClaimsFetchFailed extends Action<string> {
	type: UserManageActionTypes.UserClaimsFetchFailed;
}

interface IAccessFetch extends Action<string> {
	type: UserManageActionTypes.AccessFetch;
}
interface IAccessFetchSuccess extends Action<string> {
	type: UserManageActionTypes.AccessFetchSuccess;
	data: any;
}
interface IAccessFetchFailed extends Action<string> {
	type: UserManageActionTypes.AccessFetchFailed;
}

interface IUserClaimsCreate extends Action<string> {
	type: UserManageActionTypes.UserClaimsCreate;
}
interface IUserClaimsCreateSuccess extends Action<string> {
	type: UserManageActionTypes.UserClaimsCreateSuccess;
}
interface IUserClaimsCreateFailed extends Action<string> {
	type: UserManageActionTypes.UserClaimsCreateFailed;
}

interface IUserPassUpdate extends Action<string> {
	type: UserManageActionTypes.UserPassUpdate;
}
interface IUserPassUpdateSuccess extends Action<string> {
	type: UserManageActionTypes.UserPassUpdateSuccess;
}
interface IUserPassUpdateFailed extends Action<string> {
	type: UserManageActionTypes.UserPassUpdateFailed;
}
interface IUserPassUpdateModal extends Action<string> {
	type: UserManageActionTypes.UserPassUpdateModal;
	userId: string;
	Visible: boolean;
}

interface IUserDelete extends Action<string> {
	type: UserManageActionTypes.UserDelete;
}
interface IUserDeleteSuccess extends Action<string> {
	type: UserManageActionTypes.UserDeleteSuccess;
}
interface IUserDeleteFailed extends Action<string> {
	type: UserManageActionTypes.UserDeleteFailed;
}
interface IUserDeleteModal extends Action<string> {
	type: UserManageActionTypes.UserDeleteModal;
	id: string;
	Visible: boolean;
}

interface IPushAlert extends Action<string> {
	type: UserManageActionTypes.PushAlert;
	alert: any;
}
interface IClearAlerts extends Action<string> {
	type: UserManageActionTypes.ClearAlerts;
}

export type KnownAction =
	| IUsersFetch
	| IUsersFetchSuccess
	| IUsersFetchFailed
	| IUserViewModal
	| IUserCreate
	| IUserCreateSuccess
	| IUserCreateFailed
	| IUserCreateModal
	| IUserUpdate
	| IUserUpdateSuccess
	| IUserUpdateFailed
	| IUserUpdateModal
	| IUserClaimsFetch
	| IUserClaimsFetchSuccess
	| IUserClaimsFetchFailed
	| IAccessFetch
	| IAccessFetchSuccess
	| IAccessFetchFailed
	| IUserClaimsCreate
	| IUserClaimsCreateSuccess
	| IUserClaimsCreateFailed
	| IUserPassUpdate
	| IUserPassUpdateSuccess
	| IUserPassUpdateFailed
	| IUserPassUpdateModal
	| IUserDelete
	| IUserDeleteSuccess
	| IUserDeleteFailed
	| IUserDeleteModal
	| ISetCrumbs
	| IPushAlert
	| IClearAlerts
	| IGenderAuthorizationModal;
